import { useState } from "react";
import Container from "../../components/ui/Container";
import styles from './ContactPage.module.css'
import { Mail, Phone, MapPin, CheckCircle2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { type ContactFormData, contactSchema } from "../../lib";
import { zodResolver } from "@hookform/resolvers/zod";
import FormField from "../../components/ui/FormField";
import Button from "../../components/ui/Button";


const CONTACT_INFO = [
    {icon: Mail, label: 'Email', value: 'hello@novastore.com'},
    {icon: Phone, label: 'Phone', value: '+1 (555) 123-4567'},
    {icon: MapPin, label: 'Address', value: '123 Commerce st., Cairo, Egypt'},
]

function ContactPage()
{

    const [sent, setSent] = useState(false);

    const {register, handleSubmit, reset, formState: {errors, isSubmitting
    }} = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema)
    });

    const onSubmit = async (_data: ContactFormData) => {
        await new Promise((resolve) => setTimeout(resolve, 800));
        setSent(true);
        reset();
        setTimeout(() => setSent(false), 4000);
    }

    return(
    <Container>

        <div className={styles.header}>
            <h1 className={styles.title}>Get in touch</h1>
            <p className={styles.subtitle}>
                Have a question or feedback? we'd love to hear from you.
            </p>
        </div>

        <div className={styles.layout}>
            <aside className={styles.info}>
                <h2 className={styles.infoTitle}>Contact Information</h2>
                <p className={styles.infoText}>
                    Fill out the form and our team will get back to you within 24 hours.
                </p>

                <ul className={styles.infoList}> 
                {
                    CONTACT_INFO.map(({icon: Icon, label, value}) => (
                        <li key={label} className={styles.infoItem}>
                            <span className={styles.iconWrapper}>
                                <Icon size={18} />
                            </span>
                            <div>
                                <p className={styles.infoLabel}>{label}</p>
                                <p className={styles.infoValue}>{value}</p>
                            </div>
                        </li>
                    ))
                }
                </ul>

            </aside>

            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>

                {
                    sent && (
                        <div className={styles.success} role="status">
                            <CheckCircle2 size={18} />
                            <span>Thanks! your message has been sent.</span>
                        </div>
                    )
                }

                <div className={styles.row}>

                    <FormField label="Name" htmlFor="name" 
                    error={errors.name?.message}>

                        <input id="name" aria-invalid={!!errors.name} 
                        {...register('name')} className={styles.input} />

                    </FormField>

                    <FormField label="Email" htmlFor="email" 
                    error={errors.email?.message}>

                        <input id="email" aria-invalid={!!errors.email} 
                        {...register('email')} type="email" 
                        className={styles.input} />

                    </FormField>

                </div>

                <FormField label="Subject" htmlFor="subject" 
                error={errors.subject?.message}>

                    <input id="subject" aria-invalid={!!errors.subject} 
                    {...register('subject')} className={styles.input} />

                </FormField>

                <FormField label="Message" htmlFor="message" 
                error={errors.message?.message}>

                    <textarea id="message" rows={6} 
                    {...register('message')} className={styles.textarea} />

                </FormField>

                <Button type="submit" size="lg" loading={isSubmitting}>
                    Send Message
                </Button>

            </form>

        </div>

    </Container>        
    )

}

export default ContactPage