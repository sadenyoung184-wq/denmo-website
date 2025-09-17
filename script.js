document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Scroll-triggered Animations & Smart Navigation (Unchanged) ---
    // ...

    // --- 2. Modal Functionality (Unchanged) ---
    // ...

    // --- 3. Responsive Services Section - FULLY REWRITTEN & STABLE LOGIC ---
    const servicesContainer = document.querySelector('.services-container');
    if (servicesContainer) {
        const tabButtons = servicesContainer.querySelectorAll('.tab-button');
        const serviceContents = servicesContainer.querySelectorAll('.services-wrapper .service-content');
        const accordionToggles = servicesContainer.querySelectorAll('.accordion-toggle');

        function handleServiceView() {
            const isDesktop = window.innerWidth > 768;

            if (isDesktop) {
                // Ensure tabs are visible and accordions are reset
                const hasActiveTab = Array.from(tabButtons).some(btn => btn.classList.contains('active'));
                if (!hasActiveTab && tabButtons.length > 0) {
                    tabButtons[0].classList.add('active');
                    serviceContents[0].classList.add('active');
                }
            } else {
                // Ensure accordions are ready, open the first one by default
                if (accordionToggles.length > 0) {
                    const hasActiveAccordion = Array.from(serviceContents).some(c => c.classList.contains('active'));
                    if (!hasActiveAccordion) {
                        accordionToggles[0].setAttribute('aria-expanded', 'true');
                        serviceContents[0].classList.add('active');
                    }
                }
            }
        }

        tabButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                if (window.innerWidth <= 768) return; // This logic is for desktop only

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
                if (window.innerWidth > 768) return; // This logic is for mobile only

                const parentContent = e.currentTarget.parentElement;
                const isExpanded = parentContent.classList.contains('active');

                // Close all other items before opening the new one
                serviceContents.forEach(content => {
                    content.classList.remove('active');
                    content.querySelector('.accordion-toggle').setAttribute('aria-expanded', 'false');
                });
                
                // If the clicked item was not already open, open it
                if (!isExpanded) {
                    parentContent.classList.add('active');
                    e.currentTarget.setAttribute('aria-expanded', 'true');
                }
            });
        });
        
        // Initial setup and resize handling
        handleServiceView();
        window.addEventListener('resize', handleServiceView);
    }
    
    // --- 4. FAQ Accordion (Unchanged) ---
    // ...
});
