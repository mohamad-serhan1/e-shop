"use client";
import React from "react";
import Container from "@/components/Container";
import ShoppingCart from "@/components/order/shoppingCart";
import { useAuthStore } from "@/components/auth-userId";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Page() {
  const [orders, setOrders] = useState([]);
  const { isAuthenticated, setIsAuthenticated } = useAuthStore();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/orders`)
      .then((res) => {
        setOrders(res.data.orders);
        console.log(res.data);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
        setOrders([]);
      });
  }, []);

  return (
    <div>
      <Container>
        <div className="font-semibold text-xl pt-4 pb-6 text-center ">
          
          Shopping Cart
        </div>
        <div className="flex flex-row gap-4  border-b">
          <p className="basis-6/12">Product</p>
          <div className="flex flex-row flex-grow justify-between">
            <p>Price</p>
            <p>Quantity</p>
            <p>Total Price</p>
          </div>
        </div>
        <div>
          {orders.map((order: any) => (
            <ShoppingCart key={order.id} data={order} />
          ))}
        </div>
      </Container>
    </div>
  );
}
