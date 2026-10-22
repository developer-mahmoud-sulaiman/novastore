import { useCallback, useMemo } from "react";
import ActiveFilters from "../../components/common/ActiveFilters";
import CategoryFilter from "../../components/common/CategoryFilter";
import Pagination from "../../components/common/Pagination";
import ProductsGrid from "../../components/common/ProductsGrid";
import SearchBar from "../../components/common/SearchBar";
import SortSelect from "../../components/common/SortSelect";
import Container from "../../components/ui/Container";
import { PAGE_SIZE, useCategories, useProducts } from "../../hooks";
import { useShopFilters } from "../../hooks/useShopFilters";
import styles from "./ShopPage.module.css";

function ShopPage() {
  const { filters, setFilters, clearFilters, hasActiveFilter } =
    useShopFilters();
  const { data: categoriesData } = useCategories();

  const skip = (filters.page - 1) * PAGE_SIZE;

  const { data, isLoading, isError, error, isFetching } = useProducts({
    limit: PAGE_SIZE,
    skip,
    search: filters.q || undefined,
    sort: filters.sort || undefined,
    category: filters.category || undefined,
  });

  const products = data?.products ?? [];
  const total = data?.total ?? 0;
  const totalPages = useMemo(() => Math.ceil(total / PAGE_SIZE), [total]);

  const categoryNames = categoriesData?.map((c) => c.slug) ?? [];

  const handlePageChange = useCallback(
    (page: number) => {
      setFilters({ page }, false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [setFilters],
  );

  return (
    <Container>
      <div className={styles.header}>
        <h1 className={styles.title}>Shop</h1>
        <p className={styles.subtitle}>
          {isLoading ? "Loading Products" : `${total} Products found`}
        </p>
      </div>

      <div className={styles.toolbar}>
        <SearchBar
          value={filters.q}
          onChange={(q) => setFilters({ q })}
          placeholder="Search products..."
        />

        <SortSelect
          value={filters.sort}
          onChange={(sort) => setFilters({ sort })}
        />
      </div>

      <CategoryFilter
        categories={categoryNames}
        value={filters.category}
        onChange={(category) => setFilters({ category })}
      />

      <ActiveFilters
        filters={{
          q: filters.q,
          category: filters.category,
          sort: filters.sort,
        }}
        onClear={clearFilters}
      />

      {isError && (
        <div className={styles.error}>
          <p>Error: {error.message}</p>
        </div>
      )}

      <div className={isFetching && !isLoading ? styles.fetching : ""}>
        <ProductsGrid
          products={products}
          isLoading={isLoading}
          skeltonCount={PAGE_SIZE}
        />
      </div>

      {!isLoading && products.length > 0 && (
        <Pagination
          currentPage={filters.page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}

      {!isLoading && products.length === 0 && !isError && (
        <div className={styles.empty}>
          <p>No Products Match Your Filters</p>
          {hasActiveFilter && (
            <button className={styles.clearBtn} onClick={clearFilters}>
              Clear Filters
            </button>
          )}
        </div>
      )}
    </Container>
  );
}

export default ShopPage;
