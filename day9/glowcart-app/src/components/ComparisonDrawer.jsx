import { useState } from 'react';
import { X, Layers, ShoppingBag } from 'lucide-react';

export default function ComparisonDrawer({
  compareList,
  onRemoveFromCompare,
  onClearCompare,
  onAddToCart
}) {
  const [showDetailModal, setShowDetailModal] = useState(false);

  if (compareList.length === 0) return null;

  return (
    <>
      {/* Bottom sliding bar */}
      <div className={`compare-drawer-bar open`}>
        <div className="container compare-drawer-content">
          <div className="compare-drawer-left">
            <div className="flex-center" style={{ gap: '8px' }}>
              <Layers size={18} color="var(--c-gold)" />
              <span className="compare-drawer-title">Comparison Queue ({compareList.length}/2)</span>
            </div>
            
            <div className="compare-drawer-items">
              {compareList.map((product) => (
                <div key={product.id} className="compare-drawer-item">
                  <img src={product.image} alt={product.name} />
                  <span>{product.name}</span>
                  <X size={12} onClick={() => onRemoveFromCompare(product)} />
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              className="btn-gold-outline"
              style={{ padding: '8px 20px', fontSize: '12px' }}
              onClick={onClearCompare}
            >
              Clear
            </button>
            <button
              className="btn-gold"
              style={{ padding: '8px 20px', fontSize: '12px' }}
              onClick={() => setShowDetailModal(true)}
              disabled={compareList.length < 2}
              title={compareList.length < 2 ? "Select at least 2 items to compare" : ""}
            >
              Compare Now
            </button>
          </div>
        </div>
      </div>

      {/* Comparison Detail Fullscreen Modal */}
      {showDetailModal && (
        <div className="modal-overlay" onClick={() => setShowDetailModal(false)}>
          <div
            className="modal-content animate-slideup"
            style={{ maxWidth: '850px', padding: '30px' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal-close flex-center" onClick={() => setShowDetailModal(false)}>
              <X size={20} />
            </button>

            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <h3 className="qv-title" style={{ fontFamily: 'var(--font-serif)', fontSize: '28px' }}>Product Comparison</h3>
              <p style={{ color: 'var(--c-muted)', fontSize: '13px' }}>Evaluate premium features, formulations, and values side-by-side.</p>
            </div>

            <table className="compare-modal-table">
              <thead>
                <tr>
                  <th>Product Details</th>
                  {compareList.map((product) => (
                    <td key={product.id}>
                      <div className="compare-product-header">
                        <img src={product.image} alt={product.name} />
                        <h4>{product.name}</h4>
                        <span style={{ fontSize: '11px', color: 'var(--c-gold)', fontWeight: 600 }}>{product.brand}</span>
                      </div>
                    </td>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>Price Value</th>
                  {compareList.map((product) => (
                    <td key={product.id} style={{ fontSize: '15px', fontWeight: 600 }}>
                      ${product.price}
                      {product.originalPrice > product.price && (
                        <span style={{ fontSize: '11px', textDecoration: 'line-through', color: 'var(--c-muted)', marginLeft: '6px', fontWeight: 400 }}>
                          ${product.originalPrice}
                        </span>
                      )}
                    </td>
                  ))}
                </tr>
                <tr>
                  <th>Client Rating</th>
                  {compareList.map((product) => (
                    <td key={product.id}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ fontWeight: 600 }}>{product.rating} / 5</span>
                        <span style={{ fontSize: '11.5px', color: 'var(--c-muted)' }}>({product.reviewCount} Reviews)</span>
                      </div>
                    </td>
                  ))}
                </tr>
                <tr>
                  <th>Category / Type</th>
                  {compareList.map((product) => (
                    <td key={product.id}>{product.category} ({product.subCategory})</td>
                  ))}
                </tr>
                <tr>
                  <th>Available Shades</th>
                  {compareList.map((product) => (
                    <td key={product.id}>
                      {product.shades ? (
                        <div style={{ display: 'flex', gap: '6px' }}>
                          {product.shades.map(s => (
                            <div key={s.name} style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: s.hex, border: '1px solid rgba(0,0,0,0.1)' }} title={s.name} />
                          ))}
                        </div>
                      ) : (
                        <span style={{ color: 'var(--c-muted)', fontSize: '11px' }}>Single Universal Shade</span>
                      )}
                    </td>
                  ))}
                </tr>
                <tr>
                  <th>Key Ingredients</th>
                  {compareList.map((product) => (
                    <td key={product.id} style={{ fontSize: '12px', color: 'var(--c-muted)', lineHeight: '1.4' }}>
                      {product.ingredients || 'Natural extracts'}
                    </td>
                  ))}
                </tr>
                <tr>
                  <th>Action</th>
                  {compareList.map((product) => (
                    <td key={product.id}>
                      <button
                        className="btn-gold flex-center"
                        style={{ padding: '8px 16px', fontSize: '11px', width: '100%', gap: '8px', borderRadius: '6px' }}
                        onClick={() => {
                          onAddToCart(product, null);
                          setShowDetailModal(false);
                        }}
                      >
                        <ShoppingBag size={12} />
                        Add to Bag
                      </button>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}
