const fs = require('fs');

// Inject JS and logic to profile
let profile = fs.readFileSync('profile.html', 'utf8');
if (!profile.includes('certificate.js')) {
    profile = profile.replace('</body>', `
<script src="js/certificate.js"></script>
<script>
    function downloadMyCertificate() {
        const u = Nexray && Nexray.Auth && Nexray.Auth.currentUser();
        const n = u ? u.displayName : 'Student';
        window.generateCertificate(n);
    }
</script>
</body>`);
    fs.writeFileSync('profile.html', profile);
}

// Inject to stage7
let stage7 = fs.readFileSync('guide/stage7.html', 'utf8');
if (!stage7.includes('certificate.js')) {
    
    // Add a button in the stage hero or at the end
    const lastSectionRegex = /(<div class="stage-nav".*?>)/s;
    const certHTML = `
    <div class="glass-card text-center animate-pulse-glow" style="margin: 4rem 0; padding: 3rem 1.5rem; background: rgba(249,115,22,0.05); border: 2px solid var(--brand);">
       <h2 style="font-size: 2rem; font-weight: 900; color: var(--brand); margin-bottom: 1rem;">Congratulations! You reached the end.</h2>
       <p style="color: var(--text-2); margin-bottom: 2rem;">You have successfully completed the 7 stages of the Nexray Web Development Masterclass.</p>
       <button onclick="downloadMyCertificate()" class="btn btn-primary" style="font-size: 1.1rem; padding: 14px 28px;">
         🏆 Generate Verified Certificate
       </button>
    </div>
    $1`;

    stage7 = stage7.replace(lastSectionRegex, certHTML);
    stage7 = stage7.replace('</body>', `
<script src="../js/certificate.js"></script>
<script>
    function downloadMyCertificate() {
        // Try getting user from localStorage
        let n = 'Student';
        try {
            const data = JSON.parse(localStorage.getItem('nexray_user'));
            if (data && data.displayName) n = data.displayName;
        } catch(e) {}
        window.generateCertificate(n);
    }
</script>
</body>`);

    fs.writeFileSync('guide/stage7.html', stage7);
}

console.log('Certificate logic injected into profile and stage7!');
