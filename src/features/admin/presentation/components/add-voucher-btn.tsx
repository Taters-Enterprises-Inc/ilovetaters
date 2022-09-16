import React from "react";
import { FaTicketAlt } from "react-icons/fa";

export function VoucherBtn() {
  return (
    <div>
      <button
        className="inline-flex items-center px-4 tracking-wide py-1 mt-5 
      font-['Roboto'] ml-8 text-sm bg-paper rounded-md font-700 text-secondary hover:bg-gray-300"
      >
        <FaTicketAlt size={20} className="text-button" />
        <span>&nbsp;&nbsp;Add Voucher</span>
      </button>
    </div>
  );
}
