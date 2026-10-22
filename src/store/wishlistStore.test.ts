import { beforeEach, describe, expect, it } from "vitest";
import type { Product } from "../types/Product";
import { useWishlistStore } from "./wishlistStore";

const mockProduct: Product = {
  id: 1,
  title: "Test Product",
  description: "A test product",
  price: 50,
  discountPercentage: 0,
  rating: 4.5,
  stock: 10,
  category: "test",
  thumbnail: "test.jpg",
  images: ["test.jpg"],
};

const mockProduct2: Product = {
  ...mockProduct,
  id: 2,
  title: "Second Product",
  price: 100,
};

describe("wishlistStore", () => {
  beforeEach(() => {
    useWishlistStore.setState({ items: [] });
  });

  it("starts with an empty wishlist", () => {
    expect(useWishlistStore.getState().items).toEqual([]);
  });

  it("add a product when toggled (not in wishlist)", () => {
    useWishlistStore.getState().toggleItem(mockProduct);
    const items = useWishlistStore.getState().items;
    expect(items).toHaveLength(1);
    expect(items[0].id).toBe(1);
    expect(items[0].title).toBe("Test Product");
  });

  it("removes a product from toggled again (in wishlist)", () => {
    useWishlistStore.getState().toggleItem(mockProduct);
    useWishlistStore.getState().toggleItem(mockProduct);
    expect(useWishlistStore.getState().items).toHaveLength(0);
  });

  it("does not add duplicate", () => {
    useWishlistStore.getState().toggleItem(mockProduct);
    useWishlistStore.getState().toggleItem(mockProduct);
    useWishlistStore.getState().toggleItem(mockProduct);
    expect(useWishlistStore.getState().items).toHaveLength(1);
  });

  it("removes product by ID", () => {
    useWishlistStore.getState().toggleItem(mockProduct);
    useWishlistStore.getState().toggleItem(mockProduct2);
    useWishlistStore.getState().removeItem(1);

    const items = useWishlistStore.getState().items;
    expect(items).toHaveLength(1);
    expect(items[0].id).toBe(2);
  });

  it("correctly reports isInWishlist", () => {
    expect(useWishlistStore.getState().isInWishlist(1)).toBe(false);
    useWishlistStore.getState().toggleItem(mockProduct);
    expect(useWishlistStore.getState().isInWishlist(1)).toBe(true);
    useWishlistStore.getState().toggleItem(mockProduct);
    expect(useWishlistStore.getState().isInWishlist(1)).toBe(false);
  });

  it("clears the entire wishlist", () => {
    useWishlistStore.getState().toggleItem(mockProduct);
    useWishlistStore.getState().toggleItem(mockProduct2);
    useWishlistStore.getState().clearWishlist();
    expect(useWishlistStore.getState().items).toHaveLength(0);
  });

  it("handle multiple products correctly", () => {
    useWishlistStore.getState().toggleItem(mockProduct);
    useWishlistStore.getState().toggleItem(mockProduct2);

    const items = useWishlistStore.getState().items;
    expect(items).toHaveLength(2);
    expect(items.map((i) => i.id)).toEqual([1, 2]);
  });

  it("does not affect other products when removing one", () => {
    useWishlistStore.getState().toggleItem(mockProduct);
    useWishlistStore.getState().toggleItem(mockProduct2);
    useWishlistStore.getState().removeItem(1);
    expect(useWishlistStore.getState().isInWishlist(1)).toBe(false);
    expect(useWishlistStore.getState().isInWishlist(2)).toBe(true);
  });
});
