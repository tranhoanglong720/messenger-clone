import prisma from "@/app/libs/prismadb";
import getSession from "./getSession";

const getUser = async () => {
  try {
    const session = await getSession();
    if (!session?.user?.email) {
      return [];
    }
    const users = prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        NOT: {
          email: session.user.email,
        },
      },
    });
    return users;
  } catch (error) {
    return [];
  }
};
export default getUser;
