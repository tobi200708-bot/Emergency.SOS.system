/* =========================================
   FIREBASE CONFIGURATION
========================================= */

import { initializeApp }
    from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";

import {
    getAuth,
    onAuthStateChanged
}
    from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

import {
    getFirestore,
    collection,
    addDoc,
    serverTimestamp
}
    from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";


/* =========================================
   YOUR FIREBASE CONFIG
========================================= */

const firebaseConfig = {

    apiKey: "YOUR_API_KEY",

    authDomain:
        "YOUR_PROJECT.firebaseapp.com",

    projectId:
        "YOUR_PROJECT_ID",

    storageBucket:
        "YOUR_PROJECT.firebasestorage.app",

    messagingSenderId:
        "YOUR_MESSAGING_SENDER_ID",

    appId:
        "YOUR_APP_ID"

};


/* =========================================
   INITIALIZE FIREBASE
========================================= */

const app = initializeApp(firebaseConfig);


/* Firebase Authentication */

const auth = getAuth(app);


/* Firestore Database */

const db = getFirestore(app);


/* =========================================
   AUTH STATE
========================================= */

let currentUser = null;


onAuthStateChanged(auth, (user) => {

    currentUser = user;

    window.firebaseUser = user;

    if (user) {

        console.log(
            "Logged in:",
            user.email
        );

    } else {

        console.log(
            "No user logged in."
        );

    }

});


/* =========================================
   EXPOSE FIREBASE SERVICES
========================================= */

window.firebaseDB = db;

window.firebaseAuth = auth;

window.firebaseFunctions = {

    collection,

    addDoc,

    serverTimestamp

};
/* =========================================
   FIREBASE IMPORTS
========================================= */

import {
    initializeApp
}
from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";


import {
    getAuth,
    onAuthStateChanged
}
from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";


import {
    getFirestore,
    collection,
    addDoc,
    serverTimestamp
}
from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";


/* =========================================
   FIREBASE CONFIG
========================================= */

constfirebaseConfig = {

    apiKey:
        "YOUR_API_KEY",

    authDomain:
        "YOUR_PROJECT.firebaseapp.com",

    projectId:
        "YOUR_PROJECT_ID",

    storageBucket:
        "YOUR_PROJECT.firebasestorage.app",

    messagingSenderId:
        "YOUR_MESSAGING_SENDER_ID",

    appId:
        "YOUR_APP_ID"

};


/* =========================================
   INITIALIZE FIREBASE
========================================= */

constapp =
    initializeApp(firebaseConfig);


/* =========================================
   AUTHENTICATION
========================================= */

constauth =
    getAuth(app);


/* =========================================
   FIRESTORE
========================================= */

constdb =
    getFirestore(app);


/* =========================================
   CURRENT USER
========================================= */

letcurrentUser = null;


onAuthStateChanged(
    auth,
    (user) => {

        currentUser = user;

        window.firebaseUser =
            user;

        if (user) {

            console.log(
                "User logged in:",
                user.email
            );

        } else {

            console.log(
                "No authenticated user."
            );

        }

    }
);


/* =========================================
   MAKE FIREBASE AVAILABLE
========================================= */

window.firebaseDB =
    db;


window.firebaseAuth =
    auth;


window.firebaseFunctions = {

    collection,

    addDoc,

    serverTimestamp

};
/* =========================================
   FIREBASE
========================================= */

import {
    initializeApp
}
from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";


import {
    getAuth,
    onAuthStateChanged
}
from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";


import {
    getFirestore,
    collection,
    addDoc,
    serverTimestamp
}
from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";


/* =========================================
   CONFIGURATION
========================================= */

constfirebaseConfig = {

    apiKey:
        "YOUR_API_KEY",

    authDomain:
        "YOUR_PROJECT.firebaseapp.com",

    projectId:
        "YOUR_PROJECT_ID",

    storageBucket:
        "YOUR_PROJECT.firebasestorage.app",

    messagingSenderId:
        "YOUR_MESSAGING_SENDER_ID",

    appId:
        "YOUR_APP_ID"

};


/* =========================================
   INITIALIZE
========================================= */

constapp =
    initializeApp(firebaseConfig);

/* =========================================
   AUTH
========================================= */

constauth =
    getAuth(app);


/* =========================================
   FIRESTORE
========================================= */

constdb =
    getFirestore(app);


/* =========================================
   USER STATE
========================================= */

letcurrentUser = null;


onAuthStateChanged(
    auth,
    (user) => {

        currentUser = user;

        window.firebaseUser =
            user;

    }
);


/* =========================================
   GLOBAL FIREBASE OBJECTS
========================================= */

window.firebaseDB =
    db;


window.firebaseAuth =
    auth;


window.firebaseFunctions = {

    collection,

    addDoc,

    serverTimestamp

};
/* =========================
   FIREBASE CONFIGURATION
========================= */

import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";


import {
    getAuth,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";


import {
    getFirestore,
    collection,
    addDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";


/* -------------------------
   Firebase Configuration
------------------------- */

constfirebaseConfig = {

    apiKey:
        "YOUR_API_KEY",

    authDomain:
        "YOUR_PROJECT.firebaseapp.com",

    projectId:
        "YOUR_PROJECT_ID",

    storageBucket:
        "YOUR_PROJECT.firebasestorage.app",

    messagingSenderId:
        "YOUR_MESSAGING_SENDER_ID",

    appId:
        "YOUR_APP_ID"
};


/* -------------------------
   Initialize Firebase
------------------------- */

constapp =
    initializeApp(firebaseConfig);


/* -------------------------
   Authentication
------------------------- */

constauth =
    getAuth(app);


/* -------------------------
   Firestore
------------------------- */

constdb =
    getFirestore(app);


/* -------------------------
   Make Firebase Available
   To Other JavaScript Files
------------------------- */

window.firebaseDB = db;

window.firebaseAuth = auth;

window.firebaseFunctions = {

    collection,
    addDoc,
    serverTimestamp

};


/* -------------------------
   Authentication State
------------------------- */

onAuthStateChanged(
    auth,
    (user) => {

        if (user) {

            window.firebaseUser = user;

            console.log(
                "User logged in:",
                user.uid
            );

        } else {

            window.firebaseUser = null;

            console.log(
                "No authenticated user."
            );

        }

    }
);
/* =========================================
   FIREBASE CONFIGURATION
========================================= */

import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";


import {
    getAuth,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";


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
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";


/* =========================================
   FIREBASE CONFIG
========================================= */

constfirebaseConfig = {

    apiKey:
        "YOUR_API_KEY",

    authDomain:
        "YOUR_PROJECT.firebaseapp.com",

    projectId:
        "YOUR_PROJECT_ID",

    storageBucket:
        "YOUR_PROJECT.firebasestorage.app",

    messagingSenderId:
        "YOUR_MESSAGING_SENDER_ID",

    appId:
        "YOUR_APP_ID"

};


/* =========================================
   INITIALIZE FIREBASE
========================================= */

constapp =
    initializeApp(firebaseConfig);


/* =========================================
   AUTH
========================================= */

constauth =
    getAuth(app);


/* =========================================
   FIRESTORE
========================================= */

constdb =
    getFirestore(app);


/* =========================================
   GLOBAL FIREBASE OBJECTS
========================================= */

window.firebaseDB = db;

window.firebaseAuth = auth;

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


/* =========================================
   AUTH STATE
========================================= */

onAuthStateChanged(
    auth,
    (user) => {

        if (user) {

            window.firebaseUser = user;

            console.log(
                "Authenticated user:",
                user.uid
            );

        } else {

            window.firebaseUser = null;

            console.log(
                "No authenticated user."
            );

        }

    }
);
/* =====================================
   FIREBASE CONFIGURATION
===================================== */

import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";

import {
    getAuth,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

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
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";


/* =====================================
   FIREBASE CONFIG
===================================== */

constfirebaseConfig = {

    apiKey:
        "YOUR_API_KEY",

    authDomain:
        "YOUR_PROJECT.firebaseapp.com",

    projectId:
        "YOUR_PROJECT_ID",

    storageBucket:
        "YOUR_PROJECT.firebasestorage.app",

    messagingSenderId:
        "YOUR_MESSAGING_SENDER_ID",

    appId:
        "YOUR_APP_ID"
};


/* =====================================
   INITIALIZE FIREBASE
===================================== */

constapp =
    initializeApp(firebaseConfig);

constauth =
    getAuth(app);

constdb =
    getFirestore(app);


/* =====================================
   AUTHENTICATION STATE
===================================== */

onAuthStateChanged(auth, (user) => {

    window.firebaseUser =
        user || null;

});


/* =====================================
   GLOBAL FIREBASE ACCESS
===================================== */

window.firebaseDB = db;

window.firebaseAuth = auth;

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
/* =========================================
   FIREBASE CONFIGURATION
========================================= */

import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";


import {
    getAuth,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";


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
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";


/* =========================================
   FIREBASE CONFIG
========================================= */

constfirebaseConfig = {

    apiKey:
        "YOUR_API_KEY",

    authDomain:
        "YOUR_PROJECT.firebaseapp.com",

    projectId:
        "YOUR_PROJECT_ID",

    storageBucket:
        "YOUR_PROJECT.firebasestorage.app",

    messagingSenderId:
        "YOUR_MESSAGING_SENDER_ID",

    appId:
        "YOUR_APP_ID"

};


/* =========================================
   INITIALIZE FIREBASE
========================================= */

constapp =
    initializeApp(firebaseConfig);


constauth =
    getAuth(app);


constdb =
    getFirestore(app);


/* =========================================
   AUTH STATE
========================================= */

onAuthStateChanged(
    auth,
    (user) => {

        window.firebaseUser =
            user || null;

    }
);


/* =========================================
   GLOBAL FIREBASE OBJECTS
========================================= */

window.firebaseDB =
    db;


window.firebaseAuth =
    auth;


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
/* =========================================
   FIREBASE CONFIGURATION
========================================= */

import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";


import {
    getAuth,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";


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
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";


/* =========================================
   FIREBASE CONFIG
========================================= */

constfirebaseConfig = {

    apiKey:
        "YOUR_API_KEY",

    authDomain:
        "YOUR_PROJECT.firebaseapp.com",

    projectId:
        "YOUR_PROJECT_ID",

    storageBucket:
        "YOUR_PROJECT.firebasestorage.app",

    messagingSenderId:
        "YOUR_MESSAGING_SENDER_ID",

    appId:
        "YOUR_APP_ID"

};


/* =========================================
   INITIALIZE FIREBASE
========================================= */

constapp =
    initializeApp(firebaseConfig);

constauth =
    getAuth(app);

constdb =
    getFirestore(app);


/* =========================================
   AUTH STATE
========================================= */

onAuthStateChanged(
    auth,
    (user) => {

        window.firebaseUser =
            user || null;

    }
);


/* =========================================
   GLOBAL FIREBASE ACCESS
========================================= */

window.firebaseDB =
    db;

window.firebaseAuth =
    auth;

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
/* =========================
   FIREBASE CONFIGURATION
========================= */

import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";

import {
    getAuth,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

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
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";


/* =========================
   YOUR FIREBASE CONFIG
========================= */

constfirebaseConfig = {

    apiKey: "YOUR_API_KEY",

    authDomain:
        "YOUR_PROJECT.firebaseapp.com",

    projectId:
        "YOUR_PROJECT_ID",

    storageBucket:
        "YOUR_PROJECT.firebasestorage.app",

    messagingSenderId:
        "YOUR_MESSAGING_SENDER_ID",

    appId:
        "YOUR_APP_ID"
};


/* =========================
   INITIALIZE FIREBASE
========================= */

constapp =
    initializeApp(firebaseConfig);

constauth =
    getAuth(app);

constdb =
    getFirestore(app);


/* =========================
   AUTH STATE
========================= */

onAuthStateChanged(
    auth,
    (user) => {

        window.firebaseUser =
            user || null;

    }
);


/* =========================
   GLOBAL FIREBASE ACCESS
========================= */

window.firebaseDB = db;

window.firebaseAuth = auth;

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
/* =========================
   FIREBASE.JS
========================= */

import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";

import {
    getAuth,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

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
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";


/* =========================
   FIREBASE CONFIG
========================= */

constfirebaseConfig = {

    apiKey: "YOUR_API_KEY",

    authDomain:
        "YOUR_PROJECT.firebaseapp.com",

    projectId:
        "YOUR_PROJECT_ID",

    storageBucket:
        "YOUR_PROJECT.firebasestorage.app",

    messagingSenderId:
        "YOUR_MESSAGING_SENDER_ID",

    appId:
        "YOUR_APP_ID"
};


/* =========================
   INITIALIZE
========================= */

constapp =
    initializeApp(firebaseConfig);

constauth =
    getAuth(app);

constdb =
    getFirestore(app);


/* =========================
   AUTH STATE
========================= */

onAuthStateChanged(
    auth,
    (user) => {

        window.firebaseUser =
            user || null;

    }
);


/* =========================
   GLOBAL FIREBASE OBJECT
========================= */

window.firebaseDB = db;

window.firebaseAuth = auth;

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
/* =========================
   FIREBASE.JS
========================= */

import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";

import {
    getAuth,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

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
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";


/* =========================
   FIREBASE CONFIG
========================= */

constfirebaseConfig = {

    apiKey: "YOUR_API_KEY",

    authDomain:
        "YOUR_PROJECT.firebaseapp.com",

    projectId:
        "YOUR_PROJECT_ID",

    storageBucket:
        "YOUR_PROJECT.firebasestorage.app",

    messagingSenderId:
        "YOUR_MESSAGING_SENDER_ID",

    appId:
        "YOUR_APP_ID"
};


/* =========================
   INITIALIZE FIREBASE
========================= */

constapp =
    initializeApp(firebaseConfig);

constauth =
    getAuth(app);

constdb =
    getFirestore(app);


/* =========================
   AUTH STATE
========================= */

onAuthStateChanged(
    auth,
    (user) => {

        window.firebaseUser =
            user || null;

    }
);


/* =========================
   GLOBAL FIREBASE FUNCTIONS
========================= */

window.firebaseDB = db;

window.firebaseAuth = auth;

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
/* =========================================
   FIREBASE.JS
========================================= */

import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";

import {
    getAuth,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

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
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";


/* =========================================
   FIREBASE CONFIG
========================================= */

constfirebaseConfig = {

    apiKey: "YOUR_API_KEY",

    authDomain:
        "YOUR_PROJECT.firebaseapp.com",

    projectId:
        "YOUR_PROJECT_ID",

    storageBucket:
        "YOUR_PROJECT.firebasestorage.app",

    messagingSenderId:
        "YOUR_MESSAGING_SENDER_ID",

    appId:
        "YOUR_APP_ID"
};


/* =========================================
   INITIALIZE FIREBASE
========================================= */

constapp =
    initializeApp(firebaseConfig);

constauth =
    getAuth(app);

constdb =
    getFirestore(app);


/* =========================================
   AUTH STATE
========================================= */

onAuthStateChanged(
    auth,
    (user) => {

        window.firebaseUser =
            user || null;

    }
);


/* =========================================
   GLOBAL FIREBASE ACCESS
========================================= */

window.firebaseDB = db;

window.firebaseAuth = auth;

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
/* =========================================
   FIREBASE.JS
========================================= */

import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";

import {
    getAuth,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

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
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";


/* =========================================
   FIREBASE CONFIG
========================================= */

constfirebaseConfig = {

    apiKey: "YOUR_API_KEY",

    authDomain:
        "YOUR_PROJECT.firebaseapp.com",

    projectId:
        "YOUR_PROJECT_ID",

    storageBucket:
        "YOUR_PROJECT.firebasestorage.app",

    messagingSenderId:
        "YOUR_MESSAGING_SENDER_ID",

    appId:
        "YOUR_APP_ID"
};


/* =========================================
   INITIALIZE
========================================= */

constapp =
    initializeApp(firebaseConfig);

constauth =
    getAuth(app);

constdb =
    getFirestore(app);


/* =========================================
   AUTH STATE
========================================= */

onAuthStateChanged(
    auth,
    (user) => {

        window.firebaseUser =
            user || null;

    }
);


/* =========================================
   GLOBAL FIREBASE FUNCTIONS
========================================= */

window.firebaseDB = db;

window.firebaseAuth = auth;

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
/* =========================================
   FIREBASE.JS
========================================= */

import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";

import {
    getAuth,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

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
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";


/* =========================================
   FIREBASE CONFIG
========================================= */

constfirebaseConfig = {

    apiKey: "YOUR_API_KEY",

    authDomain:
        "YOUR_PROJECT.firebaseapp.com",

    projectId:
        "YOUR_PROJECT_ID",

    storageBucket:
        "YOUR_PROJECT.firebasestorage.app",

    messagingSenderId:
        "YOUR_MESSAGING_SENDER_ID",

    appId:
        "YOUR_APP_ID"

};


/* =========================================
   INITIALIZE FIREBASE
========================================= */

constapp =
    initializeApp(firebaseConfig);

constauth =
    getAuth(app);

constdb =
    getFirestore(app);


/* =========================================
   AUTH STATE
========================================= */

onAuthStateChanged(
    auth,
    (user) => {

        window.firebaseUser =
            user || null;

    }
);


/* =========================================
   GLOBAL FIREBASE FUNCTIONS
========================================= */

window.firebaseDB = db;

window.firebaseAuth = auth;

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
/* =====================================
   FIREBASE CONFIGURATION
===================================== */

import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";

import {
    getAuth,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

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
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";


/* =====================================
   YOUR FIREBASE PROJECT CONFIG
===================================== */

constfirebaseConfig = {

    apiKey: "YOUR_API_KEY",

    authDomain:
        "YOUR_PROJECT.firebaseapp.com",

    projectId:
        "YOUR_PROJECT_ID",

    storageBucket:
        "YOUR_PROJECT.firebasestorage.app",

    messagingSenderId:
        "YOUR_MESSAGING_SENDER_ID",

    appId:
        "YOUR_APP_ID"
};


/* =====================================
   INITIALIZE FIREBASE
===================================== */

constapp =
    initializeApp(firebaseConfig);


/* =====================================
   AUTHENTICATION
===================================== */

constauth =
    getAuth(app);


/* =====================================
   FIRESTORE
===================================== */

constdb =
    getFirestore(app);


/* =====================================
   AUTH STATE
===================================== */

onAuthStateChanged(
    auth,
    user => {

        window.firebaseUser =
            user || null;

    }
);


/* =====================================
   GLOBAL FIREBASE ACCESS
===================================== */

window.firebaseDB = db;

window.firebaseAuth = auth;

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
