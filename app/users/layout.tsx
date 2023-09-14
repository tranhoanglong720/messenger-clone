import getUser from "../action/getUser";
import Slidebar from "../component/slidebar/SlideBar";
import UserList from "./component/UserList";

export default async function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const users = await getUser();
  return (
    <Slidebar>
      <div className="h-full">
        <UserList items={users} />
        {children}
      </div>
    </Slidebar>
  );
}
