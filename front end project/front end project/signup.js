document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signup-form');
    const fullnameInput = document.getElementById('fullname');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const termsCheckbox = document.getElementById('terms');
    
    const fullnameError = document.getElementById('fullname-error');
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');
    const confirmPasswordError = document.getElementById('confirm-password-error');
    const termsError = document.getElementById('terms-error');
    
    const passwordToggle = document.getElementById('password-toggle');
    const confirmPasswordToggle = document.getElementById('confirm-password-toggle');
    const signupBtn = document.getElementById('signup-btn');
    
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
    
    // Toggle confirm password visibility
    confirmPasswordToggle.addEventListener('click', function() {
        if (confirmPasswordInput.type === 'password') {
            confirmPasswordInput.type = 'text';
            this.innerHTML = '<i class="far fa-eye-slash"></i>';
        } else {
            confirmPasswordInput.type = 'password';
            this.innerHTML = '<i class="far fa-eye"></i>';
        }
    });
    
    // Form submission
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Reset errors
        fullnameError.textContent = '';
        emailError.textContent = '';
        passwordError.textContent = '';
        confirmPasswordError.textContent = '';
        termsError.textContent = '';
        
        // Validate form
        let isValid = true;
        
        if (!fullnameInput.value.trim()) {
            fullnameError.textContent = 'Full name is required';
            isValid = false;
        }
        
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
        
        if (!confirmPasswordInput.value) {
            confirmPasswordError.textContent = 'Please confirm your password';
            isValid = false;
        } else if (confirmPasswordInput.value !== passwordInput.value) {
            confirmPasswordError.textContent = 'Passwords do not match';
            isValid = false;
        }
        
        if (!termsCheckbox.checked) {
            termsError.textContent = 'You must agree to the terms and conditions';
            isValid = false;
        }
        
        if (isValid) {
            // Show loading state
            signupBtn.innerHTML = 'Creating Account...';
            signupBtn.disabled = true;
            
            // Simulate API call
            setTimeout(function() {
                // In a real app, you would send the data to a server
                // For this demo, we'll just simulate success
                
                // Save user data (in a real app, this would be handled by the server)
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('user', JSON.stringify({
                    email: emailInput.value,
                    name: fullnameInput.value
                }));
                
                showToast('Account created successfully!');
                
                // Redirect to homepage
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1000);
            }, 1500);
        }
    });
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});