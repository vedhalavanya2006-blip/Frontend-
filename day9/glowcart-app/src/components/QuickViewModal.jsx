import { useState } from 'react';
import { X, ShoppingBag, Star, Heart } from 'lucide-react';

export default function QuickViewModal({
  product,
  initialShadeIndex = 0,
  onClose,
  onAddToCart,
  onAddToWishlist,
  isWishlisted
}) {
  const [activeShadeIndex, setActiveShadeIndex] = useState(initialShadeIndex);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  if (!product) return null;

  const hasShades = product.shades && product.shades.length > 0;
  const currentShade = hasShades ? product.shades[activeShadeIndex] : null;
  const modalImage = currentShade && currentShade.image ? currentShade.image : product.image;
  const modalName = currentShade ? `${product.name} - ${currentShade.name}` : product.name;

  const handleQtyChange = (val) => {
    if (val < 1) return;
    setQuantity(val);
  };

  const handleAddToCart = () => {
    onAddToCart(product, currentShade, quantity);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close flex-center" onClick={onClose}>
          <X size={20} />
        </button>

        <div className="quickview-grid">
          {/* Gallery Column */}
          <div className="quickview-gallery">
            <div className="quickview-img-box">
              <img src={modalImage} alt={modalName} />
            </div>
          </div>

          {/* Details Column */}
          <div className="quickview-details">
            <span className="prod-brand">{product.brand}</span>
            <h2 className="qv-title">{modalName}</h2>

            {/* Ratings & Tags */}
            <div className="qv-meta">
              <div className="prod-rating" style={{ marginBottom: 0 }}>
                <div className="stars-row">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      fill={i < Math.floor(product.rating) ? '#FFB800' : 'none'}
                      color={i < Math.floor(product.rating) ? '#FFB800' : '#E2DCE6'}
                    />
                  ))}
                </div>
                <span>{product.rating} ({product.reviewCount} Reviews)</span>
              </div>
              <span>•</span>
              <span style={{ color: 'var(--c-green)', fontWeight: 600 }}>In Stock</span>
            </div>

            {/* Pricing */}
            <div className="prod-price-box" style={{ marginBottom: '20px' }}>
              <span className="prod-price" style={{ fontSize: '24px' }}>${product.price}</span>
              {product.originalPrice > product.price && (
                <span className="prod-old-price" style={{ fontSize: '16px' }}>${product.originalPrice}</span>
              )}
            </div>

            {/* Description Tab list */}
            <div className="qv-tabs">
              <button
                className={`qv-tab ${activeTab === 'description' ? 'active' : ''}`}
                onClick={() => setActiveTab('description')}
              >
                About
              </button>
              <button
                className={`qv-tab ${activeTab === 'ingredients' ? 'active' : ''}`}
                onClick={() => setActiveTab('ingredients')}
              >
                Ingredients
              </button>
              <button
                className={`qv-tab ${activeTab === 'howtouse' ? 'active' : ''}`}
                onClick={() => setActiveTab('howtouse')}
              >
                How To Use
              </button>
            </div>

            <div className="qv-tab-panel">
              {activeTab === 'description' && <p>{product.description}</p>}
              {activeTab === 'ingredients' && <p>{product.ingredients || 'Ingredients list not provided.'}</p>}
              {activeTab === 'howtouse' && <p>{product.howToUse || 'Apply gently as required.'}</p>}
            </div>

            {/* Shades list */}
            {hasShades && (
              <div className="qv-shades-box">
                <span className="qv-label">Select Color Shade:</span>
                <div className="qv-shades-list">
                  {product.shades.map((shade, idx) => (
                    <button
                      key={shade.name}
                      className={`qv-shade-pill ${idx === activeShadeIndex ? 'active' : ''}`}
                      onClick={() => setActiveShadeIndex(idx)}
                    >
                      <div className="qv-shade-color" style={{ backgroundColor: shade.hex }} />
                      {shade.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector & Add To Cart Button */}
            <div className="qv-actions">
              <div className="qv-qty-box">
                <button className="qv-qty-btn" onClick={() => handleQtyChange(quantity - 1)}>-</button>
                <div className="qv-qty-val">{quantity}</div>
                <button className="qv-qty-btn" onClick={() => handleQtyChange(quantity + 1)}>+</button>
              </div>

              <button className="btn-gold qv-add-btn" onClick={handleAddToCart}>
                <ShoppingBag size={16} />
                Add To Shopping Bag
              </button>

              <button
                className="header-btn"
                style={{ border: '1px solid rgba(34,27,39,0.1)', padding: '10px' }}
                onClick={() => onAddToWishlist(product, currentShade)}
                title="Add to Wishlist"
              >
                <Heart fill={isWishlisted ? '#E25B6C' : 'none'} color={isWishlisted ? '#E25B6C' : 'currentColor'} size={18} />
              </button>
            </div>

            <div className="qv-extra">
              🛵 Standard shipping: 3-5 days. Free on orders over $50.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
