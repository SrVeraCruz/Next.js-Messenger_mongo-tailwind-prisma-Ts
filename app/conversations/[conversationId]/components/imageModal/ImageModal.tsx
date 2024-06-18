"use client"

import Modal from "@/app/components/modal/Modal"
import Image from "next/image"

interface ImageModalProps {
  src?: string | null
  isOpen?: boolean,
  onClose: () => void
}

export default function ImageModal({
  src,
  isOpen,
  onClose
}: ImageModalProps ) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="size-80">
        <Image
          alt="Image"
          fill
          sizes="auto"
          className="object-cover"
          src={src || ''}
        />
      </div>
    </Modal>
  )
}