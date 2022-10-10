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
  getAdminStoreDeals,
  selectGetAdminStoreDeals,
  resetGetAdminStoreDealsStatus,
} from "../slices/get-admin-stores-deals.slice";
import {
  selectUpdateStoreDeal,
  updateStoreDeal,
} from "../slices/update-store-deal.slice";
import {
  getDealCategories,
  selectGetDealCategories,
} from "../slices/get-deal-categories.slice";
import { selectGetAdminSession } from "../slices/get-admin-session.slice";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

const columns: Array<Column> = [
  { id: "alias", label: "Alias" },
  { id: "name", label: "Name" },
  { id: "action", label: "Action" },
];

const createQueryParams = (params: object): string => {
  let result = "?";
  const paramsEntries = Object.entries(params);

  for (let [key, value] of paramsEntries) {
    if (value !== null) {
      result += `${key}=${value}&`;
    }
  }
  result = result.slice(0, -1);

  return result;
};

export function AdminAvailabilityDeals() {
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

  const getAdminStoreDealsState = useAppSelector(selectGetAdminStoreDeals);
  const getAdminSessionState = useAppSelector(selectGetAdminSession);
  const getDealCategoriesState = useAppSelector(selectGetDealCategories);
  const updateStoreDealState = useAppSelector(selectUpdateStoreDeal);

  useEffect(() => {
    dispatch(getDealCategories());
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
    dispatch(getAdminStoreDeals(query));
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
    updateStoreDealState,
  ]);

  return (
    <>
      <div className="flex flex-col px-4 lg:flex-row lg:items-end">
        <span className="text-secondary text-3xl font-['Bebas_Neue'] flex-1">
          Deals Availability
        </span>

        <div className="flex flex-col space-y-4 lg:items-center lg:justify-center lg:space-y-0 lg:space-x-2 lg:flex-row">
          <div className="flex space-x-2 ">
            <button
              onClick={() => {
                const params = {
                  page_no: pageNo,
                  per_page: perPage,
                  status: 0,
                  store_id: storeId,
                  category_id: categoryId,
                  search: search,
                };

                const queryParams = createQueryParams(params);

                dispatch(resetGetAdminStoreDealsStatus());
                navigate({
                  pathname: "",
                  search: queryParams,
                });
              }}
              className={`px-4 py-1 text-white bg-green-700 ${
                status === null || status === "0"
                  ? "text-base"
                  : "text-xs opacity-40"
              } rounded-full`}
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

                dispatch(resetGetAdminStoreDealsStatus());
                navigate({
                  pathname: "",
                  search: queryParams,
                });
              }}
              className={`px-4 py-1 text-white bg-red-700 ${
                status && status === "1" ? "text-base" : "text-xs opacity-40"
              } rounded-full `}
            >
              Not-Available
            </button>
          </div>
          {getAdminSessionState.data &&
          getAdminSessionState.data.user_details.stores ? (
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
                    store_id: value.store_id === -1 ? null : value.store_id,
                    category_id: categoryId,
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
        {getDealCategoriesState.data ? (
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
              {getDealCategoriesState.data?.map((category, index) => (
                <MenuItem key={index} value={category.id}>
                  <span className="text-xs lg:text-base">{category.name}</span>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        ) : null}
      </div>

      {getAdminStoreDealsState.data?.deals ? (
        <>
          <div className="p-4 lg:hidden">
            <DataList
              search={search ?? ""}
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

                  dispatch(resetGetAdminStoreDealsStatus());
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

                  dispatch(resetGetAdminStoreDealsStatus());
                  navigate({
                    pathname: "",
                    search: queryParams,
                  });
                }
              }}
              totalRows={getAdminStoreDealsState.data.pagination.total_rows}
              perPage={getAdminStoreDealsState.data.pagination.per_page}
              page={pageNo ? parseInt(pageNo) : 1}
            >
              <hr className="mt-4" />
              {getAdminStoreDealsState.data.deals.map((row, i) => (
                <div
                  className="flex flex-col px-4 py-2 space-y-4 border-b lg:space-y-0"
                  key={i}
                >
                  <span className="flex flex-wrap items-center space-x-1 font-semibold">
                    {row.alias}
                  </span>

                  <div
                    className="text-sm"
                    dangerouslySetInnerHTML={{
                      __html: row.name,
                    }}
                  />

                  {status === null || status === "0" ? (
                    <button
                      onClick={() => {
                        if (row.id)
                          dispatch(
                            updateStoreDeal({
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
                            updateStoreDeal({
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
              ))}
            </DataList>
          </div>

          <div className="hidden p-4 lg:block">
            <DataTable
              order={order === "asc" ? "asc" : "desc"}
              orderBy={orderBy ?? "id"}
              emptyMessage="Empty availability deals."
              search={search ?? ""}
              onSearch={(val) => {
                const params = {
                  page_no: null,
                  per_page: perPage,
                  status: status,
                  store_id: storeId,
                  category_id: categoryId,
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
                if (column_selected != "action") {
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

                  dispatch(resetGetAdminStoreDealsStatus());
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
                    category_id: categoryId,
                    order_by: orderBy,
                    order: order,
                    search: search,
                  };

                  const queryParams = createQueryParams(params);

                  dispatch(resetGetAdminStoreDealsStatus());
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
                    order_by: orderBy,
                    order: order,
                    search: search,
                  };

                  const queryParams = createQueryParams(params);

                  dispatch(resetGetAdminStoreDealsStatus());
                  navigate({
                    pathname: "",
                    search: queryParams,
                  });
                }
              }}
              totalRows={getAdminStoreDealsState.data.pagination.total_rows}
              perPage={getAdminStoreDealsState.data.pagination.per_page}
              page={pageNo ? parseInt(pageNo) : 1}
            >
              {getAdminStoreDealsState.data.deals !== undefined ? (
                <>
                  {getAdminStoreDealsState.data.deals.map((row, i) => (
                    <DataTableRow key={i}>
                      <DataTableCell>{row.alias}</DataTableCell>
                      <DataTableCell>{row.name}</DataTableCell>
                      <DataTableCell>
                        {status === null || status === "0" ? (
                          <button
                            onClick={() => {
                              if (row.id)
                                dispatch(
                                  updateStoreDeal({
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
                                  updateStoreDeal({
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
                  ))}
                </>
              ) : null}
            </DataTable>
          </div>
        </>
      ) : null}
    </>
  );
}
