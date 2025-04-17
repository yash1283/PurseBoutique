document.addEventListener('DOMContentLoaded', function() {
    const productsContainer = document.getElementById('products-container');
    const productsTitle = document.getElementById('products-title');
    const sortSelect = document.getElementById('sort-select');
    const applyFiltersBtn = document.getElementById('apply-filters-btn');
    const resetFiltersBtn = document.getElementById('reset-filters-btn');
    
    // Category checkboxes
    const categoryAll = document.getElementById('category-all');
    const categoryTote = document.getElementById('category-tote');
    const categoryCrossbody = document.getElementById('category-crossbody');
    const categoryClutch = document.getElementById('category-clutch');
    const categoryWallet = document.getElementById('category-wallet');
    
    // Price range inputs
    const minPriceInput = document.getElementById('min-price');
    const maxPriceInput = document.getElementById('max-price');
    
    // Special filters
    const specialSale = document.getElementById('special-sale');
    const specialNew = document.getElementById('special-new');
    const specialBestseller = document.getElementById('special-bestseller');
    
    // Get URL parameters
    const urlParams = getUrlParams();
    
    // Set initial values based on URL parameters
    if (urlParams.category) {
        productsTitle.textContent = ${urlParams.category.charAt(0).toUpperCase() + urlParams.category.slice(1)} Bags;
        
        // Uncheck "All Categories" and check the specific category
        categoryAll.checked = false;
        
        switch (urlParams.category.toLowerCase()) {
            case 'tote':
                categoryTote.checked = true;
                break;
            case 'crossbody':
                categoryCrossbody.checked = true;
                break;
            case 'clutch':
                categoryClutch.checked = true;
                break;
            case 'wallet':
                categoryWallet.checked = true;
                break;
            case 'new':
                specialNew.checked = true;
                break;
            case 'sale':
                specialSale.checked = true;
                break;
            case 'bestseller':
                specialBestseller.checked = true;
                break;
        }
    }
    
    // Apply initial filters
    applyFilters();
    
    // Add event listeners
    sortSelect.addEventListener('change', applyFilters);
    applyFiltersBtn.addEventListener('click', applyFilters);
    resetFiltersBtn.addEventListener('click', resetFilters);
    
    // Category "All" checkbox behavior
    categoryAll.addEventListener('change', function() {
        if (this.checked) {
            categoryTote.checked = false;
            categoryCrossbody.checked = false;
            categoryClutch.checked = false;
            categoryWallet.checked = false;
        }
    });
    
    // Individual category checkboxes behavior
    [categoryTote, categoryCrossbody, categoryClutch, categoryWallet].forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            if (this.checked) {
                categoryAll.checked = false;
            } else if (![categoryTote, categoryCrossbody, categoryClutch, categoryWallet].some(cb => cb.checked)) {
                categoryAll.checked = true;
            }
        });
    });
    
    function applyFilters() {
        const filter = {
            sort: sortSelect.value
        };
        
        // Category filter
        if (!categoryAll.checked) {
            if (categoryTote.checked) filter.category = 'tote';
            if (categoryCrossbody.checked) filter.category = 'crossbody';
            if (categoryClutch.checked) filter.category = 'clutch';
            if (categoryWallet.checked) filter.category = 'wallet';
        }
        
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
        categoryAll.checked = true;
        categoryTote.checked = false;
        categoryCrossbody.checked = false;
        categoryClutch.checked = false;
        categoryWallet.checked = false;
        
        minPriceInput.value = '';
        maxPriceInput.value = '';
        
        specialSale.checked = false;
        specialNew.checked = false;
        specialBestseller.checked = false;
        
        sortSelect.value = 'featured';
        
        productsTitle.textContent = 'All Products';
        
        applyFilters();
    }
});