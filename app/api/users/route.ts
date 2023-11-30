import prisma from "@/prisma";
import { NextResponse } from "next/server";


export const GET = async (req: Request, res: NextResponse) => {

    try {
        const users = await prisma.user.findMany();
        return NextResponse.json({ message: "success", users })

    } catch (err) {
        return NextResponse.json({ message: "Error", err }, { status: 500 })
    }
}


export const POST = async (req: Request, res: NextResponse) => {
    const bcrypt = require('bcrypt');

    try {
        const { email, userName, password } = await req.json()

        const existingEmail = await prisma.user.findUnique({
            where: { email: email },
        })
        if (existingEmail) {
            return NextResponse.json({ message: "email exist:", email }, { status: 409 })
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const users = await prisma.user.create({ data: { userName, email, password: hashedPassword } });

        return NextResponse.json({ message: "success", users })


    } catch (err) {

        return NextResponse.json({ message: "Error", err }, { status: 500 })
    }
}







