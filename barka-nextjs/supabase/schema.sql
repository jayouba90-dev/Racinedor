-- Schéma de départ pour la prochaine étape backend Supabase.
-- À exécuter uniquement lorsque le projet Supabase sera créé.
create extension if not exists "pgcrypto";

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  created_at timestamptz not null default now()
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  category_id uuid references public.categories(id) on delete set null,
  name text not null,
  slug text not null unique,
  description text,
  price_xof integer not null check (price_xof >= 0),
  weight_label text,
  image_url text,
  ingredients text,
  allergens text,
  storage_instructions text,
  is_active boolean not null default true,
  stock_quantity integer not null default 0 check (stock_quantity >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  customer_phone text not null,
  delivery_address text not null,
  status text not null default 'pending'
    check (status in ('pending','confirmed','preparing','shipped','delivered','cancelled')),
  total_xof integer not null check (total_xof >= 0),
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid references public.products(id) on delete set null,
  product_name_snapshot text not null,
  quantity integer not null check (quantity > 0),
  unit_price_xof integer not null check (unit_price_xof >= 0)
);

-- Les politiques RLS, rôles administrateurs et fonctions de commande
-- doivent être définis avant d'exposer ces tables à une boutique en production.
