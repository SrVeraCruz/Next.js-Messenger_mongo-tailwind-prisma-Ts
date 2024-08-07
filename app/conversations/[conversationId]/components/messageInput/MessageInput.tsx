"use client"

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form"

interface MessageInputProps {
  id: string,
  type?: string,
  register: UseFormRegister<FieldValues>,
  errors: FieldErrors,
  onKeyDown?: () => void
  required: boolean,
  placeholder?: string
}

export default function MessageInput({
  id,
  type = 'text',
  register,
  errors,
  onKeyDown,
  required,
  placeholder
}: MessageInputProps) {
  return (
    <div className="relative w-full">
      <input 
        id={id}
        type={type}
        autoComplete={id}
        {...register(id, {required})}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        className="text-black font-light py-2 px-4 bg-neutral-100
          w-full rounded-full focus:outline-none
        "
      />
    </div>
  )
}