/* ============================================
   TIMELINE.JS - Friendship Journey Animations
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {
    
    // ===== TIMELINE SCROLL ANIMATION =====
    const items = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.3 });

    items.forEach(item => observer.observe(item));

    // ===== AUTO-REVEAL ON LOAD =====
    setTimeout(() => {
        items.forEach((item, i) => {
            setTimeout(() => item.classList.add('visible'), i * 200);
        });
    }, 500);
});