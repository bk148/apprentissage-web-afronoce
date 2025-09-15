// ========================================
// CONFIGURATION ET VARIABLES GLOBALES
// ========================================

// Configuration des chemins vers les fichiers JSON
const API_CONFIG = {
    eventInfo: '../backend/data/event-info.json',
    program: '../backend/data/program.json',
    sponsors: '../backend/data/sponsors.json',
    mediaLinks: '../backend/data/media-links.json'
};

// Variables globales pour stocker les données
let eventData = null;
let programData = null;
let sponsorsData = null;
let mediaData = null;

// ========================================
// FONCTIONS DE CHARGEMENT DES DONNÉES
// ========================================

/**
 * Charge un fichier JSON depuis le backend
 * @param {string} url - URL du fichier JSON à charger
 * @returns {Promise<Object>} - Données JSON parsées
 */
async function loadJSON(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Erreur lors du chargement de ${url}:`, error);
        return null;
    }
}

/**
 * Charge toutes les données nécessaires depuis le backend
 */
async function loadAllData() {
    try {
        // Chargement parallèle de tous les fichiers JSON
        const [eventInfo, program, sponsors, mediaLinks] = await Promise.all([
            loadJSON(API_CONFIG.eventInfo),
            loadJSON(API_CONFIG.program),
            loadJSON(API_CONFIG.sponsors),
            loadJSON(API_CONFIG.mediaLinks)
        ]);

        // Stockage dans les variables globales
        eventData = eventInfo;
        programData = program;
        sponsorsData = sponsors;
        mediaData = mediaLinks;

        // Initialisation de l'interface une fois les données chargées
        if (eventData && programData && sponsorsData && mediaData) {
            initializeInterface();
        } else {
            console.error('Erreur: Certaines données n\'ont pas pu être chargées');
        }
    } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
    }
}

// ========================================
// INITIALISATION DE L'INTERFACE
// ========================================

/**
 * Initialise tous les éléments de l'interface avec les données chargées
 */
function initializeInterface() {
    populateHeroSection();
    populateEventInfoBar();
    populateProgramSection();
    populateSponsorsSection();
    populateInfoSection();
    populateFooter();
    initializeEventListeners();
}

/**
 * Remplit la section hero avec les données de l'événement
 */
function populateHeroSection() {
    if (!eventData || !mediaData) return;

    const event = eventData.event;
    
    // Mise à jour de l'image d'arrière-plan
    const heroImage = document.getElementById('hero-image');
    if (heroImage && mediaData.hero) {
        heroImage.src = mediaData.hero.backgroundImage;
        heroImage.alt = mediaData.hero.alt;
    }

    // Mise à jour du nom et année de l'événement
    const eventName = document.getElementById('event-name');
    const eventYear = document.getElementById('event-year');
    if (eventName) eventName.textContent = event.name;
    if (eventYear) eventYear.textContent = `'${event.year.slice(-2)}`;

    // Mise à jour de la description
    const description = document.getElementById('event-description');
    if (description) description.textContent = event.description;
}

/**
 * Remplit la barre d'informations de l'événement
 */
function populateEventInfoBar() {
    if (!eventData || !mediaData) return;

    const event = eventData.event;
    const eventInfoBar = document.getElementById('event-info-bar');
    
    if (!eventInfoBar) return;

    // Format de la date
    const eventDate = new Date(event.date).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    }).toUpperCase();

    // Création des éléments d'information
    const infoItems = [
        {
            icon: mediaData.icons.calendar,
            text: eventDate
        },
        {
            icon: mediaData.icons.location,
            text: event.location.venue.toUpperCase()
        },
        {
            icon: mediaData.icons.users,
            text: `ÉDITION ${event.edition}`
        },
        {
            icon: mediaData.icons.clock,
            text: `${event.time.start} - ${event.time.end}`
        },
        {
            icon: mediaData.icons.ticket,
            text: 'ENTRÉE GRATUITE'
        }
    ];

    // Génération du HTML
    eventInfoBar.innerHTML = infoItems.map(item => `
        <div class="event-info-item">
            <i class="${item.icon}"></i>
            <span>${item.text}</span>
        </div>
    `).join('');
}

/**
 * Remplit la section programme
 */
function populateProgramSection() {
    if (!programData || !mediaData) return;

    populateCategoryFilters();
    populateProgramGrid();
}

/**
 * Génère les filtres de catégories
 */
function populateCategoryFilters() {
    const filtersContainer = document.getElementById('category-filters');
    if (!filtersContainer || !programData.categories) return;

    filtersContainer.innerHTML = programData.categories.map((category, index) => `
        <button class="filter-btn ${index === 0 ? 'active' : ''}" data-category="${category}">
            ${category}
        </button>
    `).join('');
}

/**
 * Génère la grille des cartes programme
 */
function populateProgramGrid() {
    const gridContainer = document.getElementById('program-grid');
    if (!gridContainer || !programData.activities) return;

    gridContainer.innerHTML = programData.activities.map(activity => `
        <div class="program-card" data-category="${activity.category}">
            <img src="${activity.image}" alt="${activity.title}" class="program-card-image">
            <div class="program-card-overlay">
                <span class="program-card-category">${activity.category}</span>
                <h3 class="program-card-title">${activity.title}</h3>
                <div class="program-card-time">
                    <i class="${mediaData.icons.clock}"></i>
                    <span>${activity.time}</span>
                </div>
                <p class="program-card-description">${activity.description}</p>
            </div>
        </div>
    `).join('');
}

/**
 * Remplit la section sponsors
 */
function populateSponsorsSection() {
    if (!sponsorsData) return;

    const sponsorsGrid = document.getElementById('sponsors-grid');
    if (!sponsorsGrid) return;

    sponsorsGrid.innerHTML = sponsorsData.sponsors.map(sponsor => `
        <div class="sponsor-card" data-level="${sponsor.level}">
            ${sponsor.logo ? 
                `<img src="${sponsor.logo}" alt="${sponsor.name}">` : 
                `<span>${sponsor.name}</span>`
            }
        </div>
    `).join('');
}

/**
 * Remplit la section informations
 */
function populateInfoSection() {
    if (!eventData) return;

    populateAccessTab();
    populateFAQTab();
}

/**
 * Remplit l'onglet d'accès
 */
function populateAccessTab() {
    const accessTab = document.getElementById('access-tab');
    if (!accessTab || !eventData.access) return;

    const location = eventData.event.location;
    const access = eventData.access;

    accessTab.innerHTML = `
        <div class="info-card">
            <h3><i class="${mediaData.icons.location}"></i> Adresse</h3>
            <p style="color: #ccc;">
                ${location.venue}<br>
                ${location.address}<br>
                ${location.zipCode} ${location.city}
            </p>
        </div>
        <div class="info-card">
            <h3><i class="${mediaData.icons.train}"></i> Métro & RER</h3>
            <ul>
                ${access.metro.map(line => `
                    <li>${line.line} - Station ${line.station} (${line.walkTime})</li>
                `).join('')}
            </ul>
        </div>
        <div class="info-card">
            <h3><i class="${mediaData.icons.car}"></i> Voiture</h3>
            <ul>
                <li>${access.car.exit}</li>
                <li>Parking sur place (${access.car.parking.spaces} places)</li>
                <li>Tarif: ${access.car.parking.price}</li>
                ${access.car.parking.features.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
        </div>
    `;
}

/**
 * Remplit l'onglet FAQ
 */
function populateFAQTab() {
    const faqTab = document.getElementById('faq-tab');
    if (!faqTab || !programData.faq) return;

    faqTab.innerHTML = programData.faq.map(item => `
        <div class="faq-item">
            <div class="faq-question" onclick="toggleFaq(this)">
                ${item.question}
                <i class="fas fa-chevron-down"></i>
            </div>
            <div class="faq-answer">
                <p>${item.answer}</p>
            </div>
        </div>
    `).join('');
}

/**
 * Remplit le footer
 */
function populateFooter() {
    if (!eventData || !mediaData) return;

    const event = eventData.event;
    
    // Mise à jour de l'édition dans le footer
    const footerEdition = document.getElementById('footer-edition');
    if (footerEdition) {
        const eventDate = new Date(event.date).toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
        footerEdition.textContent = `Édition ${event.edition} - ${eventDate}`;
    }

    // Liens sociaux
    const socialLinks = document.getElementById('social-links');
    if (socialLinks) {
        const socialPlatforms = [
            { platform: 'facebook', icon: mediaData.social.facebook, url: event.social.facebook },
            { platform: 'instagram', icon: mediaData.social.instagram, url: event.social.instagram },
            { platform: 'twitter', icon: mediaData.social.twitter, url: event.social.twitter },
            { platform: 'youtube', icon: mediaData.social.youtube, url: event.social.youtube }
        ];

        socialLinks.innerHTML = socialPlatforms.map(social => `
            <a href="${social.url}" class="social-link">
                <i class="${social.icon}"></i>
            </a>
        `).join('');
    }

    // Informations de contact
    const contactInfo = document.getElementById('contact-info');
    if (contactInfo) {
        contactInfo.innerHTML = `
            <li><a href="#"><i class="${mediaData.icons.location}"></i> ${event.location.venue}</a></li>
            <li><a href="mailto:${event.contact.email}"><i class="fas fa-envelope"></i> ${event.contact.email}</a></li>
            <li><a href="tel:${event.contact.phone}"><i class="fas fa-phone"></i> ${event.contact.phone}</a></li>
        `;
    }
}

// ========================================
// FONCTIONS INTERACTIVES
// ========================================

/**
 * Initialise tous les event listeners
 */
function initializeEventListeners() {
    initializeNavigation();
    initializeCountdown();
    initializeCategoryFilters();
    initializeScrollEffects();
    initializeSmoothScrolling();
}

/**
 * Initialise les effets de navigation
 */
function initializeNavigation() {
    // Effet de scroll sur la navigation
    window.addEventListener('scroll', function() {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

/**
 * Initialise et démarre le compte à rebours
 */
function initializeCountdown() {
    if (!eventData) return;

    const targetDate = new Date(eventData.event.date + 'T' + eventData.event.time.start + ':00');

    function updateCountdown() {
        const now = new Date();
        const difference = targetDate - now;

        if (difference > 0) {
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            // Mise à jour des éléments HTML
            const daysElement = document.getElementById('days');
            const hoursElement = document.getElementById('hours');
            const minutesElement = document.getElementById('minutes');
            const secondsElement = document.getElementById('seconds');

            if (daysElement) daysElement.textContent = days.toString().padStart(2, '0');
            if (hoursElement) hoursElement.textContent = hours.toString().padStart(2, '0');
            if (minutesElement) minutesElement.textContent = minutes.toString().padStart(2, '0');
            if (secondsElement) secondsElement.textContent = seconds.toString().padStart(2, '0');
        }
    }

    // Mise à jour immédiate puis toutes les secondes
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

/**
 * Initialise les filtres de catégories
 */
function initializeCategoryFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Retirer la classe active de tous les boutons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Ajouter la classe active au bouton cliqué
            this.classList.add('active');
            
            // Filtrer les cartes
            const category = this.getAttribute('data-category');
            filterProgramCards(category);
        });
    });
}

/**
 * Filtre les cartes de programme selon la catégorie
 * @param {string} category - Catégorie à afficher
 */
function filterProgramCards(category) {
    const cards = document.querySelectorAll('.program-card');
    
    cards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        
        if (category === 'Tout' || cardCategory === category) {
            card.style.display = 'block';
            card.style.animation = 'fadeInUp 0.5s ease';
        } else {
            card.style.display = 'none';
        }
    });
}

/**
 * Initialise les effets de scroll
 */
function initializeScrollEffects() {
    // Effet parallaxe sur l'image hero
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroImage = document.querySelector('.hero-bg img');
        if (heroImage) {
            heroImage.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Animation des éléments au scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observer les cartes pour l'animation
    document.querySelectorAll('.program-card, .sponsor-card, .info-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

/**
 * Initialise le défilement fluide
 */
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ========================================
// FONCTIONS UTILITAIRES
// ========================================

/**
 * Affiche un onglet spécifique dans la section info
 * @param {string} tabName - Nom de l'onglet à afficher
 */
function showTab(tabName) {
    // Cacher tous les onglets
    document.querySelectorAll('.info-content > div').forEach(tab => {
        tab.style.display = 'none';
    });

    // Retirer la classe active de tous les boutons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // Afficher l'onglet sélectionné
    const selectedTab = document.getElementById(tabName + '-tab');
    if (selectedTab) {
        selectedTab.style.display = tabName === 'access' ? 'grid' : 'block';
    }

    // Ajouter la classe active au bouton cliqué
    event.target.closest('.tab-btn').classList.add('active');
}

/**
 * Toggle l'affichage d'une question FAQ
 * @param {HTMLElement} element - Élément question cliqué
 */
function toggleFaq(element) {
    const faqItem = element.parentElement;
    faqItem.classList.toggle('active');
}

// ========================================
// INITIALISATION DE L'APPLICATION
// ========================================

/**
 * Point d'entrée de l'application
 * Se lance quand le DOM est entièrement chargé
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initialisation de l\'application Afronoce...');
    loadAllData();
});

// Exposition des fonctions globales nécessaires
window.showTab = showTab;
window.toggleFaq = toggleFaq;