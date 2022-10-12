import {
  Column,
  DataTable,
  DataTableCell,
  DataTableRow,
} from "../../../shared/presentation/components/data-table";
import { useEffect, useState } from "react";
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
import moment from "moment";
import { AdminStoreEditModal } from "../modals";
import { selectUpdateAdminSettingStoreOperatingHours } from "../slices/update-setting-store-operating-hours.slice";
import { selectGetAdminSession } from "../slices/get-admin-session.slice";
import { createQueryParams } from "features/config/helpers";

export function AdminSettingStores() {
  const [openAdminStoreEditModal, setOpenAdminStoreEditModal] = useState(false);
  const getAdminSessionState = useAppSelector(selectGetAdminSession);

  const dispatch = useAppDispatch();
  const query = useQuery();
  const navigate = useNavigate();
  const pageNo = query.get("page_no");
  const perPage = query.get("per_page");
  const orderBy = query.get("order_by");
  const order = query.get("order");
  const search = query.get("search");
  const storeId = query.get("store_id");

  let columns: Array<Column> = [
    { id: "name", label: "Name" },
    { id: "menu", label: "Menu" },
    { id: "snackshop", label: "Snackshop" },
    { id: "catering", label: "Catering" },
    { id: "popclub-walk-in", label: "Popclub Store Visit" },
    { id: "popclub-online-delivery", label: "Popclub Online Delivery" },
    { id: "branches", label: "Branches" },
    { id: "operating-hours", label: "Operating Hours" },
  ];

  if (
    !getAdminSessionState.data?.is_admin &&
    !getAdminSessionState.data?.is_csr
  ) {
    columns = columns.filter(
      (column) =>
        column.id !== "snackshop" &&
        column.id !== "catering" &&
        column.id !== "popclub-walk-in" &&
        column.id !== "popclub-online-delivery" &&
        column.id !== "branches"
    );
  }

  useEffect(() => {
    if (storeId) {
      setOpenAdminStoreEditModal(true);
    }
  }, [dispatch, storeId]);

  const getAdminSettingStoresState = useAppSelector(
    selectGetAdminSettingStores
  );

  const updateAdminSettingStoreOperatingHoursState = useAppSelector(
    selectUpdateAdminSettingStoreOperatingHours
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
    updateAdminSettingStoreOperatingHoursState,
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
              emptyMessage="No stores yet."
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
                if (column_selected == "name") {
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

                      {getAdminSessionState.data?.is_admin ||
                      getAdminSessionState.data?.is_csr ? (
                        <>
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
                                    name_of_field_status:
                                      "popclub_walk_in_status",
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
                          <DataTableCell>
                            <Checkbox
                              onChange={(e) => {
                                dispatch(
                                  updateAdminSettingStore({
                                    store_id: row.store_id,
                                    name_of_field_status: "branch_status",
                                    status: e.target.checked ? 1 : 0,
                                  })
                                );
                              }}
                              color="primary"
                              checked={row.branch_status === 1 ? true : false}
                            />
                          </DataTableCell>
                        </>
                      ) : null}

                      <DataTableCell>
                        <button
                          onClick={() => {
                            navigate("?store_id=" + row.store_id);
                          }}
                          className="px-2 py-1 font-bold text-white bg-green-700 rounded-full"
                        >
                          {moment(row.available_start_time, "HH:mm:ss").format(
                            "LT"
                          )}{" "}
                          -{" "}
                          {moment(row.available_end_time, "HH:mm:ss").format(
                            "LT"
                          )}
                        </button>
                      </DataTableCell>
                    </DataTableRow>
                  ))}
                </>
              ) : null}
            </DataTable>
          </div>
        </>
      ) : null}
      <AdminStoreEditModal
        open={openAdminStoreEditModal}
        onClose={() => {
          const params = {
            page_no: pageNo,
            per_page: perPage,
            store_id: null,
            order_by: orderBy,
            order: order,
            search: search,
          };

          const queryParams = createQueryParams(params);

          navigate({
            pathname: "",
            search: queryParams,
          });

          setOpenAdminStoreEditModal(false);
        }}
      />
    </>
  );
}
