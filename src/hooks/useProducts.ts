import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { productsService } from "../services/Product";

interface UseProductsParams {
  limit?: number;
  skip?: number;
  search?: string;
  sort?: string;
  category?: string;
}

const PAGE_SIZE = 12;

export function useProducts(params: UseProductsParams = {}) {
  const { category, ...rest } = params;
  return useQuery({
    queryKey: ["products", params],
    queryFn: () =>
      category
        ? productsService.getByCategory(category, rest)
        : productsService.getAll(rest),
    staleTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData,
  });
}

export function useProductByCategory(
  category: string,
  params: UseProductsParams = {},
) {
  return useQuery({
    queryKey: ["products", "category", category, params],
    queryFn: () => productsService.getByCategory(category, params),
    enabled: !!category,
  });
}

export function useProduct(id: string | number | undefined) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => productsService.getById(id!),
    enabled: !!id,
  });
}

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => productsService.getCategories(),
    staleTime: 1000 * 60 * 30,
  });
}

export function useCategoriesWithMeta() {
  return useQuery({
    queryKey: ["categories", "meta"],
    queryFn: () => productsService.getCategoriesWithMeta(),
    staleTime: 1000 * 60 * 30,
  });
}

export { PAGE_SIZE };
