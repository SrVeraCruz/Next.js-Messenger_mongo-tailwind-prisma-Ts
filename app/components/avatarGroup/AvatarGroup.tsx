"use client"

import { User } from "@prisma/client"
import clsx from "clsx"
import Image from "next/image"

interface AvatarGroupProps {
  users?: User[]
  big?: boolean
}

export default function AvatarGroup({
  users = [],
  big = false
}: AvatarGroupProps ) {
  const slicedUsers = users.slice(0, 3)

  const positionMap = {
    0: 'top-0 left-1/2 -translate-x-1/2',
    1: 'bottom-0',
    2: 'bottom-0 right-0'
  }

  return (
    <div 
      className={clsx(`
        relative
      `,
        big ? 'size-[5rem] md:size-[6rem]' : 'size-9 md:size-11'
    )}>
      {slicedUsers?.map((user, index) => (
        <div
          key={user.id}
          className={clsx(`
            absolute inline-block rounded-full
            overflow-hidden 
            ${positionMap[index as keyof typeof positionMap]}
          `,
            big ? 'size-[2.2rem] md:size-[2.7rem]' : 'size-[1rem] md:size-[1.25rem]'
        )}>
          <Image 
            alt="Avatar"
            fill
            sizes="auto"
            src={user?.image || '/images/placeholder-user.jpg'}
          />
        </div>
      ))}
    </div>
  )
}