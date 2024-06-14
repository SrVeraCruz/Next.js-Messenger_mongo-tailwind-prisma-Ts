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

  return (
    <Sidebar>
      <div className="h-full">
        <UserList items={users} />
        {children}
      </div>
    </Sidebar>
  )
}