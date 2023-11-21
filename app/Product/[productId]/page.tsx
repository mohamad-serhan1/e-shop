"use client"
import React from "react";
import Container from "@/components/Container";
import ProductDetails from "../../../components/product/ProductDetails";

export default async function Page({ params: { productId } }: { params: { productId: any } }) {
  let formData = {
    quantity: 0,
    totalPrice: 0,
    userId: "",
    productId: productId,
  };

  async function prodDetails() {
    const res = await fetch(`http://localhost:3000/api/products/${productId}`, {
      next: {
        revalidate: 10,
      },
    });
    
    const data = await res.json();
    return data.products;
  }
  async function usercheck() {
    const res = await fetch(`http://localhost:3000/api/token`, {
      next: {
        revalidate: 10,
      },
    });
    
    const data = await res.json();
    console.log(data)
    return data;
  }



  const product = await prodDetails();
  // const checkToken =await usercheck();

  const handleQuantityChange = async (newQuantity: number) => {
    const product = await prodDetails();

    if (product) {
      formData = {
        ...formData,
        quantity: newQuantity,
        totalPrice: newQuantity * product.price,
       
      };
      console.log(newQuantity * product.price)


      // try {
      //   const orderData = {
      //     quantity: newQuantity,
      //     totalPrice: newQuantity * product.price,
      //     userId: "", // Replace with actual user ID
      //     productId: productId,
      //   };

      //   const res = await fetch(`http://localhost:3000/api/orders`, {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify(orderData),
      //   });

      //   if (res.ok) {
      //     const data = await res.json();
      //     console.log("Order placed:", data);
      //   } else {
      //     console.error("Failed to place order");
      //   }
      // } catch (error) {
      //   console.error("Error placing order:", error);
      // }
    }
  };

  return (
    <div className="p-8">

      <Container>
        <div>
          <ProductDetails data={product} onQuantityChange={handleQuantityChange} />
        </div>
      </Container>
    </div>
  );
}