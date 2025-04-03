document.querySelectorAll(".toggle-password").forEach((toggle) => {
    toggle.addEventListener("click", function () {
        const input = this.previousElementSibling; // This will target the input element
        const icon = this.querySelector("i"); // Target the icon inside the span
        
        // Check if the input type is password, then toggle it
        if (input.type === "password") {
            input.type = "text"; // Show password
            icon.classList.remove("fa-eye");
            icon.classList.add("fa-eye-slash"); // Change to eye-slash
            this.style.color = "white"; // Change icon color (white here)
        } else {
            input.type = "password"; // Hide password
            icon.classList.remove("fa-eye-slash");
            icon.classList.add("fa-eye"); // Change back to normal eye
            this.style.color = "white"; // Reset icon color
        }
    });
});

