const cards = [
            { id: 1, title: "Main Focus", desc: "Starting Center", color: "bg-gradient-to-br from-indigo-500 to-purple-600" },
            { id: 2, title: "On Deck", desc: "Starting Right", color: "bg-gradient-to-br from-blue-500 to-cyan-600" },
            { id: 3, title: "In Queue", desc: "Starting Left", color: "bg-gradient-to-br from-emerald-500 to-teal-600" },
            { id: 4, title: "Deep Back", desc: "Starting Behind", color: "bg-gradient-to-br from-orange-500 to-red-600" },
            { id: 5, title: "Coming Soon", desc: "Hidden", color: "bg-gradient-to-br from-pink-500 to-rose-600" },
            { id: 6, title: "Last One", desc: "Hidden", color: "bg-gradient-to-br from-slate-600 to-slate-800" },
        ];

        let activeIndex = 0;
        const container = document.getElementById('sliderContainer');
        const nextBtn = document.getElementById('nextBtn');

        function init() {
            cards.forEach((card, i) => {
                const el = document.createElement('div');
                el.className = 'card slider-card';
                el.id = `card-${i}`;
                el.innerHTML = `
                    <div class="card-content ${card.color} text-white rounded-2xl h-full w-full">
                        <h2 class="font-bold mb-2">${card.title}</h2>
                        <p class="opacity-90 text-sm">${card.desc}</p>
                        <div class="mt-auto font-mono text-lg opacity-75 font-bold">0${i + 1}</div>
                    </div>
                `;
                container.appendChild(el);
            });
            updateClasses();
        }

        function updateClasses() {
            const cardElements = document.querySelectorAll('.slider-card');
            const total = cards.length;

            cardElements.forEach((el, i) => {
                // Calculate distance from active index
                // 0 = Active (Center)
                // 1 = Next (Right)
                // 2 = Next+1 (Left)
                // 3 = Next+2 (Back)
                let diff = (i - activeIndex + total) % total;

                el.className = 'card slider-card'; // Reset base class

                if (diff === 0) {
                    el.classList.add('pos-0'); // Active: Center
                } else if (diff === 1) {
                    el.classList.add('pos-1'); // 2nd: Right
                } else if (diff === 2) {
                    el.classList.add('pos-2'); // 3rd: Left
                } else if (diff === 3) {
                    el.classList.add('pos-3'); // 4th: Back
                } else if (diff === total - 1) {
                    // The one that just exited (Active - 1)
                    el.classList.add('pos-exit');
                } else {
                    el.classList.add('pos-hidden');
                }
            });
        }

        function nextSlide() {
            activeIndex = (activeIndex + 1) % cards.length;
            updateClasses();
        }

        nextBtn.addEventListener('click', nextSlide);
        
        // Click active card to next
        container.addEventListener('click', (e) => {
            if(e.target.closest('.pos-0')) {
                nextSlide();
            }
        });

        init();