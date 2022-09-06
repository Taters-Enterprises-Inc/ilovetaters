import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { useEffect } from "react";
// import { ShopProfileContainer } from "../components/shop-profile-container";
import {
  Column,
  DataTable,
} from "../../../shared/presentation/components/data-table";
import Moment from "react-moment";
import NumberFormat from "react-number-format";
import { SnackShopOrderModel } from "features/shop/core/domain/snackshop-order.model";

const columns: Array<Column> = [
  { id: "status", label: "Status" },
  { id: "date", label: "Order Date" },
  { id: "tracker", label: "Tracking No." },
  { id: "name", label: "Client Name" },
  { id: "amount", label: "Amount" },
];

export function AdminOrders() {
  const dispatch = useAppDispatch();

  return <div></div>;
}
