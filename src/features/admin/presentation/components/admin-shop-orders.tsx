import {
  Column,
  DataTable,
  DataTableCell,
  DataTableRow,
} from "../../../shared/presentation/components/data-table";
import { ExtractBtn } from "../components/extract-btn";
import { useEffect } from "react";
import {
  useAppDispatch,
  useAppSelector,
  useQuery,
} from "features/config/hooks";
import {
  getAdminSnackshopOrders,
  resetGetAdminSnackshopOrdersStatus,
  selectGetAdminSnackshopOrders,
} from "../slices/get-admin-snackshop-orders.slice";
import { Link, useNavigate } from "react-router-dom";
import NumberFormat from "react-number-format";
import { AdminSnackshopOrderModel } from "features/admin/core/domain/admin-snackshop-order.model";
import {
  ADMIN_SNACKSHOP_MOP_STATUS,
  ADMIN_SNACKSHOP_ORDER_STATUS,
} from "features/shared/constants";
import Moment from "react-moment";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { FaEye } from "react-icons/fa";

const columns: Array<Column> = [
  { id: "status", label: "Status" },
  { id: "dateadded", label: "Order Date" },
  { id: "tracking_no", label: "Tracking No." },
  { id: "client_name", label: "Client Name" },
  { id: "purchase_amount", label: "Amount" },
  { id: "store_name", label: "Hub" },
  { id: "payops", label: "Mode of Payment" },
  { id: "invoice_num", label: "Invoice Number" },
  { id: "action", label: "Action" },
];

export function AdminShopOrders() {
  const dispatch = useAppDispatch();
  const query = useQuery();
  const navigate = useNavigate();
  const pageNoQuery = query.get("page_no");
  const perPageQuery = query.get("per_page");
  const statusQuery = query.get("status");
  const pageNo = pageNoQuery !== null ? parseInt(pageNoQuery) : 1;
  const perPage = perPageQuery !== null ? parseInt(perPageQuery) : 25;
  const status = statusQuery !== null ? parseInt(statusQuery) : -1;

  const getAdminSnackshopOrdersState = useAppSelector(
    selectGetAdminSnackshopOrders
  );

  useEffect(() => {
    dispatch(
      getAdminSnackshopOrders({
        page_no: pageNo,
        per_page: perPage,
        status: status !== -1 ? status : null,
      })
    );
  }, [dispatch, query, pageNo, status, perPage]);

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-end">
        <span className="text-secondary text-3xl font-['Bebas_Neue'] flex-1">
          List of Orders
        </span>
        <div className="flex">
          <Select
            size="small"
            defaultValue={status}
            onChange={(event) => {
              if (event.target.value !== -1 && event.target.value !== status) {
                dispatch(resetGetAdminSnackshopOrdersStatus());
                navigate(
                  `?page_no=1&per_page=${perPage}&status=${event.target.value}`
                );
              } else if (
                event.target.value === -1 &&
                event.target.value !== status
              ) {
                dispatch(resetGetAdminSnackshopOrdersStatus());
                navigate(`?page_no=1&per_page=${perPage}`);
              }
            }}
          >
            <MenuItem value={-1}>All</MenuItem>
            {ADMIN_SNACKSHOP_ORDER_STATUS.map((value, index) => {
              if (index === 0) {
                return null;
              }
              return (
                <MenuItem key={index} value={index}>
                  {value}
                </MenuItem>
              );
            })}
          </Select>
          <ExtractBtn />
        </div>
      </div>

      {getAdminSnackshopOrdersState.data?.orders ? (
        <DataTable
          columns={columns}
          onRowsPerPageChange={(event) => {
            if (
              getAdminSnackshopOrdersState.data &&
              perPage !== parseInt(event.target.value)
            ) {
              dispatch(resetGetAdminSnackshopOrdersStatus());
              navigate(
                `?page_no=${pageNo}&per_page=${event.target.value}${
                  status !== -1 ? "&status=" + status : ""
                }`
              );
            }
          }}
          onPageChange={(event, newPage) => {
            if (getAdminSnackshopOrdersState.data && newPage !== pageNo) {
              dispatch(resetGetAdminSnackshopOrdersStatus());
              navigate(
                `/admin/order?page_no=${newPage}&per_page=${
                  getAdminSnackshopOrdersState.data.pagination.per_page
                }${status !== -1 ? "&status=" + status : ""}`
              );
            }
          }}
          totalRows={getAdminSnackshopOrdersState.data.pagination.total_rows}
          perPage={getAdminSnackshopOrdersState.data.pagination.per_page}
          page={pageNo}
        >
          {getAdminSnackshopOrdersState.data.orders !== undefined ? (
            <>
              {getAdminSnackshopOrdersState.data.orders.map((row, i) => (
                <DataTableRow key={i}>
                  <DataTableCell>
                    <span>{ADMIN_SNACKSHOP_ORDER_STATUS[row.status]}</span>
                  </DataTableCell>
                  <DataTableCell>
                    <Moment format="LLL">{row.dateadded}</Moment>
                  </DataTableCell>
                  <DataTableCell>{row.tracking_no}</DataTableCell>
                  <DataTableCell>{row.client_name}</DataTableCell>
                  <DataTableCell>
                    <NumberFormat
                      value={parseInt(row.purchase_amount).toFixed(2)}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"₱"}
                    />
                  </DataTableCell>
                  <DataTableCell>{row.store_name}</DataTableCell>
                  <DataTableCell>
                    <span>{ADMIN_SNACKSHOP_MOP_STATUS[row.status]}</span>
                  </DataTableCell>
                  <DataTableCell>{row.invoice_num}</DataTableCell>
                  <DataTableCell align="left">
                    <button>
                      <FaEye className="text-lg" />
                    </button>
                  </DataTableCell>
                </DataTableRow>
              ))}
            </>
          ) : null}
        </DataTable>
      ) : null}
    </div>
  );
}
