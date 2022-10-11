import {
  Column,
  DataTable,
  DataTableCell,
  DataTableRow,
} from "../../../shared/presentation/components/data-table";
import { useEffect, useState } from "react";
import {
  useAppDispatch,
  useAppSelector,
  useQuery,
} from "features/config/hooks";
import {
  getAdminCateringBookings,
  resetGetAdminCateringBookingsStatus,
  selectGetAdminCateringBookings,
} from "../slices/get-admin-catering-bookings.slice";
import { useNavigate } from "react-router-dom";
import NumberFormat from "react-number-format";
import {
  ADMIN_SNACKSHOP_MOP_STATUS,
  ADMIN_CATERING_BOOKING_STATUS,
} from "features/shared/constants";
import Moment from "react-moment";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { FaEye } from "react-icons/fa";
import { DataList } from "features/shared/presentation/components";
import { selectAdminPrivilege } from "../slices/admin-privilege.slice";
import { AdminCateringBookingModel } from "features/admin/core/domain/admin-catering-booking.model";
import moment from "moment";
import { AdminCateringBookingModal } from "../modals";
import { getAdminCateringBooking } from "../slices/get-admin-catering-booking.slice";
import { selectAdminCateringBookingUpdateStatus } from "../slices/admin-catering-booking-update-status.slice";

const columns: Array<Column> = [
  { id: "status", label: "Status", minWidth: 250 },
  { id: "dateadded", label: "Order Date" },
  { id: "serving_time", label: "Event Date" },
  { id: "tracking_no", label: "Tracking No." },
  { id: "client_name", label: "Client Name" },
  { id: "purchase_amount", label: "Amount" },
  { id: "store_name", label: "Store" },
  { id: "payops", label: "Mode of Payment" },
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

export function AdminCateringBookings() {
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

  const [openAdminCateringBookingModal, setOpenAdminCateringBookingModal] =
    useState(false);
  const getAdminCateringBookingsState = useAppSelector(
    selectGetAdminCateringBookings
  );
  const adminCateringBookingUpdateStatusState = useAppSelector(
    selectAdminCateringBookingUpdateStatus
  );

  const adminPrivilegeState = useAppSelector(selectAdminPrivilege);

  useEffect(() => {
    if (trackingNo) {
      dispatch(getAdminCateringBooking(trackingNo)).then(() => {
        setOpenAdminCateringBookingModal(true);
      });
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
    dispatch(getAdminCateringBookings(query));
  }, [
    dispatch,
    pageNo,
    status,
    perPage,
    orderBy,
    order,
    search,
    adminPrivilegeState,
    adminCateringBookingUpdateStatusState,
  ]);

  const calculateGrandTotal = (row: AdminCateringBookingModel) => {
    let calculatedPrice = 0;

    if (row.purchase_amount) {
      calculatedPrice += parseInt(row.purchase_amount);
    }

    if (row.service_fee) {
      calculatedPrice += row.service_fee;
    }

    if (row.night_diff_fee) {
      calculatedPrice += row.night_diff_fee;
    }

    if (row.additional_hour_charge) {
      calculatedPrice += row.additional_hour_charge;
    }

    if (row.cod_fee) {
      calculatedPrice += parseInt(row.cod_fee);
    }
    if (row.distance_price) {
      calculatedPrice += parseInt(row.distance_price);
    }

    return (
      <NumberFormat
        value={calculatedPrice.toFixed(2)}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"₱"}
      />
    );
  };

  return (
    <>
      <div className="flex flex-col px-4 lg:flex-row lg:items-end">
        <span className="text-secondary text-3xl font-['Bebas_Neue'] flex-1">
          Catering Bookings
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

                dispatch(resetGetAdminCateringBookingsStatus());
                navigate({
                  pathname: "",
                  search: queryParams,
                });
              }
            }}
          >
            <MenuItem value={-1}>All</MenuItem>
            {ADMIN_CATERING_BOOKING_STATUS.map((value, index) => {
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

      {getAdminCateringBookingsState.data?.bookings ? (
        <>
          <div className="p-4 lg:hidden">
            <DataList
              search={search ?? ""}
              emptyMessage="No catering bookings yet."
              onSearch={(val) => {
                const params = {
                  page_no: null,
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

                  dispatch(resetGetAdminCateringBookingsStatus());
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

                  dispatch(resetGetAdminCateringBookingsStatus());
                  navigate({
                    pathname: "",
                    search: queryParams,
                  });
                }
              }}
              totalRows={
                getAdminCateringBookingsState.data.pagination.total_rows
              }
              perPage={getAdminCateringBookingsState.data.pagination.per_page}
              page={pageNo ? parseInt(pageNo) : 1}
            >
              <hr className="mt-4" />
              {getAdminCateringBookingsState.data.bookings.map((row, i) => (
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
                  className="flex flex-col px-4 py-2 border-b"
                  key={i}
                >
                  <span className="flex flex-wrap items-center space-x-1 text-xl">
                    <span>{row.client_name}</span>
                    <span className="text-lg text-gray-600">
                      #{row.tracking_no}
                    </span>
                    <span
                      className="px-2 py-1 text-xs rounded-full "
                      style={{
                        color: "white",
                        backgroundColor:
                          ADMIN_CATERING_BOOKING_STATUS[row.status].color,
                      }}
                    >
                      {ADMIN_CATERING_BOOKING_STATUS[row.status].name}
                    </span>
                  </span>
                  <span className="text-xs">
                    <strong>Hub:</strong> {row.store_name}
                  </span>

                  <div className="flex justify-between">
                    <span className="text-xs">
                      <Moment format="LLL">{row.dateadded}</Moment>
                    </span>
                    <span className="text-lg font-semibold">
                      {calculateGrandTotal(row)}
                    </span>
                  </div>
                </div>
              ))}
            </DataList>
          </div>
          <div className="hidden p-4 lg:block">
            <DataTable
              order={order === "asc" ? "asc" : "desc"}
              orderBy={orderBy ?? "dateadded"}
              emptyMessage="No catering bookings yet."
              search={search ?? ""}
              onSearch={(val) => {
                const params = {
                  page_no: null,
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
                if (column_selected != "action") {
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

                  dispatch(resetGetAdminCateringBookingsStatus());
                  navigate({
                    pathname: "",
                    search: queryParams,
                  });
                }
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

                  dispatch(resetGetAdminCateringBookingsStatus());
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

                  dispatch(resetGetAdminCateringBookingsStatus());
                  navigate({
                    pathname: "",
                    search: queryParams,
                  });
                }
              }}
              totalRows={
                getAdminCateringBookingsState.data.pagination.total_rows
              }
              perPage={getAdminCateringBookingsState.data.pagination.per_page}
              page={pageNo ? parseInt(pageNo) : 1}
            >
              {getAdminCateringBookingsState.data.bookings !== undefined ? (
                <>
                  {getAdminCateringBookingsState.data.bookings.map((row, i) => (
                    <DataTableRow key={i}>
                      <DataTableCell>
                        <span
                          className="px-2 py-1 text-xs rounded-full "
                          style={{
                            color: "white",
                            backgroundColor:
                              ADMIN_CATERING_BOOKING_STATUS[row.status].color,
                          }}
                        >
                          {ADMIN_CATERING_BOOKING_STATUS[row.status].name}
                        </span>
                      </DataTableCell>
                      <DataTableCell>
                        <Moment format="LLL">{row.dateadded}</Moment>
                      </DataTableCell>
                      <DataTableCell>
                        <Moment format="LLL">
                          {moment.unix(parseInt(row.serving_time))}
                        </Moment>
                      </DataTableCell>
                      <DataTableCell>{row.tracking_no}</DataTableCell>
                      <DataTableCell>{row.client_name}</DataTableCell>
                      <DataTableCell>{calculateGrandTotal(row)}</DataTableCell>
                      <DataTableCell>{row.store_name}</DataTableCell>
                      <DataTableCell>
                        <span>{ADMIN_SNACKSHOP_MOP_STATUS[row.payops]}</span>
                      </DataTableCell>
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

      <AdminCateringBookingModal
        open={openAdminCateringBookingModal}
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
          setOpenAdminCateringBookingModal(false);
        }}
      />
    </>
  );
}
