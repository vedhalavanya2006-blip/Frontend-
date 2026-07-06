import { useState, useEffect } from 'react';


const slidesData = [
  {
    id: 1,
    tag: "THE LUXURY COLLECTION",
    title: "Enchanting Aromas & Golden Light",
    desc: "Indulge in our exquisite French fragrances and stardust-infused liquid highlighters, crafted to illuminate your natural beauty.",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=1600&auto=format&fit=crop&q=80",
    btnText: "Discover Fragrance",
    targetId: "catalog-section"
  },
  {
    id: 2,
    tag: "KOREAN BEAUTY SECRETS",
    title: "The Art of Radiant Glass Skin",
    desc: "Unlock pure hydration with organic centella cleansers and barrier-repairing ceramides. Clean formulas, luminous finishes.",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=1600&auto=format&fit=crop&q=80",
    btnText: "Shop Skincare",
    targetId: "catalog-section"
  },
  {
    id: 3,
    tag: "HIGH PIGMENT COUTURE",
    title: "Velvet Matte Lip Sensations",
    desc: "From delicate French rose to deep Bordeaux wine. Experience bold lip colors that hydrate and persist from morning to midnight.",
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=1600&auto=format&fit=crop&q=80",
    btnText: "Explore Lips",
    targetId: "catalog-section"
  }
];

export default function Hero({ onOpenQuiz }) {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slidesData.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);



  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero-slider">
      {slidesData.map((slide, index) => (
        <div
          key={slide.id}
          className={`hero-slide ${index === activeSlide ? 'active' : ''}`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="hero-bg-img"
          />
          <div className="hero-overlay"></div>
          
          <div className="hero-content">
            <span className="hero-tag">{slide.tag}</span>
            <h1 className="hero-title">{slide.title}</h1>
            <p className="hero-desc">{slide.desc}</p>
            
            <div className="hero-btns">
              <button
                className="btn-gold hero-btn-primary"
                onClick={() => scrollToSection(slide.targetId)}
              >
                {slide.btnText}
              </button>
              <button
                className="btn-gold-outline hero-btn-secondary"
                onClick={onOpenQuiz}
              >
                Find Your skin Match
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Slide Navigation Dots */}
      <div className="hero-dots">
        {slidesData.map((_, index) => (
          <button
            key={index}
            className={`hero-dot ${index === activeSlide ? 'active' : ''}`}
            onClick={() => setActiveSlide(index)}
          />
        ))}
      </div>
    </section>
  );
}
