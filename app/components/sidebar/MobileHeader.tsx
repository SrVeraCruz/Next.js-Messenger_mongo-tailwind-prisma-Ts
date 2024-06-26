"use client"

import { useState } from "react";
import Avatar from "../avatar/Avatar";
import SettingsModal from "./SettingsModal";
import { User } from "@prisma/client";

interface MobileHeaderProps {
  children: React.ReactNode,
  currentUser: User
}

export default function MobileHeader({
  children,
  currentUser
}: MobileHeaderProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <SettingsModal
        currentUser={currentUser}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
      <div className="flex items-center gap-4">
        <div
          onClick={() => setIsOpen(true)}
          className="cursor-pointer hover:opacity-75 transition
            lg:hidden
          "
        >
          <Avatar user={currentUser} />
        </div>
        {children}
      </div>
    </>
  )
}