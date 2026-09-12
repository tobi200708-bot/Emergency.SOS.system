/* =========================================
   EMERGENCY SOS SYSTEM
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const sosButton = document.getElementById("sosButton");
    const mobileSOS = document.getElementById("mobileSOS");
    const heroSOS = document.getElementById("heroSOS");

    const sosModal = document.getElementById("sosModal");
    const closeModal = document.getElementById("closeModal");
    const cancelSOS = document.getElementById("cancelSOS");
    const confirmSOS = document.getElementById("confirmSOS");

    // Open SOS modal
    function openSOSModal() {
        if (sosModal) {
            sosModal.style.display = "flex";
        }
    }

    // Close SOS modal
    function closeSOSModal() {
        if (sosModal) {
            sosModal.style.display = "none";
        }
    }

    sosButton?.addEventListener("click", openSOSModal);
    mobileSOS?.addEventListener("click", openSOSModal);
    heroSOS?.addEventListener("click", openSOSModal);

    closeModal?.addEventListener("click", closeSOSModal);
    cancelSOS?.addEventListener("click", closeSOSModal);

    // Confirm SOS
    confirmSOS?.addEventListener("click", async () => {

        confirmSOS.disabled = true;
        confirmSOS.textContent = "Sending SOS...";

        // Get current location
        if (!navigator.geolocation) {
            alert("Location is not supported by this browser.");
            confirmSOS.disabled = false;
            confirmSOS.textContent = "Confirm SOS";
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {

                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                const accuracy = position.coords.accuracy;

                try {

                    // Firebase
                    const firebase = window.firebaseFunctions;
                    const db = window.firebaseDB;

                    const user = window.firebaseUser || null;

                    if (firebase && db) {

                        await firebase.addDoc(
                            firebase.collection(db, "emergencyAlerts"),
                            {
                                userId: user ? user.uid : "anonymous",
                                status: "ACTIVE",
                                type: "SOS",
                                latitude: latitude,
                                longitude: longitude,
                                accuracy: accuracy,
                                message: "Emergency SOS activated",
                                createdAt: firebase.serverTimestamp()
                            }
                        );
                    }

                    alert(
                        "🚨 SOS ACTIVATED!\n\n" +
                        "Emergency alert has been sent.\n" +
                        "Location: " +
                        latitude.toFixed(6) +
                        ", " +
                        longitude.toFixed(6)
                    );

                    closeSOSModal();

                } catch (error) {

                    console.error("SOS Error:", error);

                    alert(
                        "SOS could not be sent.\n" +
                        "Please try again."
                    );

                } finally {

                    confirmSOS.disabled = false;
                    confirmSOS.textContent = "Confirm SOS";
                }
            },

            (error) => {

                console.error("Location Error:", error);

                alert(
                    "⚠️ Please enable location permission " +
                    "to send the SOS location."
                );

                confirmSOS.disabled = false;
                confirmSOS.textContent = "Confirm SOS";
            },

            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0
            }
        );
    });

    // Close modal when clicking outside
    sosModal?.addEventListener("click", (event) => {
        if (event.target === sosModal) {
            closeSOSModal();
        }
    });

});
