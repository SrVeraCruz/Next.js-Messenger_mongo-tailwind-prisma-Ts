import getCurrentUser from "@/app/actions/getCurrentUser"
import { pusherServer } from "@/app/libs/pusher"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser()
    const data = await req.json()
    const { conversationId } = data

    if(!currentUser?.id || !currentUser?.email) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    await pusherServer.trigger(conversationId, 'typing', currentUser.id)

    return NextResponse.json(200, { status: 200 })
  } catch (error: any) {
    console.log(error, 'ERROR_TYPING_POST')
    return new NextResponse('Internal Error', { status: 500 })
  }
}