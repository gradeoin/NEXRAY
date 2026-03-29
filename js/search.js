(function() {
    const pages = [
        { title: "Home", url: "/index.html" },
        { title: "About", url: "/about.html" },
        { title: "Contact", url: "/contact.html" },
        { title: "Compiler", url: "/compiler.html" },
        { title: "How to Build a Website", url: "/how-to-build-a-website.html" },
        { title: "How to Design a Website", url: "/how-to-design-a-website.html" },
        { title: "Free Hosting 2026", url: "/free-website-hosting-2026.html" },
        { title: "HTML & CSS Cheat Sheet", url: "/html-css-cheat-sheet.html" },
        { title: "JavaScript Cheat Sheet", url: "/javascript-cheat-sheet-notes.html" },
        { title: "Learning Hub", url: "/learn-hub.html" },
        { title: "Stage 1: Basics", url: "/guide/stage1.html" },
        { title: "Stage 2: Styling", url: "/guide/stage2.html" },
        { title: "Stage 3: Logic", url: "/guide/stage3.html" },
        { title: "Stage 4: Backend", url: "/guide/stage4.html" },
        { title: "Stage 5: Deployment", url: "/guide/stage5.html" },
        { title: "Developer Tools", url: "/react-development-tools.html" },
        { title: "TypeScript Tutorial", url: "/learn-typescript-in-2026.html" },
        { title: "JavaScript Beginners", url: "/javascript-tutorial-for-beginners.html" }
    ];

    const searchOverlay = document.createElement('div');
    searchOverlay.id = 'nexray-search-overlay';
    Object.assign(searchOverlay.style, {
        position: 'fixed', top: '0', left: '0', width: '100%', height: '100%',
        background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)',
        zIndex: '100000', display: 'none', justifyContent: 'center', alignItems: 'flex-start',
        paddingTop: '10vh', transition: 'all 0.3s ease'
    });

    const searchCard = document.createElement('div');
    Object.assign(searchCard.style, {
        width: '90%', maxWidth: '600px', background: 'rgba(15, 23, 42, 0.95)',
        border: '1px solid rgba(0, 56, 255, 0.3)', borderRadius: '16px',
        padding: '24px', boxShadow: '0 20px 50px rgba(0,0,0,0.5)', position: 'relative'
    });

    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search Nexray... (Cmd/Ctrl + K)';
    Object.assign(searchInput.style, {
        width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '12px', padding: '16px 20px', color: '#fff', fontSize: '1.2rem',
        outline: 'none', transition: 'all 0.3s ease'
    });
    searchInput.focus();

    const resultsArea = document.createElement('div');
    Object.assign(resultsArea.style, {
        marginTop: '20px', maxHeight: '400px', overflowY: 'auto',
        display: 'flex', flexDirection: 'column', gap: '8px'
    });

    searchCard.appendChild(searchInput);
    searchCard.appendChild(resultsArea);
    searchOverlay.appendChild(searchCard);
    document.body.appendChild(searchOverlay);

    function toggleSearch(show) {
        searchOverlay.style.display = show ? 'flex' : 'none';
        if (show) setTimeout(() => searchInput.focus(), 50);
    }

    window.addEventListener('keydown', (e) => {
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
            e.preventDefault();
            toggleSearch(searchOverlay.style.display === 'none');
        }
        if (e.key === 'Escape') toggleSearch(false);
    });

    searchOverlay.onclick = (e) => { if (e.target === searchOverlay) toggleSearch(false); };

    searchInput.oninput = (e) => {
        const query = e.target.value.toLowerCase();
        resultsArea.innerHTML = '';
        if (query.length < 2) return;

        const matches = pages.filter(p => p.title.toLowerCase().includes(query));
        matches.forEach(m => {
            const row = document.createElement('a');
            row.href = m.url;
            row.innerHTML = `<span style="color:var(--brand);">📄</span> ${m.title}`;
            Object.assign(row.style, {
                padding: '12px 16px', borderRadius: '8px', background: 'rgba(255,255,255,0.03)',
                color: '#fff', textDecoration: 'none', fontSize: '1rem', transition: 'all 0.2s ease',
                border: '1px solid transparent'
            });
            row.onmouseenter = () => { row.style.background = 'rgba(255,255,255,0.08)'; row.style.borderColor = 'var(--brand)'; };
            row.onmouseleave = () => { row.style.background = 'rgba(255,255,255,0.03)'; row.style.borderColor = 'transparent'; };
            resultsArea.appendChild(row);
        });
    };
})();
