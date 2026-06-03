// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close menu when clicking a link
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Enhanced Navbar scroll effect with blur
const navbar = document.getElementById('navbar');
let lastScrollY = 0;

window.addEventListener('scroll', () => {
    lastScrollY = window.scrollY;
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Advanced Scroll Animation with Intersection Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 100);
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Card stagger animation
const observerCards = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 50);
        }
    });
}, { threshold: 0.1 });

// Apply stagger to cards
document.querySelectorAll('.skill-card, .project-card, .certificate-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    observerCards.observe(card);
});

// Project filters
const filterChips = document.querySelectorAll('.filter-chip');
const projectCards = document.querySelectorAll('.project-card');

if (filterChips.length && projectCards.length) {
    filterChips.forEach(chip => {
        chip.addEventListener('click', () => {
            filterChips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');

            const filter = chip.dataset.filter;

            projectCards.forEach(card => {
                const tags = (card.dataset.tags || '').split(',');
                const match = filter === 'all' || tags.includes(filter);
                card.classList.toggle('hidden', !match);
            });
        });
    });
}

// Smooth scroll for anchor links with offset
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Form submission with validation
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Basic validation
        if (name && email && subject && message) {
            // Create mailto link
            const mailtoLink = `mailto:adityakumarsinha.in@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`From: ${name} (${email})\n\n${message}`)}`;
            window.location.href = mailtoLink;
            
            // Show success message
            const originalText = e.target.querySelector('button').textContent;
            e.target.querySelector('button').textContent = '✓ Message Sent!';
            setTimeout(() => {
                e.target.querySelector('button').textContent = originalText;
            }, 2000);
            
            contactForm.reset();
        } else {
            alert('Please fill in all fields');
        }
    });
}

// Mouse cursor glow effect on interactive elements
document.addEventListener('mousemove', (e) => {
    const interactiveElements = document.querySelectorAll('.btn, .skill-card, .project-card, .certificate-card, .contact-item');
    
    interactiveElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        el.style.setProperty('--mouse-x', x + 'px');
        el.style.setProperty('--mouse-y', y + 'px');
    });
});

// Counter animation for stats
function animateCounters() {
    const statItems = document.querySelectorAll('.stat-item h4');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.hasAttribute('data-animated')) {
                const element = entry.target;
                element.setAttribute('data-animated', 'true');
                
                const text = element.textContent;
                const match = text.match(/(\d+)/);
                if (match) {
                    const target = parseInt(match[1]);
                    let current = 0;
                    const increment = target / 30;
                    
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            element.textContent = text;
                            clearInterval(timer);
                        } else {
                            element.textContent = Math.floor(current) + '+';
                        }
                    }, 30);
                }
            }
        });
    }, { threshold: 0.5 });
    
    statItems.forEach(item => observer.observe(item));
}

animateCounters();

// Page load animation
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// Add loading state
document.body.style.opacity = '0.95';
