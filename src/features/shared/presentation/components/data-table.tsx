import * as React from "react";
import styled from "@mui/material/styles/styled";
import useTheme from "@mui/material/styles/useTheme";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import TableHead from "@mui/material/TableHead";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import "moment-timezone";

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: "white",
}));

const StyledTablePagination = styled(TablePagination)(({ theme }) => ({
  backgroundColor: "#22201A",
  color: "white",
  "& .MuiTablePagination-menuItem": {
    backgroundColor: "#22201A !important",
    color: "white",
  },
  "& .MuiTablePagination-selectIcon": {
    color: "white !important",
  },
  "& .Mui-disabled": {
    color: "rgba(255,255,255,0.2) !important;",
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#22201A",
    color: "white",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    backgroundColor: "#f8f8f8",
    color: "#22201A",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

interface DataTableActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
}

function DataTableActions(props: DataTableActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <StyledIconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </StyledIconButton>
      <StyledIconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </StyledIconButton>
      <StyledIconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </StyledIconButton>
      <StyledIconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </StyledIconButton>
    </Box>
  );
}

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
  rowsOrder: Array<Row>;
  viewBaseUrl?: string;
  rows: Array<any> | undefined;
}

export function DataTable(props: DataTableProps) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0
      ? Math.max(
          0,
          (1 + page) * rowsPerPage -
            (props.rows ? props.rows.length + (props.viewBaseUrl ? 1 : 0) : 0)
        )
      : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <TableHead>
          <StyledTableRow>
            {props.columns.map((column) => (
              <StyledTableCell
                key={column.id}
                align={column.align}
                style={{ minWidth: column.minWidth }}
              >
                {column.label}
              </StyledTableCell>
            ))}

            {props.viewBaseUrl ? (
              <StyledTableCell key="action" align="left">
                View
              </StyledTableCell>
            ) : null}
          </StyledTableRow>
        </TableHead>

        <TableBody>
          {props.rows !== undefined ? (
            <>
              {(rowsPerPage > 0
                ? props.rows.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : props.rows
              ).map((row, i) => (
                <StyledTableRow key={i}>
                  {props.rowsOrder.map((rowOrder, i) => (
                    <StyledTableCell key={i} align={rowOrder.align}>
                      {rowOrder.rowComponent
                        ? rowOrder.rowComponent(row)
                        : row[rowOrder.rowKey] || "N/A"}
                    </StyledTableCell>
                  ))}
                  {props.viewBaseUrl ? (
                    <StyledTableCell align="left">
                      <Link to={`${props.viewBaseUrl}/${row.hash_key}`}>
                        <FaEye className="text-lg" />
                      </Link>
                    </StyledTableCell>
                  ) : null}
                </StyledTableRow>
              ))}
              {emptyRows > 0 && (
                <StyledTableRow style={{ height: 53 * emptyRows }}>
                  <StyledTableCell colSpan={6} />
                </StyledTableRow>
              )}
            </>
          ) : null}
        </TableBody>
        <TableFooter>
          <StyledTableRow>
            <StyledTablePagination
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
              colSpan={props.columns.length + (props.viewBaseUrl ? 1 : 0)}
              count={
                props.rows ? props.rows.length + (props.viewBaseUrl ? 1 : 0) : 0
              }
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  "aria-label": "rows per page",
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={DataTableActions}
            />
          </StyledTableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
