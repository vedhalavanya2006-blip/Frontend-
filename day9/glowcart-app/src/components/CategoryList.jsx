

const categories = [
  { name: "All Products", tag: "All", image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=300&auto=format&fit=crop&q=80" },
  { name: "Makeup Artistry", tag: "Makeup", image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&auto=format&fit=crop&q=80" },
  { name: "Clinical Skincare", tag: "Skincare", image: "https://images.unsplash.com/photo-1608248597481-496100c80836?w=300&auto=format&fit=crop&q=80" },
  { name: "Botanical Haircare", tag: "Haircare", image: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=300&auto=format&fit=crop&q=80" },
  { name: "Haute Fragrance", tag: "Fragrance", image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=300&auto=format&fit=crop&q=80" },
  { name: "Beauty Tools", tag: "Beauty Tools", image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=300&auto=format&fit=crop&q=80" },
  { name: "Korean Rituals", tag: "Korean Beauty", image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=300&auto=format&fit=crop&q=80" },
  { name: "Organic Earth", tag: "Organic Products", image: "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=300&auto=format&fit=crop&q=80" }
];

export default function CategoryList({ activeCategory, onSelectCategory }) {
  return (
    <section className="container" style={{ margin: '40px auto 60px' }}>
      <div className="section-header">
        <span className="subtitle">Curated Rituals</span>
        <h2 className="title">Shop By Aesthetic Category</h2>
        <div className="divider"></div>
        <p className="desc">Discover skincare rituals, high-pigment cosmetics, and artisanal fragrances selected for your beauty regimen.</p>
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '20px',
        overflowX: 'auto',
        padding: '10px 5px',
        scrollbarWidth: 'none'
      }}>
        {categories.map((cat) => (
          <div
            key={cat.tag}
            className="cat-circle"
            onClick={() => onSelectCategory(cat.tag)}
            style={{ minWidth: '110px' }}
          >
            <div className="cat-img-wrap" style={{
              borderColor: activeCategory === cat.tag ? 'var(--c-gold)' : 'transparent',
              boxShadow: activeCategory === cat.tag ? 'var(--shadow-medium)' : 'var(--shadow-soft)'
            }}>
              <img src={cat.image} alt={cat.name} />
            </div>
            <span className="cat-title" style={{
              fontWeight: activeCategory === cat.tag ? '600' : '400',
              color: activeCategory === cat.tag ? 'var(--c-gold)' : 'var(--c-primary)'
            }}>
              {cat.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
