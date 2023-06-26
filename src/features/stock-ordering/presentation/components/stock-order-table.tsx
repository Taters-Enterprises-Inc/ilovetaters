import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Autocomplete,
  TextField,
  Button,
  Divider,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Column } from "features/shared/presentation/components/data-table";
import { useState } from "react";
import dayjs from "dayjs";
import { StockOrderLogs } from "./stock-order-logs";

interface TableRow {
  id: number;
  productId: string;
  productName: string;
  uom: string;
  cost: string;
  orderQty: string;
  currentStock: string;
  commitedQuantity: string;
  deliveredQuantity: string;
}

interface StockOrderTableProps {
  isCommitedTextFieldAvailable: boolean;
  isDeliveredQtyAvailable: boolean;
  isStore: Boolean;
  activeTab: Number | undefined;
  rowData: TableRow[];
  setRows: ((rows: TableRow[]) => void) | undefined;
}

export function StockOrderTable(props: StockOrderTableProps) {
  let columns: Array<Column> = [
    { id: "prodId", label: "Product Id" },
    { id: "prodName", label: "Product Name" },
    {
      id: "uom",
      label: "UOM",
    },
    { id: "cost", label: "Cost  " },
    { id: "orderQty", label: "Order Qty  " },
    { id: "currentStock", label: "Current Stock" },
    { id: "commitedQuantity", label: "Commited Quantity" },
    { id: "deliveredQuantity", label: "Delivered Quantity" },
  ];

  return (
    <div>
      <div className="border-2 border-black rounded-lg pb-1">
        <Table>
          <TableHead className="bg-black">
            <TableRow>
              {columns.map((row, index) => (
                <TableCell key={index}>
                  <span className="text-white">{row.label}</span>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          {props.rowData.map((row) => (
            <TableBody key={row.id}>
              <TableRow>
                <TableCell>{row.productId}</TableCell>
                <TableCell>{row.productName}</TableCell>
                <TableCell>{row.uom}</TableCell>
                <TableCell>{row.cost}</TableCell>
                <TableCell>{row.orderQty}</TableCell>
                <TableCell>{row.currentStock}</TableCell>
                <TableCell>
                  {props.isCommitedTextFieldAvailable ? (
                    <TextField
                      value={row.commitedQuantity}
                      onChange={(event) => {
                        const updatedRows = props.rowData.map((r) => {
                          if (r.id === row.id) {
                            return {
                              ...r,
                              commitedQuantity: event.target.value ?? "",
                            };
                          }
                          return r;
                        });
                        props.setRows?.(updatedRows);
                      }}
                      size="small"
                      variant="outlined"
                    />
                  ) : (
                    row.commitedQuantity
                  )}
                </TableCell>
                <TableCell>
                  {props.isDeliveredQtyAvailable ? (
                    <TextField
                      value={row.deliveredQuantity}
                      onChange={(event) => {
                        const updatedRows = props.rowData.map((r) => {
                          if (r.id === row.id) {
                            return {
                              ...r,
                              deliveredQuantity: event.target.value ?? "",
                            };
                          }
                          return r;
                        });
                        props.setRows?.(updatedRows);
                      }}
                      size="small"
                      variant="outlined"
                    />
                  ) : (
                    row.deliveredQuantity
                  )}
                </TableCell>
              </TableRow>
            </TableBody>
          ))}
        </Table>

        <Divider />

        <StockOrderLogs />
      </div>
    </div>
  );
}
