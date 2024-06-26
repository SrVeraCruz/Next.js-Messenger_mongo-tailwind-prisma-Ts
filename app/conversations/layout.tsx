import getConversations from "../actions/getConversations";
import getUsers from "../actions/getUsers";
import { Sidebar } from "../components/sidebar/Sidebar";
import ConversationList from "./components/conversationList/ConversationList";
import getCurrentUser from "../actions/getCurrentUser";

interface ConversationsLayoutProps {
  children: React.ReactNode
}

export default async function ConversationsLayout({
  children
}: ConversationsLayoutProps) {
  const conversations = await getConversations()
  const currentUser = await getCurrentUser()
  const users = await getUsers()

  return (
    <Sidebar>
      <div className="h-full">
        <ConversationList
          users={users}
          currentUser={currentUser!} 
          initialItems={conversations}
        />
        {children}
      </div>
    </Sidebar>
  )
}