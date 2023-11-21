import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import QuantityInput from "../ui/quantity";


const ProductDetails = ({ data, onQuantityChange  }: { data: any; onQuantityChange: (newQuantity: number) => void  }) => {
  const price =data.price

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
          <QuantityInput pricePerItem={price} onQuantityChange={onQuantityChange} />
          
        </div>
        <div className="pt-3">
          <Button className="w-2/3" variant="default">
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};
export default ProductDetails;
