import { IoMdClose } from "react-icons/io";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useState, SyntheticEvent, ChangeEvent } from "react";
import { Autocomplete, Button, Table, TextField } from "@mui/material";
import { DataTable } from "features/shared/presentation/components";
import {
  Column,
  DataTableCell,
  DataTableRow,
} from "features/shared/presentation/components/data-table";
import { useNavigate } from "react-router-dom";
import { createQueryParams } from "features/config/helpers";
import { useAppDispatch, useQuery } from "features/config/hooks";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

export function StockOrderViewContent() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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
    { id: "cost", label: "Cost  " },
    { id: "orderQty", label: "Order Qty  " },
    { id: "currStock", label: "Current Stocks" },
    { id: "commitedQty", label: "Commited Quantity" },
    { id: "delivQty", label: "Delivery Quantity" },
  ];

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
  };

  return (
    <div className="p-10">
      <DataTable
        order={order === "asc" ? "asc" : "desc"}
        orderBy={orderBy ?? "id"}
        emptyMessage="No Orders yet."
        search={search ?? ""}
        onSearch={(val) => {
          const params = {
            page_no: null,
            per_page: perPage,
            order_by: orderBy,
            order: order,
            search: val === "" ? null : val,
          };

          const queryParams = createQueryParams(params);

          navigate({
            pathname: "",
            search: queryParams,
          });
        }}
        onRequestSort={(column_selected) => {
          if (column_selected === "name") {
            const isAsc = orderBy === column_selected && order === "asc";

            const params = {
              page_no: pageNo,
              per_page: perPage,
              order_by: column_selected,
              order: isAsc ? "desc" : "asc",
              search: search,
            };

            const queryParams = createQueryParams(params);

            // dispatch(resetGetAuditSettingQuestionsStatus());
            navigate({
              pathname: "",
              search: queryParams,
            });
          }
        }}
        columns={columns}
        onRowsPerPageChange={(event) => {
          if (perPage !== event.target.value) {
            const params = {
              page_no: pageNo,
              per_page: event.target.value,
              order_by: orderBy,
              order: order,
              search: search,
            };

            const queryParams = createQueryParams(params);

            // dispatch(resetGetAuditSettingQuestionsStatus());
            navigate({
              pathname: "",
              search: queryParams,
            });
          }
        }}
        onPageChange={(event, newPage) => {
          const pageNoInt = pageNo ? parseInt(pageNo) : null;
          if (newPage !== pageNoInt) {
            const params = {
              page_no: newPage,
              per_page: perPage,
              order_by: orderBy,
              order: order,
              search: search,
            };

            const queryParams = createQueryParams(params);

            // dispatch(resetGetAuditSettingQuestionsStatus());
            navigate({
              pathname: "",
              search: queryParams,
            });
          }
        }}
        totalRows={25} //To be updated
        perPage={5} //To be updated
        page={pageNo ? parseInt(pageNo) : 1}
      >
        <DataTableRow>
          <DataTableCell>Data Placeholder</DataTableCell>
          <DataTableCell>Data Placeholder</DataTableCell>
          <DataTableCell>Data Placeholder</DataTableCell>
          <DataTableCell>Data Placeholder</DataTableCell>
          <DataTableCell>Data Placeholder</DataTableCell>
          <DataTableCell>Data Placeholder</DataTableCell>
          <DataTableCell>Data Placeholder</DataTableCell>
          <DataTableCell>Data Placeholder</DataTableCell>
        </DataTableRow>
      </DataTable>
    </div>
  );
}
