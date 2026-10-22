import { useQuery } from "@tanstack/react-query";
import styles from './RelatedProducts.module.css'
import { productsService } from "../../../services/Product";
import ProductsGrid from "../ProductsGrid";

interface RelatedProductsProps
{
    category: string;
    excludeId: number
}

function RelatedProducts({category, excludeId}: RelatedProductsProps) {

    const {data, isLoading} = useQuery({
        queryKey: ['related', category, excludeId],
        queryFn: () => productsService.getRelated(category, excludeId, 4),
    })

    if (!isLoading && (!data || data.length === 0)) return null

    return(
        <section className={styles.section}>
            <h2 className={styles.title}>You may also like</h2>
            <ProductsGrid products={data ?? []} isLoading={isLoading} skeltonCount={4} />
        </section>
    )

}

export default RelatedProducts