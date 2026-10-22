import { Link } from "react-router-dom";
import Container from "../../components/ui/Container";
import styles from "./NotFoundPage.module.css";

function NotFoundPage() {
  return (
    <Container>
      <div className={styles.wrapper}>
        <p className={styles.code}>404</p>
        <h1 className={styles.title}>Page not found</h1>
        <p className={styles.message}>
          The page you're looking for doesn't exist or has been moved.
        </p>

        <div className={styles.actions}>
          <Link to="/" className={styles.primaryBtn}>
            Go Home
          </Link>
          <Link to="/shop" className={styles.secondaryBtn}>
            Brows Shop
          </Link>
        </div>
      </div>
    </Container>
  );
}

export default NotFoundPage;
