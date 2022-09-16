import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import { AdminOrderModalContainer } from "../components/admin-order-modal-container";
import "./modal.css";

export function AdminOrderModal() {
  const [modal, setModal] = useState(false);

  return (
    <>
      <div className="">
        <div className="overlay"></div>
        <div className=" modal-content">
          <div className="flex justify-between p-3 h-14 bg-secondary">
            <h1 className='font-["Bebas_Neue"]  tracking-wide text-3xl text-white'>
              Order Summary
            </h1>
            <MdClose size={20} />
          </div>

          <div className="min-h-screen">
            <AdminOrderModalContainer activeTab="customerInfo" />
          </div>
        </div>
      </div>
    </>
  );
}
