const API_URL_LOG_IN = "https://demo-api-skills.vercel.app/api/FinanceManager/users/login/"


document.getElementById("login").addEventListener("submit", function name(event) {
    event.preventDefault();


    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

        // TODO: 10th specify what request needed for logic(base it from documentation)


    axios.get(API_URL_LOG_IN + email)
    .then(response => {
        const users = response.data;
        console.log(response);
        if (users.password == password) {
            alert("Success!");

            // Store user data
            localStorage.setItem("id", users.id); // Ensure ID is stored separately
            localStorage.setItem("user", JSON.stringify(users)); // Store full user object


            window.location.replace("/pages/User%20Home%20Page/index.html");
        } else {
            alert("Password does not match");
        }
    })
    .catch(error => {
        alert("Login failed");
    });

})
