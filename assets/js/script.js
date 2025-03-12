document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector(".mobile-menu-toggle");
    const menuContainer = document.querySelector(".mobile-menu-container");
    const closeButton = document.querySelector(".mobile-menu-close");

    menuToggle.addEventListener("click", function () {
        menuContainer.classList.toggle("open");
    });

    closeButton.addEventListener("click", function () {
        menuContainer.classList.remove("open");
    });

    // Close menu when clicking outside
    document.addEventListener("click", function (event) {
        if (!menuContainer.contains(event.target) && !menuToggle.contains(event.target)) {
            menuContainer.classList.remove("open");
        }
    });
});
