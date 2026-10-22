import { useForm } from "react-hook-form";
import Container from "../../components/ui/Container";
import { useAuth } from "../../hooks";
import { type LoginFormData, loginScema } from "../../lib";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "./LoginPage.module.css";
import Alert from "../../components/ui/Alert";
import FormField from "../../components/ui/FormField";
import Button from "../../components/ui/Button";
import { Link } from "react-router-dom";

function LoginPage() {
  const { login, isLoading, error } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginScema),
    defaultValues: {
      username: "emilys",
      password: "emilyspass",
    },
  });

  const onSubmit = (data: LoginFormData) => {
    login(data);
  };

  return (
    <Container>
      <div className={styles.wrapper}>
        <div className={styles.card}>
          <header className={styles.header}>
            <h1 className={styles.title}>Welcome back</h1>
            <p className={styles.subtitle}>Sign in to your NovaStore account</p>
          </header>
          {error && <Alert>{error}</Alert>}

          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <FormField
              label="Username"
              htmlFor="username"
              error={errors.username?.message}
            >
              <input
                id="username"
                type="text"
                placeholder="emilys"
                aria-invalid={!!errors.username}
                {...register("username")}
              />
            </FormField>

            <FormField
              label="Password"
              htmlFor="password"
              error={errors.password?.message}
            >
              <input
                id="password"
                type="password"
                placeholder="*********"
                aria-invalid={!!errors.password}
                {...register("password")}
              />
            </FormField>

            <Button type="submit" size="lg" fullWidth loading={isLoading}>
              Sign in
            </Button>
          </form>

          <p className={styles.footer}>
            Don't have an account? <Link to="/register">Sign up</Link>
          </p>
        </div>
      </div>
    </Container>
  );
}

export default LoginPage;
