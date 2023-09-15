import getConversationById from "@/app/action/getConversationById";
import getMessages from "@/app/action/getMessages";
import Empty from "@/app/component/Empty";
import Header from "./component/Header";
import Body from "./component/Body";
import Form from "./component/Form";

interface IParams {
  conversationId: string;
}

const ChatId = async ({ params }: { params: IParams }) => {
  const conversation = await getConversationById(params.conversationId);
  const messages = await getMessages(params.conversationId);

  console.log("a", params.conversationId);

  if (!conversation) {
    return (
      <div className="lg:pl-80 h-full">
        <div className="h-full flex flex-col">
          <Empty />
        </div>
      </div>
    );
  }

  return (
    <div className="lg:pl-80 h-full">
      <div className="h-full flex flex-col bg-gray-200">
        <Header conversation={conversation} />
        <Body />
        <Form />
      </div>
    </div>
  );
};

export default ChatId;
