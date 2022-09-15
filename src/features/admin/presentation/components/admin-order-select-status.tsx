import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

export default function OrderSelectStatus() {
  const [status, setStatus] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value as string);
  };

  return (
    <Box className="mt-4 w-80 xl:-ml-12 md:w-60">
      <FormControl fullWidth size="small">
        <InputLabel id="select-label">Select Status</InputLabel>
        <Select
          labelId="select-status"
          id="simple-select"
          value={status}
          label="Select Status"
          onChange={handleChange}
        >
          <MenuItem value={1}>All</MenuItem>
          <MenuItem value={2}>New</MenuItem>
          <MenuItem value={3}>Declined</MenuItem>
          <MenuItem value={4}>Paid</MenuItem>
          <MenuItem value={5}>Rejected</MenuItem>
          <MenuItem value={6}>Cancelled</MenuItem>
          <MenuItem value={7}>Confirmed</MenuItem>
          <MenuItem value={8}>Preparing</MenuItem>
          <MenuItem value={9}>For Dispatch</MenuItem>
          <MenuItem value={10}>Completed</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
