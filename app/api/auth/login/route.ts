'use server'
import prisma from "@/prisma";
import { NextResponse } from "next/server";
import { sign } from "jsonwebtoken";
import bcrypt from "bcrypt";



export const POST = async (req: Request, res: NextResponse) => {
  const { userName, password } = await req.json();

  const user = await prisma.user.findUnique({
    where: { userName: userName },
  });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return NextResponse.json(
      { message: "Invalid username or password" },
      { status: 401 }
    );
  }


  const maxAge = 60 * 60 * 2;
  const secret = process.env.JWT_SECRET || "";

  const token = sign({ userName: user.userName, userId: user.id  }, secret, {
    expiresIn: maxAge,
  });

  const cookie = `token=${token}; Max-Age=${maxAge}; HttpOnly; Path=/`;

  const response = { message: "Authenticated", user ,userId:user.id};
  

   

  return new Response(JSON.stringify(response), {
    status: 200,
    headers: {
      "Set-Cookie": cookie,
    },
  });

};
