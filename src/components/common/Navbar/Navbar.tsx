import { useState } from "react";
import styles from './Navbar.module.css'
import { Heart, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useCartStore, selectCartCount } from "../../../store/cartStore";
import { useWishlistStore, selectWishlistCount } from "../../../store/wishlistStore";
import { useAuthStore } from "../../../store";


function Navbar()
{
    
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    
    const toggleMenu = () => setIsMenuOpen((prev) => !prev)

    const cartCount = useCartStore(selectCartCount)
    const wishlistCount = useWishlistStore(selectWishlistCount)

    const user = useAuthStore((state) => state.user)
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

    return(
        <nav className={styles.navbar}>

            {/* Left Side */}
            <div className={styles.left}>

                <button className={styles.menuToggle} onClick={toggleMenu} aria-label="Toggle menu" aria-expanded={isMenuOpen}>

                    {isMenuOpen ? <X size={22}/> : <Menu size={22} />}
                    
                </button>

                <Link to='/' className={styles.logo}>NovaStore</Link>

            </div> 
            {/* Left Side */}

            {/* Nav Links */}
            <ul className={styles.links}>

                <li><Link to='/'>Home</Link></li>
                <li><Link to='/shop'>Shop</Link></li>
                <li><Link to='/about'>About</Link></li>
                <li><Link to='/contact'>Contact</Link></li>

            </ul>
            {/* Nav Links */}

            {/* Nav Actions */}
            <div className={styles.actions}>

                <button className={styles.iconBtn} aria-label="Search">
                    <Search size={20} />
                </button>

                <Link to="/wishlist" className={styles.iconBtn} aria-label="Wishlist">
                    <Heart  size={20}/>
                    {
                        wishlistCount > 0 && (
                            <span className={styles.badge}>
                                {wishlistCount}
                            </span>
                        )
                    }
                </Link>

                <Link to="/cart" className={styles.iconBtn} aria-label="Cart">
                    <ShoppingBag size={20} />
                    {
                        cartCount > 0 && (
                        <span className={styles.badge}>
                            {cartCount}
                        </span>                            
                        )
                    }

                </Link>

                {
                    isAuthenticated && user ? (
                                   
                <Link to="/account" className={styles.iconBtn} aria-label="Account">
                    <img src={user.image} alt={user.firstName} className={styles.avatar}/>
                </Link>     
                    ) : (
                <Link to="/account" className={styles.iconBtn} aria-label="Account">
                    <User  size={20}/>
                </Link>                        
                    )
                }



            </div>

            {/* Nav Actions */}

            {
                isMenuOpen && (
                    <ul className={styles.mobilemenu}>

                        <li>
                            <Link to="/home" onClick={toggleMenu}>Home</Link>
                        </li>
                        <li>
                            <Link to="/shop" onClick={toggleMenu}>Shop</Link>
                        </li>
                        <li>
                            <Link to="/about" onClick={toggleMenu}>About</Link>
                        </li>
                        <li>
                            <Link to="/account" onClick={toggleMenu}>Account</Link>
                        </li>

                    </ul>
                )
            }

        </nav>
    )

}

export default Navbar