import { User } from "@prisma/client"
import getCurrentUser from "../actions/getCurrentUser"
import getUsers from "../actions/getUsers"
import { Sidebar } from "../components/sidebar/Sidebar"
import UserList from "./components/userList/UserList"

interface UsersLayoutProps {
  children: React.ReactNode
}

export default async function UsersLayout({
  children
}: UsersLayoutProps) {
  const users = await getUsers()
  const currentUser = await getCurrentUser()

  return (
    <Sidebar>
      <div className="h-full">
        <UserList 
          currentUser={currentUser as User} 
          items={users} 
        />
        {children}
      </div>
    </Sidebar>
  )
}