import { User } from "@prisma/client";
import { FullConversationType } from "../types";
import { useSession } from "next-auth/react";
import { useMemo } from "react";


export default function useOtherUser(
  conversation: FullConversationType | {
    users: User[]
  }
) {
  const session = useSession()

  const otherUser = useMemo(() => {
    const currentUserEmail = session?.data?.user?.email

    return conversation.users.filter(
      user => user.email !== currentUserEmail
    )[0]
  }, [session?.data?.user?.email, conversation.users])

  return otherUser
}