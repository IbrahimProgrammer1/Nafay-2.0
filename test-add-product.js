// Direct test to add a product to Supabase
const { createClient } = require('@supabase/supabase-js');
const { randomUUID } = require('crypto');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function addTestProduct() {
    console.log('Adding test product to Supabase...\n');

    const testProduct = {
        slug: `test-gaming-laptop-${Date.now()}`,
        name: 'Test Gaming Laptop Pro',
        description: 'High-performance gaming laptop for testing product creation',
        price: 85000,
        original_price: 95000,
        discount_percentage: 10,
        category: 'Gaming',
        images: ['https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500&h=400&fit=crop'],
        rating: 5,
        review_count: 0,
        in_stock: true,
        sizes: [],
        colors: [],
        tags: ['new', 'featured'],
        specs: {
            'Processor': 'Intel Core i7-12th Gen',
            'RAM': '16GB DDR5',
            'Storage': '512GB NVMe SSD',
            'Graphics': 'NVIDIA RTX 3060 6GB',
            'Display': '15.6" FHD 144Hz',
            'Brand': 'Test Brand'
        },
        processor: 'i7-12th',
        ram: '16GB',
        storage: '512 SSD',
        display: '15.6" FHD',
        gpu: 'RTX 3060',
        status: 'active',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
        .from('products')
        .insert(testProduct)
        .select()
        .single();

    if (error) {
        console.error('❌ Failed to add product:', error.message);
        console.error('Error details:', error);
        process.exit(1);
    }

    console.log('✅ Successfully added test product!');
    console.log('\nProduct Details:');
    console.log(`  ID: ${data.id}`);
    console.log(`  Name: ${data.name}`);
    console.log(`  Slug: ${data.slug}`);
    console.log(`  Price: ₹${data.price.toLocaleString()}`);
    console.log(`  Category: ${data.category}`);

    // Verify it appears in the products list
    const { data: allProducts, error: fetchError } = await supabase
        .from('products')
        .select('id, name, category, price')
        .neq('status', 'archived')
        .order('created_at', { ascending: false })
        .limit(5);

    if (fetchError) {
        console.error('❌ Failed to fetch products:', fetchError.message);
    } else {
        console.log(`\n✅ Total Products in Database: ${allProducts.length}`);
        console.log('\nLatest 5 Products:');
        allProducts.forEach((p, idx) => {
            console.log(`  ${idx + 1}. ${p.name} - ${p.category} - ₹${p.price.toLocaleString()}`);
        });
    }
}

addTestProduct();
