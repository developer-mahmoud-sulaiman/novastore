import RootLayout from "../layouts/RootLayout";
import ProtectedRoute from "./ProtectedRoute";
import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Spinner from "../components/ui/Spinner";

// Lazy Loaded Pages
const HomePage = lazy(() => import("../pages/HomePage"));
const ShopPage = lazy(() => import("../pages/ShopPage/ShopPage"));
const ProductPage = lazy(() => import("../pages/ProductPage/ProductPage"));
const WishlistPage = lazy(() => import("../pages/WishlistPage/WishlistPage"));
const CartPage = lazy(() => import("../pages/CartPage/CartPage"));
const CheckoutPage = lazy(() => import("../pages/CheckoutPage/CheckoutPage"));
const LoginPage = lazy(() => import("../pages/LoginPage/LoginPage"));
const RegisterPage = lazy(() => import("../pages/RegisterPage/RegisterPage"));
const AccountPage = lazy(() => import("../pages/AccountPage/AcoountPage"));
const OrderPage = lazy(() => import("../pages/OrderPage/OrderPage"));
const OrderDetailsPage = lazy(
  () => import("../pages/OrderDetailsPage/OrderDetailsPage"),
);
const AboutPage = lazy(() => import("../pages/AboutPage/AboutPage"));
const ContactPage = lazy(() => import("../pages/ContactPage/ContactPage"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage/NotFoundPage"));

function PageLoader() {
  return (
    <div
      style={{
        padding: "5rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "60vh",
      }}
    >
      <Spinner size={32} />
    </div>
  );
}

function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />

          {/* Prodtected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/orders" element={<OrderPage />} />
            <Route path="/orders/:id" element={<OrderDetailsPage />} />
          </Route>
          {/* Prodtected Routes */}

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default AppRoutes;
