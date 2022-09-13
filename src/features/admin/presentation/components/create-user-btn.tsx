import React from "react";
import { MdOutlinePersonAddAlt1 } from "react-icons/md";

export function UserBtn() {
  return (
    <div>
      <button className="inline-flex items-center px-8 tracking-wide py-1 mt-5 font-['Roboto'] ml-8 text-sm bg-white rounded-md font-700 text-secondary hover:bg-gray-300">
        <MdOutlinePersonAddAlt1 size={20} className="text-button" />
        <span>&nbsp;&nbsp;Create a new user</span>
      </button>
    </div>
  );
}
