import prisma from "@/prisma";
import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";

export async function main() {

    try {
        await prisma.$connect();

    } catch (err) {
        return Error("Error Connecting to the Database")

    }

}


export const GET = async (req: Request, res: NextResponse) => {
    try {
        await main();
        const categories = await prisma.category.findMany({
            include: { Product: true }
        });
        
        return NextResponse.json({ message: "success", categories })

    } catch (err) {
        return NextResponse.json({ message: "Error", err }, { status: 500 })
    }
}



export const POST = async (req: Request, res: NextResponse) => {
    try {
        const { name } = await req.json();
        await main();
        const categoryCreated = await prisma.category.create({ data: { name } })
        return NextResponse.json({ message: "success", categoryCreated }, { status: 200 })
    } catch (err) {
        return NextResponse.json({ message: "Error", err }, { status: 500 })
    } finally {
        await prisma.$disconnect();
    }
}



