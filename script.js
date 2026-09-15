// ==========================================
// SOS CLOUD - COMPLETE SCRIPT.JS
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    // ======================================
    // MOBILE MENU
    // ======================================

    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");

    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", () => {
            navMenu.classList.toggle("active");
        });
    }

    // Close menu when link is clicked
    document.querySelectorAll(".nav-link").forEach(link => {
        link.addEventListener("click", () => {
            if (navMenu) {
                navMenu.classList.remove("active");
            }
        });
    });


    // ======================================
    // SOS ELEMENTS
    // ======================================

    const sosButton = document.getElementById("sosButton");
    const mobileSOS = document.getElementById("mobileSOS");
    const heroSOS = document.getElementById("heroSOS");

    const heroSOSButton = document.getElementById("heroSOSButton");
    const bigSOSButton = document.getElementById("bigSOSButton");


    // ======================================
    // NORMAL SOS MODAL
    // ======================================

    const sosModal = document.getElementById("sosModal");
    const confirmSOS = document.getElementById("confirmSOS");


    // ======================================
    // HERO SOS MODAL
    // ======================================

    const heroSOSModal = document.getElementById("heroSOSModal");
    const heroModalConfirm =
        document.getElementById("heroModalConfirm");

    const locationStatus =
        document.getElementById("locationStatus");


    // ======================================
    // OPEN / CLOSE NORMAL MODAL
    // ======================================

    function openSOSModal() {

        if (sosModal) {
            sosModal.classList.add("active");
        }

    }

    function closeSOSModal() {

        if (sosModal) {
            sosModal.classList.remove("active");
        }

    }


    // ======================================
    // OPEN / CLOSE HERO MODAL
    // ======================================

    function openHeroSOSModal() {

        if (heroSOSModal) {
            heroSOSModal.classList.add("active");
        }

    }

    function closeHeroSOSModal() {

        if (heroSOSModal) {
            heroSOSModal.classList.remove("active");
        }

    }


    // ======================================
    // NORMAL SOS BUTTONS
    // ======================================

    if (sosButton) {
        sosButton.addEventListener("click", openSOSModal);
    }

    if (mobileSOS) {
        mobileSOS.addEventListener("click", openSOSModal);
    }

    if (heroSOS) {
        heroSOS.addEventListener("click", openSOSModal);
    }


    // ======================================
    // HERO SOS BUTTONS
    // ======================================

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


    // ======================================
    // GET LOCATION
    // ======================================

    function getCurrentLocation() {

        return new Promise((resolve) => {

            if (!navigator.geolocation) {
                resolve(null);
                return;
            }

            navigator.geolocation.getCurrentPosition(

                (position) => {

                    resolve({
                        latitude:
                            position.coords.latitude,

                        longitude:
                            position.coords.longitude,

                        accuracy:
                            position.coords.accuracy
                    });

                },

                () => {
                    resolve(null);
                },

                {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 0
                }

            );

        });

    }


    // ======================================
    // SEND SOS TO FIREBASE
    // ======================================

    async function sendSOS(button, statusElement) {

        if (!button) {
            return;
        }

        button.disabled = true;
        button.textContent = "SENDING...";

        try {

            // --------------------------------
            // Firebase
            // --------------------------------

            const db = window.firebaseDB;
            const user = window.firebaseUser;
            const functions = window.firebaseFunctions;


            // --------------------------------
            // Check Firebase
            // --------------------------------

            if (!db) {
                throw new Error(
                    "Firebase database not connected"
                );
            }


            // --------------------------------
            // Check Login
            // --------------------------------

            if (!user) {

                alert(
                    "Please Login before activating Emergency SOS."
                );

                button.disabled = false;
                button.textContent = "CONFIRM SOS";

                return;
            }


            // --------------------------------
            // Check Firebase Functions
            // --------------------------------

            if (
                !functions ||
                !functions.addDoc ||
                !functions.collection ||
                !functions.serverTimestamp
            ) {

                throw new Error(
                    "Firebase functions not available"
                );

            }


            // --------------------------------
            // Location
            // --------------------------------

            if (statusElement) {
                statusElement.textContent =
                    "Getting your location...";
            }

            const locationData =
                await getCurrentLocation();


            // --------------------------------
            // Send Alert
            // --------------------------------

            await functions.addDoc(

                functions.collection(
                    db,
                    "emergencyAlerts"
                ),

                {

                    userId: user.uid,

                    type: "SOS",

                    status: "ACTIVE",

                    message:
                        "Emergency SOS activated",

                    location:
                        locationData,

                    source:
                        "website",

                    createdAt:
                        functions.serverTimestamp()

                }

            );


            // --------------------------------
            // Success
            // --------------------------------

            button.textContent = "SOS SENT ✓";

            if (statusElement) {
                statusElement.textContent =
                    "Emergency alert successfully created";
            }

            alert(
                "Emergency SOS sent successfully!"
            );


            // --------------------------------
            // Close modal
            // --------------------------------

            setTimeout(() => {

                closeSOSModal();
                closeHeroSOSModal();

                button.disabled = false;

                button.textContent =
                    "CONFIRM SOS";

            }, 1500);


        } catch (error) {

            console.error(
                "SOS Error:",
                error
            );

            alert(
                "SOS failed. Please try again."
            );

            button.disabled = false;

            button.textContent =
                "CONFIRM SOS";

            if (statusElement) {
                statusElement.textContent =
                    "Unable to send emergency alert";
            }

        }

    }


    // ======================================
    // NORMAL CONFIRM SOS
    // ======================================

    if (confirmSOS) {

        confirmSOS.addEventListener(
            "click",
            () => {

                sendSOS(
                    confirmSOS,
                    null
                );

            }
        );

    }


    // ======================================
    // HERO CONFIRM SOS
    // ======================================

    if (heroModalConfirm) {

        heroModalConfirm.addEventListener(
            "click",
            () => {

                sendSOS(
                    heroModalConfirm,
                    locationStatus
                );

            }
        );

    }
