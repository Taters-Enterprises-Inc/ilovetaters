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
import { useNavigate } from "react-router-dom";
import NumberFormat from "react-number-format";
import { ADMIN_POPCLUB_REDEEM_STATUS } from "features/shared/constants";
import Moment from "react-moment";
import { FaEye } from "react-icons/fa";
import { AdminPopclubRedeemModal } from "../modals";
import { getAdminPopclubRedeem } from "../slices/get-admin-popclub-redeem.slice";
import {
  getAdminPopclubRedeems,
  resetGetAdminPopclubRedeemsStatus,
  selectGetAdminPopclubRedeems,
} from "../slices/get-admin-popclub-redeems.slice";
import { DataList } from "features/shared/presentation/components";
import moment from "moment";
import { AdminChipsButton } from "./chips-button";
import { createQueryParams } from "features/config/helpers";
import {
  getAdminNotifications,
  selectGetAdminNotifications,
} from "../slices/get-admin-notifications.slice";
import {
  selectUpdateAdminNotificationDateSeen,
  updateAdminNotificationDateSeen,
} from "../slices/update-admin-notification-dateseen.slice";
import { NotificationModel } from "features/shared/core/domain/notification.model";

const columns: Array<Column> = [
  { id: "status", label: "Status", minWidth: 200 },
  { id: "dateadded", label: "Order Date" },
  { id: "expiration", label: "Valid Until" },
  { id: "redeem_code", label: "Redeem Code" },
  { id: "client_name", label: "Client Name" },
  { id: "purchase_amount", label: "Amount" },
  { id: "store_name", label: "Hub" },
  { id: "action", label: "Action" },
];

export function AdminPopClubRedeems() {
  const dispatch = useAppDispatch();
  const query = useQuery();
  const navigate = useNavigate();
  const pageNo = query.get("page_no");
  const perPage = query.get("per_page");
  const status = query.get("status");
  const redeemCode = query.get("redeem_code");
  const orderBy = query.get("order_by");
  const order = query.get("order");
  const search = query.get("search");

  const [openAdminPopclubRedeemModal, setOpenAdminPopclubRedeemModal] =
    useState(false);
  const getAdminPopclubRedeemsState = useAppSelector(
    selectGetAdminPopclubRedeems
  );

  const getAdminNotificationsState = useAppSelector(
    selectGetAdminNotifications
  );
  const updateAdminNotificationDateSeenState = useAppSelector(
    selectUpdateAdminNotificationDateSeen
  );

  useEffect(() => {
    dispatch(getAdminNotifications());
  }, [updateAdminNotificationDateSeenState, dispatch]);

  useEffect(() => {
    if (redeemCode) {
      dispatch(getAdminPopclubRedeem(redeemCode)).then(() => {
        setOpenAdminPopclubRedeemModal(true);
      });
    }
  }, [dispatch, redeemCode]);

  useEffect(() => {
    const query = createQueryParams({
      page_no: pageNo,
      per_page: perPage,
      status: status,
      order_by: orderBy,
      order: order,
      search: search,
    });
    dispatch(getAdminPopclubRedeems(query));
  }, [
    dispatch,
    pageNo,
    status,
    perPage,
    orderBy,
    order,
    search,
    openAdminPopclubRedeemModal,
  ]);

  return (
    <>
      <div className="flex flex-col px-4 lg:flex-row lg:items-end">
        <span className="text-secondary text-3xl font-['Bebas_Neue'] flex-1">
          Popclub Redemptions
        </span>
      </div>

      <AdminChipsButton
        createQueryParams={createQueryParams}
        data={ADMIN_POPCLUB_REDEEM_STATUS}
        dispatchAction={() => {
          dispatch(resetGetAdminPopclubRedeemsStatus());
        }}
        status={status}
        params={(value) => {
          const params = {
            page_no: pageNo,
            per_page: perPage,
            status: value === -1 ? null : value,
            redeem_code: redeemCode,
            search: search,
          };
          return params;
        }}
      />

      {getAdminPopclubRedeemsState.data?.redeems ? (
        <>
          <div className="p-4 lg:hidden">
            <DataList
              search={search ?? ""}
              emptyMessage="No popclub redeems yet."
              onSearch={(val) => {
                const params = {
                  page_no: null,
                  per_page: perPage,
                  status: status,
                  redeem_code: redeemCode,
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
                    redeem_code: redeemCode,
                    search: search,
                  };

                  const queryParams = createQueryParams(params);

                  dispatch(resetGetAdminPopclubRedeemsStatus());
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
                    redeem_code: redeemCode,
                    search: search,
                  };

                  const queryParams = createQueryParams(params);

                  dispatch(resetGetAdminPopclubRedeemsStatus());
                  navigate({
                    pathname: "",
                    search: queryParams,
                  });
                }
              }}
              totalRows={getAdminPopclubRedeemsState.data.pagination.total_rows}
              perPage={getAdminPopclubRedeemsState.data.pagination.per_page}
              page={pageNo ? parseInt(pageNo) : 1}
            >
              <hr className="mt-4" />
              {getAdminPopclubRedeemsState.data.redeems.map((row, i) => {
                const notification: NotificationModel | undefined =
                  getAdminNotificationsState.data?.popclub_redeem.unseen_notifications.find(
                    (notification) =>
                      notification.deals_redeems_tb_id === row.id
                  );

                return (
                  <div
                    onClick={() => {
                      if (notification) {
                        dispatch(
                          updateAdminNotificationDateSeen(notification.id)
                        );
                      }
                      const params = {
                        page_no: pageNo,
                        per_page: perPage,
                        status: status,
                        redeem_code: row.redeem_code,
                        search: search,
                      };

                      const queryParams = createQueryParams(params);

                      navigate({
                        pathname: "",
                        search: queryParams,
                      });
                    }}
                    className={`flex flex-col px-4 py-2 border-b ${
                      notification ? "bg-gray-200" : ""
                    }`}
                    key={i}
                  >
                    <span className="flex flex-wrap items-center space-x-1 text-xl">
                      <span>{row.client_name}</span>
                      <span className="text-lg text-gray-600">
                        #{row.redeem_code}
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
                    <span className="text-xs">
                      <strong>Hub:</strong> {row.store_name}
                    </span>

                    <div className="flex justify-between">
                      <span className="text-xs">
                        <Moment format="LLL">{row.dateadded}</Moment>
                      </span>
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
                );
              })}
            </DataList>
          </div>
          <div className="hidden p-4 lg:block">
            <DataTable
              order={order === "asc" ? "asc" : "desc"}
              orderBy={orderBy ?? "dateadded"}
              emptyMessage="No popclub redeems yet."
              search={search ?? ""}
              onSearch={(val) => {
                const params = {
                  page_no: pageNo,
                  per_page: perPage,
                  status: status,
                  redeem_code: redeemCode,
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
                if (column_selected !== "action") {
                  const isAsc = orderBy === column_selected && order === "asc";

                  const params = {
                    page_no: pageNo,
                    per_page: perPage,
                    status: status,
                    redeem_code: redeemCode,
                    order_by: column_selected,
                    order: isAsc ? "desc" : "asc",
                    search: search,
                  };

                  const queryParams = createQueryParams(params);

                  dispatch(resetGetAdminPopclubRedeemsStatus());
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
                    redeem_code: redeemCode,
                    order_by: orderBy,
                    order: order,
                    search: search,
                  };

                  const queryParams = createQueryParams(params);

                  dispatch(resetGetAdminPopclubRedeemsStatus());
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
                    redeem_code: redeemCode,
                    order_by: orderBy,
                    order: order,
                    search: search,
                  };

                  const queryParams = createQueryParams(params);

                  dispatch(resetGetAdminPopclubRedeemsStatus());
                  navigate({
                    pathname: "",
                    search: queryParams,
                  });
                }
              }}
              totalRows={getAdminPopclubRedeemsState.data.pagination.total_rows}
              perPage={getAdminPopclubRedeemsState.data.pagination.per_page}
              page={pageNo ? parseInt(pageNo) : 1}
            >
              {getAdminPopclubRedeemsState.data.redeems !== undefined ? (
                <>
                  {getAdminPopclubRedeemsState.data.redeems.map((row, i) => {
                    const notification: NotificationModel | undefined =
                      getAdminNotificationsState.data?.popclub_redeem.unseen_notifications.find(
                        (notification) =>
                          notification.deals_redeems_tb_id === row.id
                      );

                    return (
                      <DataTableRow
                        key={i}
                        className={`${notification ? "bg-gray-200" : ""}`}
                      >
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
                        <DataTableCell>
                          <Moment format="LLL">{row.dateadded}</Moment>
                        </DataTableCell>
                        <DataTableCell>
                          <Moment format="LLL">{row.expiration}</Moment>
                        </DataTableCell>
                        <DataTableCell>{row.redeem_code}</DataTableCell>
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
                        <DataTableCell align="left">
                          <button
                            onClick={() => {
                              if (notification) {
                                dispatch(
                                  updateAdminNotificationDateSeen(
                                    notification.id
                                  )
                                );
                              }

                              const params = {
                                page_no: pageNo,
                                per_page: perPage,
                                status: status,
                                redeem_code: row.redeem_code,
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
                    );
                  })}
                </>
              ) : null}
            </DataTable>
          </div>
        </>
      ) : null}

      <AdminPopclubRedeemModal
        open={openAdminPopclubRedeemModal}
        onClose={() => {
          const params = {
            page_no: pageNo,
            per_page: perPage,
            status: status,
            redeem_code: null,
            order_by: orderBy,
            order: order,
            search: search,
          };

          const queryParams = createQueryParams(params);

          navigate({
            pathname: "",
            search: queryParams,
          });
          setOpenAdminPopclubRedeemModal(false);
        }}
      />
    </>
  );
}
