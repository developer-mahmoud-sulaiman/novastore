import Skelton from "../../ui/Skelton";
import styles from "./ProductCardSkelton.module.css";

function ProductCardSkelton() {
  return (
    <div className={styles.card}>
      <Skelton height="240px" borderRadius="0" />

      <div className={styles.body}>
        <Skelton width="40%" height="12px" />
        <Skelton width="90%" height="16px" />
        <Skelton width="60%" height="16px" />

        <div className={styles.footer}>
          <Skelton width="50px" height="20px" />
          <Skelton width="38px" height="38px" />
        </div>
      </div>
    </div>
  );
}

export default ProductCardSkelton;
