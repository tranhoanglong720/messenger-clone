import getCurrentUser from "./getCurrentUser";

const getMessages = async (conversationId: string) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser?.email) {
      return null;
    }
    const messages = prisma?.message.findMany({
      where: {
        conversationId: conversationId,
      },
      include: {
        sender: true,
        seen: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });
    return messages;
  } catch (error) {
    return null;
  }
};
export default getMessages;
