import {
  useAppDispatch,
  useAppSelector,
  useQuery,
} from "features/config/hooks";
import { FaEye } from "react-icons/fa";
import Moment from "react-moment";
import { Link, useNavigate } from "react-router-dom";
import {
  Column,
  DataTable,
  DataTableCell,
  DataTableRow,
} from "../../../shared/presentation/components/data-table";
import { useEffect, useRef } from "react";
import { ProfileContainer } from "../components";
import NumberFormat from "react-number-format";
import { DataList } from "features/shared/presentation/components";
import {
  getCateringBookingHistory,
  resetGetCateringBookingHistoryStatus,
  selectGetCateringBookingHistory,
} from "features/profile/presentation/slices/get-catering-booking-history.slice";
import { CateringBookingModel } from "features/profile/core/domain/catering-booking.model";
import { CATERING_BOOKING_STATUS } from "features/shared/constants";
import { createQueryParams } from "features/config/helpers";
import { VscCircleFilled } from "react-icons/vsc";
import { selectGetNotifications } from "features/shared/presentation/slices/get-notifications.slice";
import { NotificationModel } from "features/shared/core/domain/notification.model";
import { seenNotification } from "features/shared/presentation/slices/seen-notification.slice";

const columns: Array<Column> = [
  { id: "date", label: "Date" },
  { id: "trackingNo", label: "Tracking No." },
  { id: "purchaseAmount", label: "Purchase Amount" },
  { id: "bookingStatus", label: "Booking Status" },
  { id: "view", label: "View" },
];

export function ProfileCateringBookings() {
  const dispatch = useAppDispatch();
  const query = useQuery();
  const navigate = useNavigate();
  const getCateringBookingHistoryState = useAppSelector(
    selectGetCateringBookingHistory
  );

  const getNotificationsState = useAppSelector(selectGetNotifications);

  const pageNo = query.get("page_no");
  const perPage = query.get("per_page");
  const orderBy = query.get("order_by");
  const order = query.get("order");
  const search = query.get("search");

  useEffect(() => {
    const query = createQueryParams({
      page_no: pageNo,
      per_page: perPage,
      order_by: orderBy,
      order: order,
      search: search,
    });
    dispatch(getCateringBookingHistory(query));
  }, [dispatch, pageNo, perPage, orderBy, order, search]);

  const calculateGrandTotal = (row: CateringBookingModel) => {
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
    <ProfileContainer title="Catering Bookings" activeTab="catering">
      <h1 className="text-secondary font-['Bebas_Neue'] tracking-[3px] text-3xl leading-6">
        Catering Bookings
      </h1>
      {getCateringBookingHistoryState.data?.bookings ? (
        <>
          <div className="py-4 lg:hidden">
            <DataList
              emptyMessage="No catering bookings yet."
              search={search ?? ""}
              onSearch={(val) => {
                const params = {
                  page_no: null,
                  per_page: perPage,
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
                    search: search,
                  };

                  const queryParams = createQueryParams(params);

                  dispatch(resetGetCateringBookingHistoryStatus());
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
                    search: search,
                  };

                  const queryParams = createQueryParams(params);

                  dispatch(resetGetCateringBookingHistoryStatus());
                  navigate({
                    pathname: "",
                    search: queryParams,
                  });
                }
              }}
              totalRows={
                getCateringBookingHistoryState.data.pagination.total_rows
              }
              perPage={getCateringBookingHistoryState.data.pagination.per_page}
              page={pageNo ? parseInt(pageNo) : 1}
            >
              <hr className="mt-4" />
              {getCateringBookingHistoryState.data.bookings.map((row, i) => {
                const notification: NotificationModel | undefined =
                  getNotificationsState.data?.catering_booking.unseen_notifications.find(
                    (notification) =>
                      notification.catering_transaction_tb_id === row.id
                  );

                return (
                  <Link
                    onClick={() => {
                      if (notification) {
                        dispatch(seenNotification(notification.id));
                      }
                    }}
                    to={`/shop/${row.status <= 3 ? "contract" : "order"}/${
                      row.hash_key
                    }`}
                    className={`flex flex-col px-4 py-2 border-b ${
                      notification ? "bg-gray-200" : ""
                    } `}
                    key={i}
                  >
                    <span className="flex items-center justify-between space-x-1 text-xl">
                      <span className="text-lg text-gray-600">
                        #{row.tracking_no}
                      </span>

                      <span
                        className="px-2 py-1 text-xs rounded-full "
                        style={{
                          color: "white",
                          backgroundColor:
                            CATERING_BOOKING_STATUS[row.status].color,
                        }}
                      >
                        {CATERING_BOOKING_STATUS[row.status].name}
                      </span>
                      {notification ? (
                        <VscCircleFilled className="text-red-600 " />
                      ) : null}
                    </span>
                    <div className="flex justify-between">
                      <span className="text-xs">
                        <Moment format="LLL">{row.dateadded}</Moment>
                      </span>
                      <span className="text-lg font-semibold">
                        {calculateGrandTotal(row)}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </DataList>
          </div>
          <div className="hidden lg:block">
            <DataTable
              order={order === "asc" ? "asc" : "desc"}
              emptyMessage="No catering bookings yet."
              orderBy={orderBy ?? "dateadded"}
              search={search ?? ""}
              onSearch={(val) => {
                const params = {
                  page_no: null,
                  per_page: perPage,
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
                if (column_selected !== "view") {
                  const isAsc = orderBy === column_selected && order === "asc";

                  const params = {
                    page_no: pageNo,
                    per_page: perPage,
                    order_by: column_selected,
                    order: isAsc ? "desc" : "asc",
                    search: search,
                  };

                  const queryParams = createQueryParams(params);

                  dispatch(resetGetCateringBookingHistoryStatus());
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
                    order_by: orderBy,
                    order: order,
                    search: search,
                  };

                  const queryParams = createQueryParams(params);

                  dispatch(resetGetCateringBookingHistoryStatus());
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
                    order_by: orderBy,
                    order: order,
                    search: search,
                  };

                  const queryParams = createQueryParams(params);

                  dispatch(resetGetCateringBookingHistoryStatus());
                  navigate({
                    pathname: "",
                    search: queryParams,
                  });
                }
              }}
              totalRows={
                getCateringBookingHistoryState.data.pagination.total_rows
              }
              perPage={getCateringBookingHistoryState.data.pagination.per_page}
              page={pageNo ? parseInt(pageNo) : 1}
            >
              {getCateringBookingHistoryState.data.bookings !== undefined ? (
                <>
                  {getCateringBookingHistoryState.data.bookings.map(
                    (row, i) => {
                      const notification: NotificationModel | undefined =
                        getNotificationsState.data?.catering_booking.unseen_notifications.find(
                          (notification) =>
                            notification.catering_transaction_tb_id === row.id
                        );

                      return (
                        <DataTableRow
                          className={`${notification ? "bg-gray-200" : ""}`}
                          key={i}
                        >
                          <DataTableCell>
                            <Moment format="LLL">{row.dateadded}</Moment>
                          </DataTableCell>
                          <DataTableCell>{row.tracking_no}</DataTableCell>
                          <DataTableCell>
                            {calculateGrandTotal(row)}
                          </DataTableCell>
                          <DataTableCell>
                            <span
                              className="px-2 py-1 text-xs rounded-full "
                              style={{
                                color: "white",
                                backgroundColor:
                                  CATERING_BOOKING_STATUS[row.status].color,
                              }}
                            >
                              {CATERING_BOOKING_STATUS[row.status].name}
                            </span>
                          </DataTableCell>
                          <DataTableCell align="left">
                            <Link
                              onClick={() => {
                                if (notification) {
                                  dispatch(seenNotification(notification.id));
                                }
                              }}
                              to={`/shop/${
                                row.status <= 3 ? "contract" : "order"
                              }/${row.hash_key}`}
                            >
                              <FaEye
                                className={`text-lg ${
                                  notification ? "text-red-600" : null
                                }`}
                              />
                            </Link>
                          </DataTableCell>
                        </DataTableRow>
                      );
                    }
                  )}
                </>
              ) : null}
            </DataTable>
          </div>
        </>
      ) : null}
    </ProfileContainer>
  );
}
