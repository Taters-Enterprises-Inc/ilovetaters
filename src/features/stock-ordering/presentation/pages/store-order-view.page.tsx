import { useNavigate } from "react-router-dom";
import { StockOrderHead } from "../components";
import { useAppDispatch, useQuery } from "features/config/hooks";
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
      store_name: "",
      order_number: "",
      requested_delivery_date: "",
      commited_delivery_date: "",
      order_reviewed_date: "",
      order_confirmation_date: "",
      view_delivery_receipt: "",
      dispatch_date: "",
      order_enroute: "",
      actual_delivery_date: "",
      view_updated_delivery_receipt: "",
      billing_information_ready: false,
      view_payment_details: "",
      payment_confirmation: "",
      transport_route: "",
    },
    product_data: [],
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

        {/* <div className="pb-1">
          <StockOrderTable
            isCommitedTextFieldAvailable={false}
            isStore={true}
            activeTab={undefined}
            setRows={undefined}
            rowData={rows}
            isDeliveredQtyAvailable={false}
          />
        </div> */}
      </div>
    </>
  );
}
