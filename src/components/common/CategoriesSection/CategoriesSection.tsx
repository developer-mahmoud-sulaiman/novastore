import { useCategoriesWithMeta } from "../../../hooks";
import Container from "../../ui/Container";
import Skelton from "../../ui/Skelton";
import CategoryCard from "../CategoryCard";
import styles from "./CategoriesSection.module.css";
import { Link } from "react-router-dom";

function CategoriesSection() {
  const { data: categories, isLoading } = useCategoriesWithMeta();
  console.log(categories, isLoading);

  return (
    <section className={styles.section}>
      <Container>
        <div className={styles.header}>
          <h2 className={styles.title}>Shop by category</h2>
          <Link to="/shop" className={styles.viewAll}>
            View All
          </Link>
        </div>

        <div className={styles.grid}>
          {isLoading
            ? Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className={styles.skeltonCard}>
                  <Skelton height="200px" borderRadius="0" />
                  <div className={styles.skeltonInfo}>
                    <Skelton width="60%" height="16px" />
                    <Skelton width="30%" height="12px" />
                  </div>
                </div>
              ))
            : categories
                ?.slice(0, 4)
                .map((cat) => (
                  <CategoryCard
                    key={cat.slug}
                    name={cat.name}
                    slug={cat.slug}
                    count={cat.count}
                    image={cat.image}
                  />
                ))}
        </div>
      </Container>
    </section>
  );
}

export default CategoriesSection;
