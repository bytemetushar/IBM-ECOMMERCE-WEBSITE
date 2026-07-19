import User from '../models/user.model.js';

export const getCart = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate({
            path: 'cart.product',
            select: 'name price image stock description'
        });
        
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        
        // Filter out null products (in case a product was deleted)
        const validCart = user.cart.filter(item => item.product != null);
        
        res.status(200).json({ success: true, cart: validCart });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const syncCart = async (req, res) => {
    try {
        const { cartItems } = req.body; // Array of { productId, quantity }
        
        if (!cartItems || !Array.isArray(cartItems)) {
            return res.status(400).json({ success: false, message: 'Invalid cart format' });
        }

        const formattedCart = cartItems.map(item => ({
            product: item.productId || item.product?._id || item._id,
            quantity: item.quantity
        }));

        const user = await User.findByIdAndUpdate(
            req.user.id,
            { cart: formattedCart },
            { new: true }
        ).populate({
            path: 'cart.product',
            select: 'name price image stock description'
        });

        res.status(200).json({ success: true, cart: user.cart });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const clearCart = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.user.id,
            { cart: [] },
            { new: true }
        );
        res.status(200).json({ success: true, message: 'Cart cleared successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
