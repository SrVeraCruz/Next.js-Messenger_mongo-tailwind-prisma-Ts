import getCurrentUser from "@/app/actions/getCurrentUser"
import DesktopSidebar from "./DesktopSidebar"
import MobileFooter from "./MobileFooter"
import { User } from "@prisma/client"

interface  SidebarProps {
  children: React.ReactNode
}

export async function Sidebar({
  children
}: SidebarProps) {
  const currentUser = await getCurrentUser()

  return (
    <div className="h-full">
      <DesktopSidebar currentUser={currentUser as User} />
      <MobileFooter />
      <main className="lg:pl-20 h-full">
        {children}
      </main>
    </div>
  )
}