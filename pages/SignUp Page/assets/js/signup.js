const API_URL_SIGN_UP = "https://demo-api-skills.vercel.app/api/FinanceManager/users";

// Attach event listener to the form
document.getElementById("signUp").addEventListener("submit", function (event) {
    event.preventDefault();

    // Get information from HTML inputs
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmationPassword = document.getElementById("confirmationPassword").value;

    // Check if passwords match
    if (password !== confirmationPassword) {
        alert("Password Does Not Match");
        return;
    }

    // Axios POST request to sign-up API
    axios.post(API_URL_SIGN_UP, {
        email: email,
        name: `${firstName} ${lastName}`, // Adjusted name format
        password: password
    })
    .then(response => {
        console.log(response);
        alert("User added successfully!");
        document.getElementById("signUp").reset(); // Reset the form
        window.location.replace("/pages/LogIn%20Page/index.html"); // Redirect
    })
    .catch(error => {
        alert("Error adding user, please check console for more information");
        console.error("Error:", error);
    });
});
