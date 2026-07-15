/* ============================================
   WISHES.JS - GIF Inside Card + Side GIFs
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {
    
    // ===== REASONS DATA (Your 5 Reasons) =====
    const reasons = [
        {
            text: "Happy Birthday... bas itna bhi special feel mat karna ab daramaybaz. 😒😂",
            emoji: "🎂"
        },
        {
            text: "Kyun ke tumhare bina tang karne wala koi aur nahi milega. 😂",
            emoji: "😈"
        },
        {
            text: "Kyun ke phir mujhe roz tumhein daantne ka mauka kaise milega? 😒",
            emoji: "😤"
        },
        {
            text: "Kyun ke meri jaisi free ki overthinking aur caring combo dobara nahi milegi. 😂",
            emoji: "🧠"
        },
        {
            text: "Kyun ke main naraz ho sakti hoon... lekin zarurat par tumhara saath kabhi nahi chhorungi. 🤍",
            emoji: "🤝"
        }
    ];

    // GIFs to alternate inside cards
    const cardGifs = ['gif1.gif', 'gif2.gif'];

    // ===== STATE =====
    let currentIndex = 0;
    const container = document.getElementById('reasons-container');
    const shuffleBtn = document.getElementById('shuffleBtn');
    const counter = document.getElementById('reasonCounter');
    let isTransitioning = false;

    // ===== CREATE REASON CARD (GIF inside as background) =====
    function createReasonCard(reason, index) {
        const card = document.createElement('div');
        card.className = 'reason-card';
        
        // Pick GIF alternately for inside card
        const gifSrc = cardGifs[index % 2];
        
        card.innerHTML = `
            <div class="reason-card-bg">
                <img src="${gifSrc}" alt="cute gif">
            </div>
            <div class="reason-card-overlay"></div>
            <div class="reason-text">${reason.emoji} ${reason.text}</div>
        `;
        
        container.appendChild(card);

        // Animate in
        setTimeout(() => {
            card.classList.add('visible');
        }, 50);
    }

    // ===== SHUFFLE BUTTON CLICK =====
    if (shuffleBtn) {
        shuffleBtn.addEventListener('click', function () {
            if (isTransitioning) return;
            isTransitioning = true;

            if (currentIndex < reasons.length) {
                createReasonCard(reasons[currentIndex], currentIndex);
                
                if (counter) {
                    counter.textContent = `Reason ${currentIndex + 1} of ${reasons.length}`;
                }

                currentIndex++;

                // All reasons shown - transform button to navigation
                if (currentIndex === reasons.length) {
                    shuffleBtn.textContent = "Continue to Timeline →";
                    shuffleBtn.classList.add('story-mode');
                    
                    shuffleBtn.onclick = function () {
                        window.location.href = 'timeline.html';
                    };
                }

                setTimeout(() => {
                    isTransitioning = false;
                }, 500);
            }
        });
    }
});