"use client"

import { FullMessageType } from "@/app/types"
import { useEffect, useRef, useState } from "react"
import MessageBox from "../messageBox/MessageBox"
import axios from "axios"
import useConversation from "@/app/hooks/useConversation"

interface BodyProps {
  initialMessages: FullMessageType[]
}

export default function Body({
  initialMessages
}: BodyProps) {
  const [messages, setMessages] = useState(initialMessages)
  const bottomRef = useRef<HTMLDivElement>(null)

  const { conversationId } = useConversation()
  
  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`)
  }, [conversationId])

  return (
    <div className="flex-1 overflow-y-auto">
      {messages.map((message, i) => (
        <div key={message.id}>
          <MessageBox
            isLast={i === messages.length - 1}
            data={message}
          />
        </div>
      ))}
      <div ref={bottomRef} className="pt-24" />
    </div>
  )
}