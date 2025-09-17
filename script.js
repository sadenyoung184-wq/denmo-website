document.addEventListener('DOMContentLoaded', () => {
    
    // --- 2. Responsive Services Section - FIXED ---
    const servicesContainer = document.querySelector('.services-container');
    if (servicesContainer) {
        const tabButtons = servicesContainer.querySelectorAll('.tab-button');
        const accordionToggles = servicesContainer.querySelectorAll('.accordion-toggle');
        const serviceContents = servicesContainer.querySelectorAll('.services-wrapper .service-content');

        function resetAll() {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            accordionToggles.forEach(tg => tg.setAttribute('aria-expanded', 'false'));
            serviceContents.forEach(content => content.classList.remove('active'));
        }

        function handleResize() {
            resetAll(); // پاک کردن حالت قبلی

            if (window.innerWidth > 768) {
                // Desktop: فعال کردن اولین تب
                if (tabButtons.length > 0 && serviceContents.length > 0) {
                    tabButtons[0].classList.add('active');
                    serviceContents[0].classList.add('active');
                }
            } else {
                // Mobile: فعال کردن اولین آکاردئون
                if (accordionToggles.length > 0 && serviceContents.length > 0) {
                    accordionToggles[0].setAttribute('aria-expanded', 'true');
                    serviceContents[0].classList.add('active');
                }
            }
        }

        // --- Tab logic ---
        tabButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const targetId = e.currentTarget.dataset.target;
                resetAll();
                e.currentTarget.classList.add('active');
                const targetContent = servicesContainer.querySelector(targetId);
                if (targetContent) targetContent.classList.add('active');
            });
        });

        // --- Accordion logic ---
        accordionToggles.forEach(toggle => {
            toggle.addEventListener('click', (e) => {
                const parentContent = e.currentTarget.closest('.service-content');
                const isExpanded = parentContent.classList.contains('active');

                resetAll(); // همه رو ببند

                if (!isExpanded) {
                    parentContent.classList.add('active');
                    e.currentTarget.setAttribute('aria-expanded', 'true');
                }
            });
        });
        
        // Initialize and resize listener
        handleResize();
        window.addEventListener('resize', handleResize);
    }
    
    // --- 3. FAQ Accordion Logic ---
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', (e) => {
            const answer = e.currentTarget.nextElementSibling;
            const isExpanded = e.currentTarget.getAttribute('aria-expanded') === 'true';
            
            // بستن همه
            faqQuestions.forEach(q => {
                q.setAttribute('aria-expanded', 'false');
                q.nextElementSibling.style.maxHeight = '0';
            });

            if (!isExpanded) {
                e.currentTarget.setAttribute('aria-expanded', 'true');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });
});

