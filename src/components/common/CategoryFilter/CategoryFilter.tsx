import styles from './CategoryFilter.module.css'

interface CategoryFilterProps
{
    categories: string[];
    value: string;
    onChange: (value: string) => void
}

function CategoryFilter({categories, value, onChange}: CategoryFilterProps)
{
    return(
        <div className={styles.wrapper}>

            <button className={`${styles.chip} ${value === '' ? styles.active : ''}`} onClick={() => onChange('')}>
                    All
            </button>

            {
                categories.map((cat) => (
                    <button key={cat} className={`${styles.chip} ${value === cat ? styles.active : ''}`} onClick={() => onChange(cat)}>
                        {cat}
                    </button>
                ))
            }

        </div>
    )
}

export default CategoryFilter