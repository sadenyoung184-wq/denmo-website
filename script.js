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
    const servicesContainer = document.querySelector('.services-container');
    if(servicesContainer) {
        const tabButtons = servicesContainer.querySelectorAll('.tab-button');
        const accordionToggles = servicesContainer.querySelectorAll('.accordion-toggle');
        const serviceContents = servicesContainer.querySelectorAll('.services-wrapper .service-content');

        function handleResize() {
            if (window.innerWidth > 768) {
                // Desktop view
                const firstTab = serviceContents[0];
                if (firstTab) {
                    firstTab.classList.add('active');
                    tabButtons[0].classList.add('active');
                }
                accordionToggles.forEach(toggle => {
                    toggle.setAttribute('aria-expanded', 'false');
                    const content = toggle.nextElementSibling;
                    if(content) content.style.maxHeight = null;
                });
            } else {
                // Mobile view
                serviceContents.forEach((content, index) => {
                    content.classList.remove('active');
                    const toggle = content.querySelector('.accordion-toggle');
                    if (toggle) {
                        toggle.setAttribute('aria-expanded', 'false');
                    }
                });
                // Open the first one by default on mobile
                const firstToggle = accordionToggles[0];
                const firstContent = serviceContents[0];
                if(firstToggle && firstContent){
                    firstToggle.setAttribute('aria-expanded', 'true');
                    firstContent.classList.add('active');
                    const planContent = firstContent.querySelector('.service-plan-content');
                    if(planContent) planContent.style.maxHeight = planContent.scrollHeight + 'px';
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
                const planContent = e.currentTarget.nextElementSibling;
                const isExpanded = e.currentTarget.getAttribute('aria-expanded') === 'true';
                
                // Close all items
                accordionToggles.forEach(t => {
                    t.setAttribute('aria-expanded', 'false');
                    const content = t.nextElementSibling;
                    if(content) content.style.maxHeight = '0';
                });
                
                // Open the clicked one if it was previously closed
                if (!isExpanded) {
                    e.currentTarget.setAttribute('aria-expanded', 'true');
                    if(planContent) planContent.style.maxHeight = planContent.scrollHeight + 'px';
                }
            });
        });
        
        // Setup initial view and add resize listener
        handleResize();
        window.addEventListener('resize', handleResize);
    }
    
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
});


