import React, { useState } from "react";
import { Sidebar } from "../components/sidebar";

export function Admin() {
  return (
    <div className="flex ">
      <div className="overflow-y-auto">
        <Sidebar />
      </div>
      <div className="flex-1 min-h-screen p-2 overflow-y-hidden text-white bg-secondary">
        <h1>Orders</h1>
      </div>
    </div>
  );
}
