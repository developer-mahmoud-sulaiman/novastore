import { Link, useNavigate, useParams } from "react-router-dom";
import Container from "../../components/ui/Container";
import { useOrdersStore } from "../../store";
import styles from "./OrderDetailsPage.module.css";
import { CheckCircle2 } from "lucide-react";
import OrderStatusBadge from "../../components/common/OrderStatusBadge";
import { formatPrice } from "../../utils";

function OrderDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const order = useOrdersStore((state) =>
    state.orders.find((o) => o.id === id),
  );

  if (!order) {
    return (
      <Container>
        <div className={styles.notFound}>
          <h1>Order not found</h1>
          <Link to="/orders" className={styles.link}>
            Back to orders
          </Link>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className={styles.success}>
        <CheckCircle2 size={48} className={styles.successIcon} />
        <h1 className={styles.successTitle}>Order Confirmed!</h1>
        <p className={styles.successMessage}>
          Thank you for your order. we've received it and will process it
          shortly.
        </p>
      </div>

      <div className={styles.header}>
        <div>
          <h2 className={styles.orderId}>{order.id}</h2>
          <p className={styles.date}>
            {new Date(order.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
        </div>

        <OrderStatusBadge status={order.status} />
      </div>

      <div className={styles.layout}>
        <div className={styles.main}>
          <section className={styles.card}>
            <h3 className={styles.cardTitle}>Items</h3>
            <div className={styles.items}>
              {order.items.map((item) => (
                <div key={item.id} className={styles.item}>
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className={styles.itemImage}
                  />
                  <div className={styles.itemInfo}>
                    <p className={styles.itemTitle}> {item.title}</p>
                    <p className={styles.itemMeta}>
                      {formatPrice(item.price)} × {item.quantity}
                    </p>
                  </div>
                  <p className={styles.itemTotal}>
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className={styles.card}>
            <h3 className={styles.cardTitle}>Shipping Address</h3>
            <div className={styles.address}>
              <p>
                {order.shipping.firstName} {order.shipping.lastName}
              </p>
              <p>{order.shipping.address}</p>
              <p>
                {order.shipping.city} , {order.shipping.postalCode}
              </p>
              <p>{order.shipping.country}</p>
              <p>{order.shipping.email}</p>
              <p>{order.shipping.phone}</p>
            </div>
          </section>

          <section className={styles.card}>
            <h3 className={styles.cardTitle}>Payment</h3>
            <p>**** **** **** {order.payment.last4}</p>
            <p className={styles.muted}>{order.payment.cardHolder}</p>
          </section>
        </div>

        <aside className={styles.sidebar}>
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Order Summary</h3>

            <div className={styles.row}>
              <span>Subtotal</span>
              <span>{formatPrice(order.subtotal)}</span>
            </div>

            <div className={styles.row}>
              <span>Shipping</span>
              <span>
                {order.shipping_cost === 0
                  ? "Free"
                  : formatPrice(order.shipping_cost)}
              </span>
            </div>

            <div className={styles.row}>
              <span>Tax</span>
              <span>{formatPrice(order.tax)}</span>
            </div>
            <div className={styles.divider} />

            <div className={`${styles.row} ${styles.totalRow}`}>
              <span>Total</span>
              <span>{formatPrice(order.total)}</span>
            </div>
          </div>

          <button
            className={styles.continueBtn}
            onClick={() => navigate("/shop")}
          >
            Continue shopping
          </button>
        </aside>
      </div>
    </Container>
  );
}

export default OrderDetailsPage;
