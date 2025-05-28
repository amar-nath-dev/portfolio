document.getElementById('hireBtn').addEventListener('click', function (e) {
    e.preventDefault();
    window.open('https://www.fiverr.com/amarnath_prajapati', '_blank');
});

// Optional: Smooth scroll effect
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
