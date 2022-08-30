import { REACT_APP_UPLOADS_URL } from "features/shared/constants";
import { FiMoreHorizontal } from "react-icons/fi";
import { Link } from "react-router-dom";

export function FooterNavDealPage() {
  return (
    <section className="fixed w-full bottom-0 ">
      <footer className="w-full py-2 lg:hidden bg-secondary">
        <nav className=" mx-auto">
          <ul className="flex text-white items-stretch h-full md:px-10">
            <li className="flex-1">
              <Link
                to="/"
                className="flex justify-between items-center flex-col h-full pt-1"
              >
                <img
                  src={REACT_APP_UPLOADS_URL + "images/icons/home.png"}
                  className="w-[28px] sm:w-[40px]"
                  alt="Tater home icon"
                ></img>
                <span className="text-[8px] sm:text-[14px]">Home</span>
              </Link>
            </li>
            <li className="flex-1">
              <Link
                to={"/popclub"}
                className="flex justify-between items-center flex-col h-full pt-1"
              >
                <img
                  src={REACT_APP_UPLOADS_URL + "images/icons/popclub.png"}
                  className="w-[20px] sm:w-[24px]"
                  alt="Tater home icon"
                ></img>
                <span className="text-[8px] sm:text-[14px]">Popclub</span>
              </Link>
            </li>
            <li className="flex-1">
              <Link
                to={"/shop"}
                className="flex justify-center items-center flex-col h-full pt-1"
              >
                <img
                  src={REACT_APP_UPLOADS_URL + "images/icons/snackshop.png"}
                  className="w-[24px] sm:w-[30px]"
                  alt="Tater home icon"
                ></img>
                <span className="text-[8px] sm:text-[14px] pt-[2px]">
                  Snackshop
                </span>
              </Link>
            </li>
            <li className="flex-1">
              <Link
                to={"/catering"}
                className="flex justify-center items-center flex-col h-full pt-1"
              >
                <img
                  src={REACT_APP_UPLOADS_URL + "images/icons/catering.png"}
                  className="w-[24px] sm:w-[30px]"
                  alt="Tater home icon"
                ></img>
                <span className="text-[8px] sm:text-[14px] pt-[2px]">
                  Catering
                </span>
              </Link>
            </li>
            <li className="flex-1">
              <Link
                to={"/branches"}
                className="flex justify-center items-center flex-col h-full pt-1"
              >
                <img
                  src={REACT_APP_UPLOADS_URL + "images/icons/branches.png"}
                  className="w-[18px] sm:w-[25px]"
                  alt="Tater home icon"
                ></img>
                <span className="text-[8px] sm:text-[14px] pt-[2px]">
                  Branches
                </span>
              </Link>
            </li>
            <li className="flex-[0.8]">
              <button className="flex justify-center items-center flex-col h-full pt-1 pr-2">
                <FiMoreHorizontal className="text-[25px] sm:text-4xl"></FiMoreHorizontal>
                <span className="text-[8px] sm:text-[14px] pt-[2px]">More</span>
              </button>
            </li>
          </ul>
        </nav>
      </footer>
    </section>
  );
}
