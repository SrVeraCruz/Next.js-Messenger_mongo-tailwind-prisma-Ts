import { Sidebar } from "../components/sidebar/Sidebar"


interface UsersLayoutProps {
  children: React.ReactNode
}

export default async function UsersLayout({
  children
}: UsersLayoutProps) {
  return (
    
    <Sidebar>
      <div className="h-full">
        {children}
      </div>
    </Sidebar>
  )
}