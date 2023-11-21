import { NextResponse } from "next/server"

import prisma from "@/prisma";
export const GET = async (req: Request, res: NextResponse) => {
    try {
        const id = req.url.split("/products/")[1];

        const products = await prisma.product.findFirst({
            where: { id }, include: {
                category: { select: { name: true } },
               
            },
        })
        if (!products) {
            return NextResponse.json({ message: "Not Found" }, { status: 404 })

        }
        return NextResponse.json({ message: "Success", products }, { status: 200 })

    } catch (err) {
        return NextResponse.json({ message: "Error", err }, { status: 500 })
    } finally {
        await prisma.$disconnect
    }

}


export const PATCH = async (req: Request, res: NextResponse) => {
    try {
        const id = req.url.split("/products/")[1];
        const { name } = await req.json();

        const products = await prisma.product.update({ data: { name }, where: { id } })
        if (!products) {
            return NextResponse.json({ message: "Not Found" }, { status: 404 })

        }
        return NextResponse.json({ message: "Success", products }, { status: 200 })

    } catch (err) {
        return NextResponse.json({ message: "Error", err }, { status: 500 })
    } finally {
        await prisma.$disconnect
    }



}



export const DELETE = async (req: Request, res: NextResponse) => {
    try {
        const id = req.url.split("/products/")[1];

        const products = await prisma.product.delete({ where: { id } })
        if (!products) {
            return NextResponse.json({ message: "Not Found" }, { status: 404 })

        }
        return NextResponse.json({ message: "products deleted ", products }, { status: 200 })

    } catch (err) {
        return NextResponse.json({ message: "Error", err }, { status: 500 })
    } finally {
        await prisma.$disconnect
    }


}