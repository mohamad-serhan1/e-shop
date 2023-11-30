"use client";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import QuantityInput from "../ui/quantity";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../auth-userId";
import { useState,useEffect } from "react";

const ProductDetails = ({
  data,
  productId,
}: {
  data: any;
  productId: any;
}) => {
  const { isAuthenticated, setIsAuthenticated } = useAuthStore();
  const userId = useAuthStore.getState().userId;

  const router = useRouter();
  if (!data || Object.keys(data).length === 0) {
    return <div>Loading...</div>;
  }
  const price = data?.price;
  
  const [formData, setFormData] = useState<any>({
    quantity: 1,
    totalPrice: 0,
    userId: userId,
    productId: productId,
  });

  const onQuantityChange = (newQuantity: number) => {
    if (data) {
      const totalPrice = newQuantity * data?.price;
      setFormData({
        ...formData,
        quantity: newQuantity,
        totalPrice: totalPrice,
      });
      console.log(totalPrice);
      // Update other state variables or perform necessary operations
    }
  };

  const addToCart = async() => {
    // get user id
    try{

      const products = await axios.post(
        `http://localhost:3000/api/orders`,formData
        );
        alert("order submitted successfully")
        return products.data;
      }
  catch(error) {
        alert("Can't submit: " + error);
      };
      
    router.push("/orders");
  };

  return (
    <div className="flex flex-col md:flex-row gap-20 items-center justify-center">
      <div className="basis-6/12">
        <Image
          className="rounded-md"
          src={data.image}
          alt={data.name}
          width={500}
          height={500}
        />
      </div>
      <div className="basis-6/12 flex flex-col gap-2 text-sm">
        <h1 className="text-3xl  font-semibold text-gray-800">{data.name}</h1>

        <div className="min-h-[150px]">{data.description}</div>
        <p>
          <span className="font-semibold">Category: </span>
          {data.category.name}
        </p>
        <p>
          <span className="font-semibold">Price: </span> {data.price}$
        </p>

        <div className="inline-block ">
          <Badge variant="outline">InStock</Badge>
        </div>
        <div className="border-t pt-3">
          <QuantityInput
            pricePerItem={price}
            onQuantityChange={onQuantityChange}
          />
        </div>
        <div className="pt-3">
          {isAuthenticated == true && (
            <Button onClick={addToCart} className="w-2/3" variant="default">
              Add to Cart
            </Button>
          )}
          {isAuthenticated == false && (
            <Button disabled className="w-2/3" variant="default">
              Add to Cart
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
export default ProductDetails;
