import { useForm } from "react-hook-form";
import { shippingSchema, type ShippingFormData } from "../../../lib";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from './ShippingForm.module.css'
import FormField from "../../ui/FormField";
import Button from "../../ui/Button";

interface ShippingFormProps {
    defaultValues?: Partial<ShippingFormData>;
    onSubmit: (data: ShippingFormData) => void;
}

function ShippingForm({defaultValues, onSubmit}: ShippingFormProps) {
    const {register, handleSubmit, formState: {errors}} = useForm<ShippingFormData>({
        resolver: zodResolver(shippingSchema),
        defaultValues
    });

    return(
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>

            <div className={styles.row}>

                <FormField label="First Name" htmlFor="firstName" 
                error={errors.firstName?.message}>

                    <input id="firstName" aria-invalid={!!errors.firstName} 
                    {...register('firstName')} className={styles.input} />

                </FormField>

                <FormField label="Last Name" htmlFor="lastName" 
                error={errors.lastName?.message}>

                    <input id="lastName" aria-invalid={!!errors.lastName} 
                    {...register('lastName')} className={styles.input} />

                </FormField>
        
            </div>

            <div className={styles.row}>

                <FormField label="Email" htmlFor="email" 
                error={errors.email?.message}>

                    <input id="email" aria-invalid={!!errors.email} type="email"
                    {...register('email')} className={styles.input} />

                </FormField>

                <FormField label="Phone" htmlFor="phone" 
                error={errors.phone?.message}>

                    <input id="phone" aria-invalid={!!errors.phone} type="tel"
                    {...register('phone')} className={styles.input} />

                </FormField>
        
            </div>

            <FormField label="Address" htmlFor="address" 
                error={errors.address?.message}>

                    <input id="address" aria-invalid={!!errors.address}
                    {...register('address')} className={styles.input} />

            </FormField>


            <div className={styles.row}>

                <FormField label="City" htmlFor="city" 
                error={errors.city?.message}>

                    <input id="city" aria-invalid={!!errors.city}
                    {...register('city')} className={styles.input} />

                </FormField>

                <FormField label="Postal Code" htmlFor="postalCode" 
                error={errors.postalCode?.message}>

                    <input id="postalCode" aria-invalid={!!errors.postalCode}
                    {...register('postalCode')} className={styles.input} />

                </FormField>
        
            </div>

            <FormField label="Country" htmlFor="country" 
                error={errors.country?.message}>

                    <input id="country" aria-invalid={!!errors.country}
                    {...register('country')} className={styles.input} />

            </FormField>

            <Button type="submit" size="lg" fullWidth>
                Continue to payment 
            </Button>

        </form>
    )
}

export default ShippingForm