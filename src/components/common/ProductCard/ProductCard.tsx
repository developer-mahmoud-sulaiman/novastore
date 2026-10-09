
import { Heart, ShoppingBag } from 'lucide-react';
import styles from './ProductCard.module.css'
import { Link } from 'react-router-dom';
import type { Product } from '../../../types/Product';


interface ProductCardProps 
{
    product: Product;
    onAddToCart?: (id: number) => void;
    onToggleWishlist?: (id: number) => void
}


function ProductCard({product, onAddToCart, onToggleWishlist} : ProductCardProps)
{

    const {id, title, price, thumbnail, category, rating} = product;

    return(
        <article className={styles.card}>

            <Link to={`/product/${id}`} className={styles.imageLink}>
                <div className={styles.imageWrapper}>

                    <img src={thumbnail} alt={title} className={styles.image} loading='lazy' />

                    <button className={styles.wishlistBtn} onClick={(e) => {
                        e.preventDefault();
                        onToggleWishlist?.(id)
                    }} aria-label='Add to wishlist'> 
                        <Heart size={18} />
                    </button>

                </div>
            </Link>

            <div className={styles.body}>
                
                <span className={styles.category}>{category}</span>
                <h3 className={styles.title}>
                    <Link to={`/product/${id}`}>{title}</Link>
                </h3>

                {
                    rating && (
                        <div className={styles.rating}>
                            <span className={styles.stars}>*</span>
                            <span>{rating.toFixed(1)}</span>
                        </div>
                    )
                }

                <div className={styles.footer}>

                    <span className={styles.price}>${price.toFixed(2)}</span>
                    <button className={styles.addBtn} onClick={() => onAddToCart?.(id)} aria-label='Add to Cart'>
                        <ShoppingBag size={18} />
                    </button>

                </div>


            </div>

        </article>
    )

}

export default ProductCard