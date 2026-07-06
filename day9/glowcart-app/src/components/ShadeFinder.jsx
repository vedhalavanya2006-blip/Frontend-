import { useState } from 'react';
import { X, Sparkles, ShoppingBag } from 'lucide-react';

const undertones = [
  { key: "cool", title: "Cool", desc: "Veins appear blue/purple; silver jewelry flatters you.", color: "#F7E1E5" },
  { key: "neutral", title: "Neutral", desc: "Veins appear blue-green; gold and silver look great.", color: "#F1E4DF" },
  { key: "warm", title: "Warm", desc: "Veins appear greenish; gold jewelry flatters you.", color: "#EED4C2" }
];

const skinDepths = [
  { key: "fair", title: "Porcelain & Fair", hex: "#FCF0E4", desc: "Very light, burns easily in the sun." },
  { key: "medium", title: "Ivory & Light Medium", hex: "#F5DEC9", desc: "Medium-light tone, tans gradually." },
  { key: "tan", title: "Honey & Golden Tan", hex: "#E7C5A3", desc: "Warm caramel-tan shade, rarely burns." },
  { key: "deep", title: "Amber & Rich Deep", hex: "#C59B79", desc: "Rich deep bronze, tans deeply." }
];

// Swatch match database
const swatchMatches = {
  "cool-fair": { name: "Porcelain (Cool)", hex: "#FCEFE5", productShadeName: "Porcelain (Cool)", foundationId: "found-focus", lipMatchName: "French Rose", lipId: "lip-lustre", lipHex: "#D27D7D" },
  "cool-medium": { name: "Ivory (Neutral)", hex: "#F7E1CE", productShadeName: "Ivory (Neutral)", foundationId: "found-focus", lipMatchName: "Berry Kiss", lipId: "lip-crayon", lipHex: "#A83F5F" },
  "cool-tan": { name: "Warm Honey (Warm)", hex: "#E9C4A6", productShadeName: "Warm Honey (Warm)", foundationId: "found-focus", lipMatchName: "Plum Wine", lipId: "lip-lustre", lipHex: "#5C263A" },
  "cool-deep": { name: "Golden Amber (Warm)", hex: "#C59B79", productShadeName: "Golden Amber (Warm)", foundationId: "found-focus", lipMatchName: "Plum Wine", lipId: "lip-lustre", lipHex: "#5C263A" },
  
  "neutral-fair": { name: "Ivory (Neutral)", hex: "#F7E1CE", productShadeName: "Ivory (Neutral)", foundationId: "found-focus", lipMatchName: "Bare Nude", lipId: "lip-lustre", lipHex: "#C79383" },
  "neutral-medium": { name: "Ivory (Neutral)", hex: "#F7E1CE", productShadeName: "Ivory (Neutral)", foundationId: "found-focus", lipMatchName: "Bare Nude", lipId: "lip-lustre", lipHex: "#C79383" },
  "neutral-tan": { name: "Warm Honey (Warm)", hex: "#E9C4A6", productShadeName: "Warm Honey (Warm)", foundationId: "found-focus", lipMatchName: "Peach Silk", lipId: "lip-crayon", lipHex: "#F3A261" },
  "neutral-deep": { name: "Golden Amber (Warm)", hex: "#C59B79", productShadeName: "Golden Amber (Warm)", foundationId: "found-focus", lipMatchName: "Plum Wine", lipId: "lip-lustre", lipHex: "#5C263A" },

  "warm-fair": { name: "Ivory (Neutral)", hex: "#F7E1CE", productShadeName: "Ivory (Neutral)", foundationId: "found-focus", lipMatchName: "Peach Silk", lipId: "lip-crayon", lipHex: "#F3A261" },
  "warm-medium": { name: "Warm Honey (Warm)", hex: "#E9C4A6", productShadeName: "Warm Honey (Warm)", foundationId: "found-focus", lipMatchName: "Coral Crush", lipId: "lip-crayon", lipHex: "#E07A5F" },
  "warm-tan": { name: "Warm Honey (Warm)", hex: "#E9C4A6", productShadeName: "Warm Honey (Warm)", foundationId: "found-focus", lipMatchName: "Golden Coral", lipId: "blush-petals", lipHex: "#E0837E" }, // can pair with blush
  "warm-deep": { name: "Golden Amber (Warm)", hex: "#C59B79", productShadeName: "Golden Amber (Warm)", foundationId: "found-focus", lipMatchName: "Plum Wine", lipId: "lip-lustre", lipHex: "#5C263A" }
};

export default function ShadeFinder({ isOpen, onClose, productsList, onAddToCart }) {
  const [selectedUndertone, setSelectedUndertone] = useState('neutral');
  const [selectedDepth, setSelectedDepth] = useState('medium');

  if (!isOpen) return null;

  // Retrieve current matches
  const matchKey = `${selectedUndertone}-${selectedDepth}`;
  const match = swatchMatches[matchKey] || swatchMatches["neutral-medium"];

  const foundationProduct = productsList.find(p => p.id === match.foundationId);
  const lipProduct = productsList.find(p => p.id === match.lipId);

  // Match corresponding foundation shade object
  const foundationShade = foundationProduct?.shades?.find(s => s.name === match.productShadeName);
  // Match lipstick shade object
  const lipShade = lipProduct?.shades?.find(s => s.name === match.lipMatchName);

  const handleAddFoundation = () => {
    if (foundationProduct) {
      onAddToCart(foundationProduct, foundationShade || null);
    }
  };

  const handleAddLip = () => {
    if (lipProduct) {
      onAddToCart(lipProduct, lipShade || null);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: '840px' }} onClick={(e) => e.stopPropagation()}>
        <button className="modal-close flex-center" onClick={onClose}>
          <X size={20} />
        </button>

        <div className="shade-finder-box">
          <div className="shade-finder-grid">
            
            {/* Interactive Section */}
            <div className="shade-finder-interactive">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <Sparkles size={18} color="var(--c-gold)" />
                <span className="subtitle" style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600, color: 'var(--c-gold)' }}>Exclusive Shade Finder</span>
              </div>
              <h2 className="qv-title" style={{ marginBottom: '24px' }}>Match Your Complexion</h2>

              {/* Step 1: Undertones */}
              <div className="sf-step-title">1. What is your Skin Undertone?</div>
              <div className="sf-options-row">
                {undertones.map(u => (
                  <button
                    key={u.key}
                    className={`sf-option-btn ${selectedUndertone === u.key ? 'active' : ''}`}
                    onClick={() => setSelectedUndertone(u.key)}
                  >
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                      <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: u.color, border: '1px solid rgba(0,0,0,0.1)' }} />
                      <span>{u.title}</span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Step 2: Depths */}
              <div className="sf-step-title">2. Select Your Tone Intensity:</div>
              <div className="sf-tone-grid">
                {skinDepths.map(d => (
                  <div
                    key={d.key}
                    className={`sf-tone-card ${selectedDepth === d.key ? 'active' : ''}`}
                    onClick={() => setSelectedDepth(d.key)}
                  >
                    <div className="sf-swatch-preview" style={{ backgroundColor: d.hex }} />
                    <span>{d.title}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Match Display Section */}
            <div className="shade-finder-visualizer animate-fade">
              <div className="sf-v-swatch" style={{ backgroundColor: match.hex }}></div>
              
              <h3 className="sf-match-name">{match.name}</h3>
              <p className="sf-match-desc">
                This soft golden-nude shade matches your {selectedUndertone} undertone and {selectedDepth} intensity.
              </p>

              <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {/* Foundation Match */}
                {foundationProduct && (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px', borderRadius: '8px', backgroundColor: 'var(--bg-card)', border: '1px solid rgba(197, 160, 89, 0.15)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', textAlign: 'left' }}>
                      <img src={foundationProduct.image} alt={foundationProduct.name} style={{ width: '36px', height: '36px', objectFit: 'cover', borderRadius: '4px' }} />
                      <div>
                        <div style={{ fontSize: '11px', fontWeight: 600 }}>{foundationProduct.name}</div>
                        <div style={{ fontSize: '10px', color: 'var(--c-gold)' }}>Shade: {match.productShadeName}</div>
                      </div>
                    </div>
                    <button className="prod-add-btn" style={{ width: '28px', height: '28px' }} onClick={handleAddFoundation}>
                      <ShoppingBag size={12} />
                    </button>
                  </div>
                )}

                {/* Lipstick Match */}
                {lipProduct && (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px', borderRadius: '8px', backgroundColor: 'var(--bg-card)', border: '1px solid rgba(197, 160, 89, 0.15)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', textAlign: 'left' }}>
                      <img src={lipProduct.image} alt={lipProduct.name} style={{ width: '36px', height: '36px', objectFit: 'cover', borderRadius: '4px' }} />
                      <div>
                        <div style={{ fontSize: '11px', fontWeight: 600 }}>{lipProduct.name}</div>
                        <div style={{ fontSize: '10px', color: 'var(--c-gold)' }}>Shade: {match.lipMatchName}</div>
                      </div>
                    </div>
                    <button className="prod-add-btn" style={{ width: '28px', height: '28px' }} onClick={handleAddLip}>
                      <ShoppingBag size={12} />
                    </button>
                  </div>
                )}
              </div>

              <button
                className="btn-gold"
                style={{ width: '100%', marginTop: '24px', height: '42px', fontSize: '12px' }}
                onClick={() => {
                  handleAddFoundation();
                  handleAddLip();
                  onClose();
                }}
              >
                Add Matches To Bag
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
