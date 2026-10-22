import { Link, useParams } from "react-router-dom";
import Container from "../../components/ui/Container";
import { useProduct } from "../../hooks";
import { useState } from "react";
import { useCartStore, useWishlistStore } from "../../store";
import styles from './ProductPage.module.css'
import Spinner from "../../components/ui/Spinner";
import { ChevronRight, Heart, RefreshCw, Shield, ShoppingBag, Star, Truck } from "lucide-react";
import ProductGalery from "../../components/common/ProductGallery";
import { formatPrice } from "../../utils";
import QuantitySelector from "../../components/common/QuantitySelector";
import RelatedProducts from "../../components/common/RelatedProducts";

function ProductPage()
{
    const {id} = useParams<{id: string}>();
    const {data: product, isLoading, isError, error} = useProduct(id);
    const [quantity, setQuantity] = useState(1);

    const addItem = useCartStore((state) => state.addItem);
    const toggleItem = useWishlistStore((state) => state.toggleItem);
    const isInWishlist = useWishlistStore((state) => state.items.some((item) => item.id === Number(id)));
    
    if (isLoading)
    {
        return(
            <Container>
                <div className={styles.loader}>
                    <Spinner size={32} />
                </div>
            </Container>
        )
    }

    if (isError || !product)
    {
        return(
            <Container>
                <div className={styles.notFound}>
                    <h1>Product not found</h1>
                    <p>{error?.message}</p>
                    <Link to='/shop' className={styles.backBtn}>
                        Back to shop
                    </Link>
                </div>
            </Container>
        )
    }

    return(
    <Container>

        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link to='/'>Home</Link>
            <ChevronRight size={14} />
            <Link to='/shop'>Shop</Link>
            <ChevronRight size={14} />
            <Link to={`/shop?category=${product.category}`}>
                {product.category}
            </Link>
            <ChevronRight size={14} />
            <span>{product.title}</span>
        </nav>

        <div className={styles.layout}>
            <ProductGalery images={product.images} title={product.title} />

            <div className={styles.info}>
                <span className={styles.category}>{product.category}</span>
                <h1 className={styles.title}>{product.title}</h1>
                <div className={styles.rating}>
                    <span className={styles.stars}>
                        <Star size={18} />
                    </span>
                    <span >{product.rating.toFixed(1)}</span>
                    <span className={styles.stock}>
                        {product.stock > 0 ? `In stock (${product.stock})` : 'Out of stock'}
                    </span>
                </div>

                <p className={styles.price}>{formatPrice(product.price)}</p>

                <p className={styles.description}>{product.description}</p>

                <div className={styles.actions}>

                    <QuantitySelector value={quantity} 
                    onIncrease={() => setQuantity((q) => q + 1)}
                    onDecrease={() => setQuantity((q) => Math.max(1, q - 1))} 
                    max={product.stock}
                    />

                    <button className={styles.addBtn}
                    onClick={() => addItem(product, quantity)}
                    disabled={product.stock === 0}>
                        <ShoppingBag size={18} /> Add to Cart
                    </button>

                    <button className={`${styles.wishBtn} ${isInWishlist ? styles.wishActive : '' }`}
                    onClick={() => toggleItem(product)}
                    aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}>
                        <Heart size={18} fill={isInWishlist ? 'currentcolor' : 'none'} />
                    </button>


                </div>

                <div className={styles.perks}>

                    <div className={styles.perk}>
                        <Truck size={18} />
                        <span>Free shipping over $100</span>
                    </div>

                    <div className={styles.perk}>
                        <RefreshCw size={18} />
                        <span>30-day returns</span>
                    </div>

                    <div className={styles.perk}>
                        <Shield size={18} />
                        <span>2-year warranty</span>
                    </div>

                </div>


            </div>

        </div>

        <RelatedProducts category={product.category} excludeId={product.id} />


    </Container>        
    )


}

export default ProductPage