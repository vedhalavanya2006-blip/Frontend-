import { useState } from 'react';
import { Sun, Moon, Trash2, Sparkles } from 'lucide-react';

export default function RoutineBuilder({ productsList, onAddToCart }) {
  // AM and PM routine slots states
  const [amRoutine, setAmRoutine] = useState({
    cleanse: null,
    treat: null,
    hydrate: null,
    protect: null
  });

  const [pmRoutine, setPmRoutine] = useState({
    cleanse: null,
    treat: null,
    hydrate: null,
    nourish: null
  });

  // Filter only skincare/haircare items for routine shelf
  const shelfProducts = productsList.filter(p =>
    ['Skincare', 'Haircare'].includes(p.category)
  );

  const handleAddProduct = (product, period) => {
    const sub = product.subCategory.toLowerCase();
    let slot = '';

    if (sub.includes('wash') || sub.includes('cleanser')) {
      slot = 'cleanse';
    } else if (sub.includes('serum')) {
      slot = 'treat';
    } else if (sub.includes('moisturizer') || sub.includes('cream')) {
      slot = 'hydrate';
    } else if (sub.includes('sunscreen') || sub.includes('protect')) {
      slot = 'protect';
    } else {
      slot = period === 'am' ? 'hydrate' : 'nourish';
    }

    if (period === 'am') {
      setAmRoutine(prev => ({ ...prev, [slot]: product }));
    } else {
      setPmRoutine(prev => ({ ...prev, [slot]: product }));
    }
  };

  const handleRemoveSlot = (period, slot) => {
    if (period === 'am') {
      setAmRoutine(prev => ({ ...prev, [slot]: null }));
    } else {
      setPmRoutine(prev => ({ ...prev, [slot]: null }));
    }
  };

  const handleAddAllToCart = () => {
    const itemsToAdd = [];
    Object.values(amRoutine).forEach(item => {
      if (item && !itemsToAdd.some(added => added.id === item.id)) {
        itemsToAdd.push(item);
      }
    });
    Object.values(pmRoutine).forEach(item => {
      if (item && !itemsToAdd.some(added => added.id === item.id)) {
        itemsToAdd.push(item);
      }
    });

    itemsToAdd.forEach(item => onAddToCart(item, null));
  };

  return (
    <section className="container" id="routine-builder-section" style={{ margin: '60px auto' }}>
      <div className="section-header">
        <span className="subtitle">Skincare Architect</span>
        <h2 className="title">Daily AM/PM Routine Builder</h2>
        <div className="divider"></div>
        <p className="desc">Map out your morning defense and nighttime cellular repair. Select clinical items from the shelf to compile your daily routine.</p>
      </div>

      <div className="routine-box">
        {/* Left Side: Product Shelf */}
        <div className="routine-shelf">
          <h3 className="routine-shelf-title flex-center" style={{ gap: '8px' }}>
            <Sparkles size={16} color="var(--c-gold)" />
            Skincare & Hair Shelf
          </h3>
          {shelfProducts.map((product) => (
            <div key={product.id} className="routine-shelf-item">
              <img src={product.image} alt={product.name} />
              <div className="routine-shelf-info" style={{ flexGrow: 1 }}>
                <h4>{product.name}</h4>
                <span>{product.brand} • ${product.price}</span>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <button
                  className="btn-gold"
                  style={{ padding: '4px 8px', fontSize: '9px', borderRadius: '4px' }}
                  onClick={() => handleAddProduct(product, 'am')}
                >
                  + Morning
                </button>
                <button
                  className="btn-gold-outline"
                  style={{ padding: '4px 8px', fontSize: '9px', borderRadius: '4px' }}
                  onClick={() => handleAddProduct(product, 'pm')}
                >
                  + Evening
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Right Side: Routine Slots */}
        <div className="routine-slots-grid">
          {/* AM Routine */}
          <div className="routine-panel-card">
            <h3 className="routine-panel-header am">
              <Sun size={20} />
              Morning (AM) Shield
            </h3>
            
            <div className="routine-slots-list">
              {/* Cleanse */}
              <div className={`routine-slot-item ${amRoutine.cleanse ? 'filled' : 'empty'}`}>
                {amRoutine.cleanse ? (
                  <>
                    <img src={amRoutine.cleanse.image} alt="cleanse" />
                    <div className="routine-slot-item-info">
                      <span style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--c-gold)', fontWeight: 600 }}>Step 1: Cleanse</span>
                      <h5>{amRoutine.cleanse.name}</h5>
                    </div>
                    <Trash2 className="routine-slot-remove" size={14} onClick={() => handleRemoveSlot('am', 'cleanse')} />
                  </>
                ) : (
                  <span>Add Cleanser / Face Wash</span>
                )}
              </div>

              {/* Treat */}
              <div className={`routine-slot-item ${amRoutine.treat ? 'filled' : 'empty'}`}>
                {amRoutine.treat ? (
                  <>
                    <img src={amRoutine.treat.image} alt="treat" />
                    <div className="routine-slot-item-info">
                      <span style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--c-gold)', fontWeight: 600 }}>Step 2: Treat & Hydrate</span>
                      <h5>{amRoutine.treat.name}</h5>
                    </div>
                    <Trash2 className="routine-slot-remove" size={14} onClick={() => handleRemoveSlot('am', 'treat')} />
                  </>
                ) : (
                  <span>Add Skincare Serum</span>
                )}
              </div>

              {/* Hydrate */}
              <div className={`routine-slot-item ${amRoutine.hydrate ? 'filled' : 'empty'}`}>
                {amRoutine.hydrate ? (
                  <>
                    <img src={amRoutine.hydrate.image} alt="hydrate" />
                    <div className="routine-slot-item-info">
                      <span style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--c-gold)', fontWeight: 600 }}>Step 3: Moisturize</span>
                      <h5>{amRoutine.hydrate.name}</h5>
                    </div>
                    <Trash2 className="routine-slot-remove" size={14} onClick={() => handleRemoveSlot('am', 'hydrate')} />
                  </>
                ) : (
                  <span>Add Cream / Moisturizer</span>
                )}
              </div>

              {/* Protect */}
              <div className={`routine-slot-item ${amRoutine.protect ? 'filled' : 'empty'}`}>
                {amRoutine.protect ? (
                  <>
                    <img src={amRoutine.protect.image} alt="protect" />
                    <div className="routine-slot-item-info">
                      <span style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--c-gold)', fontWeight: 600 }}>Step 4: Protect</span>
                      <h5>{amRoutine.protect.name}</h5>
                    </div>
                    <Trash2 className="routine-slot-remove" size={14} onClick={() => handleRemoveSlot('am', 'protect')} />
                  </>
                ) : (
                  <span>Add Sunscreen SPF</span>
                )}
              </div>
            </div>
          </div>

          {/* PM Routine */}
          <div className="routine-panel-card">
            <h3 className="routine-panel-header pm">
              <Moon size={20} />
              Evening (PM) Repair
            </h3>
            
            <div className="routine-slots-list">
              {/* Cleanse */}
              <div className={`routine-slot-item ${pmRoutine.cleanse ? 'filled' : 'empty'}`}>
                {pmRoutine.cleanse ? (
                  <>
                    <img src={pmRoutine.cleanse.image} alt="cleanse" />
                    <div className="routine-slot-item-info">
                      <span style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--c-gold)', fontWeight: 600 }}>Step 1: Cleanse</span>
                      <h5>{pmRoutine.cleanse.name}</h5>
                    </div>
                    <Trash2 className="routine-slot-remove" size={14} onClick={() => handleRemoveSlot('pm', 'cleanse')} />
                  </>
                ) : (
                  <span>Add Cleanser / Face Wash</span>
                )}
              </div>

              {/* Treat */}
              <div className={`routine-slot-item ${pmRoutine.treat ? 'filled' : 'empty'}`}>
                {pmRoutine.treat ? (
                  <>
                    <img src={pmRoutine.treat.image} alt="treat" />
                    <div className="routine-slot-item-info">
                      <span style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--c-gold)', fontWeight: 600 }}>Step 2: Treat & Repair</span>
                      <h5>{pmRoutine.treat.name}</h5>
                    </div>
                    <Trash2 className="routine-slot-remove" size={14} onClick={() => handleRemoveSlot('pm', 'treat')} />
                  </>
                ) : (
                  <span>Add Skincare Serum</span>
                )}
              </div>

              {/* Hydrate */}
              <div className={`routine-slot-item ${pmRoutine.hydrate ? 'filled' : 'empty'}`}>
                {pmRoutine.hydrate ? (
                  <>
                    <img src={pmRoutine.hydrate.image} alt="hydrate" />
                    <div className="routine-slot-item-info">
                      <span style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--c-gold)', fontWeight: 600 }}>Step 3: Moisturize</span>
                      <h5>{pmRoutine.hydrate.name}</h5>
                    </div>
                    <Trash2 className="routine-slot-remove" size={14} onClick={() => handleRemoveSlot('pm', 'hydrate')} />
                  </>
                ) : (
                  <span>Add Cream / Moisturizer</span>
                )}
              </div>

              {/* Nourish */}
              <div className={`routine-slot-item ${pmRoutine.nourish ? 'filled' : 'empty'}`}>
                {pmRoutine.nourish ? (
                  <>
                    <img src={pmRoutine.nourish.image} alt="nourish" />
                    <div className="routine-slot-item-info">
                      <span style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--c-gold)', fontWeight: 600 }}>Step 4: Nourish</span>
                      <h5>{pmRoutine.nourish.name}</h5>
                    </div>
                    <Trash2 className="routine-slot-remove" size={14} onClick={() => handleRemoveSlot('pm', 'nourish')} />
                  </>
                ) : (
                  <span>Add Restorative Hair / Face Oil</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {(Object.values(amRoutine).some(v => v) || Object.values(pmRoutine).some(v => v)) && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
          <button className="btn-gold" onClick={handleAddAllToCart}>
            Add Entire Skincare Routine To Bag
          </button>
        </div>
      )}
    </section>
  );
}
