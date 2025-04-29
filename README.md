# CompanyViene Web App

Site web moderne et responsive pour CompanyViene, développé avec Next.js 15 et Tailwind CSS.

## Technologies utilisées

- Next.js 15.1.3 (App Router)
- React 18
- Tailwind CSS 4
- Lucide Icons
- Google Maps API
- i18n pour le multilingue (FR/EN)

## Prérequis

- Node.js 18.17 ou supérieur
- npm ou yarn
- Clé API Google Maps

## Installation

1. Clonez le dépôt :

```bash
git clone https://github.com/companyviene/companyviene-web-app.git
cd companyviene-web-app
```

2. Installez les dépendances :

```bash
npm install
# ou
yarn install
```

3. Créez un fichier `.env.local` à la racine du projet et ajoutez vos variables d'environnement :

```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=votre_cle_api_google_maps
```

4. Lancez le serveur de développement :

```bash
npm run dev
# ou
yarn dev
```

5. Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## Structure du projet

```
/app
  /[locale]             # Support multilingue (FR/EN)
    /page.js            # Page d'accueil
    /a-propos/page.js   # Page À propos
    /produits-services/page.js # Page Produits & Services
    /contact/page.js    # Page Contact
    /layout.js          # Layout principal
  /api                  # Routes API
    /contact/route.js   # API pour le formulaire de contact

/components
  /layout              # Composants de mise en page
  /ui                  # Composants UI réutilisables
  /sections            # Sections de pages

/config               # Configuration du site
/lib                  # Utilitaires et hooks
/styles               # Styles globaux
/public               # Assets statiques
```

## Fonctionnalités

- Design responsive et moderne
- Support multilingue (FR/EN)
- Formulaire de contact avec validation
- Intégration Google Maps
- Optimisation SEO
- Performance optimisée
- Composants UI réutilisables
- Système de thème personnalisable

## Scripts disponibles

- `npm run dev` : Lance le serveur de développement
- `npm run build` : Construit l'application pour la production
- `npm run start` : Lance l'application en mode production
- `npm run lint` : Vérifie le code avec ESLint

## Contribution

1. Fork le projet
2. Créez votre branche (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## Contact

CompanyViene - contact@companyviene.com

Lien du projet : [https://github.com/companyviene/companyviene-web-app](https://github.com/companyviene/companyviene-web-app)
