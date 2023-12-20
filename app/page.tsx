import Container from "@/components/Container";
import ProductCard from "@/components/product/productCard";
import Fetch from "@/components/product/fetchProduct";

export default async function Home() {

  return (
    <main className="flex-grow  flex-col items-center pt-10 text-gray-600">
    <Fetch/>
    </main>
  );
}