// app/auth.js
import { auth, db } from './firebase-config.js';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { doc, setDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getUserData, redirectByRole, showToast } from './utils.js';

// ── REGISTRO DE NUEVO USUARIO ──
export async function registerUser({ email, password, nombre, apellido, edad, role = 'alumno' }) {
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  await setDoc(doc(db, 'users', cred.user.uid), {
    uid:       cred.user.uid,
    email,
    nombre,
    apellido,
    edad:      parseInt(edad) || null,
    role,
    activo:    true,
    createdAt: serverTimestamp(),
    clases:    []
  });
  return cred.user;
}

// ── LOGIN ──
export async function loginUser(email, password) {
  const cred = await signInWithEmailAndPassword(auth, email, password);
  const data = await getUserData(cred.user.uid);
  if (!data?.activo) {
    await signOut(auth);
    throw new Error('Tu cuenta está desactivada. Contacta al administrador.');
  }
  return { user: cred.user, userData: data };
}

// ── LOGOUT ──
export async function logoutUser() {
  await signOut(auth);
  window.location.href = '/login/';
}

// ── RESET PASSWORD ──
export async function resetPassword(email) {
  await sendPasswordResetEmail(auth, email);
}

// ── OBSERVER (estado de sesión) ──
export function watchAuth(callback) {
  return onAuthStateChanged(auth, callback);
}
