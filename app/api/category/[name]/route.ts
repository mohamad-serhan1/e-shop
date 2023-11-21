import { NextResponse } from "next/server"
import { main } from "../route";
import prisma from "@/prisma";
export const GET = async (req: Request, res: NextResponse) => {
    try {
        const name = req.url.split("/category/")[1];
        await main();
        const category = await prisma.category.findFirst({ where: { name },include:{Product:true} })
        if (!category) {
            return NextResponse.json({ message: "Not Found" }, { status: 404 })

        }
        return NextResponse.json({ message: "Success", category }, { status: 200 })

    } catch (err) {
        return NextResponse.json({ message: "Error", err }, { status: 500 })
    } finally {
        await prisma.$disconnect
    }

}


export const PATCH = async (req: Request, res: NextResponse) => {
    try {
        const id = req.url.split("/category/")[1];
        const { name } = await req.json();
        await main();
        const category = await prisma.category.update({ data: { name }, where:{id} })
        if (!category) {
            return NextResponse.json({ message: "Not Found" }, { status: 404 })

        }
        return NextResponse.json({ message: "Success", category }, { status: 200 })

    } catch (err) {
        return NextResponse.json({ message: "Error", err }, { status: 500 })
    } finally {
        await prisma.$disconnect
    }



}



export const DELETE = async (req: Request, res: NextResponse) => {
    try {
        const id = req.url.split("/category/")[1];
        await main();
        const category = await prisma.category.delete({ where:{id} })
        if (!category) {
            return NextResponse.json({ message: "Not Found" }, { status: 404 })

        }
        return NextResponse.json({ message: "Category deleted ", category }, { status: 200 })

    } catch (err) {
        return NextResponse.json({ message: "Error", err }, { status: 500 })
    } finally {
        await prisma.$disconnect
    }


}