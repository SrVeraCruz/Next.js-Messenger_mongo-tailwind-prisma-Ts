import { NextResponse } from "next/server"

import getCurrentUser from "@/app/actions/getCurrentUser"
import prisma from "@/app/libs/prismadb"

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser()
    const data = await req.json()
    const {
      name,
      image
    } = data

    if(!currentUser?.id || !currentUser?.email) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: currentUser.id
      },
      data: {
        name,
        image
      }
    })

    return NextResponse.json(updatedUser)
    
  } catch (error: any) {
    console.log(error, 'ERROR_SETTINGS_POST')
    return new NextResponse('Internal Error', { status: 500 })
  }
}