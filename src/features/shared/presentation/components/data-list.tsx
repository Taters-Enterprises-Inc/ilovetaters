import * as React from "react";
import Pagination from "@mui/material/Pagination";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { ReactNode } from "react";

interface DataListProps {
  page: number;
  children: ReactNode;
  onPageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
  onSearch: (value: string) => void;
  search: string;
  totalRows: number;
  perPage: number;
  onRowsPerPageChange: (event: SelectChangeEvent) => void;
}

export function DataList(props: DataListProps) {
  return (
    <div>
      <div className="flex flex-col lg:flex-row space-y-2 lg:space-y-0">
        <div className="flex  flex-1 space-x-4">
          <TextField
            required
            label="Search"
            variant="outlined"
            size="small"
            defaultValue={props.search}
            onChange={(e) => {
              props.onSearch(e.target.value);
            }}
          />
          <Select
            size="small"
            defaultValue={props.perPage.toString()}
            onChange={props.onRowsPerPageChange}
          >
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={25}>25</MenuItem>
            <MenuItem value={50}>50</MenuItem>
            <MenuItem value={100}>100</MenuItem>
          </Select>
        </div>

        <Pagination
          siblingCount={0}
          page={props.page}
          onChange={props.onPageChange}
          count={Math.floor(props.totalRows / props.perPage)}
          variant="outlined"
          shape="rounded"
        />
      </div>

      {props.children}
    </div>
  );
}
