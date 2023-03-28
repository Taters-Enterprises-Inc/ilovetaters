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
import { DataList } from "features/shared/presentation/components";
import { createQueryParams } from "features/config/helpers";
import {
  selectGetAdminInfluencerCashouts,
  getAdminInfluencerCashouts,
  resetGetAdminInfluencerCashoutsState,
} from "../slices/get-admin-influencer-cashouts.slice";
import { getAdminInfluencerCashout } from "../slices/get-admin-influencer-cashout.slice";
import { AdminChipsButton } from "./chips-button";
import { ADMIN_INFLUENCER_CASHOUT_STATUS } from "features/shared/constants";
import { FaEye } from "react-icons/fa";
import NumberFormat from "react-number-format";
import { AdminInfluencerCashoutModal } from "../modals";
import { selectAdminInfluencerCashoutChangeStatus } from "../slices/admin-influencer-cashout-change-status.slice";
import {
  getAdminNotifications,
  selectGetAdminNotifications,
} from "../slices/get-admin-notifications.slice";
import { NotificationModel } from "features/shared/core/domain/notification.model";
import { updateAdminNotificationDateSeen } from "../slices/update-admin-notification-dateseen.slice";

export function AdminInfluencerCashouts() {
  const dispatch = useAppDispatch();

  const query = useQuery();
  const navigate = useNavigate();
  const pageNo = query.get("page_no");
  const perPage = query.get("per_page");
  const orderBy = query.get("order_by");
  const order = query.get("order");
  const search = query.get("search");
  const status = query.get("status");
  const id = query.get("id");

  let columns: Array<Column> = [
    { id: "cashout_status", label: "Status" },
    { id: "influencer_name", label: "Influencer Name" },
    { id: "cashout", label: "Cashout" },
    { id: "dateadded", label: "Dateadded" },
    { id: "action", label: "Action" },
  ];

  const [openInfluencerCashoutModal, setOpenInfluencerCashoutModal] =
    useState(false);

  const getAdminInfluencerCashoutsState = useAppSelector(
    selectGetAdminInfluencerCashouts
  );

  const adminInfluencerCashoutChangeStatusState = useAppSelector(
    selectAdminInfluencerCashoutChangeStatus
  );

  const getAdminNotificationsState = useAppSelector(
    selectGetAdminNotifications
  );

  // useEffect(() => {
  //   dispatch(getAdminNotifications());
  // }, [updateAdminNotificationDateSeenState, dispatch]);

  useEffect(() => {
    dispatch(getAdminNotifications());
  }, [dispatch]);

  useEffect(() => {
    if (id) {
      dispatch(getAdminInfluencerCashout(id)).then(() => {
        setOpenInfluencerCashoutModal(true);
      });
    }
  }, [dispatch, id]);

  useEffect(() => {
    const query = createQueryParams({
      page_no: pageNo,
      per_page: perPage,
      order_by: orderBy,
      order: order,
      search: search,
      status: status,
    });

    dispatch(getAdminInfluencerCashouts(query));
  }, [
    adminInfluencerCashoutChangeStatusState,
    dispatch,
    pageNo,
    perPage,
    orderBy,
    order,
    search,
    status,
  ]);

  return (
    <>
      <div className="flex flex-col lg:flex-row lg:items-end">
        <span className="px-4 text-secondary text-3xl font-['Bebas_Neue'] flex-1">
          List of Influencer Cashouts
        </span>
        <AdminChipsButton
          createQueryParams={createQueryParams}
          data={ADMIN_INFLUENCER_CASHOUT_STATUS}
          dispatchAction={() => {
            dispatch(resetGetAdminInfluencerCashoutsState());
          }}
          status={status}
          params={(value) => {
            const params = {
              page_no: pageNo,
              per_page: perPage,
              status: value === -1 ? null : value,
              search: search,
            };
            return params;
          }}
        />
      </div>
      {getAdminInfluencerCashoutsState.data?.influencer_cashouts ? (
        <>
          <div className="p-4 lg:hidden">
            <DataList
              search={search ?? ""}
              emptyMessage="No packages yet."
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

                  dispatch(resetGetAdminInfluencerCashoutsState());
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

                  dispatch(resetGetAdminInfluencerCashoutsState());
                  navigate({
                    pathname: "",
                    search: queryParams,
                  });
                }
              }}
              totalRows={
                getAdminInfluencerCashoutsState.data.pagination.total_rows
              }
              perPage={getAdminInfluencerCashoutsState.data.pagination.per_page}
              page={pageNo ? parseInt(pageNo) : 1}
            >
              <hr className="mt-4" />
              {getAdminInfluencerCashoutsState.data.influencer_cashouts.map(
                (row, i) => {
                  const notification: NotificationModel | undefined =
                    getAdminNotificationsState.data?.influencer_cashout.unseen_notifications.find(
                      (notification) =>
                        notification.influencer_cashout_id === row.id
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
                          id: row.id,
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
                        <span className="text-xs lg:text-bas">
                          {row.fb_user_name} {row.mobile_user_name}
                        </span>
                      </span>
                    </div>
                  );
                }
              )}
            </DataList>
          </div>

          <div className="hidden p-4 lg:block">
            <DataTable
              order={order === "asc" ? "asc" : "desc"}
              orderBy={orderBy ?? "id"}
              emptyMessage="No stores yet."
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
                if (column_selected === "name") {
                  const isAsc = orderBy === column_selected && order === "asc";

                  const params = {
                    page_no: pageNo,
                    per_page: perPage,
                    order_by: column_selected,
                    order: isAsc ? "desc" : "asc",
                    search: search,
                  };

                  const queryParams = createQueryParams(params);

                  dispatch(resetGetAdminInfluencerCashoutsState());
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

                  dispatch(resetGetAdminInfluencerCashoutsState());
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

                  dispatch(resetGetAdminInfluencerCashoutsState());
                  navigate({
                    pathname: "",
                    search: queryParams,
                  });
                }
              }}
              totalRows={
                getAdminInfluencerCashoutsState.data.pagination.total_rows
              }
              perPage={getAdminInfluencerCashoutsState.data.pagination.per_page}
              page={pageNo ? parseInt(pageNo) : 1}
            >
              {getAdminInfluencerCashoutsState.data.influencer_cashouts !==
              undefined ? (
                <>
                  {getAdminInfluencerCashoutsState.data.influencer_cashouts.map(
                    (row, i) => {
                      const notification: NotificationModel | undefined =
                        getAdminNotificationsState.data?.influencer_cashout.unseen_notifications.find(
                          (notification) =>
                            notification.influencer_cashout_id === row.id
                        );

                      return (
                        <DataTableRow
                          key={i}
                          className={`${notification ? "bg-gray-200" : ""}`}
                        >
                          <DataTableCell>
                            <span
                              className="px-2 py-1 text-xs rounded-full "
                              style={{
                                color: "white",
                                backgroundColor:
                                  ADMIN_INFLUENCER_CASHOUT_STATUS[
                                    row.influencer_cashout_status_id
                                  ].color,
                              }}
                            >
                              {
                                ADMIN_INFLUENCER_CASHOUT_STATUS[
                                  row.influencer_cashout_status_id
                                ].name
                              }
                            </span>
                          </DataTableCell>
                          <DataTableCell>
                            {row.fb_user_name} {row.mobile_user_name}
                          </DataTableCell>
                          <DataTableCell>
                            <NumberFormat
                              value={parseFloat(row.cashout).toFixed(2)}
                              displayType={"text"}
                              thousandSeparator={true}
                              prefix={"₱"}
                            />
                          </DataTableCell>
                          <DataTableCell>{row.dateadded}</DataTableCell>
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
                                  id: row.id,
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
                    }
                  )}
                </>
              ) : null}
            </DataTable>
          </div>
        </>
      ) : null}

      <AdminInfluencerCashoutModal
        open={openInfluencerCashoutModal}
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
          setOpenInfluencerCashoutModal(false);
        }}
      />
    </>
  );
}
