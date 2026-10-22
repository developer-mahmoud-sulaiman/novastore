import { formatPrice } from '../../../utils';
import styles from './CartSumary.module.css'

interface CartSummaryProps {
    subtotal: number;
    shipping?: number;
    taxRate?: number;
}

const FREE_SHIPPING_THRESHOLD = 100;
const SHIPPING_COST = 10;
const TAX_RATE = 0.14;

function CartSummary({subtotal, shipping, taxRate = TAX_RATE}: CartSummaryProps) {
    const calculatedShipping = shipping ?? (subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST)

    const tax = subtotal * taxRate
    const total = subtotal + calculatedShipping + tax

    return(
        <div className={styles.summary}>

            <h2 className={styles.title}>Order Summary</h2>

            <div className={styles.row}>

                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>

            </div>

            <div className={styles.row}>

                <span>Shipping</span>
                <span>
                    {
                        calculatedShipping === 0 ? (
                            <span className={styles.free}>Free</span>
                        ) : (
                            formatPrice(calculatedShipping)
                        )
                    }
                </span>

            </div>

            <div className={styles.row}>

                <span>Tax (14%)</span>
                <span>{formatPrice(tax)}</span>

            </div>

            <div className={styles.divider} />

            <div className={`${styles.row} ${styles.totalRow}`}>

                <span>Total</span>
                <span>{formatPrice(total)}</span>

            </div>

            {
                subtotal > 0 && subtotal < FREE_SHIPPING_THRESHOLD && (
                    <p className={styles.hint}>
                        Add {formatPrice(FREE_SHIPPING_THRESHOLD - subtotal)}   more for free shipping! 
                    </p>
                )
            }

        </div>
    )
}

export default CartSummary