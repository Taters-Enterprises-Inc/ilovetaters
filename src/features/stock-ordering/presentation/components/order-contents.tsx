import { createQueryParams } from "features/config/helpers";
import { useAppDispatch, useQuery } from "features/config/hooks";
import { DataTable } from "features/shared/presentation/components";
import {
  DataTableRow,
  DataTableCell,
  Column,
} from "features/shared/presentation/components/data-table";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
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

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export function OrderContents() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [openPlaceOrderModal, setOpenPlaceOrderModal] = useState(false);
  const [openConfirmOrderModal, setOpenConfirmOrderModal] = useState(false);
  const [openSupplierViewOrderModal, setOpenSupplierViewOrderModal] =
    useState(false);
  const [openProcurementReviewOrderModal, setOpenProcurementReviewOrderModal] =
    useState(false);
  const [
    openProcurementConfirmOrderModal,
    setOpenProcurementConfirmOrderModal,
  ] = useState(false);

  const [openSupplierDispatchOrderModal, setOpenSupplierDispatchOrderModal] =
    useState(false);

  const [openSupplierEnRouteOrderModal, setOpenSupplierEnRouteOrderModal] =
    useState(false);

  const [openSupplierEnFreightOrderModal, setOpenSupplierEnFreightOrderModal] =
    useState(false);

  const [openStoreReceiveOrderModal, setOpenStoreReceiveOrderModal] =
    useState(false);

  const [openSupplierUpdateBillingModal, setOpenSupplierUpdateBillingModal] =
    useState(false);

  const [openStorePayBillingModal, setOpenStorePayBillingModal] =
    useState(false);

  const [openSupplierConfirmModal, setOpenSupplierConfirmModal] =
    useState(false);

  const [tabValue, setTabValue] = useState(0);

  const query = useQuery();
  const pageNo = query.get("page_no");
  const perPage = query.get("per_page");
  const orderBy = query.get("order_by");
  const order = query.get("order");
  const search = query.get("search");
  const status = query.get("status");

  const TAB_NAVIGATION = [
    { label: "NEW ORDERS" },
    { label: "REVIEW ORDERS" },
    { label: "CONFIRM ORDERS" },
    { label: "DISPATCH ORDERS" },
    { label: "ORDERS EN ROUTE" },
    { label: "ORDER IN FREIGHT" },
    { label: "RECEIVE ORDERS" },
    { label: "UPDATE BILLING" },
    { label: "PAY BILLING" },
    { label: "CONFIRM PAYMENT" },
    { label: "ORDERS COMPLETE" },
  ];

  let columns: Array<Column> = [
    { id: "store", label: "Store" },
    { id: "orderNumber", label: "Order Number" },
    { id: "orderPlacementDate", label: "Order Placement Date" },
    {
      id: "requestedDeliveryDate",
      label: "Requested Delivery Date",
    },
    { id: "commitedDeliveryDate", label: "Commited Delivery Date" },
    { id: "confirmedDate", label: "Order Confirmation Date" },
    { id: "actualDelivery", label: "Actual Delivery Date" },
    { id: "status", label: "status" },
    { id: "billingId", label: "Billing Id" },
    { id: "billingAmount", label: "Billing Amount" },
    { id: "paymentStatus", label: "Payment Status" },
    { id: "action", label: "Action" },
  ];

  const handleConfirmationModal = (value: boolean) => {
    setOpenConfirmOrderModal(value);
    setOpenPlaceOrderModal(false);
  };

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

  const handleAction = () => {
    switch (tabValue) {
      case 0:
        setOpenSupplierViewOrderModal(true);
        break;
      case 1:
        setOpenProcurementReviewOrderModal(true);
        break;
      case 2:
        setOpenProcurementConfirmOrderModal(true);
        break;
      case 3:
        setOpenSupplierDispatchOrderModal(true);
        break;
      case 4:
        setOpenSupplierEnRouteOrderModal(true);
        break;
      case 5:
        setOpenSupplierEnFreightOrderModal(true);
        break;
      case 6:
        setOpenStoreReceiveOrderModal(true);
        break;
      case 7:
        setOpenSupplierUpdateBillingModal(true);
        break;
      case 8:
        setOpenStorePayBillingModal(true);
        break;
      case 9:
        setOpenSupplierConfirmModal(true);
        break;
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

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
                orderBy={orderBy ?? "id"}
                emptyMessage="No Orders yet."
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

                    // dispatch(resetGetAuditSettingQuestionsStatus());
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

                    // dispatch(resetGetAuditSettingQuestionsStatus());
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

                    // dispatch(resetGetAuditSettingQuestionsStatus());
                    navigate({
                      pathname: "",
                      search: queryParams,
                    });
                  }
                }}
                totalRows={25} //To be updated
                perPage={10} //To be updated
                page={pageNo ? parseInt(pageNo) : 1}
              >
                <DataTableRow>
                  <DataTableCell>Taters Acacia Estates</DataTableCell>
                  <DataTableCell>1</DataTableCell>
                  <DataTableCell>July 8, 2023</DataTableCell>
                  <DataTableCell>July 15, 2023</DataTableCell>
                  <DataTableCell>July 18, 2023</DataTableCell>
                  <DataTableCell>July 10, 2023</DataTableCell>
                  <DataTableCell>July 20</DataTableCell>
                  <DataTableCell>Update Order Status</DataTableCell>
                  <DataTableCell>00001</DataTableCell>
                  <DataTableCell>100000</DataTableCell>
                  <DataTableCell>Unpaid</DataTableCell>
                  <DataTableCell>
                    <IconButton onClick={handleAction}>
                      <FaEye className="text-lg" />
                    </IconButton>
                  </DataTableCell>
                </DataTableRow>
              </DataTable>
            </div>

            <div className="block md:hidden">
              <DataList
                search={search ?? ""}
                emptyMessage={`"No ${columns[tabValue]} redeems yet."`}
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
            </div>
          </TabPanel>
        </div>
      </div>

      {/* -------------------- */}

      <div
        className="absolute right-10 bottom-10"
        onClick={() => setOpenPlaceOrderModal(true)}
      >
        <Fab color="primary">
          <TiDocumentAdd className="text-3xl" />
        </Fab>
      </div>

      <PlaceOrderModal
        open={openPlaceOrderModal}
        onClose={() => {
          setOpenPlaceOrderModal(false);
        }}
        openConfirmationState={handleConfirmationModal}
      />

      <ConfirmOrdersModal
        open={openConfirmOrderModal}
        onClose={() => setOpenConfirmOrderModal(false)}
      />

      <SupplierViewOrderModal
        open={openSupplierViewOrderModal}
        onClose={() => setOpenSupplierViewOrderModal(false)}
        currentTab={tabValue}
      />

      <ProcurementReviewOrdersModal
        open={openProcurementReviewOrderModal}
        onClose={() => setOpenProcurementReviewOrderModal(false)}
        currentTab={tabValue}
      />

      <ProcurementConfirmOrdersModal
        open={openProcurementConfirmOrderModal}
        onClose={() => setOpenProcurementConfirmOrderModal(false)}
        currentTab={tabValue}
      />

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
      />
    </>
  );
}
