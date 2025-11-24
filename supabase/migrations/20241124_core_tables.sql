-- Products table (if not already applied)
create extension if not exists "uuid-ossp";

create table if not exists products (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  name text not null,
  description text not null,
  price numeric not null,
  original_price numeric,
  discount_percentage numeric,
  category text,
  images text[] default array[]::text[],
  rating numeric default 5,
  review_count integer default 0,
  in_stock boolean default true,
  sizes text[] default array[]::text[],
  colors text[] default array[]::text[],
  tags text[] default array[]::text[],
  specs jsonb default '{}'::jsonb,
  processor text,
  ram text,
  storage text,
  display text,
  gpu text,
  status text default 'active',
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  deleted_at timestamptz
);

create index if not exists products_category_idx on products(category);

-- Wishlist table
create table if not exists wishlists (
  id uuid primary key default uuid_generate_v4(),
  device_id text not null,
  product_id uuid references products(id) on delete cascade,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create unique index if not exists wishlists_device_product_uidx on wishlists(device_id, product_id);
create index if not exists wishlists_device_idx on wishlists(device_id);

-- Comparison table with trigger limit
create table if not exists comparisons (
  id uuid primary key default uuid_generate_v4(),
  device_id text not null,
  product_id uuid references products(id) on delete cascade,
  added_at timestamptz default now()
);

create unique index if not exists comparisons_device_product_uidx on comparisons(device_id, product_id);
create index if not exists comparisons_device_idx on comparisons(device_id);

create or replace function enforce_comparison_limit()
returns trigger as $$
begin
  if (select count(1) from comparisons where device_id = new.device_id) >= 4 then
    raise exception 'comparison limit exceeded';
  end if;
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_comparisons_limit on comparisons;
create trigger trg_comparisons_limit
before insert on comparisons
for each row execute procedure enforce_comparison_limit();

-- Recently viewed
create table if not exists recently_viewed (
  id uuid primary key default uuid_generate_v4(),
  device_id text not null,
  product_id uuid references products(id) on delete cascade,
  viewed_at timestamptz default now()
);

create unique index if not exists recently_viewed_device_product_uidx on recently_viewed(device_id, product_id);
create index if not exists recently_viewed_device_idx on recently_viewed(device_id);

-- Inquiries table
create table if not exists inquiries (
  id uuid primary key default uuid_generate_v4(),
  device_id text,
  product_id uuid references products(id),
  product_name text not null,
  product_price numeric,
  created_at timestamptz default now(),
  metadata jsonb default '{}'::jsonb
);

create index if not exists inquiries_device_idx on inquiries(device_id);
create index if not exists inquiries_created_idx on inquiries(created_at);

-- Admins table (placeholder)
create table if not exists admins (
  id uuid primary key default uuid_generate_v4(),
  email text unique not null,
  password_hash text not null,
  hobby text,
  role text default 'admin',
  created_at timestamptz default now()
);

