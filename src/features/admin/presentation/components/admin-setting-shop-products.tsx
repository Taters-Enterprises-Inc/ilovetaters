import {
  Column,
  DataTable,
  DataTableCell,
  DataTableRow,
} from "../../../shared/presentation/components/data-table";
import { useEffect } from "react";
import {
  useAppDispatch,
  useAppSelector,
  useQuery,
} from "features/config/hooks";
import { Link, useNavigate } from "react-router-dom";
import {
  DataList,
  MaterialSwitch,
} from "features/shared/presentation/components";
import { createQueryParams } from "features/config/helpers";
import {
  getAdminSettingShopProducts,
  resetGetAdminSettingShopProductsStatus,
  selectGetAdminSettingShopProducts,
} from "../slices/get-admin-setting-shop-products.slice";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import { AiFillFolderAdd } from "react-icons/ai";
import Checkbox from "@mui/material/Checkbox";
import {
  updateAdminSettingShopProductStatus,
  selectUpdateAdminSettingShopProductStatus,
} from "../slices/update-admin-setting-shop-product-status.slice";
import NumberFormat from "react-number-format";
import {
  closeMessageModal,
  openMessageModal,
} from "features/shared/presentation/slices/message-modal.slice";

export function AdminSettingShopProducts() {
  const dispatch = useAppDispatch();

  const query = useQuery();
  const navigate = useNavigate();
  const pageNo = query.get("page_no");
  const perPage = query.get("per_page");
  const orderBy = query.get("order_by");
  const order = query.get("order");
  const search = query.get("search");
  const status = query.get("status");

  let columns: Array<Column> = [
    { id: "image", label: "Image" },
    { id: "name", label: "Name", minWidth: 220 },
    { id: "description", label: "Description" },
    { id: "price", label: "Price" },
    {
      id: "snackshop-status",
      label: "Snackshop Status",
    },
    {
      id: "popclub-status",
      label: "Popclub Status",
    },
    { id: "action", label: "" },
  ];

  const getAdminSettingShopProductsState = useAppSelector(
    selectGetAdminSettingShopProducts
  );

  const updateAdminSettingShopProductStatusState = useAppSelector(
    selectUpdateAdminSettingShopProductStatus
  );

  useEffect(() => {
    const query = createQueryParams({
      page_no: pageNo,
      per_page: perPage,
      order_by: orderBy,
      order: order,
      search: search,
      status: status,
    });

    dispatch(getAdminSettingShopProducts(query));
  }, [
    updateAdminSettingShopProductStatusState,
    dispatch,
    pageNo,
    perPage,
    orderBy,
    order,
    search,
    status,
  ]);

  return (
    <>
      <div className="flex flex-col px-4 lg:flex-row lg:items-end">
        <span className="text-secondary text-3xl font-['Bebas_Neue'] flex-1">
          List of Products
        </span>
        <div className="flex flex-col space-y-1 lg:flex-row lg:space-x-4 lg:space-y-0">
          <div>
            <Link
              to="create-product"
              className="inline-flex items-center px-4 tracking-wide py-1  bg-button font-['Varela_Round'] text-white text-xs rounded-md font-700"
            >
              <AiFillFolderAdd size={20} />
              <span>&nbsp;&nbsp;Create a new Product</span>
            </Link>
          </div>
        </div>
      </div>
      {getAdminSettingShopProductsState.data?.shop_products ? (
        <>
          <div className="p-4 lg:hidden">
            <DataList
              search={search ?? ""}
              emptyMessage="No products yet."
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

                  dispatch(resetGetAdminSettingShopProductsStatus());
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

                  dispatch(resetGetAdminSettingShopProductsStatus());
                  navigate({
                    pathname: "",
                    search: queryParams,
                  });
                }
              }}
              totalRows={
                getAdminSettingShopProductsState.data.pagination.total_rows
              }
              perPage={
                getAdminSettingShopProductsState.data.pagination.per_page
              }
              page={pageNo ? parseInt(pageNo) : 1}
            >
              <hr className="mt-4" />
              {getAdminSettingShopProductsState.data.shop_products.map(
                (row, i) => (
                  <div
                    className="flex flex-col px-4 py-2 space-y-4 border-b lg:space-y-0"
                    key={i}
                  >
                    <span className="flex flex-wrap items-center space-x-1 text-xl">
                      <span className="text-xs lg:text-bas">{row.name}</span>
                    </span>
                  </div>
                )
              )}
            </DataList>
          </div>

          <div className="hidden p-4 lg:block">
            <DataTable
              order={order === "asc" ? "asc" : "desc"}
              orderBy={orderBy ?? "id"}
              emptyMessage="No stores yet."
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

                  dispatch(resetGetAdminSettingShopProductsStatus());
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

                  dispatch(resetGetAdminSettingShopProductsStatus());
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

                  dispatch(resetGetAdminSettingShopProductsStatus());
                  navigate({
                    pathname: "",
                    search: queryParams,
                  });
                }
              }}
              totalRows={
                getAdminSettingShopProductsState.data.pagination.total_rows
              }
              perPage={
                getAdminSettingShopProductsState.data.pagination.per_page
              }
              page={pageNo ? parseInt(pageNo) : 1}
            >
              {getAdminSettingShopProductsState.data.shop_products !==
              undefined ? (
                <>
                  {getAdminSettingShopProductsState.data.shop_products.map(
                    (row, i) => (
                      <DataTableRow key={i}>
                        <DataTableCell>
                          <img
                            src={`${REACT_APP_DOMAIN_URL}api/assets/images/shared/products/250/${row.product_image}`}
                            alt="Shop Product"
                            className="rounded-[10px] w-[75px] h-[75px]"
                            onError={({ currentTarget }) => {
                              currentTarget.onerror = null;
                              currentTarget.src = `${REACT_APP_DOMAIN_URL}api/assets/images/shared/image_not_found/blank.jpg`;
                            }}
                          />
                        </DataTableCell>
                        <DataTableCell>{row.name}</DataTableCell>
                        <DataTableCell>
                          <span
                            dangerouslySetInnerHTML={{
                              __html: row.description + " " + row.add_details,
                            }}
                          />
                        </DataTableCell>
                        <DataTableCell>
                          <NumberFormat
                            value={row.price.toFixed(2)}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={"₱"}
                          />
                        </DataTableCell>

                        <DataTableCell>
                          <MaterialSwitch
                            label=""
                            checked={row.status === 1 ? true : false}
                            onChange={(e) => {
                              const checked = e.target.checked;
                              dispatch(
                                openMessageModal({
                                  message: `Are you sure you want to ${
                                    checked ? "enable" : "disable"
                                  } the product ?`,
                                  buttons: [
                                    {
                                      color: "#CC5801",
                                      text: "Yes",
                                      onClick: () => {
                                        dispatch(
                                          updateAdminSettingShopProductStatus({
                                            product_id: row.id,
                                            status: checked ? 1 : 0,
                                            type: "snackshop",
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

                        <DataTableCell>
                          <MaterialSwitch
                            label=""
                            checked={row.popclub_status === 1 ? true : false}
                            onChange={(e) => {
                              const checked = e.target.checked;
                              dispatch(
                                openMessageModal({
                                  message: `Are you sure you want to ${
                                    checked ? "enable" : "disable"
                                  } the product on popclub ?`,
                                  buttons: [
                                    {
                                      color: "#CC5801",
                                      text: "Yes",
                                      onClick: () => {
                                        dispatch(
                                          updateAdminSettingShopProductStatus({
                                            product_id: row.id,
                                            status: checked ? 1 : 0,
                                            type: "popclub",
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

                        <DataTableCell>
                          <div className="flex flex-col items-start justify-start space-y-2">
                            <Link
                              to={`${row.id}`}
                              className="px-3 py-1 border rounded-lg border-secondary font-['Varela_Round']"
                            >
                              Edit
                            </Link>
                            <Link
                              to={`copy/${row.id}`}
                              className="px-3 py-1 border rounded-lg border-secondary font-['Varela_Round']"
                            >
                              Copy
                            </Link>
                          </div>
                        </DataTableCell>
                      </DataTableRow>
                    )
                  )}
                </>
              ) : null}
            </DataTable>
          </div>
        </>
      ) : null}
    </>
  );
}
