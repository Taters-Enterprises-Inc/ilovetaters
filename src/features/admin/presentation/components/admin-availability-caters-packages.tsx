import {
  Column,
  DataTable,
  DataTableCell,
  DataTableRow,
} from "../../../shared/presentation/components/data-table";
import { ExtractBtn } from "./extract-btn";
import { useEffect, useState } from "react";
import {
  useAppDispatch,
  useAppSelector,
  useQuery,
} from "features/config/hooks";
import { useNavigate } from "react-router-dom";
import NumberFormat from "react-number-format";
import { ADMIN_SNACKSHOP_ORDER_STATUS } from "features/shared/constants";
import Moment from "react-moment";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { FaEye } from "react-icons/fa";
import { DataList } from "features/shared/presentation/components";
import { AdminShopOrderModel } from "features/admin/core/domain/admin-shop-order.model";
import {
  getAdminStores,
  selectGetAdminStores,
} from "../slices/get-admin-stores.slice";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import {
  getAdminStoreCatersPackages,
  resetGetAdminStoreCatersPackagesStatus,
  selectGetAdminStoreCatersPackages,
} from "../slices/get-admin-stores-caters-packages.slice";
import {
  getCatersPackageCategories,
  selectGetCatersPackageCategories,
} from "../slices/get-caters-package-categories.slice";
import {
  selectUpdateStoreCatersPackage,
  updateStoreCatersPackage,
} from "../slices/update-store-caters-packages.slice";
import { selectGetAdminSession } from "../slices/get-admin-session.slice";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { createQueryParams } from "features/config/helpers";

const columns: Array<Column> = [
  { id: "name", label: "Name" },
  { id: "add_details", label: "Details" },
  { id: "category", label: "Category" },
  { id: "action", label: "Action" },
];

export function AdminAvailabilityCatersPackages() {
  const dispatch = useAppDispatch();
  const query = useQuery();
  const navigate = useNavigate();
  const pageNo = query.get("page_no");
  const perPage = query.get("per_page");
  const status = query.get("status");
  const storeId = query.get("store_id");
  const categoryId = query.get("category_id");
  const orderBy = query.get("order_by");
  const order = query.get("order");
  const search = query.get("search");

  const getAdminStoreCatersPackagesState = useAppSelector(
    selectGetAdminStoreCatersPackages
  );
  const getAdminSessionState = useAppSelector(selectGetAdminSession);
  const getCatersPackageCategoriesState = useAppSelector(
    selectGetCatersPackageCategories
  );
  const updateStoreCatersPackageState = useAppSelector(
    selectUpdateStoreCatersPackage
  );

  useEffect(() => {
    dispatch(getCatersPackageCategories());
  }, [dispatch]);

  useEffect(() => {
    const query = createQueryParams({
      page_no: pageNo,
      per_page: perPage,
      status: status,
      store_id: storeId ?? 3,
      category_id: categoryId,
      order_by: orderBy,
      order: order,
      search: search,
    });
    dispatch(getAdminStoreCatersPackages(query));
  }, [
    dispatch,
    pageNo,
    status,
    perPage,
    orderBy,
    order,
    search,
    storeId,
    categoryId,
    updateStoreCatersPackageState,
  ]);

  return (
    <>
      <div className="flex flex-col px-4 lg:flex-row lg:items-end">
        <span className="text-secondary text-3xl font-['Bebas_Neue'] flex-1">
          Caters Packages Availability
        </span>

        <div className="flex flex-col space-y-4 lg:items-center lg:justify-center lg:space-y-0 lg:space-x-2 lg:flex-row">
          <div className="flex space-x-2 ">
            <button
              onClick={() => {
                const params = {
                  page_no: pageNo,
                  per_page: perPage,
                  status: 0,
                  category_id: categoryId,
                  store_id: storeId,
                  search: search,
                };

                const queryParams = createQueryParams(params);

                dispatch(resetGetAdminStoreCatersPackagesStatus());
                navigate({
                  pathname: "",
                  search: queryParams,
                });
              }}
              className={`px-4 py-1 text-white bg-green-700 ${
                status === null || status === "0"
                  ? "text-base"
                  : "text-xs opacity-40"
              } rounded-full font-['Varela_Round']`}
            >
              Available
            </button>
            <button
              onClick={() => {
                const params = {
                  page_no: pageNo,
                  per_page: perPage,
                  status: 1,
                  store_id: storeId,
                  category_id: categoryId,
                  search: search,
                };

                const queryParams = createQueryParams(params);

                dispatch(resetGetAdminStoreCatersPackagesStatus());
                navigate({
                  pathname: "",
                  search: queryParams,
                });
              }}
              className={`px-4 py-1 text-white bg-red-700 ${
                status && status === "1" ? "text-base" : "text-xs opacity-40"
              } rounded-full font-['Varela_Round']`}
            >
              Not Available
            </button>
          </div>

          {getAdminSessionState.data ? (
            <Autocomplete
              disablePortal
              options={getAdminSessionState.data.user_details.stores}
              sx={{ width: 328 }}
              size="small"
              defaultValue={getAdminSessionState.data.user_details.stores[0]}
              getOptionLabel={(option) =>
                option.name + " (" + option.menu_name + ") "
              }
              onChange={(event, value) => {
                if (value) {
                  const params = {
                    page_no: pageNo,
                    per_page: perPage,
                    status: status,
                    category_id: categoryId,
                    store_id: value.store_id === -1 ? null : value.store_id,
                    search: search,
                  };

                  const queryParams = createQueryParams(params);

                  navigate({
                    pathname: "",
                    search: queryParams,
                  });
                }
              }}
              renderInput={(params) => (
                <TextField {...params} label="Select store" />
              )}
            />
          ) : null}
        </div>
      </div>
      <div className="px-4 py-2">
        {getCatersPackageCategoriesState.data ? (
          <FormControl sx={{ minWidth: 150, marginTop: 1 }} size="small">
            <InputLabel>Filter by category</InputLabel>

            <Select
              label="Filter by category"
              defaultValue={categoryId ?? "all"}
              onChange={(event) => {
                if (event.target.value !== status) {
                  const params = {
                    page_no: pageNo,
                    per_page: perPage,
                    status: status,
                    store_id: storeId,
                    category_id:
                      event.target.value === "all" ? null : event.target.value,
                    search: search,
                  };

                  const queryParams = createQueryParams(params);

                  navigate({
                    pathname: "",
                    search: queryParams,
                  });
                }
              }}
            >
              <MenuItem value="all">
                <span className="text-xs lg:text-base">All</span>
              </MenuItem>
              {getCatersPackageCategoriesState.data?.map((category, index) => (
                <MenuItem key={index} value={category.id}>
                  <span className="text-xs lg:text-base">{category.name}</span>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        ) : null}
      </div>

      {getAdminStoreCatersPackagesState.data?.caters_packages ? (
        <>
          <div className="p-4 -mt-2 lg:hidden">
            <DataList
              search={search ?? ""}
              emptyMessage="Empty availability caters packages."
              onSearch={(val) => {
                const params = {
                  page_no: null,
                  per_page: perPage,
                  status: status,
                  order_by: orderBy,
                  store_id: storeId,
                  category_id: categoryId,
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
                    store_id: storeId,
                    category_id: categoryId,
                    search: search,
                  };

                  const queryParams = createQueryParams(params);

                  dispatch(resetGetAdminStoreCatersPackagesStatus());
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
                    store_id: storeId,
                    category_id: categoryId,
                    search: search,
                  };

                  const queryParams = createQueryParams(params);

                  dispatch(resetGetAdminStoreCatersPackagesStatus());
                  navigate({
                    pathname: "",
                    search: queryParams,
                  });
                }
              }}
              totalRows={
                getAdminStoreCatersPackagesState.data.pagination.total_rows
              }
              perPage={
                getAdminStoreCatersPackagesState.data.pagination.per_page
              }
              page={pageNo ? parseInt(pageNo) : 1}
            >
              <hr className="mt-4" />
              {getAdminStoreCatersPackagesState.data.caters_packages.map(
                (row, i) => (
                  <div
                    className="flex flex-col px-4 py-2 space-y-4 border-b lg:space-y-0"
                    key={i}
                  >
                    <span className="flex flex-wrap items-center space-x-1 font-semibold">
                      {row.name}
                    </span>

                    <div
                      className="text-sm"
                      dangerouslySetInnerHTML={{
                        __html: row.add_details,
                      }}
                    />

                    {status === null || status === "0" ? (
                      <button
                        onClick={() => {
                          if (row.id)
                            dispatch(
                              updateStoreCatersPackage({
                                status: "1",
                                id: row.id.toString(),
                              })
                            );
                        }}
                        className={`px-4 py-1 text-white bg-red-700 rounded-full`}
                      >
                        Disable
                      </button>
                    ) : status === "1" ? (
                      <button
                        onClick={() => {
                          if (row.id)
                            dispatch(
                              updateStoreCatersPackage({
                                status: "0",
                                id: row.id.toString(),
                              })
                            );
                        }}
                        className={`px-4 py-1 text-white bg-green-700 rounded-full`}
                      >
                        Enable
                      </button>
                    ) : null}
                  </div>
                )
              )}
            </DataList>
          </div>

          <div className="hidden p-4 lg:block">
            <DataTable
              order={order === "asc" ? "asc" : "desc"}
              orderBy={orderBy ?? "id"}
              emptyMessage="Empty availability caters packages."
              search={search ?? ""}
              onSearch={(val) => {
                const params = {
                  page_no: null,
                  per_page: perPage,
                  status: status,
                  store_id: storeId,
                  order_by: orderBy,
                  category_id: categoryId,
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
                    store_id: storeId,
                    category_id: categoryId,
                    order_by: column_selected,
                    order: isAsc ? "desc" : "asc",
                    search: search,
                  };

                  const queryParams = createQueryParams(params);

                  dispatch(resetGetAdminStoreCatersPackagesStatus());
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
                    store_id: storeId,
                    order_by: orderBy,
                    category_id: categoryId,
                    order: order,
                    search: search,
                  };

                  const queryParams = createQueryParams(params);

                  dispatch(resetGetAdminStoreCatersPackagesStatus());
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
                    store_id: storeId,
                    order_by: orderBy,
                    category_id: categoryId,
                    order: order,
                    search: search,
                  };

                  const queryParams = createQueryParams(params);

                  dispatch(resetGetAdminStoreCatersPackagesStatus());
                  navigate({
                    pathname: "",
                    search: queryParams,
                  });
                }
              }}
              totalRows={
                getAdminStoreCatersPackagesState.data.pagination.total_rows
              }
              perPage={
                getAdminStoreCatersPackagesState.data.pagination.per_page
              }
              page={pageNo ? parseInt(pageNo) : 1}
            >
              {getAdminStoreCatersPackagesState.data.caters_packages !==
              undefined ? (
                <>
                  {getAdminStoreCatersPackagesState.data.caters_packages.map(
                    (row, i) => (
                      <DataTableRow key={i}>
                        <DataTableCell>{row.name}</DataTableCell>
                        <DataTableCell>
                          <div
                            dangerouslySetInnerHTML={{
                              __html: row.add_details,
                            }}
                          />
                        </DataTableCell>
                        <DataTableCell>{row.category_name}</DataTableCell>
                        <DataTableCell>
                          {status === null || status === "0" ? (
                            <button
                              onClick={() => {
                                if (row.id)
                                  dispatch(
                                    updateStoreCatersPackage({
                                      status: "1",
                                      id: row.id.toString(),
                                    })
                                  );
                              }}
                              className={`px-4 py-1 text-white bg-red-700 rounded-full`}
                            >
                              Disable
                            </button>
                          ) : status === "1" ? (
                            <button
                              onClick={() => {
                                if (row.id)
                                  dispatch(
                                    updateStoreCatersPackage({
                                      status: "0",
                                      id: row.id.toString(),
                                    })
                                  );
                              }}
                              className={`px-4 py-1 text-white bg-green-700 rounded-full`}
                            >
                              Enable
                            </button>
                          ) : null}
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
