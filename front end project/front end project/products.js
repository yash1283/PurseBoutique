// Product data
const products = [
    {
        id: '1',
        name: 'Elegant Tote Bag',
        category: 'Tote',
        price: 2999,
        image: 'https://images.unsplash.com/photo-1547413871-3a3a76fcc2a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        images: [
            'https://images.unsplash.com/photo-1547413871-3a3a76fcc2a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1547413871-3a3a76fcc2a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1547413871-3a3a76fcc2a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        ],
        description: 'A spacious and elegant tote bag perfect for everyday use. Made with premium vegan leather and durable stitching.',
        featured: true,
        bestseller: true,
        colors: ['Black', 'Brown', 'Beige'],
        stock: 25
    },
    {
        id: '2',
        name: 'Classic Crossbody Bag',
        category: 'Crossbody',
        price: 1899,
        image: 'https://images.unsplash.com/photo-1599505373273-67752e16c9c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        images: [
            'https://images.unsplash.com/photo-1599505373273-67752e16c9c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1599505373273-67752e16c9c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1599505373273-67752e16c9c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        ],
        description: 'A versatile crossbody bag that transitions seamlessly from day to night. Features multiple compartments for organization.',
        featured: true,
        new: true,
        colors: ['Navy', 'Maroon', 'Tan'],
        stock: 18
    },
    {
        id: '3',
        name: 'Crystal Evening Clutch',
        category: 'Clutch',
        price: 3499,
        image: 'https://images.unsplash.com/photo-1593588021984-1f78dbce592e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        images: [
            'https://images.unsplash.com/photo-1593588021984-1f78dbce592e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1593588021984-1f78dbce592e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1593588021984-1f78dbce592e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        ],
        description: 'An elegant clutch embellished with crystals, perfect for evening events and special occasions.',
        featured: true,
        bestseller: true,
        colors: ['Silver', 'Gold', 'Black'],
        stock: 12
    },
    {
        id: '4',
        name: 'Leather Wallet',
        category: 'Wallet',
        price: 999,
        image: 'https://images.unsplash.com/photo-1606760469658-a1be64a576fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        images: [
            'https://images.unsplash.com/photo-1606760469658-a1be64a576fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1606760469658-a1be64a576fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1606760469658-a1be64a576fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        ],
        description: 'A compact and stylish leather wallet with multiple card slots and a zippered coin pocket.',
        featured: true,
        sale: true,
        salePrice: 799,
        colors: ['Black', 'Brown', 'Red'],
        stock: 30
    },
    {
        id: '5',
        name: 'Summer Straw Bag',
        category: 'Tote',
        price: 1499,
        image: 'https://images.unsplash.com/photo-1578237486049-0c9a1add7eb4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        images: [
            'https://images.unsplash.com/photo-1578237486049-0c9a1add7eb4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1578237486049-0c9a1add7eb4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1578237486049-0c9a1add7eb4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        ],
        description: 'A chic straw bag perfect for summer outings and beach days. Spacious interior with a cotton lining.',
        featured: false,
        new: true,
        colors: ['Natural'],
        stock: 15
    },
    {
        id: '6',
        name: 'Mini Crossbody',
        category: 'Crossbody',
        price: 1299,
        image: 'https://images.unsplash.com/photo-1548863227-3af567fc3b27?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        images: [
            'https://images.unsplash.com/photo-1548863227-3af567fc3b27?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1548863227-3af567fc3b27?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1548863227-3af567fc3b27?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        ],
        description: 'A compact crossbody bag that holds just the essentials. Perfect for a night out or travel.',
        featured: false,
        bestseller: true,
        colors: ['Black', 'Pink', 'Blue'],
        stock: 22
    },
    {
        id: '7',
        name: 'Designer Clutch',
        category: 'Clutch',
        price: 2499,
        image: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        images: [
            'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        ],
        description: 'A designer clutch with a sleek and modern design. Features a detachable chain strap.',
        featured: false,
        sale: true,
        salePrice: 1999,
        colors: ['Black', 'Red', 'White'],
        stock: 10
    },
    {
        id: '8',
        name: 'Card Holder',
        category: 'Wallet',
        price: 599,
        image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        images: [
            'https://images.unsplash.com/photo-1627123424574-724758594e93?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1627123424574-724758594e93?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1627123424574-724758594e93?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        ],
        description: 'A slim and minimalist card holder for those who prefer to travel light. Holds up to 6 cards.',
        featured: false,
        new: true,
        colors: ['Black', 'Brown', 'Navy'],
        stock: 40
    }
];

// Function to load products by filter
function getProducts(filter = {}) {
    let result = [...products];
    
    // Filter by category
    if (filter.category) {
        result = result.filter(p => p.category.toLowerCase() === filter.category.toLowerCase());
    }
    
    // Filter by featured
    if (filter.featured) {
        result = result.filter(p => p.featured);
    }
    
    // Filter by new
    if (filter.new) {
        result = result.filter(p => p.new);
    }
    
    // Filter by bestseller
    if (filter.bestseller) {
        result = result.filter(p => p.bestseller);
    }
    
    // Filter by sale
    if (filter.sale) {
        result = result.filter(p => p.sale);
    }
    
    // Filter by price range
    if (filter.minPrice !== undefined && filter.maxPrice !== undefined) {
        result = result.filter(p => {
            const price = p.salePrice || p.price;
            return price >= filter.minPrice && price <= filter.maxPrice;
        });
    }
    
    // Sort products
    if (filter.sort) {
        switch (filter.sort) {
            case 'price-low-high':
                result.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
                break;
            case 'price-high-low':
                result.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
                break;
            case 'newest':
                // Assuming newer products have higher IDs for this example
                result.sort((a, b) => b.id - a.id);
                break;
            default:
                // Default sort (featured first)
                result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        }
    }
    
    return result;
}

// Function to get a single product by ID
function getProductById(id) {
    return products.find(p => p.id === id);
}

// Function to create a product card HTML
function createProductCard(product) {
    return `
        <div class="col-6 col-md-4 col-lg-3">
            <div class="product-card">
                <div class="product-img-container">
                    <a href="product-detail.html?id=${product.id}">
                        <img src="${product.image}" alt="${product.name}" class="img-fluid">
                    </a>
                    <button class="wishlist-btn" aria-label="Add to wishlist">
                        <i class="far fa-heart"></i>
                    </button>
                    ${product.sale ? <span class="sale-badge">SALE</span> : ''}
                </div>
                <div class="product-details">
                    <a href="product-detail.html?id=${product.id}">
                        <h3 class="product-title">${product.name}</h3>
                    </a>
                    <p class="product-category">${product.category}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="product-price">
                            ${product.sale 
                                ? ₹${product.salePrice.toLocaleString()} <span class="text-muted text-decoration-line-through">₹${product.price.toLocaleString()}</span> 
                                : ₹${product.price.toLocaleString()}
                            }
                        </div>
                        <button class="btn btn-sm btn-outline-gold add-to-cart-btn" data-product-id="${product.id}">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}