import Container from "@/components/Container";
import ProductCard from "@/components/product/productCard";

 export async function fetchProd() {
  const res = await fetch("http://localhost:3000/api/products", {
    next: {
      revalidate: 10,
    },
  });

  
  const data = await res.json();
 
  return data.products;
}

export default async function Home() {
  const products = await fetchProd();

  return (
    <main className="flex-grow  flex-col items-center pt-10 text-gray-600">
      <Container>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
          {products.map((product: any) => (
          <ProductCard key={product.id} data={product} />
           
          ))}
        </div>
      </Container>
    </main>
  );
}
