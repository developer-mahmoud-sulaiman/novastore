import { Heart } from "lucide-react";
import { useWishlistStore } from "../../../store/wishlistStore";
import type { Product } from "../../../types/Product";
import styles from "./WishlistButton.module.css";

interface WishlistButtonProps {
  product: Product;
  size?: number;
  className?: string;
}

function WishlistButton({
  product,
  size = 18,
  className,
}: WishlistButtonProps) {
  const toggleItem = useWishlistStore((state) => state.toggleItem);
  const isActive = useWishlistStore((state) =>
    state.items.some((item) => item.id === product.id),
  );

  return (
    <button
      className={`${styles.btn} ${isActive ? styles.active : ""} ${className ?? ""}`}
      onClick={(e) => {
        e.preventDefault();
        toggleItem(product);
      }}
      aria-label={isActive ? "Remove From wishlist" : "Add to wishlist"}
      aria-pressed={isActive}
    >
      <Heart size={size} fill={isActive ? "currentColor" : "none"} />
    </button>
  );
}

export default WishlistButton;
