/* ============================================================
   NEXRAY — auth.js (Firebase Native Version)
   Shared Shared Firebase Auth Logic & Session Management
   ============================================================ */
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js';
import { getAuth, GoogleAuthProvider, signInWithRedirect, getRedirectResult, onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js';

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
const googleProvider = new GoogleAuthProvider();

onAuthStateChanged(auth, (user) => {
  if (user) {
    const userData = {
      uid: user.uid,
      displayName: user.displayName || user.email.split('@')[0],
      photoURL: user.photoURL || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80',
      email: user.email,
      loggedIn: true,
      provider: 'google'
    };
    localStorage.setItem('nexray_user', JSON.stringify(userData));
    window.dispatchEvent(new CustomEvent('auth-state-changed', { detail: userData }));
  } else {
    // Only clear if the current local user was specifically from Google, preserving local test data.
    const currentUser = JSON.parse(localStorage.getItem('nexray_user') || '{}');
    if (currentUser.provider === 'google') {
       localStorage.removeItem('nexray_user');
       window.dispatchEvent(new CustomEvent('auth-state-changed', { detail: null }));
    }
  }
});

// Automatically handle redirect results from Google
getRedirectResult(auth)
  .then((result) => {
    if (result && result.user) {
      window.location.href = 'profile.html';
    }
  })
  .catch((error) => console.error("Redirect Error:", error));

export const performGoogleSignIn = () => {
    signInWithRedirect(auth, googleProvider);
};

export const logout = async () => {
    const currentUser = JSON.parse(localStorage.getItem('nexray_user') || '{}');
    if (currentUser.provider === 'google') {
        await signOut(auth);
    } else {
        localStorage.removeItem('nexray_user');
        window.dispatchEvent(new CustomEvent('auth-state-changed', { detail: null }));
        window.location.href = 'index.html';
    }
};

window.setTimeout(() => {
    const userStr = localStorage.getItem('nexray_user');
    if (userStr) window.dispatchEvent(new CustomEvent('auth-state-changed', { detail: JSON.parse(userStr) }));
}, 0);
