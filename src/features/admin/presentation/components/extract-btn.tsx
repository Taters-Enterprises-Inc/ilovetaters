import React from "react";
import { RiFileExcel2Line } from "react-icons/ri";

export function ExtractBtn() {
  return (
    <div>
      <button className="inline-flex items-center px-2 tracking-wide py-1 mt-5 font-['Roboto']  text-sm bg-paper rounded-md font-700 text-secondary hover:bg-gray-300">
        <RiFileExcel2Line size={20} className="text-green-600" />
        <span>&nbsp;&nbsp;Extract Data</span>
      </button>
    </div>
  );
}
