import Container from "@/components/Container";
import ProductCard from "@/components/product/productCard";
import axios from "axios";


export default async function Home() {
   async function fetchProd(): Promise<any[]> {
    const res = await axios.get("http://localhost:3000/api/products");
  
  
  
    return res.data;
  }
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
