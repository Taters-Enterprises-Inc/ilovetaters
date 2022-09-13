import React from "react";
import { MdAddShoppingCart } from "react-icons/md";

export function CategoryBtn() {
  return (
    <div>
      <button className="inline-flex items-center px-4 tracking-wide py-1 mt-5 font-['Roboto'] ml-8 text-sm bg-white rounded-md font-700 text-secondary hover:bg-gray-300">
        <MdAddShoppingCart size={20} className="text-button" />
        <span>&nbsp;&nbsp;Add Category</span>
      </button>
    </div>
  );
}
