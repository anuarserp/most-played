import { NAV_LINKS_PAGES } from "@/constants/pages";
import Link from "next/link";
import Brand from "./Brand";
import UserWidget from "../User/Widget";

const Navbar = () => (
  <nav className="mx-auto flex items-center justify-between flex-wrap bg-transparent p-6 mt-5 max-w-[90rem] ">
    <Brand />
    <div className="flex items-center -ml-72">
      {NAV_LINKS_PAGES.map((item, i) => (
        <Link
          key={i}
          className="font-bold whitespace-nowrap text-xl py-2 px-4 rounded transition ease-in delay-200 text-white hover:text-green-400"
          href={item.path}
        >
          {item.name}
        </Link>
      ))}
      <UserWidget />
    </div>
  </nav>
);

export default Navbar;
