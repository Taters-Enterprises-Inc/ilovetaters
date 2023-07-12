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
import { STOCK_ORDER_CATEGORY } from "features/shared/constants";
import { OrderTableData } from "features/stock-ordering/core/domain/order-table-row.model";

interface StockOrderConfirmTableProps {
  isConfirmOrder: boolean;
  isEditCancelled: boolean;
  isEdit: boolean;
  handleTableRows: (
    TableData: OrderTableData[],
    avialableDelivery: number
  ) => void;
  setCategory: (categoryData: {
    category_id: string;
    category_name: string;
  }) => void;
  store: {
    store_id: string;
    store_name: string;
  };
}

export function StockOrderConfirmTable(props: StockOrderConfirmTableProps) {
  const [rows, setRows] = useState<OrderTableData[]>([]);

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
    if (
      (getOrderInformation.data && props.isConfirmOrder) ||
      (props.isEditCancelled && getOrderInformation.data)
    ) {
      setCategory(getOrderInformation.data.category);
      setRows(getOrderInformation.data.OrderData);
    }
  }, [getOrderInformation.data, props.isEditCancelled]);

  useEffect(() => {
    if (category) {
      props.setCategory({
        category_id: category?.category_id ?? "",
        category_name: category?.category_name ?? "",
      });
    }

    if (category || props.isEdit) {
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
  }, [dispatch, category, props.isEdit]);

  useEffect(() => {
    const aveDeliveryDate = getProductInformation.data?.schedule ?? 0;
    props.handleTableRows(rows, aveDeliveryDate);
  }, [rows]);

  console.log(getOrderInformation.data?.OrderData);

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
                {rows.map((row, rowsIndex) => (
                  <TableRow
                    key={rowsIndex}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell sx={{ width: 100 }}>{row.productId}</TableCell>
                    <TableCell>
                      {props.isEdit ? (
                        <Autocomplete
                          size="small"
                          options={
                            getProductInformation.data?.products
                              .flatMap((options) => options)
                              .filter((item) => {
                                const excludedItems = rows.map(
                                  (items) => items.productName
                                );

                                return !excludedItems.includes(
                                  item.product_name
                                );
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

                            const updatedRows = rows.map((r, index) => {
                              if (index === rowsIndex) {
                                return {
                                  ...r,
                                  productId: getProductInfo?.product_id ?? "",
                                  productName:
                                    getProductInfo?.product_name ?? "",
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
                      ) : (
                        row.productName
                      )}
                    </TableCell>
                    <TableCell sx={{ width: 75 }}>{row.uom}</TableCell>
                    <TableCell sx={{ width: 75 }}>{row.cost}</TableCell>
                    <TableCell sx={{ width: 125 }}>
                      <TextField
                        required
                        type="number"
                        value={row.orderQty}
                        onChange={(event) => {
                          const updatedRows = rows.map((r, index) => {
                            if (index === rowsIndex) {
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