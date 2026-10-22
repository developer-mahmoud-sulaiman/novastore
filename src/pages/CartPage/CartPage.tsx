import { ShoppingBag } from "lucide-react";
import Container from "../../components/ui/Container";
import { useCartStore, selectCartSubtotal } from "../../store/cartStore";
import styles from './CartPage.module.css'
import { Link } from "react-router-dom";
import CartSumary from "../../components/common/CartSummary";
import CartItem from "../../components/common/CartItem";
function CartPage()
{

    const items = useCartStore((state) => state.items)
    const increaseQuantity = useCartStore((state) => state.increaseQuantity)
    const decreaseQuantity = useCartStore((state) => state.decreaseQuantity)
    const removeItem = useCartStore((state) => state.removeItem)
    const clearCart = useCartStore((state) => state.clearCart)
    const subtotal = useCartStore(selectCartSubtotal)
 

    if (items.length === 0 ) {
        return (
            <Container>
                <div className={styles.empty}>

                    <ShoppingBag size={48} strokeWidth={1.5} />
                    <h1>Your cart is empty!</h1>
                    <p>Browse our shop and start adding products.</p>
                    <Link to='/shop' className={styles.shopBtn} >Shop Now</Link>

                </div>
            </Container>
        )
    }

    return (
        <Container>
            <div className={styles.header}>

                <h1 className={styles.title}>Shopping Cart</h1>
                <button className={styles.clearBtn} onClick={clearCart}>
                    Clear Cart
                </button>

            </div>

            <div className={styles.layout}>
                <div className={styles.items}>
                    {
                        items.map((item) => (
                            <CartItem key={item.id} item={item} onIncrease={increaseQuantity} onDecrease={decreaseQuantity} onRemove={removeItem} />
                        ))
                    }
                </div>

                <aside className={styles.sidebar}>

                    <CartSumary subtotal={subtotal} />
                    <Link to='/checkout' className={styles.checkoutBtn}>Proceed to checkout</Link>

                </aside>

            </div>
        </Container>
    )


}

export default CartPage