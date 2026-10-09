import { api } from "../lib";
import type { Product, ProductCategory, ProductResponse } from "../types/Product";

interface GetProductsParams
{
    limit?: number;
    skip?: number;
    category?: string;
    search?: string;
    sortBy?: string;
    order?: 'asc' | 'desc'
}

export const productsService = 
{
    async getAll(params: GetProductsParams = {}) : Promise<ProductResponse>
    {
        const {limit = 12, skip = 0, search, sortBy, order} = params

        if (search)
        { 
            const {data} = await api.get<ProductResponse>('/products/search', {
                params: {q: search, limit, skip, sortBy, order}
            })
            return data
        }

        if (sortBy && order)
        {
            const {data} = await api.get<ProductResponse>('/products', {
                params: {limit, skip, sortBy, order}
            })
            return data
        }

        const {data} = await api.get<ProductResponse>('/products', {
            params: {limit, skip}
        })
        return data

    },

    async getByCategory(category: string, params: GetProductsParams = {}) : Promise<ProductResponse>
    {
        const {limit = 12, skip = 0, sortBy, order} = params
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
    }
}