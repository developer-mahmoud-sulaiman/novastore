import { Link } from 'react-router-dom';
import styles from './CartItem.module.css'
import {formatPrice} from '../../../utils/formatPrice'
import QuantitySelector from '../../common/QuantitySelector/QuantitySelector'
import { Trash2 } from 'lucide-react';
import type { CartItem as CartItemType } from "../../../store/cartStore";

interface CartItemProps {
    item : CartItemType;
    onIncrease: (id: number) => void;
    onDecrease: (id: number) => void;
    onRemove: (id: number) => void;
}

function CartItem({item, onIncrease, onDecrease, onRemove} : CartItemProps) {

    return (
        <article className={styles.item}>

            
            <Link to={`/product/${item.id}`} className={styles.imageLink} >
                <img src={item.thumbnail} alt={item.title} className={styles.image} />
            </Link>

            <div className={styles.info}>

                <Link to={`/product/${item.id}`} className={styles.title} >
                    {item.title}
                </Link>   

                <span className={styles.unitPrice}>{formatPrice(item.price)}</span>             
                
                <div className={styles.controls}>

                    <QuantitySelector 
                    value={item.quantity} 
                    onIncrease={() => onIncrease(item.id)}
                    onDecrease={() => onDecrease(item.id)}
                    />

                    <button className={styles.remove}
                    onClick={() => onRemove(item.id)}
                    aria-label='Remove Item'>
                        <Trash2 size={16} />
                    </button>

                </div>

            </div>

            <div className={styles.total}>
                {
                    formatPrice(item.price * item.quantity)
                }
            </div>

        </article>
    )

}

export default CartItem