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
import { useNavigate } from "react-router-dom";
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
import {
  getAdminShopOrder,
  GetAdminShopOrderState,
  selectGetAdminShopOrder,
} from "../slices/get-admin-shop-order.slice";
import { DataList } from "features/shared/presentation/components";

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

const createQueryParams = (params: object): string => {
  let result = "?";
  const paramsEntries = Object.entries(params);

  for (let [key, value] of paramsEntries) {
    if (value !== null) {
      result += `${key}=${value}&`;
    }
  }
  result = result.slice(0, -1);

  return result;
};

export function AdminShopOrders() {
  const dispatch = useAppDispatch();
  const query = useQuery();
  const navigate = useNavigate();
  const pageNo = query.get("page_no");
  const perPage = query.get("per_page");
  const status = query.get("status");
  const trackingNo = query.get("tracking_no");
  const orderBy = query.get("order_by");
  const order = query.get("order");
  const search = query.get("search");

  const [openAdminShopOrderModal, setOpenAdminShopOrderModal] = useState(false);
  const getAdminShopOrdersState = useAppSelector(selectGetAdminShopOrders);
  const getAdminShopOrderState = useAppSelector(selectGetAdminShopOrder);

  useEffect(() => {
    if (getAdminShopOrderState.status === GetAdminShopOrderState.success) {
      setOpenAdminShopOrderModal(true);
    }
  }, [getAdminShopOrderState]);

  useEffect(() => {
    if (trackingNo) {
      dispatch(getAdminShopOrder(trackingNo));
    }
  }, [dispatch, trackingNo]);

  useEffect(() => {
    const query = createQueryParams({
      page_no: pageNo,
      per_page: perPage,
      status: status,
      order_by: orderBy,
      order: order,
      search: search,
    });
    dispatch(getAdminShopOrders(query));
  }, [dispatch, pageNo, status, perPage, orderBy, order, search]);

  return (
    <>
      <div className="flex flex-col lg:flex-row lg:items-end px-4">
        <span className="text-secondary text-3xl font-['Bebas_Neue'] flex-1">
          List of Orders
        </span>
        <div className="flex">
          <Select
            size="small"
            defaultValue={status ?? -1}
            onChange={(event) => {
              if (event.target.value !== status) {
                const params = {
                  page_no: pageNo,
                  per_page: perPage,
                  status: event.target.value === -1 ? null : event.target.value,
                  tracking_no: trackingNo,
                  search: search,
                };

                const queryParams = createQueryParams(params);

                dispatch(resetGetAdminShopOrdersStatus());
                navigate({
                  pathname: "",
                  search: queryParams,
                });
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
                  {value.name}
                </MenuItem>
              );
            })}
          </Select>
        </div>
      </div>

      {getAdminShopOrdersState.data?.orders ? (
        <>
          <div className="lg:hidden py-4">
            <DataList
              search={search ?? ""}
              onSearch={(val) => {
                const params = {
                  page_no: pageNo,
                  per_page: perPage,
                  status: status,
                  tracking_no: trackingNo,
                  order_by: orderBy,
                  order: order,
                  search: val === "" ? null : val,
                };

                const queryParams = createQueryParams(params);

                navigate({
                  pathname: "",
                  search: queryParams,
                });
              }}
              onRowsPerPageChange={(event) => {
                if (perPage !== event.target.value) {
                  const params = {
                    page_no: pageNo,
                    per_page: event.target.value,
                    status: status,
                    tracking_no: trackingNo,
                    search: search,
                  };

                  const queryParams = createQueryParams(params);

                  dispatch(resetGetAdminShopOrdersStatus());
                  navigate({
                    pathname: "",
                    search: queryParams,
                  });
                }
              }}
              onPageChange={(event, newPage) => {
                const pageNoInt = pageNo ? parseInt(pageNo) : null;
                if (newPage !== pageNoInt) {
                  const params = {
                    page_no: newPage,
                    per_page: perPage,
                    status: status,
                    tracking_no: trackingNo,
                    search: search,
                  };

                  const queryParams = createQueryParams(params);

                  dispatch(resetGetAdminShopOrdersStatus());
                  navigate({
                    pathname: "",
                    search: queryParams,
                  });
                }
              }}
              totalRows={getAdminShopOrdersState.data.pagination.total_rows}
              perPage={getAdminShopOrdersState.data.pagination.per_page}
              page={pageNo ? parseInt(pageNo) : 1}
            >
              <hr className="mt-4" />
              {getAdminShopOrdersState.data.orders.map((row, i) => (
                <div
                  onClick={() => {
                    const params = {
                      page_no: pageNo,
                      per_page: perPage,
                      status: status,
                      tracking_no: row.tracking_no,
                      search: search,
                    };

                    const queryParams = createQueryParams(params);

                    navigate({
                      pathname: "",
                      search: queryParams,
                    });
                  }}
                  className="flex flex-col border-b px-4 py-2"
                  key={i}
                >
                  <span className="text-xl">
                    {row.client_name}{" "}
                    <span className="text-gray-600 text-lg">
                      #{row.tracking_no}
                    </span>
                  </span>
                  <div className="flex space-x-2">
                    <span className="text-xs">
                      <strong>Status: </strong>
                      <span>
                        {ADMIN_SNACKSHOP_ORDER_STATUS[row.status].name}
                      </span>
                    </span>
                    <span className="text-xs">
                      <strong>Hub:</strong> {row.store_name}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-xs">09-18-22 / 01:23 PM</span>
                    <span className="text-lg font-semibold">
                      <NumberFormat
                        value={parseInt(row.purchase_amount).toFixed(2)}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"₱"}
                      />
                    </span>
                  </div>
                </div>
              ))}
            </DataList>
          </div>
          <div className="hidden lg:block p-4">
            <DataTable
              order={order === "asc" ? "asc" : "desc"}
              orderBy={orderBy ?? "dateadded"}
              search={search ?? ""}
              onSearch={(val) => {
                const params = {
                  page_no: pageNo,
                  per_page: perPage,
                  status: status,
                  tracking_no: trackingNo,
                  order_by: orderBy,
                  order: order,
                  search: val === "" ? null : val,
                };

                const queryParams = createQueryParams(params);

                navigate({
                  pathname: "",
                  search: queryParams,
                });
              }}
              onRequestSort={(column_selected) => {
                const isAsc = orderBy === column_selected && order === "asc";

                const params = {
                  page_no: pageNo,
                  per_page: perPage,
                  status: status,
                  tracking_no: trackingNo,
                  order_by: column_selected,
                  order: isAsc ? "desc" : "asc",
                  search: search,
                };

                const queryParams = createQueryParams(params);

                dispatch(resetGetAdminShopOrdersStatus());
                navigate({
                  pathname: "",
                  search: queryParams,
                });
              }}
              columns={columns}
              onRowsPerPageChange={(event) => {
                if (perPage !== event.target.value) {
                  const params = {
                    page_no: pageNo,
                    per_page: event.target.value,
                    status: status,
                    tracking_no: trackingNo,
                    order_by: orderBy,
                    order: order,
                    search: search,
                  };

                  const queryParams = createQueryParams(params);

                  dispatch(resetGetAdminShopOrdersStatus());
                  navigate({
                    pathname: "",
                    search: queryParams,
                  });
                }
              }}
              onPageChange={(event, newPage) => {
                const pageNoInt = pageNo ? parseInt(pageNo) : null;
                if (newPage !== pageNoInt) {
                  const params = {
                    page_no: newPage,
                    per_page: perPage,
                    status: status,
                    tracking_no: trackingNo,
                    order_by: orderBy,
                    order: order,
                    search: search,
                  };

                  const queryParams = createQueryParams(params);

                  dispatch(resetGetAdminShopOrdersStatus());
                  navigate({
                    pathname: "",
                    search: queryParams,
                  });
                }
              }}
              totalRows={getAdminShopOrdersState.data.pagination.total_rows}
              perPage={getAdminShopOrdersState.data.pagination.per_page}
              page={pageNo ? parseInt(pageNo) : 1}
            >
              {getAdminShopOrdersState.data.orders !== undefined ? (
                <>
                  {getAdminShopOrdersState.data.orders.map((row, i) => (
                    <DataTableRow key={i}>
                      <DataTableCell>
                        <span
                          className="font-bold"
                          style={{
                            color:
                              ADMIN_SNACKSHOP_ORDER_STATUS[row.status].color,
                          }}
                        >
                          {ADMIN_SNACKSHOP_ORDER_STATUS[row.status].name}
                        </span>
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
                            const params = {
                              page_no: pageNo,
                              per_page: perPage,
                              status: status,
                              tracking_no: row.tracking_no,
                              order_by: orderBy,
                              order: order,
                              search: search,
                            };

                            const queryParams = createQueryParams(params);

                            navigate({
                              pathname: "",
                              search: queryParams,
                            });
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
          </div>
        </>
      ) : null}

      <AdminShopOrderModal
        open={openAdminShopOrderModal}
        onClose={() => {
          const params = {
            page_no: pageNo,
            per_page: perPage,
            status: status,
            tracking_no: null,
            order_by: orderBy,
            order: order,
            search: search,
          };

          const queryParams = createQueryParams(params);

          navigate({
            pathname: "",
            search: queryParams,
          });
          setOpenAdminShopOrderModal(false);
        }}
      />
    </>
  );
}
