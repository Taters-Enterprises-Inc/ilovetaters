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

interface StockOrderTableProps {
  isCommitedTextFieldAvailable: boolean;
  isDeliveredQtyAvailable: boolean;
  isDispatchedQtyAvailable: boolean;
  isStore: Boolean;
  isUpdateBilling: boolean;
  activeTab: Number | undefined;
  rowData: StockOrderingInformationModel;
  setRows: ((rows: StockOrderingInformationModel) => void) | undefined;
}

export function StockOrderTable(props: StockOrderTableProps) {
  let columns: Array<Column> = [
    { id: "prodId", label: "Product Id" },
    { id: "prodName", label: "Product Name" },
    {
      id: "uom",
      label: "UOM",
    },
    { id: "orderQty", label: "Order Quantity" },
    { id: "commitedQuantity", label: "Commited Quantity" },
    // { id: "dispatchedQuantity", label: "Dispatched Quantity" },
    { id: "deliveredQuantity", label: "Delivered Quantity" },
    { id: "total_cost", label: "Total Cost" },
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
                      <div className="flex flex-row">
                        <ButtonGroup
                          disableElevation
                          size="small"
                          variant="contained"
                          aria-label="outlined primary button group"
                        >
                          <Button
                            onClick={() => {
                              const updatedRows =
                                props.rowData.product_data.map((r) => {
                                  if (r.id === row.id) {
                                    const val = Number(r.commitedQuantity) - 1;
                                    const commitedQuantity = val >= 0 ? val : 0;
                                    return {
                                      ...r,
                                      commitedQuantity:
                                        commitedQuantity.toString() ?? "",
                                    };
                                  }
                                  return r;
                                });

                              props.setRows?.({
                                ...props.rowData,
                                product_data: updatedRows,
                              });
                            }}
                          >
                            -
                          </Button>
                          <TextField
                            required
                            placeholder="0"
                            type="text"
                            sx={{ width: 65 }}
                            value={row.commitedQuantity}
                            inputProps={{ maxLength: 4 }}
                            onChange={(event) => {
                              let value = event.target.value.replace(/\D/g, "");

                              value =
                                value > row.orderQty ? row.orderQty : value;

                              const updatedRows =
                                props.rowData.product_data.map((r) => {
                                  if (r.id === row.id) {
                                    return {
                                      ...r,
                                      commitedQuantity: value ?? "",
                                    };
                                  }
                                  return r;
                                });

                              props.setRows?.({
                                ...props.rowData,
                                product_data: updatedRows,
                              });
                            }}
                            size="small"
                            variant="outlined"
                          />

                          <Button
                            onClick={() => {
                              const updatedRows =
                                props.rowData.product_data.map((r) => {
                                  if (r.id === row.id) {
                                    const val = Number(r.commitedQuantity) + 1;
                                    const commitedQuantity =
                                      val < Number(row.orderQty)
                                        ? val
                                        : Number(row.orderQty);

                                    return {
                                      ...r,
                                      commitedQuantity:
                                        commitedQuantity.toString() ?? "",
                                    };
                                  }
                                  return r;
                                });

                              props.setRows?.({
                                ...props.rowData,
                                product_data: updatedRows,
                              });
                            }}
                          >
                            +
                          </Button>
                        </ButtonGroup>
                      </div>
                    ) : (
                      row.commitedQuantity ?? <div>--</div>
                    )}
                  </TableCell>
                  {/* <TableCell sx={{ width: 75 }}>
                    {props.isDispatchedQtyAvailable ? (
                      <div className="flex flex-row">
                        <ButtonGroup
                          disableElevation
                          size="small"
                          variant="contained"
                          aria-label="outlined primary button group"
                        >
                          <Button
                            onClick={() => {
                              const updatedRows =
                                props.rowData.product_data.map((r) => {
                                  if (r.id === row.id) {
                                    const val =
                                      Number(r.dispatchedQuantity) - 1;
                                    const dispatchedQuantity =
                                      val >= 0 ? val : 0;
                                    return {
                                      ...r,
                                      dispatchedQuantity:
                                        dispatchedQuantity.toString() ?? "",
                                    };
                                  }
                                  return r;
                                });

                              props.setRows?.({
                                ...props.rowData,
                                product_data: updatedRows,
                              });
                            }}
                          >
                            -
                          </Button>

                          <TextField
                            placeholder="0"
                            required
                            value={row.dispatchedQuantity}
                            sx={{ width: 65 }}
                            inputProps={{ maxLength: 4 }}
                            onChange={(event) => {
                              let value = event.target.value.replace(/\D/g, "");

                              value =
                                value > row.commitedQuantity
                                  ? row.commitedQuantity
                                  : value;

                              const updatedRows =
                                props.rowData.product_data.map((r) => {
                                  if (r.id === row.id) {
                                    return {
                                      ...r,
                                      dispatchedQuantity: value ?? "",
                                    };
                                  }
                                  return r;
                                });
                              props.setRows?.({
                                ...props.rowData,
                                product_data: updatedRows,
                              });
                            }}
                            size="small"
                            variant="outlined"
                          />

                          <Button
                            onClick={() => {
                              const updatedRows =
                                props.rowData.product_data.map((r) => {
                                  if (r.id === row.id) {
                                    const val =
                                      Number(r.dispatchedQuantity) + 1;
                                    const dispatchedQuantity =
                                      val < Number(row.commitedQuantity)
                                        ? val
                                        : Number(row.commitedQuantity);
                                    return {
                                      ...r,
                                      dispatchedQuantity:
                                        dispatchedQuantity.toString() ?? "",
                                    };
                                  }
                                  return r;
                                });

                              props.setRows?.({
                                ...props.rowData,
                                product_data: updatedRows,
                              });
                            }}
                          >
                            +
                          </Button>
                        </ButtonGroup>
                      </div>
                    ) : (
                      row.dispatchedQuantity ?? <div>--</div>
                    )}
                  </TableCell> */}
                  <TableCell sx={{ width: 75 }}>
                    {props.isDeliveredQtyAvailable ? (
                      <div className="flex flex-row">
                        <ButtonGroup
                          disableElevation
                          size="small"
                          variant="contained"
                          aria-label="outlined primary button group"
                        >
                          <Button
                            onClick={() => {
                              const updatedRows =
                                props.rowData.product_data.map((r) => {
                                  if (r.id === row.id) {
                                    const val = Number(r.deliveredQuantity) - 1;
                                    const deliveredQuantity =
                                      val >= 0 ? val : 0;
                                    return {
                                      ...r,
                                      deliveredQuantity:
                                        deliveredQuantity.toString() ?? "",
                                    };
                                  }
                                  return r;
                                });

                              props.setRows?.({
                                ...props.rowData,
                                product_data: updatedRows,
                              });
                            }}
                          >
                            -
                          </Button>

                          <TextField
                            placeholder="0"
                            required
                            sx={{ width: 65 }}
                            value={row.deliveredQuantity}
                            inputProps={{ maxLength: 4 }}
                            onChange={(event) => {
                              let value = event.target.value.replace(/\D/g, "");

                              value =
                                value > row.commitedQuantity
                                  ? row.commitedQuantity
                                  : value;

                              const updatedRows =
                                props.rowData.product_data.map((r) => {
                                  if (r.id === row.id) {
                                    return {
                                      ...r,
                                      deliveredQuantity: value ?? "",
                                    };
                                  }
                                  return r;
                                });
                              props.setRows?.({
                                ...props.rowData,
                                product_data: updatedRows,
                              });
                            }}
                            size="small"
                            variant="outlined"
                          />

                          <Button
                            onClick={() => {
                              const updatedRows =
                                props.rowData.product_data.map((r) => {
                                  if (r.id === row.id) {
                                    const val = Number(r.deliveredQuantity) + 1;
                                    const deliveredQuantity =
                                      val < Number(row.commitedQuantity)
                                        ? val
                                        : Number(row.commitedQuantity);
                                    return {
                                      ...r,
                                      deliveredQuantity:
                                        deliveredQuantity.toString() ?? "",
                                    };
                                  }
                                  return r;
                                });

                              props.setRows?.({
                                ...props.rowData,
                                product_data: updatedRows,
                              });
                            }}
                          >
                            +
                          </Button>
                        </ButtonGroup>
                      </div>
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
