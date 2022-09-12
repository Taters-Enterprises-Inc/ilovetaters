import React, { useState } from "react";
import Sidebar from "../components/sidebar";
import { Head } from "../components/head";

export function Faqs() {
  return (
    // dont change code here
    <div className="flex min-h-screen ">
      <div>
        <Sidebar />
      </div>
      <div className="flex-1 min-h-screen p-2 overflow-y-hidden text-white bg-secondary">
        <Head />

        {/* change page info here */}

        <h1 className="font-['Bebas_Neue'] text-3xl ml-4 mt-5">FAQ'S</h1>

        {/* for table */}
        <div className="font-['Bebas_Neue'] text-3xl ml-4 mr-4 mt-4"></div>
      </div>
    </div>
  );
}
