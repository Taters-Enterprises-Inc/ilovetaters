import { useAppDispatch } from "features/config/hooks";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import { openSalesSideBar } from "../slices/sales-sidebar.slice";

export interface SalesBreadCrumbsProps {
  className?: string;
  pageTitles: Array<{
    name?: string;
    url?: string;
  }>;
  home: {
    title: string;
    url: string;
  };
}

export function SalesBreadCrumbs(props: SalesBreadCrumbsProps) {
  const dispatch = useAppDispatch();

  return (
    <div className="flex items-center justify-center">
      <button
        className="pr-3 lg:hidden"
        onClick={() => dispatch(openSalesSideBar())}
      >
        <FaBars />
      </button>
      <nav className="flex" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li>
                <div className="flex items-center ">
                  <Link
                    to={props.home.url}
                    className="inline-flex items-center text-xs font-medium text-secondary lg:text-sm font-['Varela_Round']"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                    </svg>
                    {props.home.title}
                  </Link>
                </div>
              </li>
              {props.pageTitles.map((title, i) => (
                <li key={i}>
                  <div className="flex items-center">
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <Link
                      to={title.url ? title.url : ""}
                      className={`${
                        i !== props.pageTitles.length - 1
                          ? "text-gray-600"
                          : "text-secondary"
                      }  ml-1 text-xs lg:text-sm font-medium md:ml-2 whitespace-nowrap overflow-hidden lg:max-w-full max-w-[80px] text-ellipsis font-['Varela_Round']`}
                    >
                      {title.name}
                    </Link>
                  </div>
                </li>
              ))}
            </ol>
          </nav>
        </ol>
      </nav>
    </div>
  );
}
