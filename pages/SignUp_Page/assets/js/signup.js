// TODO: 3rd add api needed
const API_URL_SIGN_UP = "https://demo-api-skills.vercel.app/api/FinanceManager/users"

// TODO: 6th add event listener to the button using the id of button for submit
document.getElementById("signUp").addEventListener("submit", function name(event) {
    event.preventDefault();

    // TODO: 7th get information from html
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmationPassword = document.getElementById("confirmationPassword").value;

    // TODO: 8th Logic
    if (password != confirmationPassword) {
        alert("Password Does Not Match");
        return;
    }

    // TODO: 9th Axios integration
    axios
        // TODO: 10th specify what request needed for logic(base it from documentation)
        .post(API_URL_SIGN_UP,
            {
                email: email,
                name: `${firstName}, ${lastName}`,
                password: password
            }
        )
        // TODO: 11th set what will happen when success
        .then(response => {
            console.log(response);
            alert("User added successfully!");
            document.getElementById("signUp").reset();
            // TODO: Bonus: this code will ridirect page to the other page
            window.location.replace("/pages/LoginPage/index.html");
        })
        // TODO: 12th set what will happen when failed
        .catch(error => {
            alert("Error adding user, please check console for more information");
            console.error("Error:", error);
        })
    
})