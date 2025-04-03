document.addEventListener("DOMContentLoaded", function () {
    const user = JSON.parse(localStorage.getItem("user"));
    const loginBtn = document.querySelector(".login-btn");
    const signupBtn = document.querySelector(".signup-btn");
    const userIcon = document.querySelector(".user-icon-active");
    const logoutIcon = document.querySelector(".logout-icon");
    const dashboardNav = document.querySelector(".dashboard-nav");
    const financeHub = document.querySelector(".dropdown");
    const settingsMenu = document.querySelector(".settings-menu");

    if (user) {
        document.body.classList.add("user-logged-in");

        // Hide login/signup buttons
        if (loginBtn) loginBtn.style.display = "none";
        if (signupBtn) signupBtn.style.display = "none";

        // Show Dashboard and Finance Hub
        if (dashboardNav) dashboardNav.style.display = "block";
        if (financeHub) financeHub.style.display = "block";

        // Show User Icon
        if (userIcon) {
            userIcon.style.display = "block";
            userIcon.src = user.profileImage || "../../assets/img/Profile Icon.png";

            userIcon.addEventListener("mouseenter", () => {
                userIcon.style.filter = "brightness(0) saturate(100%) invert(37%) sepia(54%) saturate(533%) hue-rotate(58deg) brightness(92%) contrast(92%)";
            });

            userIcon.addEventListener("click", () => {
                userIcon.classList.add("clicked");
                userIcon.style.filter = "brightness(0) saturate(100%) invert(37%) sepia(54%) saturate(533%) hue-rotate(58deg) brightness(92%) contrast(92%)";
            });
        }

        // Show Logout Icon
        if (logoutIcon) {
            logoutIcon.style.display = "block";

            logoutIcon.addEventListener("mouseenter", () => {
                logoutIcon.style.filter = "brightness(0) saturate(100%) invert(37%) sepia(54%) saturate(533%) hue-rotate(58deg) brightness(92%) contrast(92%)";
            });

            logoutIcon.addEventListener("mouseleave", () => {
                if (!logoutIcon.classList.contains("clicked")) {
                    logoutIcon.style.filter = "none";
                }
            });

            logoutIcon.addEventListener("click", () => {
                localStorage.removeItem("user");
                window.location.reload();
            });
        }

        // Show Settings in Hamburger Menu
        if (settingsMenu) settingsMenu.style.display = "block";

    } else {
        if (dashboardNav) dashboardNav.style.display = "none";
        if (financeHub) financeHub.style.display = "none";
        if (userIcon) userIcon.style.display = "none";
        if (logoutIcon) logoutIcon.style.display = "none";
        if (settingsMenu) settingsMenu.style.display = "none";
    }
});