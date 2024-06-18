"use client"

import Button from "@/app/components/buttons/Buttons"
import Modal from "@/app/components/modal/Modal"
import useConversation from "@/app/hooks/useConversation"
import { DialogTitle } from "@headlessui/react"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useCallback, useState } from "react"
import toast from "react-hot-toast"
import { FiAlertTriangle } from "react-icons/fi"

interface ConfirmModalProps {
  isOpen?: boolean,
  onClose: () => void
}

export default function ConfirmModal({
  isOpen,
  onClose
}: ConfirmModalProps) {
  const router = useRouter()
  const { conversationId } = useConversation()
  const [isLoading, setIsLoading] = useState(false)

  const onDelete = useCallback(() => {
    setIsLoading(true)

    axios.delete(`/api/conversations/${conversationId}`)
    .then(() => {
      onClose()
      router.push('/conversations')
      router.refresh()
    })
    .catch(() => toast.error('Something went wrong!'))
    .finally(() => setIsLoading(false))
  }, [conversationId, router, onClose])
  
  return (
    <Modal 
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="sm:flex sm:items-center">
        <div
          className="mx-auto flex size-12 flex-shrink-0
            items-center justify-center rounded-full 
            bg-red-100 sm:mx-0 sm:size-10
          " 
        >
          <FiAlertTriangle 
            className="size-6 text-red-600"
          />
        </div>
        <div 
          className="mt-3 text-center sm:ml-3 sm:mt-0 
            sm:text-left
          "
        >
          <DialogTitle
            as="h3"
            className="text-base font-semibold leading-6
              text-gray-900
            "
          >
            Delete Conversation
          </DialogTitle>
          <div className="mt-2">
            <p className="text-sm text-gray-600">
              Are you sure you want to deletethis conversation? This action cannot be undone.
            </p>
          </div>
        </div>
      </div>
      <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
        <Button
          disabled={isLoading}
          danger
          onClick={onDelete}
        >
          Delete
        </Button>
        <Button
          disabled={isLoading}
          secondary
          onClick={onClose}
        >
          Cancel
        </Button>
      </div>
    </Modal>
  )
}