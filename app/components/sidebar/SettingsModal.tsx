"use client"

import { User } from "@prisma/client"
import Modal from "../modal/Modal"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import axios from "axios"
import toast from "react-hot-toast"
import Input from "../inputs/Input"
import Image from "next/image"
import { CldUploadButton } from "next-cloudinary"
import Button from "../buttons/Buttons"

interface SettingsModalProps {
  currentUser: User,
  isOpen?: boolean,
  onClose: () => void
}

export default function SettingsModal({
  currentUser,
  isOpen,
  onClose
}: SettingsModalProps ) {
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
      name: currentUser?.name,
      image: currentUser?.image
    }
  })

  const image = watch('image')

  const handleUpload = (result: any) => {
    setValue('image', result?.info?.secure_url, {
      shouldValidate: true
    })
  }

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true)

    axios.post('/api/settings', data)
    .then(() => {
      router.refresh()
      onClose()
    })
    .catch(() => toast.error('Something went wrong!'))
    .finally(() => setIsLoading(false))
  } 

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 
              className="text-base font-semibold leading-7
                text-gray-900
              "
            >
              Profile 
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Edit your public information.
            </p>

            <div className="mt-10 flex flex-col gap-y-8">
              <Input
                label="Name"
                id="name"
                disabled={isLoading}
                required
                register={register}
                errors={errors}
              />
            
              <div>
                <label
                  className="block text-sm font-medium leading-6
                    text-gray-900
                  "
                >
                  Photo
                </label>
                <div
                  className="mt-2 flex items-center gap-x-3"
                >
                  <div 
                    className="size-12 overflow-hidden
                      rounded-full
                    "
                  >
                    <Image
                      width={48}
                      height={48}
                      priority
                      className="size-12 object-cover"
                      src={image || currentUser?.image || '/images/placeholder-user.jpg'}
                      alt="Avatar"
                    />
                  </div>
                  <CldUploadButton
                    options={{ maxFiles: 1 }}
                    onSuccess={handleUpload}
                    uploadPreset="messenger-uploads"
                  >
                    <Button
                      disabled={isLoading}
                      secondary
                    >
                      Change
                    </Button>
                  </CldUploadButton>
                </div>
              </div>
            </div>
          </div>

          <div
            className="mt-6 flex items-center justify-end
              gap-x-6
            "
          >
            <Button
              disabled={isLoading}
              secondary
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              disabled={isLoading}
              type="submit"
            >
              Save
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  )
}