// ========================================
// МОБІЛЬНЕ МЕНЮ
// ========================================
const burger = document.getElementById('burger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Закриття меню при кліку на посилання
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        burger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Плавна прокрутка
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Кнопка прокрутки вгору
const scrollTopBtn = document.getElementById('scroll-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }

    // Зміна стилю шапки при прокрутці
    const header = document.querySelector('.header');
    if (window.pageYOffset > 100) {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Обробка форми
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Отримання даних форми
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Валідація
    if (!data.name || !data.phone || !data['repair-type']) {
        alert('Будь ласка, заповніть всі обов\'язкові поля!');
        return;
    }
    
    if (!data.privacy) {
        alert('Будь ласка, підтвердіть згоду з політикою конфіденційності!');
        return;
    }
    
    // Імітація відправки форми
    const submitBtn = contactForm.querySelector('.btn-submit');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Відправка...';
    submitBtn.disabled = true;
    
    // Тут ви можете додати реальну відправку на сервер
    // Наприклад, через fetch API:
    /*
    fetch('/api/contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(result => {
        console.log('Success:', result);
    })
    .catch(error => {
        console.error('Error:', error);
    });
    */
    
    // Імітація затримки
    setTimeout(() => {
        alert('Дякуємо за заявку! Наш менеджер зв\'яжеться з вами протягом 10 хвилин для узгодження безкоштовного виїзду майстра.');
        contactForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 1500);
});

// Анімація при прокрутці (появі елементів)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Додавання анімації до карток
const animatedElements = document.querySelectorAll('.service-card, .advantage-card, .pricing-card, .gallery-item');
animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Валідація телефону
const phoneInput = document.querySelector('input[type="tel"]');
if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
        // Дозволяємо тільки цифри, плюс, дефіс, дужки та пробіли
        e.target.value = e.target.value.replace(/[^\d\+\-\(\) ]/g, '');
    });
}

// Закриття мобільного меню при кліку поза ним
document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav') && navMenu.classList.contains('active')) {
        burger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Попередження про cookies (для відповідності GDPR/CCPA)
function showCookieConsent() {
    const cookieConsent = localStorage.getItem('cookieConsent');
    
    if (!cookieConsent) {
        const consentBanner = document.createElement('div');
        consentBanner.style.cssText = `
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background: rgba(31, 41, 55, 0.95);
            color: white;
            padding: 1.5rem;
            text-align: center;
            z-index: 10000;
            box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.2);
        `;
        
        consentBanner.innerHTML = `
            <div style="max-width: 1200px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem;">
                <p style="margin: 0; flex: 1; min-width: 250px;">
                    Ми використовуємо cookies для покращення роботи сайту. Продовжуючи користуватися сайтом, ви погоджуєтесь з нашою 
                    <a href="#privacy" style="color: #ff6b35; text-decoration: underline;">політикою конфіденційності</a>.
                </p>
                <button id="accept-cookies" style="
                    background: #ff6b35;
                    color: white;
                    border: none;
                    padding: 0.75rem 2rem;
                    border-radius: 50px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: background 0.3s ease;
                ">
                    Прийняти
                </button>
            </div>
        `;
        
        document.body.appendChild(consentBanner);
        
        const acceptBtn = document.getElementById('accept-cookies');
        acceptBtn.addEventListener('click', () => {
            localStorage.setItem('cookieConsent', 'true');
            consentBanner.remove();
        });
        
        acceptBtn.addEventListener('mouseenter', () => {
            acceptBtn.style.background = '#e85d2a';
        });
        
        acceptBtn.addEventListener('mouseleave', () => {
            acceptBtn.style.background = '#ff6b35';
        });
    }
}

// Показати повідомлення про cookies через 1 секунду після завантаження
setTimeout(showCookieConsent, 2000);

// Додавання Schema.org розмітки для SEO
const schemaData = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "name": "РемонтПро",
    "image": "",
    "description": "Професійний ремонт квартир під ключ у Києві та по всій Україні",
    "address": {
        "@type": "PostalAddress",
        "streetAddress": "вул. Саксаганського, 121",
        "addressLocality": "Київ",
        "addressCountry": "UA"
    },
    "telephone": "+380445556677",
    "email": "info@remontpro.com.ua",
    "openingHoursSpecification": [
        {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            "opens": "08:00",
            "closes": "20:00"
        },
        {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": "Sunday",
            "opens": "10:00",
            "closes": "18:00"
        }
    ],
    "priceRange": "250-1500 UAH/m²"
};

const script = document.createElement('script');
script.type = 'application/ld+json';
script.text = JSON.stringify(schemaData);
document.head.appendChild(script);

// Відстеження кліків на кнопки для аналітики
const ctaButtons = document.querySelectorAll('.btn-primary, .service-btn, .btn-call');
ctaButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Тут можна додати відстеження в Google Analytics або Facebook Pixel
        console.log('CTA clicked:', button.textContent);
        
        // Приклад для Google Analytics:
        /*
        if (typeof gtag !== 'undefined') {
            gtag('event', 'button_click', {
                'event_category': 'engagement',
                'event_label': button.textContent
            });
        }
        */
    });
});

console.log('РемонтПро - сайт успішно завантажено!');

