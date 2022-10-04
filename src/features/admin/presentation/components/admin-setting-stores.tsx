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
import { DataList } from "features/shared/presentation/components";
import {
  getAdminSettingStores,
  resetGetAdminSettingStoresStatus,
  selectGetAdminSettingStores,
} from "../slices/get-admin-setting-stores.slice";
import Checkbox from "@mui/material/Checkbox";
import {
  selectUpdateAdminSettingStore,
  updateAdminSettingStore,
} from "../slices/update-setting-store.slice";

const columns: Array<Column> = [
  { id: "name", label: "Name" },
  { id: "category", label: "Category" },
  { id: "snackshop", label: "Snackshop" },
  { id: "catering", label: "Catering" },
  { id: "popclub-walk-in", label: "Popclub Walk-in" },
  { id: "popclub-online-delivery", label: "Popclub Online Delivery" },
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

export function AdminSettingStores() {
  const dispatch = useAppDispatch();
  const query = useQuery();
  const navigate = useNavigate();
  const pageNo = query.get("page_no");
  const perPage = query.get("per_page");
  const orderBy = query.get("order_by");
  const order = query.get("order");
  const search = query.get("search");

  const getAdminSettingStoresState = useAppSelector(
    selectGetAdminSettingStores
  );

  const updateAdminSettingStoreState = useAppSelector(
    selectUpdateAdminSettingStore
  );

  useEffect(() => {
    const query = createQueryParams({
      page_no: pageNo,
      per_page: perPage,
      order_by: orderBy,
      order: order,
      search: search,
    });

    dispatch(getAdminSettingStores(query));
  }, [
    dispatch,
    pageNo,
    perPage,
    orderBy,
    order,
    search,
    updateAdminSettingStoreState,
  ]);

  return (
    <>
      <div className="flex flex-col px-4 lg:flex-row lg:items-end">
        <span className="text-secondary text-3xl font-['Bebas_Neue'] flex-1">
          List of Stores
        </span>
      </div>

      {getAdminSettingStoresState.data?.stores ? (
        <>
          <div className="p-4 lg:hidden">
            <DataList
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
              onRowsPerPageChange={(event) => {
                if (perPage !== event.target.value) {
                  const params = {
                    page_no: pageNo,
                    per_page: event.target.value,
                    search: search,
                  };

                  const queryParams = createQueryParams(params);

                  dispatch(resetGetAdminSettingStoresStatus());
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

                  dispatch(resetGetAdminSettingStoresStatus());
                  navigate({
                    pathname: "",
                    search: queryParams,
                  });
                }
              }}
              totalRows={getAdminSettingStoresState.data.pagination.total_rows}
              perPage={getAdminSettingStoresState.data.pagination.per_page}
              page={pageNo ? parseInt(pageNo) : 1}
            >
              <hr className="mt-4" />
              {getAdminSettingStoresState.data.stores.map((row, i) => (
                <div
                  className="flex flex-col px-4 py-2 space-y-4 border-b lg:space-y-0"
                  key={i}
                >
                  <span className="flex flex-wrap items-center space-x-1 text-xl">
                    <span className="text-xs lg:text-bas">{row.name}</span>
                  </span>
                </div>
              ))}
            </DataList>
          </div>

          <div className="hidden p-4 lg:block">
            <DataTable
              order={order === "asc" ? "asc" : "desc"}
              orderBy={orderBy ?? "id"}
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
                if (
                  column_selected !== "category" &&
                  column_selected !== "snackshop" &&
                  column_selected !== "catering" &&
                  column_selected !== "popclub-walk-in" &&
                  column_selected !== "popclub-online-delivery"
                ) {
                  const isAsc = orderBy === column_selected && order === "asc";

                  const params = {
                    page_no: pageNo,
                    per_page: perPage,
                    order_by: column_selected,
                    order: isAsc ? "desc" : "asc",
                    search: search,
                  };

                  const queryParams = createQueryParams(params);

                  dispatch(resetGetAdminSettingStoresStatus());
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

                  dispatch(resetGetAdminSettingStoresStatus());
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

                  dispatch(resetGetAdminSettingStoresStatus());
                  navigate({
                    pathname: "",
                    search: queryParams,
                  });
                }
              }}
              totalRows={getAdminSettingStoresState.data.pagination.total_rows}
              perPage={getAdminSettingStoresState.data.pagination.per_page}
              page={pageNo ? parseInt(pageNo) : 1}
            >
              {getAdminSettingStoresState.data.stores !== undefined ? (
                <>
                  {getAdminSettingStoresState.data.stores.map((row, i) => (
                    <DataTableRow key={i}>
                      <DataTableCell>{row.name}</DataTableCell>
                      <DataTableCell>{row.menu_name}</DataTableCell>
                      <DataTableCell>
                        <Checkbox
                          onChange={(e) => {
                            dispatch(
                              updateAdminSettingStore({
                                store_id: row.store_id,
                                name_of_field_status: "status",
                                status: e.target.checked ? 1 : 0,
                              })
                            );
                          }}
                          color="primary"
                          checked={row.status === "1" ? true : false}
                        />
                      </DataTableCell>
                      <DataTableCell>
                        <Checkbox
                          onChange={(e) => {
                            dispatch(
                              updateAdminSettingStore({
                                store_id: row.store_id,
                                name_of_field_status: "catering_status",
                                status: e.target.checked ? 1 : 0,
                              })
                            );
                          }}
                          color="primary"
                          checked={row.catering_status === 1 ? true : false}
                        />
                      </DataTableCell>
                      <DataTableCell>
                        <Checkbox
                          onChange={(e) => {
                            dispatch(
                              updateAdminSettingStore({
                                store_id: row.store_id,
                                name_of_field_status: "popclub_walk_in_status",
                                status: e.target.checked ? 1 : 0,
                              })
                            );
                          }}
                          color="primary"
                          checked={
                            row.popclub_walk_in_status === 1 ? true : false
                          }
                        />
                      </DataTableCell>
                      <DataTableCell>
                        <Checkbox
                          onChange={(e) => {
                            dispatch(
                              updateAdminSettingStore({
                                store_id: row.store_id,
                                name_of_field_status:
                                  "popclub_online_delivery_status",
                                status: e.target.checked ? 1 : 0,
                              })
                            );
                          }}
                          color="primary"
                          checked={
                            row.popclub_online_delivery_status === 1
                              ? true
                              : false
                          }
                        />
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
