'use client'

import useRoutes from "@/app/hooks/useRoutes"
import { useState } from "react"
import DesktopItem from "./DesktopItem"
import { User } from "@prisma/client"
import Avatar from "../avatar/Avatar"
import SettingsModal from "./SettingsModal"

interface DesktopSidebarProps {
  currentUser: User
}

export default function DesktopSidebar({
  currentUser
}: DesktopSidebarProps) {
  const  routes = useRoutes()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <SettingsModal 
        currentUser={currentUser}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
      <div
        className="hidden lg:fixed lg:inset-y-0 lg:left-0
          lg:z-40 lg:w-20 xl:px-6 lg:overflow-y-auto lg:bg-white
          lg:border-r-[0.06rem] lg:pb-4 lg:flex lg:flex-col justify-between
        "
      >
        <nav
          className="mt-4 flex flex-col justify-between"
        >
          <ul
            className="flex flex-col items-center space-y-1"
          >
            {routes.map((route) => (
              <div key={route.href}>
                <DesktopItem 
                  href={route.href}
                  label={route.label}
                  icon={route.icon}
                  active={route.active}
                  onClick={route.onClick}
                />
              </div>
            ))}
          </ul>
        </nav>

        <nav
          className="mt-4 flex flex-col justify-between items-center"
        >
          <div
            onClick={() => setIsOpen(true)}
            className="cursor-pointer hover:opacity-75 transition"
          >
            <Avatar user={currentUser} />
          </div>
        </nav>
      </div>
    </>
  )
}