// Nexray Universal Analytics & Progression Tracker
(function() {
    // Save current path to local storage so we can "resume" later
    const currentPath = window.location.pathname;
    
    // Only track actual guide/learning pages
    if (currentPath.includes('guide/') || currentPath.includes('how-to')) {
        localStorage.setItem('nexray_last_page', currentPath);
        localStorage.setItem('nexray_last_title', document.title.split('|')[0].trim());
    }

    // Intentionally no floating resume/info overlays; only lightweight path tracking.
})();
