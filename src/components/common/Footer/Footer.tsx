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
                            <li><Link to="/shop?category=electronics">Electronics</Link></li>
                            <li><Link to="/shop?category=jewelery">Jewelery</Link></li>

                        </ul>

                    </div>

                    <div className={styles.column}>

                        <h4>Company</h4>
                        <ul>
                            <li><Link to="#">About</Link></li>
                            <li><Link to="#">Contact</Link></li>
                        </ul>

                    </div>

                    <div className={styles.column}>

                        <h4>Support</h4>
                        <ul>
                            <li><Link to="#">My Orders</Link></li>
                            <li><Link to="#">Account</Link></li>
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