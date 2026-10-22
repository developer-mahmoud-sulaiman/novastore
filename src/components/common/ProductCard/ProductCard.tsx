
import { ShoppingBag, Star } from 'lucide-react';
import styles from './ProductCard.module.css'
import { Link } from 'react-router-dom';
import type { Product } from '../../../types/Product';
import { useCartStore } from '../../../store/cartStore';
import WishlistButton from '../WhishlistButton';


interface ProductCardProps 
{
    product: Product;
}


function ProductCard({product} : ProductCardProps)
{

    const addItem = useCartStore((state) => state.addItem)
    const {id, title, price, thumbnail, category, rating} = product;
    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault()
        addItem(product)
    }


    return(
        <article className={styles.card}>

            <Link to={`/product/${id}`} className={styles.imageLink}>
                <div className={styles.imageWrapper}>

                    <img src={thumbnail} alt={title} className={styles.image} loading='lazy' />

                    <div className={styles.wishlistWrap}>
                        <WishlistButton product={product} />
                    </div>

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
                            <span className={styles.stars}>
                                <Star size={16} />
                            </span>
                            <span>{rating.toFixed(1)}</span>
                        </div>
                    )
                }

                <div className={styles.footer}>

                    <span className={styles.price}>${price.toFixed(2)}</span>
                    <button className={styles.addBtn} onClick={handleAddToCart} aria-label='Add to Cart'>
                        <ShoppingBag size={18} />
                    </button>

                </div>


            </div>

        </article>
    )

}

export default ProductCard