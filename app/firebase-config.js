// app/firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth }       from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
import { getFirestore }  from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";
import { getStorage }    from "https://www.gstatic.com/firebasejs/10.10.0/firebase-storage.js";

const firebaseConfig = {
  apiKey:            "AIzaSyCpe3K0RmZTcqmaH2O8SdWFE15-1CMkjK4",
  authDomain:        "conamat-chimalhuacan.firebaseapp.com",
  projectId:         "conamat-chimalhuacan",
  storageBucket:     "conamat-chimalhuacan.firebasestorage.app",
  messagingSenderId: "769823648865",
  appId:             "1:769823648865:web:5b8bc296ed8921efb4ce20"
};

const app       = initializeApp(firebaseConfig);
export const auth    = getAuth(app);
export const db      = getFirestore(app);
export const storage = getStorage(app);