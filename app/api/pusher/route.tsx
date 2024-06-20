import getSession from "@/app/actions/getSession";
import { pusherServer } from "@/app/libs/pusher";
import { NextResponse } from "next/server";
import { parse } from "querystring";

export async function POST(
  req: Request
) {
  const session = await getSession()

  if(!session?.user?.email) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  const body = await req.text()

  const { socket_id, channel_name} = parse(body)
  const data = {
    user_id: session.user.email
  }

  const authResponse = pusherServer.authorizeChannel(
    socket_id as string,
    channel_name as string,
    data
  )

  return NextResponse.json(authResponse)
}