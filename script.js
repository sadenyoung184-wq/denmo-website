document.addEventListener('DOMContentLoaded', () => {

    // --- Hamburger Menu Script ---
    const hamburger = document.querySelector('.hamburger-menu');
    const mobileNav = document.querySelector('.mobile-nav');
    const overlay = document.querySelector('.overlay');
    const body = document.body;

    const toggleNav = () => {
        mobileNav.classList.toggle('open');
        overlay.classList.toggle('active');
        body.classList.toggle('nav-open');
    };

    hamburger.addEventListener('click', toggleNav);
    overlay.addEventListener('click', toggleNav);

    // Close nav when a link is clicked
    mobileNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
             if (mobileNav.classList.contains('open')) {
                toggleNav();
            }
        });
    });

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


    // --- Services Tabs Script (for both Desktop and Mobile Nav) ---
    function initializeTabs(containerSelector) {
        const container = document.querySelector(containerSelector);
        if (!container) return;

        const tabButtons = container.querySelectorAll('.tab-button');
        const tabContents = container.querySelectorAll('.tab-content');

        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                tabButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                tabContents.forEach(content => {
                    content.classList.remove('active');
                });
                
                const targetContent = container.querySelector(`#${button.dataset.tab}`);
                if (targetContent) {
                    targetContent.classList.add('active');
                }
            });
        });
    }

    // Initialize tabs for the version inside the mobile navigation
    initializeTabs('.mobile-services-container');
    
    // Initialize tabs for the desktop version
    // We modify the data-tab and id attributes in HTML to avoid conflicts
    const desktopServiceSection = document.querySelector('#services.desktop-only');
    if (desktopServiceSection) {
        const tabButtons = desktopServiceSection.querySelectorAll('.tab-button');
        const tabContents = desktopServiceSection.querySelectorAll('.tab-content');

        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                tabButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                tabContents.forEach(content => {
                    content.classList.remove('active');
                });
                
                const targetContent = desktopServiceSection.querySelector(`#${button.dataset.tab}`);
                if (targetContent) {
                    targetContent.classList.add('active');
                }
            });
        });
    }


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

});
