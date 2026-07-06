import { looks } from '../data/looks';
import { ShoppingBag } from 'lucide-react';

export default function LooksGrid({ productsList, onAddToCart, onSelectProduct }) {
  
  const handleShopLook = (look) => {
    // Collect all matching products
    const matchingProducts = productsList.filter(p => look.productIds.includes(p.id));
    matchingProducts.forEach(prod => {
      onAddToCart(prod, null);
    });
  };

  return (
    <section className="container" id="lookbook-section" style={{ margin: '60px auto' }}>
      <div className="section-header">
        <span className="subtitle">LUMINESSE EDITORIAL</span>
        <h2 className="title">Virtual Makeup Inspiration & Lookbooks</h2>
        <div className="divider"></div>
        <p className="desc">Recreate high-fashion runway makeups created by top global makeup designers. View step guides and buy the complete set.</p>
      </div>

      <div className="looks-row-grid">
        {looks.map((look) => {
          // Gather product details matching look
          const lookProducts = productsList.filter(p => look.productIds.includes(p.id));
          
          return (
            <div key={look.id} className="look-card animate-fade">
              <div className="look-img-box">
                <img src={look.image} alt={look.title} />
                <span className="look-meta-tag">{look.difficulty} • {look.timeToCreate}</span>
              </div>

              <div className="look-body">
                <h3 className="look-title">{look.title}</h3>
                <p className="look-desc">{look.subtitle}</p>

                {/* Steps Accordion-like or simple list */}
                <div style={{ marginBottom: '20px', background: 'var(--c-gold-light)', padding: '15px', borderRadius: '10px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--c-primary)', display: 'block', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Steps to Create:
                  </span>
                  <ul style={{ paddingLeft: '14px', margin: 0, fontSize: '11.5px', color: 'var(--c-muted)', listStyleType: 'decimal', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {look.steps.map((step, idx) => (
                      <li key={idx} style={{ lineHeight: '1.4' }}>{step}</li>
                    ))}
                  </ul>
                </div>

                {/* Shoppable items inside looks */}
                <div className="look-products-header">Key Products Used:</div>
                <div className="look-products-row">
                  {lookProducts.map((prod) => (
                    <div
                      key={prod.id}
                      className="look-product-avatar"
                      title={`${prod.brand} - ${prod.name}`}
                      onClick={() => onSelectProduct(prod)}
                    >
                      <img src={prod.image} alt={prod.name} />
                    </div>
                  ))}
                </div>

                <button
                  className="btn-gold look-shop-btn"
                  onClick={() => handleShopLook(look)}
                >
                  <ShoppingBag size={14} />
                  Shop the Entire Look
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
