
import Container from '../../ui/Container'
import CategoryCard from '../CategoryCard'
import styles from './CategoriesSection.module.css'
import { Link } from 'react-router-dom'


const CATEGORIES = [
    {name: 'Electronics',  image: 'https://picsum.photos/seed/electronics/600/450', count: 120},
    {name: "Men's Clothing",  image: 'https://picsum.photos/seed/mens/600/450', count: 120},
    {name: "Women's Clothing",  image: 'https://picsum.photos/seed/womens/600/450', count: 120},
    {name: 'Jewelery',  image: 'https://picsum.photos/seed/jewelery/600/450', count: 120},
]


function CategoriesSection()
{
    return(
        <section className={styles.section}>

            <Container>

                <div className={styles.header}>
                    <h2 className={styles.title}>Shop by category</h2>
                    <Link to='/shop' className={styles.viewAll}>View All</Link>
                </div>

                <div className={styles.grid}>
                    {
                        CATEGORIES.map((cat) => (
                            <CategoryCard key={cat.name} {...cat} />
                        ))
                    }
                </div>


            </Container>

        </section>
    )
}

export default CategoriesSection