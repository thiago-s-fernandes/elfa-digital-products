import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query";

interface CreateProductInput {
  name: string;
  price: number;
  brandId: string;
  description?: string;
  image?: string;
}

export async function createProduct(data: CreateProductInput): Promise<void> {
  const response = await fetch(`${process.env.API_BASE_URL}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response.json();
}

export default function useCreateProduct(): UseMutationResult<
  void,
  Error,
  CreateProductInput,
  unknown
> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}
