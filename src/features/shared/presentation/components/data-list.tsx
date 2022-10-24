import * as React from "react";
import Pagination from "@mui/material/Pagination";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { ReactNode } from "react";
import { MaterialInput } from "./material-input";
import { MaterialInputSelect } from "./material-input-select";

interface DataListProps {
  page: number;
  children: ReactNode;
  onPageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
  onSearch: (value: string) => void;
  search: string;
  totalRows: number;
  perPage: number;
  emptyMessage: string;
  onRowsPerPageChange: (event: SelectChangeEvent<unknown>) => void;
}

export function DataList(props: DataListProps) {
  return (
    <div>
      <div className="flex flex-col space-y-2 lg:flex-row lg:space-y-0">
        <div className="z-0 flex flex-1 space-x-4">
          <MaterialInput
            colorTheme="black"
            required
            label="Search"
            size="small"
            value={props.search}
            name="search"
            defaultValue={props.search}
            onChange={(e) => {
              props.onSearch(e.target.value);
            }}
          />
          <MaterialInputSelect
            colorTheme="black"
            size="small"
            defaultValue={props.perPage.toString()}
            onChange={props.onRowsPerPageChange}
          >
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={25}>25</MenuItem>
            <MenuItem value={50}>50</MenuItem>
            <MenuItem value={100}>100</MenuItem>
          </MaterialInputSelect>
        </div>

        <Pagination
          siblingCount={0}
          page={props.page}
          onChange={props.onPageChange}
          count={Math.round(props.totalRows / props.perPage)}
          variant="outlined"
          shape="rounded"
        />
      </div>

      {props.children}

      {props.totalRows <= 0 ? (
        <div className="py-4 text-center text-secondary">
          {props.emptyMessage}
        </div>
      ) : null}
    </div>
  );
}
