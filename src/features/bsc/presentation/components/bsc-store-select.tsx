import {
  FormControl,
  InputBase,
  InputLabel,
  MenuItem,
  OutlinedTextFieldProps,
  Select,
  SelectChangeEvent,
  styled,
  TextField,
} from "@mui/material";
import React from "react";

const SelectField = styled((props: OutlinedTextFieldProps) => (
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
  ".MuiSvgIcon-root ": {
    fill: "white !important",
  },
  "& .MuiInputBase-input": {
    fontSize: 16,
    color: "white !important",
    "-webkit-text-fill-color": "white !important",
  },
}));

// const SelectInput = styled(InputBase)(({ theme }) => ({
//   "label + &": {
//     color: "white !important",
//   },
//   "& .MuiInputBase-input": {
//     borderRadius: 4,
//     border: "1px solid #ffff",
//     fontSize: 16,
//     padding: "8px 26px 7px 12px",
//     color: "white !important",
//     "-webkit-text-fill-color": "white !important",
//   },
//   ".MuiSvgIcon-root ": {
//     fill: "white !important",
//   },
//   "& .MuiInputLabel": {
//     root: {
//       color: "white !important",
//     },
//   },
// }));

const stores = [
  {
    value: "1",
    label: "Taters Cash and Carry Mall",
  },
  {
    value: "2",
    label: "Taters Robinsons Magnolia",
  },
  {
    value: "3",
    label: "Taters SM Megamall",
  },
];

export default function BSCStoreSelect() {
  const [store, setStore] = React.useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStore(event.target.value as string);
  };
  return (
    <SelectField
      value={store}
      fullWidth
      select
      size="small"
      variant="outlined"
      label="Store"
      onChange={handleChange}
    >
      {stores.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </SelectField>
  );
}
