document.addEventListener('DOMContentLoaded', () => {

    // --- Services Section Responsive & Tab/Accordion Logic ---
    const servicesContainer = document.querySelector('.services-container');
    if (servicesContainer) {
        const tabButtons = servicesContainer.querySelectorAll('.tab-button');
        const accordionToggles = servicesContainer.querySelectorAll('.accordion-toggle');
        const serviceContents = servicesContainer.querySelectorAll('.services-wrapper .service-content');

        function handleResize() {
            if (window.innerWidth > 768) {
                // Desktop: activate first tab if none active
                const hasActiveTab = Array.from(tabButtons).some(btn => btn.classList.contains('active'));
                if (!hasActiveTab && tabButtons.length > 0) {
                    tabButtons.forEach(btn => btn.classList.remove('active'));
                    serviceContents.forEach(c => c.classList.remove('active'));

                    tabButtons[0].classList.add('active');
                    serviceContents[0].classList.add('active');
                }
            } else {
                // Mobile: activate first accordion if none active
                const hasActiveAccordion = Array.from(accordionToggles).some(t => t.getAttribute('aria-expanded') === 'true');
                if (!hasActiveAccordion && accordionToggles.length > 0) {
                    accordionToggles.forEach(t => t.setAttribute('aria-expanded', 'false'));
                    serviceContents.forEach(c => c.classList.remove('active'));

                    accordionToggles[0].setAttribute('aria-expanded', 'true');
                    serviceContents[0].classList.add('active');
                }
            }
        }

        // --- Tab click ---
        tabButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const targetId = e.currentTarget.dataset.target;

                tabButtons.forEach(btn => btn.classList.remove('active'));
                e.currentTarget.classList.add('active');

                serviceContents.forEach(content => {
                    if ('#' + content.id === targetId) {
                        content.classList.add('active');
                    } else {
                        content.classList.remove('active');
                    }
                });
            });
        });

        // --- Accordion toggle ---
        accordionToggles.forEach(toggle => {
            toggle.addEventListener('click', (e) => {
                const parentContent = e.currentTarget.parentElement;
                const isExpanded = parentContent.classList.contains('active');

                // Close all
                serviceContents.forEach(c => c.classList.remove('active'));
                accordionToggles.forEach(t => t.setAttribute('aria-expanded', 'false'));

                // Open clicked if it was closed
                if (!isExpanded) {
                    parentContent.classList.add('active');
                    e.currentTarget.setAttribute('aria-expanded', 'true');
                }
            });
        });

        handleResize();
        window.addEventListener('resize', handleResize);
    }

    // --- FAQ Accordion ---
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', e => {
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

    // --- Modal Logic for "توضیحات بیشتر" ---
    const detailButtons = document.querySelectorAll('.details-btn');
    detailButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const modalId = btn.dataset.modalTarget;
            const modal = document.querySelector(modalId);
            if (modal) {
                modal.setAttribute('aria-hidden', 'false');
            }
        });
    });

    const modalCloses = document.querySelectorAll('.modal-close');
    modalCloses.forEach(closeBtn => {
        closeBtn.addEventListener('click', () => {
            const modal = closeBtn.closest('.modal-backdrop');
            if (modal) modal.setAttribute('aria-hidden', 'true');
        });
    });

});
