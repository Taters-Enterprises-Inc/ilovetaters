import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface PageTitleProps {
  home: {
    title: string;
    url: string;
  };
}

export function PageTitle(props: PageTitleProps) {
  return (
    <div className="text-secondary">
      <div className="container flex flex-col items-center justify-between lg:flex-row lg:space-y-0">
        <h1 className="text-secondary font-['Bebas_Neue'] tracking-[3px] text-2xl leading-6 text-center"></h1>

        <nav className="flex" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li>
              <Link
                to={props.home.url}
                className="inline-flex items-center text-xs font-medium text-secondary lg:text-sm"
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
          </ol>
        </nav>
      </div>
    </div>
  );
}
