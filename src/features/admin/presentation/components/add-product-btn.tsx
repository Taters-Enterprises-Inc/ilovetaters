import React from "react";
import { MdAddShoppingCart } from "react-icons/md";

export function AddBtn() {
  return (
    <div>
      <button className="inline-flex items-center tracking-wide px-4 py-1 mt-5 font-['Roboto'] ml-8 text-sm bg-paper rounded-md font-700 text-secondary hover:bg-gray-300">
        <MdAddShoppingCart size={20} className="text-button" />
        <span>&nbsp;&nbsp;Add Product</span>
      </button>
    </div>
  );
}
