import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, type RenderOptions } from "@testing-library/react";
import type { ReactElement, ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";

interface WrapperProps {
    children: ReactNode;
}

function AllProviders({children}: WrapperProps) {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {retry: false},
        }
    })

    return(
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>{children}</BrowserRouter>
        </QueryClientProvider>
    )
}

export function renderWithProviders(
    ui: ReactElement,
    options?: Omit<RenderOptions, 'wrapper' >
) {
    return render(ui, {wrapper: AllProviders, ...options});
}

export {renderWithProviders as render}