import { AlertCircle } from "lucide-react";
import styles from "./Alert.module.css";

interface AlertProps {
  children: string;
}

function Alert({ children }: AlertProps) {
  return (
    <div className={styles.alert} role="alert">
      <AlertCircle size={16} />
      <span>{children}</span>
    </div>
  );
}

export default Alert;
