import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/product.model.js';
import Category from './models/category.model.js';

dotenv.config();

const connectionToDB = async () => {
    try {
        const { connection } = await mongoose.connect(
            process.env.MONGO_URI || `mongodb://127.0.0.1:27017/e-commerce`
        );
        if (connection) {
            console.log(`Connected to MongoDB: ${connection.host}`);
        }
    } catch (e) {
        console.log(e);
        process.exit(1);
    }
};

const categoriesData = [
    { name: 'Processors', description: 'CPUs for all computing needs' },
    { name: 'Graphics Cards', description: 'GPUs for gaming and rendering' },
    { name: 'Motherboards', description: 'The foundation of your PC build' },
    { name: 'Memory (RAM)', description: 'Fast volatile memory for multitasking' },
    { name: 'Storage', description: 'SSDs and HDDs for data storage' },
    { name: 'Monitors', description: 'Displays for gaming and productivity' },
    { name: 'Peripherals', description: 'Keyboards, mice, and more' },
    { name: 'Laptops', description: 'High-performance laptops and ultrabooks' },
    { name: 'Desktops', description: 'Pre-built complete desktop computers' },
    { name: 'Smartphones', description: 'Latest mobile devices and smartphones' }
];

const seedDB = async () => {
    await connectionToDB();

    console.log('Clearing existing data...');
    await Product.deleteMany({});
    await Category.deleteMany({});

    console.log('Inserting categories...');
    const insertedCategories = await Category.insertMany(categoriesData);

    const getCategoryId = (name) => insertedCategories.find(c => c.name === name)._id;

    const baseProducts = [
        {
            name: 'Intel Core i9-14900K',
            description: '24-Core (8P+16E) Desktop Processor, 14th Gen.',
            price: 589.99,
            image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=500&q=80',
            category: getCategoryId('Processors'),
            stock: 50
        },
        {
            name: 'AMD Ryzen 7 7800X3D',
            description: '8-Core, 16-Thread Desktop Processor with 3D V-Cache Technology.',
            price: 399.00,
            image: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=500&q=80',
            category: getCategoryId('Processors'),
            stock: 120
        },
        {
            name: 'NVIDIA GeForce RTX 4090',
            description: '24GB GDDR6X, Ada Lovelace Architecture, DLSS 3.',
            price: 1599.99,
            image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=500&q=80',
            category: getCategoryId('Graphics Cards'),
            stock: 15
        },
        {
            name: 'ASUS ROG Strix B650E-F Gaming WiFi',
            description: 'AM5 ATX motherboard, PCIe 5.0, DDR5, WiFi 6E.',
            price: 269.99,
            image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&q=80',
            category: getCategoryId('Motherboards'),
            stock: 45
        }
    ];

    // Data pools for realistic procedural generation
    const laptops = [
        { brand: 'Apple', lines: ['MacBook Pro 14"', 'MacBook Pro 16"', 'MacBook Air M2', 'MacBook Air M3'] },
        { brand: 'Dell', lines: ['XPS 13', 'XPS 15', 'Alienware m16', 'Alienware x14'] },
        { brand: 'HP', lines: ['Spectre x360', 'Omen 16', 'Envy 14'] },
        { brand: 'Lenovo', lines: ['ThinkPad X1 Carbon', 'Legion Pro 7i', 'Yoga 9i'] },
        { brand: 'ASUS', lines: ['ROG Zephyrus G14', 'Zenbook Pro', 'TUF Gaming A15'] }
    ];

    const desktops = [
        { brand: 'Alienware', lines: ['Aurora R15', 'Aurora R16'] },
        { brand: 'HP', lines: ['Omen 45L', 'Envy Desktop'] },
        { brand: 'CyberPowerPC', lines: ['Gamer Xtreme', 'Gamer Supreme'] },
        { brand: 'Apple', lines: ['iMac 24"', 'Mac Studio', 'Mac Pro'] },
        { brand: 'Corsair', lines: ['Vengeance i7400', 'One i300'] }
    ];

    const smartphones = [
        { brand: 'Apple', lines: ['iPhone 15 Pro Max', 'iPhone 15', 'iPhone 14', 'iPhone 13'] },
        { brand: 'Samsung', lines: ['Galaxy S24 Ultra', 'Galaxy S23 FE', 'Galaxy Z Fold 5', 'Galaxy A54'] },
        { brand: 'Google', lines: ['Pixel 8 Pro', 'Pixel 8', 'Pixel 7a'] },
        { brand: 'OnePlus', lines: ['OnePlus 12', 'OnePlus 11', 'OnePlus Open'] }
    ];

    const ram = [
        { brand: 'Corsair', lines: ['Vengeance RGB 32GB (2x16GB) DDR5', 'Dominator Platinum 64GB DDR5', 'Vengeance LPX 16GB DDR4'] },
        { brand: 'G.Skill', lines: ['Trident Z5 Neo 32GB DDR5', 'Ripjaws V 32GB DDR4'] },
        { brand: 'Kingston', lines: ['Fury Beast 32GB DDR5', 'Fury Renegade 16GB DDR4'] }
    ];

    const storage = [
        { brand: 'Samsung', lines: ['990 PRO 2TB NVMe SSD', '980 PRO 1TB NVMe', '870 EVO 2TB SATA SSD'] },
        { brand: 'WD', lines: ['Black SN850X 2TB NVMe', 'Blue 4TB HDD 7200RPM', 'Red Plus 8TB NAS HDD'] },
        { brand: 'Seagate', lines: ['FireCuda 530 2TB SSD', 'BarraCuda 2TB HDD', 'IronWolf 4TB NAS HDD'] },
        { brand: 'Crucial', lines: ['T700 2TB Gen5 NVMe', 'P3 Plus 1TB NVMe', 'MX500 1TB SATA SSD'] }
    ];

    const imagePools = {
        'Laptops': [
            'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&q=80',
            'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&q=80',
            'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500&q=80',
            'https://images.unsplash.com/photo-1531297172866-0dc3c1706346?w=500&q=80',
            'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=500&q=80'
        ],
        'Desktops': [
            'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=500&q=80',
            'https://images.unsplash.com/photo-1616588589676-62b3bd4ff6d2?w=500&q=80',
            'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=500&q=80',
            'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=500&q=80'
        ],
        'Smartphones': [
            'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&q=80',
            'https://images.unsplash.com/photo-1598327105666-5b89351cb31b?w=500&q=80',
            'https://images.unsplash.com/photo-1533228100845-08145b01de14?w=500&q=80',
            'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=500&q=80'
        ],
        'Memory (RAM)': [
            'https://images.unsplash.com/photo-1562976540-1502c2145186?w=500&q=80',
            'https://images.unsplash.com/photo-1541029071515-84cc54f84dc5?w=500&q=80'
        ],
        'Storage': [
            'https://images.unsplash.com/photo-1597852074816-d933c7d2b988?w=500&q=80',
            'https://images.unsplash.com/photo-1531492746076-161ca9bcad58?w=500&q=80'
        ]
    };

    const getRandItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
    const getPrice = (min, max) => Number((Math.random() * (max - min) + min).toFixed(2));

    const extraProducts = [];

    // Generator helper
    const generateItems = (categoryName, dataPool, count, priceMin, priceMax) => {
        const images = imagePools[categoryName];
        for (let i = 0; i < count; i++) {
            const company = getRandItem(dataPool);
            const line = getRandItem(company.lines);
            const image = getRandItem(images);
            
            extraProducts.push({
                name: `${company.brand} ${line}`,
                description: `Premium ${categoryName.toLowerCase()} by ${company.brand}. Engineered for exceptional performance and reliability.`,
                price: getPrice(priceMin, priceMax),
                image: image,
                category: getCategoryId(categoryName),
                stock: Math.floor(Math.random() * 50) + 5
            });
        }
    };

    // Generate specific realistic items
    generateItems('Laptops', laptops, 15, 800, 2500);
    generateItems('Desktops', desktops, 10, 1000, 3500);
    generateItems('Smartphones', smartphones, 12, 500, 1400);
    generateItems('Memory (RAM)', ram, 8, 60, 250);
    generateItems('Storage', storage, 10, 50, 300);

    const productsData = [...baseProducts, ...extraProducts];

    console.log('Inserting products...');
    await Product.insertMany(productsData);

    console.log('Database seeded successfully with realistic tech products!');
    process.exit(0);
};

seedDB();
