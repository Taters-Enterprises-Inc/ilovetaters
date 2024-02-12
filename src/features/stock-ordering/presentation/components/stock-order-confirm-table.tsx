import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from "@mui/material";
import { useAppSelector } from "features/config/hooks";
import { Column } from "features/shared/presentation/components/data-table";
import { useEffect, useState } from "react";
import { selectGetStockOrderProducts } from "../slices/get-products.slice";
import { OrderTableData } from "features/stock-ordering/core/domain/order-table-row.model";
import { StockOrderHandleQuantity } from "./stock-order-handle-quantity";
import { MaterialInputAutoComplete } from "features/shared/presentation/components";
import { FaRegTrashAlt } from "react-icons/fa";

interface StockOrderConfirmTableProps {
  isEdit: boolean;
  rows: OrderTableData[];
  setRows: (rowData: OrderTableData[]) => void;
  categoryName: string;
}

const columns: Array<Column> = [
  { id: "prodId", label: "Product Id" },
  { id: "prodName", label: "Product Name" },
  {
    id: "uom",
    label: "UOM",
  },
  { id: "cost", label: "Cost  " },
  { id: "orderQty", label: "Order Qty  " },
  { id: "trash", label: "" },
];

export function StockOrderConfirmTable(props: StockOrderConfirmTableProps) {
  const getProductInformation = useAppSelector(selectGetStockOrderProducts);
  const [addButtonDisabled, setAddButtonDisabled] = useState(false);

  useEffect(() => {
    const lastIndex = props.rows.length;
    const lastProduct = props.rows[lastIndex - 1];

    if (
      lastProduct?.productName === undefined ||
      lastProduct?.productName === ""
    ) {
      setAddButtonDisabled(true);
    } else {
      setAddButtonDisabled(false);
    }
  }, [props.rows]);

  const handleProductChange = (
    value: {
      product_id: string;
      product_name: string;
      uom: string;
      cost: string;
    },
    rowsIndex: number
  ) => {
    const updatedRows = props.rows.map((r, index) => {
      if (index === rowsIndex) {
        const { product_id, product_name, uom, cost } = value;
        return {
          ...r,
          productId: product_id,
          productName: product_name,
          uom: uom,
          cost: cost,
        };
      }
      return r;
    });
    props.setRows(updatedRows);
  };

  const addRow = () => {
    setAddButtonDisabled(true);

    const defaultRow: OrderTableData = {
      productId: "",
      productName: "",
      uom: "",
      cost: "",
      orderQty: "",
    };

    const updatedRows = [...props.rows, defaultRow];
    props.setRows(updatedRows);
  };

  const removeRow = (product_Id: string) => {
    const removedProduct = props.rows.find(
      (product) => product.productId === product_Id
    );
    if (removedProduct) {
      const updatedRows = props.rows.filter(
        (product) => product.productId !== product_Id
      );
      props.setRows(updatedRows);

      if (
        updatedRows.length > 0 &&
        updatedRows[updatedRows.length - 1].productId !== ""
      ) {
        setAddButtonDisabled(false);
      }
    }
  };

  return (
    <div>
      <div className="border-2 border-black rounded-lg pb-1 overflow-auto">
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
            {props.rows.map((productProperty, rowsIndex) => {
              const { productId, productName, uom, cost, orderQty } =
                productProperty;

              return (
                <TableRow key={rowsIndex}>
                  <TableCell sx={{ width: 100 }}>{productId}</TableCell>
                  <TableCell>
                    {props.isEdit && getProductInformation.data ? (
                      <MaterialInputAutoComplete
                        colorTheme={"black"}
                        required={true}
                        fullWidth={true}
                        size={"small"}
                        options={getProductInformation.data.products.filter(
                          (item) => {
                            const excludedItems = props.rows.map(
                              (items) => items.productName
                            );

                            return !excludedItems.includes(item.product_name);
                          }
                        )}
                        getOptionLabel={(option) => option.product_name || ""}
                        isOptionEqualToValue={(option, value) =>
                          option.name === value.product_name
                        }
                        placeholder={productName}
                        onChange={(event, value) => {
                          if (value) {
                            handleProductChange(value, rowsIndex);
                          }
                        }}
                        filterSelectedOptions
                      />
                    ) : (
                      productName
                    )}
                  </TableCell>
                  <TableCell sx={{ width: 75 }}>{uom}</TableCell>
                  <TableCell sx={{ width: 75 }}>{cost}</TableCell>
                  <TableCell sx={{ width: 125 }}>
                    <StockOrderHandleQuantity
                      rows={props.rows}
                      setRows={(rows) => props.setRows(rows)}
                      rowsIndex={rowsIndex}
                      currentValue={orderQty}
                      propertyKey={"orderQty"}
                    />
                  </TableCell>
                  <TableCell sx={{ width: props.isEdit ? 0 : 50 }}>
                    {props.isEdit && (
                      <FaRegTrashAlt
                        className="text-lg text-primary"
                        onClick={() => removeRow(productId)}
                      />
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        <div className="flex justify-between px-5 py-1">
          <div className="flex items-stretch">
            <span className="text-base text-primary capitalize self-center ml-3">
              {props.categoryName}
            </span>
          </div>

          {props.isEdit && (
            <div className="flex space-x-3">
              <Button
                onClick={addRow}
                disabled={addButtonDisabled}
                fullWidth
                size="small"
              >
                Add
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
