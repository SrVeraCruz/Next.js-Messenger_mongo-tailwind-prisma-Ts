import getConversationById from "@/app/actions/getConversationById"
import getMessages from "@/app/actions/getMessages"
import EmptyState from "@/app/components/emptyState/EmptyState"
import Header from "./components/header/Header"
import Body from "./components/body/Body"
import Form from "./components/form/Form"
import getCurrentUser from "@/app/actions/getCurrentUser"

interface IParams {
  conversationId: string
}

export default async function ConversationId(
  { params }: { params: IParams }
) {
  const conversation = await getConversationById(params.conversationId)
  const message = await getMessages(params.conversationId)
  const currentUser = await getCurrentUser()

  if(!conversation) {
    return (
      <div className="lg:pl-80 h-full">
        <div className="h-full flex flex-col">
          <EmptyState />
        </div>
      </div>
    )
  }

  return (
    <div className="lg:pl-80 h-full">
      <div className="h-full flex flex-col">
        <Header conversation={conversation} />
        <Body initialMessages={message} />
        <Form currentUser={currentUser!} />
      </div>
    </div>
  )
}