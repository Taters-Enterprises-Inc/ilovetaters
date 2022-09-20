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
import NumberFormat from "react-number-format";
import {
  ADMIN_SNACKSHOP_MOP_STATUS,
  ADMIN_SNACKSHOP_ORDER_STATUS,
} from "features/shared/constants";
import Moment from "react-moment";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { FaEye } from "react-icons/fa";
import { AdminShopOrderModal } from "../modals";
import { DataList } from "features/shared/presentation/components";
import { UserBtn } from "./create-user-btn";
import { GrpBtn } from "./create-grp-btn";
import {
  getAdminUsers,
  resetGetAdminUsersStatus,
  selectGetAdminUsers,
} from "../slices/get-admin-users.slice";

const columns: Array<Column> = [
  { id: "first_name", label: "First Name" },
  { id: "last_name", label: "Last Name" },
  { id: "email", label: "Email" },
  { id: "groups", label: "Groups" },
  { id: "status", label: "Status" },
  { id: "action", label: "Actions" },
  { id: "store", label: "Store" },
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

export function AdminSettingUsers() {
  const dispatch = useAppDispatch();
  const query = useQuery();
  const navigate = useNavigate();
  const pageNo = query.get("page_no");
  const perPage = query.get("per_page");
  const orderBy = query.get("order_by");
  const order = query.get("order");
  const search = query.get("search");

  const getAdminUsersState = useAppSelector(selectGetAdminUsers);

  useEffect(() => {
    const query = createQueryParams({
      page_no: pageNo,
      per_page: perPage,
      order_by: orderBy,
      order: order,
      search: search,
    });
    dispatch(getAdminUsers(query));
  }, [dispatch, pageNo, perPage, orderBy, order, search]);

  return (
    <>
      <div className="flex flex-col px-4 lg:flex-row lg:items-end">
        <span className="text-secondary text-3xl font-['Bebas_Neue'] flex-1">
          List of Users
        </span>
        <div className="flex px-4">
          <UserBtn />
          <GrpBtn />
        </div>
      </div>
      {getAdminUsersState.data ? (
        <>
          <div className="py-4 lg:hidden">
            <DataList
              search={search ?? ""}
              onSearch={(val) => {
                const params = {
                  page_no: pageNo,
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

                  dispatch(resetGetAdminUsersStatus());
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

                  dispatch(resetGetAdminUsersStatus());
                  navigate({
                    pathname: "",
                    search: queryParams,
                  });
                }
              }}
              totalRows={getAdminUsersState.data.pagination.total_rows}
              perPage={getAdminUsersState.data.pagination.per_page}
              page={pageNo ? parseInt(pageNo) : 1}
            >
              <hr className="mt-4" />
              {getAdminUsersState.data.users.map((row, i) => (
                <div
                  onClick={() => {
                    const params = {
                      page_no: pageNo,
                      per_page: perPage,
                      search: search,
                    };

                    const queryParams = createQueryParams(params);

                    navigate({
                      pathname: "",
                      search: queryParams,
                    });
                  }}
                  className="flex flex-col px-4 py-2 border-b"
                  key={i}
                >
                  <span className="flex flex-wrap items-center space-x-1 text-xl">
                    <span>
                      {row.first_name} {row.last_name}
                    </span>
                  </span>
                </div>
              ))}
            </DataList>
          </div>
          <div className="hidden p-4 lg:block">
            <DataTable
              order={order === "asc" ? "asc" : "desc"}
              orderBy={orderBy ?? "dateadded"}
              search={search ?? ""}
              onSearch={(val) => {
                const params = {
                  page_no: pageNo,
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
                const isAsc = orderBy === column_selected && order === "asc";

                const params = {
                  page_no: pageNo,
                  per_page: perPage,
                  order_by: column_selected,
                  order: isAsc ? "desc" : "asc",
                  search: search,
                };

                const queryParams = createQueryParams(params);

                dispatch(resetGetAdminUsersStatus());
                navigate({
                  pathname: "",
                  search: queryParams,
                });
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

                  dispatch(resetGetAdminUsersStatus());
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

                  dispatch(resetGetAdminUsersStatus());
                  navigate({
                    pathname: "",
                    search: queryParams,
                  });
                }
              }}
              totalRows={getAdminUsersState.data.pagination.total_rows}
              perPage={getAdminUsersState.data.pagination.per_page}
              page={pageNo ? parseInt(pageNo) : 1}
            >
              {getAdminUsersState.data.users !== undefined ? (
                <>
                  {getAdminUsersState.data.users.map((row, i) => (
                    <DataTableRow key={i}>
                      <DataTableCell>{row.first_name}</DataTableCell>
                      <DataTableCell>{row.last_name}</DataTableCell>
                      <DataTableCell>{row.email}</DataTableCell>
                      <DataTableCell></DataTableCell>
                      <DataTableCell></DataTableCell>
                      <DataTableCell></DataTableCell>
                      <DataTableCell></DataTableCell>
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
