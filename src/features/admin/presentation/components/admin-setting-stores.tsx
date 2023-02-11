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
import { DataList } from "features/shared/presentation/components";
import {
  getAdminSettingStores,
  resetGetAdminSettingStoresStatus,
  selectGetAdminSettingStores,
} from "../slices/get-admin-setting-stores.slice";
import { selectGetAdminSession } from "../slices/get-admin-session.slice";
import { createQueryParams } from "features/config/helpers";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import { AiFillFolderAdd } from "react-icons/ai";

export function AdminSettingStores() {
  const dispatch = useAppDispatch();
  const query = useQuery();
  const navigate = useNavigate();
  const pageNo = query.get("page_no");
  const perPage = query.get("per_page");
  const orderBy = query.get("order_by");
  const order = query.get("order");
  const search = query.get("search");
  const storeId = query.get("store_id");

  const getAdminSessionState = useAppSelector(selectGetAdminSession);
  const getAdminSettingStoresState = useAppSelector(
    selectGetAdminSettingStores
  );

  let columns: Array<Column> = [
    { id: "image", label: "Image" },
    { id: "name", label: "Name" },
    { id: "menu", label: "Menu" },
    { id: "action", label: "" },
  ];

  if (
    !getAdminSessionState.data?.admin.is_admin &&
    !getAdminSessionState.data?.admin.is_csr_admin
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
    const query = createQueryParams({
      page_no: pageNo,
      per_page: perPage,
      order_by: orderBy,
      order: order,
      search: search,
    });

    dispatch(getAdminSettingStores(query));
  }, [dispatch, pageNo, perPage, orderBy, order, search]);

  return (
    <>
      <div className="flex flex-col px-4 lg:flex-row lg:items-end">
        <span className="text-secondary text-3xl font-['Bebas_Neue'] flex-1">
          List of Stores
        </span>
        <div className="flex flex-col space-y-1 lg:flex-row lg:space-x-4 lg:space-y-0">
          <div>
            <Link
              to="create-store"
              className="inline-flex items-center px-4 tracking-wide py-1  bg-button font-['Varela_Round'] text-white text-xs rounded-md font-700"
            >
              <AiFillFolderAdd size={20} />
              <span>&nbsp;&nbsp;Create a new Store</span>
            </Link>
          </div>
        </div>
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
                      <DataTableCell>
                        <img
                          src={`${REACT_APP_DOMAIN_URL}api/assets/images/shared/store_images/250/${row.store_image}`}
                          alt="Taters Store"
                          className="rounded-[10px] w-[75px] h-[75px]"
                        />
                      </DataTableCell>
                      <DataTableCell>{row.name}</DataTableCell>
                      <DataTableCell>{row.menu_name}</DataTableCell>
                      <DataTableCell>
                        <Link
                          to={`#`}
                          className="px-3 py-1 border rounded-lg border-secondary font-['Varela_Round']"
                        >
                          Edit
                        </Link>
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
