import { signIn, useSession } from "next-auth/react";
import { useRef, useState } from "react";
import Spinner from "../Icons/Spinner";
import ArrowDropDown from "../Icons/Arrow";
import UserAvatar from "./Avatar";
import UserMenu from "./Menu";

const Widget = () => {
  const { data: session, status } = useSession();
  const [showMenu, setShowMenu] = useState(false);
  const menuDivRef = useRef<HTMLDivElement>(null);

  const handleShowMenu = () => {
    if (menuDivRef.current) {
      setShowMenu(!showMenu);
    }
  };

  if (status === "loading") return <Spinner />;

  return (
    <div className="group w-full">
      {status === "authenticated" ? (
        <div className="select-none">
          <div
            onClick={handleShowMenu}
            className="flex items-center pl-1 pr-4 py-1 transition-all delay-150 duration-300 bg-green-400 hover:ring ring-white rounded-full cursor-pointer"
          >
            <UserAvatar
              image={session?.user.image}
              name={session?.user.name!}
            />
            <span className="font-bold text-white">
              {session?.user.name!.split(" ").shift()}
            </span>
            <ArrowDropDown isVisible={showMenu} />
          </div>
          <UserMenu
            isVisible={showMenu}
            ref={menuDivRef}
            email={session?.user.email!}
            name={session?.user.name!}
          />
        </div>
      ) : (
        <button
          onClick={() => signIn("spotify")}
          className="w-24 font-bold text-white py-2 transition-all delay-150 duration-300 bg-green-400 hover:ring ring-white rounded-full"
        >
          Login
        </button>
      )}
    </div>
  );
};
export default Widget;
