const API_URL_UPDATE_DETAILS = "https://demo-api-skills.vercel.app/api/FinanceManager/users/";

document.addEventListener("DOMContentLoaded", function () {
    const updateButton = document.querySelector(".update-btn");

    // Load user details when the page loads
    loadUserDetails();

    updateButton.addEventListener("click", async function () {
        updateButton.disabled = true;
        updateButton.textContent = "Updating...";

        const userId = getUserId();
        if (!userId) {
            alert("User ID not found. Please log in again.");
            window.location.href = "/pages/LogIn Page/index.html";
            return;
        }

        const firstName = document.getElementById("firstName").value.trim();
        const lastName = document.getElementById("lastName").value.trim();

        if (!firstName || !lastName) {
            alert("First Name and Last Name cannot be empty.");
            resetButton();
            return;
        }

        const updatedData = { name: `${firstName} ${lastName}` };

        try {
            const response = await fetch(`${API_URL_UPDATE_DETAILS}${userId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedData),
            });

            if (response.ok) {
                alert("Profile updated successfully!");

                // Save the updated name in localStorage and refresh form
                saveUserDetails(updatedData);
                loadUserDetails();
            } else {
                alert("Failed to update profile. Please try again.");
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("An error occurred. Please try again later.");
        } finally {
            resetButton();
        }
    });

    function getUserId() {
        return localStorage.getItem("id") || null;
    }

    function loadUserDetails() {
        const user = localStorage.getItem("user");
        if (user) {
            try {
                const userData = JSON.parse(user);
                const [firstName, lastName] = userData.name.split(" ");

                document.getElementById("firstName").value = firstName || "";
                document.getElementById("lastName").value = lastName || "";
            } catch (error) {
                console.error("Error loading user details:", error);
            }
        }
    }

    function saveUserDetails(updatedData) {
        let storedUser = localStorage.getItem("user");
        let userData = storedUser ? JSON.parse(storedUser) : {};
    
        // Preserve email if it already exists
        updatedData.email = userData.email || "No email provided";
    
        // Save updated data
        localStorage.setItem("user", JSON.stringify(updatedData));
    }
    

    function resetButton() {
        updateButton.disabled = false;
        updateButton.textContent = "Update Account";
    }
});
