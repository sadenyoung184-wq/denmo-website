document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Scroll-triggered Animations ---
    const fadeInSections = document.querySelectorAll('.fade-in-section');
    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    fadeInSections.forEach(section => sectionObserver.observe(section));

    // --- 2. Smart Navigation ---
    const sections = document.querySelectorAll('main section[id]');
    const navLinks = document.querySelectorAll('.main-nav a.nav-link');
    const navObserver = new IntersectionObserver((entries) => {
        let currentSectionId = '';
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                currentSectionId = entry.target.getAttribute('id');
            }
        });

        if (currentSectionId) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    }, { rootMargin: '-40% 0px -60% 0px' });
    sections.forEach(section => navObserver.observe(section));

    // --- 3. Modal Functionality (Unchanged) ---
    // This part remains the same as your provided file.

    // --- 4. Responsive Services Section - CORRECTED LOGIC ---
    const tabButtons = document.querySelectorAll('.tab-button');
    const serviceContents = document.querySelectorAll('.services-wrapper .service-content');
    const accordionToggles = document.querySelectorAll('.accordion-toggle');

    function initializeServiceView() {
        if (window.innerWidth > 768) {
            // Desktop view: ensure first tab is active
            serviceContents.forEach((content, index) => {
                const isActive = index === 0;
                content.classList.toggle('active', isActive);
            });
            tabButtons.forEach((button, index) => {
                button.classList.toggle('active', index === 0);
            });
        } else {
            // Mobile view: ensure first accordion is open
            serviceContents.forEach((content, index) => {
                const isActive = index === 0;
                content.classList.toggle('active', isActive);
                content.querySelector('.accordion-toggle').setAttribute('aria-expanded', isActive);
            });
        }
    }

    tabButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const targetId = e.currentTarget.dataset.target;
            tabButtons.forEach(btn => btn.classList.remove('active'));
            e.currentTarget.classList.add('active');
            
            serviceContents.forEach(content => {
                content.classList.toggle('active', content.id === targetId.substring(1));
            });
        });
    });

    accordionToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            const parentContent = e.currentTarget.parentElement;
            const isExpanded = parentContent.classList.contains('active');
            
            // Close all items
            serviceContents.forEach(c => c.classList.remove('active'));
            accordionToggles.forEach(t => t.setAttribute('aria-expanded', 'false'));
            
            // Open the clicked one if it was previously closed
            if (!isExpanded) {
                parentContent.classList.add('active');
                e.currentTarget.setAttribute('aria-expanded', 'true');
            }
        });
    });
    
    // --- 5. FAQ Accordion ---
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', (e) => {
            const answer = e.currentTarget.nextElementSibling;
            const isExpanded = e.currentTarget.getAttribute('aria-expanded') === 'true';
            
            e.currentTarget.setAttribute('aria-expanded', !isExpanded);
            if (!isExpanded) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
            } else {
                answer.style.maxHeight = '0';
            }
        });
    });

    // Initialize the view on page load
    initializeServiceView();
    // Re-initialize on window resize to switch between modes
    window.addEventListener('resize', initializeServiceView);
});
