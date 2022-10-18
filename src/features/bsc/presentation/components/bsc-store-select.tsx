import {
  InputBase,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  styled,
} from "@mui/material";
import React from "react";

const SelectInput = styled(InputBase)(({ theme }) => ({
  //   "label + &": {
  //     marginTop: theme.spacing(3),
  //   },
  //   "& .MuiInputBase-input": {
  //     borderRadius: 4,
  //     position: "relative",
  //     backgroundColor: theme.palette.background.paper,
  //     border: "1px solid #ced4da",
  //     fontSize: 16,
  //     padding: "10px 26px 10px 12px",
  //   },
  // }));
  "icon ": {
    color: "white !important",
  },
  "label + &": {
    color: "white !important",
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    border: "1px solid #ffff",
    fontSize: 16,
    padding: "8px 26px 7px 12px",
    color: "white !important",
    "-webkit-text-fill-color": "white !important",
  },
  ".MuiSvgIcon-root ": {
    fill: "white !important",
  },
}));

export default function BSCStoreSelect() {
  const [store, setStore] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setStore(event.target.value as string);
  };
  return (
    <Select
      value={store}
      fullWidth
      size="small"
      variant="outlined"
      placeholder="Store"
      label="Store"
      onChange={handleChange}
      input={<SelectInput />}
    >
      <MenuItem value={1}>Taters SM Manila</MenuItem>
      <MenuItem value={2}>Taters Robinsons Magnolia</MenuItem>
    </Select>
  );
}
