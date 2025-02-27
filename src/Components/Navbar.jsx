import SwitchTheme from "./SwitchThemeBtn";
import SwitchThemeMobile from "./SwitchThemeBtnMobile.jsx";
import { useState } from "react";
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const closeNav = () => {
    setIsOpen(false);
  };

  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-gray-900 border-b">
        <div className="max-w-(--breakpoint-xl) flex flex-wrap items-center justify-between mx-auto p-4">
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Alireza</span>
          <button onClick={toggleMenu} className="text-black dark:text-white inline-block md:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
          <SwitchTheme />
        </div>
      </nav>
      {/* Nav Mobile */}
      <nav className={`${isOpen ? "left-0" : "-left-[274px]"} z-30 md:hidden transition-all fixed top-0 h-screen w-[180px] bg-slate-950`}>
        <div onClick={closeNav} className="flex items-center justify-end mt-6 mr-3 cursor-pointer">
          <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-red-600">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </div>
        <div className="flex justify-center mt-8">
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">Alireza</span>
        </div>
        <div className="mt-6">
          <SwitchThemeMobile />
        </div>
      </nav>
      <div onClick={closeNav} className={`${isOpen ? "block" : "hidden"} fixed top-0 left-0 bottom-0 right-0 bg-black/40 z-20`}></div>
    </>
  );
}

export default Navbar;
