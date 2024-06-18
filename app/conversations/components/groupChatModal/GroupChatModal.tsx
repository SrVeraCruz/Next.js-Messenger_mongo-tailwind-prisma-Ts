import Button from "@/app/components/buttons/Buttons"
import Input from "@/app/components/inputs/Input"
import Select from "@/app/components/inputs/Select"
import Modal from "@/app/components/modal/Modal"
import { User } from "@prisma/client"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import toast from "react-hot-toast"

interface GroupChatModalProps {
  users: User[]
  isOpen?: boolean,
  onClose: () => void
}

export default function GroupChatModal({
  users,
  isOpen,
  onClose
}: GroupChatModalProps ) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: {
      errors
    }
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      members: []
    }
  })

  const members = watch('members')

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true)

    axios.post('/api/conversations', {
      ...data,
      isGroup: true
    })
    .then(() => {
      router.refresh()
      onClose()
    })
    .catch(() => toast.error('Something went wrong'))
    .finally(() => setIsLoading(false))
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-12">
          <div 
            className="border-b border-gray-900/10
              pb-12
            "
          >
            <h2 
              className="text-base font-semibold 
                text-gray-900 leading-7
              "
            >
              Create a group chat
            </h2>
            <p
              className="mt-1 text-sm text-gray-600
                leading-6
              "
            >
              Create a chat with more than 2 people
            </p>
            <div
              className="mt-10 flex flex-col gap-y-8"
            >
              <Input
                label="Name"
                id="name"
                disabled={isLoading}
                required
                register={register}
                errors={errors}
              />
              <Select
                disabled={isLoading}
                label="Members"
                options={users.map(user => ({
                  value: user.id,
                  label: user.name || 'Unknown'
                }))}
                onChange={(value) => {
                  setValue(
                    'members', value, { shouldValidate: true }
                  )
                }}
                value={members}
              />
            </div>
          </div>

          <div
            className="mt-6 flex  items-center justify-end
              gap-x-6
            "
          >
            <Button
              type="button"
              secondary
              disabled={isLoading}
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
            >
              Create
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  )
}