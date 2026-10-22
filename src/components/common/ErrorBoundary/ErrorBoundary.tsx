import { Component, type ErrorInfo, type ReactNode } from "react";
import styles from "./ErrorBoundary.module.css";
import { AlertCircle } from "lucide-react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error, info: ErrorInfo) {
    console.error("Error Boundary Caught", error, info);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = "./";
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.wrapper}>
          <AlertCircle size={48} strokeWidth={1.5} className={styles.icon} />
          <h1 className={styles.title}>Something went wrong</h1>
          <p className={styles.message}>
            {this.state.error?.message ?? "An unexpected error occured"}
          </p>
          <button className={styles.btn} onClick={this.handleReset}>
            Go to Home
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
