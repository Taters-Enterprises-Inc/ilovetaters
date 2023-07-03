import { createQueryParams } from "features/config/helpers";
import {
  useAppDispatch,
  useAppSelector,
  useQuery,
} from "features/config/hooks";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Box,
  Divider,
  Fab,
  IconButton,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { TiDocumentAdd } from "react-icons/ti";
import {
  ConfirmOrdersModal,
  PlaceOrderModal,
  ProcurementReviewOrdersModal,
  StorePayBillingModal,
  StoreReceiveOrderModal,
  SupplierConfirmModal,
  SupplierDispatchOrderModal,
  SupplierEnFreightOrderModal,
  SupplierEnRouteOrderModal,
  SupplierUpdateBillingModal,
  SupplierViewOrderModal,
} from "../modals";
import { FaEye } from "react-icons/fa";
import { ProcurementConfirmOrdersModal } from "../modals/procurement-confirm-order.modal";
import { DataList } from "features/shared/presentation/components";
import {
  GetStockOrdersState,
  getStockOrders,
  resetGetStockOrders,
  selectGetStockOrders,
} from "../slices/get-stock-orders.slice";
import { currentTab } from "features/stock-ordering/core/stock-ordering.params";
import {
  Column,
  DataTable,
  DataTableCell,
  DataTableRow,
} from "features/shared/presentation/components/data-table";
import { TAB_NAVIGATION } from "features/shared/constants";

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

export function OrderContents() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const getStockOrdersState = useAppSelector(selectGetStockOrders);

  // const [openPlaceOrderModal, setOpenPlaceOrderModal] = useState(false);
  // const [openConfirmOrderModal, setOpenConfirmOrderModal] = useState(false);
  // const [openSupplierViewOrderModal, setOpenSupplierViewOrderModal] =
  //   useState(false);
  // const [openProcurementReviewOrderModal, setOpenProcurementReviewOrderModal] =
  //   useState(false);
  // const [
  //   openProcurementConfirmOrderModal,
  //   setOpenProcurementConfirmOrderModal,
  // ] = useState(false);

  // const [openSupplierDispatchOrderModal, setOpenSupplierDispatchOrderModal] =
  //   useState(false);

  // const [openSupplierEnRouteOrderModal, setOpenSupplierEnRouteOrderModal] =
  //   useState(false);

  // const [openSupplierEnFreightOrderModal, setOpenSupplierEnFreightOrderModal] =
  //   useState(false);

  // const [openStoreReceiveOrderModal, setOpenStoreReceiveOrderModal] =
  //   useState(false);

  // const [openSupplierUpdateBillingModal, setOpenSupplierUpdateBillingModal] =
  //   useState(false);

  // const [openStorePayBillingModal, setOpenStorePayBillingModal] =
  //   useState(false);

  // const [openSupplierConfirmModal, setOpenSupplierConfirmModal] =
  //   useState(false);

  const [modals, setModals] = useState<Modals>({
    placeOrder: false,
    confirmOrder: false,
    supplierViewOrder: false,
    procurementReviewOrder: false,
    procurementConfirmOrder: false,
    supplierDispatchOrder: false,
    supplierEnRouteOrder: false,
    supplierEnFreightOrder: false,
    storeReceiveOrder: false,
    supplierUpdateBilling: false,
    storePayBilling: false,
    supplierConfirm: false,
  });

  const [orderId, setOrderId] = useState("");

  const [tabValue, setTabValue] = useState<number>(0);

  const query = useQuery();
  const pageNo = query.get("page_no");
  const perPage = query.get("per_page");
  const orderBy = query.get("order_by");
  const order = query.get("order");

  const search = query.get("search");
  const status = query.get("status");
  const store = query.get("store");

  let columns: Array<Column> = [
    { id: "store_name", label: "Store" },
    { id: "id", label: "Order Number" },
    { id: "order_placement_date", label: "Order Placement Date" },
    {
      id: "requested_delivery_date",
      label: "Requested Delivery Date",
    },
    { id: "commited_delivery_date", label: "Commited Delivery Date" },
    { id: "order_confirmation_date", label: "Order Confirmation Date" },
    { id: "actual_delivery_date", label: "Actual Delivery Date" },
    { id: "description", label: "status" },
    { id: "billing_id", label: "Billing Id" },
    { id: "billing_amount", label: "Billing Amount" },
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

  // const handleAction = (id: string) => {
  //   setOrderId(id);
  //   handleModalToggle("supplierViewOrder");
  // };

  // const handleConfirmationModal = (value: boolean) => {
  //   setOpenConfirmOrderModal(value);
  //   setOpenPlaceOrderModal(false);
  // };

  const handleAction = (id: string) => {
    setOrderId(id);
    switch (tabValue) {
      case 0:
        handleModalToggle("supplierViewOrder");

        break;
      case 1:
        handleModalToggle("procurementReviewOrder");
        break;
      case 2:
        handleModalToggle("procurementConfirmOrder");
        break;
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  useEffect(() => {
    const currentTab: currentTab = {
      current_tab: tabValue,
    };

    const query = createQueryParams({
      page_no: pageNo,
      per_page: perPage,
      order_by: orderBy,
      order: order,
      search: search,
    });

    dispatch(getStockOrders({ query: query, param: currentTab }));
  }, [dispatch, pageNo, perPage, orderBy, order, search, tabValue, modals]);

  return (
    <>
      <div className="space-y-3">
        <div className="">
          <span className="text-secondary text-3xl font-['Bebas_Neue'] flex-1">
            Order
          </span>
        </div>

        <div className="bg-paper border-2 border-t-8 rounded-t-lg border-secondary">
          <Tabs
            className="bg-secondary text-white "
            value={tabValue}
            onChange={handleTabChange}
            scrollButtons="auto"
            allowScrollButtonsMobile
            variant="scrollable"
            TabIndicatorProps={{
              style: {
                backgroundColor: "white",
              },
            }}
          >
            {TAB_NAVIGATION.map((tabs, index) => (
              <Tab
                key={index}
                style={{
                  color: "white",
                }}
                label={tabs.label}
              />
            ))}
          </Tabs>

          <TabPanel index={tabValue} value={tabValue}>
            <div className="hidden md:block">
              <DataTable
                order={order === "asc" ? "asc" : "desc"}
                orderBy={orderBy ?? "dateadded"}
                search={search ?? ""}
                emptyMessage={`"No ${TAB_NAVIGATION[tabValue].label} yet."`}
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
                totalRows={getStockOrdersState.data?.pagination.total_rows ?? 0}
                perPage={getStockOrdersState.data?.pagination.per_page ?? 0}
                page={pageNo ? parseInt(pageNo) : 1}
              >
                {getStockOrdersState.data?.orders.map((order, index) => (
                  <DataTableRow key={index}>
                    <DataTableCell>{order.store_name}</DataTableCell>
                    <DataTableCell>{order.id}</DataTableCell>
                    <DataTableCell>
                      {order.id !== null
                        ? new Date(
                            order.order_placement_date
                          ).toLocaleDateString("en-PH", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          })
                        : order.order_placement_date}
                    </DataTableCell>
                    <DataTableCell>
                      {order.requested_delivery_date !== null
                        ? new Date(
                            order.requested_delivery_date
                          ).toLocaleDateString("en-PH", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          })
                        : order.requested_delivery_date}
                    </DataTableCell>
                    <DataTableCell>
                      {order.commited_delivery_date !== null
                        ? new Date(
                            order.commited_delivery_date
                          ).toLocaleDateString("en-PH", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          })
                        : order.commited_delivery_date}
                    </DataTableCell>
                    <DataTableCell>
                      {order.order_confirmation_date !== null
                        ? new Date(
                            order.order_confirmation_date
                          ).toLocaleDateString("en-PH", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          })
                        : order.order_confirmation_date}
                    </DataTableCell>
                    <DataTableCell>
                      {order.order_confirmation_date !== null
                        ? new Date(
                            order.actual_delivery_date
                          ).toLocaleDateString("en-PH", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          })
                        : order.order_confirmation_date}
                    </DataTableCell>
                    <DataTableCell>{order.description}</DataTableCell>
                    <DataTableCell>{order.billing_id}</DataTableCell>
                    <DataTableCell>{order.billing_amount}</DataTableCell>
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

            {/* <div className="block md:hidden">
              <DataList
                search={search ?? ""}
                emptyMessage={`"No ${TAB_NAVIGATION[tabValue].label} yet."`}
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
                      search: search,
                    };

                    const queryParams = createQueryParams(params);

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
                      search: search,
                    };

                    const queryParams = createQueryParams(params);

                    navigate({
                      pathname: "",
                      search: queryParams,
                    });
                  }
                }}
                totalRows={25}
                perPage={10}
                page={pageNo ? parseInt(pageNo) : 1}
              >
                <div className="py-4">
                  <div
                    onClick={handleAction}
                    className="flex flex-col rounded-sm bg-gray-200 p-1"
                  >
                    <div className="flex flex-wrap space-x-2">
                      <span className="text-xl capitalize font-base">
                        Taters Acacia Estate
                      </span>
                      <span className="text-xl uppercase">#1000</span>
                      <span className="border-2 rounded-full px-2 capitalize bg-[#f0ad4e]">
                        Update Order Status
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <div>
                        <span className="font-semibold">Placement Date: </span>
                        <span>July 8, 2023</span>
                      </div>
                      <div>
                        <span className="font-semibold">Requested Date: </span>
                        <span>July 8, 2023</span>
                      </div>
                      <div>
                        <span className="font-semibold">
                          Order Confirmation Date:
                        </span>
                        <span>July 8, 2023</span>
                      </div>
                      <div>
                        <span className="font-semibold">
                          Actual Delivery Date:
                        </span>
                        <span>July 8, 2023</span>
                      </div>
                    </div>
                    <div></div>
                  </div>
                  <Divider variant="middle" />
                </div>
              </DataList>
            </div> */}
          </TabPanel>
        </div>
      </div>

      {/* -------------------- */}

      <div
        className="absolute right-10 bottom-10"
        onClick={() => handleModalToggle("placeOrder")}
      >
        <Fab color="primary">
          <TiDocumentAdd className="text-3xl" />
        </Fab>
      </div>

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
        currentTab={tabValue}
        id={orderId}
      />

      <ProcurementReviewOrdersModal
        open={modals.procurementReviewOrder}
        onClose={() => handleModalToggle("procurementReviewOrder")}
        currentTab={tabValue}
        id={orderId}
      />

      <ProcurementConfirmOrdersModal
        open={modals.procurementConfirmOrder}
        onClose={() => handleModalToggle("procurementConfirmOrder")}
        currentTab={tabValue}
        id={orderId}
      />
      {/*
      <SupplierDispatchOrderModal
        open={openSupplierDispatchOrderModal}
        onClose={() => setOpenSupplierDispatchOrderModal(false)}
        currentTab={tabValue}
      />

      <SupplierEnRouteOrderModal
        open={openSupplierEnRouteOrderModal}
        onClose={() => setOpenSupplierEnRouteOrderModal(false)}
        currentTab={tabValue}
      />

      <SupplierEnFreightOrderModal
        open={openSupplierEnFreightOrderModal}
        onClose={() => setOpenSupplierEnFreightOrderModal(false)}
        currentTab={tabValue}
      />

      <StoreReceiveOrderModal
        open={openStoreReceiveOrderModal}
        onClose={() => setOpenStoreReceiveOrderModal(false)}
        currentTab={tabValue}
      />

      <SupplierUpdateBillingModal
        open={openSupplierUpdateBillingModal}
        onClose={() => setOpenSupplierUpdateBillingModal(false)}
        currentTab={tabValue}
      />

      <StorePayBillingModal
        open={openStorePayBillingModal}
        onClose={() => setOpenStorePayBillingModal(false)}
        currentTab={tabValue}
      />

      <SupplierConfirmModal
        open={openSupplierConfirmModal}
        onClose={() => setOpenSupplierConfirmModal(false)}
        currentTab={tabValue}
      /> */}
    </>
  );
}
