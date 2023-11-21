import prisma from "@/prisma";
import { NextResponse, } from "next/server";



export const GET = async (req: Request, res: NextResponse) => {
  try {
    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get("categoryId") || undefined// /api/products?categoryId=${categoryId}

    // if (!categoryId) {
    //   const products = await prisma.product.findMany()
    //   return NextResponse.json({ message: "All products", products }, { status: 200 })
    // }

    const products = await prisma.product.findMany({
      where: {
        categoryId: categoryId
      },
      include:{ Orders: true}
    });
    return NextResponse.json({ message: "success", products })

  } catch (error) {

    return NextResponse.json({ message: "Error", error }, { status: 500 })
  }
}



export const POST = async (req: Request, res: NextResponse) => {
  try {
    const { name, description, image, price, inStock = true, categoryId } = await req.json();

    const productCreated = await prisma.product.create({
      data: {
        name,
        description,
        image,
        price,
        inStock,
        categoryId
      },
    });

    return NextResponse.json({ message: "Success", productCreated }, { status: 200 });
  } catch (err) {
    console.log(err)
    return NextResponse.json({ message: "Error", error: err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};



