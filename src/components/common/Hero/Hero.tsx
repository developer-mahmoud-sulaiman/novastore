import Container from "../../ui/Container";
import styles from "./Hero.module.css";
import { Link } from "react-router-dom";

function Hero() {
  const year = new Date().getFullYear();

  return (
    <section className={styles.hero}>
      <Container>
        <div className={styles.content}>
          <p className={styles.eyebrow}>New Collection {year}</p>
          <h1 className={styles.title}>
            Discover products that fit your life.
          </h1>
          <p className={styles.subtitle}>
            Handpicked quality, honest prices, fast delivery -- everything you
            need in one place
          </p>

          <div className={styles.actions}>
            <Link to="/shop" className={styles.btnPrimary}>
              Shop Now
            </Link>
            <Link to="/shop" className={styles.btnSecondary}>
              Browse Categories
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default Hero;
