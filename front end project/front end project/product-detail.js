document.addEventListener('DOMContentLoaded', function() {
    const productDetailContainer = document.getElementById('product-detail-container');
    const relatedProductsContainer = document.getElementById('related-products');
    const productCategoryLink = document.getElementById('product-category-link');
    const productNameBreadcrumb = document.getElementById('product-name-breadcrumb');
    
    // Get product ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    
    if (!productId) {
        showNotFound();
        return;
    }
    
    // Get product data
    const product = getProductById(productId);
    
    if (!product) {
        showNotFound();
        return;
    }
    
    // Update page title
    document.title = ${product.name} - PurseBoutique;
    
    // Update breadcrumbs
    productCategoryLink.textContent = product.category;
    productCategoryLink.href = products.html?category=${product.category.toLowerCase()};
    productNameBreadcrumb.textContent = product.name;
    
    // Render product details
    renderProductDetails(product);
    
    // Load related products
    loadRelatedProducts(product);
    
    function renderProductDetails(product) {
        const productHtml = `
            <div class="col-lg-6 mb-4 mb-lg-0">
                <div class="product-gallery">
                    <img src="${product.image}" alt="${product.name}" class="main-image" id="main-product-image">
                    
                    ${product.images && product.images.length > 1 ? `
                        <div class="gallery-thumbnails">
                            ${product.images.map((img, index) => `
                                <img src="${img}" alt="${product.name} - view ${index + 1}" 
                                    class="thumbnail ${index === 0 ? 'active' : ''}" 
                                    data-image-index="${index}">
                            `).join('')}
                        </div>
                        <button class="gallery-nav gallery-prev" aria-label="Previous image">
                            <i class="fas fa-chevron-left"></i>
                        </button>
                        <button class="gallery-nav gallery-next" aria-label="Next image">
                            <i class="fas fa-chevron-right"></i>
                        </button>
                    ` : ''}
                    
                    ${product.sale ? <span class="sale-badge">SALE</span> : ''}
                </div>
            </div>
            
            <div class="col-lg-6">
                <div class="product-info">
                    <a href="products.html?category=${product.category.toLowerCase()}" class="text-decoration-none">
                        <span class="product-category text-muted">${product.category}</span>
                    </a>
                    <h1 class="product-title">${product.name}</h1>
                    
                    <div class="product-rating">
                        <div class="stars">
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                        </div>
                        <span class="review-count">4.9 (128 reviews)</span>
                    </div>
                    
                    <div class="product-price-wrapper">
                        ${product.sale 
                            ? `<span class="current-price">₹${product.salePrice?.toLocaleString()}</span>
                               <span class="original-price">₹${product.price.toLocaleString()}</span>
                               <span class="discount-percent">${Math.round(((product.price - (product.salePrice || 0)) / product.price) * 100)}% OFF</span>`
                            : <span class="current-price">₹${product.price.toLocaleString()}</span>
                        }
                    </div>
                    
                    <p class="mb-4">${product.description || 'No description available.'}</p>
                    
                    ${product.colors && product.colors.length > 0 ? `
                        <div class="color-options mb-4">
                            <h2 class="h6 mb-2">Color: <span id="selected-color">${product.colors[0]}</span></h2>
                            <div class="d-flex flex-wrap">
                                ${product.colors.map((color, index) => `
                                    <div class="color-option me-2 ${index === 0 ? 'selected' : ''}" 
                                        style="background-color: ${color.toLowerCase()}"
                                        data-color="${color}">
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    ` : ''}
                    
                    <div class="quantity-wrapper mb-4">
                        <h2 class="h6 mb-2">Quantity</h2>
                        <div class="quantity-selector">
                            <button class="quantity-btn" id="decrease-quantity">-</button>
                            <input type="number" min="1" value="1" class="quantity-input" id="quantity-input">
                            <button class="quantity-btn" id="increase-quantity">+</button>
                        </div>
                    </div>
                    
                    <div class="d-flex flex-wrap gap-2 mb-4">
                        <button class="btn btn-gold" id="add-to-cart-btn" data-product-id="${product.id}">
                            <i class="fas fa-shopping-bag me-2"></i> Add to Cart
                        </button>
                        <button class="btn btn-outline-secondary" id="add-to-wishlist-btn" data-product-id="${product.id}">
                            <i class="far fa-heart me-2"></i> Add to Wishlist
                        </button>
                    </div>
                    
                    <div class="shipping-info">
                        <p><i class="fas fa-truck"></i> Free shipping on orders over ₹1000</p>
                        <p><i class="fas fa-undo"></i> 30-day return policy</p>
                        <p><i class="fas fa-shield-alt"></i> Secure checkout</p>
                    </div>
                </div>
            </div>
        `;
        
        productDetailContainer.innerHTML = productHtml;
        
        // Add event listeners for the product gallery
        setupProductGallery();
        
        // Add event listeners for the quantity selector
        setupQuantitySelector();
        
        // Add event listeners for color options
        setupColorOptions();
        
        // Add event listener for Add to Cart button
        document.getElementById('add-to-cart-btn').addEventListener('click', function() {
            const quantity = parseInt(document.getElementById('quantity-input').value);
            addToCart(product.id, quantity);
        });
        
        // Add event listener for Add to Wishlist button
        document.getElementById('add-to-wishlist-btn').addEventListener('click', function() {
            // In a real app, this would add the product to the wishlist
            showToast(${product.name} added to your wishlist!);
        });
    }
    
    function setupProductGallery() {
        const mainImage = document.getElementById('main-product-image');
        const thumbnails = document.querySelectorAll('.thumbnail');
        const prevBtn = document.querySelector('.gallery-prev');
        const nextBtn = document.querySelector('.gallery-next');
        
        if (!thumbnails.length) return;
        
        // Current image index
        let currentIndex = 0;
        
        // Set thumbnail click handlers
        thumbnails.forEach(thumb => {
            thumb.addEventListener('click', function() {
                // Update active thumbnail
                thumbnails.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                
                // Update main image
                mainImage.src = this.src;
                
                // Update current index
                currentIndex = parseInt(this.dataset.imageIndex);
            });
        });
        
        // Set navigation buttons handlers
        if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', function() {
                currentIndex = (currentIndex - 1 + thumbnails.length) % thumbnails.length;
                updateGallery();
            });
            
            nextBtn.addEventListener('click', function() {
                currentIndex = (currentIndex + 1) % thumbnails.length;
                updateGallery();
            });
        }
        
        function updateGallery() {
            thumbnails.forEach(t => t.classList.remove('active'));
            thumbnails[currentIndex].classList.add('active');
            mainImage.src = thumbnails[currentIndex].src;
        }
    }
    
    function setupQuantitySelector() {
        const decreaseBtn = document.getElementById('decrease-quantity');
        const increaseBtn = document.getElementById('increase-quantity');
        const quantityInput = document.getElementById('quantity-input');
        
        decreaseBtn.addEventListener('click', function() {
            const currentValue = parseInt(quantityInput.value);
            if (currentValue > 1) {
                quantityInput.value = currentValue - 1;
            }
        });
        
        increaseBtn.addEventListener('click', function() {
            const currentValue = parseInt(quantityInput.value);
            quantityInput.value = currentValue + 1;
        });
        
        quantityInput.addEventListener('change', function() {
            if (this.value < 1) {
                this.value = 1;
            }
        });
    }
    
    function setupColorOptions() {
        const colorOptions = document.querySelectorAll('.color-option');
        const selectedColorText = document.getElementById('selected-color');
        
        if (!colorOptions.length || !selectedColorText) return;
        
        colorOptions.forEach(option => {
            option.addEventListener('click', function() {
                // Update selected state
                colorOptions.forEach(opt => opt.classList.remove('selected'));
                this.classList.add('selected');
                
                // Update selected color text
                selectedColorText.textContent = this.dataset.color;
            });
        });
    }
    
    function loadRelatedProducts(product) {
        // Get products from the same category
        const related = getProducts({ 
            category: product.category,
        }).filter(p => p.id !== product.id).slice(0, 4);
        
        if (related.length > 0) {
            relatedProductsContainer.innerHTML = related
                .map(prod => createProductCard(prod))
                .join('');
        } else {
            relatedProductsContainer.innerHTML = '<p class="col-12 text-center">No related products found.</p>';
        }
    }
    
    function showNotFound() {
        productDetailContainer.innerHTML = `
            <div class="col-12 text-center py-5">
                <h2 class="mb-3">Product Not Found</h2>
                <p class="mb-4">The product you are looking for does not exist or has been removed.</p>
                <a href="products.html" class="btn btn-gold">Browse Products</a>
            </div>
        `;
    }
});