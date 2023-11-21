import { NextResponse } from "next/server"
import prisma from "@/prisma";
export const GET = async (req: Request, res: NextResponse) => {
    try {
        const id = req.url.split("/users/")[1];
        const users = await prisma.user.findFirst({ where: { id } })
        if (!users) {
            return NextResponse.json({ message: "Not Found" }, { status: 404 })

        }
        return NextResponse.json({ message: "Success", users }, { status: 200 })

    } catch (err) {
        return NextResponse.json({ message: "Error", err }, { status: 500 })
    } finally {
        await prisma.$disconnect
    }

}


export const PATCH = async (req: Request, res: NextResponse) => {
    try {
        const id = req.url.split("/users/")[1];
        const { userName , email, profilePic } = await req.json();
        const users = await prisma.user.update({ data: { userName , email, profilePic }, where:{id} })
        if (!users) {
            return NextResponse.json({ message: "Not Found" }, { status: 404 })

        }
        return NextResponse.json({ message: "Success", users }, { status: 200 })

    } catch (err) {
        return NextResponse.json({ message: "Error", err }, { status: 500 })
    } finally {
        await prisma.$disconnect
    }



}



export const DELETE = async (req: Request, res: NextResponse) => {
    try {
        const id = req.url.split("/users/")[1];
        const users = await prisma.user.delete({ where:{id} })
        if (!users) {
            return NextResponse.json({ message: "Not Found" }, { status: 404 })

        }
        return NextResponse.json({ message: "users deleted ", users }, { status: 200 })

    } catch (err) {
        return NextResponse.json({ message: "Error", err }, { status: 500 })
    } finally {
        await prisma.$disconnect
    }


}