import { Link, useNavigate } from "react-router-dom";
import Container from "../../components/ui/Container";
import styles from "./RegisterPage.module.css";
import { useAuthStore } from "../../store";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { type RegisterFormData, registerSchema } from "../../lib";
import { zodResolver } from "@hookform/resolvers/zod";
import FormField from "../../components/ui/FormField";
import Alert from "../../components/ui/Alert";
import Button from "../../components/ui/Button";
import api from "../../lib/axios";

function RegisterPage() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async () => {
    setError(null);
    try {
      const { data: authData } = await api.post("/auth/login", {
        username: "emilys",
        password: "emilyspass",
        expiresInMins: 60,
      });

      setAuth(
        {
          id: authData.id,
          username: authData.username,
          email: authData.email,
          firstName: authData.firstName,
          lastName: authData.lastName,
          gender: authData.gender,
          image: authData.image,
        },
        authData.accessToken,
      );
      navigate("/", { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration Failed");
    }
  };

  return (
    <Container>
      <div className={styles.wrapper}>
        <div className={styles.card}>
          <header className={styles.header}>
            <h1 className={styles.title}>Create Account</h1>
            <p className={styles.subtitle}>Join NovaStore today</p>
          </header>
          {error && <Alert>{error}</Alert>}

          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <div className={styles.row}>
              <FormField
                label="First Name"
                htmlFor="firstName"
                error={errors.firstName?.message}
              >
                <input
                  id="firstName"
                  type="text"
                  aria-invalid={!!errors.firstName}
                  {...register("firstName")}
                  placeholder="John"
                />
              </FormField>

              <FormField
                label="Last Name"
                htmlFor="lastName"
                error={errors.lastName?.message}
              >
                <input
                  id="lastName"
                  type="text"
                  aria-invalid={!!errors.lastName}
                  {...register("lastName")}
                  placeholder="Doe"
                />
              </FormField>
            </div>

            <FormField
              label="Email"
              htmlFor="email"
              error={errors.email?.message}
            >
              <input
                id="email"
                type="email"
                aria-invalid={!!errors.email}
                {...register("email")}
                placeholder="john@mail.com"
              />
            </FormField>

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

            <FormField
              label="Confirm Password"
              htmlFor="confirmPassword"
              error={errors.confirmPassword?.message}
            >
              <input
                id="confirmPassword"
                type="password"
                placeholder="*********"
                aria-invalid={!!errors.confirmPassword}
                {...register("confirmPassword")}
              />
            </FormField>

            <Button type="submit" size="lg" fullWidth loading={isSubmitting}>
              Sign up
            </Button>
          </form>

          <p className={styles.footer}>
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </div>
      </div>
    </Container>
  );
}

export default RegisterPage;
