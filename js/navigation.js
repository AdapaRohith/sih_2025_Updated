
document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    
    setActiveNavState();
    
    addPageTransitions();
});

function initMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuToggle && navLinks) {
        // Handle mobile menu toggle
        mobileMenuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('mobile-open');
            mobileMenuToggle.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (
                !navLinks.contains(e.target) &&
                !mobileMenuToggle.contains(e.target)
            ) {
                navLinks.classList.remove('mobile-open');
                mobileMenuToggle.classList.remove('active');
            }
        });

        // Close menu when clicking nav links
        navLinks.addEventListener('click', (e) => {
            if (e.target.tagName === 'A') {
                navLinks.classList.remove('mobile-open');
                mobileMenuToggle.classList.remove('active');
            }
        });
    }
}

function setActiveNavState() {
    if (window.location.pathname.includes('login.html')) {
        return;
    }
    
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => link.classList.remove('active'));
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        const linkPage = href.split('/').pop();
        
        if (linkPage === currentPage || 
            (currentPage === '' && linkPage === 'index.html') ||
            (currentPage === 'index.html' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });
}

function addPageTransitions() {
    const navLinks = document.querySelectorAll('.nav-links a[href]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.hostname === window.location.hostname || 
                this.hostname === '' || 
                this.getAttribute('href').startsWith('/') ||
                this.getAttribute('href').includes('.html')) {
                
                const header = document.querySelector('.header');
                if (header) {
                    header.classList.add('nav-loading');
                }
                
                document.body.style.transition = 'opacity 0.3s ease';
                document.body.style.opacity = '0.8';
                
                setTimeout(() => {
                    if (document.body.style.opacity === '0.8') {
                        document.body.style.opacity = '1';
                        if (header) {
                            header.classList.remove('nav-loading');
                        }
                    }
                }, 300);
            }
        });
    });
}

const style = document.createElement('style');
style.textContent = `
    .nav-loading {
        opacity: 0.9;
        pointer-events: none;
    }
    
    .nav-loading .nav-links a {
        opacity: 0.7;
    }
    
    .header {
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        right: 0 !important;
        z-index: 1000 !important;
        transition: all 0.3s ease !important;
    }
    
    body {
        transition: opacity 0.3s ease;
    }
`;
document.head.appendChild(style);
