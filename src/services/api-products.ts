import type { Product } from "@/types/products.types";

export const getProducts = async (limit: number = 5): Promise<Product[]> => {
  const res = await fetch(`https://fakestoreapi.com/products?limit=${limit}`);

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await res.json();
  return data;
};
