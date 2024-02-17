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
  Button,
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
import { ConfirmOrdersModal, PlaceOrderModal, ProcessModal } from "../modals";
import { FaEye } from "react-icons/fa";
import { FcHighPriority } from "react-icons/fc";

import {
  GetStockOrdersState,
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

import { selectGetAdminSession } from "features/admin/presentation/slices/get-admin-session.slice";
import {
  BackdropLoading,
  DataList,
  MaterialDateInput,
  MaterialDateTimeInput,
  MaterialInputAutoComplete,
} from "features/shared/presentation/components";
import {
  selectstockOrderSideBar,
  togglestockOrderSideBar,
} from "../slices/stock-order.slice";
import {
  dateSetup,
  eliminateTab,
  isPayableCheck,
} from "./stock-ordering-utils";
import { OrderFilter } from ".";
import { stubFalse } from "lodash";
import { CiFilter } from "react-icons/ci";
import {
  selectSalesSideBar,
  toggleSalesSideBar,
} from "features/sales/presentation/slices/sales-sidebar.slice";
import { AdminSessionModel } from "features/admin/core/domain/admin-session.model";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface ListOfActiveStores {
  store_id: number;
  name: string;
  menu_name: string;
}

interface DataFilterData {
  store?: readonly StoreArray[] | null;
  type?: string | null;
  start?: string | null;
  end?: string | null;
}

interface Modals {
  [key: string]: boolean;
}

interface OrderContentsProps {
  isPayment: boolean;
}
interface StoreArray extends Array<ListOfActiveStores> {}

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

export function OrderContents(props: OrderContentsProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const getStockOrdersState = useAppSelector(selectGetStockOrders);
  const getAdminSessionState = useAppSelector(selectGetAdminSession);
  const stockOrderSideBar = useAppSelector(selectstockOrderSideBar);
  const salesSideBarState = useAppSelector(selectSalesSideBar);

  const [modals, setModals] = useState<Modals>({
    placeOrder: false,
    confirmOrder: false,
    processModal: false,
  });

  const [payMultipleBillingState, setPayMultipleBillingState] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [openFilter, setOpenFilter] = useState<HTMLButtonElement | null>(null);

  const query = useQuery();
  const pageNo = query.get("page_no");
  const perPage = query.get("per_page");
  const orderBy = query.get("order_by");
  const order = query.get("order");

  const search = query.get("search");
  const status = query.get("status");
  const store = query.get("store");
  const tabValue = query.get("tab");

  const dateType = query.get("dateType");
  const startDate = query.get("startDate");
  const endDate = query.get("endDate");

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
    // { id: "description", label: "status" },
    { id: "short_name", label: "Payment Status" },
    { id: "action", label: "Action" },
  ];

  const handleModalToggle = (modal: string) => {
    if (stockOrderSideBar.status && !props.isPayment) {
      dispatch(togglestockOrderSideBar());
    } else if (salesSideBarState.status && props.isPayment) {
      dispatch(toggleSalesSideBar());
    }
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
    handleModalToggle("processModal");
    setOrderId(id);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    const params = {
      page_no: null,
      per_page: perPage,
      status: null,
      order_by: null,
      order: null,
      store: null,
      search: null,
      dateType: null,
      startDate: null,
      endDate: null,
      tab: newValue,
    };
    const queryParams = createQueryParams(params);
    navigate({
      pathname: "",
      search: queryParams,
    });
  };

  useEffect(() => {
    const query = createQueryParams({
      page_no: pageNo,
      per_page: perPage,
      order_by: orderBy,
      order: order,
      store: store,
      search: search,
      dateType: dateType,
      startDate: startDate,
      endDate: endDate,
      tab: tabValue,
    });

    if (
      (!getStockOrdersState.data &&
        getStockOrdersState.status !== GetStockOrdersState.success) ||
      tabValue === null
    ) {
      const queryParams = createQueryParams({
        page_no: pageNo,
        per_page: perPage,
        order_by: orderBy,
        order: order,
        store: store,
        search: search,
        dateType: dateType,
        startDate: startDate,
        endDate: endDate,
        tab:
          Number(
            isPayableCheck(
              props.isPayment,
              getAdminSessionState.data?.admin.user_details.sos_groups ?? []
            )?.id
          ) - 1 ?? null,
      });
      navigate({
        pathname: "",
        search: queryParams,
      });
      dispatch(getStockOrders(queryParams));
    } else {
      dispatch(getStockOrders(query));
    }
  }, [
    dispatch,
    pageNo,
    perPage,
    orderBy,
    order,
    store,
    search,
    dateType,
    startDate,
    endDate,
    tabValue,
    modals,
  ]);

  return (
    <>
      <div className="space-y-3">
        <div className="">
          <span className="text-secondary text-3xl font-['Bebas_Neue'] flex-1">
            Material management{" "}
            {" > " + TAB_NAVIGATION[Number(tabValue)].label3}
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
                  className="hidden"
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
                  style={
                    (index === 2 &&
                      getStockOrdersState.data?.franchise_type !== 2) ||
                    eliminateTab(props.isPayment, index)
                      ? { display: "none" }
                      : {}
                  }
                />
              ))}
            </Tabs>

            <TabPanel index={Number(tabValue)} value={Number(tabValue)}>
              <div className="hidden md:block space-y-3">
                <Button
                  startIcon={<CiFilter />}
                  variant="contained"
                  onClick={(event) => setOpenFilter(event.currentTarget)}
                >
                  Filter
                </Button>

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
                      dateType: dateType,

                      startDate: startDate,
                      endDate: endDate,
                      tab: tabValue,
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
                        dateType: dateType,

                        startDate: startDate,
                        endDate: endDate,
                        tab: tabValue,
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
                        dateType: dateType,
                        startDate: startDate,
                        endDate: endDate,
                        tab: tabValue,
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
                        dateType: dateType,

                        startDate: startDate,
                        endDate: endDate,
                        tab: tabValue,
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
                      {/* <DataTableCell>{order.description}</DataTableCell>*/}
                      <DataTableCell>{order.short_name}</DataTableCell>
                      <DataTableCell>
                        <IconButton onClick={() => handleAction(order.id)}>
                          {order.logistic_id ? (
                            <FcHighPriority className="text-2xl" />
                          ) : (
                            <FaEye className="text-2xl" />
                          )}
                        </IconButton>
                      </DataTableCell>
                    </DataTableRow>
                  ))}
                </DataTable>
              </div>

              <div className="block md:hidden space-y-5">
                <Button
                  startIcon={<CiFilter />}
                  variant="contained"
                  onClick={(event) => setOpenFilter(event.currentTarget)}
                >
                  Filter
                </Button>
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
                      dateType: dateType,

                      startDate: startDate,
                      endDate: endDate,
                      tab: tabValue,
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
                        dateType: dateType,

                        startDate: startDate,
                        endDate: endDate,
                        tab: tabValue,
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
                        dateType: dateType,

                        startDate: startDate,
                        endDate: endDate,
                        tab: tabValue,
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
                        const queryParams = createQueryParams({ tab: 7 });

                        navigate({
                          pathname: "",
                          search: queryParams,
                        });
                        setPayMultipleBillingState(true);
                        handleModalToggle("processModal");
                      }}
                    />
                  ) : null}
                </SpeedDial>
              ) : null}
            </div>
          );
        }
      )}

      <OrderFilter
        anchor={openFilter}
        onClose={() => setOpenFilter(null)}
        filter={(data: DataFilterData | string) => {
          if (typeof data !== "string") {
            const storeIds = data.store?.map((store) => store[0].store_id);

            const params = {
              page_no: null,
              per_page: perPage,
              status: status,
              order_by: orderBy,
              order: order,
              store: storeIds ? JSON.stringify(storeIds) : null,
              search: search,
              dateType: data.type ?? null,
              startDate: data.start ?? null,
              endDate: data.end ?? null,
              tab: tabValue,
            };
            const queryParams = createQueryParams(params);
            navigate({
              pathname: "",
              search: queryParams,
            });
          } else {
            navigate({
              pathname: "",
            });
          }
        }}
      />

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

      <ProcessModal
        open={modals.processModal}
        onClose={() => {
          setPayMultipleBillingState(false);
          handleModalToggle("processModal");
        }}
        currentTab={Number(tabValue)}
        id={orderId}
        payMultipleBilling={payMultipleBillingState}
      />
    </>
  );
}
