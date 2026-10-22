import { useNavigate } from "react-router-dom";
import Container from "../../components/ui/Container";
import styles from "../CheckoutPage/CheckoutPage.module.css";
import { useState } from "react";
import { type ShippingFormData, type PaymentFormData } from "../../lib";
import {
  selectCartSubtotal,
  useAuthStore,
  useCartStore,
  useOrdersStore,
} from "../../store";
import type { Order } from "../../types/order";
import { generateOrderId } from "../../utils";
import CheckoutStepper from "../../components/common/CheckoutStepper";
import ShippingForm from "../../components/common/ShippingForm";
import PaymentForm from "../../components/common/PaymentForm/PaymentForm";
import CartSumary from "../../components/common/CartSummary";
import { useEffect } from "react";

const STEPS = [{ label: "Shipping" }, { label: "Payment" }];

function CheckoutPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [shippingData, setShippingData] = useState<ShippingFormData | null>(
    null,
  );

  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const items = useCartStore((state) => state.items);
  const subtotal = useCartStore(selectCartSubtotal);
  const clearcart = useCartStore((state) => state.clearCart);
  const addOrder = useOrdersStore((state) => state.addOrder);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (items.length === 0) navigate("/cart", { replace: true });
  }, [items.length, navigate]);

  if (items.length === 0) return null;

  const handleShippingSubmit = (data: ShippingFormData) => {
    setShippingData(data);
    setStep(1);
  };

  const handlePaymentSubmit = (paymentData: PaymentFormData) => {
    if (!shippingData) return;

    setIsPlacingOrder(true);

    const shippingCost = subtotal >= 100 ? 0 : 10;
    const tax = subtotal * 0.14;

    const order: Order = {
      id: generateOrderId(),
      items,
      shipping: shippingData,
      payment: {
        last4: paymentData.cardNumber.slice(-4),
        cardHolder: paymentData.cardHolder,
      },
      subtotal,
      shipping_cost: shippingCost,
      tax,
      total: subtotal + shippingCost + tax,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    addOrder(order);
    clearcart();
    navigate(`/orders/${order.id}`, { replace: true });
  };

  return (
    <Container>
      <div className={styles.header}>
        <h1 className={styles.title}>Checkout</h1>
      </div>

      <CheckoutStepper steps={STEPS} currentStep={step} />

      <div className={styles.layout}>
        <div className={styles.main}>
          {step === 0 && (
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Shipping Information</h2>
              <ShippingForm
                defaultValues={
                  user
                    ? {
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                      }
                    : undefined
                }
                onSubmit={handleShippingSubmit}
              />
            </section>
          )}
          {step === 1 && (
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Payment Method</h2>
              <PaymentForm
                onSubmit={handlePaymentSubmit}
                onBack={() => setStep(0)}
                isLoading={isPlacingOrder}
              />
            </section>
          )}
        </div>

        <aside className={styles.sidebar}>
          <CartSumary subtotal={subtotal} />
        </aside>
      </div>
    </Container>
  );
}

export default CheckoutPage;
