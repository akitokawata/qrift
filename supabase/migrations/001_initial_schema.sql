-- QRコードテーブル
create table public.qr_codes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  type text not null check (type in ('static', 'dynamic')),
  short_code text unique,
  target_url text not null,
  title text,
  design_config jsonb default '{"fgColor": "#000000", "bgColor": "#ffffff", "logoUrl": null}'::jsonb,
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- スキャンログテーブル
create table public.scan_logs (
  id uuid primary key default gen_random_uuid(),
  qr_code_id uuid references public.qr_codes(id) on delete cascade not null,
  scanned_at timestamptz default now(),
  ip_address inet,
  user_agent text,
  referer text,
  country text,
  device_type text
);

-- インデックス
create index idx_qr_codes_user_id on public.qr_codes(user_id);
create index idx_qr_codes_short_code on public.qr_codes(short_code);
create index idx_scan_logs_qr_code_id on public.scan_logs(qr_code_id);
create index idx_scan_logs_scanned_at on public.scan_logs(scanned_at);

-- RLS
alter table public.qr_codes enable row level security;
alter table public.scan_logs enable row level security;

create policy "Users can view own QR codes"
  on public.qr_codes for select using (auth.uid() = user_id);

create policy "Users can insert own QR codes"
  on public.qr_codes for insert with check (auth.uid() = user_id);

create policy "Users can update own QR codes"
  on public.qr_codes for update using (auth.uid() = user_id);

create policy "Users can delete own QR codes"
  on public.qr_codes for delete using (auth.uid() = user_id);

create policy "Users can view scan logs for own QR codes"
  on public.scan_logs for select using (
    exists (
      select 1 from public.qr_codes
      where qr_codes.id = scan_logs.qr_code_id
      and qr_codes.user_id = auth.uid()
    )
  );

-- updated_at 自動更新
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger qr_codes_updated_at
  before update on public.qr_codes
  for each row execute function update_updated_at();

-- 日別スキャン集計ビュー
create or replace view public.daily_scan_counts as
select
  qr_code_id,
  date_trunc('day', scanned_at)::date as scan_date,
  count(*) as scan_count
from public.scan_logs
group by qr_code_id, date_trunc('day', scanned_at)::date;
