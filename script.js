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

    // --- 3. Modal Functionality ---
    const openModalButtons = document.querySelectorAll('[data-modal-target]');
    const closeModalButtons = document.querySelectorAll('.modal-close');
    
    const openModal = (modal) => {
        if (!modal) return;
        modal.classList.add('active');
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
        button.addEventListener('click', () => {
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

    // --- 4. Responsive Services Section (Tabs & Accordion) - CORRECTED LOGIC ---
    const tabsContainer = document.querySelector('.tabs-container');
    const tabButtons = document.querySelectorAll('.tab-button');
    const serviceContents = document.querySelectorAll('.services-wrapper .service-content');
    const accordionToggles = document.querySelectorAll('.accordion-toggle');

    function setupServices() {
        if (window.innerWidth > 768) {
            // DESKTOP: TAB LOGIC
            // Ensure first tab is active by default
            const hasActiveTab = document.querySelector('.tab-button.active');
            if (!hasActiveTab) {
                tabButtons[0].classList.add('active');
                serviceContents[0].classList.add('active');
            }
        } else {
            // MOBILE: ACCORDION LOGIC
            // Ensure first accordion is open by default
            accordionToggles[0].setAttribute('aria-expanded', 'true');
            serviceContents[0].classList.add('active');
        }
    }

    tabButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            e.currentTarget.classList.add('active');
            
            serviceContents.forEach(content => content.classList.remove('active'));
            document.querySelector(e.currentTarget.dataset.target).classList.add('active');
        });
    });

    accordionToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            const contentDiv = e.currentTarget.parentElement;
            const isExpanded = contentDiv.classList.contains('active');
            
            // Close all
            serviceContents.forEach(c => c.classList.remove('active'));
            accordionToggles.forEach(t => t.setAttribute('aria-expanded', 'false'));
            
            // Open the clicked one if it was previously closed
            if (!isExpanded) {
                contentDiv.classList.add('active');
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

    // Initial setup on page load
    setupServices();
});
