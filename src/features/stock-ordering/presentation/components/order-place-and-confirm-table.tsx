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
import {
  confirmNewOrder,
  selectconfirmNewOrder,
} from "../slices/confirm-new-order.slice";

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
  handleTableRows: (TableData: TableRow[]) => void;
  setCategory: (categoryData: string) => void;
}

export function OrderPlaceAndConfirmTable(
  props: OrderPlaceAndConfirmTableProps
) {
  const sampleOptions = [
    {
      ["frozen"]: [
        {
          productId: "1",
          productName: "Product 1",
          uom: "Pack",
          cost: "50",
          orderQty: "",
        },
        {
          productId: "2",
          productName: "Product 2",
          uom: "Pack",
          cost: "50",
          orderQty: "",
        },
        {
          productId: "3",
          productName: "Product 3",
          uom: "Pack",
          cost: "50",
          orderQty: "",
        },
        {
          productId: "4",
          productName: "Product 4",
          uom: "Pack",
          cost: "50",
          orderQty: "",
        },
      ],
    },
    {
      ["dry"]: [
        {
          productId: "5",
          productName: "Product 5",
          uom: "Pack",
          cost: "50",
          orderQty: "",
        },
        {
          productId: "6",
          productName: "Product 6",
          uom: "Pack",
          cost: "50",
          orderQty: "",
        },
        {
          productId: "7",
          productName: "Product 7",
          uom: "Pack",
          cost: "50",
          orderQty: "",
        },
        {
          productId: "8",
          productName: "Product 8",
          uom: "Pack",
          cost: "50",
          orderQty: "",
        },
      ],
    },
  ];

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

  const getOrderInformation = useAppSelector(selectconfirmNewOrder);

  const [category, setCategory] = useState("");

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
    if (getOrderInformation.data) {
      setCategory(getOrderInformation.data.category);
      setRows(getOrderInformation.data.OrderData);
    }
  }, [getOrderInformation.data]);

  useEffect(() => {
    props.setCategory(category);
  }, [category]);

  useEffect(() => {
    props.handleTableRows(rows);
  }, [rows]);

  return (
    <div>
      <div className="border-2 border-black rounded-lg pb-1">
        {category !== "" ? (
          <>
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
                    <TableCell>
                      <Autocomplete
                        id="stock-order-product-name"
                        size="small"
                        disabled={props.isDisabled}
                        options={sampleOptions
                          .flatMap(
                            (options) =>
                              options[category as keyof typeof options] || []
                          )
                          .filter((item) => {
                            const excludedProductIds = rows.map(
                              (items) => items.productId
                            );

                            return !excludedProductIds.includes(item.productId);
                          })
                          .map((item) => item.productName)}
                        onChange={(event, value) => {
                          const selectedProduct = sampleOptions
                            .flatMap(
                              (options) =>
                                options[category as keyof typeof options] || []
                            )
                            .find((item) => item && item.productName === value);

                          const updatedRows = rows.map((r) => {
                            if (r.id === row.id) {
                              return {
                                ...r,
                                productId: selectedProduct?.productId ?? "",
                                productName: value ?? "",
                                uom: selectedProduct?.uom ?? "",
                                cost: selectedProduct?.cost ?? "",
                              };
                            }
                            return r;
                          });
                          setRows(updatedRows);
                        }}
                        renderInput={(params) => (
                          <TextField
                            required
                            value={row.productName}
                            {...params}
                            label={
                              getOrderInformation.data?.OrderData.map((item) =>
                                row.productId === item.productId
                                  ? item.productName
                                  : null
                              ) ?? "Select Product"
                            }
                          />
                        )}
                      />
                    </TableCell>
                    <TableCell>{row.uom}</TableCell>
                    <TableCell>{row.cost}</TableCell>
                    <TableCell>
                      <TextField
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
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              ))}
            </Table>

            <div className="flex justify-between">
              <div className="flex items-stretch">
                <span className="text-base text-primary capitalize self-center ml-3">
                  {category}
                </span>
              </div>
              <div className="flex justify-end mt-2">
                <Button
                  disabled={props.isDisabled}
                  onClick={() => {
                    setCategory("");
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
              disabled={props.isDisabled}
              options={
                Object.values(sampleOptions).map(
                  (value) => Object.keys(value)[0]
                ) ?? []
              }
              onChange={(event, value) => {
                setCategory(value || "");
              }}
              renderInput={(params) => (
                <TextField
                  required
                  value={category ?? ""}
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
