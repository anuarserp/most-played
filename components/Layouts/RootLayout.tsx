import { ReactNode } from "react";
import Navbar from "../Landing/Navbar";

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default RootLayout;
