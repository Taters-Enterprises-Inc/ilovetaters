import { useNavigate } from "react-router-dom";
import { StockOrderHead, StockOrderTable } from "../components";
import { Column } from "features/shared/presentation/components/data-table";
import { useAppDispatch, useQuery } from "features/config/hooks";
import {
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
} from "@mui/material";
import { useState } from "react";
import dayjs from "dayjs";

export function StoreOrderViewPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [selectedStore, setSelectedStore] = useState("");
  const [isDisabled, setDisabled] = useState(false);
  const [deliveryDate, setDeliveryData] = useState(
    dayjs().format("YYYY-MM-DD HH:mm:ss")
  );

  const query = useQuery();
  const pageNo = query.get("page_no");
  const perPage = query.get("per_page");
  const orderBy = query.get("order_by");
  const order = query.get("order");
  const search = query.get("search");
  const status = query.get("status");

  let columns: Array<Column> = [
    { id: "prodId", label: "Product Id" },
    { id: "prodName", label: "Product Name" },
    {
      id: "uom",
      label: "UOM",
    },
    { id: "cost", label: "Cost" },
    { id: "orderQty", label: "Order Qty" },
    { id: "currentStock", label: "Current Stock" },

    { id: "commitedStock", label: "Commited Stock" },

    { id: "deliveredQuantity", label: "Delivered Quantity" },
  ];

  return (
    <>
      <StockOrderHead
        StockOrderBreadCrumbsProps={{
          home: {
            title: "Home",
            url: "/stock-order/dashboard",
          },
          className: "lg:h-[200px]",
          pageTitles: [
            { name: "Orders", url: "/stock-order/order" },
            { name: "Store", url: "/stock-order/order/store/view" },
            { name: "View", url: "/stock-order/order/store/view" },
          ],
        }}
      />

      <div className="px-5 space-y-5">
        <div className="">
          <span className="text-secondary text-3xl font-['Bebas_Neue'] flex-1">
            Store Order View
          </span>
        </div>

        <div className="pb-1">
          <StockOrderTable isSupplier={false} isStore={true} />

          {/* <Table>
            <TableHead className="bg-black">
              <TableRow>
                {columns.map((row, index) => (
                  <TableCell key={index}>
                    <span className="text-white">{row.label}</span>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Data Placeholder</TableCell>
                <TableCell>Data Placeholder</TableCell>
                <TableCell>Data Placeholder</TableCell>
                <TableCell>Data Placeholder</TableCell>
                <TableCell>Data Placeholder</TableCell>
                <TableCell>-</TableCell>
                <TableCell>-</TableCell>
                <TableCell>-</TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <div className="p-4">
            <div className="flex justify-between  px-12">
              <div>
                <span className="font-semibold">Order Number: </span>
                <span>0</span>
              </div>
              <div>
                <span className="font-semibold">Store Name: </span>
                <span>Test Store Name</span>
              </div>
              <div>
                <span className="font-semibold">Requested Delivery Date: </span>
                <span>TestDate 1, 2023</span>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
}
