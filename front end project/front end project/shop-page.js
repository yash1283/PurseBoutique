// Shop page specific JavaScript

document.addEventListener('DOMContentLoaded', function() {
    const featuredProductsContainer = document.getElementById('featured-products');
    
    // Load featured products
    loadFeaturedProducts();
    
    // Function to load featured products
    function loadFeaturedProducts() {
        const featuredProducts = getProducts({ featured: true, limit: 4 });
        
        if (featuredProducts.length > 0) {
            featuredProductsContainer.innerHTML = featuredProducts
                .map(product => createProductCard(product))
                .join('');
                
            // Initialize product action buttons
            initProductActionButtons();
        } else {
            featuredProductsContainer.innerHTML = `
                <div class="col-12 text-center py-5">
                    <p class="text-muted">No featured products available.</p>
                </div>
            `;
        }
    }
    
    // Add limit option to getProducts function
    const originalGetProducts = window.getProducts;
    window.getProducts = function(filter = {}) {
        let products = originalGetProducts(filter);
        
        // Apply limit if specified
        if (filter.limit && products.length > filter.limit) {
            products = products.slice(0, filter.limit);
        }
        
        return products;
    };
    
    function initProductActionButtons() {
        // Add to wishlist functionality
        document.querySelectorAll('.add-to-wishlist').forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const productId = this.getAttribute('data-product-id');
                // Add wishlist functionality here
                alert(Added product #${productId} to wishlist);
            });
        });
        
        // Quick view functionality
        document.querySelectorAll('.quick-view').forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const productId = this.getAttribute('data-product-id');
                // Quick view functionality here
                alert(Quick view for product #${productId});
            });
        });
        
        // Add to cart functionality
        document.querySelectorAll('.add-to-cart-btn').forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const productId = this.getAttribute('data-product-id');
                // Add to cart functionality here
                alert(Added product #${productId} to cart);
            });
        });
    }
    
    // Shop by category click handlers
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', function(e) {
            const link = this.closest('a');
            if (link) {
                window.location.href = link.href;
            }
        });
    });
    
    // Shop by collection click handlers
    document.querySelectorAll('.card .btn-outline-gold').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const link = this.closest('a');
            if (link) {
                window.location.href = link.href;
            }
        });
    });
});