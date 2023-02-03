import {
  useAppDispatch,
  useAppSelector,
  useQuery,
} from "features/config/hooks";
import {
  selectGetInbox,
  resetGetInboxStatus,
  getInbox,
} from "features/profile/presentation/slices/get-inbox.slice";
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
import { SnackShopOrderModel } from "features/profile/core/domain/snackshop-order.model";
import { DataList } from "features/shared/presentation/components";
import { createQueryParams } from "features/config/helpers";
import { VscCircleFilled } from "react-icons/vsc";
import { selectGetNotifications } from "features/shared/presentation/slices/get-notifications.slice";
import { NotificationModel } from "features/shared/core/domain/notification.model";
import { seenNotification } from "features/shared/presentation/slices/seen-notification.slice";

const columns: Array<Column> = [
  { id: "dateadded", label: "Survey Date" },
  { id: "message", label: "Message" },
  { id: "view", label: "View" },
];

export function ProfileInbox() {
  const dispatch = useAppDispatch();
  const query = useQuery();
  const navigate = useNavigate();

  const getInboxState = useAppSelector(selectGetInbox);

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
    dispatch(getInbox(query));
  }, [dispatch, pageNo, perPage, orderBy, order, search]);

  return (
    <ProfileContainer title="Inbox" activeTab="inbox">
      <h1 className="text-secondary font-['Bebas_Neue'] tracking-[3px] text-3xl leading-6">
        Inbox
      </h1>

      {getInboxState.data?.inbox ? (
        <>
          <div className="py-4 lg:hidden">
            <DataList
              search={search ?? ""}
              emptyMessage="No snackshop orders yet."
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

                  dispatch(resetGetInboxStatus());
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

                  dispatch(resetGetInboxStatus());
                  navigate({
                    pathname: "",
                    search: queryParams,
                  });
                }
              }}
              totalRows={getInboxState.data.pagination.total_rows}
              perPage={getInboxState.data.pagination.per_page}
              page={pageNo ? parseInt(pageNo) : 1}
            >
              <hr className="mt-4" />
              {getInboxState.data.inbox.map((row, i) => {
                const notification: NotificationModel | undefined =
                  getNotificationsState.data?.inbox.unseen_notifications.find(
                    (notification) => notification.transaction_tb_id === row.id
                  );

                return (
                  <>
                    <Link
                      onClick={() => {
                        if (notification) {
                          dispatch(seenNotification(notification.id));
                        }
                      }}
                      to=""
                      // to={`/delivery/order/${row.hash_key}`}
                      className={`flex flex-col px-4 py-2 border-b ${
                        notification ? "bg-gray-200" : ""
                      }`}
                      key={i}
                    >
                      <span className="flex items-center justify-between space-x-1 text-xl">
                        <span className="text-lg text-gray-600">#sadfasdf</span>
                        {notification ? (
                          <VscCircleFilled className="text-red-600 " />
                        ) : null}
                      </span>
                      <div className="flex justify-between">
                        <span className="text-xs">
                          <Moment format="LLL">{row.dateadded}</Moment>
                        </span>
                        <span className="text-lg font-semibold">
                          Test
                          {/* {calculatePurchaseAmount(row)} */}
                        </span>
                      </div>
                    </Link>
                  </>
                );
              })}
            </DataList>
          </div>
          <div className="hidden lg:block">
            <DataTable
              order={order === "asc" ? "asc" : "desc"}
              orderBy={orderBy ?? "dateadded"}
              emptyMessage="No snackshop orders yet."
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

                  dispatch(resetGetInboxStatus());
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

                  dispatch(resetGetInboxStatus());
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

                  dispatch(resetGetInboxStatus());
                  navigate({
                    pathname: "",
                    search: queryParams,
                  });
                }
              }}
              totalRows={getInboxState.data.pagination.total_rows}
              perPage={getInboxState.data.pagination.per_page}
              page={pageNo ? parseInt(pageNo) : 1}
            >
              {getInboxState.data.inbox !== undefined ? (
                <>
                  {getInboxState.data.inbox.map((row, i) => {
                    const notification: NotificationModel | undefined =
                      getNotificationsState.data?.inbox.unseen_notifications.find(
                        (notification) => notification.id === row.id
                      );

                    return (
                      <DataTableRow
                        className={`${notification ? "bg-gray-200" : ""}`}
                        key={i}
                      >
                        <DataTableCell>
                          <Moment format="LLL">{row.dateadded}</Moment>
                        </DataTableCell>
                        <DataTableCell>{row.text}</DataTableCell>
                        <DataTableCell align="left">
                          <Link
                            onClick={() => {
                              if (notification) {
                                dispatch(seenNotification(notification.id));
                              }
                            }}
                            to=""
                            // to={`/delivery/order/${row.hash_key}`}
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
