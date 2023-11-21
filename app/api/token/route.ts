import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";


export async function GET() {
    const authToken = cookies();
    const token = authToken.get("token");

    if (!token) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 407 })
    }

    const { value } = token;
    const secret = process.env.JWT_SECRET || "";

    try {
        verify(value, secret)
        const response = {
            user: "Authenticate"
        }

        return new Response(JSON.stringify(response), { status: 200 })
    } catch (err) {
        return NextResponse.json({ message: "Something went wrong, try again !" }, { status: 400 })

    }
}