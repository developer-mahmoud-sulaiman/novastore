import { beforeEach, describe, expect, it } from "vitest";
import type { Product } from "../types/Product";
import { useCartStore } from "./cartStore";

const mockProduct: Product = {
    id: 1,
    title: 'Test Product',
    description: 'A test product',
    price: 50,
    discountPercentage: 0,
    rating: 4.5,
    stock: 10,
    category: 'test',
    thumbnail: 'test.jpg',
    images: ['test.jpg']
}

describe('cartStore', () => {
    beforeEach(() => {
        useCartStore.setState({items: []})
    });

    it('starts with an empty cart', () => {
        expect(useCartStore.getState().items).toEqual([])
    });

    it('add new item to the cart', () => {
        useCartStore.getState().addItem(mockProduct);
        const items = useCartStore.getState().items;
        expect(items).toHaveLength(1);
        expect(items[0]).toMatchObject({
            id: 1,
            title: 'Test Product',
            price: 50,
            quantity: 1,
        })
    });

    it('increase quantity when adding the same product', () => {
    useCartStore.getState().addItem(mockProduct);
    useCartStore.getState().addItem(mockProduct);
    const items = useCartStore.getState().items;
    expect(items).toHaveLength(1);
    expect(items[0].quantity).toBe(2)
    });

    it('removes an item from the cart', () => {
    useCartStore.getState().addItem(mockProduct);
    useCartStore.getState().removeItem(1);
    expect(useCartStore.getState().items).toHaveLength(0);
    });

    it('decrease quantity and remove when reaching 0', () => {
    useCartStore.getState().addItem(mockProduct);
    useCartStore.getState().decreaseQuantity(1);
    expect(useCartStore.getState().items).toHaveLength(0);
    });

    it('clears the entire cart', () => {
    useCartStore.getState().addItem(mockProduct);
    useCartStore.getState().addItem({...mockProduct, id: 2});
    useCartStore.getState().clearCart();
    expect(useCartStore.getState().items).toHaveLength(0);
    });

    it('calculates correct subtotal', () => {
    useCartStore.getState().addItem(mockProduct, 3);
    useCartStore.getState().addItem({...mockProduct, id: 2, price: 100}, 2);

    const items = useCartStore.getState().items;
    const subtotal = items.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
    )

    expect(subtotal).toBe(350);
    }); 

})