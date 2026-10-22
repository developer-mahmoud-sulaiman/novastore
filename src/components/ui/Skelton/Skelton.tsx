import styles from "./Skelton.module.css";

interface skeltonProps {
  width?: string;
  height?: string;
  borderRadius?: string;
  className?: string;
}

function Skelton({
  width = "100%",
  height = "1rem",
  borderRadius = "var(--radius-md)",
  className,
}: skeltonProps) {
  return (
    <div
      className={`${styles.Skelton} ${className ?? ""}`}
      style={{ width, height, borderRadius }}
    />
  );
}

export default Skelton;
