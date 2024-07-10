"use client"

import useConversation from "@/app/hooks/useConversation"
import axios from "axios"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { HiPaperAirplane, HiPhoto } from "react-icons/hi2"
import MessageInput from "../messageInput/MessageInput"
import { CldUploadButton } from "next-cloudinary"
import { useRef } from "react"
import { debounce } from "lodash"
import { Conversation, User } from "@prisma/client"
import useOtherUser from "@/app/hooks/useOtherUser"

interface FormProps {
  conversation: Conversation & {
    users: User[]
  }
}

export default function Form({
  conversation
}: FormProps ) {
  const { conversationId } = useConversation()
  const otherUser = useOtherUser(conversation)

  const {
    register,
    handleSubmit,
    setValue,
    formState: {
      errors
    }
  } = useForm<FieldValues>({
    defaultValues: {
      message: ''
    }
  })

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setValue('message', '', { shouldValidate: true })

    axios.post('/api/messages', {
      ...data,
      conversationId
    })
  }

  const handleUpload = (result: any) => {
    axios.post('/api/messages',{
      image: result?.info?.secure_url,
      conversationId
    })
  }

  const debounceTyping = useRef(
    debounce(() => {
      axios.post('/api/typing', { typingUserId: otherUser?.id })
    }, 300)

  ).current

  const handleTyping = () => {
    debounceTyping()
  }

  return (
    <div 
      className="p-4 bg-white border-t flex items-center
        gap-2 lg:gap-4 w-full
      "
    >
      <CldUploadButton
        options={{maxFiles: 1}} 
        onSuccess={handleUpload}
        uploadPreset="messenger-uploads"
      >
        <HiPhoto size={30} className="text-sky-500 cursor-pointer" />
      </CldUploadButton>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center gap-2 lg:gap-4 w-full"
      >
        <MessageInput 
          id="message"
          register={register}
          errors={errors}
          required
          onKeyDown={handleTyping}
          placeholder="Write a message"
        />
        <button
          type="submit"
          className="rounded-full p-2 bg-sky-500 cursor-pointer
            hover:bg-sky-600 transition
          "
        >
          <HiPaperAirplane size={18} className="text-white" />
        </button>
      </form>
    </div>
  )
}