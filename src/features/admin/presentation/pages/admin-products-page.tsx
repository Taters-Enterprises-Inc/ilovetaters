import React, { useState } from "react";
import Sidebar from "../components/sidebar";
import { Head } from "../components/head";
import { AdminProducts } from "../tables/admin-products-table";
import { AddBtn } from "../components/addproductbtn";

export function Products() {
  return (
    // dont change code here
    <div className="flex min-h-screen ">
      <div>
        <Sidebar />
      </div>
      <div className="flex-1 min-h-screen p-2 overflow-y-hidden text-white bg-secondary">
        <Head />

        {/* change page info here */}
        <div className="relative flex">
          <h1 className="font-['Bebas_Neue'] text-3xl ml-4 mt-5">Products</h1>
          <AddBtn />
        </div>
        <div className="font-['Bebas_Neue'] text-3xl ml-4 mr-4 mt-4">
          <AdminProducts />
        </div>
      </div>
    </div>
  );
}
