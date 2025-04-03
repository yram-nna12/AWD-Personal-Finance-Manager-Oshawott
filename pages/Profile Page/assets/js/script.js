document.addEventListener("DOMContentLoaded", () => {
    updateProfileUI(); // Load profile details on page load

    // Listen for storage changes to dynamically update UI
    window.addEventListener("storage", updateProfileUI);
});

function updateProfileUI() {
    const userNameElement = document.getElementById("userName");
    const fullNameElement = document.getElementById("fullName");
    const emailElement = document.getElementById("email");

    // Retrieve latest user data from localStorage
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
        userNameElement.textContent = "Guest"; // Default name if no user found
        fullNameElement.textContent = "Not available";
        emailElement.textContent = "Not available";
        return;
    }

    const userData = JSON.parse(storedUser);

    // Handle name formatting (remove unnecessary commas)
    let fullName = userData.name ? userData.name.replace(/,\s?/g, " ") : "User";
    let firstName = fullName.split(" ")[0]; // Extract first name

    // Update UI elements
    userNameElement.textContent = firstName;
    fullNameElement.textContent = fullName;
    emailElement.textContent = userData.email || "No email provided";
}

/* Edit Bio Functionality */
document.addEventListener("DOMContentLoaded", function () {
    const savedBio = localStorage.getItem("userBio");
    const bioText = document.getElementById("bioText");

    if (savedBio) {
        bioText.textContent = savedBio;
    }
});

function openBioModal() {
    document.getElementById("bioModal").style.display = "flex";
    document.getElementById("bioInput").value = document.getElementById("bioText").textContent;
}

function saveBio() {
    let newBio = document.getElementById("bioInput").value.trim();
    const bioText = document.getElementById("bioText");

    if (newBio === "") {
        newBio = 'Click "Edit Bio" to add a description...'; // Reset to default text
    }

    bioText.textContent = newBio;
    localStorage.setItem("userBio", newBio); // Save to localStorage
    closeBioModal();
}

function closeBioModal() {
    document.getElementById("bioModal").style.display = "none";
}
