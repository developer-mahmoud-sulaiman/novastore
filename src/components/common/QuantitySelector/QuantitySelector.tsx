import { Minus, Plus } from 'lucide-react';
import styles from './QuantitySelector.module.css'

interface QuantitySelectorProps {
    value: number;
    onIncrease: () => void;
    onDecrease: () => void;
    min?: number;
    max?: number;
}

function QuantitySelector({
    value, onIncrease, onDecrease, min = 1, max = 99
} : QuantitySelectorProps) {
    return (
        <div className={styles.wrapper}>

            <button className={styles.btn} onClick={onDecrease} disabled={value <= min} aria-label='Decrease Quantity' >
                 <Minus size={14} />
            </button>

            <span className={styles.value} aria-live='polite'>
                {value}
            </span>

            <button className={styles.btn} onClick={onIncrease} disabled={value >= max} aria-label='Increase Quantity' >
                 <Plus size={14} />
            </button>

        </div>
    )
}

export default QuantitySelector