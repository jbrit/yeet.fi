import Link from "next/link";
import { useState } from "react";

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Larger screens */}
      <nav className="hidden md:flex justify-between items-center p-4 bg-background text-foreground border rounded-lg gap-6">
        <Link href="/">
          <div className="font-bold text-stone-400">
            YEET{" "}
            <span className="font-light text-stone-100 italic">finance</span>
          </div>
        </Link>

        <div className="flex justify-between items-center gap-6">
          <Link className="hover:text-stone-400" href="/launch">
            launch
          </Link>
          <Link href="/faucet">faucet</Link>
        </div>
      </nav>

      {/* Mobile. Should be a hamburger menu */}
      <nav className="flex flex-col md:hidden p-4 bg-white text-black border rounded-lg items-center gap-4">
        <div className="w-full flex justify-between items-center gap-2">
          <Link href="/">
            <div className="font-bold text-stone-700">
              YEET{" "}
              <span className="font-light text-stone-400 italic">finance</span>
            </div>
          </Link>
          <img
            src={isMobileMenuOpen ? "/close.svg" : "/hamburger.svg"}
            alt="menu"
            className="w-8 h-8 ml-auto cursor-pointer"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />
        </div>

        {isMobileMenuOpen && (
          <>
            <Link className="hover:text-stone-400" href="/launch">
              launch
            </Link>
            <Link href="/faucet">faucet</Link>
          </>
        )}
      </nav>
    </>
  );
};
