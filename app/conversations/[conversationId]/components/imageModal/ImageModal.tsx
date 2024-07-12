"use client"

import Modal from "@/app/components/modal/Modal"
import Image from "next/image"
import { HiDownload } from "react-icons/hi"
import DownloadLink from "../downloadLink/DownloadLink"

interface ImageModalProps {
  src?: string | null,
  filename? : string,
  isOpen?: boolean,
  onClose: () => void
}

export default function ImageModal({
  src,
  filename,
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
      <div className="absolute bottom-4 right-4 cursor-pointer">
        <DownloadLink
          filename={filename!}
          src={src!}
        >
          <HiDownload color="#fff" className="size-9" />
        </DownloadLink>
      </div>
    </Modal>
  )
}