import getCurrentUser from "@/app/actions/getCurrentUser"
import { NextResponse } from "next/server"
import prisma from "@/app/libs/prismadb"

interface IParams {
  conversationId?: string
}

export async function POST(
  req: Request,
  { params }: { params: IParams }
) {
  try {
    const currentUser = await getCurrentUser()
    const { conversationId } = params

    if(!currentUser?.id || !currentUser?.email) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    // Find existing conversation
    const existingConversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId
      },
      include: {
        messages: {
          include: {
            seen: true
          }
        },
        users: true
      }
    })

    if(!existingConversation) {
      return new NextResponse('Invalid ID', { status: 400 })
    }

    // Find last message
    const lastMessage = existingConversation
    .messages[existingConversation.messages.length - 1]

    if(!lastMessage) {
      return NextResponse.json(existingConversation)
    }

    // Update seen of last message
    const updatedMessage = await prisma.message.update({
      where: {
        id: lastMessage.id
      },
      include: {
        sender: true,
        seen: true
      },
      data: {
        seen: {
          connect: {
            id: currentUser.id
          }
        }
      }
    })

    return NextResponse.json(updatedMessage)

  } catch (error: any) {
    console.log(error, 'ERROR_MESSAGE_SEEN')
    return new NextResponse('Internal Error', { status: 500 })
  }
}