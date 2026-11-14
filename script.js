// Ce fichier fait fonctionner le site. Tu n'as normalement pas besoin de le modifier.

(function () {
  "use strict";

  var formatPrix = new Intl.NumberFormat("fr-FR");

  function prix(valeur) {
    return formatPrix.format(valeur) + " " + SITE.devise;
  }

  function lienWhatsApp(message) {
    return "https://wa.me/" + SITE.whatsapp + "?text=" + encodeURIComponent(message);
  }

  // ---------- Boutons WhatsApp généraux (en-tête, hero, pied de page) ----------
  var messageGeneral = "Bonjour " + SITE.nom + ", j’aimerais avoir des informations.";
  document.querySelectorAll("[data-whatsapp]").forEach(function (lien) {
    lien.href = lienWhatsApp(messageGeneral);
    lien.target = "_blank";
    lien.rel = "noopener";
  });

  // ---------- Année du pied de page ----------
  document.getElementById("annee").textContent = new Date().getFullYear();

  // ---------- Logo : si l'image est absente, on la cache ----------
  var logo = document.getElementById("logo");
  logo.addEventListener("error", function () {
    logo.style.display = "none";
  });

  // ---------- Image du hero : si absente, on affiche un fond vert ----------
  var heroImage = document.getElementById("hero-image");
  var heroVisuel = document.getElementById("hero-visuel");
  heroImage.addEventListener("error", function () {
    heroImage.remove();
    heroVisuel.classList.add("sans-image");
    var lettre = document.createElement("span");
    lettre.textContent = "R";
    lettre.setAttribute("aria-hidden", "true");
    heroVisuel.appendChild(lettre);
  });

  // ---------- Produits ----------
  var grille = document.getElementById("grille");
  var filtres = document.getElementById("filtres");
  var categorieActive = "Tout";

  function creerCarte(produit) {
    var carte = document.createElement("article");
    carte.className = "carte";

    var cadre = document.createElement("div");
    cadre.className = "carte-photo";

    var img = document.createElement("img");
    img.src = produit.image;
    img.alt = produit.nom;
    img.loading = "lazy";
    img.addEventListener("error", function () {
      img.remove();
      cadre.classList.add("sans-image");
      var initiale = document.createElement("span");
      initiale.textContent = produit.nom.charAt(0).toUpperCase();
      initiale.setAttribute("aria-hidden", "true");
      cadre.appendChild(initiale);
    });
    cadre.appendChild(img);

    var corps = document.createElement("div");
    corps.className = "carte-corps";

    var categorie = document.createElement("p");
    categorie.className = "carte-categorie";
    categorie.textContent = produit.categorie;

    var titre = document.createElement("h3");
    titre.textContent = produit.nom;

    var description = document.createElement("p");
    description.className = "carte-description";
    description.textContent = produit.description;

    var ligne = document.createElement("p");
    ligne.className = "carte-prix";
    var montant = document.createElement("strong");
    montant.textContent = prix(produit.prix);
    var unite = document.createElement("span");
    unite.textContent = " " + produit.unite;
    ligne.appendChild(montant);
    ligne.appendChild(unite);

    var bouton = document.createElement("a");
    bouton.className = "bouton bouton-plein bouton-carte";
    bouton.textContent = "Commander sur WhatsApp";
    bouton.href = lienWhatsApp(
      "Bonjour " + SITE.nom + ", je voudrais commander : " +
      produit.nom + " (" + prix(produit.prix) + " " + produit.unite + ")."
    );
    bouton.target = "_blank";
    bouton.rel = "noopener";

    corps.appendChild(categorie);
    corps.appendChild(titre);
    corps.appendChild(description);
    corps.appendChild(ligne);
    corps.appendChild(bouton);

    carte.appendChild(cadre);
    carte.appendChild(corps);
    return carte;
  }

  function afficherProduits() {
    grille.textContent = "";
    var liste = PRODUITS.filter(function (p) {
      return categorieActive === "Tout" || p.categorie === categorieActive;
    });

    if (liste.length === 0) {
      var vide = document.createElement("p");
      vide.className = "vide";
      vide.textContent = "Aucun produit dans cette catégorie pour le moment.";
      grille.appendChild(vide);
      return;
    }

    liste.forEach(function (p) {
      grille.appendChild(creerCarte(p));
    });
  }

  function afficherFiltres() {
    var categories = ["Tout"];
    PRODUITS.forEach(function (p) {
      if (categories.indexOf(p.categorie) === -1) {
        categories.push(p.categorie);
      }
    });

    // Pas besoin de filtres s'il n'y a qu'une seule catégorie
    if (categories.length <= 2) {
      filtres.style.display = "none";
      return;
    }

    categories.forEach(function (nom) {
      var bouton = document.createElement("button");
      bouton.type = "button";
      bouton.className = "filtre";
      bouton.textContent = nom;
      bouton.setAttribute("aria-pressed", nom === categorieActive ? "true" : "false");
      bouton.addEventListener("click", function () {
        categorieActive = nom;
        filtres.querySelectorAll(".filtre").forEach(function (b) {
          b.setAttribute("aria-pressed", b === bouton ? "true" : "false");
        });
        afficherProduits();
      });
      filtres.appendChild(bouton);
    });
  }

  afficherFiltres();
  afficherProduits();
})();
