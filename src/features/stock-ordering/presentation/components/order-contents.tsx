import { createQueryParams } from "features/config/helpers";
import {
  useAppDispatch,
  useAppSelector,
  useQuery,
} from "features/config/hooks";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Badge,
  BadgeProps,
  Box,
  Divider,
  IconButton,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Tab,
  Tabs,
  styled,
} from "@mui/material";
import { TiDocumentAdd } from "react-icons/ti";
import {
  CancelledModal,
  ConfirmOrdersModal,
  PlaceOrderModal,
  ProcurementReviewOrdersModal,
  StorePayBillingModal,
  StoreReceiveOrderModal,
  SupplierConfirmModal,
  SupplierDispatchOrderModal,
  SupplierUpdateBillingModal,
  SupplierViewOrderModal,
} from "../modals";
import { FaEye } from "react-icons/fa";
import {
  getStockOrders,
  resetGetStockOrders,
  selectGetStockOrders,
} from "../slices/get-stock-orders.slice";
import {
  Column,
  DataTable,
  DataTableCell,
  DataTableRow,
} from "features/shared/presentation/components/data-table";
import { TAB_NAVIGATION } from "features/shared/constants";
import { CompleteModal } from "../modals/complete-order.modal";
import { DeliveryReceiveApprovalModal } from "../modals/delivery-receive-approval.modal";
import { selectGetAdminSession } from "features/admin/presentation/slices/get-admin-session.slice";
import { selectGetStockOrderStores } from "../slices/get-store.slice";
import {
  BackdropLoading,
  DataList,
} from "features/shared/presentation/components";
import {
  selectstockOrderSideBar,
  togglestockOrderSideBar,
} from "../slices/stock-order.slice";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface Modals {
  [key: string]: boolean;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
};

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: 3,
    top: -13,
    border: `2px solid #ffcd17`,
    backgroundColor: "#ffcd17",
    padding: "0 4px",
  },
}));

export function OrderContents() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const getStockOrdersState = useAppSelector(selectGetStockOrders);
  const getAdminSessionState = useAppSelector(selectGetAdminSession);
  const stockOrderSideBar = useAppSelector(selectstockOrderSideBar);

  const [modals, setModals] = useState<Modals>({
    placeOrder: false,
    confirmOrder: false,
    supplierViewOrder: false,
    procurementReviewOrder: false,
    supplierDispatchOrder: false,
    storeReceiveOrder: false,
    deliveryReceiveApproval: false,
    supplierUpdateBilling: false,
    storePayBilling: false,
    supplierConfirm: false,
    complete: false,
    cancelled: false,
  });

  const [orderId, setOrderId] = useState("");

  const query = useQuery();
  const pageNo = query.get("page_no");
  const perPage = query.get("per_page");
  const orderBy = query.get("order_by");
  const order = query.get("order");

  const search = query.get("search");
  const status = query.get("status");
  const store = query.get("store");
  const tabValue = query.get("tab");

  let columns: Array<Column> = [
    { id: "store_name", label: "Store" },
    { id: "id", label: "Order Number" },
    { id: "order_placement_date", label: "Order Placement Date" },
    {
      id: "requested_delivery_date",
      label: "Requested Delivery Date",
    },
    { id: "commited_delivery_date", label: "Commited Delivery Date" },
    { id: "actual_delivery_date", label: "Actual Delivery Date" },
    { id: "description", label: "status" },

    { id: "short_name", label: "Payment Status" },
    { id: "action", label: "Action" },
  ];

  const handleModalToggle = (modal: string) => {
    setModals((prevModals) => ({
      ...prevModals,
      [modal]: !prevModals[modal],
    }));
  };

  const handleConfirmationModal = (value: boolean) => {
    setModals((prevModals) => ({
      ...prevModals,
      confirmOrder: value,
      placeOrder: false,
    }));
  };

  const handleAction = (id: string) => {
    handleModalToggle(Object.keys(modals)[Number(tabValue) + 2]);
    if (stockOrderSideBar.status) {
      dispatch(togglestockOrderSideBar());
    }
    setOrderId(id);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    const queryParams = createQueryParams({ tab: newValue });

    navigate({
      pathname: "",
      search: queryParams,
    });
  };

  const dateSetup = (date: string, withTime: boolean) => {
    if (withTime) {
      return new Date(date).toLocaleDateString("en-PH", {
        month: "long",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
      });
    } else {
      return new Date(date).toLocaleDateString("en-PH", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
    }
  };

  useEffect(() => {
    const query = createQueryParams({
      page_no: pageNo,
      per_page: perPage,
      order_by: orderBy,
      order: order,
      search: search,
      tab: tabValue,
    });

    dispatch(getStockOrders(query));
  }, [dispatch, pageNo, perPage, orderBy, order, search, tabValue, modals]);

  return (
    <>
      <div className="space-y-3">
        <div className="">
          <span className="text-secondary text-3xl font-['Bebas_Neue'] flex-1">
            Order {" > " + TAB_NAVIGATION[Number(tabValue)].label3}
          </span>
        </div>

        {getStockOrdersState.data ? (
          <div className="bg-paper border-2 border-t-8 rounded-t-lg border-secondary">
            <Tabs
              className="bg-secondary text-white "
              value={Number(tabValue)}
              onChange={handleTabChange}
              scrollButtons="auto"
              allowScrollButtonsMobile
              variant="scrollable"
              TabIndicatorProps={{
                style: {
                  backgroundColor:
                    getAdminSessionState.data?.admin.user_details.sos_groups.some(
                      (group) => Number(tabValue) + 1 === group.id
                    )
                      ? "black"
                      : "white",
                },
              }}
            >
              {TAB_NAVIGATION.map((tabs, index) => (
                <Tab
                  key={index}
                  sx={getAdminSessionState.data?.admin.user_details.sos_groups.map(
                    (group) =>
                      index + 1 === group.id
                        ? {
                            backgroundColor: "#a21013",
                            borderTopRightRadius: 5,
                            borderTopLeftRadius: 5,
                            borderLeft: 1,
                            borderRight: 1,
                            paddingY: 3,
                          }
                        : { Color: "white", paddingY: 3 }
                  )}
                  label={
                    <StyledBadge
                      max={99}
                      badgeContent={getStockOrdersState.data?.tab[index]}
                    >
                      <div className="flex flex-col text-white">
                        <span className="text-sm">{tabs.label}</span>
                        <span
                          className={`${
                            TAB_NAVIGATION.length - 1 === index ||
                            TAB_NAVIGATION.length - 2 === index
                              ? "text-sm"
                              : "text-xs"
                          }`}
                        >
                          {tabs.label2}
                        </span>
                      </div>
                    </StyledBadge>
                  }
                />
              ))}
            </Tabs>

            <TabPanel index={Number(tabValue)} value={Number(tabValue)}>
              <div className="hidden md:block">
                <DataTable
                  order={order === "asc" ? "asc" : "desc"}
                  orderBy={orderBy ?? "last_updated"}
                  search={search ?? ""}
                  emptyMessage={`"No ${
                    TAB_NAVIGATION[Number(tabValue)].label
                  } yet."`}
                  onSearch={(val) => {
                    const params = {
                      page_no: null,
                      per_page: perPage,
                      status: status,
                      order_by: orderBy,
                      order: order,
                      store: store,
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
                      const isAsc =
                        orderBy === column_selected && order === "asc";

                      const params = {
                        page_no: pageNo,
                        per_page: perPage,
                        status: status,
                        order_by: column_selected,
                        order: isAsc ? "desc" : "asc",
                        store: store,
                        search: search,
                      };

                      const queryParams = createQueryParams(params);

                      dispatch(resetGetStockOrders());
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
                        store: store,
                        order_by: orderBy,
                        order: order,
                        search: search,
                      };

                      const queryParams = createQueryParams(params);

                      dispatch(resetGetStockOrders());
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
                        store: store,
                        order_by: orderBy,
                        order: order,
                        search: search,
                      };

                      const queryParams = createQueryParams(params);

                      dispatch(resetGetStockOrders());
                      navigate({
                        pathname: "",
                        search: queryParams,
                      });
                    }
                  }}
                  totalRows={getStockOrdersState.data?.pagination.total_rows}
                  perPage={getStockOrdersState.data?.pagination.per_page}
                  page={pageNo ? parseInt(pageNo) : 1}
                >
                  {getStockOrdersState.data?.orders.map((order, index) => (
                    <DataTableRow key={index}>
                      <DataTableCell>{order.store_name}</DataTableCell>
                      <DataTableCell>{order.id}</DataTableCell>
                      <DataTableCell>
                        {order.id !== null
                          ? dateSetup(order.order_placement_date, true)
                          : order.order_placement_date}
                      </DataTableCell>
                      <DataTableCell>
                        {order.requested_delivery_date !== null
                          ? dateSetup(order.requested_delivery_date, false)
                          : order.requested_delivery_date}
                      </DataTableCell>
                      <DataTableCell>
                        {order.commited_delivery_date !== null
                          ? dateSetup(order.commited_delivery_date, true)
                          : order.commited_delivery_date}
                      </DataTableCell>

                      <DataTableCell>
                        {order.actual_delivery_date !== null
                          ? dateSetup(order.actual_delivery_date, true)
                          : order.actual_delivery_date}
                      </DataTableCell>
                      <DataTableCell>{order.description}</DataTableCell>
                      <DataTableCell>{order.short_name}</DataTableCell>
                      <DataTableCell>
                        <IconButton onClick={() => handleAction(order.id)}>
                          <FaEye className="text-lg" />
                        </IconButton>
                      </DataTableCell>
                    </DataTableRow>
                  ))}
                </DataTable>
              </div>

              <div className="block md:hidden">
                <DataList
                  search={search ?? ""}
                  emptyMessage={`"No ${
                    TAB_NAVIGATION[Number(tabValue)].label
                  } yet."`}
                  onSearch={(val) => {
                    const params = {
                      page_no: null,
                      per_page: perPage,
                      status: status,
                      order_by: orderBy,
                      order: order,
                      store: store,
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
                        store: store,
                        order_by: orderBy,
                        order: order,
                        search: search,
                      };

                      const queryParams = createQueryParams(params);

                      dispatch(resetGetStockOrders());
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
                        store: store,
                        order_by: orderBy,
                        order: order,
                        search: search,
                      };

                      const queryParams = createQueryParams(params);

                      dispatch(resetGetStockOrders());
                      navigate({
                        pathname: "",
                        search: queryParams,
                      });
                    }
                  }}
                  totalRows={getStockOrdersState.data?.pagination.total_rows}
                  perPage={getStockOrdersState.data?.pagination.per_page}
                  page={pageNo ? parseInt(pageNo) : 1}
                >
                  <div className="space-y-2 mt-2">
                    {getStockOrdersState.data.orders.map((order, index) => (
                      <div
                        onClick={() => handleAction(order.id)}
                        className="flex flex-col border border-gray-200 rounded-md shadow-sm p-2 bg-white"
                      >
                        <div className="flex justify-between text-normal">
                          <span className="normal-case">
                            {order.store_name}
                          </span>
                          <span>#{order.id}</span>
                        </div>
                        <div className="text-sm">
                          <span>Status: </span>
                          <span className="lowercase">{order.description}</span>
                        </div>

                        <div className="text-xs capitalize space-x-1">
                          <span>Placement date:</span>
                          <span>
                            {dateSetup(order.order_placement_date, true)}
                          </span>
                        </div>

                        {order.commited_delivery_date && (
                          <div className="text-xs capitalize space-x-1">
                            <span>Confirmation date:</span>
                            <span>
                              {dateSetup(order.commited_delivery_date, true)}
                            </span>
                          </div>
                        )}

                        {order.actual_delivery_date && (
                          <div className="text-xs capitalize space-x-1">
                            <span>Actual Delivery Date:</span>
                            <span>
                              {dateSetup(order.actual_delivery_date, true)}
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </DataList>
              </div>
            </TabPanel>
          </div>
        ) : null}
      </div>

      {getAdminSessionState.data?.admin.user_details.sos_groups.map(
        (user_data, index) => {
          const isPlaceOrderAvailable =
            getAdminSessionState.data?.admin.user_details.sos_groups.some(
              (user) => user.id === 0
            );
          const isPayBillingAvailable =
            getAdminSessionState.data?.admin.user_details.sos_groups.some(
              (user) => user.id === 7
            );

          const modalIsOpen = Object.keys(modals)
            .map((key) => modals[key])
            .some((modal) => modal);

          return (
            <div key={index}>
              {(user_data.id === 0 && !modalIsOpen) ||
              (user_data.id === 7 && !modalIsOpen) ? (
                <SpeedDial
                  ariaLabel={"speed-dial-finance-and-store"}
                  sx={{ position: "absolute", bottom: 40, right: 40 }}
                  icon={<SpeedDialIcon />}
                >
                  {isPlaceOrderAvailable ? (
                    <SpeedDialAction
                      icon={<TiDocumentAdd className="text-3xl" />}
                      tooltipTitle="Place Order"
                      onClick={() => handleModalToggle("placeOrder")}
                    />
                  ) : null}

                  {isPayBillingAvailable ? (
                    <SpeedDialAction
                      icon={<TiDocumentAdd className="text-3xl" />}
                      tooltipTitle="Pay Billing"
                      onClick={async () => {
                        setOrderId("");
                        const queryParams = createQueryParams({ tab: 6 });

                        navigate({
                          pathname: "",
                          search: queryParams,
                        });
                        handleModalToggle("storePayBilling");
                      }}
                    />
                  ) : null}
                </SpeedDial>
              ) : null}
            </div>
          );
        }
      )}

      <PlaceOrderModal
        open={modals.placeOrder}
        onClose={() => {
          handleModalToggle("placeOrder");
        }}
        openConfirmationState={handleConfirmationModal}
      />

      <ConfirmOrdersModal
        open={modals.confirmOrder}
        onClose={() => handleModalToggle("confirmOrder")}
      />

      <SupplierViewOrderModal
        open={modals.supplierViewOrder}
        onClose={() => handleModalToggle("supplierViewOrder")}
        currentTab={Number(tabValue)}
        id={orderId}
      />

      <ProcurementReviewOrdersModal
        open={modals.procurementReviewOrder}
        onClose={() => handleModalToggle("procurementReviewOrder")}
        currentTab={Number(tabValue)}
        id={orderId}
      />

      <SupplierDispatchOrderModal
        open={modals.supplierDispatchOrder}
        onClose={() => handleModalToggle("supplierDispatchOrder")}
        currentTab={Number(tabValue)}
        id={orderId}
      />

      <StoreReceiveOrderModal
        open={modals.storeReceiveOrder}
        onClose={() => handleModalToggle("storeReceiveOrder")}
        currentTab={Number(tabValue)}
        id={orderId}
      />

      <SupplierUpdateBillingModal
        open={modals.supplierUpdateBilling}
        onClose={() => handleModalToggle("supplierUpdateBilling")}
        currentTab={Number(tabValue)}
        id={orderId}
      />

      <StorePayBillingModal
        open={modals.storePayBilling}
        onClose={() => handleModalToggle("storePayBilling")}
        currentTab={Number(tabValue)}
        id={orderId}
      />

      <SupplierConfirmModal
        open={modals.supplierConfirm}
        onClose={() => handleModalToggle("supplierConfirm")}
        currentTab={Number(tabValue)}
        id={orderId}
      />

      <CompleteModal
        open={modals.complete}
        onClose={() => handleModalToggle("complete")}
        currentTab={Number(tabValue)}
        id={orderId}
      />

      <DeliveryReceiveApprovalModal
        open={modals.deliveryReceiveApproval}
        onClose={() => handleModalToggle("deliveryReceiveApproval")}
        currentTab={Number(tabValue)}
        id={orderId}
      />

      <CancelledModal
        open={modals.cancelled}
        onClose={() => handleModalToggle("cancelled")}
        currentTab={Number(tabValue)}
        id={orderId}
      />
    </>
  );
}
