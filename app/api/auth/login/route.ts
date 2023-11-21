'use server'
import prisma from "@/prisma";
import { NextResponse } from "next/server";
import { sign } from "jsonwebtoken";
import bcrypt from "bcrypt";
import create from "zustand"
import { persist, createJSONStorage } from 'zustand/middleware'
interface GenerationState {
  isLogin:boolean,
  setIsLogin :(isLogin: true)=> void
}

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

  const token = sign({ userName: user.userName }, secret, {
    expiresIn: maxAge,
  });

  const cookie = `token=${token}; Max-Age=${maxAge}; HttpOnly; Path=/`;

  const response = { message: "Authenticated", user };
   const logged = create<GenerationState>()((set)=>({
    isLogin : false ,
    setIsLogin:(isLogin : boolean)=> set({isLogin})
  }))

  return new Response(JSON.stringify(response), {
    status: 200,
    headers: {
      "Set-Cookie": cookie,
    },
  });

};
