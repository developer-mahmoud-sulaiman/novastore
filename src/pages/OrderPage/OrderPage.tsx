import { Package } from "lucide-react";
import Container from "../../components/ui/Container";
import { useOrdersStore } from "../../store";
import styles from './OrderPage.module.css'
import { Link } from "react-router-dom";
import OrderStatusBadge from "../../components/common/OrderStatusBadge";
import { formatPrice } from "../../utils";

function OrderPage()
{

    const orders = useOrdersStore((state) => state.orders)

    if (orders.length === 0) {
        return(
            <Container>
                <div className={styles.empty}>
                    <Package size={48} strokeWidth={1.5} />
                    <h1>No orders yet</h1>
                    <p>When you place an order, it'll appear here</p>
                    <Link to='/shop' className={styles.shopBtn}>
                        Start shopping
                    </Link>
                </div>
            </Container>
        )
    }

    return(
    <Container>

        <div className={styles.header}>
            <h1 className={styles.title}>My orders</h1>
            <p className={styles.subtitle}>{orders.length}orders(s)</p>
        </div>

        <div className={styles.list}>
        {
            orders.map((order) => (
                <Link key={order.id} to={`/orders/${order.id}`} 
                className={styles.card}>
                    <div className={styles.cardHeader}>
                        <div>
                            <p className={styles.orderId}>{order.id}</p>
                            <p className={styles.date}>
                                {new Date(order.createdAt).toLocaleDateString('en-Us', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric'
                                })}
                            </p>
                        </div>
                        <OrderStatusBadge status={order.status} />
                    </div>

                    <div className={styles.cardBody}>
                        <div className={styles.thumbnails}>
                            {
                                order.items.slice(0, 3).map((item) => (
                                    <img
                                        key={item.id}
                                        src={item.thumbnail}
                                        alt={item.title}
                                        className={styles.thumb}
                                    />
                                ))
                            }
                            {
                                order.items.length > 3 && (
                                    <span className={styles.more}>
                                        +{order.items.length - 3}
                                    </span>
                                )
                            }
                        </div>

                        <div className={styles.total}>
                            <span>{order.items.length} Item(s)</span>
                            <strong>{formatPrice(order.total)}</strong>
                        </div>

                    </div>

                </Link>
            ))
        }
        </div>

    </Container>        
    )

}

export default OrderPage