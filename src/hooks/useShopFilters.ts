import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

export interface ShopFilters {
  q: string;
  category: string;
  sort: string;
  page: number;
}

const DEFAULT_FILTERS: ShopFilters = {
  q: "",
  category: "",
  sort: "",
  page: 1,
};

export function useShopFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = useMemo<ShopFilters>(
    () => ({
      q: searchParams.get("q") ?? DEFAULT_FILTERS.q,
      category: searchParams.get("category") ?? DEFAULT_FILTERS.category,
      sort: searchParams.get("sort") ?? DEFAULT_FILTERS.sort,
      page: Number(searchParams.get("page")) || DEFAULT_FILTERS.page,
    }),
    [searchParams],
  );

  const setFilters = useCallback(
    (updates: Partial<ShopFilters>, resetPage = true) => {
      const next = { ...filters, ...updates };

      if (resetPage && !("page" in updates)) {
        next.page = 1;
      }

      const params = new URLSearchParams();
      if (next.q) params.set("q", next.q);
      if (next.category) params.set("category", next.category);
      if (next.sort) params.set("sort", next.sort);
      if (next.page > 1) params.set("page", String(next.page));

      setSearchParams(params);
    },
    [filters, setSearchParams],
  );

  const clearFilters = useCallback(() => {
    setSearchParams(new URLSearchParams());
  }, [setSearchParams]);

  const hasActiveFilter =
    filters.q !== "" ||
    filters.category !== "" ||
    filters.sort !== "" ||
    filters.page > 1;

  return { filters, setFilters, clearFilters, hasActiveFilter };
}
