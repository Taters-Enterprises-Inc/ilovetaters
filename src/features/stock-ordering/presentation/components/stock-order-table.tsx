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
  IconButton,
} from "@mui/material";
import { Column } from "features/shared/presentation/components/data-table";
import { StockOrderLogs } from "./stock-order-logs";
import { StockOrderHandleQuantity } from "./stock-order-handle-quantity";
import { GetProductDataModel } from "features/stock-ordering/core/domain/get-product-data.model";
import { MaterialInputAutoComplete } from "features/shared/presentation/components";
import {
  AiFillCheckSquare,
  AiFillCloseSquare,
  AiFillDelete,
} from "react-icons/ai";
import { STOCK_ORDERING_BUTTON_STYLE } from "features/shared/constants";
import { useEffect, useState } from "react";
import {
  ProductParam,
  updateOrderItemsParam,
} from "features/stock-ordering/core/stock-ordering.params";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import {
  getStockOrderProducts,
  selectGetStockOrderProducts,
} from "../slices/get-products.slice";
import { updateOrderItems } from "../slices/update-order-items.slice";
import { PopupModal } from "../modals";

interface StockOrderTableProps {
  isCommitedTextFieldAvailable?: boolean;
  isDeliveredQtyAvailable?: boolean;
  isDispatchedQtyAvailable?: boolean;

  enableTableEdit?: boolean;
  isUpdateBilling?: boolean;
  activeTab?: Number | undefined;
  rowData: GetProductDataModel;
  setRows: (rows: GetProductDataModel) => void;
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
  const dispatch = useAppDispatch();
  const getStockOrderProductState = useAppSelector(selectGetStockOrderProducts);

  const [edit, setEdit] = useState(false);
  const [addButtonDisabled, setAddButtonDisabled] = useState(false);
  const [deleteButtonDisabled, setDeleteButtonDisabled] = useState(false);
  const [confirmButtonDisabled, setConfirmButtonDisabled] = useState(false);
  const [openPopUpMessage, setOpenPopupMessage] = useState(false);

  useEffect(() => {
    const lastIndex = props.rowData.product_data.length;
    const lastProduct = props.rowData.product_data[lastIndex - 1];

    if (
      lastProduct?.product_name === undefined ||
      lastProduct?.product_name === "" ||
      lastProduct?.order_qty === undefined ||
      lastProduct?.order_qty === "0" ||
      lastProduct?.order_qty === ""
    ) {
      setAddButtonDisabled(true);
      setConfirmButtonDisabled(true);
    } else {
      setAddButtonDisabled(false);
      setConfirmButtonDisabled(false);
    }
  }, [props.rowData.product_data]);

  const products = getStockOrderProductState.data?.products
    .filter(
      (item) =>
        !props.rowData.product_data.some(
          (row) => row.product_name === item.product_name
        )
    )
    .map((item) => item.product_name);

  const addRow = () => {
    setAddButtonDisabled(true);
    setDeleteButtonDisabled(false);

    const defaultRow = {
      id: "",
      product_id: "",
      product_name: "",
      uom: "",
      category_id: "",
      order_qty: "0",
      commited_qty: "",
      delivered_qty: "",
      total_cost: "0",
      order_information_id: "",
      out_of_stock: false,
    };

    const updatedRows = [...props.rowData.product_data, defaultRow];

    props.setRows({
      product_data: updatedRows,
      order_information: props.rowData.order_information,
    });
  };

  const removeRow = () => {
    const updatedRows = [...props.rowData.product_data];
    updatedRows.pop();

    props.setRows({
      product_data: updatedRows,
      order_information: props.rowData.order_information,
    });

    if (
      updatedRows.length > 0 &&
      updatedRows[updatedRows.length - 1].id !== ""
    ) {
      setDeleteButtonDisabled(true);
      setAddButtonDisabled(false);
    } else {
      setDeleteButtonDisabled(false);
    }
  };

  const handleTableEdit = () => {
    if (edit) {
      setOpenPopupMessage(true);
    } else {
      setEdit(true);
      setDeleteButtonDisabled(true);
      const productParams: ProductParam = {
        category: props.rowData.order_information.category_id,
        store_information: {
          store_id: props.rowData.order_information.store_id,
          store_name: props.rowData.order_information.store_name,
        },
      };

      dispatch(getStockOrderProducts(productParams));
    }
  };

  const handleCommitChanges = () => {
    const newRowsToInsert = props.rowData.product_data.filter(
      (row) => row.id === ""
    );

    const rowInsertParam: updateOrderItemsParam[] = newRowsToInsert.map(
      (item) =>
        ({
          productId: item.product_id,
          productName: item.product_name,
          uom: item.uom,
          orderQty: item.order_qty,
          order_information_id: props.rowData.order_information.id,
        } ?? [])
    );

    dispatch(updateOrderItems(rowInsertParam));
    setEdit(false);
    setOpenPopupMessage(false);
  };

  const handleDiscardChanges = () => {
    const updatedRows = props.rowData.product_data.filter(
      (row) => row.id !== ""
    );

    props.setRows({
      product_data: updatedRows,
      order_information: props.rowData.order_information,
    });
    setEdit(false);
    setOpenPopupMessage(false);
  };

  const handleProductChange = (rowIndex: number, value: string) => {
    const selectedProduct = getStockOrderProductState.data?.products.find(
      (prod) => prod.product_name === value
    );

    const updatedRows = props.rowData.product_data.map(
      (row: any, index: number) => {
        if (index === rowIndex) {
          return {
            ...row,
            product_id: selectedProduct?.product_id,
            product_name: selectedProduct?.product_name,
            uom: selectedProduct?.uom,
          };
        }
        return row;
      }
    );

    props.setRows({
      product_data: updatedRows,
      order_information: props.rowData.order_information,
    });
  };

  const handleOutofStock = (rowProductId: string, rowIndex: number) => {
    const updatedRows = props.rowData.product_data.map(
      (row: any, index: number) => {
        if (index === rowIndex) {
          return {
            ...row,
            out_of_stock: row.out_of_stock ? false : true,
            commited_qty: 0,
          };
        }
        return row;
      }
    );

    props.setRows({
      product_data: updatedRows,
      order_information: props.rowData.order_information,
    });
  };

  return (
    <>
      <div>
        <div className="border-2 border-black rounded-lg pb-1 space-y-4">
          <div className="block max-h-64 overflow-auto md:block">
            <Table>
              <TableHead className="bg-black">
                <TableRow>
                  {columns.map((row, index) => {
                    if (
                      (row.id === "commitedQuantity" && edit) ||
                      (row.id === "deliveredQuantity" && edit) ||
                      (row.id === "total_cost" && edit)
                    ) {
                      return null;
                    } else {
                      return (
                        <TableCell key={index}>
                          <span className="text-white">{row.label}</span>
                        </TableCell>
                      );
                    }
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                {props.rowData.product_data.map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      backgroundColor:
                        row.commited_qty !== row.delivered_qty &&
                        props.isUpdateBilling
                          ? "red"
                          : "",
                    }}
                  >
                    <TableCell sx={{ width: 75 }}>{row.product_id}</TableCell>
                    <TableCell>
                      {edit ? (
                        <MaterialInputAutoComplete
                          colorTheme={"black"}
                          disabled={
                            index !== props.rowData.product_data.length - 1 ||
                            row.id !== ""
                          }
                          size="small"
                          fullWidth
                          options={products ?? []}
                          label={""}
                          onChange={(event, value) =>
                            handleProductChange(index, value)
                          }
                          value={row.product_name}
                          isOptionEqualToValue={(option: any, value: any) =>
                            option === value
                          }
                        />
                      ) : (
                        row.product_name
                      )}
                    </TableCell>
                    <TableCell sx={{ width: 75 }}>{row.uom}</TableCell>
                    <TableCell sx={{ width: 75 }}>
                      {edit ? (
                        <StockOrderHandleQuantity
                          rows={props.rowData.product_data}
                          setRows={(rows) => {
                            props.setRows({
                              product_data: rows,
                              order_information:
                                props.rowData.order_information,
                            });
                          }}
                          rowsIndex={index}
                          currentValue={row.order_qty}
                          propertyKey={"order_qty"}
                        />
                      ) : (
                        row.order_qty
                      )}
                    </TableCell>
                    {!edit && (
                      <>
                        <TableCell sx={{ width: 75 }}>
                          {props.isCommitedTextFieldAvailable ? (
                            <div className="flex space-x-1">
                              {row.out_of_stock ? (
                                <span className="flex item-end text-base">
                                  Out of Stock
                                </span>
                              ) : (
                                <StockOrderHandleQuantity
                                  rows={props.rowData.product_data}
                                  setRows={(rows) => {
                                    props.setRows({
                                      product_data: rows,
                                      order_information:
                                        props.rowData.order_information,
                                    });
                                  }}
                                  rowsIndex={index}
                                  currentValue={row.commited_qty}
                                  propertyKey={"commited_qty"}
                                  precedingPropertyKey={"order_qty"}
                                />
                              )}

                              <IconButton
                                onClick={() =>
                                  handleOutofStock(row.product_id, index)
                                }
                              >
                                {row.out_of_stock ? (
                                  <AiFillCheckSquare className="text-button" />
                                ) : (
                                  <AiFillCloseSquare className="text-button" />
                                )}
                              </IconButton>
                            </div>
                          ) : row.out_of_stock ? (
                            <span>out of stock</span>
                          ) : (
                            row.commited_qty ?? <div>--</div>
                          )}
                        </TableCell>

                        <TableCell sx={{ width: 75 }}>
                          {props.isDeliveredQtyAvailable ? (
                            <StockOrderHandleQuantity
                              rows={props.rowData.product_data}
                              setRows={(rows) => {
                                props.setRows({
                                  product_data: rows,
                                  order_information:
                                    props.rowData.order_information,
                                });
                              }}
                              rowsIndex={index}
                              currentValue={row.delivered_qty}
                              propertyKey={"delivered_qty"}
                              precedingPropertyKey={"commited_qty"}
                            />
                          ) : (
                            row.delivered_qty ?? <div>--</div>
                          )}
                        </TableCell>
                        <TableCell>
                          {Number(row.total_cost).toLocaleString("en-US", {
                            maximumFractionDigits: 2,
                          }) ?? <div>--</div>}
                        </TableCell>
                      </>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {edit && (
              <div className="flex">
                <Button
                  onClick={addRow}
                  disabled={addButtonDisabled}
                  fullWidth
                  size="small"
                >
                  Add
                </Button>
                <Button
                  onClick={removeRow}
                  disabled={deleteButtonDisabled}
                  fullWidth
                  size="small"
                >
                  Remove
                </Button>
              </div>
            )}
          </div>
          <Divider />

          <div className="flex px-5 space-x-5">
            {props.enableTableEdit && (
              <Button
                fullWidth
                size="small"
                variant="contained"
                disabled={confirmButtonDisabled}
                sx={STOCK_ORDERING_BUTTON_STYLE}
                onClick={handleTableEdit}
              >
                {edit ? "Confirm" : "edit"}
              </Button>
            )}
            {edit && (
              <Button
                fullWidth
                size="small"
                variant="contained"
                sx={STOCK_ORDERING_BUTTON_STYLE}
                onClick={handleDiscardChanges}
              >
                Cancel
              </Button>
            )}
          </div>

          <Divider />

          <StockOrderLogs order_details={props.rowData.order_information} />
        </div>
      </div>
      <PopupModal
        open={openPopUpMessage}
        onClose={() => setOpenPopupMessage(false)}
        title={"Warning!"}
        message={
          "Please be aware that this action is irreversible. Are you certain you want to continue?"
        }
        customButton
      >
        <div className="flex space-x-3">
          <Button
            onClick={handleCommitChanges}
            variant="contained"
            fullWidth
            size="small"
            sx={STOCK_ORDERING_BUTTON_STYLE}
          >
            Yes
          </Button>
          <Button
            onClick={handleDiscardChanges}
            variant="contained"
            fullWidth
            size="small"
            sx={STOCK_ORDERING_BUTTON_STYLE}
          >
            No
          </Button>
        </div>
      </PopupModal>
    </>
  );
}
