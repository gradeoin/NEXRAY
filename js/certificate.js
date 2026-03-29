/**
 * Nexray Certificate Generator Let the user download their achievement
 */
function generateCertificate(userName) {
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 800;
    const ctx = canvas.getContext('2d');

    // Background Gradient (Dark Theme)
    const gradient = ctx.createLinearGradient(0, 0, 1200, 800);
    gradient.addColorStop(0, '#09090f');
    gradient.addColorStop(1, '#1A1A24');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1200, 800);

    // Decorative Borders
    ctx.strokeStyle = '#0038FF';
    ctx.lineWidth = 4;
    ctx.strokeRect(40, 40, 1120, 720);
    ctx.strokeStyle = 'rgba(249, 115, 22, 0.3)';
    ctx.lineWidth = 1;
    ctx.strokeRect(50, 50, 1100, 700);

    // Header Text
    ctx.fillStyle = '#0038FF';
    ctx.font = 'bold 32px "Space Grotesk", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('NEXRAY.IN OFFICIAL CERTIFICATION', 600, 150);

    // Main Title
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 72px "Space Grotesk", sans-serif';
    ctx.fillText('CERTIFICATE OF', 600, 260);
    ctx.fillText('COMPLETION', 600, 340);

    // Subtitle
    ctx.fillStyle = '#94a3b8';
    ctx.font = '24px "Inter", sans-serif';
    ctx.fillText('This fully verifies that the student named below', 600, 420);

    // Name Line
    ctx.fillStyle = '#ffffff';
    ctx.font = 'italic 56px "Georgia", serif';
    ctx.fillText(userName || 'Nexray Learner', 600, 520);
    
    // Underline
    ctx.beginPath();
    ctx.moveTo(300, 540);
    ctx.lineTo(900, 540);
    ctx.strokeStyle = '#0038FF';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Body Text
    ctx.fillStyle = '#94a3b8';
    ctx.font = '20px "Inter", sans-serif';
    ctx.fillText('has successfully completed the 7-Stage Full-Stack Web Development', 600, 600);
    ctx.fillText('Masterclass, demonstrating proficiency in HTML, CSS, JS, Backend & DevOps.', 600, 630);

    // Date and Signatures
    ctx.font = '16px "Inter", sans-serif';
    ctx.fillStyle = '#ffffff';
    const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    ctx.fillText('Date: ' + date, 300, 700);
    ctx.fillText('Authorized By: Nexray Platform', 900, 700);

    // Trigger Download
    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = 'Nexray_Certificate.png';
    link.href = dataUrl;
    link.click();
}

// Expose globally
window.generateCertificate = generateCertificate;
