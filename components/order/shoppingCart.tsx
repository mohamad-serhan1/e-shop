"use client";

import Image from "next/image";
import { useAuthStore } from "../auth-userId";


const shoppingCart = ({ data }: { data: any }) => {
  return (
    <div
      className="
    
    border-slate-300
    bg-slate-50
    rounded-sm
    p-2
    transition
    text-center
    text-sm
    mb-5
    "
    >
      <div className="flex flex-row gap-4  border-b">
        
          <div className="flex flex-row gap-1 basis-1/2 ">
            <Image
              className="p-2"
              src={data.Product.image}
              alt={data.Product.name}
              width={100}
              height={100}
            />
            <p className="flex items-center">{data.Product.name}</p>
          </div>
       

        <div className=" flex flex-row flex-grow justify-between items-center">
          <p>{data.Product.price}$</p>
          <p>{data.quantity}</p>
          <p>{data.totalPrice}$</p>
        </div>
      </div>
    </div>
  );
};

export default shoppingCart;
