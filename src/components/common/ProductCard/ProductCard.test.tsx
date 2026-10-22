import { beforeEach, describe, expect, it } from "vitest"
import { useCartStore } from "../../../store"
import { screen } from "@testing-library/react";
import ProductCard from "./ProductCard";
import type { Product } from "../../../types/Product";
import { render } from '../../../test/utils';

const mockProduct: Product = {
    id: 1,
    title: 'Test Product',
    description: 'A test product',
    price: 49.99,
    discountPercentage: 0,
    rating: 4.5,
    stock: 10,
    category: 'test',
    thumbnail: 'test.jpg',
    images: ['test.jpg']
}

describe('ProductCard', () => {

    beforeEach(() => {
        useCartStore.setState({items: []});
    });

    it('renders product title and price', () => {
        render(<ProductCard product={mockProduct} />);
        expect(screen.getByText('Test Product')).toBeInTheDocument();
        expect(screen.getByText('$49.99')).toBeInTheDocument();
    });

    it('links to the products details page', () => {
        render(<ProductCard product={mockProduct} />);
        const link = screen.getAllByRole('link')[0];
        expect(link).toHaveAttribute('href', '/product/1');
    });

    it('adds product title and prito cart when add button clicked', async () => {
        const { user } = {user: (await import('@testing-library/user-event')).default.setup()}
        render(<ProductCard product={mockProduct} />);
        await user.click(screen.getByLabelText(/add to cart/i));
        const cartItems = useCartStore.getState().items;
        expect(cartItems).toHaveLength(1);
        expect(cartItems[0].id).toBe(1)

    });

    it('renders rating', () => {
        render(<ProductCard product={mockProduct} />);
        expect(screen.getByText('4.5')).toBeInTheDocument();
    });

})