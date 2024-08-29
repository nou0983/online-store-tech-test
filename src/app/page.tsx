import { Suspense } from "react";
import { ProductList } from "@/components/features/products/index.products";
import { Spinner } from "@/components/ui/index.ui";

export default function Home() {
  return (
    <section className="container">
      <Suspense fallback={<Spinner />}>
        <ProductList />
      </Suspense>
    </section>
  );
}
