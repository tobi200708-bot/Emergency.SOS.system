document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       MOBILE MENU
    ========================================= */

    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");

    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", (event) => {
            event.preventDefault();
            event.stopPropagation();

            navMenu.classList.toggle("active");
            menuToggle.classList.toggle("active");
        });

        // Close menu after clicking a link
        const navLinks = navMenu.querySelectorAll("a");

        navLinks.forEach((link) => {
            link.addEventListener("click", () => {
                navMenu.classList.remove("active");
                menuToggle.classList.remove("active");
            });
        });
    }


    /* =========================================
       SOS MODAL
    ========================================= */

    const sosButton = document.getElementById("sosButton");
    const mobileSOS = document.getElementById("mobileSOS");
    const heroSOS = document.getElementById("heroSOS");

    const sosModal = document.getElementById("sosModal");
    const confirmSOS = document.getElementById("confirmSOS");

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

    if (sosButton) {
        sosButton.addEventListener("click", openSOSModal);
    }

    if (mobileSOS) {
        mobileSOS.addEventListener("click", openSOSModal);
    }

    if (heroSOS) {
        heroSOS.addEventListener("click", openSOSModal);
    }


    /* =========================================
       SOS CONFIRMATION
    ========================================= */

    if (confirmSOS) {

        confirmSOS.addEventListener("click", async () => {

            confirmSOS.disabled = true;
            confirmSOS.textContent = "SENDING...";

            try {

                // Check Firebase login
                const user = window.firebaseUser;

                if (!user) {
                    alert("Please login before activating Emergency SOS.");

                    confirmSOS.disabled = false;
                    confirmSOS.textContent = "CONFIRM SOS";

                    return;
                }


                /* Get Location */

                let locationData = null;

                if ("geolocation" in navigator) {

                    try {

                        const position = await new Promise((resolve, reject) => {

                            navigator.geolocation.getCurrentPosition(
                                resolve,
                                reject,
                                {
                                    enableHighAccuracy: true,
                                    timeout: 10000,
                                    maximumAge: 0
                                }
                            );

                        });

                        locationData = {
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                            accuracy: position.coords.accuracy
                        };

                    } catch (locationError) {

                        console.log("Location unavailable:", locationError);

                    }
                }


                /* Send Alert to Firebase */

                if (
                    window.firebaseFunctions &&
                    typeof window.firebaseFunctions.createEmergencyAlert === "function"
                ) {

                    await window.firebaseFunctions.createEmergencyAlert({
                        userId: user.uid,
                        type: "SOS",
                        status: "ACTIVE",
                        location: locationData,
                        message: "Emergency SOS activated",
                        source: "website"
                    });

                } else {

                    console.warn(
                        "Firebase createEmergencyAlert function not found."
                    );

                }


                confirmSOS.textContent = "SOS SENT ✓";

                alert("Emergency alert successfully created.");

                setTimeout(() => {
                    closeSOSModal();

                    confirmSOS.disabled = false;
                    confirmSOS.textContent = "CONFIRM SOS";

                }, 1500);


            } catch (error) {

                console.error("SOS Error:", error);

                alert("Unable to send SOS. Please try again.");

                confirmSOS.disabled = false;
                confirmSOS.textContent = "CONFIRM SOS";

            }

        });

    }


    /* =========================================
       CLOSE SOS MODAL
    ========================================= */

    if (sosModal) {

        sosModal.addEventListener("click", (event) => {

            if (event.target === sosModal) {
                closeSOSModal();
            }

        });

    }


    /* =========================================
       HERO SOS MODAL
    ========================================= */

    const heroSOSButton = document.getElementById("heroSOSButton");
    const bigSOSButton = document.getElementById("bigSOSButton");

    const heroSOSModal = document.getElementById("heroSOSModal");
    const heroModalConfirm = document.getElementById("heroModalConfirm");

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

    if (heroSOSButton) {
        heroSOSButton.addEventListener("click", openHeroSOSModal);
    }

    if (bigSOSButton) {
        bigSOSButton.addEventListener("click", openHeroSOSModal);
    }


    /* =========================================
       HERO LOCATION
    ========================================= */

    const locationStatus = document.getElementById("locationStatus");

    function getUserLocation() {

        if (!locationStatus) return;

        if (!navigator.geolocation) {

            locationStatus.textContent =
                "Location is not supported by this browser.";

            return;
        }

        locationStatus.textContent =
            "Getting your location...";

        navigator.geolocation.getCurrentPosition(

            (position) => {

                const latitude =
                    position.coords.latitude.toFixed(6);

                const longitude =
                    position.coords.longitude.toFixed(6);

                locationStatus.textContent =
                    `Location detected: ${latitude}, ${longitude}`;

            },

            () => {

                locationStatus.textContent =
                    "Unable to get location.";

            },

            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0
            }

        );

    }


    if (heroModalConfirm) {

        heroModalConfirm.addEventListener("click", () => {

            getUserLocation();

        });

    }


    if (heroSOSModal) {

        heroSOSModal.addEventListener("click", (event) => {

            if (event.target === heroSOSModal) {
                closeHeroSOSModal();
            }

        });

    }


    /* =========================================
       ESC KEY - CLOSE MENUS / MODALS
    ========================================= */

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {

            if (navMenu) {
                navMenu.classList.remove("active");
            }

            if (menuToggle) {
                menuToggle.classList.remove("active");
            }

            closeSOSModal();
            closeHeroSOSModal();

        }

    });

});
