import { useState } from 'react';
import { ShieldCheck } from 'lucide-react';

export default function Footer({ onSubscribe }) {
  const [email, setEmail] = useState('');

  const handleSubscribeSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    onSubscribe(email);
    setEmail('');
  };

  return (
    <footer className="footer-wrap" id="tips-section">
      <div className="container">
        
        {/* Main Footer Grid */}
        <div className="footer-grid">
          
          {/* Brand Identity column */}
          <div className="footer-brand">
            <h2>LUMINESSE<span>.</span></h2>
            <p>
              An international beauty collective celebrating radiant skin formulations, velvet lip pigments, and Parisian fragrances. Our products are 100% cruelty-free, clinical-grade, and ethically sourced.
            </p>
            <div className="footer-socials">
              <a href="#" className="footer-social-icon" aria-label="Facebook">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="footer-social-icon" aria-label="Instagram">
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="#" className="footer-social-icon" aria-label="Twitter">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Catalog links column */}
          <div className="footer-col">
            <h3>Our Collections</h3>
            <ul className="footer-links">
              <li><a href="#" onClick={(e) => { e.preventDefault(); document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' }); }}>Makeup Artistry</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' }); }}>Clinical Skincare</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' }); }}>Botanical Haircare</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' }); }}>Haute Fragrance</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' }); }}>Professional Tools</a></li>
            </ul>
          </div>

          {/* Services / Experiences links column */}
          <div className="footer-col">
            <h3>Curated Experience</h3>
            <ul className="footer-links">
              <li><a href="#routine-builder-section" onClick={(e) => { e.preventDefault(); document.getElementById('routine-builder-section')?.scrollIntoView({ behavior: 'smooth' }); }}>Routine Planner</a></li>
              <li><a href="#lookbook-section" onClick={(e) => { e.preventDefault(); document.getElementById('lookbook-section')?.scrollIntoView({ behavior: 'smooth' }); }}>Makeup Lookbook</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Shade Matcher</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Skin Diagnosis Quiz</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); alert("Reward Tier VIP benefits: Earn double points on all New Launches. Early access to Limited Collections!"); }}>Membership Benefits</a></li>
            </ul>
          </div>

          {/* Newsletter subscription column */}
          <div className="footer-newsletter">
            <h3>Subscribe to Editorial</h3>
            <p>Join the Luminesse VIP circle to receive weekly beauty forecasts, limited edition launches, and skin tips.</p>
            <form className="newsletter-form" onSubmit={handleSubscribeSubmit}>
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="btn-gold flex-center" style={{ padding: '0 16px', borderRadius: '8px' }}>
                Join
              </button>
            </form>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '16px', fontSize: '11px', color: 'rgba(255,255,255,0.45)' }}>
              <ShieldCheck size={14} color="var(--c-gold)" />
              Secure checkout & privacy guaranteed.
            </div>
          </div>

        </div>

        {/* Footer Editorial / Tips Carousel */}
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '24px', marginBottom: '40px' }}>
          <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--c-gold)', fontWeight: 700, display: 'block', marginBottom: '12px' }}>
            Weekly Skin Wisdom
          </span>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', fontSize: '12px', lineHeight: '1.6' }}>
            <div>
              <h4 style={{ color: '#FFFFFF', marginBottom: '6px', fontWeight: 600 }}>💡 Tip #1: Cleanse Thoroughly</h4>
              <p style={{ fontWeight: 300 }}>Always massage foaming cleansers for a full 60 seconds. This allows peptides and active centella ingredients to bond and effectively purify pores.</p>
            </div>
            <div>
              <h4 style={{ color: '#FFFFFF', marginBottom: '6px', fontWeight: 600 }}>💡 Tip #2: Lock in Hydration</h4>
              <p style={{ fontWeight: 300 }}>Apply hyaluronic serum on damp skin. This helps the molecules absorb atmospheric moisture and dry down to a plump, smooth base.</p>
            </div>
            <div>
              <h4 style={{ color: '#FFFFFF', marginBottom: '6px', fontWeight: 600 }}>💡 Tip #3: SPF Protection</h4>
              <p style={{ fontWeight: 300 }}>Never skip sunscreen, even on cloudy days. UVA rays pass through window glass, causing premature collagen degradation and fine lines.</p>
            </div>
          </div>
        </div>

        {/* Footer Bottom copyright */}
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} LUMINESSE Inc. All rights reserved. Made for luxury beauty experiences.</p>
          <div className="footer-bottom-links">
            <a href="#" onClick={(e) => { e.preventDefault(); alert("Privacy Policy: We keep your cosmetics choice and skincare diagnostic records secure and private. Your data is never sold."); }}>Privacy Policy</a>
            <a href="#" onClick={(e) => { e.preventDefault(); alert("Terms of Service: By shopping at Luminesse, you agree to our 30-day return policy and standard shipping terms."); }}>Terms of Service</a>
            <a href="#" onClick={(e) => { e.preventDefault(); alert("Shipping & Returns: Free standard shipping on orders over $50. Return any item in unused condition within 30 days."); }}>Shipping & Returns</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
