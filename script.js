document.addEventListener('DOMContentLoaded', () => {

    // --- Modal Script with Focus Trap ---
    const openModalButtons = document.querySelectorAll('[data-modal-target]');
    const closeModalButtons = document.querySelectorAll('.modal-close');

    const openModal = (modal) => {
        if (modal == null) return;
        modal.classList.add('active');
        trapFocus(modal);
    };
    
    const closeModal = (modal) => {
        if (modal == null) return;
        modal.classList.remove('active');
    };

    openModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = document.querySelector(button.dataset.modalTarget);
            openModal(modal);
        });
    });

    closeModalButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const modal = button.closest('.modal-backdrop');
            closeModal(modal);
        });
    });

    document.querySelectorAll('.modal-backdrop').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === "Escape") {
            const activeModal = document.querySelector('.modal-backdrop.active');
            closeModal(activeModal);
        }
    });

    function trapFocus(element) {
        const focusableEls = element.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        const firstFocusableEl = focusableEls[0];
        const lastFocusableEl = focusableEls[focusableEls.length - 1];
        const KEYCODE_TAB = 9;

        element.addEventListener('keydown', function(e) {
            const isTabPressed = (e.key === 'Tab' || e.keyCode === KEYCODE_TAB);
            if (!isTabPressed) { return; }

            if (e.shiftKey) { 
                if (document.activeElement === firstFocusableEl) {
                    lastFocusableEl.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusableEl) {
                    firstFocusableEl.focus();
                    e.preventDefault();
                }
            }
        });
        if (firstFocusableEl) {
           firstFocusableEl.focus();
        }
    }


    // --- Desktop Tabs & Mobile Accordion for Services ---
    const serviceToggles = document.querySelectorAll('.service-toggle');
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    function handleServiceView() {
        if (window.innerWidth <= 768) {
            // Mobile Accordion Logic
            serviceToggles.forEach(toggle => {
                const content = toggle.nextElementSibling;
                // Set initial state
                const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
                content.style.maxHeight = isExpanded ? content.scrollHeight + 'px' : '0';
            });
        } else {
            // Desktop Tabs Logic
            // Reset any open accordions
            serviceToggles.forEach(toggle => {
                toggle.setAttribute('aria-expanded', 'false');
                toggle.nextElementSibling.style.maxHeight = null;
            });
            // Ensure the active tab is displayed
            const activeTab = document.querySelector('.tab-button.active');
            if(activeTab){
                const activeContent = document.querySelector(activeTab.dataset.tab.replace('tab', '#tab'));
                tabContents.forEach(c => c.classList.remove('active'));
                if(activeContent) activeContent.classList.add('active');
            }
        }
    }

    serviceToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            if (window.innerWidth > 768) return; // Only run on mobile
            const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
            
            // Close all accordions before opening the new one
            serviceToggles.forEach(t => {
                t.setAttribute('aria-expanded', 'false');
                t.nextElementSibling.style.maxHeight = 0;
            });
            
            if (!isExpanded) {
                toggle.setAttribute('aria-expanded', 'true');
                const content = toggle.nextElementSibling;
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        });
    });

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (window.innerWidth <= 768) return; // Only run on desktop
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            tabContents.forEach(content => {
                content.classList.remove('active');
            });
            document.querySelector(button.dataset.tab.replace('tab', '#tab')).classList.add('active');
        });
    });


    // --- FAQ Accordion ---
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const isExpanded = question.getAttribute('aria-expanded') === 'true';
            
            question.setAttribute('aria-expanded', !isExpanded);
            question.querySelector('.faq-icon').textContent = !isExpanded ? '▲' : '▼';
            answer.style.maxHeight = !isExpanded ? answer.scrollHeight + 'px' : '0';
        });
    });

    // Initial setup on load and resize
    handleServiceView();
    window.addEventListener('resize', handleServiceView);
});


