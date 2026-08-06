/**
 * JavaScript implementation for Chaitanya's Portfolio
 * This file demonstrates key concepts from JavaScript Essentials 1 & 2 
 * and adds lively animations and interactions.
 */

class PortfolioApp {
    constructor() {
        this.hamburger = document.querySelector('.hamburger');
        this.navMenu = document.querySelector('.nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');
        
        this.init();
    }

    init() {
        // Mobile Menu Setup
        if (this.hamburger) {
            this.hamburger.addEventListener('click', () => this.toggleMenu());
        }
        for (let i = 0; i < this.navLinks.length; i++) {
            this.navLinks[i].addEventListener('click', () => this.closeMenu());
        }

        // Initialize Interactions
        this.initAnimations();
        this.typewriterEffect();
        this.initImageModal();

        // Track Visits using LocalStorage
        this.trackVisits();

        // Trigger scroll once on load to show elements already in view
        this.revealOnScroll();
    }

    toggleMenu() {
        this.hamburger.classList.toggle('active');
        this.navMenu.classList.toggle('active');
    }

    closeMenu() {
        this.hamburger.classList.remove('active');
        this.navMenu.classList.remove('active');
    }

    initAnimations() {
        // Automatically add reveal class to major elements so we don't have to edit all HTML files
        const elementsToReveal = document.querySelectorAll('.skills-category, .project-card, .bio-content, .details-grid, .contact-grid, .timeline-item');
        elementsToReveal.forEach(el => el.classList.add('reveal'));

        // Reset skill bars for animation
        const skillBars = document.querySelectorAll('.skill-progress');
        skillBars.forEach(bar => {
            const targetWidth = bar.style.width;
            bar.setAttribute('data-width', targetWidth);
            bar.style.width = '0%';
        });

        // Add scroll event listener
        window.addEventListener('scroll', () => this.revealOnScroll());
    }

    revealOnScroll() {
        const reveals = document.querySelectorAll('.reveal');
        const windowHeight = window.innerHeight;

        // Reveal elements when they scroll into view
        reveals.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 100;
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');
            }
        });

        // Animate skill bars specifically when they appear
        const skillBars = document.querySelectorAll('.skill-progress');
        skillBars.forEach(bar => {
            const elementTop = bar.getBoundingClientRect().top;
            if (elementTop < windowHeight - 50 && bar.style.width === '0%') {
                bar.style.width = bar.getAttribute('data-width');
            }
        });
    }

    async typewriterEffect() {
        const tagline = document.querySelector('.tagline');
        if (!tagline) return; // Only run if tagline exists (e.g. on homepage)
        
        const text = "Computer Engineering Student & Aspiring Developer";
        tagline.textContent = "";
        
        for (let i = 0; i < text.length; i++) {
            tagline.textContent += text.charAt(i);
            // Wait 50ms between each character
            await new Promise(resolve => setTimeout(resolve, 50));
        }
    }

    trackVisits() {
        try {
            const visits = localStorage.getItem('portfolioVisits');
            let visitData = visits ? JSON.parse(visits) : { count: 0 };
            visitData.count += 1;
            localStorage.setItem('portfolioVisits', JSON.stringify(visitData));
            console.log(`Welcome! You have visited this site ${visitData.count} times.`);
        } catch (error) {
            console.error("Could not track visits: ", error.message);
        }
    }

    initImageModal() {
        const modal = document.getElementById('imageModal');
        if (!modal) return; // Only run if modal exists on the page

        const modalImg = document.getElementById('modalImg');
        const captionText = document.getElementById('modalCaption');
        const closeBtn = document.querySelector('.close-modal');
        const certImages = document.querySelectorAll('.certificate-img');

        certImages.forEach(img => {
            img.addEventListener('click', () => {
                modal.style.display = "block";
                modalImg.src = img.src;
                captionText.innerHTML = img.alt;
                document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
            });
        });

        const closeModal = () => {
            modal.style.display = "none";
            document.body.style.overflow = 'auto'; // Restore scrolling
        };

        if (closeBtn) {
            closeBtn.addEventListener('click', closeModal);
        }

        // Close when clicking outside the image
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.style.display === "block") {
                closeModal();
            }
        });
    }
}

// Run the app when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    const app = new PortfolioApp();
});
