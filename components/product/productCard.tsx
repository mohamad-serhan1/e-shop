"use client";

import Image from "next/image";
import Link from "next/link";

const productCard = ({ data }: { data: any }) => {
  return (
    <div
      className="col-span-1 
    cursor-pointer
    border
    border-slate-300
    bg-slate-50
    rounded-sm
    p-2
    transition
    hover:scale-105
    text-center
    text-sm
    mb-5
    "
    >
      <Link href={`/Product/${data.id}`}>
        <div className="flex flex-col items-center w-full gap-1">
          <div className="aspect-square overflow-hidden relative w-full text-black">
            <Image src={data.image} alt={data.name} width={500} height={500} />
          </div>
          <div className="">{data.name}</div>
          <div className="bg-black text-white w-full">{data.price}$</div>
        </div>
      </Link>
    </div>
  );
};

export default productCard;
