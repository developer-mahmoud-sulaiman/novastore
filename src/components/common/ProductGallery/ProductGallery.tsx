import { useState } from 'react';
import styles from './ProductGallery.module.css'

interface ProductGaleryProps 
{
    images: string[];
    title: string;
}

function ProductGalery({images, title}: ProductGaleryProps) {

    const [activeImage, setActiveImage] = useState(images[0])

    return(
        <div className={styles.gallery}>
            <div className={styles.thumbs}>
                {
                    images.map((img, i) => (
                        <button key={i} onClick={() => setActiveImage(img)}
                        className={`${styles.thumb} ${activeImage === img ? styles.active : ''}`}
                        aria-label={`View image ${i + 1}`}>
                            <img src={img} alt={`${title} ${i + 1}`} loading='lazy' decoding='async' />
                        </button>
                    ))
                }
            </div>
            
            <div className={styles.main}>
                <img src={activeImage} alt={title} className={styles.mainImage} decoding='async' />
            </div>
        </div>
    )

}

export default ProductGalery