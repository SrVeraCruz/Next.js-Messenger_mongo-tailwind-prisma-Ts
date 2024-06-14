"use client"

import clsx from "clsx"
import EmptyState from "../components/emptyState/EmptyState"
import useConversation from "../hooks/useConversation"

export default function ConversationsPage() {
  const { isOpen } = useConversation()

  return (
    <div
      className={clsx(
        `lg:pl-80 h-full lg:block`,
        isOpen ? 'block' : 'hidden'
      )}
    >
      <EmptyState />
    </div>
  )
}