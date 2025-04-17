// Category pages specific JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Get current page type based on filename
    const currentPage = window.location.pathname.split('/').pop().split('.')[0];
    const productsContainer = document.getElementById('products-container');
    const productsTitle = document.getElementById('products-title');
    const sortSelect = document.getElementById('sort-select');
    const applyFiltersBtn = document.getElementById('apply-filters-btn');
    const resetFiltersBtn = document.getElementById('reset-filters-btn');
    
    // Price range inputs
    const minPriceInput = document.getElementById('min-price');
    const maxPriceInput = document.getElementById('max-price');
    
    // Special filters
    const specialSale = document.getElementById('special-sale');
    const specialNew = document.getElementById('special-new');
    const specialBestseller = document.getElementById('special-bestseller');
    
    // Set category based on current page
    let pageCategory = '';
    switch(currentPage) {
        case 'totes':
            pageCategory = 'tote';
            break;
        case 'crossbody':
            pageCategory = 'crossbody';
            break;
        case 'clutches':
            pageCategory = 'clutch';
            break;
        default:
            pageCategory = '';
    }
    
    // Apply initial filters based on page category
    applyFilters();
    
    // Add event listeners
    sortSelect.addEventListener('change', applyFilters);
    applyFiltersBtn.addEventListener('click', applyFilters);
    resetFiltersBtn.addEventListener('click', resetFilters);
    
    function applyFilters() {
        const filter = {
            sort: sortSelect.value,
            category: pageCategory // Always filter by the current page category
        };
        
        // Price range filter
        if (minPriceInput.value) filter.minPrice = parseInt(minPriceInput.value);
        if (maxPriceInput.value) filter.maxPrice = parseInt(maxPriceInput.value);
        
        // Special filters
        if (specialSale.checked) filter.sale = true;
        if (specialNew.checked) filter.new = true;
        if (specialBestseller.checked) filter.bestseller = true;
        
        // Get filtered products
        const filteredProducts = getProducts(filter);
        
        // Update the products container
        if (filteredProducts.length > 0) {
            productsContainer.innerHTML = filteredProducts
                .map(product => createProductCard(product))
                .join('');
                
            // Initialize product action buttons
            initProductActionButtons();
        } else {
            productsContainer.innerHTML = `
                <div class="col-12 text-center py-5">
                    <p class="mb-3">No products found matching your criteria.</p>
                    <button class="btn btn-outline-gold" id="reset-search-btn">Reset Filters</button>
                </div>
            `;
            
            document.getElementById('reset-search-btn').addEventListener('click', resetFilters);
        }
    }
    
    function resetFilters() {
        minPriceInput.value = '';
        maxPriceInput.value = '';
        
        specialSale.checked = false;
        specialNew.checked = false;
        specialBestseller.checked = false;
        
        sortSelect.value = 'featured';
        
        applyFilters();
    }
    
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
});