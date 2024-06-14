"use client"

import { User } from "@prisma/client"
import UserBox from "../userBox/UserBox"

interface UserListProps {
  items: User[]
}

export default function UserList({
  items,
}: UserListProps) {

  return (
    <aside
      className="fixed inset-y-0 left-0 pb-20 lg:pb-0 lg:left-20
        lg:w-80 lg:block overflow-y-auto border-r border-gray-200
        block w-full
      "
    >
      <div className="px-5">
        <div className="flex flex-col">
          <div className="text-2xl font-bold text-neutral-800 py-4">
            People
          </div>
        </div>

        {items.map(item => (
          <div key={item.id}>
            <UserBox
              data={item}
            />
          </div>
        ))}
      </div>
    </aside>
  )
}