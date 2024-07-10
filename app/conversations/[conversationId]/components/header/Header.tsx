"use client"

import Avatar from "@/app/components/avatar/Avatar"
import useOtherUser from "@/app/hooks/useOtherUser"
import { Conversation, User } from "@prisma/client"
import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { HiChevronLeft, HiEllipsisHorizontal } from "react-icons/hi2"
import ProfileDrawer from "../profileDrawer/ProfileDrawer"
import AvatarGroup from "@/app/components/avatarGroup/AvatarGroup"
import useActiveList from "@/app/hooks/useActiveList"
import { pusherClient } from "@/app/libs/pusher"
import useTypingStatus from "@/app/hooks/useTypingStatus"

interface HeaderProps {
  conversation: Conversation & {
    users: User[]
  }
}

export default function Header({
  conversation
}: HeaderProps) {
  const otherUser = useOtherUser(conversation)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const { typingMembers } = useTypingStatus()

  const { members } = useActiveList()
  const isActive = members.indexOf(otherUser.email!) !== -1

  const isTyping = useMemo(() => {
    return typingMembers.includes(otherUser.id)
  }, [typingMembers, otherUser?.id]) 

  const statusText = useMemo(() => {
    if(conversation.isGroup) {
      return `${conversation.users.length} members`
    }

    if(isTyping && !conversation.isGroup) {
      return 'typing...'
    }

    return isActive ? 'Online' : 'Offline'
  }, [conversation, isActive])


  return (
    <>
      <ProfileDrawer 
        data={conversation}
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
      <div
        className="bg-white w-full flex border-b-[0.06rem] sm:px-4
          py-3 px-4 lg:px-6 justify-between items-center shadow-sm
        "
      >
        <div className="flex gap-3 items-center">
          <Link
            className="lg:hidden block text-sky-500 
              hover:text-sky-600 transition cursor-pointer
            "
            href={'/conversations'}
          >
            <HiChevronLeft size={32} />
          </Link>
          {conversation.isGroup ? (
            <AvatarGroup users={conversation.users} />
          ) : (
            <Avatar user={otherUser} />
          )} 
          <div className="flex flex-col">
            <div className="capitalize">
              {conversation.name || otherUser.name}
            </div>
            <div className="text-sm font-light text-neutral-500">
              {statusText}
            </div>
          </div>
        </div>
        <HiEllipsisHorizontal 
          size={32}
          onClick={() => setDrawerOpen(true)}
          className="text-sky-500 hover:text-sky-600 
            cursor-pointer transition
          "
        />
      </div>
    </>
  )
}