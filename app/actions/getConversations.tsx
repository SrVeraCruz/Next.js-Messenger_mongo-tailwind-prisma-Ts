import getCurrentUser from "./getCurrentUser";
import prisma from "@/app/libs/prismadb"

export default async function getConversations() {
  const currentUser = await getCurrentUser()

  if(!currentUser?.id) {
    return []
  }

  try {
    const conversations = await prisma?.conversation.findMany({
      orderBy: {
        lastMessageAt: "desc"
      },
      where: {
        userIds: {
          has: currentUser.id
        }
      },
      include: {
        users: true,
        messages: {
          include: {
            seen: true,
            sender: true
          }
        }
      }
    })

    if(!conversations) {
      return []
    }
    
    return conversations

  } catch (error: any) {
    return []
  }
}