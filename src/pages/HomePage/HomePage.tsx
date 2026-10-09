import { Link } from "react-router-dom";
import CategoriesSection from "../../components/common/CategoriesSection";
import Hero from "../../components/common/Hero";
import Container from "../../components/ui/Container";
import styles from './HomePage.module.css'
import { useProducts } from "../../hooks";
import ProductsGrid from "../../components/common/ProductsGrid";



function HomePage()
{

  const {data, isLoading, isError, error} = useProducts({limit: 8})

    return (
        <>
            <Hero />
            <CategoriesSection />

            <section className={styles.section}>
              <Container>

                <div className={styles.sectionHeader}>
                  <h2 className={styles.sectionTitle}>Featured Products</h2>
                  <Link to='/shop' className={styles.viewAll}>View All</Link>
                </div>

                {
                  isError && (
                    <div className={styles.error}>

                      <p>Failed to load products: {error.message}</p>

                    </div>
                  )
                }

                <ProductsGrid products={data?.products ?? []} isLoading={isLoading} skeltonCount={8} />

              </Container>
            </section>

        </>
    )

}

export default HomePage