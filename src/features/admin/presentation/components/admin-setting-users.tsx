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
import { Link, useNavigate } from "react-router-dom";
import { DataList } from "features/shared/presentation/components";
import { MdOutlineGroupAdd } from "react-icons/md";
import {
  getAdminUsers,
  resetGetAdminUsersStatus,
  selectGetAdminUsers,
} from "../slices/get-admin-users.slice";
import { MdOutlinePersonAddAlt1 } from "react-icons/md";
import { AdminSelectStoreModal } from "../modals";
import {
  getAdminUserStores,
} from "../slices/get-admin-user-stores.slice";
import { getAdminStores } from "../slices/get-admin-stores.slice";
import { getAdminUser } from "../slices/get-admin-user.slice";
import { ExtractButton } from "./extract-button";
import { createQueryParams } from "features/config/helpers";

const columns: Array<Column> = [
  { id: "first_name", label: "First Name" },
  { id: "last_name", label: "Last Name" },
  { id: "email", label: "Email" },
  { id: "groups", label: "Groups" },
  { id: "status", label: "Status" },
  { id: "action", label: "Actions" },
  { id: "store", label: "Store" },
];

export function AdminSettingUsers() {
  const dispatch = useAppDispatch();
  const query = useQuery();
  const navigate = useNavigate();
  const pageNo = query.get("page_no");
  const perPage = query.get("per_page");
  const orderBy = query.get("order_by");
  const order = query.get("order");
  const search = query.get("search");
  const userId = query.get("user_id");

  const [openAdminSelectStoreModal, setOpenAdminSelectStoreModal] =
    useState(false);

  const getAdminUsersState = useAppSelector(selectGetAdminUsers);

  useEffect(() => {
    dispatch(getAdminStores());

    const query = createQueryParams({
      page_no: pageNo,
      per_page: perPage,
      order_by: orderBy,
      order: order,
      search: search,
    });
    dispatch(getAdminUsers(query));
    if (userId) {
      dispatch(getAdminUser(userId));
      dispatch(getAdminUserStores(userId)).then(() => {
        setOpenAdminSelectStoreModal(true);
      });
    }
  }, [dispatch, pageNo, perPage, orderBy, order, search, userId]);

  return (
    <>
      <div className="flex flex-col px-4 lg:flex-row lg:items-end">
        <span className="text-secondary text-3xl font-['Bebas_Neue'] flex-1">
          List of Users
        </span>
        <div className="flex flex-col space-y-1 lg:flex-row lg:space-x-4 lg:space-y-0">
          <div>
            <Link
              to="create-user"
              className="inline-flex items-center px-4 tracking-wide py-1  bg-button font-['Varela_Round'] text-white text-xs rounded-md font-700"
            >
              <MdOutlinePersonAddAlt1 size={20} />
              <span>&nbsp;&nbsp;Create a new user</span>
            </Link>
          </div>
          <div>
            <Link
              to="create-group"
              className="inline-flex items-center px-4 tracking-wide bg-button font-['Varela_Round'] text-white py-1 text-xs rounded-md font-700"
            >
              <MdOutlineGroupAdd size={20} />
              <span>&nbsp;&nbsp;Create a new group</span>
            </Link>
          </div>
        </div>
      </div>
      <div className="px-4 m-2">
          <ExtractButton />
        </div>

      {getAdminUsersState.data ? (
        <>
          <div className="p-4 -mt-2 lg:hidden">
            <DataList
              search={search ?? ""}
              emptyMessage="No users yet."
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
              emptyMessage="No users yet."
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
                  column_selected !== "action" &&
                  column_selected !== "status" &&
                  column_selected !== "store" &&
                  column_selected !== "groups"
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

                  dispatch(resetGetAdminUsersStatus());
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
                      <DataTableCell>
                        {row.groups.map((group) => (
                          <div
                            dangerouslySetInnerHTML={{
                              __html: group.name,
                            }}
                          />
                        ))}
                      </DataTableCell>
                      <DataTableCell>
                        {row.active === 1 ? (
                          <span className="px-2 py-1 text-xs text-white font-['Varela_Round'] bg-green-700 rounded-full ">
                            Active
                          </span>
                        ) : (
                          ""
                        )}
                      </DataTableCell>
                      <DataTableCell>
                        <Link
                          to={`/admin/setting/user/edit-user/${row.id}`}
                          className="px-3 py-1 border rounded-lg border-secondary font-['Varela_Round']"
                        >
                          Edit
                        </Link>
                      </DataTableCell>
                      <DataTableCell>
                        {row.groups.some(
                          (group) => group.id == 1 || group.id == 10
                        ) ? null : (
                          <button
                            onClick={() => {
                              const params = {
                                page_no: pageNo,
                                per_page: perPage,
                                order_by: orderBy,
                                order: order,
                                search: search,
                                user_id: row.id,
                              };

                              const queryParams = createQueryParams(params);

                              navigate({
                                pathname: "",
                                search: queryParams,
                              });
                            }}
                            className="px-3 py-1 border rounded-lg border-secondary font-['Varela_Round']"
                          >
                            Choose
                          </button>
                        )}
                      </DataTableCell>
                    </DataTableRow>
                  ))}
                </>
              ) : null}
            </DataTable>
          </div>
        </>
      ) : null}

      <AdminSelectStoreModal
        open={openAdminSelectStoreModal}
        onClose={() => {
          const params = {
            page_no: pageNo,
            per_page: perPage,
            order_by: orderBy,
            order: order,
            search: search,
            user_id: null,
          };

          const queryParams = createQueryParams(params);

          navigate({
            pathname: "",
            search: queryParams,
          });
          setOpenAdminSelectStoreModal(false);
        }}
      />
    </>
  );
}
