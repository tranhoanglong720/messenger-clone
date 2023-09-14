import { User } from "@prisma/client";

import Image from "next/image";
interface AvatarProps {
  user?: User;
}
const Avatar: React.FC<AvatarProps> = ({ user }) => {
  return (
    <div className="relative">
      <div
        className="
        relative
        inline-block
        rounded-full
        w-9
        h-9
        md:w-11
        md:h-11
       overflow-hidden
      "
      >
        <Image
          alt="Avatar"
          src={user?.image || "/images/placeholder.jpg"}
          width={100}
          height={100}
        />
      </div>
      <span
        className="
            absolute
            block
            right-0
            top-0
            ring-3
            ring-white
            w-2
            h-2
            md:w-3
            md:h-3
            bg-green-500
            overflow-hidden
            rounded-full
        "
      ></span>
    </div>
  );
};
export default Avatar;
