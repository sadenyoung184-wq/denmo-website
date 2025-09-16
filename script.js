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
    
    function openModal(modal) {
        if (modal == null) return;
        modal.classList.add('active');
    }
    
    function closeModal(modal) {
        if (modal == null) return;
        modal.classList.remove('active');
    }

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
            if (e.target === modal) {
                closeModal(modal);
            }
        });
    });

    // --- 4. Responsive Services Section (Tabs & Accordion) - CORRECTED LOGIC ---
    const tabButtons = document.querySelectorAll('.tab-button');
    const accordionToggles = document.querySelectorAll('.accordion-toggle');
    const serviceContents = document.querySelectorAll('.services-wrapper .service-content');

    function initializeServiceView() {
        if (window.innerWidth > 768) {
            // Desktop: Activate the first tab
            if (tabButtons.length > 0) {
                tabButtons[0].classList.add('active');
            }
            if (serviceContents.length > 0) {
                serviceContents[0].classList.add('active');
            }
        } else {
            // Mobile: Activate the first accordion item
            if (accordionToggles.length > 0) {
                accordionToggles[0].setAttribute('aria-expanded', 'true');
            }
            if (serviceContents.length > 0) {
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
                content.classList.toggle('active', content.id === targetId.substring(1));
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

    // Initialize the view when the page loads
    initializeServiceView();
    // Re-initialize the view when the window is resized
    window.addEventListener('resize', initializeServiceView);
});
