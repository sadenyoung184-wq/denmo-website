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
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.main-nav a.nav-link');
    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href').substring(1) === entry.target.id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { rootMargin: '-30% 0px -70% 0px' });
    sections.forEach(section => navObserver.observe(section));

    // --- 3. Modal Functionality with Focus Trap ---
    const openModalButtons = document.querySelectorAll('[data-modal-target]');
    const closeModalButtons = document.querySelectorAll('.modal-close');
    
    const openModal = (modal) => {
        if (!modal) return;
        modal.classList.add('active');
        trapFocus(modal);
    };
    const closeModal = (modal) => {
        if (!modal) return;
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
            if (e.target === modal) closeModal(modal);
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
        if (focusableEls.length === 0) return;
        const firstFocusableEl = focusableEls[0];
        const lastFocusableEl = focusableEls[focusableEls.length - 1];
        
        element.addEventListener('keydown', function(e) {
            if (e.key !== 'Tab') return;
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
        firstFocusableEl.focus();
    }

    // --- 4. Responsive Services Section (Tabs on Desktop, Accordion on Mobile) ---
    const tabButtons = document.querySelectorAll('.tab-button');
    const serviceContents = document.querySelectorAll('.services-wrapper .service-content');
    const accordionToggles = document.querySelectorAll('.accordion-toggle');

    function activateTab(targetId) {
        serviceContents.forEach(content => content.classList.remove('active'));
        tabButtons.forEach(button => button.classList.remove('active'));

        const targetContent = document.querySelector(targetId);
        const targetButton = document.querySelector(`[data-target="${targetId}"]`);

        if (targetContent) targetContent.classList.add('active');
        if (targetButton) targetButton.classList.add('active');
    }

    tabButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            activateTab(e.currentTarget.dataset.target);
        });
    });

    accordionToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            const content = e.currentTarget.parentElement;
            const isExpanded = content.classList.contains('active');
            
            // Close all
            serviceContents.forEach(c => c.classList.remove('active'));
            accordionToggles.forEach(t => t.setAttribute('aria-expanded', 'false'));
            
            // Open the clicked one if it was closed
            if (!isExpanded) {
                content.classList.add('active');
                e.currentTarget.setAttribute('aria-expanded', 'true');
            }
        });
    });

    // --- 5. FAQ Accordion ---
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
