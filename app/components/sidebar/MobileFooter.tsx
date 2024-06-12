"use client"

import useConversation from "@/app/hooks/useConversation"
import MobileItem from "./MobileItem"
import useRoutes from "@/app/hooks/useRoutes"

export default function MobileFooter() {
  const routes = useRoutes()
  const { isOpen } = useConversation()

  if(isOpen) {
    return null
  }

  return (
    <div
      className="fixed justify-between w-full bottom-0 z-40
        flex items-center bg-white border-t-[0.06rem] lg:hidden
      "
    >
      {routes.map(route => (
        <div className="w-full h-full" key={route.href}>
          <MobileItem 
            href={route.href}
            label={route.label}
            icon={route.icon}
            active={route.active}
            onClick={route.onClick}
          />
        </div>
      ))}
    </div>
  )
}