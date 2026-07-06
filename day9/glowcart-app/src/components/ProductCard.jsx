import { useState } from 'react';
import { Heart, ShoppingBag, Eye } from 'lucide-react';

export default function ProductCard({
  product,
  onAddToCart,
  onAddToWishlist,
  isWishlisted,
  onQuickView,
  isCompared,
  onToggleCompare
}) {
  const [activeShadeIndex, setActiveShadeIndex] = useState(0);

  // Derive active shade and image
  const hasShades = product.shades && product.shades.length > 0;
  const currentShade = hasShades ? product.shades[activeShadeIndex] : null;
  const cardImage = currentShade && currentShade.image ? currentShade.image : product.image;
  const cardName = currentShade ? `${product.name} - ${currentShade.name}` : product.name;

  // Compute discount percentage if any
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <div className="prod-card animate-fade">
      {/* Discount Badge */}
      {discount > 0 && (
        <span className="prod-badge-discount">-{discount}%</span>
      )}

      {/* Wishlist Button */}
      <button
        onClick={() => onAddToWishlist(product, currentShade)}
        className={`prod-wishlist ${isWishlisted ? 'active' : ''}`}
        title="Add to Wishlist"
      >
        <Heart fill={isWishlisted ? "currentColor" : "none"} size={16} />
      </button>

      {/* Image Gallery Wrap */}
      <div className="prod-img-wrap" onClick={() => onQuickView(product, activeShadeIndex)}>
        <img src={cardImage} alt={cardName} />
        {product.secondaryImage && (
          <img src={product.secondaryImage} alt={cardName} className="prod-img-secondary" />
        )}
        <div className="prod-overlay-btn">
          <Eye size={14} style={{ marginRight: '6px', display: 'inline-block', verticalAlign: 'middle' }} />
          Quick View
        </div>
      </div>

      {/* Details Box */}
      <div className="prod-info">
        <span className="prod-brand">{product.brand}</span>
        <h3 className="prod-name" onClick={() => onQuickView(product, activeShadeIndex)}>
          {cardName}
        </h3>

        {/* Rating */}
        <div className="prod-rating">
          <div className="stars-row">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg
                key={i}
                viewBox="0 0 24 24"
                style={{
                  color: i < Math.floor(product.rating) ? '#FFB800' : '#E2DCE6',
                  fill: 'currentColor',
                  width: '12px',
                  height: '12px'
                }}
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            ))}
          </div>
          <span>({product.reviewCount})</span>
        </div>

        {/* Shade Selectors */}
        {hasShades ? (
          <div className="prod-shades">
            {product.shades.map((shade, idx) => (
              <button
                key={shade.name}
                className={`shade-dot ${idx === activeShadeIndex ? 'active' : ''}`}
                style={{ backgroundColor: shade.hex }}
                onClick={() => setActiveShadeIndex(idx)}
                title={shade.name}
              />
            ))}
          </div>
        ) : (
          <div style={{ height: '14px', marginBottom: '16px' }} /> // Spacer to preserve card height alignment
        )}

        {/* Bottom pricing and cart buy */}
        <div className="prod-bottom">
          <div className="prod-price-box">
            <span className="prod-price">${product.price}</span>
            {product.originalPrice > product.price && (
              <span className="prod-old-price">${product.originalPrice}</span>
            )}
          </div>

          <button
            className="prod-add-btn"
            onClick={() => onAddToCart(product, currentShade)}
            title="Add to Shopping Bag"
          >
            <ShoppingBag size={16} />
          </button>
        </div>

        {/* Comparison Option */}
        <label className="prod-compare-checkbox">
          <input
            type="checkbox"
            checked={isCompared}
            onChange={() => onToggleCompare(product)}
          />
          {isCompared ? (
            <span style={{ color: 'var(--c-gold)', fontWeight: 600 }}>
              Added to Compare
            </span>
          ) : (
            <span>Compare Product</span>
          )}
        </label>
      </div>
    </div>
  );
}
