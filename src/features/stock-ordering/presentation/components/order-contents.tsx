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
import { Box, Fab, IconButton, Tab, Tabs } from "@mui/material";
import { TiDocumentAdd } from "react-icons/ti";
import {
  ConfirmOrdersModal,
  PlaceOrderModal,
  ProcurementReviewOrdersModal,
  StoreRecieveOrderModal,
  SupplierDispatchOrderModal,
  SupplierEnFreightOrderModal,
  SupplierEnRouteOrderModal,
  SupplierViewOrderModal,
} from "../modals";
import { FaEye } from "react-icons/fa";
import { ProcurementConfirmOrdersModal } from "../modals/procurement-confirm-order.modal";

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

  const [openStoreRecieveOrderModal, setOpenStoreRecieveOrderModal] =
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
    { label: "RECIEVE ORDERS" },
    { label: "UPDATE ORDERS" },
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
                  const isAsc = orderBy === column_selected && order === "asc";

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
              <>
                <DataTableRow>
                  <DataTableCell>Data Placeholder</DataTableCell>
                  <DataTableCell>Data Placeholder</DataTableCell>
                  <DataTableCell>Data Placeholder</DataTableCell>
                  <DataTableCell>Data Placeholder</DataTableCell>
                  <DataTableCell>Data Placeholder</DataTableCell>
                  <DataTableCell>Data Placeholder</DataTableCell>
                  <DataTableCell>Data Placeholder</DataTableCell>
                  <DataTableCell>Data Placeholder</DataTableCell>
                  <DataTableCell>Data Placeholder</DataTableCell>
                  <DataTableCell>Data Placeholder</DataTableCell>
                  <DataTableCell>
                    <IconButton
                      onClick={() => {
                        if (tabValue === 0) {
                          setOpenSupplierViewOrderModal(true);
                        } else if (tabValue === 1) {
                          setOpenProcurementReviewOrderModal(true);
                        } else if (tabValue === 2) {
                          setOpenProcurementConfirmOrderModal(true);
                        } else if (tabValue === 3) {
                          setOpenSupplierDispatchOrderModal(true);
                        } else if (tabValue === 4) {
                          setOpenSupplierEnRouteOrderModal(true);
                        } else if (tabValue === 5) {
                          setOpenSupplierEnFreightOrderModal(true);
                        } else if (tabValue === 6) {
                          setOpenStoreRecieveOrderModal(true);
                        }
                      }}
                    >
                      <FaEye className="text-lg" />
                    </IconButton>
                  </DataTableCell>
                </DataTableRow>
              </>
            </DataTable>
          </TabPanel>
        </div>
      </div>

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

      <StoreRecieveOrderModal
        open={openStoreRecieveOrderModal}
        onClose={() => setOpenStoreRecieveOrderModal(false)}
        currentTab={tabValue}
      />
    </>
  );
}
