import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Autocomplete,
  TextField,
  Button,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { Column } from "features/shared/presentation/components/data-table";
import { useEffect, useState } from "react";
import { selectconfirmNewOrder } from "../slices/confirm-new-order.slice";
import {
  getStockOrderProducts,
  selectGetStockOrderProducts,
} from "../slices/get-products.slice";
import { GetStockProductModel } from "features/stock-ordering/core/domain/get-stock-product.model";
import { STOCK_ORDER_CATEGORY } from "features/shared/constants";

interface TableRow {
  id: number;
  productId: string;
  productName: string;
  uom: string;
  cost: string;
  orderQty: string;
}

interface OrderPlaceAndConfirmTableProps {
  isDisabled: boolean;
  isConfirmOrder: boolean;
  isEditCancelled: boolean;
  handleTableRows: (TableData: TableRow[]) => void;
  setCategory: (categoryData: {
    category_id: string;
    category_name: string;
  }) => void;
  store: {
    store_id: string;
    store_name: string;
  };
}

export function OrderPlaceAndConfirmTable(
  props: OrderPlaceAndConfirmTableProps
) {
  const [rows, setRows] = useState<TableRow[]>([
    {
      id: 1,
      productId: "",
      productName: "",
      uom: "",
      cost: "",
      orderQty: "",
    },
  ]);

  const dispatch = useAppDispatch();
  const getOrderInformation = useAppSelector(selectconfirmNewOrder);
  const getProductInformation = useAppSelector(selectGetStockOrderProducts);

  const [category, setCategory] = useState<{
    category_id: string;
    category_name: string;
  }>({
    category_id: "",
    category_name: "",
  });

  const addRow = () => {
    const newRow: TableRow = {
      id: rows.length + 1,
      productId: "",
      productName: "",
      uom: "",
      cost: "",
      orderQty: "",
    };

    setRows((prevRows) => [...prevRows, newRow]);
  };

  const deleteRow = () => {
    setRows((prevRows) => prevRows.slice(0, prevRows.length - 1));
  };

  let columns: Array<Column> = [
    { id: "prodId", label: "Product Id" },
    { id: "prodName", label: "Product Name" },
    {
      id: "uom",
      label: "UOM",
    },
    { id: "cost", label: "Cost  " },
    { id: "orderQty", label: "Order Qty  " },
  ];

  useEffect(() => {
    if (getOrderInformation.data && props.isConfirmOrder) {
      setCategory(getOrderInformation.data.category);
      setRows(getOrderInformation.data.OrderData);
    }
  }, [getOrderInformation.data]);

  useEffect(() => {
    if (category) {
      dispatch(
        getStockOrderProducts({
          category: category.category_id,
          store_information: {
            store_id: props.store.store_id,
            store_name: props.store.store_name ?? "",
          },
        })
      );
    }
  }, [dispatch, category]);

  useEffect(() => {
    props.setCategory({
      category_id: category?.category_id ?? "",
      category_name: category?.category_name ?? "",
    });
  }, [category]);

  useEffect(() => {
    props.isEditCancelled
      ? props.handleTableRows(getOrderInformation.data?.OrderData ?? [])
      : props.handleTableRows(rows);
  }, [rows]);

  return (
    <div>
      <div className="border-2 border-black rounded-lg pb-1">
        {category?.category_name !== "" || category?.category_id !== "" ? (
          <>
            <Table sx={{ minWidth: 650 }} size="small">
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
                {rows.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell sx={{ width: 100 }}>{row.productId}</TableCell>
                    <TableCell>
                      <Autocomplete
                        id="stock-order-product-name"
                        size="small"
                        disabled={props.isDisabled}
                        options={
                          getProductInformation.data?.products
                            .flatMap((options) => options)
                            .filter((item) => {
                              const excludedItems = rows.map(
                                (items) => items.productName
                              );

                              return !excludedItems.includes(item.product_name);
                            })
                            .map((item) => item.product_name) ?? []
                        }
                        onChange={(event, value) => {
                          const getProductInfo =
                            getProductInformation.data?.products.find(
                              (prod_name) => {
                                if (prod_name.product_name === value) {
                                  return prod_name;
                                }
                              }
                            );

                          const updatedRows = rows.map((r) => {
                            if (r.id === row.id) {
                              return {
                                ...r,
                                productId: getProductInfo?.product_id ?? "",
                                productName: getProductInfo?.product_name ?? "",
                                uom: getProductInfo?.uom ?? "",
                                cost: getProductInfo?.cost ?? "",
                              };
                            }
                            return r;
                          });
                          setRows(updatedRows);
                        }}
                        value={row.productName}
                        renderInput={(params) => (
                          <TextField
                            required
                            {...params}
                            placeholder="--Select products to order"
                          />
                        )}
                      />
                    </TableCell>
                    <TableCell sx={{ width: 75 }}>{row.uom}</TableCell>
                    <TableCell sx={{ width: 75 }}>{row.cost}</TableCell>
                    <TableCell sx={{ width: 75 }}>
                      <TextField
                        required
                        value={row.orderQty}
                        disabled={props.isDisabled}
                        onChange={(event) => {
                          const updatedRows = rows.map((r) => {
                            if (r.id === row.id) {
                              return {
                                ...r,
                                orderQty: event.target.value,
                              };
                            }
                            return r;
                          });
                          setRows(updatedRows);
                        }}
                        size="small"
                        variant="outlined"
                        placeholder="0"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <div className="flex justify-between">
              <div className="flex items-stretch">
                <span className="text-base text-primary capitalize self-center ml-3">
                  {category?.category_name}
                </span>
              </div>
              <div className="flex justify-end mt-2">
                <Button
                  disabled={props.isDisabled}
                  onClick={() => {
                    setCategory({
                      category_id: "",
                      category_name: "",
                    });
                    setRows([]);
                  }}
                >
                  Reset
                </Button>

                <Button disabled={props.isDisabled} onClick={deleteRow}>
                  Delete
                </Button>
                <Button disabled={props.isDisabled} onClick={addRow}>
                  Add
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="px-24 my-5 space-y-2">
            <span>Select product Category: </span>

            <Autocomplete
              id="stock-order-category-name"
              size="small"
              disabled={props.store.store_name === "" ? true : false}
              options={
                STOCK_ORDER_CATEGORY.map((row) => row.category_name) ?? []
              }
              onChange={(event, value) => {
                STOCK_ORDER_CATEGORY.find((row) => {
                  if (row.category_name === value) {
                    setCategory({
                      category_id: row.category_id ?? "",
                      category_name: row.category_name ?? "",
                    });
                  }
                });
              }}
              renderInput={(params) => (
                <TextField
                  required
                  value={category.category_name ?? ""}
                  {...params}
                  label="Select product category"
                />
              )}
            />
          </div>
        )}
      </div>
    </div>
  );
}
