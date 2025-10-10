class AuthSystem {
    constructor() {
        this.currentUser = null;
        this.userManager = new UserManagement();
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.checkAuthStatus();
    }
    
    setupEventListeners() {
        const tabs = document.querySelectorAll('.auth-tab');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => this.switchTab(tab.dataset.tab));
        });
        
        const loginForm = document.getElementById('loginForm');
        const signupForm = document.getElementById('signupForm');
        
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }
        
        if (signupForm) {
            signupForm.addEventListener('submit', (e) => this.handleSignup(e));
        }
        
        this.setupValidation();
    }
    
    setupValidation() {
        const emailInputs = document.querySelectorAll('input[type="email"]');
        emailInputs.forEach(input => {
            input.addEventListener('blur', () => this.validateEmail(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });
        
        const passwordInputs = document.querySelectorAll('input[type="password"]');
        passwordInputs.forEach(input => {
            input.addEventListener('blur', () => this.validatePassword(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });
        
        const nameInput = document.getElementById('signupName');
        if (nameInput) {
            nameInput.addEventListener('blur', () => this.validateName(nameInput));
            nameInput.addEventListener('input', () => this.clearFieldError(nameInput));
        }
        
        const confirmPasswordInput = document.getElementById('confirmPassword');
        if (confirmPasswordInput) {
            confirmPasswordInput.addEventListener('blur', () => this.validateConfirmPassword());
            confirmPasswordInput.addEventListener('input', () => this.clearFieldError(confirmPasswordInput));
        }
    }
    
    switchTab(tabName) {
        const tabs = document.querySelectorAll('.auth-tab');
        tabs.forEach(tab => {
            tab.classList.toggle('active', tab.dataset.tab === tabName);
        });
        
        const forms = document.querySelectorAll('.auth-form');
        forms.forEach(form => {
            form.classList.toggle('active', form.id === tabName + 'Form');
        });
        
        this.hideMessages();
    }
    
    async handleLogin(e) {
        e.preventDefault();
        
        const form = e.target;
        const formData = new FormData(form);
        const email = formData.get('email').trim();
        const password = formData.get('password');
        
        if (!this.validateForm(form)) {
            return;
        }
        
        this.showLoading(form);
        
        try {
            await this.delay(1000);
            
            const result = await this.userManager.loginUser(email, password);
            
            if (result.success) {
                this.currentUser = result.user;
                this.showSuccess(form, result.message);
                
                setTimeout(() => {
                    this.showDashboard();
                }, 1500);
            } else {
                this.showError(form, result.message);
            }
        } catch (error) {
            console.error('Login error:', error);
            this.showError(form, 'An error occurred. Please try again.');
        } finally {
            this.hideLoading(form);
        }
    }
    
    async handleSignup(e) {
        e.preventDefault();
        
        const form = e.target;
        const formData = new FormData(form);
        const name = formData.get('name').trim();
        const email = formData.get('email').trim();
        const password = formData.get('password');
        const confirmPassword = formData.get('confirmPassword');
        
        if (!this.validateForm(form)) {
            return;
        }
        
        if (password !== confirmPassword) {
            this.showError(form, 'Passwords do not match.');
            return;
        }
        
        this.showLoading(form);
        
        try {
            await this.delay(1500);
            
            const result = await this.userManager.registerUser({
                name: name,
                email: email,
                password: password
            });
            
            if (result.success) {
                this.currentUser = result.user;
                this.showSuccess(form, result.message);
                
                setTimeout(() => {
                    this.showDashboard();
                }, 2000);
            } else {
                this.showError(form, result.message);
            }
            
        } catch (error) {
            console.error('Signup error:', error);
            this.showError(form, 'An error occurred. Please try again.');
        } finally {
            this.hideLoading(form);
        }
    }
    
    
    validateForm(form) {
        let isValid = true;
        const requiredFields = form.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });
        
        return isValid;
    }
    
    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        
        if (field.hasAttribute('required') && !value) {
            this.showFieldError(field, 'This field is required');
            isValid = false;
        } else if (field.type === 'email' && value) {
            isValid = this.validateEmail(field);
        } else if (field.type === 'password' && value) {
            isValid = this.validatePassword(field);
        } else if (field.id === 'signupName' && value) {
            isValid = this.validateName(field);
        }
        
        if (isValid) {
            this.clearFieldError(field);
        }
        
        return isValid;
    }
    
    validateEmail(field) {
        const email = field.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (email && !emailRegex.test(email)) {
            this.showFieldError(field, 'Please enter a valid email address');
            return false;
        }
        
        return true;
    }
    
    validatePassword(field) {
        const password = field.value;
        
        if (password && password.length < 6) {
            this.showFieldError(field, 'Password must be at least 6 characters long');
            return false;
        }
        
        return true;
    }
    
    validateName(field) {
        const name = field.value.trim();
        
        if (name && name.length < 2) {
            this.showFieldError(field, 'Name must be at least 2 characters long');
            return false;
        }
        
        return true;
    }
    
    validateConfirmPassword() {
        const password = document.getElementById('signupPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const confirmField = document.getElementById('confirmPassword');
        
        if (confirmPassword && password !== confirmPassword) {
            this.showFieldError(confirmField, 'Passwords do not match');
            return false;
        }
        
        return true;
    }
    
    showFieldError(field, message) {
        field.style.borderColor = '#ef4444';
        
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.style.color = '#ef4444';
        errorDiv.style.fontSize = '0.875rem';
        errorDiv.style.marginTop = '0.25rem';
        errorDiv.textContent = message;
        
        field.parentNode.appendChild(errorDiv);
    }
    
    clearFieldError(field) {
        field.style.borderColor = 'rgba(255, 255, 255, 0.2)';
        
        const errorDiv = field.parentNode.querySelector('.field-error');
        if (errorDiv) {
            errorDiv.remove();
        }
    }
    
    showLoading(form) {
        const submitBtn = form.querySelector('.submit-btn');
        const btnText = submitBtn.querySelector('.btn-text');
        const loading = submitBtn.querySelector('.loading');
        
        submitBtn.disabled = true;
        btnText.style.display = 'none';
        loading.style.display = 'flex';
        this.hideMessages(form);
    }
    
    hideLoading(form) {
        const submitBtn = form.querySelector('.submit-btn');
        const btnText = submitBtn.querySelector('.btn-text');
        const loading = submitBtn.querySelector('.loading');
        
        submitBtn.disabled = false;
        btnText.style.display = 'block';
        loading.style.display = 'none';
    }
    
    showSuccess(form, message) {
        const successMsg = form.querySelector('.success-message');
        const messageText = successMsg.querySelector('.message-text');
        
        messageText.textContent = message;
        successMsg.style.display = 'block';
        
        setTimeout(() => {
            this.hideMessages(form);
        }, 5000);
    }
    
    showError(form, message) {
        const errorMsg = form.querySelector('.error-message');
        const messageText = errorMsg.querySelector('.message-text');
        
        messageText.textContent = message;
        errorMsg.style.display = 'block';
        
        setTimeout(() => {
            this.hideMessages(form);
        }, 5000);
    }
    
    hideMessages(form = null) {
        const forms = form ? [form] : document.querySelectorAll('.auth-form');
        forms.forEach(f => {
            const successMsg = f.querySelector('.success-message');
            const errorMsg = f.querySelector('.error-message');
            
            if (successMsg) successMsg.style.display = 'none';
            if (errorMsg) errorMsg.style.display = 'none';
        });
    }
    
    showDashboard() {
        const forms = document.querySelectorAll('.auth-form');
        forms.forEach(form => form.classList.remove('active'));
        
        const tabs = document.querySelectorAll('.auth-tab');
        tabs.forEach(tab => tab.style.display = 'none');
        
        const dashboard = document.getElementById('userDashboard');
        if (dashboard) {
            dashboard.classList.add('active');
            
            const userName = dashboard.querySelector('#userName');
            const userEmail = dashboard.querySelector('#userEmail');
            
            if (userName) userName.textContent = this.currentUser.name;
            if (userEmail) userEmail.textContent = this.currentUser.email;
        }
    }
    
    logout() {
        this.userManager.logout();
        this.currentUser = null;
        
        const dashboard = document.getElementById('userDashboard');
        if (dashboard) {
            dashboard.classList.remove('active');
        }
        
        this.switchTab('login');
        
        const tabs = document.querySelectorAll('.auth-tab');
        tabs.forEach(tab => tab.style.display = 'flex');
        
        const forms = document.querySelectorAll('.auth-form');
        forms.forEach(form => form.reset());
        
        this.hideMessages();
    }
    
    checkAuthStatus() {
        if (this.userManager.checkAuthStatus()) {
            this.currentUser = this.userManager.currentUser;
            this.showDashboard();
        }
    }
    
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const toggle = input.parentNode.querySelector('.password-toggle i');
    
    if (input.type === 'password') {
        input.type = 'text';
        toggle.classList.remove('fa-eye');
        toggle.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        toggle.classList.remove('fa-eye-slash');
        toggle.classList.add('fa-eye');
    }
}

function logout() {
    if (authSystem) {
        authSystem.logout();
    }
}

function showForgotPassword() {
    const email = prompt('Enter your email address to reset password:');
    if (email && email.trim()) {
        alert('Password reset instructions have been sent to your email address.');
    }
}

function socialLogin(provider) {
    alert(`${provider} login is coming soon! For now, please use email and password.`);
}

let authSystem;
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        authSystem = new AuthSystem();
        console.log('Auth system initialized');
    }, 100);
});

const style = document.createElement('style');
style.textContent = `
    .field-error {
        color: #ef4444;
        font-size: 0.875rem;
        margin-top: 0.25rem;
        display: flex;
        align-items: center;
        gap: 0.25rem;
    }
    
    .field-error::before {
        content: "⚠";
        font-size: 0.75rem;
    }
    
    .form-group input.error {
        border-color: #ef4444;
        box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
    }
    
    .form-group input.success {
        border-color: #22c55e;
        box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.1);
    }
`;
document.head.appendChild(style);
