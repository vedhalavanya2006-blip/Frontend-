import { useState, useRef, useEffect } from 'react';
import { Search, Heart, ShoppingBag, Layers, Sun, Moon, Sparkles } from 'lucide-react';

export default function Header({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenQuiz,
  onOpenRoutine,
  onOpenShadeFinder,
  compareCount,
  onOpenCompare,
  productsList,
  onSelectProduct,
  theme,
  toggleTheme,
  rewardPoints = 480
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim() === '') {
      setSearchResults([]);
      setIsDropdownOpen(false);
      return;
    }

    const filtered = productsList.filter(
      (product) =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.brand.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase()) ||
        product.subCategory.toLowerCase().includes(query.toLowerCase())
    );

    setSearchResults(filtered.slice(0, 5));
    setIsDropdownOpen(true);
  };

  const handleItemClick = (product) => {
    onSelectProduct(product);
    setSearchQuery('');
    setIsDropdownOpen(false);
  };

  // Determine user tier based on points
  const userTier = rewardPoints >= 500 ? 'Platinum Luminary' : rewardPoints >= 300 ? 'Gold Radiant' : 'Bronze Beauty';

  return (
    <header className="header-wrap">
      <div className="header-top">
        ✨ Free Signature Gift Box Wrapping on Orders Over $75 | Code: LUMINESSE20 ✨
      </div>
      
      <div className="container">
        <div className="header-main">
          {/* Brand Logo */}
          <a href="#" className="brand-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            LUMINESSE<span>.</span>
          </a>

          {/* Search Bar */}
          <div className="search-container" ref={dropdownRef}>
            <div className="search-input-wrap">
              <Search className="search-icon" />
              <input
                type="text"
                placeholder="Search lipsticks, ceramides, hair oils..."
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={() => searchQuery && setIsDropdownOpen(true)}
              />
            </div>

            {isDropdownOpen && searchResults.length > 0 && (
              <div className="search-dropdown">
                {searchResults.map((product) => (
                  <div
                    key={product.id}
                    className="search-result-item"
                    onClick={() => handleItemClick(product)}
                  >
                    <img src={product.image} alt={product.name} />
                    <div className="search-result-info">
                      <h4>{product.name}</h4>
                      <span>{product.brand} • ${product.price}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Action Icons */}
          <div className="header-actions">
            {/* User Membership Info */}
            <div className="user-badge flex-center">
              <Sparkles size={12} style={{ marginRight: '6px', color: 'var(--c-gold)' }} />
              {userTier} ({rewardPoints} pts)
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="header-btn"
              title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
            >
              {theme === 'light' ? <Moon /> : <Sun />}
            </button>

            {/* Comparison Tool */}
            <button
              onClick={onOpenCompare}
              className="header-btn"
              title="Compare Products"
            >
              <Layers />
              {compareCount > 0 && <span className="badge-count">{compareCount}</span>}
            </button>

            {/* Wishlist */}
            <button
              onClick={onOpenWishlist}
              className="header-btn"
              title="My Wishlist"
            >
              <Heart />
              {wishlistCount > 0 && <span className="badge-count">{wishlistCount}</span>}
            </button>

            {/* Shopping Cart */}
            <button
              onClick={onOpenCart}
              className="header-btn"
              title="My Shopping Bag"
            >
              <ShoppingBag />
              {cartCount > 0 && <span className="badge-count">{cartCount}</span>}
            </button>
          </div>
        </div>

        {/* Subcategories / Experience Bar */}
        <nav className="nav-bar">
          <span className="nav-link" onClick={() => document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' })}>Shop Products</span>
          <span className="nav-link" onClick={onOpenQuiz}>Skin Type Quiz</span>
          <span className="nav-link" onClick={onOpenShadeFinder}>Shade Finder</span>
          <span className="nav-link" onClick={onOpenRoutine}>Routine Builder</span>
          <span className="nav-link" onClick={() => document.getElementById('lookbook-section')?.scrollIntoView({ behavior: 'smooth' })}>Makeup Lookbook</span>
          <span className="nav-link" onClick={() => document.getElementById('offers-section')?.scrollIntoView({ behavior: 'smooth' })}>Offers</span>
          <span className="nav-link" onClick={() => document.getElementById('tips-section')?.scrollIntoView({ behavior: 'smooth' })}>Beauty Editorial</span>
        </nav>
      </div>
    </header>
  );
}
