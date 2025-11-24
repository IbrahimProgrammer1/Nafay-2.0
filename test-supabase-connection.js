// Quick Supabase connection test
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('\n🔍 Testing Supabase Connection...\n');

// Check if environment variables are set
console.log('1. Environment Variables:');
console.log('   NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? '✅ Set' : '❌ Not Set');
console.log('   NEXT_PUBLIC_SUPABASE_ANON_KEY:', supabaseAnonKey ? '✅ Set' : '❌ Not Set');

if (!supabaseUrl || !supabaseAnonKey) {
    console.log('\n❌ Supabase credentials are missing!');
    console.log('   Please create .env.local file with your Supabase credentials.');
    process.exit(1);
}

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Test connection by querying products table
async function testConnection() {
    try {
        console.log('\n2. Testing Database Connection...');

        const { data, error } = await supabase
            .from('products')
            .select('id')
            .limit(1);

        if (error) {
            console.log('   ❌ Database Error:', error.message);
            console.log('\n   Possible causes:');
            console.log('   - Products table does not exist');
            console.log('   - RLS policies are blocking access');
            console.log('   - Network/firewall issues');
            return false;
        }

        console.log('   ✅ Successfully connected to Supabase!');
        console.log('   ✅ Products table is accessible');

        if (data && data.length > 0) {
            console.log('   ✅ Found products in database');
        } else {
            console.log('   ⚠️  No products found (table may be empty)');
        }

        return true;
    } catch (err) {
        console.log('   ❌ Connection failed:', err.message);
        return false;
    }
}

// Test additional tables
async function testAllTables() {
    const tables = ['wishlists', 'comparisons', 'recently_viewed', 'inquiries'];

    console.log('\n3. Testing Additional Tables:');

    for (const table of tables) {
        try {
            const { error } = await supabase.from(table).select('*').limit(1);

            if (error) {
                console.log(`   ❌ ${table}: Not accessible - ${error.message}`);
            } else {
                console.log(`   ✅ ${table}: Accessible`);
            }
        } catch (err) {
            console.log(`   ❌ ${table}: Error - ${err.message}`);
        }
    }
}

// Run tests
(async () => {
    const isConnected = await testConnection();

    if (isConnected) {
        await testAllTables();
        console.log('\n✅ Supabase is properly connected!\n');
    } else {
        console.log('\n❌ Supabase connection failed. Please check your credentials and database setup.\n');
        process.exit(1);
    }
})();
