import styles from "./Spinner.module.css";

interface SpinnerProps {
  size?: number;
}

function Spinner({ size = 24 }: SpinnerProps) {
  return (
    <div
      className={styles.Spinner}
      style={{ width: size, height: size }}
      role="status"
      arei-label="loading"
    />
  );
}

export default Spinner;
