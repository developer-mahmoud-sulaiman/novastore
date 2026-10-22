import { X } from "lucide-react";
import styles from "./ActiveFilters.module.css";

interface ActiveFiltersProps {
  filters: {
    q?: string;
    category?: string;
    sort?: string;
  };
  onClear: () => void;
}

function ActiveFilters({ filters, onClear }: ActiveFiltersProps) {
  const items = Object.entries(filters).filter(([, v]) => v);

  if (items.length === 0) return null;

  return (
    <div className={styles.wrapper}>
      <span className={styles.label}>Active:</span>
      {items.map(([Key, value]) => (
        <span key={Key} className={styles.chip}>
          {Key === "q" ? "Search" : Key === "category" ? "Category" : "Sort"}:{" "}
          <strong>{value}</strong>
        </span>
      ))}

      <button type="button" className={styles.clear} onClick={onClear}>
        {" "}
        <X size={14} /> Clear All
      </button>
    </div>
  );
}

export default ActiveFilters;
