/* =========================================================
   SOS CLOUD - SCRIPT.JS
   Emergency Response System
========================================================= */


/* =========================================================
   MOBILE NAVIGATION
========================================================= */

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
        navMenu.classList.toggle("active");
        menuToggle.classList.toggle("active");
    });
}


/* Close mobile menu when clicking navigation link */

const navLinks = document.querySelectorAll(".nav-link");

navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        if (navMenu) {
            navMenu.classList.remove("active");
        }

        if (menuToggle) {
            menuToggle.classList.remove("active");
        }
    });
});


/* =========================================================
   NORMAL SOS MODAL
========================================================= */

const sosButton = document.getElementById("sosButton");
const mobileSOS = document.getElementById("mobileSOS");

const sosModal = document.getElementById("sosModal");
const closeModal = document.getElementById("closeModal");
const cancelSOS = document.getElementById("cancelSOS");
const confirmSOS = document.getElementById("confirmSOS");


function openSOSModal() {
    if (sosModal) {
        sosModal.classList.add("active");
        document.body.style.overflow = "hidden";
    }
}


function closeSOSModal() {
    if (sosModal) {
        sosModal.classList.remove("active");
        document.body.style.overflow = "";
    }
}


if (sosButton) {
    sosButton.addEventListener("click", openSOSModal);
}


if (mobileSOS) {
    mobileSOS.addEventListener("click", () => {
        if (navMenu) {
            navMenu.classList.remove("active");
        }

        openSOSModal();
    });
}


if (closeModal) {
    closeModal.addEventListener("click", closeSOSModal);
}


if (cancelSOS) {
    cancelSOS.addEventListener("click", closeSOSModal);
}


/* =========================================================
   GET USER LOCATION
========================================================= */

function getUserLocation() {

    return new Promise((resolve, reject) => {

        if (!navigator.geolocation) {
            reject(new Error("Geolocation is not supported."));
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {

                resolve({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    accuracy: position.coords.accuracy
                });

            },

            (error) => {

                let message = "Unable to get your location.";

                switch (error.code) {

                    case error.PERMISSION_DENIED:
                        message = "Location permission was denied.";
                        break;

                    case error.POSITION_UNAVAILABLE:
                        message = "Location information is unavailable.";
                        break;

                    case error.TIMEOUT:
                        message = "Location request timed out.";
                        break;
                }

                reject(new Error(message));
            },

            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0
            }
        );
    });
}


/* =========================================================
   SEND SOS TO FIRESTORE
========================================================= */

async function sendSOS(source = "website") {

    try {

        /* Check Firebase */

        if (!window.firebaseDB) {
            throw new Error("Firebase database is not connected.");
        }


        /* Check login */

        if (!window.firebaseUser) {
            alert("Please login before activating Emergency SOS.");
            return;
        }


        /* Get location */

        let location = null;

        try {
            location = await getUserLocation();
        } catch (locationError) {
            console.warn("Location error:", locationError.message);
        }


        /* Emergency data */

        const emergencyData = {

            userId: window.firebaseUser.uid,

            type: "SOS",

            status: "ACTIVE",

            message: "Emergency SOS activated",

            source: source,

            createdAt: window.firebaseFunctions.serverTimestamp(),

            location: location

        };


        /* Save to Firestore */

        const docRef = await window.firebaseFunctions.addDoc(
            window.firebaseFunctions.collection(
                window.firebaseDB,
                "emergencyAlerts"
            ),
            emergencyData
        );


        console.log("SOS created:", docRef.id);


        alert("Emergency SOS sent successfully!");


        return docRef.id;

    } catch (error) {

        console.error("SOS Error:", error);

        alert(
            "Unable to send SOS.\n\n" +
            error.message
        );

        throw error;
    }
}


/* =========================================================
   NORMAL SOS CONFIRMATION
========================================================= */

if (confirmSOS) {

    confirmSOS.addEventListener("click", async () => {

        confirmSOS.disabled = true;

        const originalText = confirmSOS.textContent;

        confirmSOS.textContent = "SENDING...";


        try {

            await sendSOS("navbar");

            closeSOSModal();

        } catch (error) {

            console.error(error);

        } finally {

            confirmSOS.disabled = false;

            confirmSOS.textContent = originalText;
        }

    });

}


/* =========================================================
   HERO SOS MODAL
========================================================= */

const heroSOSButton = document.getElementById("heroSOSButton");
const bigSOSButton = document.getElementById("bigSOSButton");

const heroSOSModal = document.getElementById("heroSOSModal");

const heroModalClose = document.getElementById("heroModalClose");
const heroModalCancel = document.getElementById("heroModalCancel");
const heroModalConfirm = document.getElementById("heroModalConfirm");

const locationStatus = document.getElementById("locationStatus");


function openHeroSOSModal() {

    if (!heroSOSModal) return;

    heroSOSModal.classList.add("active");

    document.body.style.overflow = "hidden";


    if (locationStatus) {

        locationStatus.textContent =
            "📍 Detecting your location...";

        locationStatus.className = "location-status";

    }


    /* Automatically check location */

    getUserLocation()

        .then((location) => {

            if (locationStatus) {

                locationStatus.textContent =
                    `📍 Location detected (±${Math.round(location.accuracy)}m)`;

                locationStatus.classList.add(
                    "location-success"
                );
            }

        })

        .catch((error) => {

            console.warn(error);

            if (locationStatus) {

                locationStatus.textContent =
                    "⚠️ Location unavailable";

                locationStatus.classList.add(
                    "location-error"
                );
            }

        });
}


function closeHeroSOSModal() {

    if (!heroSOSModal) return;

    heroSOSModal.classList.remove("active");

    document.body.style.overflow = "";
}


if (heroSOSButton) {

    heroSOSButton.addEventListener(
        "click",
        openHeroSOSModal
    );
}


if (bigSOSButton) {

    bigSOSButton.addEventListener(
        "click",
        openHeroSOSModal
    );
}


if (heroModalClose) {

    heroModalClose.addEventListener(
        "click",
        closeHeroSOSModal
    );
}


if (heroModalCancel) {

    heroModalCancel.addEventListener(
        "click",
        closeHeroSOSModal
    );
}


/* =========================================================
   HERO SOS SEND
========================================================= */

if (heroModalConfirm) {

    heroModalConfirm.addEventListener(
        "click",
        async () => {

            heroModalConfirm.disabled = true;

            const originalText =
                heroModalConfirm.textContent;

            heroModalConfirm.textContent =
                "SENDING...";


            try {

                await sendSOS("hero-section");


                heroModalConfirm.textContent =
                    "SOS SENT ✓";


                if (locationStatus) {

                    locationStatus.textContent =
                        "✓ Emergency alert successfully created";

                    locationStatus.classList.add(
                        "location-success"
                    );
                }


                setTimeout(() => {

                    closeHeroSOSModal();

                    heroModalConfirm.textContent =
                        originalText;

                }, 1500);


            } catch (error) {

                console.error(error);

                heroModalConfirm.textContent =
                    originalText;

            } finally {

                heroModalConfirm.disabled = false;
            }

        }
    );
}


/* =========================================================
   CLOSE MODALS WHEN CLICKING OUTSIDE
========================================================= */

if (sosModal) {

    sosModal.addEventListener("click", (event) => {

        if (event.target === sosModal) {
            closeSOSModal();
        }

    });
}


if (heroSOSModal) {

    heroSOSModal.addEventListener("click", (event) => {

        if (event.target === heroSOSModal) {
            closeHeroSOSModal();
        }

    });
}


/* =========================================================
   ESC KEY - CLOSE MODALS
========================================================= */

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

        closeSOSModal();
        closeHeroSOSModal();

    }

});


/* =========================================================
   LIVE RESPONSE TIME
========================================================= */

const responseTime =
    document.getElementById("responseTime");


const responseValues = [
    "< 5s",
    "< 4s",
    "< 3s",
    "< 5s"
];


let responseIndex = 0;


function updateResponseTime() {

    if (!responseTime) return;

    responseTime.textContent =
        responseValues[responseIndex];

    responseIndex++;

    if (responseIndex >= responseValues.length) {
        responseIndex = 0;
    }
}


setInterval(updateResponseTime, 4000);


/* =========================================================
   LIVE PROGRESS BAR
========================================================= */

const progressBar =
    document.querySelector(".progress-bar");


if (progressBar) {

    let progress = 75;

    setInterval(() => {

        if (progress < 95) {

            progress++;

            progressBar.style.width =
                progress + "%";

        } else {

            progress = 75;

            progressBar.style.width =
                progress + "%";
        }

    }, 3000);
}


/* =========================================================
   FIRESTORE LIVE EMERGENCY STATUS
========================================================= */

function listenForEmergencyStatus() {

    if (!window.firebaseDB) {
        console.log(
            "Firebase DB not available yet."
        );
        return;
    }


    try {

        const alertsRef =
            window.firebaseFunctions.collection(
                window.firebaseDB,
                "emergencyAlerts"
            );


        const activeAlertsQuery =
            window.firebaseFunctions.query(

                alertsRef,

                window.firebaseFunctions.where(
                    "status",
                    "==",
                    "ACTIVE"
                ),

                window.firebaseFunctions.orderBy(
                    "createdAt",
                    "desc"
                ),

                window.firebaseFunctions.limit(1)

            );


        window.firebaseFunctions.onSnapshot(
            activeAlertsQuery,

            (snapshot) => {

                if (!snapshot.empty) {

                    const latestAlert =
                        snapshot.docs[0].data();

                    console.log(
                        "Active Emergency:",
                        latestAlert
                    );


                    updateLiveEmergencyUI(
                        latestAlert
                    );

                }

            },

            (error) => {

                console.warn(
                    "Live status error:",
                    error
                );

            }
        );

    } catch (error) {

        console.error(
            "Firestore listener error:",
            error
        );

    }
}


/* =========================================================
   UPDATE LIVE EMERGENCY UI
========================================================= */

function updateLiveEmergencyUI(alert) {

    const liveStatus =
        document.querySelector(".ps-live-status");


    if (liveStatus) {

        const text =
            liveStatus.querySelector(
                "span:last-child"
            );

        if (text) {

            text.textContent =
                "Emergency network active";
        }

    }


    const networkStatus =
        document.querySelector(".live-status");


    if (networkStatus) {

        networkStatus.classList.add("active");

    }

}


/* =========================================================
   START FIREBASE LIVE LISTENER
========================================================= */

function startFirebaseFeatures() {

    if (
        window.firebaseDB &&
        window.firebaseFunctions
    ) {

        console.log(
            "Firebase connected successfully."
        );

        listenForEmergencyStatus();

    } else {

        setTimeout(
            startFirebaseFeatures,
            1000
        );

    }
}


startFirebaseFeatures();


/* =========================================================
   LOGIN BUTTON
========================================================= */

const loginBtn =
    document.getElementById("loginBtn");


if (loginBtn) {

    loginBtn.addEventListener(
        "click",
        () => {

            if (window.firebaseUser) {

                alert(
                    "You are already logged in."
                );

            } else {

                alert(
                    "Please configure Firebase Authentication."
                );

            }

        }
    );

}


/* =========================================================
   QR CODE GENERATION
========================================================= */

const generateQRButton =
    document.getElementById("generateQR");


function generateQRCode() {

    const qrContainer =
        document.getElementById(
            "emergencyQRCode"
        );


    if (!qrContainer) return;


    qrContainer.innerHTML = "";


    const emergencyURL =
        window.location.href;


    /* Use QRCode library if available */

    if (typeof QRCode !== "undefined") {

        new QRCode(qrContainer, {

            text: emergencyURL,

            width: 180,

            height: 180,

            correctLevel:
                QRCode.CorrectLevel.H

        });

    } else {

        qrContainer.innerHTML = `
            <div style="
                padding:20px;
                text-align:center;
                color:#fff;
                font-size:14px;
            ">
                QR library not loaded.
                <br>
                Please add QRCode.js.
            </div>
        `;

    }

}


if (generateQRButton) {

    generateQRButton.addEventListener(
        "click",
        generateQRCode
    );

}


/* =========================================================
   NAVBAR SCROLL EFFECT
========================================================= */

const navbar =
    document.querySelector(".navbar");


window.addEventListener(
    "scroll",
    () => {

        if (!navbar) return;

        if (window.scrollY > 30) {

            navbar.classList.add(
                "scrolled"
            );

        } else {

            navbar.classList.remove(
                "scrolled"
            );

        }

    }
);


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

const sections =
    document.querySelectorAll(
        "section[id]"
    );


function updateActiveNav() {

    let currentSection = "";


    sections.forEach((section) => {

        const sectionTop =
            section.offsetTop - 150;

        const sectionHeight =
            section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY <
                sectionTop + sectionHeight
        ) {

            currentSection =
                section.getAttribute("id");

        }

    });


    navLinks.forEach((link) => {

        link.classList.remove("active");


        const href =
            link.getAttribute("href");


        if (
            href === "#" + currentSection
        ) {

            link.classList.add("active");

        }

    });

}


window.addEventListener(
    "scroll",
    updateActiveNav
);


/* =========================================================
   SMOOTH SCROLL
========================================================= */

document.querySelectorAll(
    'a[href^="#"]'
).forEach((anchor) => {

    anchor.addEventListener(
        "click",
        function (event) {

            const targetID =
                this.getAttribute("href");

            if (
                !targetID ||
                targetID === "#"
            ) {
                return;
            }


            const target =
                document.querySelector(
                    targetID
                );


            if (target) {

                event.preventDefault();


                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        }
    );

});


/* =========================================================
   BUTTON RIPPLE EFFECT
========================================================= */

const buttons =
    document.querySelectorAll(
        "button"
    );


buttons.forEach((button) => {

    button.addEventListener(
        "click",
        () => {

            button.classList.add(
                "clicked"
            );


            setTimeout(() => {

                button.classList.remove(
                    "clicked"
                );

            }, 200);

        }
    );

});


/* =========================================================
   PAGE LOAD
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        console.log(
            "SOS Cloud Emergency System loaded."
        );

        updateActiveNav();

    }
);
