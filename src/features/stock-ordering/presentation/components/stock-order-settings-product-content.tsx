import { createQueryParams } from "features/config/helpers";
import {
  useAppDispatch,
  useAppSelector,
  useQuery,
} from "features/config/hooks";
import { Link, useNavigate } from "react-router-dom";
import { ChangeEvent, useEffect, useState } from "react";
import Button from "@mui/material/Button";

import {
  Column,
  DataTable,
  DataTableCell,
  DataTableRow,
} from "features/shared/presentation/components/data-table";

import {
  DataList,
  MaterialInput,
  MaterialSwitch,
} from "features/shared/presentation/components";

import {
  getStockOrderSettingProducts,
  resetGetStockOrderSettingProductsStatus,
  selectGetStockOrderSettingProducts,
} from "../slices/stock-order-get-settings-products.slice";
import { AiFillCaretRight, AiFillFolderAdd } from "react-icons/ai";
import {
  selectstockOrderActiveStatus,
  stockOrderActiveStatus,
} from "../slices/stock-order-settings-product-active-status.slice";
import {
  openMessageModal,
  closeMessageModal,
} from "features/shared/presentation/slices/message-modal.slice";
import { PopupModal } from "../modals";
import {
  Step,
  StepConnector,
  StepContent,
  StepIconProps,
  StepLabel,
  Stepper,
  TextField,
  stepConnectorClasses,
  styled,
} from "@mui/material";
import { FaDiamond } from "react-icons/fa6";
import { PiDiamondLight, PiDiamondFill } from "react-icons/pi";

export function StockOrderSettingsProductContents() {
  let columns: Array<Column> = [
    { id: "id", label: "id" },
    { id: "product_id", label: "Product Id" },
    { id: "product_name", label: "Product Name" },
    { id: "uom", label: "UOM" },
    { id: "category_id", label: "Category Id" },
    { id: "cost", label: "Cost" },
    { id: "active_status", label: "Active Status" },
    { id: "", label: "Action" },
  ];

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const getStockOrderSettingsProductsState = useAppSelector(
    selectGetStockOrderSettingProducts
  );
  const updateStockOrderProductActiveStatus = useAppSelector(
    selectstockOrderActiveStatus
  );

  const [openPriceChange, setOpenPriceChange] = useState(false);

  const query = useQuery();
  const pageNo = query.get("page_no");
  const perPage = query.get("per_page");
  const orderBy = query.get("order_by");
  const order = query.get("order");

  const search = query.get("search");
  const status = query.get("status");

  useEffect(() => {
    const query = createQueryParams({
      page_no: pageNo,
      per_page: perPage,
      order_by: orderBy,
      order: order,
      search: search,
    });

    dispatch(getStockOrderSettingProducts(query));
  }, [
    dispatch,
    pageNo,
    perPage,
    orderBy,
    order,
    search,
    updateStockOrderProductActiveStatus,
  ]);

  const steps = [
    { label: "test 1" },
    { label: "test 2" },
    { label: "test 3" },
    { label: "test 4" },
    { label: "test 5" },
  ];

  const QontoConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 10,
      left: "calc(-50% + 16px)",
      right: "calc(50% + 16px)",
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: "#784af4",
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: "#784af4",
      },
    },

    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#eaeaf0",
      borderLeftWidth: 3,
      borderRadius: 1,
    },
  }));

  const QontoStepIconRoot = styled("div")<{ ownerState: { active?: boolean } }>(
    ({ theme, ownerState }) => ({
      color: "#eaeaf0",
      display: "flex",
      height: 22,
      alignItems: "center",
      ...(ownerState.active && {
        color: "#784af4",
      }),
      "& .QontoStepIcon-completedIcon": {
        color: "#784af4",
        zIndex: 1,
        fontSize: 18,
      },
      "& .QontoStepIcon-circle": {
        width: 8,
        color: "#784af4",
        height: 8,
        borderRadius: "50%",
        backgroundColor: "currentColor",
      },
    })
  );

  function QontoStepIcon(props: StepIconProps) {
    const { active, completed, className } = props;

    return (
      <QontoStepIconRoot ownerState={{ active }} className={className}>
        {completed ? (
          <PiDiamondLight className="QontoStepIcon-completedIcon" />
        ) : (
          <PiDiamondFill className="QontoStepIcon-completedIcon" />
        )}
      </QontoStepIconRoot>
    );
  }

  return (
    <>
      <div className="space-y-3">
        <div className="flex flex-col px-4 lg:flex-row lg:items-end">
          <span className="text-secondary text-3xl font-['Bebas_Neue'] flex-1">
            Products
          </span>
          <div className="flex flex-col space-y-1 lg:flex-row lg:space-x-4 lg:space-y-0">
            <div>
              <Link
                to="create"
                className="inline-flex items-center px-4 tracking-wide py-1  bg-button font-['Varela_Round'] text-white text-xs rounded-md font-700"
              >
                <AiFillFolderAdd size={20} />
                <span>&nbsp;&nbsp;Create a new Product</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="hidden md:block">
          <DataTable
            order={order === "asc" ? "asc" : "desc"}
            orderBy={orderBy ?? "last_updated"}
            search={search ?? ""}
            emptyMessage={`"No products."`}
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

                dispatch(resetGetStockOrderSettingProductsStatus());
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

                dispatch(resetGetStockOrderSettingProductsStatus());
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

                dispatch(resetGetStockOrderSettingProductsStatus());
                navigate({
                  pathname: "",
                  search: queryParams,
                });
              }
            }}
            totalRows={
              getStockOrderSettingsProductsState.data?.pagination.total_rows ??
              1
            }
            perPage={
              getStockOrderSettingsProductsState.data?.pagination.per_page ?? 25
            }
            page={pageNo ? parseInt(pageNo) : 1}
          >
            {getStockOrderSettingsProductsState.data?.products.map(
              (product) => (
                <DataTableRow>
                  <DataTableCell>{product.id}</DataTableCell>
                  <DataTableCell>{product.product_id}</DataTableCell>
                  <DataTableCell>{product.product_name}</DataTableCell>
                  <DataTableCell>{product.uom}</DataTableCell>
                  <DataTableCell>{product.category_id}</DataTableCell>
                  <DataTableCell>{product.cost}</DataTableCell>
                  <DataTableCell>
                    <MaterialSwitch
                      label=""
                      checked={product.active_status === 1 ? true : false}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        dispatch(
                          openMessageModal({
                            message: `Are you sure you want to ${
                              checked ? "enable" : "disable"
                            } the deal ?`,
                            buttons: [
                              {
                                color: "#CC5801",
                                text: "Yes",
                                onClick: () => {
                                  dispatch(
                                    stockOrderActiveStatus({
                                      id: product.id,
                                      active_status: checked,
                                    })
                                  );
                                  dispatch(closeMessageModal());
                                },
                              },
                              {
                                color: "#22201A",
                                text: "No",
                                onClick: () => {
                                  dispatch(closeMessageModal());
                                },
                              },
                            ],
                          })
                        );
                      }}
                    />
                  </DataTableCell>

                  <DataTableCell
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      "& > * + *": {
                        marginTop: "0.25rem",
                      },
                    }}
                  >
                    <Link
                      to={`edit/${product.id}`}
                      className="inline-flex items-center px-4 tracking-wide py-1 bg-button font-['Varela_Round'] text-white text-xs rounded-md font-700 text-center" // Apply text-center class
                    >
                      <span>Edit</span>
                    </Link>

                    <Button
                      variant="contained"
                      size="small"
                      sx={{ backgroundColor: "rgba(204, 88, 1, 1)" }}
                      onClick={() => setOpenPriceChange(true)}
                    >
                      <span className="capitalize text-xs">Price change</span>
                    </Button>
                  </DataTableCell>
                </DataTableRow>
              )
            )}
          </DataTable>
        </div>

        <div className="block md:hidden">
          <DataList
            search={search ?? ""}
            emptyMessage="No products"
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
                  order_by: orderBy,
                  order: order,
                  search: search,
                };

                const queryParams = createQueryParams(params);

                dispatch(resetGetStockOrderSettingProductsStatus());
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

                dispatch(resetGetStockOrderSettingProductsStatus());
                navigate({
                  pathname: "",
                  search: queryParams,
                });
              }
            }}
            totalRows={
              getStockOrderSettingsProductsState.data?.pagination.total_rows ??
              1
            }
            perPage={
              getStockOrderSettingsProductsState.data?.pagination.per_page ?? 25
            }
            page={pageNo ? parseInt(pageNo) : 1}
          >
            {getStockOrderSettingsProductsState.data?.products.map(
              (product) => (
                <div className="space-y-2 mt-2">
                  <div className="flex flex-col border border-gray-200 rounded-md shadow-sm p-2 bg-white">
                    <div className="flex justify-between text-normal">
                      <span className="normal-case">
                        {product.product_name}
                      </span>
                      <span>{product.product_name}</span>
                    </div>
                    <div className="text-sm">
                      <span className="lowercase">{product.uom}</span>
                    </div>

                    <div className="text-xs capitalize space-x-1">
                      <span>{product.category_id}</span>
                    </div>

                    <div className="text-xs capitalize space-x-1">
                      <span>{product.cost}</span>
                    </div>
                  </div>
                </div>
              )
            )}
          </DataList>
        </div>
      </div>

      <PopupModal
        noIcon
        open={openPriceChange}
        title={"Price Change"}
        message={""}
        customButton
      >
        <div className="px-5">
          <Stepper
            orientation="vertical"
            activeStep={4}
            connector={<QontoConnector />}
          >
            {steps.map((label, index) => (
              <Step key={label.label}>
                <div className="flex">
                  <div className="flex items-center text-xs">15 Mar</div>
                  <StepLabel
                    StepIconComponent={QontoStepIcon}
                    sx={{ display: "flex", alignItems: "end" }}
                  >
                    {label.label}
                  </StepLabel>
                </div>
              </Step>
            ))}
          </Stepper>
        </div>

        <MaterialInput
          fullWidth
          colorTheme={"black"}
          onChange={() => {}}
          name={"priceInput"}
        />
      </PopupModal>
    </>
  );
}
