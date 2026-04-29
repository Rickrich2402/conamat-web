// app/utils.js
import { db } from './firebase-config.js';
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// Obtener datos del usuario desde Firestore
export async function getUserData(uid) {
  const snap = await getDoc(doc(db, 'users', uid));
  return snap.exists() ? snap.data() : null;
}

// Redirigir según rol
export function redirectByRole(role) {
  const routes = {
    admin:    '/admin/',
    profesor: '/profesor/',
    alumno:   '/alumno/'
  };
  window.location.href = routes[role] || '/login/';
}

// Proteger página — si no hay sesión, manda al login
export async function requireAuth(allowedRoles = []) {
  return new Promise((resolve) => {
    import('./firebase-config.js').then(({ auth }) => {
      import("https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js").then(({ onAuthStateChanged }) => {
        onAuthStateChanged(auth, async (user) => {
          if (!user) {
            window.location.href = '/login/';
            return;
          }
          const data = await getUserData(user.uid);
          if (!data) { window.location.href = '/login/'; return; }
          if (allowedRoles.length && !allowedRoles.includes(data.role)) {
            redirectByRole(data.role);
            return;
          }
          resolve({ user, userData: data });
        });
      });
    });
  });
}

// Formatear fecha legible
export function formatDate(ts) {
  if (!ts) return '—';
  const d = ts.toDate ? ts.toDate() : new Date(ts);
  return d.toLocaleDateString('es-MX', { year:'numeric', month:'short', day:'numeric' });
}

// Generar código único de 6 caracteres para clases
export function generateCode() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

// Mostrar toast/notificación
export function showToast(msg, type = 'success') {
  const colors = { success:'#1648a0', error:'#e63946', warning:'#e88a00', info:'#2d7dd2' };
  const toast = document.createElement('div');
  toast.style.cssText = `
    position:fixed; bottom:24px; right:24px; z-index:99999;
    background:${colors[type]}; color:white;
    padding:14px 22px; border-radius:10px;
    font-family:'Barlow',sans-serif; font-weight:600;
    font-size:.93rem; box-shadow:0 6px 24px rgba(0,0,0,0.2);
    transform:translateY(80px); opacity:0;
    transition:all .35s cubic-bezier(.34,1.56,.64,1);
    max-width:320px; line-height:1.4;
  `;
  toast.textContent = msg;
  document.body.appendChild(toast);
  setTimeout(() => { toast.style.transform = 'translateY(0)'; toast.style.opacity = '1'; }, 10);
  setTimeout(() => {
    toast.style.transform = 'translateY(80px)'; toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}
