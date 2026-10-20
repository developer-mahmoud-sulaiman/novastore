import type { OrderStatus } from '../../../types/order'
import styles from './OrderStatusBadge.module.css'

const STATUS_LABELS: Record<OrderStatus, string> = {
    pending: 'Pending',
    processing: 'Processing',
    shipped: 'Shipped',
    delivered: 'Delivered',
    cancelled: 'Cancelled'
}

interface OrderStatusBadgeProps {
    status: OrderStatus;
}

function OrderStatusBadge({status}: OrderStatusBadgeProps) {
    return (
        <span className={`${styles.badge} ${styles[status]}`}>
            {STATUS_LABELS[status]}
        </span>
    )
}

export default OrderStatusBadge