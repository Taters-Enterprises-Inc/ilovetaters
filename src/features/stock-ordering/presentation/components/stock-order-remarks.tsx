import { TextField } from "@mui/material";
import React, { useState } from "react";

interface remarksProps {
  setRemarks: (value: string) => void;
  remarks: string;
}

export function StockOrderRemarks(props: remarksProps) {
  return (
    <div className="flex flex-col mt-2">
      <span>Remarks: </span>
      <TextField
        value={props.remarks}
        onChange={(event) => props.setRemarks(event.target.value)}
        inputProps={{ maxLength: 512 }}
        multiline
      />
    </div>
  );
}
