import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import CategoryList from './components/CategoryList';
import ProductCard from './components/ProductCard';
import QuickViewModal from './components/QuickViewModal';
import CartDrawer from './components/CartDrawer';
import BeautyQuiz from './components/BeautyQuiz';
import ShadeFinder from './components/ShadeFinder';
import RoutineBuilder from './components/RoutineBuilder';
import LooksGrid from './components/LooksGrid';
import ComparisonDrawer from './components/ComparisonDrawer';
import Assistant from './components/Assistant';
import Footer from './components/Footer';
import { products } from './data/products';
import { Sparkles, Heart, Check, Clock, RefreshCw } from 'lucide-react';
import './App.css';

export default function App() {
  // Global States
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [compareList, setCompareList] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  
  // Modals & Panels open triggers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isShadeFinderOpen, setIsShadeFinderOpen] = useState(false);

  // Quick View selected target
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [quickViewShadeIndex, setQuickViewShadeIndex] = useState(0);

  // User details & configs
  const [rewardPoints, setRewardPoints] = useState(480);
  const [theme, setTheme] = useState('light');
  const [toastMessage, setToastMessage] = useState('');
  const [showCheckoutSuccess, setShowCheckoutSuccess] = useState(false);
  const [lastOrderDetails, setLastOrderDetails] = useState(null);

  // Countdown timer for Flash Sale
  const [timeLeft, setTimeLeft] = useState(25200); // 7 hours in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 25200));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatCountdown = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Toast feedback trigger helper
  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3000);
  };

  // Theme Toggler
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    triggerToast(`Theme set to ${newTheme === 'light' ? 'Light' : 'Dark Plum'} mode`);
  };

  // Cart operations
  const handleAddToCart = (product, shade = null, qty = 1) => {
    setCart(prev => {
      // Find if matching item + shade already exists
      const existingIdx = prev.findIndex(item =>
        item.id === product.id &&
        ((!shade && !item.shade) || (shade && item.shade && shade.name === item.shade.name))
      );

      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += qty;
        return updated;
      } else {
        return [...prev, { ...product, shade, quantity: qty }];
      }
    });

    const displayLabel = shade ? `${product.name} (${shade.name})` : product.name;
    triggerToast(`Added ${qty}x ${displayLabel} to your Shopping Bag!`);
  };

  const handleUpdateCartQty = (id, shade, newQty) => {
    if (newQty < 1) {
      handleRemoveFromCart(id, shade);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.id === id &&
        ((!shade && !item.shade) || (shade && item.shade && shade.name === item.shade.name))
          ? { ...item, quantity: newQty }
          : item
      )
    );
  };

  const handleRemoveFromCart = (id, shade) => {
    setCart(prev =>
      prev.filter(item =>
        !(item.id === id &&
          ((!shade && !item.shade) || (shade && item.shade && shade.name === item.shade.name)))
      )
    );
    triggerToast("Item removed from bag.");
  };

  // Wishlist operations
  const handleAddToWishlist = (product, shade = null) => {
    const isAlreadyIn = wishlist.some(item =>
      item.id === product.id &&
      ((!shade && !item.shade) || (shade && item.shade && shade.name === item.shade.name))
    );

    if (isAlreadyIn) {
      setWishlist(prev =>
        prev.filter(item =>
          !(item.id === product.id &&
            ((!shade && !item.shade) || (shade && item.shade && shade.name === item.shade.name)))
        )
      );
      triggerToast("Removed from Wishlist");
    } else {
      setWishlist(prev => [...prev, { ...product, shade }]);
      triggerToast("Added to Wishlist! ❤️");
    }
  };

  // Compare products operations (Limit to 2 products)
  const handleToggleCompare = (product) => {
    const exists = compareList.some(item => item.id === product.id);

    if (exists) {
      setCompareList(prev => prev.filter(item => item.id !== product.id));
      triggerToast("Removed from comparison queue.");
    } else {
      if (compareList.length >= 2) {
        triggerToast("You can compare up to 2 items at a time. Remove one first!");
        return;
      }
      setCompareList(prev => [...prev, product]);
      triggerToast("Added to comparison drawer.");
    }
  };

  const handleClearCompare = () => {
    setCompareList([]);
    triggerToast("Cleared compare queue.");
  };

  // Newsletters subscribe
  const handleSubscribeNewsletter = (email) => {
    setRewardPoints(prev => prev + 50);
    triggerToast("Welcome to LUMINESSE circle! +50 VIP points credited.");
    alert(`Merci! A confirmation forecast email has been dispatched to ${email}. You've unlocked Gold Tier benefits!`);
  };

  // Simulated checkout handler
  const handleCheckoutSubmit = (totalPrice, pointsEarned) => {
    setLastOrderDetails({ total: totalPrice, points: pointsEarned });
    setCart([]);
    setIsCartOpen(false);
    setRewardPoints(prev => prev + pointsEarned);
    setShowCheckoutSuccess(true);
  };

  // Direct product popup preview handler
  const handleSelectProduct = (product, shadeIndex = 0) => {
    setQuickViewProduct(product);
    setQuickViewShadeIndex(shadeIndex);
  };

  // Filter products by active category
  const filteredProducts = products.filter(product => {
    if (activeCategory === 'All') return true;
    if (activeCategory === 'Korean Beauty') return product.tags.includes('Korean Beauty');
    if (activeCategory === 'Organic Products') return product.tags.includes('Organic Products');
    return product.category === activeCategory;
  });

  return (
    <>
      {/* Top Banner and Navigation Sticky Header */}
      <Header
        cartCount={cart.reduce((a, b) => a + b.quantity, 0)}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenQuiz={() => setIsQuizOpen(true)}
        onOpenRoutine={() => {
          document.getElementById('routine-builder-section')?.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenShadeFinder={() => setIsShadeFinderOpen(true)}
        compareCount={compareList.length}
        onOpenCompare={() => compareList.length > 1 ? handleToggleCompare(compareList[0]) : triggerToast("Select 2 products to compare!")}
        productsList={products}
        onSelectProduct={handleSelectProduct}
        theme={theme}
        toggleTheme={toggleTheme}
        rewardPoints={rewardPoints}
      />

      {/* Main Luxury Hero Parallax Slideshow */}
      <Hero onOpenQuiz={() => setIsQuizOpen(true)} />

      {/* Aesthetic Circle Categories Bar */}
      <CategoryList
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
      />

      {/* Animated Offer Cards */}
      <section className="container animate-fade" id="offers-section" style={{ margin: '40px auto' }}>
        <div className="offers-row">
          <div className="offer-card" style={{ backgroundColor: 'var(--c-rose-light)' }}>
            <span className="offer-tag">Celebration Code</span>
            <h3 className="offer-title">20% off Entire Boutique</h3>
            <p className="offer-desc">Unlock 20% discount on all foundations, luxury perfumes, and clinical cleansers.</p>
            <span className="offer-code">LUMINESSE20</span>
          </div>

          <div className="offer-card" style={{ backgroundColor: 'var(--c-gold-light)' }}>
            <span className="offer-tag">VIP Special Offer</span>
            <h3 className="offer-title">Free Signature Gift wrapping</h3>
            <p className="offer-desc font-light">Secure hand-tied satin gift boxes and custom notes on orders over $75.</p>
            <span className="offer-code" style={{ borderColor: 'var(--c-green)', color: 'var(--c-green)' }}>AUTO-APPLIED</span>
          </div>

          <div className="offer-card" style={{ backgroundColor: 'var(--c-beige)' }}>
            <span className="offer-tag">Limited Time Flash</span>
            <h3 className="offer-title">Gold Highlighter Deal</h3>
            <p className="offer-desc">Secure our Stardust Liquid Highlighter at 15% discount before time runs out!</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 600, color: 'var(--c-gold)' }}>
              <Clock size={14} />
              Ends in: {formatCountdown(timeLeft)}
            </div>
          </div>
        </div>
      </section>

      {/* Product Catalog Grid Showcase */}
      <section className="container" id="catalog-section" style={{ margin: '60px auto' }}>
        <div className="section-header">
          <span className="subtitle">LUMINESSE REGIMENS</span>
          <h2 className="title">
            {activeCategory === 'All' ? 'The Collection' : `${activeCategory} Collection`}
          </h2>
          <div className="divider"></div>
          <p className="desc">Explore premium French formulations and Korean ritual items carefully designed for high-performance cosmetics and deep skin barrier protection.</p>
        </div>

        {filteredProducts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px', color: 'var(--c-muted)' }}>
            <RefreshCw size={24} style={{ animation: 'spinSlow 2s linear infinite', marginBottom: '16px' }} />
            <p>No products found in this category.</p>
          </div>
        ) : (
          <div className="grid-products">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                onAddToWishlist={handleAddToWishlist}
                isWishlisted={wishlist.some(item => item.id === product.id)}
                onQuickView={handleSelectProduct}
                isCompared={compareList.some(item => item.id === product.id)}
                onToggleCompare={handleToggleCompare}
              />
            ))}
          </div>
        )}
      </section>

      {/* Unique Feature: Skincare Routine Builder */}
      <RoutineBuilder
        productsList={products}
        onAddToCart={handleAddToCart}
      />

      {/* Unique Feature: Shoppable Inspiration Lookbooks */}
      <LooksGrid
        productsList={products}
        onAddToCart={handleAddToCart}
        onSelectProduct={handleSelectProduct}
      />

      {/* Bottom Product Comparison drawer */}
      <ComparisonDrawer
        compareList={compareList}
        onRemoveFromCompare={handleToggleCompare}
        onClearCompare={handleClearCompare}
        onAddToCart={handleAddToCart}
      />

      {/* Floating Beauty Concierge Assistant */}
      <Assistant
        onOpenQuiz={() => setIsQuizOpen(true)}
        onOpenShadeFinder={() => setIsShadeFinderOpen(true)}
      />

      {/* Footer Details */}
      <Footer onSubscribe={handleSubscribeNewsletter} />

      {/* TOAST NOTIFICATION BANNER */}
      {toastMessage && (
        <div className="toast-banner">
          <Sparkles size={16} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* QUICK VIEW DETAILS MODAL */}
      {quickViewProduct && (
        <QuickViewModal
          key={quickViewProduct.id}
          product={quickViewProduct}
          initialShadeIndex={quickViewShadeIndex}
          onClose={() => setQuickViewProduct(null)}
          onAddToCart={handleAddToCart}
          onAddToWishlist={handleAddToWishlist}
          isWishlisted={wishlist.some(item => item.id === quickViewProduct.id)}
        />
      )}

      {/* SKIN QUIZ MATCH MODAL */}
      <BeautyQuiz
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        productsList={products}
        onAddToCart={handleAddToCart}
        onSelectProduct={handleSelectProduct}
      />

      {/* SHADE FINDER MATCH MODAL */}
      <ShadeFinder
        isOpen={isShadeFinderOpen}
        onClose={() => setIsShadeFinderOpen(false)}
        productsList={products}
        onAddToCart={handleAddToCart}
      />

      {/* WISHLIST OVERLAY SLIDE DRAWER */}
      {isWishlistOpen && (
        <div className="drawer-backdrop" onClick={() => setIsWishlistOpen(false)}>
          <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="cart-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Heart size={20} fill="var(--c-gold)" color="var(--c-gold)" />
                <h3 className="cart-title">Your Wishlist ({wishlist.length})</h3>
              </div>
              <button className="cart-close-btn" onClick={() => setIsWishlistOpen(false)}>
                <X size={20} />
              </button>
            </div>
            
            <div className="cart-items">
              {wishlist.length === 0 ? (
                <div className="cart-empty">
                  <Heart size={48} />
                  <p>Your wishlist is empty</p>
                  <button className="btn-gold" style={{ fontSize: '12px' }} onClick={() => setIsWishlistOpen(false)}>Continue Browsing</button>
                </div>
              ) : (
                wishlist.map((item, idx) => {
                  const label = item.shade ? `${item.name} (${item.shade.name})` : item.name;
                  return (
                    <div key={idx} className="cart-item">
                      <img src={item.shade?.image || item.image} alt={label} />
                      <div className="cart-item-info">
                        <span className="cart-item-brand">{item.brand}</span>
                        <h4 className="cart-item-name">{label}</h4>
                        <span style={{ fontSize: '13px', fontWeight: 600, display: 'block', margin: '6px 0' }}>${item.price}</span>
                        <div style={{ display: 'flex', gap: '12px' }}>
                          <button
                            className="cart-item-remove"
                            style={{ textDecoration: 'none', color: 'var(--c-gold)', fontWeight: 600 }}
                            onClick={() => {
                              handleAddToCart(item, item.shade);
                              handleAddToWishlist(item, item.shade); // removes from wishlist
                            }}
                          >
                            Move to Bag
                          </button>
                          <button className="cart-item-remove" onClick={() => handleAddToWishlist(item, item.shade)}>Remove</button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}

      {/* CART OVERLAY SLIDE DRAWER */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQty={handleUpdateCartQty}
        onRemoveItem={handleRemoveFromCart}
        onCheckout={handleCheckoutSubmit}
      />

      {/* CHECKOUT SUCCESS MODAL DIALOG */}
      {showCheckoutSuccess && lastOrderDetails && (
        <div className="modal-overlay" onClick={() => setShowCheckoutSuccess(false)}>
          <div className="modal-content animate-slideup" style={{ maxWidth: '440px', padding: '40px', textAlign: 'center' }} onClick={(e) => e.stopPropagation()}>
            <div className="flex-center" style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: 'var(--c-gold-light)', margin: '0 auto 20px' }}>
              <Check size={28} color="var(--c-gold)" />
            </div>
            
            <h2 className="brand-logo" style={{ fontSize: '20px', marginBottom: '8px' }}>Purchase Complete!</h2>
            <h3 style={{ fontSize: '24px', fontFamily: 'var(--font-serif)', marginBottom: '16px' }}>Merci Beaucoup!</h3>
            
            <div style={{ background: 'var(--bg-page)', borderRadius: '12px', padding: '20px', margin: '20px 0', border: '1px solid rgba(197, 160, 89, 0.15)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '8px' }}>
                <span style={{ color: 'var(--c-muted)' }}>Amount Charged:</span>
                <span style={{ fontWeight: 600 }}>${lastOrderDetails.total.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                <span style={{ color: 'var(--c-muted)' }}>VIP Points Credited:</span>
                <span style={{ fontWeight: 600, color: 'var(--c-green)' }}>+{lastOrderDetails.points} Points</span>
              </div>
            </div>

            <p style={{ fontSize: '12px', color: 'var(--c-muted)', lineHeight: '1.5', marginBottom: '24px' }}>
              Your order has been registered in our boutique network. A tracking code will be dispatched shortly. Thank you for shopping with LUMINESSE.
            </p>

            <button className="btn-gold" style={{ width: '100%' }} onClick={() => setShowCheckoutSuccess(false)}>
              Back To Store
            </button>
          </div>
        </div>
      )}
    </>
  );
}

// Inline fallback since X icon was declared elsewhere
const X = ({ size = 24, onClick }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    onClick={onClick}
    style={{ cursor: 'pointer' }}
  >
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);
