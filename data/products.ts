import { Product } from '@/types/product';

// Using reliable image URLs that will work consistently
export const products: Product[] = [
    {
        id: '1',
        slug: 'hp-probook-450-g3',
        name: 'HP ProBook 450 g3',
        description: 'Reliable business laptop with solid performance for professional work.',
        price: 42000,
        category: 'Business',
        images: ['https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500&h=400&fit=crop'],
        rating: 4.3,
        reviewCount: 45,
        inStock: true,
        tags: [],
        processor: 'i5-6th',
        ram: '8GB',
        storage: '500 HDD + 128 SSD',
        specs: {
            'Processor': 'Intel Core i5-6th Gen',
            'RAM': '8GB',
            'Storage': '500GB HDD + 128GB SSD',
            'Brand': 'HP'
        }
    },
    {
        id: '2',
        slug: 'hp-amd-a8-4500',
        name: 'HP AMD A8 4500',
        description: 'Affordable laptop with AMD processor for everyday computing.',
        price: 26000,
        category: 'Budget',
        images: ['https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500&h=400&fit=crop'],
        rating: 4.0,
        reviewCount: 32,
        inStock: true,
        tags: ['bestseller'],
        processor: 'AMD A8',
        ram: '8GB',
        storage: '500 HDD',
        specs: {
            'Processor': 'AMD A8-4500',
            'RAM': '8GB',
            'Storage': '500GB HDD',
            'Brand': 'HP'
        }
    },
    {
        id: '3',
        slug: 'hp-laptop-15-radeon',
        name: 'HP Laptop (15) Radeon',
        description: 'Compact laptop with Radeon graphics for multimedia tasks.',
        price: 30000,
        category: 'Budget',
        images: ['https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&h=400&fit=crop'],
        rating: 4.1,
        reviewCount: 28,
        inStock: true,
        tags: [],
        processor: 'AMD A4',
        ram: '8GB',
        storage: '240 SSD',
        gpu: 'Radeon R.3 1/2GB',
        specs: {
            'Processor': 'AMD A4',
            'RAM': '8GB',
            'Storage': '240GB SSD',
            'Graphics': 'Radeon R.3 1/2GB Card',
            'Brand': 'HP'
        }
    },
    {
        id: '4',
        slug: 'hp-probook-455-g5',
        name: 'HP ProBook 455 g5',
        description: 'Business laptop with dedicated graphics for presentations.',
        price: 35000,
        category: 'Business',
        images: ['https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=500&h=400&fit=crop'],
        rating: 4.2,
        reviewCount: 41,
        inStock: true,
        tags: [],
        processor: 'AMD A9',
        ram: '8GB',
        storage: '128 SSD',
        gpu: '512 MB Card',
        specs: {
            'Processor': 'AMD A9',
            'RAM': '8GB',
            'Storage': '128GB SSD',
            'Graphics': '512MB Graphics Card',
            'Brand': 'HP'
        }
    },
    {
        id: '5',
        slug: 'hp-folio-9480',
        name: 'HP Folio 9480',
        description: 'Ultra-thin business laptop with excellent portability.',
        price: 29000,
        category: 'Ultrabook',
        images: ['https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500&h=400&fit=crop'],
        rating: 4.4,
        reviewCount: 35,
        inStock: true,
        tags: ['new'],
        processor: 'i5-4th',
        ram: '8GB',
        storage: '128 SSD',
        specs: {
            'Processor': 'Intel Core i5-4th Gen',
            'RAM': '8GB',
            'Storage': '128GB SSD',
            'Brand': 'HP'
        }
    },
    {
        id: '6',
        slug: 'hp-9470-folio',
        name: 'HP 9470 Folio',
        description: 'Lightweight laptop ideal for business professionals.',
        price: 25000,
        category: 'Ultrabook',
        images: ['https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=500&h=400&fit=crop'],
        rating: 4.2,
        reviewCount: 29,
        inStock: true,
        tags: [],
        processor: 'i5-3rd',
        ram: '4GB',
        storage: '320 HDD',
        specs: {
            'Processor': 'Intel Core i5-3rd Gen',
            'RAM': '4GB',
            'Storage': '320GB HDD',
            'Brand': 'HP'
        }
    },
    {
        id: '7',
        slug: 'hp-notebook-radeon-122',
        name: 'HP NoteBook Radeon 122',
        description: 'Budget-friendly laptop with Radeon graphics.',
        price: 25000,
        category: 'Budget',
        images: ['https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=500&h=400&fit=crop'],
        rating: 4.0,
        reviewCount: 24,
        inStock: true,
        tags: ['bestseller'],
        processor: 'AMD',
        ram: '8GB',
        storage: '128 SSD',
        gpu: 'Radeon R2 1GB',
        specs: {
            'Processor': 'AMD Processor',
            'RAM': '8GB',
            'Storage': '128GB SSD',
            'Graphics': 'Radeon R2 1GB',
            'Brand': 'HP'
        }
    },
    {
        id: '8',
        slug: 'hp-640-g2',
        name: 'HP 640 G2',
        description: 'Reliable business laptop for everyday productivity.',
        price: 30000,
        category: 'Business',
        images: ['https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=500&h=400&fit=crop'],
        rating: 4.3,
        reviewCount: 38,
        inStock: true,
        tags: [],
        processor: 'i5-4th',
        ram: '8GB',
        storage: '128 SSD',
        specs: {
            'Processor': 'Intel Core i5-4th Gen',
            'RAM': '8GB',
            'Storage': '128GB SSD',
            'Brand': 'HP'
        }
    },
    {
        id: '9',
        slug: 'hp-ewx-17-notebook',
        name: 'HP EWX (17) NoteBook',
        description: '17-inch laptop with spacious display for multimedia.',
        price: 30000,
        category: 'Business',
        images: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&h=400&fit=crop'],
        rating: 4.2,
        reviewCount: 31,
        inStock: true,
        tags: [],
        processor: 'i5-4th',
        ram: '8GB',
        storage: '128 SSD',
        display: '17"',
        specs: {
            'Processor': 'Intel Core i5-4th Gen',
            'RAM': '8GB',
            'Storage': '128GB SSD',
            'Display': '17-inch',
            'Brand': 'HP'
        }
    },
    {
        id: '10',
        slug: 'hp-pavilion-notebook-17',
        name: 'HP Pavilion NoteBook (17)',
        description: 'Large screen laptop with powerful i7 processor.',
        price: 32000,
        category: 'Business',
        images: ['https://images.unsplash.com/photo-1484788984921-03950022c9ef?w=500&h=400&fit=crop'],
        rating: 4.4,
        reviewCount: 42,
        inStock: true,
        tags: [],
        processor: 'i7-4th',
        ram: '8GB',
        storage: '128 SSD',
        display: '17"',
        specs: {
            'Processor': 'Intel Core i7-4th Gen',
            'RAM': '8GB',
            'Storage': '128GB SSD',
            'Display': '17-inch',
            'Brand': 'HP'
        }
    },
    {
        id: '11',
        slug: 'hp-notebook-radeon',
        name: 'HP NoteBook Radeon',
        description: 'AMD-powered laptop with integrated graphics.',
        price: 28000,
        category: 'Budget',
        images: ['https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&h=400&fit=crop'],
        rating: 4.1,
        reviewCount: 26,
        inStock: true,
        tags: [],
        processor: 'AMD A8',
        ram: '8GB',
        storage: '128 SSD',
        specs: {
            'Processor': 'AMD A8',
            'RAM': '8GB',
            'Storage': '128GB SSD',
            'Brand': 'HP'
        }
    },
    {
        id: '12',
        slug: 'hp-840-g3',
        name: 'HP 840 G3',
        description: 'Premium business laptop with excellent build quality.',
        price: 44000,
        category: 'Business',
        images: ['https://images.unsplash.com/photo-1587614382346-4ec70e388b28?w=500&h=400&fit=crop'],
        rating: 4.6,
        reviewCount: 58,
        inStock: true,
        tags: ['new', 'bestseller'],
        processor: 'i5-6th',
        ram: '8GB',
        storage: '256 SSD',
        specs: {
            'Processor': 'Intel Core i5-6th Gen',
            'RAM': '8GB',
            'Storage': '256GB SSD',
            'Brand': 'HP'
        }
    },
    {
        id: '13',
        slug: 'hp-zbook-15',
        name: 'HP Zbook 15',
        description: 'Mobile workstation with dedicated graphics card.',
        price: 33000,
        category: 'Creator',
        images: ['https://images.unsplash.com/photo-1601524909162-ae8725290836?w=500&h=400&fit=crop'],
        rating: 4.5,
        reviewCount: 47,
        inStock: true,
        tags: ['new'],
        processor: 'i5-4th',
        ram: '8GB',
        storage: '180 SSD',
        gpu: '1GB Card',
        specs: {
            'Processor': 'Intel Core i5-4th Gen',
            'RAM': '8GB',
            'Storage': '180GB SSD',
            'Graphics': '1GB Graphics Card',
            'Brand': 'HP'
        }
    },
    {
        id: '14',
        slug: 'hp-folio-1020',
        name: 'HP Folio 1020',
        description: 'Ultra-portable laptop with Core M processor.',
        price: 30000,
        category: 'Ultrabook',
        images: ['https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=500&h=400&fit=crop'],
        rating: 4.3,
        reviewCount: 33,
        inStock: true,
        tags: [],
        processor: 'M-5Y51 1020',
        ram: '8GB',
        storage: '128 SSD',
        specs: {
            'Processor': 'Intel Core M-5Y51',
            'RAM': '8GB',
            'Storage': '128GB SSD',
            'Brand': 'HP'
        }
    },
    {
        id: '15',
        slug: 'hp-probook-4540',
        name: 'HP ProBook 4540',
        description: 'Budget business laptop for basic office tasks.',
        price: 21000,
        category: 'Budget',
        images: ['https://images.unsplash.com/photo-1587614387466-0a72ca909e16?w=500&h=400&fit=crop'],
        rating: 4.0,
        reviewCount: 22,
        inStock: true,
        tags: ['bestseller'],
        processor: 'i3-3rd',
        ram: '4GB',
        storage: '320 HDD',
        specs: {
            'Processor': 'Intel Core i3-3rd Gen',
            'RAM': '4GB',
            'Storage': '320GB HDD',
            'Brand': 'HP'
        }
    },
    {
        id: '16',
        slug: 'hp-zbook-15-g4',
        name: 'HP Zbook 15 G4',
        description: 'High-performance workstation for professional creators.',
        price: 65000,
        category: 'Creator',
        images: ['https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=500&h=400&fit=crop'],
        rating: 4.8,
        reviewCount: 72,
        inStock: true,
        tags: ['new', 'bestseller'],
        processor: 'i7-7th',
        ram: '8GB',
        storage: '128 SSD',
        specs: {
            'Processor': 'Intel Core i7-7th Gen',
            'RAM': '8GB',
            'Storage': '128GB SSD',
            'Brand': 'HP'
        }
    },
    {
        id: '17',
        slug: 'hp-elite-book-840-g5-i7',
        name: 'HP Elite Book 840 G5',
        description: 'Premium business laptop with 8th gen i7 processor.',
        price: 67000,
        category: 'Business',
        images: ['https://images.unsplash.com/photo-1589561253898-768105ca91a8?w=500&h=400&fit=crop'],
        rating: 4.7,
        reviewCount: 65,
        inStock: true,
        tags: ['bestseller'],
        processor: 'i7-8th',
        ram: '8GB',
        storage: '256 SSD',
        specs: {
            'Processor': 'Intel Core i7-8th Gen',
            'RAM': '8GB',
            'Storage': '256GB SSD',
            'Brand': 'HP'
        }
    },
    {
        id: '18',
        slug: 'hp-elite-book-840-g5-i5',
        name: 'HP Elite Book 840 G5 (i5)',
        description: 'Business laptop with excellent battery life.',
        price: 60000,
        category: 'Business',
        images: ['https://images.unsplash.com/photo-1602080858428-57174f9431cf?w=500&h=400&fit=crop'],
        rating: 4.6,
        reviewCount: 56,
        inStock: true,
        tags: ['new'],
        processor: 'i5-8th',
        ram: '8GB',
        storage: '256 SSD',
        specs: {
            'Processor': 'Intel Core i5-8th Gen',
            'RAM': '8GB',
            'Storage': '256GB SSD',
            'Brand': 'HP'
        }
    },
    {
        id: '19',
        slug: 'hp-zbook-144-g5',
        name: 'HP Zbook 144 G5',
        description: 'Compact workstation with dedicated graphics.',
        price: 64000,
        category: 'Creator',
        images: ['https://images.unsplash.com/photo-1542393545-10f5cde2c810?w=500&h=400&fit=crop'],
        rating: 4.5,
        reviewCount: 48,
        inStock: true,
        tags: [],
        processor: 'i5-8th',
        ram: '8GB',
        storage: '256 SSD',
        gpu: '2GB Card',
        specs: {
            'Processor': 'Intel Core i5-8th Gen',
            'RAM': '8GB',
            'Storage': '256GB SSD',
            'Graphics': '2GB Graphics Card',
            'Brand': 'HP'
        }
    },
    {
        id: '20',
        slug: 'hp-pavilion-x-360',
        name: 'HP Pavilion x 360',
        description: 'Convertible laptop with touchscreen and 360-degree hinge.',
        price: 78000,
        category: 'Ultrabook',
        images: ['https://images.unsplash.com/photo-1560807707-8cc77767d783?w=500&h=400&fit=crop'],
        rating: 4.7,
        reviewCount: 82,
        inStock: true,
        tags: ['new', 'bestseller'],
        processor: 'i5-10th',
        ram: '8GB',
        storage: '256 SSD',
        specs: {
            'Processor': 'Intel Core i5-10th Gen',
            'RAM': '8GB',
            'Storage': '256GB SSD',
            'Features': '360-degree Convertible',
            'Brand': 'HP'
        }
    },
    {
        id: '21',
        slug: 'hp-z-book-aq',
        name: 'HP Z Book AQ',
        description: 'Premium workstation with 32GB RAM for demanding tasks.',
        price: 110000,
        category: 'Creator',
        images: ['https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?w=500&h=400&fit=crop'],
        rating: 4.9,
        reviewCount: 95,
        inStock: true,
        tags: ['bestseller'],
        processor: 'i7-8th',
        ram: '32GB',
        storage: '512 SSD',
        gpu: '4GB Card',
        specs: {
            'Processor': 'Intel Core i7-8th Gen',
            'RAM': '32GB',
            'Storage': '512GB SSD',
            'Graphics': '4GB Graphics Card',
            'Brand': 'HP'
        }
    },
    {
        id: '22',
        slug: 'hp-elite-book-850-g5',
        name: 'HP Elite Book 850 G5',
        description: '15-inch business laptop with premium features.',
        price: 74000,
        category: 'Business',
        images: ['https://images.unsplash.com/photo-1585792180666-f7347c490ee2?w=500&h=400&fit=crop'],
        rating: 4.7,
        reviewCount: 68,
        inStock: true,
        tags: [],
        processor: 'i7-8th',
        ram: '8GB',
        storage: '256 SSD',
        specs: {
            'Processor': 'Intel Core i7-8th Gen',
            'RAM': '8GB',
            'Storage': '256GB SSD',
            'Brand': 'HP'
        }
    },
    {
        id: '23',
        slug: 'hp-elite-book-1040',
        name: 'HP Elite Book 1040',
        description: 'Premium ultrabook for executives.',
        price: 54000,
        category: 'Ultrabook',
        images: ['https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=400&fit=crop'],
        rating: 4.6,
        reviewCount: 51,
        inStock: true,
        tags: [],
        processor: 'i5-7th',
        ram: '8GB',
        storage: '256 SSD',
        specs: {
            'Processor': 'Intel Core i5-7th Gen',
            'RAM': '8GB',
            'Storage': '256GB SSD',
            'Brand': 'HP'
        }
    },
    {
        id: '24',
        slug: 'hp-probook-650-g8',
        name: 'HP Probook 650 G8',
        description: 'Latest generation business laptop with 11th gen processor.',
        price: 95000,
        category: 'Business',
        images: ['https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500&h=400&fit=crop'],
        rating: 4.8,
        reviewCount: 87,
        inStock: true,
        tags: ['new', 'bestseller'],
        processor: 'i5-11th',
        ram: '16GB',
        storage: '512 SSD',
        specs: {
            'Processor': 'Intel Core i5-11th Gen',
            'RAM': '16GB',
            'Storage': '512GB SSD',
            'Brand': 'HP'
        }
    },
    {
        id: '25',
        slug: 'hp-pavilion-laptop-15',
        name: 'HP Pavilion Laptop 15',
        description: 'Powerful laptop for students and professionals.',
        price: 85000,
        category: 'Business',
        images: ['https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500&h=400&fit=crop'],
        rating: 4.6,
        reviewCount: 73,
        inStock: true,
        tags: ['new'],
        processor: 'i5-11th',
        ram: '16GB',
        storage: '512 SSD',
        specs: {
            'Processor': 'Intel Core i5-11th Gen',
            'RAM': '16GB',
            'Storage': '512GB SSD',
            'Brand': 'HP'
        }
    },
    {
        id: '26',
        slug: 'dell-5240',
        name: 'Dell 5240',
        description: 'Affordable Dell laptop for basic computing needs.',
        price: 21000,
        category: 'Budget',
        images: ['https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&h=400&fit=crop'],
        rating: 3.9,
        reviewCount: 18,
        inStock: true,
        tags: ['bestseller'],
        processor: 'i5-2nd',
        ram: '4GB',
        storage: '320 HDD',
        specs: {
            'Processor': 'Intel Core i5-2nd Gen',
            'RAM': '4GB',
            'Storage': '320GB HDD',
            'Brand': 'DELL'
        }
    },
    {
        id: '27',
        slug: 'dell-6420',
        name: 'Dell 6420',
        description: 'Entry-level Dell laptop for everyday use.',
        price: 20000,
        category: 'Budget',
        images: ['https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=500&h=400&fit=crop'],
        rating: 3.8,
        reviewCount: 16,
        inStock: true,
        tags: [],
        processor: 'i5-2nd',
        ram: '4GB',
        storage: '250 HDD',
        specs: {
            'Processor': 'Intel Core i5-2nd Gen',
            'RAM': '4GB',
            'Storage': '250GB HDD',
            'Brand': 'DELL'
        }
    },
    {
        id: '28',
        slug: 'dell-inspiron-5558',
        name: 'Dell Inspiron 5558',
        description: 'Popular Inspiron series with SSD storage.',
        price: 30000,
        category: 'Business',
        images: ['https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500&h=400&fit=crop'],
        rating: 4.2,
        reviewCount: 34,
        inStock: true,
        tags: [],
        processor: 'i3-5th',
        ram: '8GB',
        storage: '128 SSD',
        specs: {
            'Processor': 'Intel Core i3-5th Gen',
            'RAM': '8GB',
            'Storage': '128GB SSD',
            'Brand': 'DELL'
        }
    },
    {
        id: '29',
        slug: 'dell-inspiron-15-i3',
        name: 'Dell Inspiron 15',
        description: '15-inch laptop with 7th gen processor.',
        price: 39000,
        category: 'Business',
        images: ['https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=500&h=400&fit=crop'],
        rating: 4.3,
        reviewCount: 41,
        inStock: true,
        tags: [],
        processor: 'i3-7th',
        ram: '8GB',
        storage: '256 SSD',
        specs: {
            'Processor': 'Intel Core i3-7th Gen',
            'RAM': '8GB',
            'Storage': '256GB SSD',
            'Brand': 'DELL'
        }
    },
    {
        id: '30',
        slug: 'dell-5570',
        name: 'Dell 5570',
        description: 'Mid-range Dell laptop with good performance.',
        price: 42000,
        category: 'Business',
        images: ['https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=500&h=400&fit=crop'],
        rating: 4.4,
        reviewCount: 46,
        inStock: true,
        tags: [],
        processor: 'i5-6th',
        ram: '8GB',
        storage: '256 SSD',
        specs: {
            'Processor': 'Intel Core i5-6th Gen',
            'RAM': '8GB',
            'Storage': '256GB SSD',
            'Brand': 'DELL'
        }
    },
    {
        id: '31',
        slug: 'dell-3500',
        name: 'Dell 3500',
        description: 'Modern Dell laptop with 8th gen processor.',
        price: 50000,
        category: 'Business',
        images: ['https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=500&h=400&fit=crop'],
        rating: 4.5,
        reviewCount: 52,
        inStock: true,
        tags: ['new'],
        processor: 'i5-8th',
        ram: '8GB',
        storage: '128 SSD',
        specs: {
            'Processor': 'Intel Core i5-8th Gen',
            'RAM': '8GB',
            'Storage': '128GB SSD',
            'Brand': 'DELL'
        }
    },
    {
        id: '32',
        slug: 'dell-inspiron-5737',
        name: 'Dell Inspiron 5737',
        description: '17-inch Inspiron with spacious display.',
        price: 32000,
        category: 'Business',
        images: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&h=400&fit=crop'],
        rating: 4.2,
        reviewCount: 36,
        inStock: true,
        tags: [],
        processor: 'i5-4th',
        ram: '8GB',
        storage: '128 SSD',
        display: '17"',
        specs: {
            'Processor': 'Intel Core i5-4th Gen',
            'RAM': '8GB',
            'Storage': '128GB SSD',
            'Display': '17-inch',
            'Brand': 'DELL'
        }
    },
    {
        id: '33',
        slug: 'dell-precision-3800',
        name: 'Dell Precision 3800',
        description: 'Mobile workstation with i7 processor.',
        price: 40000,
        category: 'Creator',
        images: ['https://images.unsplash.com/photo-1484788984921-03950022c9ef?w=500&h=400&fit=crop'],
        rating: 4.4,
        reviewCount: 43,
        inStock: true,
        tags: [],
        processor: 'i7-4th',
        ram: '8GB',
        storage: '256 SSD',
        specs: {
            'Processor': 'Intel Core i7-4th Gen',
            'RAM': '8GB',
            'Storage': '256GB SSD',
            'Brand': 'DELL'
        }
    },
    {
        id: '34',
        slug: 'dell-inspiron-15-3555',
        name: 'Dell Inspiron 15 3555',
        description: 'Budget-friendly AMD-powered laptop.',
        price: 25000,
        category: 'Budget',
        images: ['https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&h=400&fit=crop'],
        rating: 4.0,
        reviewCount: 25,
        inStock: true,
        tags: ['bestseller'],
        processor: 'AMD',
        ram: '4GB',
        storage: '500 HDD',
        specs: {
            'Processor': 'AMD Processor',
            'RAM': '4GB',
            'Storage': '500GB HDD',
            'Brand': 'DELL'
        }
    },
    {
        id: '35',
        slug: 'dell-5450',
        name: 'Dell 5450',
        description: 'Compact business laptop with SSD.',
        price: 30000,
        category: 'Business',
        images: ['https://images.unsplash.com/photo-1587614382346-4ec70e388b28?w=500&h=400&fit=crop'],
        rating: 4.3,
        reviewCount: 32,
        inStock: true,
        tags: [],
        processor: 'i5-5th',
        ram: '8GB',
        storage: '128 SSD',
        specs: {
            'Processor': 'Intel Core i5-5th Gen',
            'RAM': '8GB',
            'Storage': '128GB SSD',
            'Brand': 'DELL'
        }
    },
    {
        id: '36',
        slug: 'dell-3440',
        name: 'Dell 3440',
        description: 'Reliable Dell laptop for office work.',
        price: 28000,
        category: 'Business',
        images: ['https://images.unsplash.com/photo-1601524909162-ae8725290836?w=500&h=400&fit=crop'],
        rating: 4.1,
        reviewCount: 29,
        inStock: true,
        tags: [],
        processor: 'i5-4th',
        ram: '8GB',
        storage: '128 SSD',
        specs: {
            'Processor': 'Intel Core i5-4th Gen',
            'RAM': '8GB',
            'Storage': '128GB SSD',
            'Brand': 'DELL'
        }
    },
    {
        id: '37',
        slug: 'dell-5440',
        name: 'Dell 5440',
        description: 'Business laptop with i7 performance.',
        price: 30000,
        category: 'Business',
        images: ['https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=500&h=400&fit=crop'],
        rating: 4.3,
        reviewCount: 35,
        inStock: true,
        tags: [],
        processor: 'i7-4th',
        ram: '4GB',
        storage: '128 SSD',
        specs: {
            'Processor': 'Intel Core i7-4th Gen',
            'RAM': '4GB',
            'Storage': '128GB SSD',
            'Brand': 'DELL'
        }
    },
    {
        id: '38',
        slug: 'dell-7440-i5',
        name: 'Dell 7440',
        description: 'Premium business laptop with excellent build.',
        price: 30000,
        category: 'Business',
        images: ['https://images.unsplash.com/photo-1587614387466-0a72ca909e16?w=500&h=400&fit=crop'],
        rating: 4.4,
        reviewCount: 38,
        inStock: true,
        tags: [],
        processor: 'i5-4th',
        ram: '8GB',
        storage: '128 SSD',
        specs: {
            'Processor': 'Intel Core i5-4th Gen',
            'RAM': '8GB',
            'Storage': '128GB SSD',
            'Brand': 'DELL'
        }
    },
    {
        id: '39',
        slug: 'dell-7270',
        name: 'Dell 7270',
        description: 'Ultraportable laptop with 6th gen i7.',
        price: 37000,
        category: 'Ultrabook',
        images: ['https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=500&h=400&fit=crop'],
        rating: 4.5,
        reviewCount: 44,
        inStock: true,
        tags: ['new'],
        processor: 'i7-6th',
        ram: '8GB',
        storage: '256 SSD',
        specs: {
            'Processor': 'Intel Core i7-6th Gen',
            'RAM': '8GB',
            'Storage': '256GB SSD',
            'Brand': 'DELL'
        }
    },
    {
        id: '40',
        slug: 'dell-5470',
        name: 'Dell 5470',
        description: 'Business laptop with dedicated 2GB graphics.',
        price: 38000,
        category: 'Business',
        images: ['https://images.unsplash.com/photo-1589561253898-768105ca91a8?w=500&h=400&fit=crop'],
        rating: 4.4,
        reviewCount: 41,
        inStock: true,
        tags: [],
        processor: 'i5-6th',
        ram: '8GB',
        storage: '256 SSD',
        gpu: '2GB Card',
        specs: {
            'Processor': 'Intel Core i5-6th Gen',
            'RAM': '8GB',
            'Storage': '256GB SSD',
            'Graphics': '2GB Graphics Card',
            'Brand': 'DELL'
        }
    },
    {
        id: '41',
        slug: 'dell-inspiron-3521',
        name: 'Dell Inspiron 3521',
        description: 'Basic laptop with Celeron processor.',
        price: 20000,
        category: 'Budget',
        images: ['https://images.unsplash.com/photo-1602080858428-57174f9431cf?w=500&h=400&fit=crop'],
        rating: 3.7,
        reviewCount: 15,
        inStock: true,
        tags: [],
        processor: 'Celeron',
        ram: '4GB',
        storage: '250 HDD',
        specs: {
            'Processor': 'Intel Celeron',
            'RAM': '4GB',
            'Storage': '250GB HDD',
            'Brand': 'DELL'
        }
    },
    {
        id: '42',
        slug: 'dell-7440-i7',
        name: 'Dell 7440 (i7)',
        description: 'High-performance business laptop.',
        price: 44000,
        category: 'Business',
        images: ['https://images.unsplash.com/photo-1542393545-10f5cde2c810?w=500&h=400&fit=crop'],
        rating: 4.6,
        reviewCount: 49,
        inStock: true,
        tags: ['bestseller'],
        processor: 'i7-6th',
        ram: '8GB',
        storage: '256 SSD',
        specs: {
            'Processor': 'Intel Core i7-6th Gen',
            'RAM': '8GB',
            'Storage': '256GB SSD',
            'Brand': 'DELL'
        }
    },
    {
        id: '43',
        slug: 'dell-inspiron-7568',
        name: 'Dell Inspiron 7568',
        description: '2-in-1 convertible laptop with touchscreen.',
        price: 52000,
        category: 'Ultrabook',
        images: ['https://images.unsplash.com/photo-1560807707-8cc77767d783?w=500&h=400&fit=crop'],
        rating: 4.7,
        reviewCount: 64,
        inStock: true,
        tags: ['new', 'bestseller'],
        processor: 'i5-6th',
        ram: '8GB',
        storage: '256 SSD',
        specs: {
            'Processor': 'Intel Core i5-6th Gen',
            'RAM': '8GB',
            'Storage': '256GB SSD',
            'Features': '360-degree Touch Convertible',
            'Brand': 'DELL'
        }
    },
    {
        id: '44',
        slug: 'dell-7390-2-in-1',
        name: 'Dell 7390 2 in 1',
        description: '2-in-1 laptop with modern design and touch display.',
        price: 47000,
        category: 'Ultrabook',
        images: ['https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?w=500&h=400&fit=crop'],
        rating: 4.6,
        reviewCount: 55,
        inStock: true,
        tags: ['new'],
        processor: 'i5-8th',
        ram: '8GB',
        storage: '256 SSD',
        specs: {
            'Processor': 'Intel Core i5-8th Gen',
            'RAM': '8GB',
            'Storage': '256GB SSD',
            'Features': '360-degree Touch Convertible',
            'Brand': 'DELL'
        }
    },
    {
        id: '45',
        slug: 'dell-5490',
        name: 'Dell 5490',
        description: 'Modern business laptop with 8th gen processor.',
        price: 45000,
        category: 'Business',
        images: ['https://images.unsplash.com/photo-1585792180666-f7347c490ee2?w=500&h=400&fit=crop'],
        rating: 4.5,
        reviewCount: 48,
        inStock: true,
        tags: [],
        processor: 'i5-8th',
        ram: '8GB',
        storage: '256 SSD',
        specs: {
            'Processor': 'Intel Core i5-8th Gen',
            'RAM': '8GB',
            'Storage': '256GB SSD',
            'Brand': 'DELL'
        }
    },
    {
        id: '46',
        slug: 'dell-7490',
        name: 'Dell 7490',
        description: 'Premium business laptop with i7 power.',
        price: 52000,
        category: 'Business',
        images: ['https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=400&fit=crop'],
        rating: 4.7,
        reviewCount: 59,
        inStock: true,
        tags: ['bestseller'],
        processor: 'i7-8th',
        ram: '8GB',
        storage: '256 SSD',
        specs: {
            'Processor': 'Intel Core i7-8th Gen',
            'RAM': '8GB',
            'Storage': '256GB SSD',
            'Brand': 'DELL'
        }
    },
    {
        id: '47',
        slug: 'dell-7285-2-in-1',
        name: 'Dell 7285 2 in 1',
        description: 'Versatile 2-in-1 laptop with detachable keyboard.',
        price: 38000,
        category: 'Ultrabook',
        images: ['https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500&h=400&fit=crop'],
        rating: 4.4,
        reviewCount: 39,
        inStock: true,
        tags: [],
        processor: 'i7-7th',
        ram: '8GB',
        storage: '128 SSD',
        specs: {
            'Processor': 'Intel Core i7-7th Gen',
            'RAM': '8GB',
            'Storage': '128GB SSD',
            'Features': '2-in-1 Convertible',
            'Brand': 'DELL'
        }
    },
    {
        id: '48',
        slug: 'dell-3400',
        name: 'Dell 3400',
        description: 'Business laptop with dedicated graphics for presentations.',
        price: 50000,
        category: 'Business',
        images: ['https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500&h=400&fit=crop'],
        rating: 4.5,
        reviewCount: 51,
        inStock: true,
        tags: [],
        processor: 'i7-8th',
        ram: '8GB',
        storage: '256 SSD',
        gpu: '2GB Card',
        specs: {
            'Processor': 'Intel Core i7-8th Gen',
            'RAM': '8GB',
            'Storage': '256GB SSD',
            'Graphics': '2GB Graphics Card',
            'Brand': 'DELL'
        }
    },
    {
        id: '49',
        slug: 'dell-7400',
        name: 'Dell 7400',
        description: 'High-end business laptop with modern features.',
        price: 50000,
        category: 'Business',
        images: ['https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&h=400&fit=crop'],
        rating: 4.6,
        reviewCount: 54,
        inStock: true,
        tags: ['new'],
        processor: 'i5-8th',
        ram: '8GB',
        storage: '256 SSD',
        specs: {
            'Processor': 'Intel Core i5-8th Gen',
            'RAM': '8GB',
            'Storage': '256GB SSD',
            'Brand': 'DELL'
        }
    },
    {
        id: '50',
        slug: 'dell-7420',
        name: 'Dell 7420',
        description: 'Latest generation laptop with 11th gen i7.',
        price: 85000,
        category: 'Business',
        images: ['https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=500&h=400&fit=crop'],
        rating: 4.8,
        reviewCount: 76,
        inStock: true,
        tags: ['new', 'bestseller'],
        processor: 'i7-11th',
        ram: '16GB',
        storage: '256 SSD',
        specs: {
            'Processor': 'Intel Core i7-11th Gen',
            'RAM': '16GB',
            'Storage': '256GB SSD',
            'Brand': 'DELL'
        }
    },
    {
        id: '51',
        slug: 'dell-5420',
        name: 'Dell 5420',
        description: 'Modern business laptop with excellent performance.',
        price: 70000,
        category: 'Business',
        images: ['https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500&h=400&fit=crop'],
        rating: 4.7,
        reviewCount: 63,
        inStock: true,
        tags: ['new'],
        processor: 'i5-11th',
        ram: '16GB',
        storage: '256 SSD',
        specs: {
            'Processor': 'Intel Core i5-11th Gen',
            'RAM': '16GB',
            'Storage': '256GB SSD',
            'Brand': 'DELL'
        }
    },
    {
        id: '52',
        slug: 'lenovo-t560',
        name: 'Lenovo T560',
        description: 'ThinkPad T560 with business-class reliability.',
        price: 42000,
        category: 'Business',
        images: ['https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=500&h=400&fit=crop'],
        rating: 4.5,
        reviewCount: 47,
        inStock: true,
        tags: [],
        processor: 'i5-6th',
        ram: '8GB',
        storage: '240 SSD',
        specs: {
            'Processor': 'Intel Core i5-6th Gen',
            'RAM': '8GB',
            'Storage': '240GB SSD',
            'Brand': 'LENOVO'
        }
    }
];

// Helper functions
export function getProductBySlug(slug: string): Product | undefined {
    return products.find((product) => product.slug === slug);
}

export function getProductById(id: string): Product | undefined {
    return products.find((product) => product.id === id);
}

export function getProductsByIds(ids: string[]): Product[] {
    // Create a map for O(1) lookup
    const productMap = new Map(products.map((product) => [product.id, product]));

    // Return products in the same order as the input IDs, filtering out invalid IDs
    return ids
        .map((id) => productMap.get(id))
        .filter((product): product is Product => product !== undefined);
}

export function getProductsByCategory(category: string): Product[] {
    return products.filter((product) =>
        product.category.toLowerCase() === category.toLowerCase()
    );
}

export function getFeaturedProducts(limit: number = 6): Product[] {
    return products
        .filter((product) => product.tags.includes('bestseller') || product.tags.includes('new'))
        .slice(0, limit);
}

export function getAllProducts(): Product[] {
    return products;
}


export function getProductsByBrand(brand: string): Product[] {
    return products.filter((product) =>
        product.specs && product.specs['Brand']?.toLowerCase() === brand.toLowerCase()
    );
}


