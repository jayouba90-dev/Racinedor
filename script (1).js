// Ce fichier fait fonctionner le site. Tu n'as normalement pas besoin de le modifier.
(function () {
  "use strict";

  var formatPrix = new Intl.NumberFormat("fr-FR");
  function prix(v) { return formatPrix.format(v) + " " + SITE.devise; }
  function lienWhatsApp(m) { return "https://wa.me/" + SITE.whatsapp + "?text=" + encodeURIComponent(m); }

  // ---------- Menu (modifie ici pour changer le menu de TOUTES les pages) ----------
  var liens = [
    ["Accueil", "index.html"],
    ["Produits", "produits.html"],
    ["Comment commander", "index.html#commander"],
    ["À propos", "a-propos.html"],
    ["Contact", "contact.html"]
  ];
  var page = location.pathname.split("/").pop();
  if (!page) page = "index.html";
  if (page.indexOf(".") === -1) page += ".html";

  var menu = liens.map(function (l) {
    var actif = l[1] === page ? ' aria-current="page"' : "";
    return '<a href="' + l[1] + '"' + actif + ">" + l[0] + "</a>";
  }).join("");

  // ---------- En-tête et pied de page communs à toutes les pages ----------
  var zoneEntete = document.getElementById("entete");
  if (zoneEntete) {
    zoneEntete.outerHTML =
      '<header class="entete"><div class="conteneur entete-contenu">' +
      '<a class="marque" href="index.html" aria-label="' + SITE.nom + ', retour à l’accueil">' +
      '<img id="logo" src="images/logo.png" alt="" width="44" height="44">' +
      '<span class="marque-nom">' + SITE.nom + "</span></a>" +
      '<a class="bouton bouton-plein bouton-entete" data-whatsapp href="contact.html">Commander</a>' +
      '<nav class="menu" aria-label="Navigation principale">' + menu + "</nav>" +
      "</div></header>";
  }

  var zonePied = document.getElementById("pied");
  if (zonePied) {
    zonePied.outerHTML =
      '<footer class="pied"><div class="conteneur pied-contenu"><div>' +
      '<p class="pied-titre">Une question, une commande ?</p>' +
      '<p class="pied-texte">Écrivez-nous sur WhatsApp, nous répondons dès que possible.</p></div>' +
      '<a class="bouton bouton-blanc" data-whatsapp href="contact.html">Écrire sur WhatsApp</a></div>' +
      '<div class="conteneur pied-bas"><p>© ' + new Date().getFullYear() + " " + SITE.nom +
      ". Tous droits réservés.</p></div></footer>";
  }

  // ---------- Boutons WhatsApp généraux ----------
  var messageGeneral = "Bonjour " + SITE.nom + ", j’aimerais avoir des informations.";
  document.querySelectorAll("[data-whatsapp]").forEach(function (lien) {
    lien.href = lienWhatsApp(messageGeneral);
    lien.target = "_blank";
    lien.rel = "noopener";
  });

  // ---------- Logo : si l'image est absente, on la cache ----------
  var logo = document.getElementById("logo");
  if (logo) logo.addEventListener("error", function () { logo.style.display = "none"; });

  // ---------- Image du hero (page d'accueil) ----------
  var heroImage = document.getElementById("hero-image");
  var heroVisuel = document.getElementById("hero-visuel");
  if (heroImage && heroVisuel) {
    heroImage.addEventListener("error", function () {
      heroImage.remove();
      heroVisuel.classList.add("sans-image");
      var lettre = document.createElement("span");
      lettre.textContent = "R";
      lettre.setAttribute("aria-hidden", "true");
      heroVisuel.appendChild(lettre);
    });
  }

  // ---------- Produits ----------
  var grille = document.getElementById("grille");
  var filtres = document.getElementById("filtres");
  var categorieActive = "Tout";
  var limite = grille ? parseInt(grille.getAttribute("data-limite") || "0", 10) : 0;

  function creerCarte(p) {
    var carte = document.createElement("article");
    carte.className = "carte";

    var cadre = document.createElement("div");
    cadre.className = "carte-photo";
    var img = document.createElement("img");
    img.src = p.image;
    img.alt = p.nom;
    img.loading = "lazy";
    img.addEventListener("error", function () {
      img.remove();
      cadre.classList.add("sans-image");
      var ini = document.createElement("span");
      ini.textContent = p.nom.charAt(0).toUpperCase();
      ini.setAttribute("aria-hidden", "true");
      cadre.appendChild(ini);
    });
    cadre.appendChild(img);

    var corps = document.createElement("div");
    corps.className = "carte-corps";

    var cat = document.createElement("p");
    cat.className = "carte-categorie";
    cat.textContent = p.categorie;

    var titre = document.createElement("h3");
    titre.textContent = p.nom;

    var desc = document.createElement("p");
    desc.className = "carte-description";
    desc.textContent = p.description;

    var ligne = document.createElement("p");
    ligne.className = "carte-prix";
    var montant = document.createElement("strong");
    montant.textContent = prix(p.prix);
    var unite = document.createElement("span");
    unite.textContent = " " + p.unite;
    ligne.appendChild(montant);
    ligne.appendChild(unite);

    var bouton = document.createElement("a");
    bouton.className = "bouton bouton-plein bouton-carte";
    bouton.textContent = "Commander sur WhatsApp";
    bouton.href = lienWhatsApp("Bonjour " + SITE.nom + ", je voudrais commander : " +
      p.nom + " (" + prix(p.prix) + " " + p.unite + ").");
    bouton.target = "_blank";
    bouton.rel = "noopener";

    [cat, titre, desc, ligne, bouton].forEach(function (e) { corps.appendChild(e); });
    carte.appendChild(cadre);
    carte.appendChild(corps);
    return carte;
  }

  function afficherProduits() {
    if (!grille) return;
    grille.textContent = "";
    var liste = PRODUITS.filter(function (p) {
      return categorieActive === "Tout" || p.categorie === categorieActive;
    });
    if (limite > 0) liste = liste.slice(0, limite);

    if (liste.length === 0) {
      var vide = document.createElement("p");
      vide.className = "vide";
      vide.textContent = "Aucun produit dans cette catégorie pour le moment.";
      grille.appendChild(vide);
      return;
    }
    liste.forEach(function (p) { grille.appendChild(creerCarte(p)); });
  }

  function afficherFiltres() {
    if (!filtres) return;
    var categories = ["Tout"];
    PRODUITS.forEach(function (p) {
      if (categories.indexOf(p.categorie) === -1) categories.push(p.categorie);
    });
    if (categories.length <= 2) { filtres.style.display = "none"; return; }

    categories.forEach(function (nom) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "filtre";
      b.textContent = nom;
      b.setAttribute("aria-pressed", nom === categorieActive ? "true" : "false");
      b.addEventListener("click", function () {
        categorieActive = nom;
        filtres.querySelectorAll(".filtre").forEach(function (x) {
          x.setAttribute("aria-pressed", x === b ? "true" : "false");
        });
        afficherProduits();
      });
      filtres.appendChild(b);
    });
  }

  afficherFiltres();
  afficherProduits();
})();
