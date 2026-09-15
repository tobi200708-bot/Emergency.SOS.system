// =====================================================
// SOS CLOUD - SCRIPT.JS
// =====================================================

document.addEventListener("DOMContentLoaded", () => {

    // =================================================
    // MOBILE MENU
    // =================================================

    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");

    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", () => {
            navMenu.classList.toggle("active");
        });
    }

    document.querySelectorAll(".nav-link").forEach(link => {
        link.addEventListener("click", () => {
            if (navMenu) {
                navMenu.classList.remove("active");
            }
        });
    });


    // =================================================
    // NORMAL SOS
    // =================================================

    const sosButton = document.getElementById("sosButton");
    const mobileSOS = document.getElementById("mobileSOS");

    const sosModal = document.getElementById("sosModal");
    const confirmSOS = document.getElementById("confirmSOS");


    function openSOS() {
        if (sosModal) {
            sosModal.classList.add("active");
        }
    }

    function closeSOS() {
        if (sosModal) {
            sosModal.classList.remove("active");
        }
    }


    if (sosButton) {
        sosButton.addEventListener("click", openSOS);
    }

    if (mobileSOS) {
        mobileSOS.addEventListener("click", openSOS);
    }


    // =================================================
    // HERO SOS
    // =================================================

    const heroSOSButton =
        document.getElementById("heroSOSButton");

    const heroSOSModal =
        document.getElementById("heroSOSModal");

    const heroModalConfirm =
        document.getElementById("heroModalConfirm");

    const locationStatus =
        document.getElementById("locationStatus");


    function openHeroSOS() {
        if (heroSOSModal) {
            heroSOSModal.classList.add("active");
        }
    }

    function closeHeroSOS() {
        if (heroSOSModal) {
            heroSOSModal.classList.remove("active");
        }
    }


    if (heroSOSButton) {
        heroSOSButton.addEventListener(
            "click",
            openHeroSOS
        );
    }


    // =================================================
    // GET LOCATION
    // =================================================

    function getLocation() {

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


    // =================================================
    // SEND SOS
    // =================================================

    async function sendSOS(button, statusElement) {

        if (!button) return;

        button.disabled = true;
        button.textContent = "SENDING...";

        try {

            const db = window.firebaseDB;
            const user = window.firebaseUser;
            const firebaseFunctions =
                window.firebaseFunctions;


            // Firebase check
            if (!db) {
                throw new Error(
                    "Firebase database not connected"
                );
            }


            // Login check
            if (!user) {

                alert(
                    "Please Login before activating Emergency SOS."
                );

                button.disabled = false;
                button.textContent = "CONFIRM SOS";

                return;
            }


            // Firebase functions check
            if (
                !firebaseFunctions ||
                !firebaseFunctions.addDoc ||
                !firebaseFunctions.collection ||
                !firebaseFunctions.serverTimestamp
            ) {
                throw new Error(
                    "Firebase functions not available"
                );
            }


            // Location
            if (statusElement) {
                statusElement.textContent =
                    "Getting your location...";
            }

            const locationData =
                await getLocation();


            // Firestore
            await firebaseFunctions.addDoc(

                firebaseFunctions.collection(
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
                        firebaseFunctions.serverTimestamp()
                }
            );


            // Success
            button.textContent = "SOS SENT ✓";

            if (statusElement) {
                statusElement.textContent =
                    "Emergency alert successfully created";
            }

            alert(
                "Emergency SOS sent successfully!"
            );


            setTimeout(() => {

                closeSOS();
                closeHeroSOS();

                button.disabled = false;
                button.textContent = "CONFIRM SOS";

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
            button.textContent = "CONFIRM SOS";

            if (statusElement) {
                statusElement.textContent =
                    "Unable to send emergency alert";
            }
        }
    }


    // =================================================
    // NORMAL CONFIRM BUTTON
    // =================================================

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


    // =================================================
    // HERO CONFIRM BUTTON
    // =================================================

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


    // =================================================
    // CLOSE MODALS
    // =================================================

    if (sosModal) {

        sosModal.addEventListener(
            "click",
            (event) => {

                if (event.target === sosModal) {
                    closeSOS();
                }

            }
        );

    }


    if (heroSOSModal) {

        heroSOSModal.addEventListener(
            "click",
            (event) => {

                if (event.target === heroSOSModal) {
                    closeHeroSOS();
                }

            }
        );

    }


    // =================================================
    // ESC KEY
    // =================================================

    document.addEventListener(
        "keydown",
        (event) => {

            if (event.key === "Escape") {
                closeSOS();
                closeHeroSOS();
            }

        }
    );


    // =================================================
    // CONSOLE
    // =================================================

    console.log(
        "SOS Cloud script loaded successfully"
    );

});
