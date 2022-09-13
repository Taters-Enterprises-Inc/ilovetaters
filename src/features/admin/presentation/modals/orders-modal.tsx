import React, { useState } from "react";
import "./modal.css";

export function OrderModal() {
  const [modal, setModal] = useState(false);

  return (
    <>
      <div className="">
        <div className="overlay"></div>
        <div className="modal-content bg-secondary">
          <h1 className="font-['Bebas Neue'] text-white">Order Summary</h1>
        </div>
        <div className="bg-white"></div>
      </div>
    </>
  );
}
