// ==========================================
// SOS CLOUD - NEW SCRIPT.JS
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    // --------------------------------------
    // MOBILE MENU
    // --------------------------------------

    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");

    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", () => {
            navMenu.classList.toggle("active");
        });
    }

    // --------------------------------------
    // CLOSE MENU WHEN LINK CLICKED
    // --------------------------------------

    const navLinks = document.querySelectorAll(".nav-link");

    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            if (navMenu) {
                navMenu.classList.remove("active");
            }
        });
    });

    // --------------------------------------
    // SOS MODAL
    // --------------------------------------

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

    // --------------------------------------
    // CONFIRM SOS
    // --------------------------------------

    if (confirmSOS) {

        confirmSOS.addEventListener("click", async () => {

            confirmSOS.disabled = true;
            confirmSOS.textContent = "SENDING...";

            try {

                // Get current location
                let locationData = null;

                if (navigator.geolocation) {

                    locationData = await new Promise((resolve) => {

                        navigator.geolocation.getCurrentPosition(

                            position => {
                                resolve({
                                    latitude: position.coords.latitude,
                                    longitude: position.coords.longitude,
                                    accuracy: position.coords.accuracy
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

                // Firebase database
                const db = window.firebaseDB;
                const user = window.firebaseUser;

                if (!db) {
                    throw new Error("Firebase database not connected");
                }

                if (!user) {
                    alert("Please Login before activating Emergency SOS.");
                    confirmSOS.disabled = false;
                    confirmSOS.textContent = "CONFIRM SOS";
                    return;
                }

                // Firebase functions
                const functions = window.firebaseFunctions;

                if (!functions || !functions.addDoc) {
                    throw new Error("Firebase functions not available");
                }

                // Create Emergency Alert
                await functions.addDoc(
                    functions.collection(db, "emergencyAlerts"),
                    {
                        userId: user.uid,
                        type: "SOS",
                        status: "ACTIVE",
                        message: "Emergency SOS activated",
                        location: locationData,
                        source: "website",
                        createdAt: functions.serverTimestamp()
                    }
                );

                confirmSOS.textContent = "SOS SENT ✓";

                alert("Emergency SOS sent successfully!");

                setTimeout(() => {
                    closeSOSModal();
                    confirmSOS.disabled = false;
                    confirmSOS.textContent = "CONFIRM SOS";
                }, 1500);

            } catch (error) {

                console.error("SOS Error:", error);

                alert("SOS failed. Please try again.");

                confirmSOS.disabled = false;
                confirmSOS.textContent = "CONFIRM SOS";
            }

        });

    }

    // --------------------------------------
    // CLOSE MODAL WHEN CLICKING OUTSIDE
    // --------------------------------------

    if (sosModal) {

        sosModal.addEventListener("click", (event) => {

            if (event.target === sosModal) {
                closeSOSModal();
            }

        });

    }

    // --------------------------------------
    // ESC KEY
    // --------------------------------------

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {
            closeSOSModal();
        }

    });

    // --------------------------------------
    // SMOOTH SCROLL
    // --------------------------------------

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", function (event) {

            const target = document.querySelector(this.getAttribute("href"));

            if (target) {

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth"
                });

            }

        });

    });

});
