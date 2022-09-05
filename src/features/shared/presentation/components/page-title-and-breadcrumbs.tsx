import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface PageTitleAndBreadCrumbsProps {
  title: string | undefined;
  pageTitles: Array<{
    name?: string;
    url?: string;
  }>;
  children?: ReactNode;
  home: {
    title: string;
    url: string;
  };
}

export function PageTitleAndBreadCrumbs(props: PageTitleAndBreadCrumbsProps) {
  return (
    <div className="bg-secondary lg:h-[200px] text-white pt-4">
      <div className="container flex flex-col items-center justify-between py-6 space-y-4 lg:flex-row bg-secondary lg:space-y-0">
        <h1 className="text-white font-['Bebas_Neue'] tracking-[3px] text-2xl leading-6 text-center">
          {props.title}
        </h1>

        <nav className="flex" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li>
              <Link
                to={props.home.url}
                className="inline-flex items-center text-xs font-medium text-gray-400 lg:text-sm"
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
            </li>

            {props.pageTitles.map((title, i) => (
              <li key={i}>
                <div className="flex items-center">
                  <svg
                    className="w-6 h-6 text-white"
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
                        ? "text-gray-400"
                        : "text-white"
                    } ml-1 text-xs lg:text-sm font-medium md:ml-2 whitespace-nowrap overflow-hidden lg:max-w-full max-w-[80px] text-ellipsis`}
                  >
                    {title.name}
                  </Link>
                </div>
              </li>
            ))}
          </ol>
        </nav>
      </div>

      {props.children}
    </div>
  );
}
