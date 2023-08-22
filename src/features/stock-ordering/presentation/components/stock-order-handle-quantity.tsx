import { ButtonGroup, Button, TextField } from "@mui/material";
import { OrderTableData } from "features/stock-ordering/core/domain/order-table-row.model";
import React from "react";

interface StockOrderHandleQuantityProps {
  rows: OrderTableData[];
  setRows: (row: OrderTableData[]) => void;
  rowsIndex: number;
  currentValue: string;
  propertyKey: string;
}

export function StockOrderHandleQuantity(props: StockOrderHandleQuantityProps) {
  const handleQuantityButtonChange = (event: {
    currentTarget: { id: string };
  }) => {
    const updatedRows = props.rows.map((r, index) => {
      let value = isNaN(Number(r.orderQty)) ? 0 : Number(r.orderQty);

      if (index === props.rowsIndex) {
        if (event.currentTarget.id === "minus") {
          const minusVal = value - 1;
          value = minusVal >= 0 ? minusVal : 0;
        } else if (event.currentTarget.id === "plus") {
          const plusVal = value + 1;
          value = plusVal < 9999 ? plusVal : 9999;
        }

        return {
          ...r,
          [props.propertyKey]: value.toString(),
        };
      }
      return r;
    });
    props.setRows(updatedRows);
  };

  const handleQuantityTextChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let value = event.target.value.replace(/\D/g, "");

    const updatedRows = props.rows.map((r, index) => {
      if (index === props.rowsIndex) {
        return {
          ...r,
          [props.propertyKey]: value.toString(),
        };
      }
      return r;
    });
    props.setRows(updatedRows);
  };

  return (
    <ButtonGroup
      disableElevation
      size="small"
      variant="contained"
      aria-label="quantity button group"
      sx={{ display: "flex" }}
    >
      <Button id="minus" onClick={handleQuantityButtonChange}>
        -
      </Button>
      <TextField
        required
        type="text"
        sx={{ width: 65 }}
        value={props.currentValue}
        inputProps={{ maxLength: 4 }}
        onChange={handleQuantityTextChange}
        size="small"
        variant="outlined"
        placeholder="0"
      />
      <Button id="plus" onClick={handleQuantityButtonChange}>
        +
      </Button>
    </ButtonGroup>
  );
}
