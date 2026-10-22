import { Heart } from "lucide-react";
import Container from "../../components/ui/Container";
import { useWishlistStore } from "../../store/wishlistStore";
import styles from "./WishlistPage.module.css";
import { Link } from "react-router-dom";
import ProductsGrid from "../../components/common/ProductsGrid";

function WishlistPage() {
  const items = useWishlistStore((state) => state.items);
  const clearWishlist = useWishlistStore((state) => state.clearWishlist);

  if (items.length === 0) {
    return (
      <Container>
        <div className={styles.empty}>
          <Heart size={48} strokeWidth={1.5} />
          <h1>Your wishlist is empty</h1>
          <p>Save products you love for later</p>
          <Link to="/shop" className={styles.shopBtn}>
            Browse Shop
          </Link>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>My wishlist</h1>
          <p className={styles.count}>{items.length} Items</p>
        </div>
        <button className={styles.clearBtn} onClick={clearWishlist}>
          Clear Wishlist
        </button>
      </div>

      <ProductsGrid products={items} skeltonCount={0} isLoading={false} />
    </Container>
  );
}

export default WishlistPage;
