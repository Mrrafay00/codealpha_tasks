// Navbar Scroll Effect
        window.addEventListener('scroll', function() {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
        
        // Back to Top Button
        const backToTop = document.getElementById('backToTop');
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTop.style.display = 'block';
            } else {
                backToTop.style.display = 'none';
            }
        });
        
        backToTop.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 70,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Phone contact options
document.addEventListener('DOMContentLoaded', function() {
    // Form submission handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // You can add form validation here if needed
            
            // Submit the form
            this.submit();
            
            // Show success message
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
        });
    }
    
    // Phone number click event (for mobile devices)
    const phoneNumber = document.querySelector('.phone-number');
    if (phoneNumber) {
        phoneNumber.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                const options = this.nextElementSibling;
                options.style.display = options.style.display === 'flex' ? 'none' : 'flex';
            }
        });
    }
    
    // Close options when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.contact-phone') && window.innerWidth > 768) {
            const options = document.querySelector('.phone-options');
            if (options) options.style.display = 'none';
        }
    });
});

// CV DOWNALOD
document.getElementById("downloadCV").addEventListener("click", function(e) {
    e.preventDefault();
    
    const link = document.createElement("a");
    link.href = "./Rafay_CV.jpeg";
    link.download = "Rafay_CV.jpeg";  // You can change the filename here
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});