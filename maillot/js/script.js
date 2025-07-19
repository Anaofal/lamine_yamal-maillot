// Smooth scrolling for navigation with sticky header adjustment
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        const headerOffset = document.querySelector('header').offsetHeight; // Get header height
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - headerOffset - 20, // Adjust for sticky header and add a little extra padding
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for advanced scroll-reveal animations (staggered effects)
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1 // Trigger when 10% of the element is visible
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            // Special handling for staggered text reveals
            if (entry.target.classList.contains('text-reveal-staggered')) {
                Array.from(entry.target.querySelectorAll('p, li')).forEach((item, index) => {
                    item.style.transitionDelay = `${index * 0.15}s`; // Stagger delay for paragraphs/list items
                    item.classList.add('is-visible'); // Apply visibility class
                });
            }
            observer.unobserve(entry.target); // Stop observing once visible
        }
    });
}, observerOptions);

document.querySelectorAll('.section-reveal, .img-reveal, .card-reveal, .list-item-reveal, .text-reveal-staggered').forEach(element => {
    observer.observe(element);
});

// Copy to clipboard functionality (using modern Clipboard API with fallback)
document.getElementById('copy-link-btn').addEventListener('click', function() {
    const affiliateLink = "https://www.amazon.fr/dp/B0CXXXXXXX"; // REMPLACER PAR VOTRE VRAI LIEN AFFILIÉ AMAZON
    const copyMessage = document.getElementById('copy-message');

    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(affiliateLink).then(() => {
            copyMessage.classList.remove('opacity-0');
            copyMessage.classList.add('opacity-100');
            setTimeout(() => {
                copyMessage.classList.remove('opacity-100');
                copyMessage.classList.add('opacity-0');
            }, 2500);
        }).catch(err => {
            console.error('Erreur lors de la copie (Clipboard API) : ', err);
            fallbackCopyTextToClipboard(affiliateLink, copyMessage);
        });
    } else {
        fallbackCopyTextToClipboard(affiliateLink, copyMessage);
    }
});

function fallbackCopyTextToClipboard(text, messageElement) {
    const tempInput = document.createElement('textarea');
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    try {
        document.execCommand('copy');
        messageElement.classList.remove('opacity-0');
        messageElement.classList.add('opacity-100');
        setTimeout(() => {
            messageElement.classList.remove('opacity-100');
            messageElement.classList.add('opacity-0');
        }, 2500);
    } catch (err) {
        console.error('Impossible de copier le texte (execCommand) : ', err);
        messageElement.textContent = "Impossible de copier le lien. Veuillez le copier manuellement.";
        messageElement.classList.remove('opacity-0', 'text-green-600');
        messageElement.classList.add('opacity-100', 'text-red-600');
        setTimeout(() => {
            messageElement.classList.remove('opacity-100', 'text-red-600');
            messageElement.classList.add('opacity-0', 'text-green-600');
            messageElement.textContent = "Lien du produit copié ! Partagez la passion Blaugrana !"; // Reset message
        }, 3500);
    } finally {
        document.body.removeChild(tempInput);
    }
}

// Fonctionnalité FAQ (déplier/replier)
function toggleFAQ(id) {
    const content = document.getElementById(`content-${id}`);
    const arrow = document.getElementById(`arrow-${id}`);
    if (content.classList.contains('hidden')) {
        content.classList.remove('hidden');
        arrow.classList.add('rotate-180');
    } else {
        content.classList.add('hidden');
        arrow.classList.remove('rotate-180');
    }
}

// Apply initial animations for elements in viewport on load
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.animate-text-pop-in, .animate-text-fade-in').forEach(el => {
        el.style.opacity = '0'; // Hide initially to allow animation to play
    });
});
