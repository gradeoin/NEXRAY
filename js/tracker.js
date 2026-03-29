// Nexray Universal Analytics & Progression Tracker
(function() {
    // Save current path to local storage so we can "resume" later
    const currentPath = window.location.pathname;
    
    // Only track actual guide/learning pages
    if (currentPath.includes('guide/') || currentPath.includes('how-to')) {
        localStorage.setItem('nexray_last_page', currentPath);
        localStorage.setItem('nexray_last_title', document.title.split('|')[0].trim());
    }

    // Inject "Continue Learning" floating pill if user has a history
    window.addEventListener('DOMContentLoaded', () => {
        const lastPage = localStorage.getItem('nexray_last_page');
        const lastTitle = localStorage.getItem('nexray_last_title');

        if (lastPage && lastTitle && currentPath !== lastPage && !currentPath.includes('auth.html')) {
            const pill = document.createElement('a');
            pill.href = lastPage;
            pill.className = 'continue-learning-pill';
            pill.innerHTML = `<span style="font-size:0.8rem;color:var(--text-secondary);display:block;margin-bottom:2px;">Resume Learning</span><strong>${lastTitle}</strong>`;
            
            // Apply inline styles for robust rendering without needing CSS updates immediately
            Object.assign(pill.style, {
                position: 'fixed',
                bottom: '20px',
                right: '20px',
                background: 'rgba(0, 56, 255, 0.15)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(0, 56, 255, 0.3)',
                padding: '12px 20px',
                borderRadius: '12px',
                color: '#fff',
                textDecoration: 'none',
                zIndex: '9999',
                boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
                transition: 'all 0.3s ease',
                fontFamily: '"Inter", sans-serif',
                display: 'block'
            });

            pill.onmouseenter = () => pill.style.background = 'rgba(0, 56, 255, 0.3)';
            pill.onmouseleave = () => pill.style.background = 'rgba(0, 56, 255, 0.15)';

            document.body.appendChild(pill);
        }
    });
})();
