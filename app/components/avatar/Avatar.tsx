import { User } from "@prisma/client"
import clsx from "clsx"
import Image from "next/image"

interface AvatarProps {
  user: User,
  big?: boolean
}

export default function Avatar({
  user,
  big
}: AvatarProps) {
  return (
    <div className="relative">
      <div
        className={clsx(`
          relative inline-block rounded-full 
          overflow-hidden 
        `,
          big ? 'size-[5rem] md:size-[6rem]' : 'size-9 md:size-11'
        )}
      >
        <Image 
          src={user?.image || '/images/placeholder-user.jpg'}
          alt="avatar"
          width={100}
          height={100}
          priority
        />
      </div>
      <span 
        className={clsx(`
          absolute block rounded-full 
          ring-2 ring-white bg-green-500  
        `,
          big ? 'size-3 md:size-4 md:top-1 md:right-1 top-1.5 right-1.5' 
              : 'size-2 md:size-[0.6rem] top-0 right-0'
        )}
      />
    </div>
  )
}