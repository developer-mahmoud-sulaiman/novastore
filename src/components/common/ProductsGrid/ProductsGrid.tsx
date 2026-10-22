import type { Product } from "../../../types/Product";
import ProductCard, { ProductCardSkelton } from "../ProductCard";
import styles from './ProductsGrid.module.css'

interface ProductsGridProps 
{
    products: Product[];
    isLoading: boolean;
    skeltonCount?: number;
    onAddToCart?: (id: number) => void;
    onToggleWishlist?: (id: number) => void
}

function ProductsGrid({
    products,
    isLoading = false,
    skeltonCount = 8,
} : ProductsGridProps)
{
    if(isLoading)
    {
        return (
            <div className={styles.grid}>

                {
                    Array.from({length: skeltonCount}).map((_, i) => (
                        <ProductCardSkelton key={i} />
                    ))
                }

            </div>
        )
    }

    if (products.length === 0)
    {
        return(
            <div className={styles.empty}>

                <p>No products found.</p>

            </div>
        )
    }

    return (
        <div className={styles.grid}>
            {
                products.map((product) => (
                    <ProductCard key={product.id} product={product}/>
                ))
            }
        </div>
    )
}

export default ProductsGrid 