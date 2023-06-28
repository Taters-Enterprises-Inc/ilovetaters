import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  Divider,
} from "@mui/material";
import { Column } from "features/shared/presentation/components/data-table";
import { StockOrderLogs } from "./stock-order-logs";

interface TableRow {
  order_information: {
    store_name: string;
    order_number: string;
    requested_delivery_date: string;
    commited_delivery_date: string;
    order_reviewed_date: string;
    order_confirmation_date: string;
    view_delivery_receipt: string;
    dispatch_date: string;
    order_enroute: string;
    actual_delivery_date: string;
    view_updated_delivery_receipt: string;
    billing_information_ready: string;
    view_payment_details: string;
    payment_confirmation: string;
  };
  product_data: {
    id: string;
    productId: string;
    productName: string;
    uom: string;
    cost: string;
    orderQty: string;
    currentStock: string;
    commitedQuantity: string;
    deliveredQuantity: string;
  }[];
}

interface StockOrderTableProps {
  isCommitedTextFieldAvailable: boolean;
  isDeliveredQtyAvailable: boolean;
  isStore: Boolean;
  activeTab: Number | undefined;
  rowData: TableRow;
  setRows: ((rows: TableRow) => void) | undefined;
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
            {props.rowData.product_data.map((row) => (
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
                          const updatedRows = props.rowData.product_data.map(
                            (r) => {
                              if (r.id === row.id) {
                                return {
                                  ...r,
                                  commitedQuantity: event.target.value ?? "",
                                };
                              }
                              return r;
                            }
                          );

                          props.setRows?.({
                            ...props.rowData,
                            product_data: updatedRows,
                          });
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
                        required
                        value={row.deliveredQuantity}
                        onChange={(event) => {
                          const updatedRows = props.rowData.product_data.map(
                            (r) => {
                              if (r.id === row.id) {
                                return {
                                  ...r,
                                  deliveredQuantity: event.target.value ?? "",
                                };
                              }
                              return r;
                            }
                          );
                          props.setRows?.({
                            ...props.rowData,
                            product_data: updatedRows,
                          });
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
        </div>

        <Divider />

        <StockOrderLogs order_details={props.rowData.order_information} />
      </div>
    </div>
  );
}
