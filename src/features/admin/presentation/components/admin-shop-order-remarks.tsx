import {
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { borderRadius } from "@mui/system";
import React from "react";

export function AdminShopOrderRemarks() {
  return (
    <form className="flex flex-col m-4 lg:flex-row">
      <TextField
        className="flex-1"
        sx={{
          "& fieldset": {
            borderRadius: "0px",
          },
        }}
        required
        label="Remarks"
        placeholder="Enter your remarks here"
      />
      <button
        type="submit"
        className="px-3 py-1 text-base text-white bg-green-700 shadow-md lg:mb-0 lg:rounded-tr-md lg:rounded-br-md"
      >
        Save Remarks
      </button>
    </form>
  );
}
