        // Scroll to Top Functionality
        const scrollToTopBtn = document.getElementById('scrollToTop');
        
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.classList.add('show');
            } else {
                scrollToTopBtn.classList.remove('show');
            }
        });

        function scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }

        // Search Functionality
        function searchContent() {
            const searchTerm = document.getElementById('searchInput').value.toLowerCase();
            
            if (!searchTerm) {
                alert('Please enter a search term');
                return;
            }

            // Get all text content
            const sections = document.querySelectorAll('section');
            let found = false;
            let firstMatch = null;

            sections.forEach(section => {
                const text = section.textContent.toLowerCase();
                if (text.includes(searchTerm)) {
                    found = true;
                    if (!firstMatch) {
                        firstMatch = section;
                    }
                    section.style.backgroundColor = 'rgba(102, 126, 234, 0.1)';
                    setTimeout(() => {
                        section.style.backgroundColor = '';
                    }, 2000);
                }
            });

            if (firstMatch) {
                firstMatch.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
                alert('No results found for: ' + document.getElementById('searchInput').value);
            }
        }

        // Search on Enter key
        document.getElementById('searchInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                searchContent();
            }
        });

        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Enhanced scroll reveal with stagger and progress-bar animation
        const revealObserver = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    el.classList.add('reveal-visible');
                    // add small stagger to direct children using CSS var --delay
                    el.querySelectorAll(':scope > *').forEach((child, i) => {
                        child.style.setProperty('--delay', `${i * 80}ms`);
                    });
                    // ensure any progress bars animate their width
                    el.querySelectorAll('.progress-bar').forEach(pb => {
                        pb.style.transition = 'width 1s cubic-bezier(.22,1,.36,1)';
                    });
                    obs.unobserve(el);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -80px 0px' });

        // Observe common card/section elements and hero parts
        document.querySelectorAll('.skill-card, .project-card, .cert-card, .education-card, .proficiency-item, .hero-photo-wrapper, .hero-content').forEach(el => {
            el.classList.add('reveal'); revealObserver.observe(el);
        });
