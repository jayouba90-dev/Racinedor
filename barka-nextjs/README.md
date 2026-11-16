# BARKA — Boutique e-commerce Next.js

Première version de la vitrine e-commerce BARKA, conçue avec Next.js, React et CSS responsive.

## Inclus dans cette version

- Page d'accueil responsive (mobile, tablette, ordinateur)
- Présentation de la marque et des catégories
- Catalogue de départ : farine de cossettes d'igname, farine pour enfants, flocons d'avoine
- Recherche et filtres par catégorie
- Fiche produit en fenêtre modale
- Panier avec quantités et sous-total
- Préparation d'une commande via WhatsApp (après configuration du numéro)
- Architecture prête à être étendue avec Supabase et un tableau de bord

## Important avant la mise en vente

Cette version est une première version front-end. Elle n'intègre pas encore de base de données, de compte client, de gestion réelle du stock, de paiement en ligne ni de panneau administrateur sécurisé. Les prix, descriptions et images sont des exemples de démonstration à valider/remplacer. Les visuels ne garantissent pas qu'ils représentent exactement les produits vendus.

Pour les produits destinés aux enfants, faire valider la composition, l'âge recommandé, les allergènes, les consignes de préparation et les mentions réglementaires avant publication.

## Lancer en local

Prérequis : Node.js 20.9 ou plus récent.

```bash
npm install
npm run dev
```

Ouvrir http://localhost:3000

Pour vérifier la compilation :

```bash
npm run build
```

## Déploiement GitHub + Vercel

1. Extraire le ZIP sur votre ordinateur.
2. Ouvrir le dépôt GitHub BARKA.
3. Téléverser le contenu du dossier extrait à la racine du dépôt (pas le ZIP lui-même).
4. Sur Vercel, choisir **Add New → Project**, importer le dépôt GitHub.
5. Framework Preset : Next.js. Build command : `npm run build`.
6. Déployer.

À chaque mise à jour poussée sur la branche principale GitHub, Vercel peut relancer un déploiement.

## Configurer les commandes WhatsApp

Créer un fichier `.env.local` à la racine du projet (ou ajouter la variable dans Vercel → Project → Settings → Environment Variables) :

```env
NEXT_PUBLIC_WHATSAPP_NUMBER=229XXXXXXXX
```

Remplacer par le numéro WhatsApp professionnel de BARKA au format international, sans `+`, espace ni tiret. Redéployer après modification. Sans cette variable, le bouton de commande affiche un message de configuration.

## Modifier les produits

Les produits de démonstration sont dans `app/page.tsx`, dans le tableau `products`. Chaque produit contient `id`, `name`, `category`, `description`, `price`, `weight`, `badge` et `image`.

Pour une boutique réelle, la prochaine étape sera de déplacer ces données dans Supabase, puis de construire un espace administrateur protégé.

## Structure

```text
barka-nextjs/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── .env.example
├── .gitignore
├── next.config.ts
├── package.json
├── tsconfig.json
└── README.md
```
