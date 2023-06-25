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
  isSupplier: boolean;
  isStore: Boolean;
}

export function StockOrderTable(props: StockOrderTableProps) {
  const [commitedDeliveryDate, setCommitedDeliveryDate] = useState("");
  const [isDisabled, setDisabled] = useState(false);
  const [deliveryDate, setDeliveryData] = useState(
    dayjs().format("YYYY-MM-DD HH:mm:ss")
  );

  const [rows, setRows] = useState<TableRow[]>([
    {
      id: 1,
      productId: "-",
      productName: "-",
      uom: "-",
      cost: "-",
      orderQty: "-",
      currentStock: "-",
      commitedQuantity: "0",
      deliveredQuantity: "-",
    },
  ]);

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

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    console.log();
  };

  return (
    <div>
      <div className="border-2 border-black rounded-lg pb-1">
        <form onSubmit={handleSubmit}>
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
            {rows.map((row) => (
              <TableBody key={row.id}>
                <TableRow>
                  <TableCell>{row.productId}</TableCell>
                  <TableCell>{row.productName}</TableCell>
                  <TableCell>{row.uom}</TableCell>
                  <TableCell>{row.cost}</TableCell>
                  <TableCell>{row.orderQty}</TableCell>
                  <TableCell>{row.currentStock}</TableCell>
                  <TableCell>
                    {props.isSupplier ? (
                      <TextField
                        value={row.commitedQuantity}
                        onChange={(event) => {
                          const updatedRows = rows.map((r) => {
                            if (r.id === row.id) {
                              return {
                                ...r,
                                commitedQuantity: event.target.value,
                              };
                            }
                            return r;
                          });
                          setRows(updatedRows);
                        }}
                        size="small"
                        variant="outlined"
                      />
                    ) : (
                      row.commitedQuantity
                    )}
                  </TableCell>
                  <TableCell>{row.deliveredQuantity}</TableCell>
                </TableRow>
              </TableBody>
            ))}
          </Table>
          <div className="p-4 space-y-2">
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
            {props.isSupplier ? (
              <>
                <Divider />
                <div className="flex pt-5 px-12">
                  <div className="flex items-stretch basis-9/12 space-x-2 px-5">
                    <span className="flex self-center font-semibold">
                      Commited Delivery:
                    </span>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="Commited Delivery"
                        views={["month", "day", "year"]}
                        onError={() => setDisabled(true)}
                        onAccept={(value) => {
                          if (dayjs(value)) {
                            setDisabled(false);
                          }
                        }}
                        onChange={(date) => {
                          if (date) {
                            const formattedDate = dayjs(date).format(
                              "YYYY-MM-DD 00:00:00"
                            );

                            setDeliveryData(formattedDate);
                          }
                        }}
                        value={dayjs(deliveryDate)}
                        renderInput={(params) => (
                          <TextField required {...params} size="small" />
                        )}
                      />
                    </LocalizationProvider>
                  </div>
                  <div className="basis-3/12">
                    <Button type="submit" variant="contained">
                      Confirm
                    </Button>
                  </div>
                </div>
              </>
            ) : null}
          </div>
        </form>
      </div>
    </div>
  );
}
