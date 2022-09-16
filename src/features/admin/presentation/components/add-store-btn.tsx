import React from "react";
import { MdAddBusiness } from "react-icons/md";

export function StoreBtn() {
  return (
    <div>
      <button
        className="inline-flex items-center px-4 tracking-wide py-1 mt-5 font-['Roboto'] 
      ml-8 text-sm bg-paper rounded-md font-700 text-secondary hover:bg-gray-300"
      >
        <MdAddBusiness size={20} className="text-button" />
        <span>&nbsp;&nbsp;Add Store</span>
      </button>
    </div>
  );
}
