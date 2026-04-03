-- Firms + profiles; trigger creates firm + profile for each new auth user.

create table public.firms (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_at timestamptz not null default now()
);

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  firm_id uuid not null references public.firms (id) on delete restrict,
  full_name text,
  created_at timestamptz not null default now()
);

create index profiles_firm_id_idx on public.profiles (firm_id);

-- New user: one firm + profile (SECURITY DEFINER bypasses RLS for inserts).
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  new_firm_id uuid;
  display_name text;
begin
  display_name := coalesce(
    new.raw_user_meta_data->>'full_name',
    split_part(new.email, '@', 1)
  );
  insert into public.firms (name)
  values ('My firm')
  returning id into new_firm_id;

  insert into public.profiles (id, firm_id, full_name)
  values (new.id, new_firm_id, display_name);

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

alter table public.firms enable row level security;
alter table public.profiles enable row level security;

create policy "profiles_select_own" on public.profiles
  for select using (auth.uid() = id);

create policy "profiles_update_own" on public.profiles
  for update using (auth.uid() = id);

create policy "firms_select_member" on public.firms
  for select using (
    id = (select p.firm_id from public.profiles p where p.id = auth.uid())
  );

create policy "firms_update_member" on public.firms
  for update using (
    id = (select p.firm_id from public.profiles p where p.id = auth.uid())
  );
