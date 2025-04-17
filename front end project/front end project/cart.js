document.addEventListener('DOMContentLoaded', function() {
    const cartContainer = document.getElementById('cart-container');
    
    // Load cart data
    loadCart();
    
    function loadCart() {
        // Get cart from localStorage
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        if (cart.length === 0) {
            renderEmptyCart();
        } else {
            renderCart(cart);
        }
    }
    
    function renderEmptyCart() {
        cartContainer.innerHTML = `
            <div class="text-center py-5">
                <h2 class="h4 mb-3">Your cart is empty</h2>
                <p class="mb-4">Looks like you haven't added any items to your cart yet.</p>
                <a href="products.html" class="btn btn-gold">Continue Shopping</a>
            </div>
        `;
    }
    
    function renderCart(cartItems) {
        let subtotal = 0;
        let discount = 0;
        
        // Calculate totals
        cartItems.forEach(item => {
            subtotal += item.price * item.quantity;
        });
        
        const shipping = subtotal > 1000 ? 0 : 100;
        const total = subtotal - discount + shipping;
        
        cartContainer.innerHTML = `
            <div class="row">
                <div class="col-lg-8 mb-4">
                    <div class="card">
                        <div class="card-header bg-white d-flex justify-content-between align-items-center">
                            <span class="h5 mb-0">Cart Items (${cartItems.length})</span>
                            <button class="btn btn-sm btn-link text-danger" id="clear-cart-btn">Clear Cart</button>
                        </div>
                        <div class="card-body">
                            <div class="cart-items">
                                ${cartItems.map(item => `
                                    <div class="cart-item d-flex flex-column flex-md-row align-items-md-center">
                                        <div class="d-flex align-items-center">
                                            <img src="${item.image}" alt="${item.name}" class="cart-item-image me-3">
                                            <div class="cart-item-details">
                                                <h3 class="cart-item-title">${item.name}</h3>
                                                ${item.color ? <p class="small text-muted mb-1">Color: ${item.color}</p> : ''}
                                                <p class="cart-item-price">₹${item.price.toLocaleString()}</p>
                                                <button class="remove-item" data-product-id="${item.id}">
                                                    <i class="fas fa-trash-alt"></i> Remove
                                                </button>
                                            </div>
                                        </div>
                                        <div class="d-flex align-items-center ms-auto mt-3 mt-md-0">
                                            <div class="quantity-selector me-3">
                                                <button class="quantity-btn decrease-quantity" data-product-id="${item.id}">-</button>
                                                <input type="number" value="${item.quantity}" min="1" class="quantity-input" 
                                                    data-product-id="${item.id}" onchange="updateCartItemQuantity('${item.id}', this.value)">
                                                <button class="quantity-btn increase-quantity" data-product-id="${item.id}">+</button>
                                            </div>
                                            <div class="text-end">
                                                <span class="fw-bold">₹${(item.price * item.quantity).toLocaleString()}</span>
                                            </div>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                        <div class="card-footer bg-white d-flex justify-content-between">
                            <a href="products.html" class="text-decoration-none text-gold">
                                <i class="fas fa-arrow-left me-1"></i> Continue Shopping
                            </a>
                        </div>
                    </div>
                </div>
                
                <div class="col-lg-4">
                    <div class="card cart-summary">
                        <div class="card-header bg-white">
                            <h3 class="h5 mb-0">Order Summary</h3>
                        </div>
                        <div class="card-body">
                            <div class="summary-row">
                                <span>Subtotal</span>
                                <span>₹${subtotal.toLocaleString()}</span>
                            </div>
                            ${discount > 0 ? `
                                <div class="summary-row text-success">
                                    <span>Discount</span>
                                    <span>-₹${discount.toLocaleString()}</span>
                                </div>
                            ` : ''}
                            <div class="summary-row">
                                <span>Shipping</span>
                                <span>${shipping === 0 ? '<span class="text-success">Free</span>' : ₹${shipping.toLocaleString()}}</span>
                            </div>
                            <div class="summary-row total">
                                <span>Total</span>
                                <span>₹${total.toLocaleString()}</span>
                            </div>
                            
                            <div class="coupon-form">
                                <label for="coupon-code" class="form-label">Apply Coupon</label>
                                <div class="input-group">
                                    <input type="text" class="form-control" id="coupon-code" placeholder="Enter code">
                                    <button class="btn btn-outline-secondary" type="button" id="apply-coupon-btn">Apply</button>
                                </div>
                                <p class="small text-muted mt-1">Try "WELCOME10" for 10% off your first order</p>
                            </div>
                        </div>
                        <div class="card-footer bg-white">
                            <a href="checkout.html" class="btn btn-gold w-100">Proceed to Checkout</a>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Add event listeners
        setupCartEventListeners();
    }
    
    function setupCartEventListeners() {
        // Clear cart button
        const clearCartBtn = document.getElementById('clear-cart-btn');
        if (clearCartBtn) {
            clearCartBtn.addEventListener('click', function() {
                if (confirm('Are you sure you want to clear your cart?')) {
                    localStorage.removeItem('cart');
                    updateCartCount();
                    renderEmptyCart();
                }
            });
        }
        
        // Remove item buttons
        const removeButtons = document.querySelectorAll('.remove-item');
        removeButtons.forEach(button => {
            button.addEventListener('click', function() {
                const productId = this.dataset.productId;
                removeCartItem(productId);
            });
        });
        
        // Quantity decrease buttons
        const decreaseButtons = document.querySelectorAll('.decrease-quantity');
        decreaseButtons.forEach(button => {
            button.addEventListener('click', function() {
                const productId = this.dataset.productId;
                const input = document.querySelector(.quantity-input[data-product-id="${productId}"]);
                let currentValue = parseInt(input.value);
                if (currentValue > 1) {
                    input.value = --currentValue;
                    updateCartItemQuantity(productId, currentValue);
                }
            });
        });
        
        // Quantity increase buttons
        const increaseButtons = document.querySelectorAll('.increase-quantity');
        increaseButtons.forEach(button => {
            button.addEventListener('click', function() {
                const productId = this.dataset.productId;
                const input = document.querySelector(.quantity-input[data-product-id="${productId}"]);
                let currentValue = parseInt(input.value);
                input.value = ++currentValue;
                updateCartItemQuantity(productId, currentValue);
            });
        });
        
        // Quantity input change
        const quantityInputs = document.querySelectorAll('.quantity-input');
        quantityInputs.forEach(input => {
            input.addEventListener('change', function() {
                const productId = this.dataset.productId;
                let value = parseInt(this.value);
                
                if (isNaN(value) || value < 1) {
                    value = 1;
                    this.value = 1;
                }
                
                updateCartItemQuantity(productId, value);
            });
        });
        
        // Apply coupon button
        const applyCouponBtn = document.getElementById('apply-coupon-btn');
        if (applyCouponBtn) {
            applyCouponBtn.addEventListener('click', function() {
                const couponCode = document.getElementById('coupon-code').value.trim();
                
                if (couponCode) {
                    // In a real app, this would validate the coupon on the server
                    if (couponCode.toUpperCase() === 'WELCOME10') {
                        showToast('Coupon applied successfully!');
                        loadCart(); // Reload cart with discount
                    } else {
                        showToast('Invalid coupon code', 'error');
                    }
                }
            });
        }
    }
    
    function removeCartItem(productId) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        // Remove the item
        cart = cart.filter(item => item.id !== productId);
        
        // Update localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Update cart count
        updateCartCount();
        
        // Show success message
        showToast('Item removed from cart');
        
        // Reload the cart
        if (cart.length === 0) {
            renderEmptyCart();
        } else {
            renderCart(cart);
        }
    }
    
    function updateCartItemQuantity(productId, quantity) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        // Find the item
        const itemIndex = cart.findIndex(item => item.id === productId);
        
        if (itemIndex > -1) {
            // Update quantity
            cart[itemIndex].quantity = parseInt(quantity);
            
            // Update localStorage
            localStorage.setItem('cart', JSON.stringify(cart));
            
            // Update cart count
            updateCartCount();
            
            // Reload the cart
            renderCart(cart);
        }
    }
});

// Add this function to the global scope to be used by inline event handlers
function updateCartItemQuantity(productId, quantity) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Find the item
    const itemIndex = cart.findIndex(item => item.id === productId);
    
    if (itemIndex > -1) {
        // Update quantity
        cart[itemIndex].quantity = parseInt(quantity);
        
        // Update localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Update cart count
        updateCartCount();
        
        // Reload the cart
        location.reload();
    }
}