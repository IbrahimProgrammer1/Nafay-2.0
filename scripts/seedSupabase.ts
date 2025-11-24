import path from 'path';
import { config as loadEnv } from 'dotenv';

// Load .env.local first, then fall back to default .env
loadEnv({ path: path.resolve(process.cwd(), '.env.local'), override: true });
loadEnv();
import { createClient } from '@supabase/supabase-js';
import { products } from '../data/products';
import { randomUUID } from 'crypto';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl) {
  throw new Error('NEXT_PUBLIC_SUPABASE_URL is not set in your environment');
}

if (!serviceRoleKey) {
  throw new Error('SUPABASE_SERVICE_ROLE_KEY is not set in your environment');
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

type DbProductInsert = {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  original_price: number | null;
  discount_percentage: number | null;
  category: string;
  images: string[];
  rating: number;
  review_count: number;
  in_stock: boolean;
  sizes: string[];
  colors: string[];
  tags: string[];
  specs: Record<string, string>;
  processor: string | null | undefined;
  ram: string | null | undefined;
  storage: string | null | undefined;
  display: string | null | undefined;
  gpu: string | null | undefined;
  status: 'active' | 'hidden' | 'archived';
};

async function main() {
  console.log(`Seeding ${products.length} products to Supabase...`);

  const payload: DbProductInsert[] = products.map((product) => ({
    id: randomUUID(), // Generate a new UUID for each product
    slug: product.slug,
    name: product.name,
    description: product.description,
    price: product.price,
    original_price: product.originalPrice ?? product.price,
    discount_percentage: product.discountPercentage ?? null,
    category: product.category,
    images: product.images ?? [],
    rating: product.rating ?? 5,
    review_count: product.reviewCount ?? 0,
    in_stock: product.inStock ?? true,
    sizes: product.sizes ?? [],
    colors: product.colors ?? [],
    tags: product.tags ?? [],
    specs: product.specs ?? {},
    processor: product.processor ?? null,
    ram: product.ram ?? null,
    storage: product.storage ?? null,
    display: product.display ?? null,
    gpu: product.gpu ?? null,
    status: (product.status as DbProductInsert['status']) ?? 'active',
  }));

  // Delete all existing products first to avoid conflicts
  const { error: deleteError } = await supabase
    .from('products')
    .delete()
    .neq('id', '00000000-0000-0000-0000-000000000000');

  if (deleteError) {
    console.warn('Warning clearing products:', deleteError.message);
  }

  // Insert products one by one to better handle errors
  let successCount = 0;
  let errorCount = 0;

  for (const product of payload) {
    const { error } = await supabase.from('products').insert(product);

    if (error) {
      console.error(`Failed to insert ${product.name}:`, error.message);
      errorCount++;
    } else {
      successCount++;
    }
  }

  console.log(`✅ Successfully seeded ${successCount} products`);
  if (errorCount > 0) {
    console.log(`⚠️ Failed to seed ${errorCount} products`);
  }

  console.log('✅ Products seeded successfully.');
  process.exit(0);

}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

