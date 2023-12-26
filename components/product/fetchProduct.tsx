import Container from "@/components/Container";
import ProductCard from "@/components/product/productCard";
import axios from "axios";


const fetchProd = async() => {
  // get user id
  try{

    const products = await axios.get(
      `http://localhost:3000/api/products`
      );
      return products.data.products;
    }
catch(error) {
      console.log("Can't fetch products: " + error);
    };
};

export default async function Fetch() {
  const products = await fetchProd();
 console.log(products)
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