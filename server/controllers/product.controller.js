import Product from '../models/product.model.js';
import Category from '../models/category.model.js';
import { fetchExternalProducts } from '../utils/externalProductService.js';

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({}).populate('category', 'name');
        res.status(200).json({ success: true, products });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('category', 'name');
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }
        res.status(200).json({ success: true, product });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const createProduct = async (req, res) => {
    try {
        const { name, description, price, category, stock, image } = req.body;
        
        if (!name || !description || !price || !category || !stock) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }

        const product = await Product.create({
            name,
            description,
            price,
            category,
            stock,
            image
        });

        res.status(201).json({ success: true, message: 'Product created successfully', product });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        res.status(200).json({ success: true, message: 'Product updated successfully', product });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        res.status(200).json({ success: true, message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const syncExternalProducts = async (req, res) => {
    try {
        const { query = 'laptop' } = req.body;
        
        // 1. Fetch from External API (DummyJSON)
        const externalProducts = await fetchExternalProducts(query);
        
        if (!externalProducts || externalProducts.length === 0) {
            return res.status(400).json({ success: false, message: 'No products found from External API' });
        }

        // 2. Determine category (default to "Electronics" or find one)
        let defaultCategory = await Category.findOne({ name: 'Electronics' });
        if (!defaultCategory) {
            defaultCategory = await Category.create({ name: 'Electronics', description: 'General Electronics' });
        }

        // 3. Clear existing data or keep it? We'll append for now or replace depending on logic.
        // For simplicity and safety, we will just add them. 
        const productsToInsert = externalProducts.map(p => ({
            ...p,
            category: defaultCategory._id
        }));

        const inserted = await Product.insertMany(productsToInsert);

        res.status(200).json({ 
            success: true, 
            message: `Successfully synced ${inserted.length} products from External API`,
            products: inserted 
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
