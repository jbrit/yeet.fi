import { Toaster } from "react-hot-toast";
import React, { ReactNode } from "react";
import { Navbar } from "./navbar";

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <>
      <Toaster />
      <div className="flex flex-col px-4 lg:px-12 bg-white text-black">
        <div className="min-h-screen py-4 flex flex-col gap-6">
          <Navbar />
          <div className="">{children}</div>
          <footer className="mt-auto flex justify-between items-center">
            <p>&copy; yeet finance 2024</p>
            <a
              href="https://x.com/jibolaojo"
              target="_blank"
              className="no-underline hover:text-stone-400 hover:underline"
            >
              Twitter
            </a>
          </footer>
        </div>
      </div>
    </>
  );
};

export default Layout;
