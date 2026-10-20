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

                    <input id="firstName" hasError={!!errors.firstName} 
                    {...register('firstName')} />

                </FormField>

                <FormField label="Last Name" htmlFor="lastName" 
                error={errors.firstName?.message}>

                    <input id="lastName" hasError={!!errors.lastName} 
                    {...register('lastName')} />

                </FormField>
        
            </div>

            <div className={styles.row}>

                <FormField label="Email" htmlFor="email" 
                error={errors.email?.message}>

                    <input id="email" hasError={!!errors.email} type="email"
                    {...register('email')} />

                </FormField>

                <FormField label="Phone" htmlFor="phone" 
                error={errors.email?.message}>

                    <input id="phone" hasError={!!errors.phone} type="tel"
                    {...register('phone')} />

                </FormField>
        
            </div>

            <FormField label="Address" htmlFor="address" 
                error={errors.address?.message}>

                    <input id="address" hasError={!!errors.address}
                    {...register('address')} />

            </FormField>


            <div className={styles.row}>

                <FormField label="City" htmlFor="city" 
                error={errors.city?.message}>

                    <input id="city" hasError={!!errors.city}
                    {...register('city')} />

                </FormField>

                <FormField label="Postal Code" htmlFor="postalCode" 
                error={errors.postalCode?.message}>

                    <input id="postalCode" hasError={!!errors.postalCode}
                    {...register('postalCode')} />

                </FormField>
        
            </div>

            <FormField label="Country" htmlFor="country" 
                error={errors.country?.message}>

                    <input id="country" hasError={!!errors.country}
                    {...register('country')} />

            </FormField>

            <Button type="submit" size="lg" fullWidth>
                Continue to payment
            </Button>

        </form>
    )
}

export default ShippingForm