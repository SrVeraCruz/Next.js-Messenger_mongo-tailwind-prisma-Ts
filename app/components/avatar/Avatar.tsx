import { User } from "@prisma/client"
import Image from "next/image"

interface AvatarProps {
  user: User
}

export default function Avatar({
  user
}: AvatarProps) {
  return (
    <div className="relative">
      <div
        className="relative inline-block rounded-full 
          overflow-hidden size-9 md:size-11
        "
      >
        <Image 
          src={user?.image || '/images/placeholder-user.jpg'}
          alt="avatar"
          fill
        />
      </div>
      <span 
        className="absolute top-0 right-0 block rounded-full 
          ring-2 ring-white bg-green-500 size-2 md:size-3
        "
      />
    </div>
  )
}