import * as React from "react";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { styled } from "@mui/material/styles";

const BranchestoChoose = () => [
  { label: "Input Branches (DB)" },
  { label: "Input Branches (DB)" },
  { label: "Input Branches (DB)" },
  { label: "Input Branches (DB)" },
  { label: "Input Branches (DB)" },
];

export function BranchesList() {
  const BranchesTextField = styled((props: TextFieldProps) => (
    <TextField {...props} />
  ))(({ theme }) => ({
    "& input": {
      color: "white !important",
      "-webkit-text-fill-color": "white !important",
    },
    "& label": {
      color: "white !important",
    },
    "& fieldset": {
      borderColor: "white !important",
    },
    "&:hover fieldset": {
      borderColor: "white !important",
    },
    "&.Mui-focused fieldset": {
      borderColor: "white !important",
    },
  }));
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={BranchestoChoose()}
      sx={{
        svg: { color: "white" },
        input: { color: "white" },
        label: { color: "white" },
        borderColor: "white !important",
        width: "full",
        pb: 2,
      }}
      renderInput={(params) => (
        <BranchesTextField {...params} label="Branch Visited or Odered from" />
      )}
    />
  );
}
