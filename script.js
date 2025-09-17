document.addEventListener('DOMContentLoaded', () => {
    
    // --- All other scripts (Scroll Animation, Nav, Modals, FAQ) remain the same ---
    
    // --- CORRECTED Responsive Services Section Logic ---
    const servicesContainer = document.querySelector('.services-container');
    if (servicesContainer) {
        const tabButtons = servicesContainer.querySelectorAll('.tab-button');
        const accordionToggles = servicesContainer.querySelectorAll('.accordion-toggle');
        const serviceContents = servicesContainer.querySelectorAll('.service-content');

        function handleTabs(e) {
            const targetId = e.currentTarget.dataset.target;

            tabButtons.forEach(btn => btn.classList.remove('active'));
            e.currentTarget.classList.add('active');
            
            serviceContents.forEach(content => {
                content.classList.remove('active');
                if (`#${content.id}` === targetId) {
                    content.classList.add('active');
                }
            });
        }

        function handleAccordion(e) {
            const parentContent = e.currentTarget.parentElement;
            const isExpanded = parentContent.classList.contains('active');

            // Close all items first
            serviceContents.forEach(content => {
                content.classList.remove('active');
                content.querySelector('.accordion-toggle').setAttribute('aria-expanded', 'false');
            });
            
            // If the clicked item was not already expanded, open it
            if (!isExpanded) {
                parentContent.classList.add('active');
                e.currentTarget.setAttribute('aria-expanded', 'true');
            }
        }

        // Set initial state and add listeners
        function initializeServiceView() {
            if (window.innerWidth > 768) {
                // Desktop Tab view
                tabButtons.forEach(button => button.addEventListener('click', handleTabs));
            } else {
                // Mobile Accordion view
                accordionToggles.forEach(toggle => toggle.addEventListener('click', handleAccordion));
            }
        }

        // Run on load and on resize
        initializeServiceView();
        window.addEventListener('resize', initializeServiceView);
    }
    
    // --- FAQ Accordion Logic (remains the same) ---
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


