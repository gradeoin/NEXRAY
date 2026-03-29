/* ============================================================
   NEXRAY — auth.js
   Shared Firebase Auth Logic & Session Management
   ============================================================ */
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js';
import { getAuth, onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js';

const firebaseConfig = {
  apiKey: "AIzaSyBzM68THLIm9Njdps5XMcvkdnzzvL3l7EQ",
  authDomain: "nexray-d66fb.firebaseapp.com",
  projectId: "nexray-d66fb",
  storageBucket: "nexray-d66fb.firebasestorage.app",
  messagingSenderId: "714253399201",
  appId: "1:714253399201:web:77679145c51f0243b92ce0",
  measurementId: "G-4Q8W67SGYB"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Global State Observer
onAuthStateChanged(auth, (user) => {
  if (user) {
    const userData = {
      uid: user.uid,
      displayName: user.displayName || user.email.split('@')[0],
      photoURL: user.photoURL || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80',
      email: user.email,
      loggedIn: true
    };
    localStorage.setItem('nexray_user', JSON.stringify(userData));
    // Trigger event for main.js to update UI
    window.dispatchEvent(new CustomEvent('auth-state-changed', { detail: userData }));
  } else {
    localStorage.removeItem('nexray_user');
    window.dispatchEvent(new CustomEvent('auth-state-changed', { detail: null }));
  }
});

export const logout = async () => {
    await signOut(auth);
    localStorage.removeItem('nexray_user');
    window.location.href = 'index.html';
};

export { auth };
