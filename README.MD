# Afronoce 2025 - Salon du Mariage Africain

## Description du projet

Site web moderne et responsive pour le salon du mariage africain Afronoce 2025. Le projet est structuré avec une séparation claire entre frontend et backend pour faciliter la maintenance et les mises à jour.

## Architecture du projet

```
afronoce-2025/
├── frontend/                   # Interface utilisateur
│   ├── index.html             # Page principale HTML
│   ├── css/
│   │   └── styles.css         # Styles CSS entièrement commentés
│   ├── js/
│   │   └── main.js            # JavaScript principal
│   └── assets/                # Ressources statiques
│       ├── images/
│       └── icons/
├── backend/                   # Données et configuration
│   └── data/
│       ├── event-info.json   # Informations de l'événement
│       ├── program.json      # Programme et activités
│       ├── sponsors.json     # Liste des sponsors
│       └── media-links.json  # URLs des médias
└── README.md                 # Documentation
```

## Fonctionnalités

### Frontend
- **Design responsive** - Adapté mobile, tablette et desktop
- **Interface moderne** - Animations fluides et effets visuels
- **Navigation intelligente** - Scroll fluide et menu fixe
- **Compte à rebours dynamique** - Mis à jour en temps réel
- **Filtres interactifs** - Pour les catégories de programme
- **FAQ accordéon** - Interface intuitive pour les questions
- **Effets parallaxe** - Animation de l'arrière-plan au scroll
- **Thème africain** - Couleurs dorées et design culturel

### Backend
- **Architecture JSON** - Données structurées et facilement modifiables
- **Séparation des préoccupations** - Contenu séparé de la présentation
- **URLs externes** - Gestion centralisée des liens média
- **Configuration modulaire** - Facile à étendre et maintenir

## Technologies utilisées

### Frontend
- **HTML5** - Structure sémantique moderne
- **CSS3** - Styles avancés avec variables, grid, flexbox
- **JavaScript ES6+** - Fonctionnalités modernes (async/await, modules)
- **Font Awesome** - Icônes vectorielles
- **Google Fonts** - Typographies Bebas Neue et Inter

### Backend
- **JSON** - Format de données léger et lisible
- **Fetch API** - Chargement asynchrone des données
- **Structure RESTful** - Organisation logique des endpoints

## Installation et configuration

### Prérequis
- Navigateur web moderne (Chrome, Firefox, Safari, Edge)
- Serveur web local pour le développement (optionnel mais recommandé)

### Installation simple
1. Télécharger ou cloner le projet
2. Ouvrir `frontend/index.html` dans un navigateur
3. Le site fonctionne directement !

### Installation avec serveur local (recommandé)
```bash
# Avec Python 3
cd afronoce-2025/frontend
python -m http.server 8000

# Avec Node.js (si npx est installé)
cd afronoce-2025/frontend
npx serve .

# Avec PHP
cd afronoce-2025/frontend
php -S localhost:8000
```

Puis ouvrir http://localhost:8000

## Configuration des données

### Modifier les informations de l'événement
Éditer `backend/data/event-info.json` :
```json
{
  "event": {
    "name": "Afronoce",
    "date": "2025-10-25",
    "location": {
      "venue": "Paris Pleyel Resort"
    }
  }
}
```

### Ajouter des activités au programme
Éditer `backend/data/program.json` :
```json
{
  "activities": [
    {
      "title": "Nouvelle activité",
      "category": "Exposition",
      "time": "14h - 16h",
      "description": "Description de l'activité"
    }
  ]
}
```

### Modifier les sponsors
Éditer `backend/data/sponsors.json` :
```json
{
  "sponsors": [
    {
      "name": "Nouveau Sponsor",
      "level": "platinum",
      "logo": "URL_du_logo"
    }
  ]
}
```

### Changer les images
Éditer `backend/data/media-links.json` :
```json
{
  "hero": {
    "backgroundImage": "URL_nouvelle_image"
  }
}
```

## Structure du CSS

Le fichier `frontend/css/styles.css` est entièrement commenté avec :
- **Organisation par sections** - Navigation, Hero, Programme, etc.
- **Commentaires détaillés** - Chaque propriété expliquée
- **Variables CSS** - Couleurs du thème centralisées
- **Media queries** - Adaptations responsive documentées

### Variables principales
```css
:root {
    --afro-gold: #F59E0B;     /* Or principal */
    --afro-orange: #EA580C;    /* Orange accent */
    --afro-dark: #0A0A0A;      /* Fond sombre */
}
```

## Fonctionnalités JavaScript

### Chargement des données
```javascript
// Chargement asynchrone depuis le backend
async function loadAllData() {
    const [eventInfo, program, sponsors, mediaLinks] = await Promise.all([
        loadJSON('backend/data/event-info.json'),
        // ...autres fichiers
    ]);
}
```

### Compte à rebours
- Calcul en temps réel jusqu'à la date de l'événement
- Mise à jour automatique chaque seconde
- Format : Jours / Heures / Minutes / Secondes

### Filtres dynamiques
- Filtrage des activités par catégorie
- Animation des cartes
- State management des boutons actifs

## Personnalisation

### Couleurs du thème
Modifier les variables CSS dans `styles.css` :
```css
:root {
    --afro-gold: #VOTRE_COULEUR;
    --afro-orange: #VOTRE_COULEUR;
}
```

### Polices
Changer les imports Google Fonts dans `index.html` :
```html
<link href="https://fonts.googleapis.com/css2?family=VOTRE_POLICE" rel="stylesheet">
```

### Images
- Remplacer les URLs dans `media-links.json`
- Ou ajouter des images locales dans `frontend/assets/images/`

## Optimisations

### Performance
- Images optimisées via Unsplash
- CSS minifié pour la production
- Chargement asynchrone des données
- Animations GPU-accélérées

### SEO
- Structure HTML sémantique
- Meta tags appropriés
- URLs d'ancrage pour la navigation
- Alt texts sur les images

### Accessibilité
- Contraste suffisant (WCAG AA)
- Navigation au clavier
- ARIA labels sur les éléments interactifs
- Texte lisible et tailles appropriées

## Déploiement

### Hébergement statique
Compatible avec :
- GitHub Pages
- Netlify
- Vercel
- Firebase Hosting
- Surge.sh

### Configuration serveur
Pour un serveur Apache, ajouter `.htaccess` :
```apache
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^(.*)$ index.html [QSA,L]
```

## Maintenance

### Mise à jour des données
- Modifier uniquement les fichiers JSON
- Pas besoin de toucher au code
- Rechargement automatique des données

### Ajout de fonctionnalités
1. Modifier les fichiers JSON pour les données
2. Ajouter les styles CSS nécessaires
3. Implémenter la logique JavaScript
4. Tester sur différents appareils

## Dépannage

### Problèmes courants
- **CORS Error** : Utiliser un serveur local
- **Images non affichées** : Vérifier les URLs dans `media-links.json`
- **Données non chargées** : Vérifier la console du navigateur
- **Responsive broken** : Tester les media queries CSS

### Debug
Ouvrir la console développeur (F12) pour voir :
- Erreurs de chargement des données
- Problèmes JavaScript
- Requêtes réseau échouées

## Contribuer

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Commiter les changes (`git commit -m 'Ajout nouvelle fonctionnalité'`)
4. Push vers la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. Ouvrir une Pull Request

## Licence

Ce projet est sous licence MIT. Voir le fichier LICENSE pour plus de détails.

## Support

Pour toute question ou problème :
- Ouvrir une issue sur GitHub
- Contacter l'équipe de développement
- Consulter la documentation technique

---

**Afronoce 2025** - Célébrons la culture africaine ensemble ! 🎉