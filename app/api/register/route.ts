import { NextResponse } from "next/server"
import bcrypt from "bcrypt"

import prisma from "@/app/libs/prismadb"

export async function POST(req: Request) {
  try {
    const data = await req.json()
    const {
      email,
      name,
      password
    } = data

    if(!email || !name || !password) {
      return new NextResponse('Missing info', {status: 400})
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    const user = await prisma.user.create({
      data: {
        email,
        name,
        hashedPassword
      }
    })

    return NextResponse.json(user)
  } catch (err: any) {
    console.log(err, 'REGISTRATION_ERROR')
    return new NextResponse('Internal Error', {status: 500})
  }
}