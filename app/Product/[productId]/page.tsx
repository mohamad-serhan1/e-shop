import React from "react";
import Container from "@/components/Container";
import ProductDetails from "../../../components/product/ProductDetails";
import axios from "axios";

export default async function Page({
  params: { productId },
}: {
  params: { productId: any };
}) {
  const getProducts = async (productId: any) => {
    try {
      // get user id
      const products = await axios.get(
        `http://localhost:3000/api/products/${productId}`
      );
      return products.data;
    } catch (error) {
      console.error("Error");
    }
  };
  const product = await getProducts(productId);


  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:3000/api/products/${productId}`)
  //     .then((res) => {
  //       setProduct(res.data.products);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching product:", error);
  //     });
  // }, [productId]); // Include productId as a dependency to fetch data when it changes, and setProduct to prevent rendering

  

  return (
    <div className="p-8">
      <Container>
        <div>
          <ProductDetails
            data={product.products}
            productId={productId}
          />
          
        </div>
      </Container>
    </div>
  );
}
