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
import { TableRow as OrderTableData } from "features/stock-ordering/core/domain/table-row.model";

export function StoreOrderViewPage() {
  let columns = [
    { id: "store_name", label: "Store", isButton: false },
    { id: "order_number", label: "Order Number", isButton: false },
    {
      id: "requested_delivery_date",
      label: "Requested Delivery Date",
      isButton: false,
    },
    {
      id: "commited_delivery_date",
      label: "Commited Delivery Date",
      isButton: false,
    },
    {
      id: "order_reviewed_date",
      label: "Order Reviewed Date",
      isButton: false,
    },
    {
      id: "order_confirmation_date",
      label: "Order Confirmation Date",
      isButton: false,
    },
    {
      id: "view_delivery_receipt",
      label: "View Delivery Receipt",
      isButton: true,
    },
    { id: "dispatch_date", label: "Dispatch Date", isButton: false },
    { id: "order_enroute", label: "Order Enroute", isButton: false },
    {
      id: "actual_delivery_date",
      label: "Actual Delivery Date",
      isButton: false,
    },
    {
      id: "view_updated_delivery_receipt",
      label: "View Updated Delivery Receipt",
      isButton: true,
    },
    {
      id: "billing_information_ready",
      label: "Billing Information Ready",
      isButton: false,
    },
    {
      id: "view_payment_details",
      label: "View Payment Details",
      isButton: true,
    },
    {
      id: "payment_confirmation",
      label: "payment Confirmation",
      isButton: false,
    },
  ];

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

  const [rows, setRows] = useState<OrderTableData>({
    order_information: {
      store_name: "Taters Acacia Estate",
      order_number: "1",
      requested_delivery_date: "June 28, 2023",
      commited_delivery_date: "July 28, 2023",
      order_reviewed_date: "June 28, 2023",
      order_confirmation_date: "June 28, 2023",
      view_delivery_receipt: "image.jpg",
      dispatch_date: "July 10, 2023",
      order_enroute: "July 10, 2023",
      actual_delivery_date: "July 20, 2023",
      view_updated_delivery_receipt: "image.jpg",
      billing_information_ready: "",
      view_payment_details: "image.jpg",
      payment_confirmation: "July 20, 2023",
    },
    product_data: [
      {
        id: "1",
        productId: "1",
        productName: "Product 1",
        uom: "PACK",
        cost: "100",
        orderQty: "50",
        currentStock: "10000",
        commitedQuantity: "100",
        deliveredQuantity: "50",
      },
      {
        id: "2",
        productId: "2",
        productName: "Product 2",
        uom: "BAGS",
        cost: "50",
        orderQty: "25",
        currentStock: "500",
        commitedQuantity: "20",
        deliveredQuantity: "5",
      },
      {
        id: "3",
        productId: "3",
        productName: "Product 3",
        uom: "BAGS",
        cost: "50",
        orderQty: "25",
        currentStock: "500",
        commitedQuantity: "20",
        deliveredQuantity: "5",
      },
    ],
  });

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
          <StockOrderTable
            isCommitedTextFieldAvailable={false}
            isStore={true}
            activeTab={undefined}
            setRows={undefined}
            rowData={rows}
            isDeliveredQtyAvailable={false}
          />
        </div>
      </div>
    </>
  );
}
