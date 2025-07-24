// Loader
window.addEventListener('load', function() {
    const loader = document.querySelector('.loader');
    setTimeout(() => {
        loader.classList.add('hidden');
    }, 1000);
});

// Efecto de partículas
function initParticles() {
    const canvas = document.getElementById('particles');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const particleCount = Math.floor(window.innerWidth / 10);
    
    // Crear partículas
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2 + 1,
            speedX: Math.random() * 0.5 - 0.25,
            speedY: Math.random() * 0.5 - 0.25,
            color: `rgba(41, 98, 255, ${Math.random() * 0.5 + 0.1})`
        });
    }
    
    // Animar partículas
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();
            
            p.x += p.speedX;
            p.y += p.speedY;
            
            // Rebotar en los bordes
            if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
            if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
            
            // Conectar partículas cercanas
            for (let j = i + 1; j < particles.length; j++) {
                const p2 = particles[j];
                const distance = Math.sqrt(Math.pow(p.x - p2.x, 2) + Math.pow(p.y - p2.y, 2));
                
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(41, 98, 255, ${1 - distance/100})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            }
        }
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    // Redimensionar canvas
    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Cursor personalizado
function initCustomCursor() {
    const cursor = document.querySelector('.cursor');
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    
    document.querySelectorAll('a, button, .project-card, .nav-link').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(2)';
            cursor.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.backgroundColor = 'var(--blue)';
        });
    });
}

// Menú móvil
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.innerHTML = navLinks.classList.contains('active') ? 
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });
    
    // Cerrar menú al hacer clic en un enlace
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
}

// Animación de habilidades
function animateSkills() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
        const percent = item.getAttribute('data-percent');
        const progressBar = item.querySelector('.skill-progress');
        const percentElement = item.querySelector('.skill-percent');
        
        let counter = 0;
        const duration = 1500; // ms
        const increment = percent / (duration / 16);
        
        const animate = () => {
            if (counter < percent) {
                counter += increment;
                progressBar.style.width = `${counter}%`;
                percentElement.textContent = `${Math.round(counter)}%`;
                requestAnimationFrame(animate);
            } else {
                progressBar.style.width = `${percent}%`;
                percentElement.textContent = `${percent}%`;
            }
        };
        
        // Activar animación cuando el elemento es visible
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                animate();
                observer.unobserve(item);
            }
        }, { threshold: 0.5 });
        
        observer.observe(item);
    });
}

// Botones flotantes
function initFloatingButtons() {
    const whatsappBtn = document.querySelector('#whatsapp-btn');
    const scrollTopBtn = document.querySelector('#scrollTopBtn');
    
    // Mostrar/ocultar botones al hacer scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            whatsappBtn.classList.add('visible');
            scrollTopBtn.classList.add('visible');
        } else {
            whatsappBtn.classList.remove('visible');
            scrollTopBtn.classList.remove('visible');
        }
    });
    
    // Scroll to top
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Mostrar después de 3 segundos si el usuario ha scrolleado
    setTimeout(() => {
        if (window.scrollY > 300) {
            whatsappBtn.classList.add('visible');
        }
    }, 3000);
}

// Animación de las tarjetas de proyectos
function animateProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const cardObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 150);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    projectCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        cardObserver.observe(card);
    });
}

// Formulario de contacto
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simular envío del formulario
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Enviado';
                
                // Resetear formulario después de 2 segundos
                setTimeout(() => {
                    contactForm.reset();
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    
                    // Mostrar notificación
                    const notification = document.createElement('div');
                    notification.className = 'form-notification';
                    notification.innerHTML = '¡Mensaje enviado con éxito!';
                    contactForm.appendChild(notification);
                    
                    setTimeout(() => {
                        notification.style.opacity = '0';
                        setTimeout(() => notification.remove(), 300);
                    }, 3000);
                }, 2000);
            }, 1500);
        });
    }
}

// Smooth scroll para enlaces
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Año actual en el footer
function updateCurrentYear() {
    document.getElementById('current-year').textContent = new Date().getFullYear();
}

// Inicializar todas las funciones
function init() {
    initParticles();
    initCustomCursor();
    initMobileMenu();
    animateSkills();
    initFloatingButtons();
    animateProjectCards();
    initContactForm();
    initSmoothScroll();
    updateCurrentYear();
}

// Ejecutar cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', init);