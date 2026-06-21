// ========== DOM Elements ==========
const preloader = document.getElementById('preloader');
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const backToTop = document.getElementById('backToTop');
const hireBtn = document.getElementById('hireBtn');
const contactForm = document.getElementById('contactForm');
const typewriterElement = document.getElementById('typewriter');
const counters = document.querySelectorAll('.counter');
const skillBars = document.querySelectorAll('.skill-progress');

// ========== Preloader ==========
window.addEventListener('load', () => {
    setTimeout(() => {
        if (preloader) {
            preloader.classList.add('hidden');
        }
    }, 1000);
    
    setTimeout(animateSkillBars, 1200);
});

// ========== Navigation Scroll Effect ==========
window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    
    if (navbar) {
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    if (backToTop) {
        if (scrollTop > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    }
    
    updateActiveNavLink();
});

// ========== Mobile Menu Toggle ==========
if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
}

// Close menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu) navMenu.classList.remove('active');
        if (hamburger) hamburger.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (navMenu && hamburger) {
        if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
});

// ========== Back to Top ==========
if (backToTop) {
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ========== Hire Me Button ==========
if (hireBtn) {
    hireBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.open('https://www.fiverr.com/webexpert_aman', '_blank');
    });
}

// ========== Smooth Scroll ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId && targetId !== '#') {
            e.preventDefault();
            const target = document.querySelector(targetId);
            if (target) {
                const offsetTop = target.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ========== Typewriter Effect ==========
const phrases = [
    'Building robust applications with Java & Spring Boot',
    'Creating responsive web experiences with React',
    'Turning complex problems into simple solutions',
    'BCA Final Year Student | Aspiring Software Developer',
    'Available for freelance projects & opportunities',
    'Passionate about clean code & best practices'
];

if (typewriterElement) {
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 80;

    function typeWriter() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 40;
        } else {
            typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            typeSpeed = 2500;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 600;
        }

        setTimeout(typeWriter, typeSpeed);
    }

    setTimeout(typeWriter, 1500);
}

// ========== Counter Animation ==========
function animateCounter(counter) {
    const target = parseInt(counter.getAttribute('data-target'));
    if (!target) return;
    
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    let step = 0;

    const updateCounter = () => {
        step++;
        current = Math.min(increment * step, target);
        counter.textContent = Math.floor(current);
        
        if (step < steps) {
            setTimeout(updateCounter, duration / steps);
        } else {
            counter.textContent = target;
        }
    };

    updateCounter();
}

// ========== Skill Bar Animation ==========
function animateSkillBars() {
    if (skillBars.length > 0) {
        skillBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.width = width;
            }, 200);
        });
    }
}

// ========== Intersection Observer ==========
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const sectionCounters = entry.target.querySelectorAll('.counter');
            sectionCounters.forEach(counter => {
                if (!counter.classList.contains('animated')) {
                    animateCounter(counter);
                    counter.classList.add('animated');
                }
            });
            
            if (entry.target.id === 'skills') {
                animateSkillBars();
            }
        }
    });
}, observerOptions);

document.querySelectorAll('.container').forEach(section => {
    observer.observe(section);
});

// ========== Contact Form Handler ==========
function handleSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    const name = (formData.get('name') || '').trim();
    const email = (formData.get('email') || '').trim();
    const message = (formData.get('message') || '').trim();

    if (!name || !email || !message) {
        showNotification('Please fill in all fields', 'error');
        return false;
    }

    if (name.length < 2) {
        showNotification('Name must be at least 2 characters', 'error');
        return false;
    }

    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        return false;
    }

    if (message.length < 10) {
        showNotification('Message must be at least 10 characters', 'error');
        return false;
    }

    const subject = `Portfolio Contact from ${name}`;
    const body = `Name: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0AMessage:%0D%0A${message}`;
    const mailtoLink = `mailto:amarnathpraj331@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
    
    window.location.href = mailtoLink;
    showNotification('Opening your email client...', 'success');
    
    setTimeout(() => {
        form.reset();
    }, 1000);
    
    return false;
}

// ========== Email Validation ==========
function isValidEmail(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
}

// ========== Notification System ==========
function showNotification(message, type = 'success') {
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const icon = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle';
    notification.innerHTML = `
        <i class="fas ${icon}"></i>
        <span>${message}</span>
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.transform = 'translateX(150%)';
        notification.style.opacity = '0';
        setTimeout(() => notification.remove(), 300);
    }, 3500);
}

// ========== Active Navigation Link ==========
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.scrollY;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (navLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink.classList.add('active');
            } else {
                navLink.classList.remove('active');
            }
        }
    });
}

// ========== Keyboard Navigation ==========
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        if (hamburger) hamburger.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// ========== Console Welcome ==========
console.log(`
    ╔═══════════════════════════════════════╗
    ║   🚀 Amarnath Prajapati Portfolio   ║
    ║   Java Developer | Web Developer     ║
    ║   BCA Final Year Student             ║
    ║   📧 amarnathpraj331@gmail.com       ║
    ║   📱 6387765027                      ║
    ╚═══════════════════════════════════════╝
    💻 Built with ❤️ using HTML, CSS & JavaScript
    🌟 Available for opportunities!
`);