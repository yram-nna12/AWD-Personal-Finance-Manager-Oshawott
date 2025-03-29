




document.addEventListener("DOMContentLoaded", () => {
    const userNameElement = document.getElementById("userName");

    // Retrieve user data from localStorage
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
        userNameElement.textContent = "Guest"; // Default if no user data
        return;
    }

    // Parse stored JSON data
    const userData = JSON.parse(storedUser);

    // Extract first name
    const fullName = userData.name || "User"; // Default if name is missing
    const firstName = fullName.split(",")[0].trim(); // Extract first part and remove any comma

    // Display first name without comma
    userNameElement.textContent = firstName;
});


/* Personal Information */
/* Personal Information */

document.addEventListener("DOMContentLoaded", () => {
    const fullNameElement = document.getElementById("fullName");
    const emailElement = document.getElementById("email");
    const sexElement = document.getElementById("sex"); // Make sure this ID matches your HTML

    // Retrieve user data from localStorage
    const storedUser = localStorage.getItem("user");

    if (!storedUser) return; // If no user data, keep fields empty

    // Parse stored JSON data
    const userData = JSON.parse(storedUser);

    // Remove comma if accidentally stored in last name format
    let fullName = userData.name ? userData.name.replace(/,\s?/g, " ") : "";

    // Update values dynamically
    fullNameElement.textContent = fullName;
    emailElement.textContent = userData.email || "";
    sexElement.textContent = userData.sex || ""; // FIXED: Changed genderElement to sexElement
});



// edit bio
document.addEventListener("DOMContentLoaded", function () {
    // Load saved bio from localStorage
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