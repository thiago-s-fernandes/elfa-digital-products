import { Product } from "@/types/models";
import { keepPreviousData, useQuery, type UseQueryResult } from "@tanstack/react-query";

export interface GetProductsData {
  data: {
    products: Product[];
    total: number;
  };
}

interface GetProductsQuery {
  page?: number;
  per_page?: number;
  name?: string;
}

export async function fetchFromApi<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${process.env.API_BASE_URL}${endpoint}`);
  return response.json();
}

export async function getProducts(query: GetProductsQuery = {}): Promise<GetProductsData> {
  const queryEntries = Object.entries(query);

  if (queryEntries.length === 0) {
    return fetchFromApi<GetProductsData>("/products");
  }

  const mappedQueryEntries = queryEntries
    .filter(([_, value]) => value !== "" && value !== undefined)
    .map(([key, value]) => `${key}=${value}`);

  return fetchFromApi<GetProductsData>(`/products?${mappedQueryEntries.join("&")}`);
}

export default function useGetProducts(
  params: GetProductsQuery,
): UseQueryResult<GetProductsData, Error> {
  return useQuery({
    queryKey: ["products", params],
    queryFn: () => getProducts(params),
    placeholderData: keepPreviousData,
  });
}
