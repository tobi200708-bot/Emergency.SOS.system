// =====================================================
// FIREBASE.JS
// Emergency SOS Cloud System
// =====================================================

// Firebase App
import { initializeApp } from
    "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";

// Firebase Authentication
import {
    getAuth,
    onAuthStateChanged
} from
    "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

// Firestore
import {
    getFirestore,
    collection,
    addDoc,
    serverTimestamp,
    query,
    where,
    orderBy,
    limit,
    onSnapshot
} from
    "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";


// =====================================================
// FIREBASE CONFIGURATION
// =====================================================

    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
apiKey: "AIzaSyBTGjmpUk_21vRazMncTdNGd1g0r1l20Bg",
authDomain: "emergency-sos-system-2717b.firebaseapp.com",
projectId: "emergency-sos-system-2717b",
storageBucket: "emergency-sos-system-2717b.firebasestorage.app",
messagingSenderId: "831859323537",
appId: "1:831859323537:web:8627060a5cda348fd48530",
measurementId: "G-FXQ7W4Z1Z3"
};


// =====================================================
// INITIALIZE FIREBASE
// =====================================================

const app = initializeApp(firebaseConfig);


// =====================================================
// INITIALIZE AUTHENTICATION
// =====================================================

const auth = getAuth(app);


// =====================================================
// INITIALIZE FIRESTORE
// =====================================================

const db = getFirestore(app);


// =====================================================
// CURRENT USER
// =====================================================

let currentUser = null;


// =====================================================
// AUTH STATE LISTENER
// =====================================================

onAuthStateChanged(auth, (user) => {

    currentUser = user;

    // Make current user available to script.js
    window.firebaseUser = user;

    if (user) {

        console.log(
            "Firebase user logged in:",
            user.uid
        );

    } else {

        console.log(
            "No Firebase user logged in."
        );

    }

});


// =====================================================
// EXPOSE FIREBASE DATABASE
// =====================================================

window.firebaseDB = db;


// =====================================================
// EXPOSE FIREBASE AUTH
// =====================================================

window.firebaseAuth = auth;


// =====================================================
// EXPOSE FIRESTORE FUNCTIONS
// =====================================================

window.firebaseFunctions = {

    collection,
    addDoc,
    serverTimestamp,

    query,
    where,
    orderBy,
    limit,
    onSnapshot

};


// =====================================================
// FIREBASE READY MESSAGE
// =====================================================

console.log(
    "🔥 Firebase initialized successfully"
);

console.log(
    "☁ Firestore connected"
);

console.log(
    "🔐 Authentication initialized"
);
