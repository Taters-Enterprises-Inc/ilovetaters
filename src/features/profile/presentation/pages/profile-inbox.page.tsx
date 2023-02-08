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
import { useEffect, useState } from "react";
import { ProfileContainer } from "../components";
import { DataList } from "features/shared/presentation/components";
import { createQueryParams } from "features/config/helpers";
import { VscCircleFilled } from "react-icons/vsc";
import { selectGetNotifications } from "features/shared/presentation/slices/get-notifications.slice";
import { NotificationModel } from "features/shared/core/domain/notification.model";
import { seenNotification } from "features/shared/presentation/slices/seen-notification.slice";
import { InboxViewerModal } from "../modals";
import { InboxModel } from "features/profile/core/domain/inbox.model";

const columns: Array<Column> = [
  { id: "dateadded", label: "Date" },
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

  const [openInboxViewerModal, setOpenInboxViewerModal] = useState<{
    status: boolean;
    inbox: InboxModel | null;
  }>({ status: false, inbox: null });

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
    <>
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
                      (notification) => notification.id === row.id
                    );

                  return (
                    <div
                      onClick={() => {
                        setOpenInboxViewerModal({
                          status: true,
                          inbox: row,
                        });
                        if (notification) {
                          dispatch(seenNotification(notification.id));
                        }
                      }}
                      className={`flex flex-col cursor-pointer px-4 py-2 border-b ${
                        notification ? "bg-gray-200" : ""
                      }`}
                      key={i}
                    >
                      <span className="flex items-center justify-between space-x-1 text-xl">
                        <span className="overflow-hidden text-secondary text-ellipsis whitespace-nowrap max-w-[360px]">
                          {row.text}
                          {row.survey_hash &&
                          row.notification_event_type_id === 5 ? (
                            <Link
                              to={`/feedback/complete/${row.survey_hash}`}
                              className="underline text-primary"
                            >
                              {" "}
                              Here
                            </Link>
                          ) : null}
                          {row.notification_event_type_id === 4 ? (
                            <Link
                              to={`/feedback${
                                row.transaction_hash
                                  ? `/snackshop/${row.transaction_hash}`
                                  : row.catering_transaction_hash
                                  ? `/catering/${row.catering_transaction_hash}`
                                  : ""
                              }`}
                              className="underline text-primary"
                            >
                              {" "}
                              Rate Now Here
                            </Link>
                          ) : null}
                        </span>
                        {notification ? (
                          <VscCircleFilled className="text-red-600 " />
                        ) : null}
                      </span>
                      <div className="flex justify-between">
                        <span className="text-xs text-gray-600 ">
                          <Moment format="LLL">{row.dateadded}</Moment>
                        </span>
                      </div>
                    </div>
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
                    const isAsc =
                      orderBy === column_selected && order === "asc";

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
                          <DataTableCell>
                            <span className="block overflow-hidden text-secondary text-ellipsis whitespace-nowrap max-w-[500px]">
                              {row.text}{" "}
                              {row.survey_hash &&
                              row.notification_event_type_id === 5 ? (
                                <Link
                                  to={`/feedback/complete/${row.survey_hash}`}
                                  className="underline text-primary"
                                >
                                  {" "}
                                  Here
                                </Link>
                              ) : null}
                              {row.notification_event_type_id === 4 ? (
                                <Link
                                  to={`/feedback${
                                    row.transaction_hash
                                      ? `/snackshop/${row.transaction_hash}`
                                      : row.catering_transaction_hash
                                      ? `/catering/${row.catering_transaction_hash}`
                                      : ""
                                  }`}
                                  className="underline text-primary"
                                >
                                  {" "}
                                  Rate Now Here
                                </Link>
                              ) : null}
                            </span>
                          </DataTableCell>
                          <DataTableCell align="left">
                            <div
                              onClick={() => {
                                setOpenInboxViewerModal({
                                  status: true,
                                  inbox: row,
                                });
                                if (notification) {
                                  dispatch(seenNotification(notification.id));
                                }
                              }}
                              className="cursor-pointer"
                            >
                              <FaEye
                                className={`text-lg ${
                                  notification ? "text-red-600" : null
                                }`}
                              />
                            </div>
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
      <InboxViewerModal
        open={openInboxViewerModal.status}
        inbox={openInboxViewerModal.inbox}
        onClose={() => {
          setOpenInboxViewerModal({ status: false, inbox: null });
        }}
      />
    </>
  );
}
