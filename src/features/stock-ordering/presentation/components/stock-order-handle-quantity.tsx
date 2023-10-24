import { ButtonGroup, Button, TextField } from "@mui/material";
import { getRowsStateFromCache } from "@mui/x-data-grid/hooks/features/rows/gridRowsUtils";
import { OrderTableData } from "features/stock-ordering/core/domain/order-table-row.model";
import React from "react";

interface StockOrderHandleQuantityProps {
  rows: any[];
  setRows: (row: any[]) => void;
  rowsIndex: number;
  currentValue: string;
  propertyKey: string;
  precedingPropertyKey?: string;
}

export function StockOrderHandleQuantity(props: StockOrderHandleQuantityProps) {
  const handleQuantityButtonChange = (event: {
    currentTarget: { id: string };
  }) => {
    const updatedRows = props.rows.map((r: any, index: number) => {
      let value = isNaN(Number(props.currentValue))
        ? 0
        : Number(props.currentValue);

      value = value >= 0 ? value : 0;

      if (props.precedingPropertyKey) {
        value =
          value < r?.[props.precedingPropertyKey ?? ""]
            ? value
            : r?.[props.precedingPropertyKey ?? ""] - 1;
      }

      if (index === props.rowsIndex) {
        if (event.currentTarget.id === "minus") {
          const minusVal = value - 1;
          value = minusVal > 0 ? minusVal : 1;
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

    const updatedRows = props.rows.map((r: any, index: number) => {
      if (index === props.rowsIndex) {
        if (props.precedingPropertyKey) {
          value =
            value < r?.[props.precedingPropertyKey]
              ? value
              : r?.[props.precedingPropertyKey];
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
        autoComplete="off"
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
