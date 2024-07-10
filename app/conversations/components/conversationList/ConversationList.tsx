"use client"

import useConversation from "@/app/hooks/useConversation"
import { FullConversationType } from "@/app/types"
import clsx from "clsx"
import { useRouter } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import { MdOutlineGroupAdd } from "react-icons/md"
import ConversationBox from "../conversationBox/ConversationBox"
import GroupChatModal from "../groupChatModal/GroupChatModal"
import { User } from "@prisma/client"
import { useSession } from "next-auth/react"
import { pusherClient } from "@/app/libs/pusher"
import { find } from "lodash"
import MobileHeader from "@/app/components/sidebar/MobileHeader"
import useTypingStatus from "@/app/hooks/useTypingStatus"

interface ConversationListProps {
  users: User[]
  currentUser: User
  initialItems: FullConversationType[]
}

export default function ConversationList({
  users,
  currentUser,
  initialItems
}: ConversationListProps) {
  const session = useSession()
  const [items, setItems] = useState(initialItems)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { addTypingMember, removeTypingMember } = useTypingStatus()

  const router = useRouter()

  const { conversationId, isOpen } = useConversation()
  
  const pusherKey = useMemo(() => {
    return session?.data?.user?.email
  }, [session?.data?.user?.email])

  useEffect(() => {
    if(!pusherKey) {
      return
    }

    const channel = pusherClient.subscribe(pusherKey)

    const newHandler = (newConversation: FullConversationType) => {
      setItems((current) => {
        if(find(current, { id: newConversation.id })) {
          return current
        }

        return [...current, newConversation]
      })
    }

    const updateHandler = (conversation: FullConversationType) => {
      setItems((current) => current.map((currentConversation) => {
        if(currentConversation.id === conversation.id) {
          return {
            ...currentConversation,
            messages: conversation.messages
          }
        }

        return currentConversation
      }))
    }

    const deleteHandler = (conversation: FullConversationType) => {
      setItems((current) => {
        return [...current.filter((conv => conv.id !== conversation.id))]
      })

      if(conversationId === conversation.id) {
        router.push('/conversations')
      }
    }

    channel.bind('conversation:new', newHandler)
    channel.bind('conversation:update', updateHandler)
    channel.bind('conversation:remove', deleteHandler)

    return () => {
      channel.unbind('conversation:new', newHandler)
      channel.unbind('conversation:update', updateHandler)
      channel.unbind('conversation:remove', deleteHandler)
      channel.unsubscribe()
    }
  }, [pusherKey, conversationId, router])

  useEffect(() => {
    const channel = pusherClient.subscribe(conversationId)

    const typingHandler = (id: string) => {
      addTypingMember(id)
      setTimeout(() => removeTypingMember(id), 3000)
    }

    channel.bind('typing', typingHandler)

    return () => {
      channel.unbind('typing', typingHandler)
      channel.unsubscribe()
    }
  }, [addTypingMember, removeTypingMember, conversationId])

  return (
    <>
      <GroupChatModal
        users={users}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <aside
        className={clsx(`
          fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block 
          overflow-y-hidden border-r border-gray-200
        `,
          isOpen ? 'hidden' : 'block w-full left-0'
        )}
      >
        <div className="px-5">
          <MobileHeader
            currentUser={currentUser}
          >
            <div className="flex flex-1 justify-between mb-4 pt-4">
              <div className="text-2xl font-bold text-neutral-800">
                Messages
              </div>
              <div 
                onClick={() => setIsModalOpen(true)}
                className="rounded-full p-2 text-gray-600 
                  bg-gray-100 cursor-pointer hover:opacity-75 
                  transition
                "
              >
                <MdOutlineGroupAdd size={20} />
              </div>
            </div>
          </MobileHeader>
          {items.map(item => (
            <div key={item.id}>
              <ConversationBox
                data={item}
                selected={conversationId === item.id}
              />
            </div>
          ))}
        </div>
      </aside>
    </>
  )
}