document.addEventListener('DOMContentLoaded', () => {
    
    // --- All other scripts (Scroll Animation, Nav, Modals, FAQ) remain the same ---

    // --- FULLY CORRECTED Responsive Services Section Logic ---
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

                // Close all items
                serviceContents.forEach(c => c.classList.remove('active'));
                accordionToggles.forEach(t => t.setAttribute('aria-expanded', 'false'));
                
                // Open the clicked one if it was not already open
                if (!isExpanded) {
                    parentContent.classList.add('active');
                    e.currentTarget.setAttribute('aria-expanded', 'true');
                }
            });
        });
        
        // Setup initial view and add resize listener
        handleResize();
        window.addEventListener('resize', handleResize);
    }
    
    // --- FAQ Accordion Logic (remains the same) ---
    // ...
});
