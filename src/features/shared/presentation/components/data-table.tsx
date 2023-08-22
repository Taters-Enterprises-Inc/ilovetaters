import { ChangeEventHandler } from "react";
import styled from "@mui/material/styles/styled";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import Pagination from "@mui/material/Pagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TableHead from "@mui/material/TableHead";
import MenuItem from "@mui/material/MenuItem";
import { ReactNode } from "react";
import { visuallyHidden } from "@mui/utils";
import TableSortLabel from "@mui/material/TableSortLabel";
import Box from "@mui/material/Box";
import { MaterialInput } from "./material-input";

export const DataTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    fontSize: 12,
    backgroundColor: "#22201A",
    fontFamily: "Varela Round",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
    fontFamily: "Varela Round",
  },
}));

export const DataTableRow = styled(TableRow)(({ theme }) => ({
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

export interface Row {
  rowKey: string;
  rowComponent?: (row: any) => React.ReactNode;
  align: "left" | "right";
}

interface DataTableProps {
  columns: Array<Column>;
  page: number;
  order: "asc" | "desc";
  orderBy: string;
  children: ReactNode;
  onPageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
  onRequestSort: (property: string) => void;
  onSearch: (value: string) => void;
  search: string;
  totalRows: number;
  perPage: number;
  emptyMessage: string;
  onRowsPerPageChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  >;
}

export function DataTable(props: DataTableProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-2 lg:flex-row lg:space-y-0">
        <div className="flex flex-1 space-x-4">
          <MaterialInput
            colorTheme="black"
            label="Search"
            size="small"
            name="search"
            defaultValue={props.search}
            onChange={(e) => {
              props.onSearch(e.target.value);
            }}
          />
          <MaterialInput
            colorTheme="black"
            size="small"
            name="perPage"
            select
            value={props.perPage.toString()}
            onChange={props.onRowsPerPageChange}
          >
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={25}>25</MenuItem>
            <MenuItem value={50}>50</MenuItem>
            <MenuItem value={100}>100</MenuItem>
          </MaterialInput>
        </div>

        <Pagination
          page={props.page}
          onChange={props.onPageChange}
          count={
            Number.isFinite(Math.round(props.totalRows / props.perPage))
              ? Math.round(props.totalRows / props.perPage)
              : 0
          }
          variant="outlined"
          shape="rounded"
        />
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <TableHead>
            <DataTableRow>
              {props.columns.map((column, i) => (
                <DataTableCell
                  key={i}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                  sortDirection={
                    props.orderBy === column.id ? props.order : false
                  }
                >
                  <TableSortLabel
                    active={props.orderBy === column.id}
                    direction={
                      props.orderBy === column.id ? props.order : "asc"
                    }
                    onClick={() => {
                      props.onRequestSort(column.id);
                    }}
                  >
                    {column.label}
                    {props.orderBy === column.id ? (
                      <Box component="span" sx={visuallyHidden}>
                        {props.order === "desc"
                          ? "sorted descending"
                          : "sorted ascending"}
                      </Box>
                    ) : null}
                  </TableSortLabel>
                </DataTableCell>
              ))}
            </DataTableRow>
          </TableHead>
          <TableBody>{props.children}</TableBody>
        </Table>

        {props.totalRows <= 0 ? (
          <div className="py-4 text-center">{props.emptyMessage}</div>
        ) : null}
      </TableContainer>
    </div>
  );
}
