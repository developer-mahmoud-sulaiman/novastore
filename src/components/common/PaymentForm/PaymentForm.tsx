import { useForm } from "react-hook-form";
import { paymentSchema, type PaymentFormData } from "../../../lib";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from './PaymentForm.module.css'
import FormField from "../../ui/FormField";
import Button from "../../ui/Button";

interface PaymentFormProps {
    onSubmit: (data: PaymentFormData) => void;
    onBack: () => void;
    isLoading: boolean; 
}

function PaymentForm({onSubmit, onBack, isLoading}: PaymentFormProps) {
    const {register, handleSubmit, formState: {errors}} = useForm<PaymentFormData>({
        resolver: zodResolver(paymentSchema)
    })

    return(
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>

            <FormField label="Card Number" htmlFor="cardNumber" 
            error={errors.cardNumber?.message}>

                <input id="cardNumber" placeholder="1234 5678 9012 3456" maxLength={16} aria-invalid={!!errors.cardNumber} 
                {...register('cardNumber')} className={styles.input}  />

            </FormField>

            <FormField label="Card Holder" htmlFor="cardHolder" 
            error={errors.cardHolder?.message}>

                <input id="cardHolder" placeholder="John Doe"
                aria-invalid={!!errors.cardHolder} 
                {...register('cardHolder')} className={styles.input}  />

            </FormField>

                <div className={styles.row}>

                <FormField label="Expiry (MM/YY)" htmlFor="expiry" 
                error={errors.expiry?.message}>

                    <input id="expiry" placeholder="12/26" maxLength={5} aria-invalid={!!errors.expiry} 
                    {...register('expiry')} className={styles.input} />

                </FormField>

                <FormField label="CVV" htmlFor="cvv" 
                error={errors.cvv?.message}>

                    <input id="cvv" placeholder="123" maxLength={4}
                    aria-invalid={!!errors.cvv} 
                    {...register('cvv')} className={styles.input}  />

                </FormField>

            </div>

            <div className={styles.actions}>

                <Button type="button" variant="secondary" size="lg" 
                onClick={onBack}>
                    Back
                </Button>

                <Button type="submit" size="lg" loading={isLoading} >
                    Place Order
                </Button>

            </div>

        </form>
    )
}

export default PaymentForm