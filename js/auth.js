/* ============================================================
   NEXRAY — auth.js (Mockup Version)
   Shared Local Auth Logic & Session Management
   ============================================================ */

export const logout = async () => {
    localStorage.removeItem('nexray_user');
    window.dispatchEvent(new CustomEvent('auth-state-changed', { detail: null }));
    window.location.href = 'index.html';
};

// Dispatch initial state so listeners (like main.js) can update the UI
window.setTimeout(() => {
    const userStr = localStorage.getItem('nexray_user');
    if (userStr) {
        window.dispatchEvent(new CustomEvent('auth-state-changed', { detail: JSON.parse(userStr) }));
    }
}, 0);
