

document.querySelector('.hamburger-toggle').addEventListener('click', function(event) {
    event.preventDefault();
    let menu = document.querySelector('.hamburger-menu');
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
});

// Close menu when clicking outside
document.addEventListener('click', function(event) {
    let isClickInside = document.querySelector('.hamburger').contains(event.target);
    if (!isClickInside) {
        document.querySelector('.hamburger-menu').style.display = 'none';
    }
});

