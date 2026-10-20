import { Link } from "react-router-dom";
import Container from "../../components/ui/Container";
import { useAuth } from "../../hooks";
import { selectCartCount, selectWishlistCount, useCartStore, useWishlistStore } from "../../store";
import styles from './AccountPage.module.css'
import { Heart, LogOut, Package, ShoppingBag } from "lucide-react";
import Button from "../../components/ui/Button";

function AccountPage()
{

    const {user, logout} = useAuth()
    const cartCount = useCartStore(selectCartCount)
    const wishlistCount = useWishlistStore(selectWishlistCount)

    if (!user) return null

    return(
    <Container>

        <div className={styles.header}>
            <h1 className={styles.title}>My Account</h1>
        </div>

        <div className={styles.layout}>
            <aside className={styles.sidebar}>
                <div className={styles.profile}>

                    <img src={user.image} alt={user.firstName} className={styles.avatar} />

                    <div>
                        <h2 className={styles.name}>
                            {user.firstName} {user.lastName}
                        </h2>
                        <p className={styles.email}>{user.email}</p>
                    </div>

                </div>

                <nav className={styles.menu}>

                    <Link to='/orders' className={styles.menuItem}>
                        <Package size={18} /> My Orders
                    </Link>

                    <Link to='/wishlist' className={styles.menuItem}>
                        <Heart size={18} /> Wishlist ({wishlistCount})
                    </Link>

                    <Link to='/cart' className={styles.menuItem}>
                        <ShoppingBag size={18} /> Cart ({cartCount})
                    </Link>

                </nav>

                <Button variant="secondary" fullWidth onClick={logout}>
                    <LogOut size={16} /> Sign out
                </Button>

            </aside>

            <div className={styles.content}>
                <div className={styles.infoCard}>
                    <h3 className={styles.infotitle}>Account Information</h3>

                    <div className={styles.infoRow}>
                        <span className={styles.infoLabel}>Username</span>
                        <span>{user.username}</span>
                    </div>

                    <div className={styles.infoRow}>
                        <span className={styles.infoLabel}>Email</span>
                        <span>{user.email}</span>
                    </div>

                    <div className={styles.infoRow}>
                        <span className={styles.infoLabel}>First Name</span>
                        <span>{user.firstName}</span>
                    </div>

                    <div className={styles.infoRow}>
                        <span className={styles.infoLabel}>Last Name</span>
                        <span>{user.lastName}</span>
                    </div>

                </div>
            </div>

        </div>

    </Container>        
    )

}

export default AccountPage