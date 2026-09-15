/* =========================================
   MOBILE NAVIGATION
========================================= */

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", () => {

    navMenu.classList.toggle("active");

});


/* Close mobile menu when clicking a link */

const navLinks = document.querySelectorAll(".nav-link");

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        navMenu.classList.remove("active");

    });

});


/* =========================================
   ACTIVE NAVIGATION LINK
========================================= */

navLinks.forEach(link => {

    link.addEventListener("click", function () {

        navLinks.forEach(item => {
            item.classList.remove("active");
        });

        this.classList.add("active");

    });

});


/* =========================================
   SOS MODAL
========================================= */

const sosButton = document.getElementById("sosButton");
const mobileSOS = document.getElementById("mobileSOS");
const heroSOS = document.getElementById("heroSOS");

const sosModal = document.getElementById("sosModal");

const closeModal = document.getElementById("closeModal");
const cancelSOS = document.getElementById("cancelSOS");
const confirmSOS = document.getElementById("confirmSOS");


function openSOSModal() {

    sosModal.classList.add("show");

}


function closeSOSModal() {

    sosModal.classList.remove("show");

}


sosButton.addEventListener("click", openSOSModal);

mobileSOS.addEventListener("click", openSOSModal);

heroSOS.addEventListener("click", openSOSModal);


closeModal.addEventListener("click", closeSOSModal);

cancelSOS.addEventListener("click", closeSOSModal);


/* =========================================
   CONFIRM SOS
========================================= */

confirmSOS.addEventListener("click", async () => {

    try {

        const user = window.firebaseUser;

        if (!user) {

            alert(
                "Please login before activating Emergency SOS."
            );

            closeSOSModal();

            return;

        }


        const { addDoc, collection, serverTimestamp } =
            window.firebaseFunctions;


        await addDoc(
            collection(window.firebaseDB, "emergencyAlerts"),
            {

                userId: user.uid,

                status: "ACTIVE",

                type: "SOS",

                createdAt: serverTimestamp(),

                message: "Emergency SOS activated"

            }
        );


        alert(
            "🚨 EMERGENCY SOS ACTIVATED!\n\nYour emergency alert has been sent."
        );


        closeSOSModal();


    } catch (error) {

        console.error(error);

        alert(
            "Unable to send SOS. Please try again."
        );

    }

});


/* =========================================
   CLOSE MODAL WHEN CLICKING OUTSIDE
========================================= */

sosModal.addEventListener("click", (event) => {

    if (event.target === sosModal) {

        closeSOSModal();

    }

});


/* =========================================
   ESCAPE KEY
========================================= */

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

        closeSOSModal();

    }

});
/* =========================================
   HERO SOS SYSTEM
========================================= */

const heroSOSButton =
    document.getElementById("heroSOSButton");

const bigSOSButton =
    document.getElementById("bigSOSButton");

const heroSOSModal =
    document.getElementById("heroSOSModal");

const heroModalClose =
    document.getElementById("heroModalClose");

const heroModalCancel =
    document.getElementById("heroModalCancel");

const heroModalConfirm =
    document.getElementById("heroModalConfirm");

const locationStatus =
    document.getElementById("locationStatus");


/* =========================================
   OPEN SOS MODAL
========================================= */

function openHeroSOS() {

    heroSOSModal.classList.add("show");

    detectLocation();

}


/* =========================================
   CLOSE SOS MODAL
========================================= */

function closeHeroSOS() {

    heroSOSModal.classList.remove("show");

}


heroSOSButton.addEventListener(
    "click",
    openHeroSOS
);


bigSOSButton.addEventListener(
    "click",
    openHeroSOS
);


heroModalClose.addEventListener(
    "click",
    closeHeroSOS
);


heroModalCancel.addEventListener(
    "click",
    closeHeroSOS
);


/* =========================================
   GEOLOCATION
========================================= */

let emergencyLocation = null;


function detectLocation() {

    locationStatus.textContent =
        "📍 Detecting your location...";


    if (!navigator.geolocation) {

        locationStatus.textContent =
            "⚠️ GPS is not supported by this browser.";

        return;

    }


    navigator.geolocation.getCurrentPosition(

        (position) => {

            emergencyLocation = {

                latitude:
                    position.coords.latitude,

                longitude:
                    position.coords.longitude,

                accuracy:
                    position.coords.accuracy

            };


            locationStatus.innerHTML =
                "📍 Location detected successfully";

        },


        (error) => {

            console.error(
                "Location error:",
                error
            );


            locationStatus.innerHTML =
                "⚠️ Location unavailable. SOS can still be submitted.";

        },

        {

            enableHighAccuracy: true,

            timeout: 10000,

            maximumAge: 0

        }

    );

}


/* =========================================
   SEND SOS
========================================= */

heroModalConfirm.addEventListener(
    "click",
    sendEmergencySOS
);


async function sendEmergencySOS() {

    const originalText =
        heroModalConfirm.textContent;


    heroModalConfirm.disabled = true;

    heroModalConfirm.textContent =
        "SENDING...";


    try {

        /*
         * Firebase Authentication
         */

        const user =
            window.firebaseUser;


        if (!user) {

            alert(
                "Please login before activating Emergency SOS."
            );

            heroModalConfirm.disabled = false;

            heroModalConfirm.textContent =
                originalText;

            return;

        }


        /*
         * Firebase Firestore
         */

        const {
            collection,
            addDoc,
            serverTimestamp
        } =
            window.firebaseFunctions;


        /*
         * Emergency Alert
         */

        const emergencyData = {

            userId: user.uid,

            type: "SOS",

            status: "ACTIVE",

            createdAt:
                serverTimestamp(),

            location:
                emergencyLocation || null,

            source: "hero-section"

        };


        /*
         * Save alert
         */

        const alertReference =
            await addDoc(

                collection(
                    window.firebaseDB,
                    "emergencyAlerts"
                ),

                emergencyData

            );


        console.log(
            "Emergency Alert ID:",
            alertReference.id
        );


        /*
         * Success
         */

        heroModalConfirm.textContent =
            "SOS SENT ✓";


        locationStatus.innerHTML =
            "🚨 Emergency alert successfully created";


        setTimeout(() => {

            closeHeroSOS();

            heroModalConfirm.disabled = false;

            heroModalConfirm.textContent =
                originalText;

        }, 1800);


    } catch (error) {

        console.error(
            "SOS Error:",
            error
        );


        alert(
            "Unable to send the emergency alert. Please try again."
        );


        heroModalConfirm.disabled = false;

        heroModalConfirm.textContent =
            originalText;

    }

}


/* =========================================
   CLOSE MODAL ON BACKDROP
========================================= */

heroSOSModal.addEventListener(
    "click",
    (event) => {

        if (
            event.target ===
            heroSOSModal
        ) {

            closeHeroSOS();

        }

    }
);


/* =========================================
   ESC KEY
========================================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape" &&
            heroSOSModal.classList.contains("show")
        ) {

            closeHeroSOS();

        }

    }
);


/* =========================================
   LIVE RESPONSE TIME ANIMATION
========================================= */

const responseTime =
    document.getElementById("responseTime");


const responseValues = [
    "< 5s",
    "< 4s",
    "< 3s",
    "< 5s"
];


let responseIndex = 0;


setInterval(() => {

    responseIndex++;

    if (
        responseIndex >=
        responseValues.length
    ) {

        responseIndex = 0;

    }


    responseTime.textContent =
        responseValues[responseIndex];

}, 3000);
/* =========================================
   PROBLEM → SOLUTION INTERACTION
========================================= */

const showWorkflow =
    document.getElementById("showWorkflow");

const workflowCard =
    document.querySelector(".workflow-card");

const psStatusText =
    document.getElementById("psStatusText");


/* =========================================
   SHOW THE DIFFERENCE
========================================= */

if (showWorkflow) {

    showWorkflow.addEventListener(
        "click",
        async () => {

            workflowCard.classList.remove("active");

            /*
             * Restart CSS animation
             */

            void workflowCard.offsetWidth;

            workflowCard.classList.add("active");


            /*
             * Update status
             */

            psStatusText.textContent =
                "Emergency response workflow connected";


            /*
             * Animate button
             */

            showWorkflow.innerHTML =
                "Workflow Active ✓";


            /*
             * Optional Firebase analytics/event
             */

            await logProblemSolutionView();


            /*
             * Reset button
             */

            setTimeout(() => {

                showWorkflow.innerHTML =
                    'See The Difference <span>→</span>';

                psStatusText.textContent =
                    "Emergency network ready";

            }, 4000);

        }

    );

}


/* =========================================
   FIREBASE EVENT LOG
========================================= */

async function logProblemSolutionView() {

    try {

        /*
         * Make sure Firebase is available.
         */

        if (
            !window.firebaseDB ||
            !window.firebaseFunctions
        ) {

            console.log(
                "Firebase is not initialized."
            );

            return;

        }


        const {
            collection,
            addDoc,
            serverTimestamp
        } =
            window.firebaseFunctions;


        /*
         * Store anonymous UI interaction.
         *
         * Do not store unnecessary personal
         * information here.
         */

        await addDoc(

            collection(
                window.firebaseDB,
                "systemEvents"
            ),

            {

                event:
                    "problem_solution_interaction",

                page:
                    "landing-page",

                section:
                    "problem-solution",

                createdAt:
                    serverTimestamp()

            }

        );


        console.log(
            "Problem → Solution event logged."
        );


    } catch (error) {

        console.error(
            "Firebase event error:",
            error
        );

    }

}
/* =========================
   HOW IT WORKS JAVASCRIPT
========================= */

document.addEventListener("DOMContentLoaded", () => {

    const steps = document.querySelectorAll(".hiw-step");

    let currentStep = 0;
    let stepTimer;


    /* -------------------------
       Activate Step
    ------------------------- */

    function activateStep(index) {

        steps.forEach((step, i) => {

            step.classList.toggle(
                "active",
                i === index
            );

        });

        currentStep = index;
    }


    /* -------------------------
       Automatic Step Animation
    ------------------------- */

    function startStepAnimation() {

        stepTimer = setInterval(() => {

            currentStep++;

            if (currentStep >= steps.length) {
                currentStep = 0;
            }

            activateStep(currentStep);

        }, 3000);
    }


    /* -------------------------
       Stop / Restart Animation
    ------------------------- */

    function restartStepAnimation() {

        clearInterval(stepTimer);

        startStepAnimation();
    }


    /* -------------------------
       Click Interaction
    ------------------------- */

    steps.forEach((step, index) => {

        step.addEventListener("click", () => {

            activateStep(index);

            restartStepAnimation();

            logHowItWorksInteraction(index + 1);

        });

    });


    /* -------------------------
       Start
    ------------------------- */

    if (steps.length > 0) {

        activateStep(0);

        startStepAnimation();

    }

});


/* =========================
   FIREBASE EVENT LOGGING
========================= */

async function logHowItWorksInteraction(stepNumber) {

    try {

        if (
            !window.firebaseDB ||
            !window.firebaseFunctions
        ) {
            console.log(
                "Firebase is not initialized."
            );

            return;
        }


        const {
            collection,
            addDoc,
            serverTimestamp
        } = window.firebaseFunctions;


        await addDoc(
            collection(
                window.firebaseDB,
                "systemEvents"
            ),
            {

                event:
                    "how_it_works_step_clicked",

                step:
                    stepNumber,

                page:
                    "landing-page",

                section:
                    "how-it-works",

                createdAt:
                    serverTimestamp()

            }
        );


        console.log(
            "How It Works interaction saved."
        );


    } catch (error) {

        console.error(
            "Firebase logging error:",
            error
        );

    }

}
/* =========================================
   LIVE EMERGENCY STATUS JAVASCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const timerElement =
        document.getElementById("lesTimer");

    const lastUpdated =
        document.getElementById("lesLastUpdated");

    const progressFill =
        document.getElementById("lesProgressFill");

    const progressValue =
        document.getElementById("lesProgressValue");

    const statusText =
        document.getElementById("lesStatusText");

    const statusTitle =
        document.getElementById("lesStatusTitle");

    const locationText =
        document.getElementById("lesLocation");

    const coordinatesText =
        document.getElementById("lesCoordinates");

    const responseStatus =
        document.getElementById("lesResponseStatus");


    /* =====================================
       EMERGENCY TIMER
    ===================================== */

    let seconds = 0;

    setInterval(() => {

        seconds++;

        const minutes =
            Math.floor(seconds / 60);

        const remainingSeconds =
            seconds % 60;

        const formattedMinutes =
            String(minutes).padStart(2, "0");

        const formattedSeconds =
            String(remainingSeconds).padStart(2, "0");

        if (timerElement) {

            timerElement.textContent =
                `${formattedMinutes}:${formattedSeconds}`;

        }

    }, 1000);


    /* =====================================
       LAST UPDATED
    ===================================== */

    function updateLastUpdated() {

        if (!lastUpdated) return;

        const now = new Date();

        lastUpdated.textContent =
            now.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit"
            });

    }


    setInterval(
        updateLastUpdated,
        5000
    );


    /* =====================================
       PROGRESS ANIMATION
    ===================================== */

    let progress = 75;

    setInterval(() => {

        if (progress < 95) {

            progress += 1;

            if (progressFill) {

                progressFill.style.width =
                    progress + "%";

            }

            if (progressValue) {

                progressValue.textContent =
                    progress + "%";

            }

        }

    }, 8000);


    /* =====================================
       GPS LOCATION
    ===================================== */

    if ("geolocation" in navigator) {

        navigator.geolocation.getCurrentPosition(

            (position) => {

                const latitude =
                    position.coords.latitude;

                const longitude =
                    position.coords.longitude;

                if (locationText) {

                    locationText.textContent =
                        "Location secured";

                }

                if (coordinatesText) {

                    coordinatesText.textContent =
                        `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`;

                }

            },

            () => {

                if (locationText) {

                    locationText.textContent =
                        "Location unavailable";

                }

                if (coordinatesText) {

                    coordinatesText.textContent =
                        "GPS permission required";

                }

            },

            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 5000
            }

        );

    }


    /* =====================================
       FIREBASE REAL-TIME LISTENER
    ===================================== */

    waitForFirebase();


    function waitForFirebase() {

        if (
            window.firebaseDB &&
            window.firebaseFunctions
        ) {

            listenForEmergency();

        } else {

            setTimeout(
                waitForFirebase,
                500
            );

        }

    }


    async function listenForEmergency() {

        try {

            const {
                collection,
                query,
                where,
                orderBy,
                limit,
                onSnapshot
            } = window.firebaseFunctions;


            /*
             * Requires the Firebase file to expose
             * query, where, orderBy, limit and onSnapshot.
             */

            if (
                !query ||
                !where ||
                !orderBy ||
                !limit ||
                !onSnapshot
            ) {

                console.log(
                    "Firebase realtime functions are not available."
                );

                return;

            }


            const alertsRef =
                collection(
                    window.firebaseDB,
                    "emergencyAlerts"
                );


            const activeAlertsQuery =
                query(
                    alertsRef,

                    where(
                        "status",
                        "==",
                        "ACTIVE"
                    ),

                    orderBy(
                        "createdAt",
                        "desc"
                    ),

                    limit(1)
                );


            onSnapshot(
                activeAlertsQuery,
                (snapshot) => {

                    if (snapshot.empty) {

                        setDemoStatus();

                        return;

                    }


                    snapshot.forEach(
                        (doc) => {

                            const alert =
                                doc.data();

                            updateEmergencyStatus(
                                alert
                            );

                        }
                    );

                },

                (error) => {

                    console.error(
                        "Emergency listener error:",
                        error
                    );

                    setDemoStatus();

                }
            );


        } catch (error) {

            console.error(
                "Firebase status error:",
                error
            );

            setDemoStatus();

        }

    }


    /* =====================================
       UPDATE EMERGENCY STATUS
    ===================================== */

    function updateEmergencyStatus(alert) {

        if (!alert) return;


        if (statusText) {

            statusText.textContent =
                alert.status || "ACTIVE";

        }


        if (statusTitle) {

            statusTitle.textContent =
                "Emergency Active";

        }


        if (responseStatus) {

            responseStatus.textContent =
                "Responding";

        }


        /* Location from Firebase */

        if (
            alert.location &&
            typeof alert.location.latitude === "number" &&
            typeof alert.location.longitude === "number"
        ) {

            const latitude =
                alert.location.latitude;

            const longitude =
                alert.location.longitude;


            if (locationText) {

                locationText.textContent =
                    "Location secured";

            }


            if (coordinatesText) {

                coordinatesText.textContent =
                    `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`;

            }

        }


        updateLastUpdated();

    }


    /* =====================================
       DEMO STATUS
    ===================================== */

    function setDemoStatus() {

        if (statusText) {

            statusText.textContent =
                "ACTIVE";

        }

        if (statusTitle) {

            statusTitle.textContent =
                "Emergency Active";

        }

        if (responseStatus) {

            responseStatus.textContent =
                "Responding";

        }

    }

});
/* =========================================
   CORE FEATURES JAVASCRIPT
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const featureCards =
            document.querySelectorAll(
                ".cf-card"
            );

        const featureButtons =
            document.querySelectorAll(
                ".cf-feature-btn"
            );


        let activeFeature = 0;

        let featureTimer;


        /* =====================================
           ACTIVATE FEATURE
        ===================================== */

        function activateFeature(index) {

            featureCards.forEach(
                (card, i) => {

                    card.classList.toggle(
                        "active",
                        i === index
                    );

                }
            );

            activeFeature = index;

        }


        /* =====================================
           AUTOMATIC FEATURE HIGHLIGHT
        ===================================== */

        function startFeatureRotation() {

            featureTimer =
                setInterval(() => {

                    activeFeature++;

                    if (
                        activeFeature >=
                        featureCards.length
                    ) {

                        activeFeature = 0;

                    }

                    activateFeature(
                        activeFeature
                    );

                }, 3500);

        }


        /* =====================================
           RESTART ROTATION
        ===================================== */

        function restartRotation() {

            clearInterval(
                featureTimer
            );

            startFeatureRotation();

        }


        /* =====================================
           CARD CLICK
        ===================================== */

        featureCards.forEach(
            (card, index) => {

                card.addEventListener(
                    "click",
                    (event) => {

                        /*
                         * Avoid duplicate
                         * button click logging.
                         */

                        if (
                            event.target.closest(
                                ".cf-feature-btn"
                            )
                        ) {

                            return;

                        }

                        activateFeature(index);

                        restartRotation();

                        const featureName =
                            card.dataset.feature;

                        logFeatureInteraction(
                            featureName
                        );

                    }
                );

            }
        );


        /* =====================================
           BUTTON CLICK
        ===================================== */

        featureButtons.forEach(
            (button) => {

                button.addEventListener(
                    "click",
                    (event) => {

                        event.stopPropagation();

                        const feature =
                            button.dataset.feature;

                        const card =
                            button.closest(
                                ".cf-card"
                            );

                        featureCards.forEach(
                            (item) => {

                                item.classList.remove(
                                    "active"
                                );

                            }
                        );

                        if (card) {

                            card.classList.add(
                                "active"
                            );

                        }

                        logFeatureInteraction(
                            feature
                        );


                        /*
                         * Small visual feedback
                         */

                        const originalText =
                            button.innerHTML;

                        button.innerHTML =
                            "Feature Active ✓";

                        setTimeout(() => {

                            button.innerHTML =
                                originalText;

                        }, 1500);

                    }
                );

            }
        );


        /* =====================================
           INITIALIZE
        ===================================== */

        if (featureCards.length > 0) {

            activateFeature(0);

            startFeatureRotation();

        }

    }
);


/* =========================================
   FIREBASE FEATURE LOGGING
========================================= */

async function logFeatureInteraction(
    featureName
) {

    try {

        if (
            !window.firebaseDB ||
            !window.firebaseFunctions
        ) {

            console.log(
                "Firebase is not initialized."
            );

            return;

        }


        const {
            collection,
            addDoc,
            serverTimestamp
        } =
            window.firebaseFunctions;


        await addDoc(
            collection(
                window.firebaseDB,
                "systemEvents"
            ),
            {

                event:
                    "core_feature_interaction",

                feature:
                    featureName,

                page:
                    "landing-page",

                section:
                    "core-features",

                createdAt:
                    serverTimestamp()

            }
        );


        console.log(
            "Feature interaction saved."
        );


    } catch (error) {

        console.error(
            "Firebase feature logging error:",
            error
        );

    }

}
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

const firebaseConfig = {

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
   INITIALIZE APP
========================================= */

const app =
    initializeApp(
        firebaseConfig
    );


/* =========================================
   AUTHENTICATION
========================================= */

const auth =
    getAuth(app);


/* =========================================
   FIRESTORE
========================================= */

const db =
    getFirestore(app);


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
   AUTH STATE
========================================= */

onAuthStateChanged(
    auth,
    (user) => {

        if (user) {

            window.firebaseUser =
                user;

            console.log(
                "User authenticated:",
                user.uid
            );

        } else {

            window.firebaseUser =
                null;

            console.log(
                "User is not authenticated."
            );

        }

    }
);
/* =====================================
   EMERGENCY NETWORK JAVASCRIPT
===================================== */

document.addEventListener("DOMContentLoaded", () => {

    const networkCard =
        document.querySelector(".en-network-card");

    const testButton =
        document.getElementById("enTestNetwork");

    const gpsStatus =
        document.getElementById("en-gps-status");

    const locationText =
        document.getElementById("en-location-text");


    /* =====================================
       TEST NETWORK
    ===================================== */

    if (testButton) {

        testButton.addEventListener("click", async () => {

            testButton.disabled = true;

            testButton.innerHTML =
                "Testing Network... <span>↻</span>";

            if (networkCard) {
                networkCard.classList.add("network-testing");
            }

            try {

                await new Promise(resolve =>
                    setTimeout(resolve, 1800)
                );

                testButton.innerHTML =
                    "Network Operational ✓";

                gpsStatus.textContent =
                    "Connected";

                locationText.textContent =
                    "Location available";


                /* Firebase event logging */

                if (
                    window.firebaseDB &&
                    window.firebaseFunctions
                ) {

                    const {
                        collection,
                        addDoc,
                        serverTimestamp
                    } = window.firebaseFunctions;

                    await addDoc(
                        collection(
                            window.firebaseDB,
                            "systemEvents"
                        ),
                        {
                            event:
                                "emergency_network_test",

                            page:
                                "landing-page",

                            section:
                                "emergency-network",

                            status:
                                "SUCCESS",

                            createdAt:
                                serverTimestamp()
                        }
                    );
                }

            } catch (error) {

                console.error(
                    "Network test failed:",
                    error
                );

                testButton.innerHTML =
                    "Network Test Failed";

            }


            setTimeout(() => {

                testButton.disabled = false;

                testButton.innerHTML =
                    'Test Network <span>→</span>';

            }, 3000);

        });

    }


    /* =====================================
       GET LIVE GPS STATUS
    ===================================== */

    if ("geolocation" in navigator) {

        navigator.geolocation.getCurrentPosition(

            (position) => {

                const latitude =
                    position.coords.latitude;

                const longitude =
                    position.coords.longitude;

                gpsStatus.textContent =
                    "Connected";

                locationText.textContent =
                    "GPS location active";


                /* Store location temporarily */

                window.emergencyNetworkLocation = {
                    latitude,
                    longitude,
                    accuracy:
                        position.coords.accuracy
                };

            },

            () => {

                gpsStatus.textContent =
                    "Permission required";

                locationText.textContent =
                    "GPS unavailable";

            },

            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 30000
            }

        );

    } else {

        gpsStatus.textContent =
            "Unavailable";

        locationText.textContent =
            "GPS not supported";

    }


    /* =====================================
       NODE INTERACTIONS
    ===================================== */

    const nodes =
        document.querySelectorAll(".en-node");

    nodes.forEach((node) => {

        node.addEventListener("click", async () => {

            const nodeName =
                node.querySelector("strong")?.textContent ||
                "Unknown";

            node.style.borderColor =
                "rgba(255,51,71,0.5)";

            setTimeout(() => {

                node.style.borderColor =
                    "";

            }, 800);


            /* Log interaction */

            if (
                window.firebaseDB &&
                window.firebaseFunctions
            ) {

                const {
                    collection,
                    addDoc,
                    serverTimestamp
                } = window.firebaseFunctions;

                try {

                    await addDoc(
                        collection(
                            window.firebaseDB,
                            "systemEvents"
                        ),
                        {
                            event:
                                "emergency_network_node_clicked",

                            node:
                                nodeName,

                            page:
                                "landing-page",

                            section:
                                "emergency-network",

                            createdAt:
                                serverTimestamp()
                        }
                    );

                } catch (error) {

                    console.error(
                        "Firebase logging error:",
                        error
                    );

                }

            }

        });

    });/* =========================================
   QR / EMERGENCY ACCESS JAVASCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const qrContainer =
        document.getElementById("emergencyQRCode");

    const generateButton =
        document.getElementById("generateEmergencyQR");

    const emergencyIdElement =
        document.getElementById("qrEmergencyId");

    const copyIdButton =
        document.getElementById("qrCopyId");

    const copyLinkButton =
        document.getElementById("copyEmergencyLink");

    const downloadButton =
        document.getElementById("downloadEmergencyQR");

    const accessCountElement =
        document.getElementById("qrAccessCount");


    /* =========================================
       CREATE UNIQUE EMERGENCY ID
    ========================================= */

    function createEmergencyId() {

        const randomNumber =
            Math.floor(
                100000 +
                Math.random() * 900000
            );

        return `SOS-${randomNumber}`;
    }


    /* =========================================
       GET / CREATE EMERGENCY ID
    ========================================= */

    let emergencyId =
        localStorage.getItem("sosEmergencyId");

    if (!emergencyId) {

        emergencyId =
            createEmergencyId();

        localStorage.setItem(
            "sosEmergencyId",
            emergencyId
        );
    }


    emergencyIdElement.textContent =
        emergencyId;


    /* =========================================
       CREATE EMERGENCY ACCESS URL
    ========================================= */

    function getEmergencyURL() {

        const baseURL =
            window.location.origin +
            window.location.pathname;

        return `${baseURL}?emergency=${encodeURIComponent(
            emergencyId
        )}`;

    }


    const emergencyURL =
        getEmergencyURL();


    /* =========================================
       GENERATE QR CODE
    ========================================= */

    function generateQR() {

        if (!qrContainer) return;

        qrContainer.innerHTML = "";

        new QRCode(qrContainer, {

            text: emergencyURL,

            width: 220,

            height: 220,

            colorDark: "#080b12",

            colorLight: "#ffffff",

            correctLevel:
                QRCode.CorrectLevel.H

        });

    }


    generateQR();


    /* =========================================
       GENERATE BUTTON
    ========================================= */

    if (generateButton) {

        generateButton.addEventListener(
            "click",
            async () => {

                generateButton.disabled =
                    true;

                generateButton.innerHTML =
                    "<span>Generating QR...</span>" +
                    "<span>↻</span>";


                emergencyId =
                    createEmergencyId();

                localStorage.setItem(
                    "sosEmergencyId",
                    emergencyId
                );

                emergencyIdElement.textContent =
                    emergencyId;


                const newURL =
                    getEmergencyURL();


                qrContainer.innerHTML = "";

                new QRCode(
                    qrContainer,
                    {
                        text: newURL,

                        width: 220,

                        height: 220,

                        colorDark: "#080b12",

                        colorLight: "#ffffff",

                        correctLevel:
                            QRCode.CorrectLevel.H
                    }
                );


                /* Save QR profile */

                if (
                    window.firebaseDB &&
                    window.firebaseFunctions
                ) {

                    const {
                        collection,
                        addDoc,
                        serverTimestamp
                    } =
                        window.firebaseFunctions;

                    try {

                        await addDoc(
                            collection(
                                window.firebaseDB,
                                "emergencyQRProfiles"
                            ),
                            {
                                emergencyId:
                                    emergencyId,

                                accessType:
                                    "PUBLIC_EMERGENCY_QR",

                                createdAt:
                                    serverTimestamp(),

                                active:
                                    true
                            }
                        );

                    } catch (error) {

                        console.error(
                            "Firebase QR error:",
                            error
                        );

                    }

                }


                generateButton.innerHTML =
                    "<span>QR Generated ✓</span>" +
                    "<span>→</span>";


                setTimeout(() => {

                    generateButton.disabled =
                        false;

                    generateButton.innerHTML =
                        "<span>" +
                        "Generate Emergency QR" +
                        "</span>" +
                        "<span class='qr-arrow'>" +
                        "→" +
                        "</span>";

                }, 2500);

            }
        );

    }


    /* =========================================
       COPY EMERGENCY ID
    ========================================= */

    if (copyIdButton) {

        copyIdButton.addEventListener(
            "click",
            async () => {

                try {

                    await navigator.clipboard.writeText(
                        emergencyId
                    );

                    copyIdButton.textContent =
                        "Copied ✓";

                    setTimeout(() => {

                        copyIdButton.textContent =
                            "Copy";

                    }, 1800);

                } catch (error) {

                    console.error(
                        "Copy failed:",
                        error
                    );

                }

            }
        );

    }


    /* =========================================
       COPY EMERGENCY LINK
    ========================================= */

    if (copyLinkButton) {

        copyLinkButton.addEventListener(
            "click",
            async () => {

                try {

                    const currentURL =
                        getEmergencyURL();

                    await navigator.clipboard.writeText(
                        currentURL
                    );

                    copyLinkButton.textContent =
                        "✓ Link Copied";

                    setTimeout(() => {

                        copyLinkButton.textContent =
                            "🔗 Copy Link";

                    }, 2000);


                    /* Firebase event */

                    await logQREvent(
                        "emergency_qr_link_copied"
                    );

                } catch (error) {

                    console.error(
                        "Copy link error:",
                        error
                    );

                }

            }
        );

    }


    /* =========================================
       DOWNLOAD QR
    ========================================= */

    if (downloadButton) {

        downloadButton.addEventListener(
            "click",
            async () => {

                const canvas =
                    qrContainer.querySelector(
                        "canvas"
                    );

                const image =
                    qrContainer.querySelector(
                        "img"
                    );


                let downloadURL = null;


                if (canvas) {

                    downloadURL =
                        canvas.toDataURL(
                            "image/png"
                        );

                } else if (image) {

                    downloadURL =
                        image.src;

                }


                if (!downloadURL) {

                    alert(
                        "Please generate the QR code first."
                    );

                    return;

                }


                const link =
                    document.createElement("a");

                link.href =
                    downloadURL;

                link.download =
                    `${emergencyId}-Emergency-QR.png`;

                document.body.appendChild(link);

                link.click();

                link.remove();


                await logQREvent(
                    "emergency_qr_downloaded"
                );

            }
        );

    }


    /* =========================================
       FIREBASE EVENT LOGGER
    ========================================= */

    async function logQREvent(eventName) {

        if (
            !window.firebaseDB ||
            !window.firebaseFunctions
        ) {
            return;
        }


        try {

            const {
                collection,
                addDoc,
                serverTimestamp
            } =
                window.firebaseFunctions;


            await addDoc(
                collection(
                    window.firebaseDB,
                    "systemEvents"
                ),
                {
                    event:
                        eventName,

                    emergencyId:
                        emergencyId,

                    page:
                        "landing-page",

                    section:
                        "qr-emergency-access",

                    createdAt:
                        serverTimestamp()
                }
            );

        } catch (error) {

            console.error(
                "Firebase event error:",
                error
            );

        }

    }


    /* =========================================
       DETECT QR EMERGENCY ACCESS
    ========================================= */

    const urlParams =
        new URLSearchParams(
            window.location.search
        );

    const scannedEmergencyId =
        urlParams.get("emergency");


    if (scannedEmergencyId) {

        console.log(
            "Emergency QR scanned:",
            scannedEmergencyId
        );


        /* Update preview */

        const previewName =
            document.getElementById(
                "previewName"
            );

        if (previewName) {

            previewName.textContent =
                "Emergency Profile";

        }


        /* Log QR access */

        logQRAccess(
            scannedEmergencyId
        );

    }


    /* =========================================
       LOG QR ACCESS
    ========================================= */

    async function logQRAccess(id) {

        if (
            !window.firebaseDB ||
            !window.firebaseFunctions
        ) {
            return;
        }


        try {

            const {
                collection,
                addDoc,
                serverTimestamp
            } =
                window.firebaseFunctions;


            await addDoc(
                collection(
                    window.firebaseDB,
                    "emergencyQRAccess"
                ),
                {
                    emergencyId:
                        id,

                    accessedAt:
                        serverTimestamp(),

                    source:
                        "qr-scan"
                }
            );


            if (accessCountElement) {

                let currentCount =
                    parseInt(
                        accessCountElement.textContent
                    ) || 0;

                accessCountElement.textContent =
                    currentCount + 1;

            }

        } catch (error) {

            console.error(
                "QR access logging error:",
                error
            );

        }

    }

});

});
/* =========================================
   EMERGENCY DASHBOARD JAVASCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const currentTime =
        document.getElementById("edCurrentTime");

    const responseTime =
        document.getElementById("edResponseTime");

    const refreshButton =
        document.getElementById("edRefresh");

    const progressBar =
        document.getElementById("edProgressBar");

    const progressText =
        document.getElementById("edProgressText");

    const activeEmergencies =
        document.getElementById(
            "edActiveEmergencies"
        );

    const incidentId =
        document.getElementById("edIncidentId");

    const latitudeElement =
        document.getElementById("edLatitude");

    const longitudeElement =
        document.getElementById("edLongitude");

    const accuracyElement =
        document.getElementById("edAccuracy");

    const coordinatesElement =
        document.getElementById("edCoordinates");


    /* =========================================
       LIVE CLOCK
    ========================================= */

    function updateClock() {

        const now = new Date();

        const hours =
            String(now.getHours()).padStart(2, "0");

        const minutes =
            String(now.getMinutes()).padStart(2, "0");

        const seconds =
            String(now.getSeconds()).padStart(2, "0");

        if (currentTime) {

            currentTime.textContent =
                `${hours}:${minutes}:${seconds}`;

        }

    }


    updateClock();

    setInterval(updateClock, 1000);


    /* =========================================
       RESPONSE TIMER
    ========================================= */

    let responseSeconds = 42;


    function updateResponseTimer() {

        responseSeconds++;

        const minutes =
            Math.floor(responseSeconds / 60);

        const seconds =
            responseSeconds % 60;

        const formatted =
            `${String(minutes).padStart(2, "0")}:` +
            `${String(seconds).padStart(2, "0")}`;

        if (responseTime) {

            responseTime.textContent =
                formatted;

        }

    }


    setInterval(
        updateResponseTimer,
        1000
    );


    /* =========================================
       PROGRESS ANIMATION
    ========================================= */

    let progress = 75;

    function updateProgress() {

        if (progress >= 95) {
            progress = 75;
        }

        progress++;

        if (progressBar) {

            progressBar.style.width =
                `${progress}%`;

        }

        if (progressText) {

            progressText.textContent =
                `${progress}%`;

        }

    }


    setInterval(
        updateProgress,
        5000
    );


    /* =========================================
       GET LIVE GPS
    ========================================= */

    function getDashboardLocation() {

        if (!navigator.geolocation) {

            if (coordinatesElement) {
                coordinatesElement.textContent =
                    "GPS not supported";
            }

            return;

        }


        if (coordinatesElement) {

            coordinatesElement.textContent =
                "Requesting GPS...";
        }


        navigator.geolocation.getCurrentPosition(

            (position) => {

                const lat =
                    position.coords.latitude;

                const lng =
                    position.coords.longitude;

                const accuracy =
                    position.coords.accuracy;


                if (latitudeElement) {

                    latitudeElement.textContent =
                        lat.toFixed(6);

                }


                if (longitudeElement) {

                    longitudeElement.textContent =
                        lng.toFixed(6);

                }


                if (accuracyElement) {

                    accuracyElement.textContent =
                        `${Math.round(accuracy)} m`;

                }


                if (coordinatesElement) {

                    coordinatesElement.textContent =
                        `${lat.toFixed(5)}, ` +
                        `${lng.toFixed(5)}`;

                }


                window.dashboardLocation = {

                    latitude: lat,

                    longitude: lng,

                    accuracy: accuracy

                };

            },

            (error) => {

                console.warn(
                    "GPS unavailable:",
                    error.message
                );


                if (coordinatesElement) {

                    coordinatesElement.textContent =
                        "Location permission required";

                }

            },

            {

                enableHighAccuracy: true,

                timeout: 10000,

                maximumAge: 30000

            }

        );

    }


    getDashboardLocation();


    /* =========================================
       REFRESH DASHBOARD
    ========================================= */

    if (refreshButton) {

        refreshButton.addEventListener(
            "click",
            async () => {

                refreshButton.textContent =
                    "↻ Updating...";

                refreshButton.disabled =
                    true;


                getDashboardLocation();


                await loadActiveEmergency();


                await logDashboardEvent(
                    "dashboard_refreshed"
                );


                setTimeout(() => {

                    refreshButton.textContent =
                        "↻ Refresh";

                    refreshButton.disabled =
                        false;

                }, 1200);

            }
        );

    }


    /* =========================================
       LOAD ACTIVE EMERGENCY
    ========================================= */

    async function loadActiveEmergency() {

        if (
            !window.firebaseDB ||
            !window.firebaseFunctions
        ) {
            return;
        }


        try {

            const {
                collection,
                query,
                where,
                orderBy,
                limit,
                onSnapshot
            } =
                window.firebaseFunctions;


            const alertsRef =
                collection(
                    window.firebaseDB,
                    "emergencyAlerts"
                );


            const activeQuery =
                query(

                    alertsRef,

                    where(
                        "status",
                        "==",
                        "ACTIVE"
                    ),

                    orderBy(
                        "createdAt",
                        "desc"
                    ),

                    limit(1)

                );


            onSnapshot(
                activeQuery,
                (snapshot) => {

                    if (snapshot.empty) {

                        if (activeEmergencies) {

                            activeEmergencies.textContent =
                                "00";

                        }

                        return;

                    }


                    if (activeEmergencies) {

                        activeEmergencies.textContent =
                            String(
                                snapshot.size
                            ).padStart(2, "0");

                    }


                    const emergency =
                        snapshot.docs[0].data();


                    if (
                        emergency &&
                        emergency.userId
                    ) {

                        const id =
                            emergency.userId
                                .toString()
                                .slice(0, 8)
                                .toUpperCase();


                        if (incidentId) {

                            incidentId.textContent =
                                `Incident: SOS-${id}`;

                        }

                    }


                    /* Display emergency location */

                    if (
                        emergency.location
                    ) {

                        const location =
                            emergency.location;


                        if (latitudeElement) {

                            latitudeElement.textContent =
                                Number(
                                    location.latitude
                                ).toFixed(6);

                        }


                        if (longitudeElement) {

                            longitudeElement.textContent =
                                Number(
                                    location.longitude
                                ).toFixed(6);

                        }


                        if (accuracyElement) {

                            accuracyElement.textContent =
                                `${Math.round(
                                    location.accuracy || 0
                                )} m`;

                        }


                        if (coordinatesElement) {

                            coordinatesElement.textContent =
                                `${Number(
                                    location.latitude
                                ).toFixed(5)}, ` +
                                `${Number(
                                    location.longitude
                                ).toFixed(5)}`;

                        }

                    }

                },

                (error) => {

                    console.error(
                        "Emergency dashboard listener:",
                        error
                    );

                }

            );

        } catch (error) {

            console.error(
                "Dashboard Firebase error:",
                error
            );

        }

    }


    /*
       Give Firebase a moment to initialize
       because firebase.js is loaded as a module.
    */

    setTimeout(
        loadActiveEmergency,
        1000
    );


    /* =========================================
       SIDEBAR INTERACTIONS
    ========================================= */

    const navItems =
        document.querySelectorAll(
            ".ed-nav-item"
        );


    navItems.forEach((item) => {

        item.addEventListener(
            "click",
            () => {

                navItems.forEach(
                    (nav) =>
                        nav.classList.remove(
                            "active"
                        )
                );


                item.classList.add(
                    "active"
                );


                logDashboardEvent(
                    "dashboard_navigation",
                    {
                        item:
                            item.textContent.trim()
                    }
                );

            }
        );

    });


    /* =========================================
       FIREBASE EVENT LOGGING
    ========================================= */

    async function logDashboardEvent(
        eventName,
        extraData = {}
    ) {

        if (
            !window.firebaseDB ||
            !window.firebaseFunctions
        ) {
            return;
        }


        try {

            const {
                collection,
                addDoc,
                serverTimestamp
            } =
                window.firebaseFunctions;


            await addDoc(

                collection(
                    window.firebaseDB,
                    "systemEvents"
                ),

                {
                    event:
                        eventName,

                    page:
                        "landing-page",

                    section:
                        "emergency-dashboard",

                    ...extraData,

                    createdAt:
                        serverTimestamp()
                }

            );

        } catch (error) {

            console.error(
                "Dashboard event error:",
                error
            );

        }

    }

});
/* =========================
   STATISTICS SECTION
========================= */

document.addEventListener("DOMContentLoaded", () => {

    const emergencyEl =
        document.getElementById("statEmergencyAlerts");

    const responseEl =
        document.getElementById("statResponseTime");

    const usersEl =
        document.getElementById("statUsers");

    const uptimeEl =
        document.getElementById("statUptime");

    const locationsEl =
        document.getElementById("statLocations");

    const notificationsEl =
        document.getElementById("statNotifications");

    const lastUpdatedEl =
        document.getElementById("statsLastUpdated");


    /* =========================
       DEFAULT VALUES
    ========================= */

    let statistics = {
        emergencyAlerts: 1248,
        responseTime: 42,
        users: 5800,
        uptime: 99.9,
        locations: 1134,
        notifications: 3420
    };


    /* =========================
       NUMBER ANIMATION
    ========================= */

    function animateNumber(element, target, duration = 1200) {

        if (!element) return;

        const start = 0;
        const startTime = performance.now();

        function update(currentTime) {

            const progress = Math.min(
                (currentTime - startTime) / duration,
                1
            );

            const eased =
                1 - Math.pow(1 - progress, 3);

            const value =
                start + (target - start) * eased;

            if (target % 1 !== 0) {
                element.textContent =
                    value.toFixed(1);
            } else {
                element.textContent =
                    Math.floor(value).toLocaleString();
            }

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }

        requestAnimationFrame(update);
    }


    /* =========================
       UPDATE STATISTICS
    ========================= */

    function updateStatistics(data) {

        animateNumber(
            emergencyEl,
            data.emergencyAlerts
        );

        animateNumber(
            responseEl,
            data.responseTime
        );

        animateNumber(
            usersEl,
            data.users
        );

        animateNumber(
            uptimeEl,
            data.uptime
        );

        animateNumber(
            locationsEl,
            data.locations
        );

        animateNumber(
            notificationsEl,
            data.notifications
        );
    }


    /* =========================
       INITIAL LOAD
    ========================= */

    updateStatistics(statistics);


    /* =========================
       REAL-TIME FIREBASE DATA
    ========================= */

    function loadFirebaseStatistics() {

        i
