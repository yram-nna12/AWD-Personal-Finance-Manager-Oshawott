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
            
            userIcon.addEventListener("mouseenter", function () {
                userIcon.style.filter = "brightness(0) saturate(100%) invert(37%) sepia(54%) saturate(533%) hue-rotate(58deg) brightness(92%) contrast(92%)";
            });
        
            userIcon.addEventListener("mouseleave", function () {
                if (!userIcon.classList.contains("clicked")) {
                    userIcon.style.filter = "none";
                }
            });

            if (loginBtn) loginBtn.style.display = "none";
            if (signupBtn) signupBtn.style.display = "none";
            if (aboutUs && aboutUs.parentElement) aboutUs.parentElement.remove();

            let financeHubItem = document.querySelector(".dropdown");
            if (!financeHubItem) {
                financeHubItem = document.createElement("li");
                financeHubItem.classList.add("dropdown");
                financeHubItem.innerHTML = `
                    <a href="#">Finance Hub <i class="fas fa-chevron-down"></i></a>
                    <ul class="dropdown-menu">
                        <li><a href="../../../Financial-Tracker-Page/index.html">Financial Tracker</a></li>
                        <li><a href="/pages/Financial_Goals/index.html">Financial Goal</a></li>
                    </ul>
                `;
                navBar.appendChild(financeHubItem);
            }

            if (userIcon) {
                userIcon.style.display = "block";
                userIcon.setAttribute("src", user.profileImage || "../../assets/img/Profile Icon.png");
            }

            let logoutIcon = document.querySelector(".logout-icon");
            if (!logoutIcon) {
                logoutIcon = document.createElement("img");
                logoutIcon.className = "logout-icon";
                logoutIcon.src = "../../assets/img/logoutbtn.png";
                logoutIcon.alt = "Logout";
                logoutIcon.style.cursor = "pointer";
                logoutIcon.style.width = "20px";
                logoutIcon.style.height = "25px";
                logoutIcon.style.position = "absolute";
                logoutIcon.style.right = "85px";
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

                let logoutContainer = document.createElement("li");
                logoutContainer.appendChild(logoutIcon);
                navBar.appendChild(logoutContainer);
            }

            let settingsMenu = document.querySelector(".settings-menu");
            if (settingsMenu) {
            settingsMenu.style.display = "block"; // Show Settings option in hamburger menu
            }

            // Change homepage for logged-in users
            if (homeNavItem) {
                homeNavItem.setAttribute("href", "/pages/User%20Home%20Page/index.html");
            }
        } else {
            document.body.classList.remove("user-logged-in");
            if (loginBtn) loginBtn.style.display = "block";
            if (signupBtn) signupBtn.style.display = "block";
            if (userIcon) userIcon.style.display = "none";
            let logoutIcon = document.querySelector(".logout-icon");
            if (logoutIcon) logoutIcon.parentElement.remove();

            // Set default homepage for non-logged-in users
            if (homeNavItem) {
                homeNavItem.setAttribute("href", "/index.html");
            }
        }
    }

    updateNavigation();
});
