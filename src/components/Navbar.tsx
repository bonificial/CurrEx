import Logo from "../assets/images/logo.png";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

export default function CurrExNavbar() {
  const [navbar, setNavbar] = useState(false);
  return (
    <nav className="w-full bg-slate-800 shadow s"  >
      <div className="sticky top-0 justify-between px-4 mx-auto  container md:items-center md:flex md:px-8">
        <div>
          <div className="flex items-center justify-between py-3 md:py-5 md:block">
            <a href="javascript:void(0)">
              <img
                src={Logo}
                style={{ height: "40px" }}
                className={"   shadow rounded   align-middle border-none"}
              />
            </a>
            <div className="md:hidden">
              <button
                className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                onClick={() => setNavbar(!navbar)}
              >
                {navbar ? (
                    <FaTimes color={"white"} />
                ) : (
                    <FaBars color={"white"} />

                )}
              </button>
            </div>
          </div>
        </div>
        <div>
          <div
            className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
              navbar ? "block" : "hidden"
            }`}
          >
            <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
              <li className="text-white hover:text-indigo-200">
                <a href="#">EUR-USD</a>
              </li>
              <li className="text-white hover:text-indigo-200">
                <a href="#">EUR-GBP</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
