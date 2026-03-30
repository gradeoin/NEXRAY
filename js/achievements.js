/**
 * Nexray Achievements & Completion Engine
 * - Stage Completion with Confetti
 * - Easter Egg Badge System
 * - LocalStorage Progress Persistence
 */

(function() {
    console.log("🎮 Nexray Logic Engine Starting...");

    // 1. Initial State
    const STORAGE_KEY = 'nexray_progress';
    const ACHIEVEMENTS_KEY = 'nexray_achievements';
    const EGG_COUNT = 12; // Matching mascot.js scatter

    let progress = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    let achievements = JSON.parse(localStorage.getItem(ACHIEVEMENTS_KEY) || '[]');

    // 2. Confetti Factory
    function launchConfetti() {
        if (typeof confetti === 'function') {
            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#0038FF', '#CCFF00', '#ffffff']
            });
        } else {
            console.warn("Confetti not loaded, drawing fallback...");
        }
    }

    // 3. Mark Stage as Complete
    window.completeNexrayStage = function(id) {
        progress[`stage${id}`] = { 
            status: 'completed', 
            completedAt: new Date().toISOString() 
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
        
        launchConfetti();
        
        // Show success notification
        const toast = document.createElement('div');
        toast.style = `
            position: fixed; top: 20px; left: 50%; transform: translateX(-50%);
            background: #0038FF; color: white; padding: 16px 32px; border-radius: 99px;
            font-family: 'Space Grotesk', sans-serif; font-weight: 800; z-index: 2200000000;
            box-shadow: 0 10px 30px rgba(0,56,255,0.4); border: 2px solid white;
            animation: bounceIn-nex 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        `;
        toast.innerHTML = `🎉 Stage ${id} Complete! +250 XP earned`;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(-50%) translateY(-20px)';
            toast.style.transition = 'all 0.5s ease';
            setTimeout(() => toast.remove(), 500);
        }, 3000);
    };

    // 4. Achievement Unlocker
    window.unlockNexrayAchievement = function(id, icon, name) {
        if (achievements.find(a => a.id === id)) return;
        
        achievements.push({ id, icon, name, unlockedAt: new Date().toISOString() });
        localStorage.setItem(ACHIEVEMENTS_KEY, JSON.stringify(achievements));
        
        // Visual Feedback
        const slot = document.createElement('div');
        slot.style = `
            position: fixed; bottom: 120px; left: 30px;
            background: rgba(255,255,255,0.9); border: 1px solid #0038FF;
            padding: 10px 15px; border-radius: 12px; display: flex; align-items: center; gap: 10px;
            font-family: sans-serif; font-size: 0.8rem; z-index: 2200000000;
            animation: slideIn-nex 0.4s ease-out;
        `;
        slot.innerHTML = `<span style="font-size:1.4rem;">🏆</span> <div><strong>Badge Earned!</strong><br>${name}</div>`;
        document.body.appendChild(slot);
        
        setTimeout(() => slot.remove(), 4000);
    };

    // 5. Global CSS animations for logic UI
    const logicStyle = document.createElement('style');
    logicStyle.textContent = `
        @keyframes bounceIn-nex {
            0% { transform: translateX(-50%) scale(0.3); opacity: 0; }
            50% { transform: translateX(-50%) scale(1.05); }
            70% { transform: translateX(-50%) scale(0.9); }
            100% { transform: translateX(-50%) scale(1); opacity: 1; }
        }
        @keyframes slideIn-nex {
            from { transform: translateX(-100%) rotate(-10deg); opacity: 0; }
            to { transform: translateX(0) rotate(0); opacity: 1; }
        }
    `;
    document.head.appendChild(logicStyle);

    // 6. Hook into Mascot's Easter Eggs if they exist
    function hookEggs() {
        const eggs = document.querySelectorAll('.nexray-egg');
        if (eggs.length > 0) {
            eggs.forEach((egg, idx) => {
                egg.addEventListener('click', () => {
                   window.unlockNexrayAchievement(`egg-${idx}`, egg.innerText, 'Secret Hunter');
                });
            });
        }
    }

    // Periodic check for eggs since they are injected via mascot.js
    setInterval(hookEggs, 2000);

})();
