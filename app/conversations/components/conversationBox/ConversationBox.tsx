import Avatar from "@/app/components/avatar/Avatar"
import AvatarGroup from "@/app/components/avatarGroup/AvatarGroup"
import useOtherUser from "@/app/hooks/useOtherUser"
import useTypingStatus from "@/app/hooks/useTypingStatus"
import { FullConversationType } from "@/app/types"
import clsx from "clsx"
import { format } from "date-fns"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useCallback, useMemo } from "react"

interface ConversationBoxProps {
  data: FullConversationType,
  selected?: boolean
}

export default function ConversationBox({
  data,
  selected
}: ConversationBoxProps ) {
  const otherUser = useOtherUser(data)
  const session = useSession()
  const router = useRouter()
  const { typingMembers } = useTypingStatus()

  const handleClick = useCallback(() => {
    router.push(`/conversations/${data.id}`)
  }, [data.id, router])

  const lastMessage = useMemo(() => {
    const message = data.messages || []

    return message[message.length - 1]
  }, [data.messages])

  const userEmail = useMemo(() => {
    return session?.data?.user?.email
  }, [session?.data?.user?.email])

  const hasSeen = useMemo(() => {
    if(!lastMessage) {
      return false
    }

    const seenArray = lastMessage.seen || []

    if(!userEmail) {
      return false
    }

    return seenArray.filter(
      user => user.email === userEmail
    ).length !== 0
  }, [userEmail, lastMessage])

  const isTyping = useMemo(() => {
    return typingMembers.includes(otherUser.id)
  }, [typingMembers, otherUser?.id]) 

  const lastMessageText = useMemo(() => {
    if(isTyping && !data?.isGroup) {
      return 'typing...'
    }

    if(lastMessage?.image) {
      return 'Sent an image';
    }

    if(lastMessage?.body) {
      return lastMessage?.body
    }

    return 'Started a conversation'
  }, [lastMessage, isTyping, data?.isGroup])

  return (
    <div
      onClick={handleClick}
      className={clsx(`
        w-full relative flex items-center space-x-3 rounded-lg
        hover:bg-neutral-100 transition p-3 cursor-pointer
      `,
        selected ? 'bg-neutral-100' : 'bg-white'
      )}
    >
      {data?.isGroup ? (
        <AvatarGroup users={data.users} />
      ) : (
        <Avatar user={otherUser} />
      )}
      <div className="min-w-0 flex-1">
        <div className="focus:outline-none">
          <div className="flex justify-between items-center mb-1">
            <p 
              className="text-md font-medium 
                text-gray-900 capitalize
              "
            >
              {data.name || otherUser.name}
            </p>
            {lastMessage?.createdAt && (
              <p className="text-xs text-gray-400 font-light">
                {format(new Date(lastMessage?.createdAt), 'p')}
              </p>
            )}
          </div>
          <p
            className={clsx(`
              truncate text-sm
            `,
              hasSeen ? 'text-gray-500' : 'text-black font-medium'
            )}
          >
            {lastMessageText}
          </p>
        </div>
      </div>
    </div>
  )
}