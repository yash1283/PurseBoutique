// DOM Elements
const featuredProductsContainer = document.getElementById('featured-products');
const newsletterForm = document.getElementById('newsletter-form');
const subscribeBtn = document.getElementById('subscribe-btn');
const currentYear = document.getElementById('current-year');

// Set current year in footer
if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartCount() {
    const cartCountElements = document.querySelectorAll('.cart-count');
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    
    cartCountElements.forEach(element => {
        element.textContent = totalItems;
    });
}

function addToCart(productId, quantity = 1) {
    const product = getProductById(productId);
    
    if (!product) return;
    
    const existingItemIndex = cart.findIndex(item => item.id === productId);
    
    if (existingItemIndex > -1) {
        cart[existingItemIndex].quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.salePrice || product.price,
            image: product.image,
            quantity: quantity,
            color: product.colors ? product.colors[0] : null
        });
    }
    
    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update cart count
    updateCartCount();
    
    // Show success message
    showToast(${product.name} added to your cart!);
}

// Toast notification function
function showToast(message, type = 'success') {
    // Create toast container if it doesn't exist
    let toastContainer = document.querySelector('.toast-container');
    
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container position-fixed top-0 end-0 p-3';
        document.body.appendChild(toastContainer);
    }
    
    // Create toast element
    const toastId = 'toast-' + Date.now();
    const toast = document.createElement('div');
    toast.className = toast ${type === 'success' ? 'bg-success text-white' : 'bg-danger text-white'};
    toast.id = toastId;
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'assertive');
    toast.setAttribute('aria-atomic', 'true');
    
    toast.innerHTML = `
        <div class="toast-header bg-transparent text-white border-0">
            <strong class="me-auto">${type === 'success' ? 'Success' : 'Error'}</strong>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body">
            ${message}
        </div>
    `;
    
    toastContainer.appendChild(toast);
    
    // Initialize and show the toast
    const bsToast = new bootstrap.Toast(toast, {
        autohide: true,
        delay: 3000
    });
    
    bsToast.show();
    
    // Remove toast after it's hidden
    toast.addEventListener('hidden.bs.toast', function() {
        toast.remove();
    });
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Load featured products
    if (featuredProductsContainer) {
        const featuredProducts = getProducts({ featured: true });
        
        if (featuredProducts.length > 0) {
            featuredProductsContainer.innerHTML = featuredProducts
                .slice(0, 4)
                .map(product => createProductCard(product))
                .join('');
        }
    }
    
    // Update cart count
    updateCartCount();
    
    // Add event listener for Add to Cart buttons
    document.body.addEventListener('click', function(e) {
        if (e.target.classList.contains('add-to-cart-btn') || e.target.closest('.add-to-cart-btn')) {
            const button = e.target.classList.contains('add-to-cart-btn') 
                ? e.target 
                : e.target.closest('.add-to-cart-btn');
            
            const productId = button.dataset.productId;
            addToCart(productId);
        }
    });
    
    // Newsletter form submission
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (email) {
                // Simulate API call
                subscribeBtn.textContent = 'Subscribing...';
                subscribeBtn.disabled = true;
                
                setTimeout(() => {
                    showToast('Thank you for subscribing to our newsletter!');
                    emailInput.value = '';
                    subscribeBtn.textContent = 'Subscribe';
                    subscribeBtn.disabled = false;
                }, 1000);
            }
        });
    }
});

// Handle URL parameters (for products page filtering)
function getUrlParams() {
    const params = new URLSearchParams(window.location.search);
    const urlParams = {};
    
    for (const [key, value] of params.entries()) {
        urlParams[key] = value;
    }
    
    return urlParams;
}