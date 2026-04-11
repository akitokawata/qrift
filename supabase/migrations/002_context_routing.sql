-- コンテキストルーティングルールテーブル
create table public.routing_rules (
  id uuid primary key default gen_random_uuid(),
  qr_code_id uuid references public.qr_codes(id) on delete cascade not null,
  priority integer not null default 0,
  condition_type text not null check (condition_type in ('language', 'device', 'time', 'geo', 'scan_count')),
  condition_value jsonb not null,
  target_url text not null,
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- インデックス
create index idx_routing_rules_qr_code_id on public.routing_rules(qr_code_id);

-- RLS
alter table public.routing_rules enable row level security;

create policy "Users can view own routing rules"
  on public.routing_rules for select using (
    exists (
      select 1 from public.qr_codes
      where qr_codes.id = routing_rules.qr_code_id
      and qr_codes.user_id = auth.uid()
    )
  );

create policy "Users can insert own routing rules"
  on public.routing_rules for insert with check (
    exists (
      select 1 from public.qr_codes
      where qr_codes.id = routing_rules.qr_code_id
      and qr_codes.user_id = auth.uid()
    )
  );

create policy "Users can update own routing rules"
  on public.routing_rules for update using (
    exists (
      select 1 from public.qr_codes
      where qr_codes.id = routing_rules.qr_code_id
      and qr_codes.user_id = auth.uid()
    )
  );

create policy "Users can delete own routing rules"
  on public.routing_rules for delete using (
    exists (
      select 1 from public.qr_codes
      where qr_codes.id = routing_rules.qr_code_id
      and qr_codes.user_id = auth.uid()
    )
  );

-- updated_at自動更新
create trigger routing_rules_updated_at
  before update on public.routing_rules
  for each row execute function update_updated_at();

-- condition_value の例:
-- language: {"languages": ["ja", "en", "zh"]}
-- device: {"devices": ["mobile", "desktop", "tablet"]}
-- time: {"start": "11:00", "end": "14:00", "timezone": "Asia/Tokyo"}
-- geo: {"countries": ["JP", "US"]}
-- scan_count: {"min": 1, "max": 1}  (初回限定の場合)
