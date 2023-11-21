import React from "react";
import Container from "@/components/Container";
import ShoppingCart from "@/components/order/shoppingCart";

const Page = () => {
  const fetchOrders = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/orders`, {
        next: {
          revalidate: 10,
        },
      });
      const data = await res.json();
      return data.orders; // Return the fetched orders
    } catch (error) {
      console.error("Error fetching orders:", error);
      return []; // Return an empty array in case of an error
    }
  };

  const orders = fetchOrders();

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
        {orders.then((orderData) =>
          orderData.map((order: any) => (
            <ShoppingCart key={order.id} data={order} />
          ))
        )}
      </Container>
    </div>
  );
};

export default Page;
