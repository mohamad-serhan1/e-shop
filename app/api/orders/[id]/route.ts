import { NextResponse } from "next/server";

import prisma from "@/prisma";
export const GET = async (req: Request, res: NextResponse) => {
  try {
    const id = req.url.split("/orders/")[1];

    const orders = await prisma.order.findFirst({
      where: { id },
      include: {
        Product: { select: { name: true } },
      },
    });
    if (!orders) {
      return NextResponse.json({ message: "Not Found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Success", orders }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  } finally {
    await prisma.$disconnect;
  }
};

// export const PATCH = async (req: Request, res: NextResponse) => {
//     try {
//         const id = req.url.split("/orders/")[1];
//         const { name } = await req.json();

//         const orders = await prisma.order.update({ data: {  }, where: { id } })
//         if (!orders) {
//             return NextResponse.json({ message: "Not Found" }, { status: 404 })

//         }
//         return NextResponse.json({ message: "Success", orders }, { status: 200 })

//     } catch (err) {
//         return NextResponse.json({ message: "Error", err }, { status: 500 })
//     } finally {
//         await prisma.$disconnect
//     }

// }

export const DELETE = async (req: Request, res: NextResponse) => {
  try {
    const id = req.url.split("/orders/")[1];

    const orders = await prisma.order.delete({ where: { id } });
    if (!orders) {
      return NextResponse.json({ message: "Not Found" }, { status: 404 });
    }
    return NextResponse.json(
      { message: "orders deleted ", orders },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  } finally {
    await prisma.$disconnect;
  }
};
