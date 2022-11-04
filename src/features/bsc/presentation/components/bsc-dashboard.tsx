import React from "react";
import { Link } from "react-router-dom";
import { RiSurveyLine } from "react-icons/ri";

export function Dashboard() {
  return (
    <div className="px-4 flex flex-col lg:flex-row lg:items-end">
      <span className="text-secondary text-3xl font-['Bebas_Neue'] flex-1">
        DASHBOARD
      </span>
      <div className="flex flex-col space-y-1 lg:flex-row lg:space-x-4 lg:space-y-0">
        <div>
          <Link
            to="form"
            className="inline-flex items-center px-4 tracking-wide py-1  bg-button font-['Varela_Round'] text-white text-xs rounded-md font-700"
          >
            <RiSurveyLine size={20} />
            <span>&nbsp;&nbsp;Go to form</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
