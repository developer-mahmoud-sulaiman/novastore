import { api } from "../lib";
import type { Product, ProductCategory, ProductResponse } from "../types/Product";

interface GetProductsParams
{
    limit?: number;
    skip?: number;
    search?: string;
    sort?: string;
}

    function parseSort(sort?: string): { sortBy?: string; order?: 'asc' | 'desc' } {
        if (!sort) return {};

        const [sortBy, order] = sort.split('-');

        return {
            sortBy,
            order: order === 'desc' ? 'desc' : 'asc',
        };
    }

export const productsService = 
{
    async getAll(params: GetProductsParams = {}) : Promise<ProductResponse>
    {
        const {limit = 12, skip = 0, search, sort} = params
        const {sortBy, order} = parseSort(sort)

        if (search)
        { 
            const {data} = await api.get<ProductResponse>('/products/search', {
                params: {q: search, limit, skip, sortBy, order}
            })
            return data
        }

    
        const {data} = await api.get<ProductResponse>('/products', {
            params: {limit, skip, sortBy, order}
        })
        return data
        
    },

    async getByCategory(category: string, params: GetProductsParams = {}) : Promise<ProductResponse>
    {
        const {limit = 12, skip = 0, sort} = params
        const {sortBy, order} = parseSort(sort)
        
        const {data} = await api.get<ProductResponse>(`/products/category/${category}`, {
            params: {limit, skip, sortBy, order}
        })
        return data
    },

    async getById(id: string | number): Promise<Product>
    {
        const {data} = await api.get<Product>(`/products/${id}`)
        return data
    },

    async getCategories(): Promise<ProductCategory[]>
    {
        const {data} = await api.get<ProductCategory[]>('/products/categories')
        return data
    },

    async getRelated(category: string, excludeId: number, limit = 4): Promise<Product[]> {
        const {data} = await api.get<ProductResponse>(`/products/category/${category}`, {
            params: {limit: limit + 1},
        });

        return data.products.filter((p) => p.id !== excludeId).slice(0, limit)
    }
}