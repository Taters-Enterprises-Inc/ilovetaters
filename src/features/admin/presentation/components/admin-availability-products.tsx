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
import { useNavigate } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import {
  DataList,
  MaterialInputAutoComplete,
  MaterialInput,
} from "features/shared/presentation/components";
import {
  getAdminStoreProducts,
  resetGetAdminStoreProductsStatus,
  selectGetAdminStoreProducts,
} from "../slices/get-admin-stores-products.slice";
import {
  getAdminProductCategories,
  selectGetAdminProductCategories,
} from "../slices/get-admin-product-categories.slice";
import {
  selectUpdateStoreProduct,
  updateStoreProduct,
} from "../slices/update-store-product.slice";
import { selectGetAdminSession } from "../slices/get-admin-session.slice";
import { createQueryParams } from "features/config/helpers";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import NumberFormat from "react-number-format";

const columns: Array<Column> = [
  { id: "image", label: "Image" },
  { id: "name", label: "Name" },
  { id: "add_details", label: "Details" },
  { id: "category", label: "Category" },
  { id: "price", label: "Price" },
  { id: "action", label: "Action" },
];

export function AdminAvailabilityProducts() {
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

  const getAdminStoreProductsState = useAppSelector(
    selectGetAdminStoreProducts
  );
  const getAdminSessionState = useAppSelector(selectGetAdminSession);
  const getAdminProductCategoriesState = useAppSelector(
    selectGetAdminProductCategories
  );
  const updateStoreProductState = useAppSelector(selectUpdateStoreProduct);

  useEffect(() => {
    dispatch(getAdminProductCategories());
  }, [dispatch]);

  useEffect(() => {
    const defaultStoreId =
      getAdminSessionState.data?.admin.user_details.stores[0].store_id ?? 3;

    const query = createQueryParams({
      page_no: pageNo,
      per_page: perPage,
      status: status,
      store_id: storeId ?? defaultStoreId,
      category_id: categoryId,
      order_by: orderBy,
      order: order,
      search: search,
    });
    dispatch(getAdminStoreProducts(query));
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
    updateStoreProductState,
    getAdminSessionState,
  ]);

  return (
    <>
      <div className="flex flex-col px-4 lg:flex-row lg:items-end">
        <span className="text-secondary text-3xl font-['Bebas_Neue'] flex-1">
          Products Availability
        </span>

        <div className="flex flex-col space-y-4 lg:items-center lg:justify-center lg:space-y-0 lg:space-x-2 lg:flex-row">
          <div className="flex space-x-2 ">
            <button
              onClick={() => {
                const params = {
                  page_no: pageNo,
                  per_page: perPage,
                  status: 1,
                  category_id: categoryId,
                  store_id: storeId,
                  search: search,
                };

                const queryParams = createQueryParams(params);

                dispatch(resetGetAdminStoreProductsStatus());
                navigate({
                  pathname: "",
                  search: queryParams,
                });
              }}
              className={`px-4 py-1 text-white bg-green-700 ${
                status === null || status === "1"
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
                  status: 0,
                  store_id: storeId,
                  category_id: categoryId,
                  search: search,
                };

                const queryParams = createQueryParams(params);

                dispatch(resetGetAdminStoreProductsStatus());
                navigate({
                  pathname: "",
                  search: queryParams,
                });
              }}
              className={`px-4 py-1 text-white bg-red-700 ${
                status && status === "0" ? "text-base" : "text-xs opacity-40"
              } rounded-full font-['Varela_Round']`}
            >
              Not Available
            </button>
          </div>

          {getAdminSessionState.data ? (
            <MaterialInputAutoComplete
              label="Select store"
              colorTheme="black"
              sx={{ width: 328 }}
              size="small"
              options={getAdminSessionState.data.admin.user_details.stores}
              defaultValue={
                getAdminSessionState.data.admin.user_details.stores[0]
              }
              isOptionEqualToValue={(option, value) =>
                option.name + " (" + option.menu_name + ") " ===
                value.name + " (" + value.menu_name + ") "
              }
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
            />
          ) : null}
        </div>
      </div>
      <div className="px-4 py-2">
        {getAdminProductCategoriesState.data ? (
          <MaterialInput
            colorTheme="black"
            label="Filter by category"
            className="!min-w-[150px]"
            size="small"
            select
            name="category"
            value={categoryId ?? "all"}
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
            {getAdminProductCategoriesState.data?.map((category, index) => (
              <MenuItem key={index} value={category.id}>
                <span className="text-xs lg:text-base">{category.name}</span>
              </MenuItem>
            ))}
          </MaterialInput>
        ) : null}
      </div>

      {getAdminStoreProductsState.data?.products ? (
        <>
          <div className="p-4 -mt-2 lg:hidden">
            <DataList
              search={search ?? ""}
              emptyMessage="Empty availability products."
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

                  dispatch(resetGetAdminStoreProductsStatus());
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

                  dispatch(resetGetAdminStoreProductsStatus());
                  navigate({
                    pathname: "",
                    search: queryParams,
                  });
                }
              }}
              totalRows={getAdminStoreProductsState.data.pagination.total_rows}
              perPage={getAdminStoreProductsState.data.pagination.per_page}
              page={pageNo ? parseInt(pageNo) : 1}
            >
              <hr className="mt-4" />
              {getAdminStoreProductsState.data.products.map((row, i) => (
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
                            updateStoreProduct({
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
                            updateStoreProduct({
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
              emptyMessage="Empty availability products."
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

                  dispatch(resetGetAdminStoreProductsStatus());
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

                  dispatch(resetGetAdminStoreProductsStatus());
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

                  dispatch(resetGetAdminStoreProductsStatus());
                  navigate({
                    pathname: "",
                    search: queryParams,
                  });
                }
              }}
              totalRows={getAdminStoreProductsState.data.pagination.total_rows}
              perPage={getAdminStoreProductsState.data.pagination.per_page}
              page={pageNo ? parseInt(pageNo) : 1}
            >
              {getAdminStoreProductsState.data.products !== undefined ? (
                <>
                  {getAdminStoreProductsState.data.products.map((row, i) => (
                    <DataTableRow key={i}>
                      <DataTableCell>
                        <img
                          src={`${REACT_APP_DOMAIN_URL}api/assets/images/shared/products/250/${row.product_image}`}
                          alt="Deal Product"
                          className="rounded-[10px] w-[75px] h-[75px]"
                          onError={({ currentTarget }) => {
                            currentTarget.onerror = null;
                            currentTarget.src = `${REACT_APP_DOMAIN_URL}api/assets/images/shared/image_not_found/blank.jpg`;
                          }}
                        />
                      </DataTableCell>
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
                        <NumberFormat
                          value={row.price.toFixed(2)}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"₱"}
                        />
                      </DataTableCell>
                      <DataTableCell>
                        {status === null || status === "1" ? (
                          <button
                            onClick={() => {
                              if (row.id)
                                dispatch(
                                  updateStoreProduct({
                                    status: "0",
                                    id: row.id.toString(),
                                  })
                                );
                            }}
                            className={`px-4 py-1 text-white bg-red-700 rounded-full`}
                          >
                            Disable
                          </button>
                        ) : status === "0" ? (
                          <button
                            onClick={() => {
                              if (row.id)
                                dispatch(
                                  updateStoreProduct({
                                    status: "1",
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
