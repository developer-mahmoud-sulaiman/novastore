import styles from "./CategoryCard.module.css";
import { Link } from "react-router-dom";

interface CategoryCardProps {
  name: string;
  slug: string;
  image: string;
  count?: number;
}

function CategoryCard({ name, image, count, slug }: CategoryCardProps) {
  return (
    <Link to={`/shop/category=${slug}`} className={styles.card}>
      <div className={styles.imageWrapper}>
        {image ? (
          <img
            src={image}
            alt={name}
            className={styles.image}
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className={styles.placeholder}>{name[0]}</div>
        )}
      </div>

      <div className={styles.info}>
        <h3 className={styles.name}>{name}</h3>
        <span className={styles.count}>{count} items</span>
      </div>
    </Link>
  );
}

export default CategoryCard;
