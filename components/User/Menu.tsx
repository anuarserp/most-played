import { signOut } from "next-auth/react";
import { ForwardedRef, forwardRef } from "react";

const Menu = forwardRef(
  (
    props: {
      name: string;
      email: string;
      isVisible: boolean;
    },
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const { name, email, isVisible } = props;

    return (
      <div
        ref={ref}
        className={`absolute p-2 text-sm w-56 top-28 right-6 rounded-xl bg-green-400 text-white flex flex-col gap-2 ${
          isVisible ? "block" : "hidden"
        }`}
      >
        <span className="hover:bg-green-300 mb-0 rounded-lg py-1 px-2">
          Hello, {name}
        </span>
        <span className="hover:bg-green-300 rounded-lg py-1 px-2 border-b-2">
          {email}
        </span>
        <button
          onClick={() => signOut()}
          className="text-left hover:bg-green-300 rounded-lg py-1 px-2"
        >
          Logout?
        </button>
      </div>
    );
  }
);

Menu.displayName = "UserMenu";

export default Menu;
