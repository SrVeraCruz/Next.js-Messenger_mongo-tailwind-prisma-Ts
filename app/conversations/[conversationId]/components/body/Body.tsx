"use client"

import { FullMessageType } from "@/app/types"
import { useEffect, useRef, useState } from "react"
import MessageBox from "../messageBox/MessageBox"
import axios from "axios"
import useConversation from "@/app/hooks/useConversation"
import { pusherClient } from "@/app/libs/pusher"
import { find } from "lodash"

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

  useEffect(() => {
    const channel = pusherClient.subscribe(conversationId)
    bottomRef?.current?.scrollIntoView()

    const messageHandler = (message: FullMessageType) => {
      axios.post(`/api/conversations/${conversationId}/seen`)

      setMessages((current) => {
        if(find(current, { id: message.id })) {
          return current
        }
        
        return [...current, message]
      })

      bottomRef?.current?.scrollIntoView()
    }

    const updateMessageHandler = (newMessage: FullMessageType) => {
      setMessages((current) => current.map((currentMessage) => {
        if(currentMessage.id === newMessage.id) {
          return newMessage
        }

        return currentMessage
      }))
    }

    channel.bind('messages:new', messageHandler)
    channel.bind('message:update', updateMessageHandler)

    return () => {
      channel.unbind('messages:new', messageHandler)
      channel.unbind('message:update', updateMessageHandler)
      channel.unsubscribe()
    }
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