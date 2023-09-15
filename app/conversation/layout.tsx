import getConversations from "../action/getConversations";
import getUser from "../action/getUser";
import Slidebar from "../component/slidebar/SlideBar";
import ConversationList from "./component/ConversationList";

export default async function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const conversations = await getConversations();
  return (
    <Slidebar>
      <div className="h-full">
        {/* <UserList items={users} /> */}
        <ConversationList items={conversations} />
        {children}
      </div>
    </Slidebar>
  );
}
