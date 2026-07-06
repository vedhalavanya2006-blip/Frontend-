import { useState } from 'react';
import { X, ShoppingBag, Gift } from 'lucide-react';

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQty,
  onRemoveItem,
  onCheckout
}) {
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);
  const [giftWrap, setGiftWrap] = useState(false);
  const [promoError, setPromoError] = useState('');

  if (!isOpen) return null;

  // Calculations
  const itemsSubtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const discountAmount = Number(((itemsSubtotal * discountPercent) / 100).toFixed(2));
  const giftWrapFee = giftWrap ? 5 : 0;
  
  // Free Shipping Threshold: $50
  const shippingThreshold = 50;
  const shippingFee = (itemsSubtotal > 0 && itemsSubtotal < shippingThreshold) ? 7.95 : 0;
  const progressToFreeShipping = Math.min((itemsSubtotal / shippingThreshold) * 100, 100);
  const amountNeededForFreeShipping = shippingThreshold - itemsSubtotal;

  const total = Number((itemsSubtotal - discountAmount + giftWrapFee + shippingFee).toFixed(2));
  
  // Reward points earned (1 point per dollar of final price)
  const pointsEarned = Math.round(total);

  const handleApplyPromo = () => {
    setPromoError('');
    if (promoCode.trim().toUpperCase() === 'LUMINESSE20') {
      setDiscountPercent(20);
      setPromoApplied(true);
    } else {
      setPromoError('Invalid promo code. Try LUMINESSE20');
      setDiscountPercent(0);
      setPromoApplied(false);
    }
  };

  const handleRemovePromo = () => {
    setDiscountPercent(0);
    setPromoApplied(false);
    setPromoCode('');
  };

  const handleCheckoutClick = () => {
    onCheckout(total, pointsEarned);
    // Reset local configs after checkout
    setGiftWrap(false);
    setPromoApplied(false);
    setDiscountPercent(0);
    setPromoCode('');
  };

  return (
    <div className="drawer-backdrop" onClick={onClose}>
      <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="cart-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ShoppingBag size={20} color="var(--c-gold)" />
            <h3 className="cart-title">Your Shopping Bag ({cartItems.length})</h3>
          </div>
          <button className="cart-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Free Shipping Tracker */}
        {itemsSubtotal > 0 && (
          <div className="cart-progress-bar">
            {itemsSubtotal >= shippingThreshold ? (
              <span>✨ Congratulations! You unlocked <strong>FREE Shipping</strong>!</span>
            ) : (
              <span>Add <strong>${amountNeededForFreeShipping.toFixed(2)}</strong> more for <strong>FREE Shipping</strong></span>
            )}
            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${progressToFreeShipping}%` }}></div>
            </div>
          </div>
        )}

        {/* Items Container */}
        <div className="cart-items">
          {cartItems.length === 0 ? (
            <div className="cart-empty">
              <ShoppingBag />
              <p>Your shopping bag is empty</p>
              <button className="btn-gold" style={{ fontSize: '12px' }} onClick={onClose}>Continue Shopping</button>
            </div>
          ) : (
            cartItems.map((item) => {
              const itemName = item.shade ? `${item.name} - ${item.shade.name}` : item.name;
              return (
                <div key={`${item.id}-${item.shade?.name || 'noshade'}`} className="cart-item">
                  <img src={item.shade?.image || item.image} alt={itemName} />
                  
                  <div className="cart-item-info">
                    <span className="cart-item-brand">{item.brand}</span>
                    <h4 className="cart-item-name">{itemName}</h4>
                    {item.shade && (
                      <div className="cart-item-shade">Shade: {item.shade.name}</div>
                    )}
                    
                    <div className="cart-item-controls">
                      {/* Qty selectors */}
                      <div className="cart-qty-box">
                        <button className="cart-qty-btn" onClick={() => onUpdateQty(item.id, item.shade, item.quantity - 1)}>-</button>
                        <div className="cart-qty-val">{item.quantity}</div>
                        <button className="cart-qty-btn" onClick={() => onUpdateQty(item.id, item.shade, item.quantity + 1)}>+</button>
                      </div>
                      
                      <button className="cart-item-remove" onClick={() => onRemoveItem(item.id, item.shade)}>Remove</button>
                    </div>
                  </div>

                  <div className="cart-item-price">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer actions */}
        {cartItems.length > 0 && (
          <div className="cart-footer">
            {/* Gift Wrap Offer */}
            <div className="gift-wrap-box">
              <input
                type="checkbox"
                id="gift-wrap-checkbox"
                checked={giftWrap}
                onChange={(e) => setGiftWrap(e.target.checked)}
              />
              <div style={{ flexGrow: 1 }}>
                <label htmlFor="gift-wrap-checkbox" style={{ fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Gift size={14} color="var(--c-gold)" />
                  Add Luxury Gift Box wrapping (+$5.00)
                </label>
                <div style={{ color: 'var(--c-muted)', fontSize: '10px', marginTop: '2px' }}>
                  Includes hand-tied satin ribbon and custom note card.
                </div>
              </div>
            </div>

            {/* Promos */}
            <div className="promo-box">
              <input
                type="text"
                placeholder="Enter Coupon (e.g. LUMINESSE20)"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                disabled={promoApplied}
              />
              {promoApplied ? (
                <button style={{ backgroundColor: 'var(--c-rose)', color: 'var(--c-primary)' }} onClick={handleRemovePromo}>Remove</button>
              ) : (
                <button onClick={handleApplyPromo}>Apply</button>
              )}
            </div>
            {promoError && (
              <div style={{ color: '#E25B6C', fontSize: '11px', marginTop: '-12px', marginBottom: '12px', fontWeight: 500 }}>
                {promoError}
              </div>
            )}

            {/* Calculations Breakdown */}
            <div className="cart-summary-line">
              <span>Bag Subtotal</span>
              <span>${itemsSubtotal.toFixed(2)}</span>
            </div>
            
            {promoApplied && (
              <div className="cart-summary-line" style={{ color: 'var(--c-green)' }}>
                <span>Discount (20% off)</span>
                <span>-${discountAmount.toFixed(2)}</span>
              </div>
            )}

            {giftWrap && (
              <div className="cart-summary-line">
                <span>Gift Wrapping</span>
                <span>+$5.00</span>
              </div>
            )}

            <div className="cart-summary-line">
              <span>Shipping Fee</span>
              <span>{shippingFee === 0 ? 'FREE' : `$${shippingFee.toFixed(2)}`}</span>
            </div>

            <div className="cart-summary-line total">
              <span>Total Amount</span>
              <span>${total.toFixed(2)}</span>
            </div>

            {/* Point rewards message */}
            <div className="cart-rewards-note">
              ✨ Checkout will credit <strong>+{pointsEarned} Reward Points</strong> to your account!
            </div>

            <button className="btn-gold" style={{ width: '100%', height: '46px', fontSize: '14px' }} onClick={handleCheckoutClick}>
              Place Order - ${total.toFixed(2)}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
