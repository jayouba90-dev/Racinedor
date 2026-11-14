// ============================================================
//  C'EST ICI QUE TU MODIFIES TON SITE (sans toucher au reste)
// ============================================================

// 1) Informations de la boutique
const SITE = {
  nom: "Racine d’Or",

  // Ton numéro WhatsApp, en format international, SANS le + et SANS espaces.
  // Exemple pour le Bénin : 229 + ton numéro  ->  "22901234567"
  whatsapp: "2290148155345",

  devise: "FCFA"
};

// 2) Tes produits
// Pour ajouter un produit : copie un bloc { ... }, colle-le à la suite
// (sans oublier la virgule entre deux blocs) et change les valeurs.
// "image" = le chemin de la photo dans le dossier images.
const PRODUITS = [
  {
    nom: "COSSETTE D'IGNAME",
    categorie: "Catégorie A",
    prix: 1500,
    unite: "le KG",
    description: " "Produit de l'année, cultivé localement.".",
    image: "images/produit-1.jpg"
  },
  {
    nom: "BOUILLIE BEBE",
    categorie: "Catégorie A",
    prix: 2000,
    unite: "le kg",
    description: "bouillie riche composé de maïs de soja de l'arachide facile a digéger.",
    image: "images/produit-2.jpg"
  },
  {
    nom: "Produit exemple 3",
    categorie: "Catégorie B",
    prix: 1000,
    unite: "le kilo",
    description: "Décris ici ton produit en une phrase courte.",
    image: "images/produit-3.jpg"
  },
  {
    nom: "Produit exemple 4",
    categorie: "Catégorie B",
    prix: 3500,
    unite: "le litre",
    description: "Décris ici ton produit en une phrase courte.",
    image: "images/produit-4.jpg"
  },
  {
    nom: "Produit exemple 5",
    categorie: "Catégorie A",
    prix: 2500,
    unite: "le lot",
    description: "Décris ici ton produit en une phrase courte.",
    image: "images/produit-5.jpg"
  },
  {
    nom: "Produit exemple 6",
    categorie: "Catégorie B",
    prix: 5000,
    unite: "le carton",
    description: "Décris ici ton produit en une phrase courte.",
    image: "images/produit-6.jpg"
  }
];
