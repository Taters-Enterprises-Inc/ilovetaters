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
import { useEffect } from "react";
import { ProfileContainer } from "../components";
import NumberFormat from "react-number-format";
import { DataList } from "features/shared/presentation/components";
import { CateringBookingModel } from "features/profile/core/domain/catering-booking.model";
import { ADMIN_POPCLUB_REDEEM_STATUS } from "features/shared/constants";
import {
  getPopclubRedeemsHistory,
  resetGetPopclubRedeemsHistoryStatus,
  selectGetPopclubRedeemsHistory,
} from "../slices/get-popclub-redeems-history.slice";
import { PopclubRedeemModel } from "features/profile/core/domain/popclub-redeem.model";
import moment from "moment";
import { createQueryParams } from "features/config/helpers";
import { selectGetNotifications } from "features/shared/presentation/slices/get-notifications.slice";
import { NotificationModel } from "features/shared/core/domain/notification.model";
import { seenNotification } from "features/shared/presentation/slices/seen-notification.slice";

const columns: Array<Column> = [
  { id: "dateadded", label: "Order Date" },
  { id: "expiration", label: "Valid Until" },
  { id: "redeem_code", label: "Redeem Code" },
  { id: "purchase_amount", label: "Purchase Amount" },
  { id: "status", label: "Redeem Status" },
  { id: "view", label: "View" },
];

export function ProfilePopclubRedeems() {
  const dispatch = useAppDispatch();

  const query = useQuery();
  const navigate = useNavigate();

  const pageNo = query.get("page_no");
  const perPage = query.get("per_page");
  const orderBy = query.get("order_by");
  const order = query.get("order");
  const search = query.get("search");

  const getPopclubRedeemsHistoryState = useAppSelector(
    selectGetPopclubRedeemsHistory
  );

  const getNotificationsState = useAppSelector(selectGetNotifications);

  useEffect(() => {
    const query = createQueryParams({
      page_no: pageNo,
      per_page: perPage,
      order_by: orderBy,
      order: order,
      search: search,
    });
    dispatch(getPopclubRedeemsHistory(query));
  }, [dispatch, pageNo, perPage, orderBy, order, search]);

  const calculateGrandTotal = (row: PopclubRedeemModel) => {
    let calculatedPrice = 0;

    if (row.purchase_amount) {
      calculatedPrice += parseInt(row.purchase_amount);
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
    <ProfileContainer title="Popclub Redeems" activeTab="popclub">
      <h1 className="text-secondary font-['Bebas_Neue'] tracking-[3px] text-3xl leading-6">
        Popclub Redeems
      </h1>
      {getPopclubRedeemsHistoryState.data?.redeems ? (
        <>
          <div className="py-4 lg:hidden">
            <DataList
              emptyMessage="No popclub redeems yet."
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

                  dispatch(resetGetPopclubRedeemsHistoryStatus());
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

                  dispatch(resetGetPopclubRedeemsHistoryStatus());
                  navigate({
                    pathname: "",
                    search: queryParams,
                  });
                }
              }}
              totalRows={
                getPopclubRedeemsHistoryState.data.pagination.total_rows
              }
              perPage={getPopclubRedeemsHistoryState.data.pagination.per_page}
              page={pageNo ? parseInt(pageNo) : 1}
            >
              <hr className="mt-4" />
              {getPopclubRedeemsHistoryState.data.redeems.map((row, i) => {
                const notification: NotificationModel | undefined =
                  getNotificationsState.data?.popclub_redeem.unseen_notifications.find(
                    (notification) =>
                      notification.deals_redeems_tb_id === row.id
                  );

                return (
                  <Link
                    key={i}
                    onClick={() => {
                      if (notification) {
                        dispatch(seenNotification(notification.id));
                      }
                    }}
                    to={`/popclub/order/${row.hash_key}`}
                    className={`flex flex-col px-4 py-2 border-b ${
                      notification ? "bg-gray-200" : ""
                    }`}
                  >
                    <span className="flex flex-wrap items-center space-x-1 text-xl">
                      <span className="text-lg text-gray-600">
                        {row.redeem_code}
                      </span>
                      {row.status === 1 &&
                      moment(row.expiration).isBefore(moment()) ? (
                        <span
                          className="px-2 py-1 text-xs rounded-full "
                          style={{
                            color: "white",
                            backgroundColor: "#a21013",
                          }}
                        >
                          Expired
                        </span>
                      ) : (
                        <span
                          className="px-2 py-1 text-xs rounded-full "
                          style={{
                            color: "white",
                            backgroundColor:
                              ADMIN_POPCLUB_REDEEM_STATUS[row.status].color,
                          }}
                        >
                          {ADMIN_POPCLUB_REDEEM_STATUS[row.status].name}
                        </span>
                      )}
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
              orderBy={orderBy ?? "dateadded"}
              emptyMessage="No popclub redeems yet."
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

                  dispatch(resetGetPopclubRedeemsHistoryStatus());
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

                  dispatch(resetGetPopclubRedeemsHistoryStatus());
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

                  dispatch(resetGetPopclubRedeemsHistoryStatus());
                  navigate({
                    pathname: "",
                    search: queryParams,
                  });
                }
              }}
              totalRows={
                getPopclubRedeemsHistoryState.data.pagination.total_rows
              }
              perPage={getPopclubRedeemsHistoryState.data.pagination.per_page}
              page={pageNo ? parseInt(pageNo) : 1}
            >
              {getPopclubRedeemsHistoryState.data.redeems !== undefined ? (
                <>
                  {getPopclubRedeemsHistoryState.data.redeems.map((row, i) => {
                    const notification: NotificationModel | undefined =
                      getNotificationsState.data?.popclub_redeem.unseen_notifications.find(
                        (notification) =>
                          notification.deals_redeems_tb_id === row.id
                      );

                    return (
                      <DataTableRow
                        key={i}
                        className={`${notification ? "bg-gray-200" : ""}`}
                      >
                        <DataTableCell>
                          <Moment format="LLL">{row.dateadded}</Moment>
                        </DataTableCell>
                        <DataTableCell>
                          <Moment format="LLL">{row.expiration}</Moment>
                        </DataTableCell>
                        <DataTableCell>{row.redeem_code}</DataTableCell>
                        <DataTableCell>
                          {calculateGrandTotal(row)}
                        </DataTableCell>
                        <DataTableCell>
                          {row.status === 1 &&
                          moment(row.expiration).isBefore(moment()) ? (
                            <span
                              className="px-2 py-1 text-xs rounded-full "
                              style={{
                                color: "white",
                                backgroundColor: "#a21013",
                              }}
                            >
                              Expired
                            </span>
                          ) : (
                            <span
                              className="px-2 py-1 text-xs rounded-full "
                              style={{
                                color: "white",
                                backgroundColor:
                                  ADMIN_POPCLUB_REDEEM_STATUS[row.status].color,
                              }}
                            >
                              {ADMIN_POPCLUB_REDEEM_STATUS[row.status].name}
                            </span>
                          )}
                        </DataTableCell>
                        <DataTableCell align="left">
                          <Link
                            onClick={() => {
                              if (notification) {
                                dispatch(seenNotification(notification.id));
                              }
                            }}
                            to={`/popclub/order/${row.hash_key}`}
                          >
                            <FaEye className="text-lg" />
                          </Link>
                        </DataTableCell>
                      </DataTableRow>
                    );
                  })}
                </>
              ) : null}
            </DataTable>
          </div>
        </>
      ) : null}
    </ProfileContainer>
  );
}
