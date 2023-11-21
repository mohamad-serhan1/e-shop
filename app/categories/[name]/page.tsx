import React from "react";
import Container from "@/components/Container";
import ProductCard from "@/components/product/productCard";

export default async function Category({
  params: { name },
}: {
  params: { name: any };
}) {
  async function fetchCategProd() {
    const res = await fetch(`http://localhost:3000/api/category/${name}`, {
      next: {
        revalidate: 10,
      },
    });
    const data = await res.json();

    return data.category;
  }
  // Replace with the actual category name
  const categories = await fetchCategProd();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      <Container>
        <h1 className="font-bold text-lg text-gray-600 py-4">{categories.name}</h1>

        {categories.Product.map((product: any) => (
          <ProductCard key={product.id} data={product} />
          
        ))}
      </Container>
    </div>
  );
}
