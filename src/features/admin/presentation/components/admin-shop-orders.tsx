import {
  Column,
  DataTable,
  DataTableCell,
  DataTableRow,
} from "../../../shared/presentation/components/data-table";
import { ExtractBtn } from "../components/extract-btn";
import { useEffect, useState } from "react";
import {
  useAppDispatch,
  useAppSelector,
  useQuery,
} from "features/config/hooks";
import {
  getAdminShopOrders,
  resetGetAdminShopOrdersStatus,
  selectGetAdminShopOrders,
} from "../slices/get-admin-shop-orders.slice";
import { createSearchParams, useNavigate } from "react-router-dom";
import NumberFormat from "react-number-format";
import {
  ADMIN_SNACKSHOP_MOP_STATUS,
  ADMIN_SNACKSHOP_ORDER_STATUS,
} from "features/shared/constants";
import Moment from "react-moment";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { FaEye } from "react-icons/fa";
import { AdminShopOrderModal } from "../modals";
import { getAdminShopOrder } from "../slices/get-admin-shop-order.slice";

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
  const pageNo = query.get("page_no");
  const perPage = query.get("per_page");
  const status = query.get("status");
  const trackingNo = query.get("trackingNo");

  const [openAdminShopOrderModal, setOpenAdminShopOrderModal] = useState(false);

  const getAdminShopOrdersState = useAppSelector(selectGetAdminShopOrders);

  useEffect(() => {
    if (trackingNo) {
      dispatch(getAdminShopOrder(trackingNo));
      setOpenAdminShopOrderModal(true);
    }
  }, [dispatch, trackingNo]);

  useEffect(() => {
    dispatch(
      getAdminShopOrders({
        page_no: pageNo,
        per_page: perPage,
        status: status,
      })
    );
  }, [dispatch, pageNo, status, perPage]);

  return (
    <>
      <div className="p-4 space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-end">
          <span className="text-secondary text-3xl font-['Bebas_Neue'] flex-1">
            List of Orders
          </span>
          <div className="flex">
            <Select
              size="small"
              defaultValue={status}
              onChange={(event) => {
                if (status && event.target.value !== status) {
                  dispatch(resetGetAdminShopOrdersStatus());
                  navigate(
                    `?page_no=1&per_page=${perPage}&status=${event.target.value}`
                  );
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

        {getAdminShopOrdersState.data?.orders ? (
          <DataTable
            columns={columns}
            onRowsPerPageChange={(event) => {
              // if (
              //   getAdminShopOrdersState.data &&
              //   perPage !== parseInt(event.target.value)
              // ) {
              //   dispatch(resetGetAdminShopOrdersStatus());
              //   navigate(
              //     `?page_no=${pageNo}&per_page=${event.target.value}${
              //       status !== -1 ? "&status=" + status : ""
              //     }`
              //   );
              // }
            }}
            onPageChange={(event, newPage) => {
              // if (getAdminShopOrdersState.data && newPage !== pageNo) {
              //   dispatch(resetGetAdminShopOrdersStatus());
              //   navigate(
              //     `/admin/order?page_no=${newPage}&per_page=${
              //       getAdminShopOrdersState.data.pagination.per_page
              //     }${status !== -1 ? "&status=" + status : ""}`
              //   );
              // }
            }}
            totalRows={getAdminShopOrdersState.data.pagination.total_rows}
            perPage={getAdminShopOrdersState.data.pagination.per_page}
            page={pageNo ? parseInt(pageNo) : 0}
          >
            {getAdminShopOrdersState.data.orders !== undefined ? (
              <>
                {getAdminShopOrdersState.data.orders.map((row, i) => (
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
                      <button
                        onClick={() => {
                          // const params = {
                          //   page_no: pageNo,
                          //   per_page: perPage,
                          //   status: status,
                          //   tracking_no: trackingNo,
                          // };
                          // navigate({
                          //   pathname: "",
                          //   search: `?${createSearchParams(params)}`,
                          // });
                          // navigate(
                          //   `?page_no=${pageNo}&per_page=${perPage}&status=${status}&trans_no=${row.tracking_no}`
                          // );
                        }}
                      >
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

      <AdminShopOrderModal
        open={openAdminShopOrderModal}
        onClose={() => {
          navigate(`?page_no=${pageNo}&per_page=${perPage}&status=${status}`);
          setOpenAdminShopOrderModal(false);
        }}
      />
    </>
  );
}
