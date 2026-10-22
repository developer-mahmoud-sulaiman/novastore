import Container from "../../ui/Container";
import styles from './Footer.module.css'
import { Link } from "react-router-dom";

function Footer()
{

    const year = new Date().getFullYear();

    return(
        <footer className={styles.footer}>
            <Container>
                <div className={styles.grid}>

                    <div className={styles.brand}>

                        <h3 className={styles.logo}>NovaStore</h3>
                        <p className='text-muted'>Modern e-commerce for modern shoppers.</p>

                    </div>

                    <div className={styles.column}>

                        <h4>Shop</h4>
                        <ul>

                            <li><Link to="/shop">All Products</Link></li>
                            <li>
                                <Link to="/shop?category=smartphones">
                                    Smartphones
                                </Link>
                            </li>
                            <li>
                                <Link to="/shop?category=furniture">
                                    Furniture
                                </Link>
                            </li>
                            <li>
                                <Link to="/shop?category=home-decoration">
                                    Home Decoration
                                </Link>
                            </li>

                        </ul>

                    </div>

                    <div className={styles.column}>

                        <h4>Company</h4>
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/about">About</Link></li>
                            <li><Link to="/contact">Contact</Link></li>
                            <li><Link to="/shop">Shop</Link></li>
                        </ul>

                    </div>

                    <div className={styles.column}>

                        <h4>Support</h4>
                        <ul>
                            <li><Link to="/orders">My Orders</Link></li>
                            <li><Link to="/account">Account</Link></li>
                            <li><Link to="/card">My Cart</Link></li>
                            <li><Link to="/wishlist">My Wishlist</Link></li>
                        </ul>

                    </div>

                </div>

                <div className={styles.bottom}>

                    <p className="text-muted"> &copy; {year} NovaStore. All rights reserved </p>

                </div>


            </Container>
        </footer>
    )

}

export default Footer