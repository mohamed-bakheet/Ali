class ZigZagSlider {
            // Added autoPlayDelay parameter (default 3000ms = 3 seconds)
            constructor(containerId, autoPlayDelay = 3000) {
                this.container = document.getElementById(containerId);
                if (!this.container) {
                    console.error(`Container ${containerId} not found`);
                    return;
                }

                this.wrapper = this.container.querySelector('.slider-perspective');
                // Query specifically for .zz-card
                this.cards = Array.from(this.container.querySelectorAll('.zz-card'));
                this.nextBtn = this.container.querySelector('.js-next-btn');
                
                this.activeIndex = 0;
                this.total = this.cards.length;
                
                // Autoplay settings
                this.autoPlayDelay = autoPlayDelay;
                this.intervalId = null;

                if (this.total === 0) {
                    console.error("No cards found");
                    return;
                }

                this.init();
            }

            init() {
                this.cards.forEach((card, index) => {
                    card.dataset.index = index;
                });
                this.updateClasses();

                if (this.nextBtn) {
                    this.nextBtn.addEventListener('click', () => {
                        this.nextSlide();
                        this.resetTimer(); // Reset timer on manual click
                    });
                }

                this.wrapper.addEventListener('click', (e) => {
                    // Check if click bubble up from inside a .zz-card
                    const clickedWrapper = e.target.closest('.zz-card');
                    if (clickedWrapper && clickedWrapper.classList.contains('pos-0')) {
                        this.nextSlide();
                        this.resetTimer(); // Reset timer on manual click
                    }
                });

                // Pause on Hover Logic
                this.container.addEventListener('mouseenter', () => this.stopAutoPlay());
                this.container.addEventListener('mouseleave', () => this.startAutoPlay());

                // Start the loop initially
                this.startAutoPlay();
            }

            updateClasses() {
                this.cards.forEach(card => {
                    const index = parseInt(card.dataset.index);
                    const diff = (index - this.activeIndex + this.total) % this.total;

                    card.classList.remove('pos-0', 'pos-1', 'pos-2', 'pos-3', 'pos-exit', 'pos-hidden');

                    if (diff === 0) card.classList.add('pos-0');
                    else if (diff === 1) card.classList.add('pos-1');
                    else if (diff === 2) card.classList.add('pos-2');
                    else if (diff === 3) card.classList.add('pos-3');
                    else if (diff === this.total - 1) card.classList.add('pos-exit');
                    else card.classList.add('pos-hidden');
                });
            }

            nextSlide() {
                this.activeIndex = (this.activeIndex + 1) % this.total;
                this.updateClasses();
            }

            // --- Autoplay Methods ---

            startAutoPlay() {
                // Prevent multiple intervals running at once
                if (this.intervalId) return;
                
                this.intervalId = setInterval(() => {
                    this.nextSlide();
                }, this.autoPlayDelay);
            }

            stopAutoPlay() {
                if (this.intervalId) {
                    clearInterval(this.intervalId);
                    this.intervalId = null;
                }
            }

            // Restarts the timer (useful after manual interaction)
            resetTimer() {
                this.stopAutoPlay();
                this.startAutoPlay();
            }
        }

        document.addEventListener('DOMContentLoaded', () => {
            // Initialize with ID and delay in milliseconds (e.g., 3000 = 3 seconds)
            new ZigZagSlider('roadmap-section', 3000);
        });