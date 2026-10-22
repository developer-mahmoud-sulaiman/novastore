import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useDebounce } from "./useDebounce";

describe('useDebounce', () => {
    beforeEach(() => {
        vi.useFakeTimers()
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    it('returns the initial value immediately', () => {

        const {result} = renderHook(() => useDebounce('hello', 400));
        expect(result.current).toBe('hello')

    });

    it('does not update immediately when value changes', () => {

        const {result, rerender} = renderHook(
            ({value}) => useDebounce(value, 400),
            {initialProps: {value: 'initial'}}
        );

        rerender({value: 'changed'})
        expect(result.current).toBe('initial')

    });

    it('updates after the delay', () => {

    const {result, rerender} = renderHook(
        ({value}) => useDebounce(value, 400),
        {initialProps: {value: 'initial'}}
    );

    rerender({value: 'changed'});

    act(() => {
        vi.advanceTimersByTime(400)
    })

    expect(result.current).toBe('changed')

    });

    it('cancels previous timeout when value changes rapidly', () => {

    const {result, rerender} = renderHook(
        ({value}) => useDebounce(value, 400),
        {initialProps: {value: 'first'}}
    );

    rerender({value: 'second'});

    act(() => {
        vi.advanceTimersByTime(200)
    })

    rerender({value: 'third'});

    act(() => {
        vi.advanceTimersByTime(400)
    })

    expect(result.current).toBe('third')

    });

})