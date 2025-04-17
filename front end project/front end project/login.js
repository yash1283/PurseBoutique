document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');
    const passwordToggle = document.getElementById('password-toggle');
    const loginBtn = document.getElementById('login-btn');
    
    // Toggle password visibility
    passwordToggle.addEventListener('click', function() {
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            this.innerHTML = '<i class="far fa-eye-slash"></i>';
        } else {
            passwordInput.type = 'password';
            this.innerHTML = '<i class="far fa-eye"></i>';
        }
    });
    
    // Form submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Reset errors
        emailError.textContent = '';
        passwordError.textContent = '';
        
        // Validate form
        let isValid = true;
        
        if (!emailInput.value.trim()) {
            emailError.textContent = 'Email is required';
            isValid = false;
        } else if (!isValidEmail(emailInput.value.trim())) {
            emailError.textContent = 'Please enter a valid email address';
            isValid = false;
        }
        
        if (!passwordInput.value) {
            passwordError.textContent = 'Password is required';
            isValid = false;
        } else if (passwordInput.value.length < 6) {
            passwordError.textContent = 'Password must be at least 6 characters';
            isValid = false;
        }
        
        if (isValid) {
            // Show loading state
            loginBtn.innerHTML = 'Signing in...';
            loginBtn.disabled = true;
            
            // Simulate API call
            setTimeout(function() {
                // In a real app, you would validate credentials with a server
                // For this demo, we'll accept any valid format
                
                // Demo user: user@example.com / password123
                if (emailInput.value === 'user@example.com' && passwordInput.value === 'password123') {
                    // Successful login
                    localStorage.setItem('isLoggedIn', 'true');
                    localStorage.setItem('user', JSON.stringify({
                        email: emailInput.value,
                        name: 'Demo User'
                    }));
                    
                    showToast('Login successful!');
                    
                    // Redirect to homepage
                    setTimeout(() => {
                        window.location.href = 'index.html';
                    }, 1000);
                } else {
                    // Failed login
                    showToast('Invalid email or password', 'error');
                    loginBtn.innerHTML = 'Sign In';
                    loginBtn.disabled = false;
                }
            }, 1500);
        }
    });
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});