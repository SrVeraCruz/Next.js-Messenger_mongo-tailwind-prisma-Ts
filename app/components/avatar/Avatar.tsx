import useActiveList from "@/app/hooks/useActiveList"
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
  const { members } = useActiveList()
  const isActive = members.indexOf(user.email!) !== -1
 
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
      {isActive && (
        <span 
          className={clsx(`
            absolute block rounded-full 
            ring-white bg-green-500  
          `,
            big 
              ? `size-3 md:size-4 md:top-1 md:right-1 
                top-[0.31rem] right-[0.31rem] ring-[0.16rem]
              `
              : `size-2 md:size-[0.6rem] top-0 right-0 ring-2`
          )}
        />
      )}
    </div>
  )
}