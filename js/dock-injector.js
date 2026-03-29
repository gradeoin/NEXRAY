/**
 * Nexray Dock Injector (Mobile Only - Bottom Floating)
 */
document.addEventListener('DOMContentLoaded', () => {
    // Only show on small screens (Mobile/Tablet)
    if (window.innerWidth >= 1024) return;

    // Detect if we are in a subfolder (like /guide/)
    const isSubdir = window.location.pathname.includes('/guide/') || window.location.pathname.includes('/blog/');
    const p = isSubdir ? '../' : '';

    const dockContainer = document.createElement('div');
    dockContainer.className = 'static-dock-wrapper';
    
    const dockItems = [
        { name: 'Home', icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>', href: `${p}index.html` },
        { name: 'Guide', icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>', href: `${p}guide/stage1.html` },
        { name: 'Dashboard', icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>', href: `${p}profile.html` },
        { name: 'Search', icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>', href: `${p}resources.html` }
    ];

    const dockHtml = `
        <div class="static-dock">
            ${dockItems.map(item => `
                <a href="${item.href}" title="${item.name}" aria-label="${item.name}" class="mobile-dock-btn">
                    ${item.icon}
                    <span class="mobile-dock-dot"></span>
                </a>
            `).join('')}
        </div>
    `;

    dockContainer.innerHTML = dockHtml;
    document.body.appendChild(dockContainer);
});

