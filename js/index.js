// --- 1. Sticky Navbar Logic ---
        const navbar = document.getElementById('navbar');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                // Add dark background on scroll
                navbar.classList.add('bg-[#236185]/90', 'shadow-md', 'py-10'); // Reduced py for tighter stickiness
                navbar.classList.remove('py-10', 'bg-gradient-to-b');
            } else {
                // Transparent at top
                navbar.classList.remove('bg-[#236185]/90', 'shadow-md', 'py-10');
                navbar.classList.add('py-10', 'bg-gradient-to-b');
            }
        });


        // --- 2. Mobile Menu Logic ---
        const menuOverlay = document.getElementById('mobile-menu-overlay');
        function toggleMenu() {
            if (menuOverlay.classList.contains('translate-x-full')) {
                menuOverlay.classList.remove('translate-x-full');
            } else {
                menuOverlay.classList.add('translate-x-full');
            }
        }


        // --- 3. Enhanced Slider Logic (Left to Right) ---
        const slides = document.querySelectorAll('.slide');
        const dots = document.querySelectorAll('.dot');
        let currentSlide = 0;
        let slideInterval;

        function updateSlider() {
            slides.forEach((slide, index) => {
                // Remove all state classes first
                slide.classList.remove('slide-active', 'slide-hidden-left', 'slide-hidden-right');

                if (index === currentSlide) {
                    slide.classList.add('slide-active');
                } else if (index < currentSlide) {
                    // Slides before the current one go to left
                    slide.classList.add('slide-hidden-left');
                } else {
                    // Slides after the current one go to right
                    slide.classList.add('slide-hidden-right');
                }
            });


            // Update Dots
            dots.forEach((dot, index) => {
                if (index === currentSlide) {
                    dot.classList.remove('opacity-50');
                    dot.classList.add('opacity-100');
                } else {
                    dot.classList.add('opacity-50');
                    dot.classList.remove('opacity-100');
                }
            });
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            updateSlider();
        }

        function goToSlide(index) {
            currentSlide = index;
            updateSlider();
            // Reset timer so it doesn't auto-slide immediately after click
            resetTimer();
        }

        function resetTimer() {
            clearInterval(slideInterval);
            slideInterval = setInterval(nextSlide, 3000);
        }

        // Initialize
        updateSlider();
        resetTimer();