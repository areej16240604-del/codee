/* ============================================
   MEMORIES.JS - Gallery + Confetti Celebration
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {
    
    // ===== GALLERY SCROLL ANIMATION =====
    const items = document.querySelectorAll('.gallery-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.2 });

    items.forEach(item => observer.observe(item));

    // ===== CONFETTI SYSTEM =====
    const canvas = document.getElementById('confetti-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let confettiPieces = [];
    let animationId;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Confetti piece class
    class Confetti {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height - canvas.height;
            this.size = Math.random() * 10 + 5;
            this.speedY = Math.random() * 3 + 2;
            this.speedX = Math.random() * 2 - 1;
            this.color = [
                '#3b82f6', '#1e3a8a', '#60a5fa', 
                '#2563eb', '#93c5fd', '#475569'
            ][Math.floor(Math.random() * 6)];
            this.rotation = Math.random() * 360;
            this.rotationSpeed = Math.random() * 10 - 5;
        }

        update() {
            this.y += this.speedY;
            this.x += this.speedX;
            this.rotation += this.rotationSpeed;
        }

        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation * Math.PI / 180);
            ctx.fillStyle = this.color;
            ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size / 2);
            ctx.restore();
        }
    }

    // Create confetti burst
    function createConfetti() {
        for (let i = 0; i < 150; i++) {
            confettiPieces.push(new Confetti());
        }
    }

    // Animation loop
    function animateConfetti() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        confettiPieces.forEach((piece, index) => {
            piece.update();
            piece.draw();

            if (piece.y > canvas.height) {
                confettiPieces.splice(index, 1);
            }
        });

        if (confettiPieces.length > 0) {
            animationId = requestAnimationFrame(animateConfetti);
        }
    }

    // ===== CELEBRATE FUNCTION (Global) =====
    window.celebrate = function () {
        createConfetti();
        animateConfetti();

        // Multiple bursts
        setTimeout(() => { createConfetti(); }, 500);
        setTimeout(() => { createConfetti(); }, 1000);
    };
});