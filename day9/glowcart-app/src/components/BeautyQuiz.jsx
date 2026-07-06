import { useState } from 'react';
import { X, Check, Award } from 'lucide-react';

const quizQuestions = [
  {
    id: 1,
    question: "How does your skin feel in the morning?",
    subtitle: "Select the option that matches your skin's baseline condition.",
    options: [
      { key: "dry", title: "Tight and Flaky", desc: "Feels like it urgently needs rich moisturizers or face oils." },
      { key: "oily", title: "Shiny and Slick", desc: "Visible oiliness particularly across the T-zone and cheeks." },
      { key: "combination", title: "Oily T-zone, Dry Cheeks", desc: "Forehead and nose are shiny, but cheeks feel dry/normal." },
      { key: "sensitive", title: "Irritated or Red", desc: "Prone to stinging, itching, or redness from random factors." }
    ]
  },
  {
    id: 2,
    question: "What is your primary skincare target?",
    subtitle: "Select your main goal or concern you wish to address.",
    options: [
      { key: "dehydration", title: "Plump Fine Lines", desc: "Boost hydration, smooth texture, and restore bouncy firmness." },
      { key: "pores", title: "Refining Pores & Shine", desc: "Minimize breakouts, control excess oil sebum, and blur pores." },
      { key: "redness", title: "Calming Inflammation", desc: "Sooth redness, repair skin barrier, and cool hot flushing." },
      { key: "glow", title: "Illuminating Dullness", desc: "Fade spots, boost radiance, and get a dewy golden glow." }
    ]
  },
  {
    id: 3,
    question: "What is your typical sun defense preference?",
    subtitle: "How does your skin tolerate heavy sunscreen or makeup bases?",
    options: [
      { key: "fluid", title: "Weightless and Invisible", desc: "Prefers ultra-thin fluid finishes that leave zero white residue." },
      { key: "dewy", title: "Rich and Hydrating Cream", desc: "Prefers creamy bases that leave a glossy moisture shield." },
      { key: "matte", title: "Soft Satin Blur", desc: "Prefers formulas that keep shine controlled for hours." },
      { key: "organic", title: "Natural Botanical Extracts", desc: "Prefers formulas packed with plant-derived soothing ingredients." }
    ]
  }
];

export default function BeautyQuiz({ isOpen, onClose, productsList, onAddToCart, onSelectProduct }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  if (!isOpen) return null;

  const handleSelectOption = (questionKey, optionKey) => {
    const updatedAnswers = { ...answers, [questionKey]: optionKey };
    setAnswers(updatedAnswers);

    // Auto progress or show results
    if (currentStep < quizQuestions.length - 1) {
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
      }, 300);
    } else {
      setTimeout(() => {
        setShowResults(true);
      }, 500);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleRestart = () => {
    setAnswers({});
    setCurrentStep(0);
    setShowResults(false);
  };

  // Compute recommendations based on quiz answers
  const getRecommendations = () => {
    const skinType = answers[0] || 'dry';
    const concern = answers[1] || 'dehydration';
    
    if (skinType === 'oily' || concern === 'pores') {
      return productsList.filter(p => ["skin-wash", "skin-sun", "face-primer", "compact-silk"].includes(p.id));
    } else if (skinType === 'dry' || concern === 'dehydration') {
      return productsList.filter(p => ["skin-serum", "skin-moist", "found-focus", "face-spray"].includes(p.id));
    } else if (skinType === 'sensitive' || concern === 'redness') {
      return productsList.filter(p => ["skin-wash", "skin-moist", "skin-sun"].includes(p.id));
    } else { // combination / glow
      return productsList.filter(p => ["skin-serum", "high-stardust", "blush-petals", "skin-moist"].includes(p.id));
    }
  };

  const getSkinProfileName = () => {
    const skin = answers[0];
    const concern = answers[1];

    let name = "Radiant Glow Seeker";
    if (skin === 'dry' && concern === 'dehydration') name = "Velvety Moisture Need";
    else if (skin === 'oily' && concern === 'pores') name = "Soft Focus Pore-Control";
    else if (skin === 'sensitive') name = "Barrier Calming Minimalist";
    else if (skin === 'combination') name = "Balanced Dewy Hydration";

    return name;
  };

  const getSkinAdvice = () => {
    const skin = answers[0];
    if (skin === 'oily') {
      return "Prioritize gentle, pH-balanced foaming cleansers and lightweight fluid chemical sunscreens. Avoid heavy oils on the face, and look for pore-blurring satin primers.";
    }
    if (skin === 'dry') {
      return "Focus on multiple layers of deep hydration. A peptide-rich serum combined with a ceramide-rich barrier cream is your gold standard to avoid dry, flaky foundations.";
    }
    if (skin === 'sensitive') {
      return "Keep steps minimal. Use fragrance-free barrier creams and soothing botanical extracts like Centella Asiatica. Always defend your skin barrier from harsh physical exfoliants.";
    }
    return "Focus on dual-action skincare. Treat the dry cheeks with nourishing moisturizers and control the oily T-zone using high-performance pressed powders.";
  };

  const recommendedProducts = getRecommendations();
  const skinProfileName = getSkinProfileName();
  const skinAdvice = getSkinAdvice();

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: '780px' }} onClick={(e) => e.stopPropagation()}>
        <button className="modal-close flex-center" onClick={onClose}>
          <X size={20} />
        </button>

        <div className="quiz-container-modal">
          {!showResults ? (
            <>
              {/* Steps Progress */}
              <div className="quiz-steps-indicators">
                {quizQuestions.map((q, idx) => (
                  <div
                    key={q.id}
                    className={`quiz-indicator ${
                      idx === currentStep
                        ? 'active'
                        : idx < currentStep
                        ? 'completed'
                        : ''
                    }`}
                  >
                    {idx < currentStep ? <Check size={14} /> : idx + 1}
                  </div>
                ))}
              </div>

              {/* Question content */}
              <div className="animate-fade">
                <h3 className="quiz-q-title">{quizQuestions[currentStep].question}</h3>
                <p className="quiz-q-subtitle">{quizQuestions[currentStep].subtitle}</p>

                <div className="quiz-options">
                  {quizQuestions[currentStep].options.map((opt) => (
                    <div
                      key={opt.key}
                      className={`quiz-option-card ${
                        answers[currentStep] === opt.key ? 'active' : ''
                      }`}
                      onClick={() => handleSelectOption(currentStep, opt.key)}
                    >
                      <h3>{opt.title}</h3>
                      <p>{opt.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Back controls */}
              {currentStep > 0 && (
                <div className="quiz-controls">
                  <button className="btn-gold-outline" style={{ fontSize: '11px', padding: '8px 20px' }} onClick={handleBack}>
                    Previous Step
                  </button>
                  <div />
                </div>
              )}
            </>
          ) : (
            // Results screen
            <div className="quiz-results animate-slideup">
              <div className="quiz-results-banner">
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
                  <Award size={48} color="var(--c-gold)" />
                </div>
                <h2 className="brand-logo" style={{ fontSize: '20px', marginBottom: '8px' }}>Your Skin Identity</h2>
                <h3 style={{ fontSize: '28px', color: 'var(--c-primary)', marginBottom: '12px' }}>{skinProfileName}</h3>
                <p style={{ maxWidth: '560px', margin: '0 auto', fontSize: '13.5px', lineHeight: '1.6' }}>
                  {skinAdvice}
                </p>
              </div>

              <h4 className="quiz-recs-title">Your Curated Routine Products</h4>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${recommendedProducts.length}, 1fr)`,
                gap: '16px',
                marginTop: '24px',
                marginBottom: '32px'
              }}>
                {recommendedProducts.map((prod) => (
                  <div
                    key={prod.id}
                    style={{
                      border: '1px solid rgba(34,27,39,0.06)',
                      borderRadius: '12px',
                      padding: '12px',
                      backgroundColor: 'var(--bg-card)',
                      textAlign: 'center',
                      cursor: 'pointer'
                    }}
                    onClick={() => {
                      onSelectProduct(prod);
                      onClose();
                    }}
                  >
                    <img
                      src={prod.image}
                      alt={prod.name}
                      style={{ width: '100%', aspectRatio: '1', objectFit: 'cover', borderRadius: '8px', marginBottom: '8px', backgroundColor: 'var(--c-gold-light)' }}
                    />
                    <h5 style={{ fontSize: '12px', fontWeight: 600, display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{prod.name}</h5>
                    <span style={{ fontSize: '11px', color: 'var(--c-gold)', display: 'block', margin: '4px 0' }}>${prod.price}</span>
                    <button
                      className="btn-gold"
                      style={{ padding: '6px 12px', fontSize: '10px', width: '100%', borderRadius: '6px' }}
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart(prod, null);
                      }}
                    >
                      Add to Bag
                    </button>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
                <button
                  className="btn-gold-outline"
                  onClick={handleRestart}
                >
                  Retake Quiz
                </button>
                <button
                  className="btn-gold"
                  onClick={() => {
                    recommendedProducts.forEach((prod) => onAddToCart(prod, null));
                    onClose();
                  }}
                >
                  Add Whole Routine To Bag
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
