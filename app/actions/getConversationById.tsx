import getSession from "./getSession"
import prisma from "@/app/libs/prismadb"

export default async function getConversationById(
  conversationId: string
) {
  try {
    const session = await getSession()
    
    if(!session?.user?.email) {
      return null
    }

    const conversation = await prisma?.conversation.findUnique({
      where: {
        id: conversationId
      },
      include: {
        users: true
      }
    })

    return conversation
  } catch (error: any) {
    return null
  }
}