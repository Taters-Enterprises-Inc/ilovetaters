import React from "react";
import { MdOutlineGroupAdd } from "react-icons/md";

export function GrpBtn() {
  return (
    <div>
      <button className="inline-flex items-center px-8 tracking-wide py-1 mt-5 font-['Roboto'] ml-8 text-sm bg-paper rounded-md font-700 text-secondary hover:bg-gray-300">
        <MdOutlineGroupAdd size={20} className="text-button" />
        <span>&nbsp;&nbsp;Create a new group</span>
      </button>
    </div>
  );
}
