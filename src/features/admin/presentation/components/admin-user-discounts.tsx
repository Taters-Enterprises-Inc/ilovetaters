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
import { ADMIN_USER_DISCOUNT_STATUS } from "features/shared/constants";
import { createQueryParams } from "features/config/helpers";
import {
  getAdminUserDiscounts,
  resetGetAdminUserDiscountsStatus,
  selectGetAdminUserDiscounts,
} from "../slices/get-admin-user-discounts.slice";
import { DataList } from "features/shared/presentation/components";
import Moment from "react-moment";
import { FaEye } from "react-icons/fa";
import { AdminUserDiscountModal } from "../modals";
import { getAdminUserDiscount } from "../slices/get-admin-discount-verification.slice";
import { selectAdminUserDiscountChangeStatus } from "../slices/admin-user-discount-change-status.slice";
import { AdminChipsButton } from "./chips-button";
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
  { id: "status", label: "Status" },
  { id: "appDate", label: "Application Date" },
  { id: "discount_name", label: "Discount Type" },
  { id: "full_name", label: "Full Name" },
  { id: "birthday", label: "Birthday" },
  { id: "id_number", label: "ID Number" },
  { id: "action", label: "Action" },
];

export function AdminUserDiscounts() {
  const dispatch = useAppDispatch();
  const query = useQuery();
  const navigate = useNavigate();
  const pageNo = query.get("page_no");
  const perPage = query.get("per_page");
  const status = query.get("status");
  const id = query.get("id");
  const orderBy = query.get("order_by");
  const order = query.get("order");
  const search = query.get("search");

  const [openAdminUserDiscountModal, setOpenAdminUserDiscountModal] =
    useState(false);

  const getAdminUserDiscountsStates = useAppSelector(
    selectGetAdminUserDiscounts
  );

  const adminUserDiscountChangeStatusState = useAppSelector(
    selectAdminUserDiscountChangeStatus
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
    if (id) {
      dispatch(getAdminUserDiscount(id)).then(() => {
        setOpenAdminUserDiscountModal(true);
      });
    }
  }, [dispatch, id]);

  useEffect(() => {
    const query = createQueryParams({
      page_no: pageNo,
      per_page: perPage,
      status: status,
      order_by: orderBy,
      order: order,
      search: search,
    });
    dispatch(getAdminUserDiscounts(query));
  }, [
    dispatch,
    pageNo,
    status,
    perPage,
    orderBy,
    order,
    search,
    adminUserDiscountChangeStatusState,
  ]);

  return (
    <>
      <div className="flex flex-col  lg:flex-row lg:items-end">
        <span className="px-4 text-secondary text-3xl font-['Bebas_Neue'] flex-1">
          User Discount
        </span>
        <AdminChipsButton
          createQueryParams={createQueryParams}
          data={ADMIN_USER_DISCOUNT_STATUS}
          dispatchAction={() => {
            dispatch(resetGetAdminUserDiscountsStatus());
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

      {getAdminUserDiscountsStates.data?.discounts ? (
        <>
          <div className="p-4 lg:hidden">
            <DataList
              search={search ?? ""}
              emptyMessage="No user discounts yet."
              onSearch={(val) => {
                const params = {
                  page_no: null,
                  per_page: perPage,
                  status: status,
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
                    search: search,
                  };

                  const queryParams = createQueryParams(params);

                  dispatch(resetGetAdminUserDiscountsStatus());
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
                    search: search,
                  };

                  const queryParams = createQueryParams(params);

                  dispatch(resetGetAdminUserDiscountsStatus());
                  navigate({
                    pathname: "",
                    search: queryParams,
                  });
                }
              }}
              totalRows={getAdminUserDiscountsStates.data.pagination.total_rows}
              perPage={getAdminUserDiscountsStates.data.pagination.per_page}
              page={pageNo ? parseInt(pageNo) : 1}
            >
              <hr className="mt-4" />

              {getAdminUserDiscountsStates.data.discounts.map((row, i) => (
                <div
                  onClick={() => {
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
                  className="flex flex-col px-4 py-2 border-b"
                  key={i}
                >
                  <span className="flex flex-wrap items-center space-x-1 text-xl">
                    <span>
                      {row.first_name +
                        " " +
                        row.middle_name +
                        " " +
                        row.last_name}
                    </span>

                    <span
                      className="px-2 py-1 text-xs rounded-full "
                      style={{
                        color: "white",
                        backgroundColor:
                          ADMIN_USER_DISCOUNT_STATUS[row.status].color,
                      }}
                    >
                      {ADMIN_USER_DISCOUNT_STATUS[row.status].name}
                    </span>
                  </span>

                  <span className="text-xs text-gray-600">
                    <strong> ID Number:</strong> {row.id_number}
                  </span>
                  <span className="text-xs text-gray-600">
                    <strong>Application Date: </strong>
                    <Moment format="lll">{row.dateadded}</Moment>
                  </span>
                </div>
              ))}
            </DataList>
          </div>
          <div className="hidden p-4 lg:block">
            <DataTable
              order={order === "asc" ? "asc" : "desc"}
              orderBy={orderBy ?? "dateadded"}
              emptyMessage="No user discounts yet."
              search={search ?? ""}
              onSearch={(val) => {
                const params = {
                  page_no: pageNo,
                  per_page: perPage,
                  status: status,
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
                    order_by: column_selected,
                    order: isAsc ? "desc" : "asc",
                    search: search,
                  };

                  const queryParams = createQueryParams(params);

                  dispatch(resetGetAdminUserDiscountsStatus());
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
                    order_by: orderBy,
                    order: order,
                    search: search,
                  };

                  const queryParams = createQueryParams(params);

                  dispatch(resetGetAdminUserDiscountsStatus());
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
                    order_by: orderBy,
                    order: order,
                    search: search,
                  };

                  const queryParams = createQueryParams(params);

                  dispatch(resetGetAdminUserDiscountsStatus());
                  navigate({
                    pathname: "",
                    search: queryParams,
                  });
                }
              }}
              totalRows={getAdminUserDiscountsStates.data.pagination.total_rows}
              perPage={getAdminUserDiscountsStates.data.pagination.per_page}
              page={pageNo ? parseInt(pageNo) : 1}
            >
              {getAdminUserDiscountsStates.data.discounts !== undefined ? (
                <>
                  {getAdminUserDiscountsStates.data.discounts.map((row, i) => {
                    const notification: NotificationModel | undefined =
                      getAdminNotificationsState.data?.user_discount.unseen_notifications.find(
                        (notification) =>
                          notification.discount_user_id === row.id
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
                                ADMIN_USER_DISCOUNT_STATUS[row.status].color,
                            }}
                          >
                            {ADMIN_USER_DISCOUNT_STATUS[row.status].name}
                          </span>
                        </DataTableCell>
                        <DataTableCell>
                          <Moment format="lll">{row.dateadded}</Moment>
                        </DataTableCell>
                        <DataTableCell>{row.discount_name}</DataTableCell>
                        <DataTableCell>
                          {row.first_name} {row.middle_name} {row.last_name}
                        </DataTableCell>
                        <DataTableCell>
                          <Moment format="ll">{row.birthday}</Moment>
                        </DataTableCell>
                        <DataTableCell>{row.id_number}</DataTableCell>

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
                  })}
                </>
              ) : null}
            </DataTable>
          </div>
        </>
      ) : null}

      <AdminUserDiscountModal
        open={openAdminUserDiscountModal}
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
          setOpenAdminUserDiscountModal(false);
        }}
      />
    </>
  );
}
