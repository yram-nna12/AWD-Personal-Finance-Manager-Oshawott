const API_URL_DELETE_ACCOUNT = "https://demo-api-skills.vercel.app/api/FinanceManager/users/";

document.addEventListener("DOMContentLoaded", function () {
    const deleteButton = document.querySelector(".delete-btn");

    deleteButton.addEventListener("click", async function () {
        const userId = getUserId();
        if (!userId) {
            alert("User ID not found. Please log in again.");
            window.location.href = "/pages/LogIn Page/index.html";
            return;
        }

        // Confirm before deleting the account
        const confirmDelete = confirm("Are you sure you want to delete your account? This action cannot be undone.");
        if (!confirmDelete) return;

        try {
            const response = await fetch(`${API_URL_DELETE_ACCOUNT}${userId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const responseData = await response.json();
            console.log("API Response:", responseData); // Debugging log

            if (response.ok) {
                alert("Account deleted successfully!");

                // Clear user data and redirect to login page
                localStorage.removeItem("user");
                localStorage.removeItem("id");
                window.location.href = "/pages/LogIn Page/index.html";
            } else {
                alert(`Failed to delete account: ${responseData.message || "Please try again."}`);
            }
        } catch (error) {
            console.error("Error deleting account:", error);
            alert("An error occurred. Please try again later.");
        }
    });

    function getUserId() {
        const user = localStorage.getItem("user");
        try {
            return user ? JSON.parse(user).id : localStorage.getItem("id");
        } catch (error) {
            console.error("Error parsing user ID:", error);
            return null;
        }
    }
});
