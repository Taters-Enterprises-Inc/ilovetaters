import React from "react";
import { GrTicket } from "react-icons/gr";

export function VoucherBtn() {
  return (
    <div>
      <button className="inline-flex items-center px-4 tracking-wide py-1 mt-5 font-['Roboto'] ml-8 text-sm bg-white rounded-md font-700 text-secondary hover:bg-gray-300">
        <GrTicket size={20} className="text-button" />
        <span>&nbsp;&nbsp;Add Voucher</span>
      </button>
    </div>
  );
}
