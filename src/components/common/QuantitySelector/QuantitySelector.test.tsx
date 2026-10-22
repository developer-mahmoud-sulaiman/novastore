import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import QuantitySelector from "./QuantitySelector";
import userEvent from "@testing-library/user-event";

describe('QuantitySelector', () => {

    it('renders the current value', () => {
        render(<QuantitySelector value={5} onIncrease={vi.fn()} onDecrease={vi.fn()} />)

        expect(screen.getByText('5')).toBeInTheDocument()
    })

    it('calls onIncrease when plus clicked', async () => {
        const user = userEvent.setup();
        const onIncrease = vi.fn();

        render(<QuantitySelector value={5} onIncrease={onIncrease} onDecrease={vi.fn()} />)

        await user.click(screen.getByLabelText(/increase/i))

        expect(onIncrease).toHaveBeenCalledTimes(1)
    });

    it('calls onDecrease when minus clicked', async () => {
        const user = userEvent.setup();
        const onDecrease = vi.fn();

        render(<QuantitySelector value={5} onIncrease={vi.fn()} onDecrease={onDecrease} />)

        await user.click(screen.getByLabelText(/decrease/i))

        expect(onDecrease).toHaveBeenCalledTimes(1)
    });

    it('disables decrease button at min value', () => {

        render(<QuantitySelector value={1} onIncrease={vi.fn()} onDecrease={vi.fn()} />)

        expect(screen.getByLabelText(/decrease/i)).toBeDisabled()
    });

    it('disables decrease button at max value', () => {
        
        render(<QuantitySelector value={99} onIncrease={vi.fn()} onDecrease={vi.fn()} max={99} />)

        expect(screen.getByLabelText(/increase/i)).toBeDisabled()
    });


})