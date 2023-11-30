
import { NextRequest, NextResponse } from 'next/server';
export const POST = async (req: Request, res: NextResponse) => {
   
    const cookie = `token=; Max-Age=0; HttpOnly; Path=/`;

    const response = { message: "Logged out successfully" };
    return new Response(JSON.stringify(response), {
        status: 200,
        headers: {
            "Set-Cookie": cookie,

        },
    });
};