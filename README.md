# CompanyViene Web App

Application web pour CompanyViene avec des formulaires sécurisés et une gestion des candidatures.

## Fonctionnalités

- Formulaire de contact sécurisé
- Formulaire de candidature avec upload de fichiers
- Protection contre les attaques CSRF
- Protection reCAPTCHA v3
- Limitation de débit avec Redis
- Logging structuré
- En-têtes de sécurité

## Prérequis

- Node.js 18+
- npm ou yarn
- Compte Upstash pour Redis
- Compte Google pour reCAPTCHA v3
- Serveur SMTP pour l'envoi d'emails

## Installation

1. Cloner le dépôt :

```bash
git clone https://github.com/votre-org/companyviene-web-app.git
cd companyviene-web-app
```

2. Installer les dépendances :

```bash
npm install
```

3. Copier le fichier d'exemple des variables d'environnement :

```bash
cp .env.example .env.local
```

4. Configurer les variables d'environnement dans `.env.local` :

- `UPSTASH_REDIS_REST_URL` et `UPSTASH_REDIS_REST_TOKEN` : URL et token d'accès à votre base Redis Upstash
- `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` et `RECAPTCHA_SECRET_KEY` : Clés reCAPTCHA v3 de Google
- `SMTP_*` : Configuration du serveur SMTP pour l'envoi d'emails

5. Lancer l'application en mode développement :

```bash
npm run dev
```

## Sécurité

L'application inclut plusieurs mesures de sécurité :

- Protection CSRF avec des tokens uniques
- Validation des données avec Zod
- Limitation de débit par IP
- En-têtes de sécurité (CSP, HSTS, etc.)
- Validation des fichiers uploadés
- Logging des actions importantes

## Structure des dossiers

```
.
├── app/                    # Routes et pages Next.js
│   ├── api/               # Routes API
│   └── (routes)/          # Pages de l'application
├── components/            # Composants React
├── lib/                   # Utilitaires et configurations
├── public/               # Fichiers statiques
└── uploads/              # Dossier pour les fichiers uploadés
```

## Déploiement

1. Construire l'application :

```bash
npm run build
```

2. Lancer en production :

```bash
npm start
```

## Licence

MIT

## Contact

CompanyViene - contact@companyviene.com

Lien du projet : [https://github.com/companyviene/companyviene-web-app](https://github.com/companyviene/companyviene-web-app)
