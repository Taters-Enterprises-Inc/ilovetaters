import { useNavigate } from "react-router-dom";
import { OrderContents } from "../components/order-contents";
import { StockOrderHead } from "../components";
import React, { useState } from "react";
import { Tab, Tabs } from "@mui/material";

export function StockOrderOrders() {
  return (
    <>
      <StockOrderHead
        StockOrderBreadCrumbsProps={{
          home: {
            title: "Home",
            url: "/admin/stock-order/dashboard",
          },
          className: "lg:h-[200px]",
          pageTitles: [{ name: "Orders", url: "/admin/stock-order/order" }],
        }}
      />
      <div className="p-8">
        <OrderContents />
      </div>
    </>
  );
}
