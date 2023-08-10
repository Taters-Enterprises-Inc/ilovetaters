import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Autocomplete,
  TextField,
  Button,
  ButtonGroup,
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
import { StockOrderHandleQuantity } from "./stock-order-handle-quantity";

interface StockOrderConfirmTableProps {
  isConfirmOrder: boolean;
  isEditCancelled: boolean;
  isEdit: boolean;
  handleTableRows: (TableData: OrderTableData[]) => void;
  setCategory: (categoryData: {
    category_id: string;
    category_name: string;
  }) => void;
  category: {
    category_id: string;
    category_name: string;
  };
  store: {
    store_id: string;
    store_name: string;
  };
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
];

export function StockOrderConfirmTable(props: StockOrderConfirmTableProps) {
  const [rows, setRows] = useState<OrderTableData[]>([]);

  const dispatch = useAppDispatch();
  const getOrderInformation = useAppSelector(selectconfirmNewOrder);
  const getProductInformation = useAppSelector(selectGetStockOrderProducts);

  useEffect(() => {
    props.handleTableRows(rows);

    if (props.category && getOrderInformation.data) {
      props.setCategory({
        category_id: getOrderInformation.data?.category.category_id,
        category_name: getOrderInformation.data?.category.category_name,
      });
    }
  }, [rows, getOrderInformation.data, props.isEditCancelled]);

  //Need to refactor this block of code
  useEffect(() => {
    if (
      (getOrderInformation.data && props.isConfirmOrder) ||
      (props.isEditCancelled && getOrderInformation.data)
    ) {
      setRows(getOrderInformation.data.OrderData);
    }
  }, [getOrderInformation.data, props.isEditCancelled]);

  const productOptions = getProductInformation.data?.products
    .flatMap((options) => options)
    .filter((item) => {
      const excludedItems = rows.map((items) => items.productName);

      return !excludedItems.includes(item.product_name);
    })
    .map((item) => item.product_name);

  const handleProductChange = (value: string, rowsIndex: number) => {
    const getProductInfo = getProductInformation.data?.products.find(
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
          productName: getProductInfo?.product_name ?? "",
          uom: getProductInfo?.uom ?? "",
          cost: getProductInfo?.cost ?? "",
        };
      }
      return r;
    });
    setRows(updatedRows);
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
            {rows.map((productProperty, rowsIndex) => {
              const { productId, productName, uom, cost, orderQty } =
                productProperty;

              return (
                <TableRow key={rowsIndex}>
                  <TableCell sx={{ width: 100 }}>{productId}</TableCell>
                  <TableCell>
                    {props.isEdit ? (
                      <Autocomplete
                        size="small"
                        options={productOptions ?? []}
                        onChange={(event, value) =>
                          handleProductChange(value ?? "", rowsIndex)
                        }
                        value={productName}
                        renderInput={(params) => (
                          <TextField
                            required
                            {...params}
                            placeholder="--Select products to order"
                          />
                        )}
                      />
                    ) : (
                      productName
                    )}
                  </TableCell>
                  <TableCell sx={{ width: 75 }}>{uom}</TableCell>
                  <TableCell sx={{ width: 75 }}>{cost}</TableCell>
                  <TableCell sx={{ width: 125 }}>
                    <StockOrderHandleQuantity
                      rows={rows}
                      setRows={setRows}
                      rowsIndex={rowsIndex}
                      currentValue={orderQty}
                      propertyKey={"orderQty"}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        <div className="flex justify-between">
          <div className="flex items-stretch">
            <span className="text-base text-primary capitalize self-center ml-3">
              {getOrderInformation.data?.category.category_name}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
