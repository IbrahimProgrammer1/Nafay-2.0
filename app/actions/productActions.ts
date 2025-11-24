'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { getSupabaseServiceRoleClient } from '@/lib/supabaseServer';

const productSchema = z.object({
  id: z.string().uuid().optional(),
  slug: z.string().min(1),
  name: z.string().min(1),
  description: z.string().min(1),
  price: z.number().nonnegative(),
  originalPrice: z.number().nonnegative().optional(),
  discountPercentage: z.number().nonnegative().optional(),
  category: z.string().min(1),
  images: z.array(z.string().min(1)).min(1),
  rating: z.number().min(0).max(5).default(5),
  reviewCount: z.number().int().nonnegative().default(0),
  inStock: z.boolean().default(true),
  sizes: z.array(z.string()).optional(),
  colors: z.array(z.string()).optional(),
  tags: z.array(z.string()).default([]),
  specs: z.record(z.string(), z.string()).optional(),
  processor: z.string().optional(),
  ram: z.string().optional(),
  storage: z.string().optional(),
  display: z.string().optional(),
  gpu: z.string().optional(),
  status: z.enum(['active', 'hidden', 'archived']).default('active'),
});

export type ProductPayload = z.infer<typeof productSchema>;

const PRODUCTS_TABLE = 'products';

export async function fetchProductsFromSupabase() {
  const supabase = getSupabaseServiceRoleClient();
  const { data, error } = await supabase
    .from(PRODUCTS_TABLE)
    .select('*')
    .neq('status', 'archived')
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function createProductAction(payload: ProductPayload) {
  const supabase = getSupabaseServiceRoleClient();
  const parsed = productSchema.parse(payload);

  // Remove id from parsed data - let Supabase generate it
  const { id, ...productData } = parsed;

  const { data, error } = await supabase
    .from(PRODUCTS_TABLE)
    .insert({
      slug: productData.slug,
      name: productData.name,
      description: productData.description,
      price: productData.price,
      original_price: productData.originalPrice ?? productData.price,
      discount_percentage: productData.discountPercentage ?? null,
      category: productData.category,
      images: productData.images,
      rating: productData.rating ?? 5,
      review_count: productData.reviewCount ?? 0,
      in_stock: productData.inStock ?? true,
      sizes: productData.sizes ?? [],
      colors: productData.colors ?? [],
      tags: productData.tags ?? [],
      specs: productData.specs ?? {},
      processor: productData.processor ?? null,
      ram: productData.ram ?? null,
      storage: productData.storage ?? null,
      display: productData.display ?? null,
      gpu: productData.gpu ?? null,
      status: productData.status ?? 'active',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) {
    console.error('Supabase insert error:', error);
    throw new Error(error.message);
  }

  revalidatePath('/admin/products');
  revalidatePath('/shop');
  revalidatePath('/');
  return data;
}

export async function updateProductAction(id: string, updates: Partial<ProductPayload>) {
  const supabase = getSupabaseServiceRoleClient();
  const parsed = productSchema.partial().parse({ ...updates, id });

  const { data, error } = await supabase
    .from(PRODUCTS_TABLE)
    .update({
      ...parsed,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath('/admin/products');
  return data;
}

export async function deleteProductAction(id: string) {
  const supabase = getSupabaseServiceRoleClient();
  const { error } = await supabase
    .from(PRODUCTS_TABLE)
    .update({
      status: 'archived',
      deleted_at: new Date().toISOString(),
    })
    .eq('id', id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath('/admin/products');
  return { success: true };
}

