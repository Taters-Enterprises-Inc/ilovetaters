import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  Divider,
  ButtonGroup,
  Button,
} from "@mui/material";
import { Column } from "features/shared/presentation/components/data-table";
import { StockOrderLogs } from "./stock-order-logs";
import { StockOrderingInformationModel } from "features/stock-ordering/core/domain/table-row.model";
import { StockOrderHandleQuantity } from "./stock-order-handle-quantity";
import { useEffect, useState } from "react";
import { OrderTableData } from "features/stock-ordering/core/domain/order-table-row.model";

interface StockOrderTableProps {
  isCommitedTextFieldAvailable: boolean;
  isDeliveredQtyAvailable: boolean;
  isDispatchedQtyAvailable: boolean;
  isStore: Boolean;
  isUpdateBilling: boolean;
  activeTab: Number | undefined;
  rowData: StockOrderingInformationModel;
  setRows: (rows: StockOrderingInformationModel) => void;
}

const columns: Array<Column> = [
  { id: "prodId", label: "Product Id" },
  { id: "prodName", label: "Product Name" },
  {
    id: "uom",
    label: "UOM",
  },
  { id: "orderQty", label: "Order Quantity" },
  { id: "commitedQuantity", label: "Commited Quantity" },
  { id: "deliveredQuantity", label: "Delivered Quantity" },
  { id: "total_cost", label: "Total Cost" },
];

export function StockOrderTable(props: StockOrderTableProps) {
  return (
    <div>
      <div className="border-2 border-black rounded-lg pb-1">
        <div className="block max-h-64 overflow-auto md:block">
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
            <TableBody>
              {props.rowData.product_data.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{
                    backgroundColor:
                      row.commitedQuantity !== row.deliveredQuantity &&
                      props.isUpdateBilling
                        ? "red"
                        : "",
                  }}
                >
                  <TableCell sx={{ width: 75 }}>{row.productId}</TableCell>
                  <TableCell>{row.productName}</TableCell>
                  <TableCell sx={{ width: 75 }}>{row.uom}</TableCell>
                  <TableCell sx={{ width: 75 }}>{row.orderQty}</TableCell>
                  <TableCell sx={{ width: 75 }}>
                    {props.isCommitedTextFieldAvailable ? (
                      <StockOrderHandleQuantity
                        rows={props.rowData.product_data}
                        setRows={(rows) =>
                          props.setRows({
                            product_data: rows,
                            order_information: props.rowData.order_information,
                          })
                        }
                        rowsIndex={index}
                        currentValue={row.commitedQuantity}
                        propertyKey={"commitedQuantity"}
                        precedingPropertyKey={"orderQty"}
                      />
                    ) : (
                      row.commitedQuantity ?? <div>--</div>
                    )}
                  </TableCell>

                  <TableCell sx={{ width: 75 }}>
                    {props.isDeliveredQtyAvailable ? (
                      <StockOrderHandleQuantity
                        rows={props.rowData.product_data}
                        setRows={(rows) =>
                          props.setRows({
                            product_data: rows,
                            order_information: props.rowData.order_information,
                          })
                        }
                        rowsIndex={index}
                        currentValue={row.deliveredQuantity}
                        propertyKey={"deliveredQuantity"}
                        precedingPropertyKey={"commitedQuantity"}
                      />
                    ) : (
                      row.deliveredQuantity ?? <div>--</div>
                    )}
                  </TableCell>
                  <TableCell>
                    {Number(row.total_cost).toLocaleString("en-US", {
                      maximumFractionDigits: 2,
                    }) ?? <div>--</div>}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <Divider />

        <StockOrderLogs order_details={props.rowData.order_information} />
      </div>
    </div>
  );
}
