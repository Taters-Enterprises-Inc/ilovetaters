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
import { FaEye } from "react-icons/fa";
import { AdminShopOrderModal } from "../modals";
import { getAdminShopOrder } from "../slices/get-admin-shop-order.slice";
import { DataList } from "features/shared/presentation/components";
import { AdminShopOrderModel } from "features/admin/core/domain/admin-shop-order.model";
import { selectUploadProofOfPaymentAdmin } from "../slices/upload-proof-of-payment-admin.slice";
import { selectAdminShopOrderUpdateStatus } from "../slices/admin-shop-order-update-status.slice";
import { selectAdminPrivilege } from "../slices/admin-privilege.slice";
import { AdminChipsButton } from "./chips-button";
import { createQueryParams } from "features/config/helpers";
import {
  getAdminNotifications,
  selectGetAdminNotifications,
} from "../slices/get-admin-notifications.slice";
import { NotificationModel } from "features/shared/core/domain/notification.model";
import {
  selectUpdateAdminNotificationDateSeen,
  updateAdminNotificationDateSeen,
} from "../slices/update-admin-notification-dateseen.slice";

const columns: Array<Column> = [
  { id: "status", label: "Status", minWidth: 200 },
  { id: "dateadded", label: "Order Date" },
  { id: "tracking_no", label: "Tracking No." },
  { id: "client_name", label: "Client Name" },
  { id: "purchase_amount", label: "Amount" },
  { id: "store_name", label: "Store" },
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
  const trackingNo = query.get("tracking_no");
  const orderBy = query.get("order_by");
  const order = query.get("order");
  const search = query.get("search");

  const [openAdminShopOrderModal, setOpenAdminShopOrderModal] = useState(false);
  const getAdminShopOrdersState = useAppSelector(selectGetAdminShopOrders);
  const uploadProofOfPaymentAdminState = useAppSelector(
    selectUploadProofOfPaymentAdmin
  );
  const adminShopOrderUpdateStatusState = useAppSelector(
    selectAdminShopOrderUpdateStatus
  );
  const adminPrivilegeState = useAppSelector(selectAdminPrivilege);

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
    if (trackingNo) {
      dispatch(getAdminShopOrder(trackingNo)).then(() => {
        setOpenAdminShopOrderModal(true);
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
    dispatch(getAdminShopOrders(query));
  }, [
    dispatch,
    pageNo,
    status,
    perPage,
    orderBy,
    order,
    search,
    uploadProofOfPaymentAdminState,
    adminShopOrderUpdateStatusState,
    adminPrivilegeState,
  ]);

  const calculateGrandTotal = (row: AdminShopOrderModel) => {
    let calculatedPrice = 0;

    if (row.purchase_amount) {
      calculatedPrice += parseFloat(row.purchase_amount);
    }

    if (row.distance_price) {
      calculatedPrice += parseInt(row.distance_price);
    }

    if (row.cod_fee) {
      calculatedPrice += parseInt(row.cod_fee);
    }

    if (row.discount) {
      calculatedPrice -= parseFloat(row.discount);
    }

    if (row.giftcard_discount) {
      calculatedPrice -= parseInt(row.giftcard_discount);
    }

    if (row.reseller_discount) {
      calculatedPrice -= parseInt(row.reseller_discount);
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
          Snackshop Orders
        </span>
      </div>
      <AdminChipsButton
        createQueryParams={createQueryParams}
        data={ADMIN_SNACKSHOP_ORDER_STATUS}
        dispatchAction={() => {
          dispatch(resetGetAdminShopOrdersStatus());
        }}
        status={status}
        params={(value) => {
          const params = {
            page_no: pageNo,
            per_page: perPage,
            status: value === -1 ? null : value,
            tracking_no: trackingNo,
            search: search,
          };

          return params;
        }}
      />

      {getAdminShopOrdersState.data?.orders ? (
        <>
          <div className="p-4 lg:hidden">
            <DataList
              search={search ?? ""}
              emptyMessage="No snackshop orders yet."
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
              {getAdminShopOrdersState.data.orders.map((row, i) => {
                const notification: NotificationModel | undefined =
                  getAdminNotificationsState.data?.snackshop_order.unseen_notifications.find(
                    (notification) => notification.transaction_tb_id === row.id
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
                        tracking_no: row.tracking_no,
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
                        #{row.tracking_no}
                      </span>
                      <span
                        className="px-2 py-1 text-xs rounded-full "
                        style={{
                          color: "white",
                          backgroundColor:
                            ADMIN_SNACKSHOP_ORDER_STATUS[row.status].color,
                        }}
                      >
                        {ADMIN_SNACKSHOP_ORDER_STATUS[row.status].name}
                      </span>
                    </span>
                    <span className="text-xs">
                      <strong>Store:</strong> {row.store_name}
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
                );
              })}
            </DataList>
          </div>

          <div className="hidden p-4 lg:block">
            <DataTable
              order={order === "asc" ? "asc" : "desc"}
              orderBy={orderBy ?? "dateadded"}
              search={search ?? ""}
              emptyMessage="No snackshop orders yet."
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
                if (column_selected !== "action") {
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
                  {getAdminShopOrdersState.data.orders.map((row, i) => {
                    const notification: NotificationModel | undefined =
                      getAdminNotificationsState.data?.snackshop_order.unseen_notifications.find(
                        (notification) =>
                          notification.transaction_tb_id === row.id
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
                          {calculateGrandTotal(row)}
                        </DataTableCell>
                        <DataTableCell>{row.store_name}</DataTableCell>
                        <DataTableCell>
                          <span>{ADMIN_SNACKSHOP_MOP_STATUS[row.payops]}</span>
                        </DataTableCell>
                        <DataTableCell>{row.invoice_num}</DataTableCell>
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
                    );
                  })}
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
