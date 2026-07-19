/**
 * Fetches products from DummyJSON public API
 * @param {string} query Search query (e.g., 'laptop', 'smartphone')
 * @returns {Array} Array of mapped product objects
 */
export const fetchExternalProducts = async (query = 'laptop') => {
    try {
        // DummyJSON Search API
        const url = `https://dummyjson.com/products/search?q=${encodeURIComponent(query)}&limit=10`;
        
        const response = await fetch(url);

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`DummyJSON API Error: ${response.status} - ${errorText}`);
        }

        const data = await response.json();
        
        if (!data || !data.products || !Array.isArray(data.products)) {
            return [];
        }

        // Map DummyJSON structure to our simple Product schema
        const mappedProducts = data.products.map(item => {
            // Convert USD price (e.g., $1099) to INR roughly (e.g., * 83) for realism since the store uses ₹
            const convertedPrice = Math.floor(item.price * 83);
            
            return {
                name: item.title || 'Unknown Product',
                description: item.description || 'No description available.',
                price: convertedPrice > 0 ? convertedPrice : 9999,
                // DummyJSON provides a thumbnail and an array of images. We'll use the thumbnail.
                image: item.thumbnail || item.images?.[0] || 'https://via.placeholder.com/400',
                stock: item.stock || (Math.floor(Math.random() * 50) + 10),
                sourceUrl: `https://dummyjson.com/products/${item.id}`
            };
        });

        return mappedProducts;

    } catch (error) {
        console.error('Error fetching from External API:', error.message);
        throw error;
    }
};
