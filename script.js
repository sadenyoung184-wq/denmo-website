document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Scroll-triggered Animations (and other unchanged scripts) ---
    // ... (Your other scripts like scroll animation, nav, modals, etc. go here)

    // --- 2. Responsive Services Section - FULLY CORRECTED LOGIC ---
    const servicesContainer = document.querySelector('.services-container');
    if (servicesContainer) {
        const tabButtons = servicesContainer.querySelectorAll('.tab-button');
        const accordionToggles = servicesContainer.querySelectorAll('.accordion-toggle');
        const serviceContents = servicesContainer.querySelectorAll('.services-wrapper .service-content');

        function handleResize() {
            if (window.innerWidth > 768) {
                // Desktop view: activate the first tab by default if none are active
                const hasActiveTab = Array.from(tabButtons).some(btn => btn.classList.contains('active'));
                if (!hasActiveTab && tabButtons.length > 0) {
                    tabButtons[0].classList.add('active');
                    serviceContents[0].classList.add('active');
                }
            } else {
                // Mobile view: activate the first accordion item by default
                if (accordionToggles.length > 0) {
                    accordionToggles[0].setAttribute('aria-expanded', 'true');
                    serviceContents[0].classList.add('active');
                }
            }
        }

        tabButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const targetId = e.currentTarget.dataset.target;
                tabButtons.forEach(btn => btn.classList.remove('active'));
                e.currentTarget.classList.add('active');
                
                serviceContents.forEach(content => {
                    content.classList.toggle('active', `#${content.id}` === targetId);
                });
            });
        });

        accordionToggles.forEach(toggle => {
            toggle.addEventListener('click', (e) => {
                const parentContent = e.currentTarget.parentElement;
                const isExpanded = parentContent.classList.contains('active');

                // Close all other items
                serviceContents.forEach(content => {
                    if (content !== parentContent) {
                        content.classList.remove('active');
                        content.querySelector('.accordion-toggle').setAttribute('aria-expanded', 'false');
                    }
                });
                
                // Toggle the clicked item
                parentContent.classList.toggle('active');
                e.currentTarget.setAttribute('aria-expanded', !isExpanded);
            });
        });
        
        // Initialize the view and add resize listener
        handleResize();
        window.addEventListener('resize', handleResize);
    }
    
    // --- 3. FAQ Accordion Logic (remains the same) ---
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
});
