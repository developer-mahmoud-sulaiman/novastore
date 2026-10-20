import { Check } from 'lucide-react';
import styles from './CheckoutStepper.module.css'

interface Step 
{
    label: string
}

interface CheckoutStepperProps {
    steps: Step[];
    currentStep: number
}

function CheckoutStepper({steps, currentStep}: CheckoutStepperProps) {

    return(
        <ol className={styles.stepper}>
            {
                steps.map((step, index) => {
                    const isCompleted = index < currentStep;
                    const isActive = index === currentStep;

                    return(
                        <li key={step.label}
                        className={`${styles.step} ${isActive ? styles.active : ''} ${isCompleted ? styles.completed : ''}`}>

                            <span className={styles.circle}>
                                {
                                    isCompleted ? <Check size={14} /> : index +1
                                }
                            </span>
                            <span className={styles.label}>{step.label}</span>

                        </li>
                    )
                })
            }
        </ol>
    )
}

export default CheckoutStepper