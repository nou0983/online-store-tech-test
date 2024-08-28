import { ProductItem } from "../index.products";
import { getProducts } from "@/services/api-products";

const ProductList = async () => {
  // You can pass a limit to get only a certain number of products
  const products = await getProducts();

  return (
    <ul>
      <h2>Products</h2>
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </ul>
  );
};

export default ProductList;

export const revalidate = 3600; // Revalidate products every hour
