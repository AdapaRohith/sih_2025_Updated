document.addEventListener('DOMContentLoaded', function() {
    if (typeof emailjs === 'undefined') {
        console.error('EmailJS is not loaded. Please check the script tag.');
        return;
    }

    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    
    if (!contactForm || !submitBtn) {
        console.error('Contact form elements not found');
        return;
    }

    const btnText = submitBtn.querySelector('.btn-text');
    const loading = submitBtn.querySelector('.loading');
    const successMessage = document.querySelector('.success-message');
    const errorMessage = document.querySelector('.error-message');

    console.log('Contact form initialized successfully');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        showLoading();

        const params = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            phone: document.getElementById("phone").value,
            subject: document.getElementById("subject").value,
            message: document.getElementById("message").value
        };
        emailjs.send("service_t93dhrb", "template_y14w0zn", params)
            .then(function(response) {
                console.log('Email sent successfully:', response);
                showSuccess();
                resetForm();
            })
            .catch(function(error) {
                console.error('Email sending failed:', error);
                console.error('Error details:', {
                    status: error.status,
                    text: error.text,
                    message: error.message
                });
                showError(`Failed to send message. Error: ${error.text || error.message || 'Unknown error'}`);
            })
            .finally(function() {
                hideLoading();
            });
    });

    function validateForm() {
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const subject = document.getElementById("subject").value.trim();
        const message = document.getElementById("message").value.trim();

        if (!name || !email || !subject || !message) {
            showError("Please fill in all required fields.");
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showError("Please enter a valid email address.");
            return false;
        }

        return true;
    }

    function showLoading() {
        btnText.style.display = 'none';
        loading.style.display = 'flex';
        submitBtn.disabled = true;
        submitBtn.classList.add('loading');
        hideMessages();
    }

    function hideLoading() {
        btnText.style.display = 'block';
        loading.style.display = 'none';
        submitBtn.disabled = false;
        submitBtn.classList.remove('loading');
    }

    function showSuccess() {
        successMessage.style.display = 'block';
        errorMessage.style.display = 'none';
        
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 5000);
    }

    function showError(customMessage = null) {
        errorMessage.style.display = 'block';
        successMessage.style.display = 'none';
        
        if (customMessage) {
            const messageText = errorMessage.querySelector('.message-text') || errorMessage;
            if (errorMessage.querySelector('.message-text')) {
                errorMessage.querySelector('.message-text').textContent = customMessage;
            } else {
                errorMessage.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${customMessage}`;
            }
        }
        
        setTimeout(() => {
            errorMessage.style.display = 'none';
        }, 5000);
    }

    function hideMessages() {
        successMessage.style.display = 'none';
        errorMessage.style.display = 'none';
    }

    function resetForm() {
        contactForm.reset();
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.classList.remove('valid', 'invalid');
        });
    }

    const inputs = contactForm.querySelectorAll('input[required], textarea[required]');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            if (this.classList.contains('invalid')) {
                validateField(this);
            }
        });
    });

    function validateField(field) {
        const value = field.value.trim();
        const isValid = value.length > 0;
        
        if (field.type === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const isEmailValid = emailRegex.test(value);
            field.classList.toggle('valid', isEmailValid && value.length > 0);
            field.classList.toggle('invalid', !isEmailValid && value.length > 0);
        } else {
            field.classList.toggle('valid', isValid);
            field.classList.toggle('invalid', !isValid && value.length > 0);
        }
    }
});

