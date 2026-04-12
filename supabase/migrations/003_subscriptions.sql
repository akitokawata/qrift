-- サブスクリプションテーブル
create table public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null unique,
  plan_type text not null default 'free' check (plan_type in ('free', 'starter', 'business', 'pro')),
  stripe_customer_id text unique,
  stripe_subscription_id text unique,
  stripe_price_id text,
  status text not null default 'active',
  current_period_start timestamptz,
  current_period_end timestamptz,
  cancel_at_period_end boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index idx_subscriptions_user_id on public.subscriptions(user_id);
create index idx_subscriptions_stripe_customer_id on public.subscriptions(stripe_customer_id);

alter table public.subscriptions enable row level security;

create policy "Users can view own subscription"
  on public.subscriptions for select using (auth.uid() = user_id);

create trigger subscriptions_updated_at
  before update on public.subscriptions
  for each row execute function update_updated_at();
