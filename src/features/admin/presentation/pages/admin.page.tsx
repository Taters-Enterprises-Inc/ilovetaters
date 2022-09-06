import React, { useState } from "react";
import Sidebar from "../components/sidebar";
import { Head } from "../components/head";
import { ExtractBtn } from "../components/extractbtn";
import { AdminOrders } from "../components/tables/admin-orders-table";

export function Admin() {
  return (
    // dont change code here
    <div className="flex ">
      <div>
        <Sidebar />
      </div>
      <div className="flex-1 min-h-screen p-2 overflow-y-hidden text-white bg-secondary">
        <Head />

        {/* change page info here */}
        <div className="relative flex">
          <h1 className="font-['Bebas_Neue'] text-3xl ml-4 mt-5">Orders</h1>
          <ExtractBtn></ExtractBtn>
          <AdminOrders></AdminOrders>
        </div>
      </div>
    </div>
  );
}
