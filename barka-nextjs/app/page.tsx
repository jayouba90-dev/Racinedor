"use client";

import { useMemo, useState } from "react";
import {
  ArrowRight, ArrowUpRight, Check, ChevronDown, ChevronRight, Clock3,
  Heart, Leaf, Menu, Minus, Plus, Search, ShieldCheck, ShoppingBag,
  ShoppingCart, Sparkles, Truck, X
} from "lucide-react";

type Product = {
  id: number;
  name: string;
  category: string;
  description: string;
  price: number;
  weight: string;
  badge: string;
  image: string;
  tone: string;
};

const products: Product[] = [
  {
    id: 1, name: "Farine de cossettes d’igname", category: "Farines",
    description: "Une farine traditionnelle, idéale pour préparer vos repas du quotidien. À conserver au sec, à l’abri de la chaleur.",
    price: 2500, weight: "1 kg", badge: "Le classique",
    image: "https://images.unsplash.com/photo-1627485937980-221c88ac04f9?auto=format&fit=crop&w=1000&q=85",
    tone: "sand"
  },
  {
    id: 2, name: "Farine pour enfants", category: "Nutrition",
    description: "Une préparation céréalière à intégrer dans une alimentation adaptée à l’âge de l’enfant. Vérifiez les ingrédients et allergènes avant utilisation.",
    price: 3500, weight: "500 g", badge: "À découvrir",
    image: "https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?auto=format&fit=crop&w=1000&q=85",
    tone: "peach"
  },
  {
    id: 3, name: "Flocons d’avoine", category: "Céréales",
    description: "Des flocons polyvalents pour vos petits-déjeuners, porridges et recettes maison.",
    price: 2000, weight: "500 g", badge: "Petit-déjeuner",
    image: "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?auto=format&fit=crop&w=1000&q=85",
    tone: "sage"
  }
];

const formatPrice = (price: number) => `${price.toLocaleString("fr-FR")} FCFA`;

export default function Home() {
  const [cart, setCart] = useState<Record<number, number>>({});
  const [activeCategory, setActiveCategory] = useState("Tout");
  const [search, setSearch] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [selected, setSelected] = useState<Product | null>(null);
  const [notice, setNotice] = useState("");

  const categories = ["Tout", "Farines", "Nutrition", "Céréales"];
  const filtered = useMemo(() => products.filter((p) =>
    (activeCategory === "Tout" || p.category === activeCategory) &&
    (p.name.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase()))
  ), [activeCategory, search]);

  const count = Object.values(cart).reduce((a, b) => a + b, 0);
  const total = products.reduce((sum, p) => sum + p.price * (cart[p.id] || 0), 0);

  function add(id: number) {
    setCart((old) => ({ ...old, [id]: (old[id] || 0) + 1 }));
    setNotice("Produit ajouté au panier");
    window.setTimeout(() => setNotice(""), 2200);
  }
  function changeQty(id: number, delta: number) {
    setCart((old) => {
      const next = { ...old, [id]: Math.max(0, (old[id] || 0) + delta) };
      if (next[id] === 0) delete next[id];
      return next;
    });
  }
  function checkout() {
    const lines = products.filter(p => cart[p.id]).map(p => `• ${p.name} (${p.weight}) x${cart[p.id]} : ${formatPrice(p.price * cart[p.id])}`).join("%0A");
    const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "";
    const message = `Bonjour BARKA, je souhaite commander :%0A${lines}%0A%0ATotal estimé : ${formatPrice(total)}%0A%0AMerci de me confirmer la disponibilité et les modalités de livraison.`;
    if (!phone || phone.includes("X")) {
      setNotice("Ajoutez votre numéro WhatsApp dans .env.local pour activer les commandes.");
      return;
    }
    window.open(`https://wa.me/${phone}?text=${message}`, "_blank", "noopener,noreferrer");
  }

  return (
    <main>
      <div className="announcement">
        <span><Sparkles size={13} /> Les essentiels du quotidien, sélectionnés avec soin</span>
        <span className="announcement-right">Livraison à définir selon votre zone</span>
      </div>
      <header className="header">
        <a className="brand" href="#" aria-label="BARKA accueil">
          <span className="brand-mark">b<span>.</span></span>
          <span className="brand-word">BARKA<small>LE BON GOÛT, NATURELLEMENT</small></span>
        </a>
        <nav className={`nav ${mobileMenu ? "nav-open" : ""}`}>
          <a href="#accueil" onClick={() => setMobileMenu(false)}>Accueil</a>
          <a href="#boutique" onClick={() => setMobileMenu(false)}>La boutique</a>
          <a href="#histoire" onClick={() => setMobileMenu(false)}>Notre approche</a>
          <a href="#contact" onClick={() => setMobileMenu(false)}>Contact</a>
        </nav>
        <div className="header-actions">
          <button className="icon-btn search-trigger" aria-label="Aller à la recherche" onClick={() => document.getElementById("search")?.focus()}><Search size={19}/></button>
          <button className="cart-trigger" onClick={() => setCartOpen(true)} aria-label="Ouvrir le panier">
            <ShoppingBag size={18}/><span>Panier</span><b>{count}</b>
          </button>
          <button className="icon-btn mobile-toggle" onClick={() => setMobileMenu(!mobileMenu)} aria-label="Menu">{mobileMenu ? <X/> : <Menu/>}</button>
        </div>
      </header>

      <section className="hero" id="accueil">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-line"/> SIMPLICITÉ · QUALITÉ · CONFIANCE</div>
          <h1>Le bon goût<br/><em>commence</em> ici.</h1>
          <p className="hero-text">Des farines et céréales choisies avec attention pour accompagner les bons moments de votre quotidien.</p>
          <div className="hero-buttons">
            <a className="button button-dark" href="#boutique">Découvrir la boutique <ArrowUpRight size={17}/></a>
            <a className="text-link" href="#histoire">En savoir plus <ArrowRight size={15}/></a>
          </div>
          <div className="hero-note"><span className="note-icon"><Leaf size={17}/></span><span><b>Des essentiels bien choisis</b><small>Une sélection simple, pour tous les jours.</small></span></div>
        </div>
        <div className="hero-visual">
          <div className="hero-photo"/>
          <div className="hero-stamp"><span>LE GOÛT<br/>DU BON</span><Leaf size={22}/></div>
          <div className="hero-caption"><span>01 / 03</span><i/> BARKA — NOS ESSENTIELS</div>
        </div>
        <div className="hero-side-label">BONS PRODUITS · BONS MOMENTS</div>
      </section>

      <section className="trust-strip">
        <div><Leaf/><span><b>Sélection attentive</b><small>Des produits choisis avec soin</small></span></div>
        <div><ShieldCheck/><span><b>Informations claires</b><small>Poids et détails affichés</small></span></div>
        <div><Truck/><span><b>Commande simple</b><small>Contact direct avec BARKA</small></span></div>
        <div><Heart/><span><b>Proche de vous</b><small>Un service à votre écoute</small></span></div>
      </section>

      <section className="shop-section section-wrap" id="boutique">
        <div className="section-heading">
          <div><div className="eyebrow"><span className="eyebrow-line"/> LA SÉLECTION BARKA</div><h2>Les essentiels<br/><em>à découvrir.</em></h2></div>
          <p>Retrouvez notre première sélection de farines et céréales. De nouveaux produits viendront enrichir la boutique au fil du temps.</p>
        </div>
        <div className="shop-tools">
          <div className="filters">{categories.map(c => <button key={c} className={activeCategory === c ? "filter active" : "filter"} onClick={() => setActiveCategory(c)}>{c}</button>)}</div>
          <label className="search-box"><Search size={17}/><input id="search" value={search} onChange={e => setSearch(e.target.value)} placeholder="Rechercher un produit..."/>{search && <button onClick={() => setSearch("")} aria-label="Effacer"><X size={15}/></button>}</label>
        </div>
        <div className="product-grid">
          {filtered.map((p, i) => <article className="product-card" key={p.id}>
            <button className="product-image" onClick={() => setSelected(p)} aria-label={`Voir ${p.name}`}>
              <img src={p.image} alt={p.name} />
              <span className="product-badge">{p.badge}</span><span className="quick-view">Voir le produit <ArrowUpRight size={15}/></span>
            </button>
            <div className="product-info">
              <div className="product-meta"><span>{p.category}</span><span>{p.weight}</span></div>
              <button className="product-name" onClick={() => setSelected(p)}>{p.name}</button>
              <div className="product-bottom"><b>{formatPrice(p.price)}</b><button className="add-btn" onClick={() => add(p.id)} aria-label={`Ajouter ${p.name} au panier`}><Plus size={18}/></button></div>
            </div>
          </article>)}
          {filtered.length === 0 && <div className="empty-results">Aucun produit ne correspond à votre recherche.</div>}
        </div>
        <div className="catalog-note"><span>UNE SÉLECTION QUI GRANDIT</span><p>La boutique BARKA évoluera avec de nouvelles références et catégories.</p></div>
      </section>

      <section className="story-section" id="histoire">
        <div className="story-image"><div className="story-image-inner"/><div className="story-vertical">BARKA · DEPUIS LE DÉBUT</div></div>
        <div className="story-copy"><div className="eyebrow"><span className="eyebrow-line"/> NOTRE APPROCHE</div><h2>Le quotidien mérite<br/><em>le meilleur.</em></h2><p>Chez BARKA, nous croyons que les bons produits ont leur place dans les petits rituels de chaque jour. Notre ambition : proposer une sélection alimentaire claire, pratique et agréable à découvrir.</p><p>Nous avançons avec vous, produit après produit, en privilégiant la transparence sur les informations essentielles.</p><a className="text-link" href="#boutique">Explorer les produits <ArrowRight size={15}/></a></div>
      </section>

      <section className="newsletter" id="contact">
        <div><div className="eyebrow light"><span className="eyebrow-line"/> RESTONS EN CONTACT</div><h2>Une question ?<br/><em>Parlons-en.</em></h2><p>Besoin d’une information sur un produit ou une commande ? Contactez notre équipe.</p></div>
        <a className="button button-light" href="mailto:contact@barka.bj">Écrire à BARKA <ArrowUpRight size={17}/></a>
      </section>

      <footer className="footer">
        <a className="brand brand-footer" href="#"><span className="brand-mark">b<span>.</span></span><span className="brand-word">BARKA<small>LE BON GOÛT, NATURELLEMENT</small></span></a>
        <p>Des essentiels alimentaires, choisis avec attention.</p>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} BARKA. Tous droits réservés.</span><span>Conçu avec soin.</span></div>
      </footer>

      {notice && <div className="toast"><Check size={16}/>{notice}</div>}

      {cartOpen && <div className="overlay" onMouseDown={e => { if (e.target === e.currentTarget) setCartOpen(false); }}>
        <aside className="cart-drawer">
          <div className="drawer-head"><div><span className="eyebrow">VOTRE SÉLECTION</span><h3>Mon panier <small>({count})</small></h3></div><button className="icon-btn" onClick={() => setCartOpen(false)} aria-label="Fermer"><X/></button></div>
          <div className="cart-items">
            {count === 0 ? <div className="cart-empty"><ShoppingBag size={34}/><h4>Votre panier est vide</h4><p>Ajoutez vos produits BARKA préférés.</p><button className="button button-dark" onClick={() => setCartOpen(false)}>Voir la boutique</button></div> :
              products.filter(p => cart[p.id]).map(p => <div className="cart-item" key={p.id}><img src={p.image} alt=""/><div className="cart-item-info"><b>{p.name}</b><small>{p.weight} · {formatPrice(p.price)}</small><div className="qty"><button onClick={() => changeQty(p.id, -1)} aria-label="Diminuer"><Minus size={13}/></button><span>{cart[p.id]}</span><button onClick={() => changeQty(p.id, 1)} aria-label="Augmenter"><Plus size={13}/></button></div></div><strong>{formatPrice(p.price * cart[p.id])}</strong></div>)
            }
          </div>
          {count > 0 && <div className="cart-summary"><div><span>Sous-total</span><b>{formatPrice(total)}</b></div><small>Livraison et modalités à confirmer avec BARKA.</small><button className="button button-dark checkout" onClick={checkout}>Commander via WhatsApp <ArrowUpRight size={17}/></button></div>}
        </aside>
      </div>}

      {selected && <div className="overlay modal-overlay" onMouseDown={e => { if (e.target === e.currentTarget) setSelected(null); }}>
        <div className="product-modal"><button className="icon-btn modal-close" onClick={() => setSelected(null)} aria-label="Fermer"><X/></button><img src={selected.image} alt={selected.name}/><div className="modal-content"><div className="eyebrow">{selected.category} · {selected.weight}</div><h3>{selected.name}</h3><b className="modal-price">{formatPrice(selected.price)}</b><p>{selected.description}</p><button className="button button-dark" onClick={() => { add(selected.id); setSelected(null); }}>Ajouter au panier <Plus size={17}/></button><small className="disclaimer">Les visuels sont illustratifs. Les informations produit définitives (composition, allergènes, origine et conservation) doivent être validées avant commercialisation.</small></div></div>
      </div>}
    </main>
  );
}
