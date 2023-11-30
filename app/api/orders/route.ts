
import prisma from "@/prisma";
import { NextResponse, } from "next/server";
import { useAuthStore } from "@/components/auth-userId";



export const GET = async (req: Request, res: NextResponse) => {
  try {
    const { searchParams } = new URL(req.url);
    const productId = searchParams.get("productId") || undefined// /api/orders?productId=${productId}


    const orders = await prisma.order.findMany({
      where: {
        productId: productId,
      },
      include: { Product: true }

    });
    return NextResponse.json({ message: "success", orders })

  } catch (error) {

    return NextResponse.json({ message: "Error", error }, { status: 500 })
  }
}
export const POST = async (req: Request, res: NextResponse) => {
  try {
    const { quantity, totalPrice, productId, userId } = await req.json();

    const orderCreated = await prisma.order.create({
      data: {
        quantity,
        totalPrice,
        userId,
        productId
      },
    });

    return NextResponse.json({ message: "Success", orderCreated }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Error", error: err }, { status: 500 });
  }
};
