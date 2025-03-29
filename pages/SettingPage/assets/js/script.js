document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector(".mobile-menu-toggle");
    const menuContainer = document.querySelector(".mobile-menu-container");
    const closeButton = document.querySelector(".mobile-menu-close");
    const userIcon = document.querySelector(".user-icon");

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

    function updateNavigation() {
        const user = JSON.parse(localStorage.getItem("user"));
        const loginBtn = document.querySelector(".login-btn");
        const signupBtn = document.querySelector(".signup-btn");
        const aboutUs = document.querySelector("a[href='./pages/AboutPage/index.html']");
        const homeNavItem = document.querySelector("a[href='/index.html']");
        const navBar = document.querySelector(".header-nav ul");

        if (user) {
            document.body.classList.add("user-logged-in");

            if (loginBtn) loginBtn.style.display = "none";
            if (signupBtn) signupBtn.style.display = "none";
            if (aboutUs && aboutUs.parentElement) aboutUs.parentElement.remove();

            let dashboardItem = document.querySelector("#dashboard-link");
            if (!dashboardItem) {
                dashboardItem = document.createElement("li");
                dashboardItem.innerHTML = `<a href="./pages/DashboardPage/index.html" id="dashboard-link">Dashboard</a>`;
                if (homeNavItem && homeNavItem.parentElement) {
                    homeNavItem.parentElement.insertAdjacentElement("afterend", dashboardItem);
                } else {
                    navBar.insertBefore(dashboardItem, navBar.firstChild);
                }
            }

            let financeHubItem = document.querySelector(".dropdown");
            if (!financeHubItem) {
                financeHubItem = document.createElement("li");
                financeHubItem.classList.add("dropdown");
                financeHubItem.innerHTML = `
                    <a href="#">Finance Hub <i class="fas fa-chevron-down"></i></a>
                    <ul class="dropdown-menu">
                        <li><a href="#">Financial Tracker</a></li>
                        <li><a href="#">Financial Goal</a></li>
                    </ul>
                `;
                dashboardItem.insertAdjacentElement("afterend", financeHubItem);
            }

            // SHOW USER ICON
            if (userIcon) {
                userIcon.style.display = "block";
                userIcon.setAttribute("src", user.profileImage || "../../assets/img/Profile Icon.png");

                userIcon.addEventListener("mouseenter", function () {
                    userIcon.style.filter = "brightness(0) saturate(100%) invert(37%) sepia(54%) saturate(533%) hue-rotate(58deg) brightness(92%) contrast(92%)";
                });
            
                userIcon.addEventListener("mouseleave", function () {
                    if (!userIcon.classList.contains("clicked")) {
                        userIcon.style.filter = "none";
                    }
                });
            
                userIcon.addEventListener("click", function () {
                    userIcon.classList.add("clicked");
                    userIcon.style.filter = "brightness(0) saturate(100%) invert(37%) sepia(54%) saturate(533%) hue-rotate(58deg) brightness(92%) contrast(92%)"; // Keep green after click
                });
            }

            // CREATE OR UPDATE LOGOUT ICON
            let logoutIcon = document.querySelector(".logout-icon");
            if (!logoutIcon) {
                logoutIcon = document.createElement("img");
                logoutIcon.className = "logout-icon";
                logoutIcon.src = "../../assets/img/logoutbtn.png";
                logoutIcon.alt = "Logout";
                logoutIcon.style.cursor = "pointer";
                logoutIcon.style.width = "25px"; // Adjust size to match user icon
                logoutIcon.style.height = "25px";
                logoutIcon.style.position = "absolute";
                logoutIcon.style.right = "85px"; /* Move it away from the edge */
                logoutIcon.style.top = "33%";
                
                logoutIcon.addEventListener("mouseenter", function () {
                    logoutIcon.style.filter = "brightness(0) saturate(100%) invert(37%) sepia(54%) saturate(533%) hue-rotate(58deg) brightness(92%) contrast(92%)";
                });

                logoutIcon.addEventListener("mouseleave", function () {
                    if (!logoutIcon.classList.contains("clicked")) {
                        logoutIcon.style.filter = "none";
                    }
                });

                logoutIcon.addEventListener("click", function () {
                    localStorage.removeItem("user");
                    window.location.reload();
                });

                logoutIcon.addEventListener("click", function () {
                    logoutIcon.classList.add("clicked");
                    logoutIcon.style.filter = "brightness(0) saturate(100%) invert(37%) sepia(54%) saturate(533%) hue-rotate(58deg) brightness(92%) contrast(92%)"; // Keep green after click
                    localStorage.removeItem("user");
                    window.location.reload();
                });
                
                let logoutContainer = document.createElement("li");
                logoutContainer.appendChild(logoutIcon);
                navBar.appendChild(logoutContainer);
            }

            let settingsMenu = document.querySelector(".settings-menu");
            if (settingsMenu) {
 settingsMenu.style.display = "block"; // Show Settings option in hamburger menu
}


        } else {
            let dashboardItem = document.querySelector("#dashboard-link");
            if (dashboardItem) dashboardItem.parentElement.remove();

            let financeHubItem = document.querySelector(".dropdown");
            if (financeHubItem) financeHubItem.remove();

            if (userIcon) userIcon.style.display = "none";

            let logoutIcon = document.querySelector(".logout-icon");
            if (logoutIcon) logoutIcon.parentElement.remove();

            if (settingsMenu) {
                settingsMenu.style.display = "none"; // Hide Settings option when logged out
            }
            
        }
    }

    updateNavigation();
});
