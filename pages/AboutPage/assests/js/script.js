document.addEventListener("DOMContentLoaded", function () {
    // Mobile Menu Logic
    const menuToggle = document.querySelector(".mobile-menu-toggle");
    const menuContainer = document.querySelector(".mobile-menu-container");
    const closeButton = document.querySelector(".mobile-menu-close");

    if (menuToggle && menuContainer && closeButton) {
        menuToggle.addEventListener("click", function () {
            menuContainer.classList.toggle("open");
        });

        closeButton.addEventListener("click", function () {
            menuContainer.classList.remove("open");
        });

        document.addEventListener("click", function (event) {
            if (!menuContainer.contains(event.target) && !menuToggle.contains(event.target)) {
                menuContainer.classList.remove("open");
            }
        });
    }

    // Navigation Logic for Logged-in Users
    const loginBtn = document.querySelector(".login-btn");
    const signupBtn = document.querySelector(".signup-btn");
    const aboutUs = document.querySelector("a[href='./pages/AboutPage/index.html']"); // Select "About Us"
    const homeNavItem = document.querySelector("a[href='/index.html']"); // Select "Home"
    const navBar = document.querySelector(".header-nav ul");

    function updateNavigation() {
        const user = JSON.parse(localStorage.getItem("user")); // Retrieve stored user data

        if (user) {
            // Remove Login & Sign Up buttons if they exist
            if (loginBtn) loginBtn.style.display = "none";
            if (signupBtn) signupBtn.style.display = "none";

            // Remove "About Us" if it exists
            if (aboutUs && aboutUs.parentElement) {
                aboutUs.parentElement.remove();
            }

            // Add Dashboard dynamically after Home
            let dashboardItem = document.querySelector("#dashboard-link");
            if (!dashboardItem) {
                dashboardItem = document.createElement("li");
                dashboardItem.innerHTML = `<a href="./pages/DashboardPage/index.html" id="dashboard-link">Dashboard</a>`;

                // Insert Dashboard right **after** Home
                if (homeNavItem && homeNavItem.parentElement) {
                    homeNavItem.parentElement.insertAdjacentElement("afterend", dashboardItem);
                } else {
                    navBar.insertBefore(dashboardItem, navBar.firstChild);
                }
            }

            // Add Finance Hub dynamically right after Dashboard
            let financeHubItem = document.querySelector(".dropdown");
            if (!financeHubItem) {
                financeHubItem = document.createElement("li");
                financeHubItem.classList.add("dropdown");
                financeHubItem.innerHTML = `
                    <a href="#">Finance Hub <i class="fas fa-chevron-down"></i></a>
                    <ul class="dropdown-menu">
                        <li><a href="#">Budget</a></li>
                        <li><a href="#">Expense</a></li>
                        <li><a href="#">Goals</a></li>
                        <li><a href="#">Report</a></li>
                    </ul>
                `;

                // Insert Finance Hub **right after Dashboard**
                dashboardItem.insertAdjacentElement("afterend", financeHubItem);
            }

            // Add Profile and Logout
            let profileItem = document.createElement("li");
            profileItem.innerHTML = `<span class="welcome-text">Welcome, ${user.name.split(",")[0]}</span>`;

            let logoutItem = document.createElement("li");
            logoutItem.innerHTML = `<a href="#" class="btn logout-btn">Logout</a>`;
            logoutItem.addEventListener("click", function () {
                localStorage.removeItem("user");
                window.location.reload();
            });

            navBar.appendChild(profileItem);
            navBar.appendChild(logoutItem);
        } else {
            // Remove Dashboard for new users
            let dashboardItem = document.querySelector("#dashboard-link");
            if (dashboardItem) {
                dashboardItem.parentElement.remove();
            }

            // Remove Finance Hub for new users
            let financeHubItem = document.querySelector(".dropdown");
            if (financeHubItem) {
                financeHubItem.remove();
            }
        }
    }

    updateNavigation();
});

