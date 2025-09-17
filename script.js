document.addEventListener('DOMContentLoaded', () => {

    /* --- Fade-in Sections on Scroll --- */
    const faders = document.querySelectorAll('.fade-in-section');
    const appearOptions = { threshold: 0.1 };
    const appearOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if(entry.isIntersecting){
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);
    faders.forEach(fader => appearOnScroll.observe(fader));

    /* --- Services Section: Tabs & Accordion --- */
    const servicesContainer = document.querySelector('.services-container');
    if (servicesContainer) {
        const tabButtons = servicesContainer.querySelectorAll('.tab-button');
        const accordionToggles = servicesContainer.querySelectorAll('.accordion-toggle');
        const serviceContents = servicesContainer.querySelectorAll('.services-wrapper .service-content');

        function handleResize() {
            if(window.innerWidth > 768){
                // Desktop view: show first tab if none active
                if(!Array.from(tabButtons).some(btn=>btn.classList.contains('active'))){
                    tabButtons[0].classList.add('active');
                    serviceContents[0].classList.add('active');
                }
                accordionToggles.forEach(t => t.setAttribute('aria-expanded', 'false'));
            } else {
                // Mobile view: show first accordion item if none active
                if(!Array.from(serviceContents).some(c => c.classList.contains('active'))){
                    accordionToggles[0].setAttribute('aria-expanded', 'true');
                    serviceContents[0].classList.add('active');
                }
            }
        }

        // Tab click event
        tabButtons.forEach(btn => {
            btn.addEventListener('click', e => {
                const targetId = e.currentTarget.dataset.target;
                tabButtons.forEach(b => b.classList.remove('active'));
                e.currentTarget.classList.add('active');
                serviceContents.forEach(content => content.classList.toggle('active', `#${content.id}` === targetId));
            });
        });

        // Accordion click event
        accordionToggles.forEach(toggle => {
            toggle.addEventListener('click', e => {
                const parent = e.currentTarget.parentElement;
                const isExpanded = parent.classList.contains('active');

                // Close all
                serviceContents.forEach(c => c.classList.remove('active'));
                accordionToggles.forEach(t => t.setAttribute('aria-expanded', 'false'));

                if(!isExpanded){
                    parent.classList.add('active');
                    e.currentTarget.setAttribute('aria-expanded', 'true');
                }
            });
        });

        handleResize();
        window.addEventListener('resize', handleResize);
    }

    /* --- Modal Logic for "توضیحات بیشتر" --- */
    const detailButtons = document.querySelectorAll('.details-btn');
    const modals = document.querySelectorAll('.modal-backdrop');
    const closeButtons = document.querySelectorAll('.modal-close');

    detailButtons.forEach(btn => {
        btn.addEventListener('click', e => {
            const target = document.querySelector(btn.dataset.modalTarget);
            if(target){
                target.classList.add('active');
                const modalBody = target.querySelector('.modal-body');
                modalBody.innerHTML = `در حال حاضر محتوای توضیحات <strong>${btn.previousElementSibling.textContent}</strong> اینجا نمایش داده می‌شود.`;
            }
        });
    });

    closeButtons.forEach(btn => {
        btn.addEventListener('click', e => {
            e.currentTarget.closest('.modal-backdrop').classList.remove('active');
        });
    });

    // Close modal on backdrop click
    modals.forEach(modal => {
        modal.addEventListener('click', e => {
            if(e.target === modal){
                modal.classList.remove('active');
            }
        });
    });

    /* --- Sticky Header Nav Highlight (Optional) --- */
    const navLinks = document.querySelectorAll('.main-nav a');
    const sections = document.querySelectorAll('main section');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(sec => {
            const sectionTop = sec.offsetTop - 80;
            if(pageYOffset >= sectionTop){
                current = sec.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if(link.getAttribute('href') === `#${current}`){
                link.classList.add('active');
            }
        });
    });

});

