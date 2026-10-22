import React, { useEffect, useRef, useState } from "react";
import styles from "./Navbar.module.css";
import { Heart, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useCartStore, selectCartCount } from "../../../store/cartStore";
import {
  useWishlistStore,
  selectWishlistCount,
} from "../../../store/wishlistStore";
import { useAuthStore } from "../../../store";

function Navbar() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const cartCount = useCartStore(selectCartCount);
  const wishlistCount = useWishlistStore(selectWishlistCount);

  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const toggleSearch = () => setIsSearchOpen((prev) => !prev);

  useEffect(() => {
    if (isSearchOpen) {
      searchInputRef.current?.focus();
    }
  }, [isSearchOpen]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.trim();

    if (!query) return;

    navigate(`/shop?q=${encodeURIComponent(query)}`);
    setSearchQuery("");
    setIsSearchOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <nav className={styles.navbar}>
      {/* Left Side */}
      <div className={styles.left}>
        <button
          className={styles.menuToggle}
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        <Link to="/" className={styles.logo}>
          NovaStore
        </Link>
      </div>
      {/* Left Side */}

      {/* Nav Links */}
      <ul className={styles.links}>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/shop">Shop</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
      </ul>
      {/* Nav Links */}

      {/* Nav Actions */}
      <div className={styles.actions}>
        <button
          className={styles.iconBtn}
          aria-label="Search"
          onClick={toggleSearch}
          aria-expanded={isSearchOpen}
        >
          {isSearchOpen ? <X size={20} /> : <Search size={20} />}
        </button>

        <Link to="/wishlist" className={styles.iconBtn} aria-label="Wishlist">
          <Heart size={20} />
          {wishlistCount > 0 && (
            <span className={styles.badge}>{wishlistCount}</span>
          )}
        </Link>

        <Link to="/cart" className={styles.iconBtn} aria-label="Cart">
          <ShoppingBag size={20} />
          {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
        </Link>

        {isAuthenticated && user ? (
          <Link to="/account" className={styles.iconBtn} aria-label="Account">
            <img
              src={user.image}
              alt={user.firstName}
              className={styles.avatar}
            />
          </Link>
        ) : (
          <Link to="/account" className={styles.iconBtn} aria-label="Account">
            <User size={20} />
          </Link>
        )}
      </div>

      {isSearchOpen && (
        <form onSubmit={handleSearchSubmit} className={styles.searchPanel}>
          <Search size={18} className={styles.searchIcon} />
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onKeyDown={handleKeyDown}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products..."
            aria-label="Search Products"
            className={styles.searchInput}
          />

          <button className={styles.searchSubmit} type="submit">
            Search
          </button>
        </form>
      )}

      {/* Nav Actions */}

      {isMenuOpen && (
        <ul className={styles.mobileMenu}>
          <li>
            <Link to="/" onClick={toggleMenu}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/shop" onClick={toggleMenu}>
              Shop
            </Link>
          </li>
          <li>
            <Link to="/about" onClick={toggleMenu}>
              About
            </Link>
          </li>
          <li>
            <Link to="/account" onClick={toggleMenu}>
              Account
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
}

export default Navbar;
