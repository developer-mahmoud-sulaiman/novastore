import { useQuery } from "@tanstack/react-query";
import { productsService } from "../services/Product";

interface UseProductsParams
{
    limit?: number;
    skip?: number;
    search?: string;
    sortBy?: string;
    order?: 'asc' | 'desc';
    category?: string
}


export function useProducts(params: UseProductsParams = {})
{
    return useQuery({
        queryKey: ['products', params],
        queryFn: () => productsService.getAll(params),
        staleTime: 1000 * 60 * 5
    })
}

export function useProductByCategory(category: string, params: UseProductsParams = {})
{
    return useQuery({
        queryKey: ['products', 'category', category, params],
        queryFn: () => productsService.getByCategory(category, params),
        enabled: !!category
    })
}

export function useProduct(id: string | number | undefined)
{
    return useQuery({
        queryKey: ['product', id],
        queryFn: () => productsService.getById(id!),
        enabled: !!id
    })
}

export function useCategories()
{
    return useQuery({
        queryKey: ['categories'],
        queryFn: () => productsService.getCategories(),
        staleTime: 1000 * 60 * 30
    })
}