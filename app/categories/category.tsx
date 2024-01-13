import React from "react";
import Link from "next/link";
import axios from "axios";

export async function fetchCategories() {
  const res = await axios.get("http://localhost:3000/api/category" );
  console.log(res.data)
  return res.data.categories;
}


export default async function Category() {
  const categories = await fetchCategories();
  return (
    <section className="relative h-full w-full bg-gray-900 p-8">
      <div className="text-gray-200 flex flex-col gap-4">
        <h3 className="font-bold text-lg mb-2 ">Shop Categories</h3>
        {categories.map((category: any) => (
          <Link
            key={category.id}
            href={`/categories/${category.name}`}
            className="inline  transition-all duration-200 flex-shrink-0 hover:text-red-600 hover:shadow-inner"
          >
           <p className="inline transition-all duration-200 flex-shrink-0 hover:text-red-600 hover:shadow-inner">
              {category.name}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
