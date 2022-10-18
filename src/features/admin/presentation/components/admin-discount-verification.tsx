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
import {
  ADMIN_POPCLUB_REDEEM_STATUS,
  ADMIN_SCPWD_VERIFICATION_STATUS,
} from "features/shared/constants";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {
  getAdminPopclubRedeems,
  resetGetAdminPopclubRedeemsStatus,
  selectGetAdminPopclubRedeems,
} from "../slices/get-admin-popclub-redeems.slice";
import { createQueryParams } from "features/config/helpers";
import {
  getAdminDiscountVerifications,
  resetGetAdminDiscountVerificationsStatus,
  selectGetDiscountVerifications,
} from "../slices/get-admin-discount-verifications.slice";
import { DataList } from "features/shared/presentation/components";
import moment from "moment";
import Moment from "react-moment";
import NumberFormat from "react-number-format";
import { FaEye } from "react-icons/fa";

const columns: Array<Column> = [
  { id: "status", label: "Status" },
  { id: "appDate", label: "Application Date" },
  { id: "name", label: "Profile Name" },
  { id: "fname", label: "First Name" },
  { id: "lname", label: "Last Name" },
  { id: "mname", label: "Middle Name" },
  { id: "birthday", label: "Birthday" },
  { id: "scpwdNumber", label: "SC/PWD Number" },
  { id: "action", label: "Action" },
];

export function AdminDiscountVerification() {
  const dispatch = useAppDispatch();
  const query = useQuery();
  const navigate = useNavigate();
  const pageNo = query.get("page_no");
  const perPage = query.get("per_page");
  const status = query.get("status");
  const idNumber = query.get("id_number");
  const orderBy = query.get("order_by");
  const order = query.get("order");
  const search = query.get("search");

  const getAdminDiscountVerificationStates = useAppSelector(
    selectGetDiscountVerifications
  );

  // const getAdminPopclubRedeemsState = useAppSelector(
  //   selectGetAdminPopclubRedeems
  // );

  // useEffect(() => {
  //   const query = createQueryParams({
  //     page_no: pageNo,
  //     per_page: perPage,
  //     status: status,
  //     order_by: orderBy,
  //     order: order,
  //     search: search,
  //   });
  //   dispatch(getAdminPopclubRedeems(query));
  // }, [dispatch, pageNo, status, perPage, orderBy, order, search]);

  useEffect(() => {
    const query = createQueryParams({
      page_no: pageNo,
      per_page: perPage,
      status: status,
      order_by: orderBy,
      order: order,
      search: search,
    });
    dispatch(getAdminDiscountVerifications(query));
  }, [dispatch, pageNo, status, perPage, orderBy, order, search]);

  return (
    <>
      <div className="flex flex-col px-4 lg:flex-row lg:items-end">
        <span className="text-secondary text-3xl font-['Bebas_Neue'] flex-1">
          SC/PWD Verification
        </span>
        <div className="flex">
          <Select
            size="small"
            defaultValue={status ?? -1}
            onChange={(event) => {
              if (event.target.value !== status) {
                const params = {
                  page_no: pageNo,
                  per_page: perPage,
                  status: event.target.value === -1 ? null : event.target.value,
                  id_number: idNumber,
                  search: search,
                };

                const queryParams = createQueryParams(params);

                dispatch(resetGetAdminDiscountVerificationsStatus());
                navigate({
                  pathname: "",
                  search: queryParams,
                });
              }
            }}
          >
            <MenuItem value={-1}>All</MenuItem>
            {ADMIN_SCPWD_VERIFICATION_STATUS.map((value, index) => {
              if (index === 0) {
                return null;
              }
              return (
                <MenuItem key={index} value={index}>
                  {value.name}
                </MenuItem>
              );
            })}
          </Select>
        </div>
      </div>

      {getAdminDiscountVerificationStates.data?.request ? (
        <>
          <div className="p-4 lg:hidden">
            <DataList
              search={search ?? ""}
              emptyMessage="No SC/PWD request yet."
              onSearch={(val) => {
                const params = {
                  page_no: null,
                  per_page: perPage,
                  status: status,
                  id_number: idNumber,
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
                    status: status,
                    id_number: idNumber,
                    search: search,
                  };

                  const queryParams = createQueryParams(params);

                  dispatch(resetGetAdminDiscountVerificationsStatus());
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
                    id_number: idNumber,
                    search: search,
                  };

                  const queryParams = createQueryParams(params);

                  dispatch(resetGetAdminDiscountVerificationsStatus());
                  navigate({
                    pathname: "",
                    search: queryParams,
                  });
                }
              }}
              totalRows={
                getAdminDiscountVerificationStates.data.pagination.total_rows
              }
              perPage={
                getAdminDiscountVerificationStates.data.pagination.per_page
              }
              page={pageNo ? parseInt(pageNo) : 1}
            >
              <hr className="mt-4" />

              {getAdminDiscountVerificationStates.data.request.map((row, i) => (
                <div
                  onClick={() => {
                    const params = {
                      page_no: pageNo,
                      per_page: perPage,
                      status: status,
                      id_number: row.id_number,
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
                      {row.first_name +
                        " " +
                        row.middle_name +
                        " " +
                        row.last_name}
                    </span>

                    <span
                      className="px-2 py-1 text-xs rounded-full "
                      style={{
                        color: "white",
                        backgroundColor:
                          ADMIN_SCPWD_VERIFICATION_STATUS[row.status].color,
                      }}
                    >
                      {ADMIN_SCPWD_VERIFICATION_STATUS[row.status].name}
                    </span>
                  </span>

                  <span className="text-xs text-gray-600">
                    <strong> ID Number:</strong> {row.id_number}
                  </span>
                  <span className="text-xs">
                    <strong>Application Date: </strong>
                    <Moment format="LLL">{row.deateadded}</Moment>
                  </span>
                </div>
              ))}
            </DataList>
          </div>
          <div className="hidden p-4 lg:block">
            <DataTable
              order={order === "asc" ? "asc" : "desc"}
              orderBy={orderBy ?? "dateadded"}
              emptyMessage="No popclub redeems yet."
              search={search ?? ""}
              onSearch={(val) => {
                const params = {
                  page_no: pageNo,
                  per_page: perPage,
                  status: status,
                  id_number: idNumber,
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
                    id_number: idNumber,
                    order_by: column_selected,
                    order: isAsc ? "desc" : "asc",
                    search: search,
                  };

                  const queryParams = createQueryParams(params);

                  dispatch(resetGetAdminDiscountVerificationsStatus());
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
                    id_number: idNumber,
                    order_by: orderBy,
                    order: order,
                    search: search,
                  };

                  const queryParams = createQueryParams(params);

                  dispatch(resetGetAdminDiscountVerificationsStatus());
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
                    id_number: idNumber,
                    order_by: orderBy,
                    order: order,
                    search: search,
                  };

                  const queryParams = createQueryParams(params);

                  dispatch(resetGetAdminDiscountVerificationsStatus());
                  navigate({
                    pathname: "",
                    search: queryParams,
                  });
                }
              }}
              totalRows={
                getAdminDiscountVerificationStates.data.pagination.total_rows
              }
              perPage={
                getAdminDiscountVerificationStates.data.pagination.per_page
              }
              page={pageNo ? parseInt(pageNo) : 1}
            >
              {getAdminDiscountVerificationStates.data.request !== undefined ? (
                <>
                  {getAdminDiscountVerificationStates.data.request.map(
                    (row, i) => (
                      <DataTableRow key={i}>
                        <DataTableCell>
                          <span
                            className="px-2 py-1 text-xs rounded-full "
                            style={{
                              color: "white",
                              backgroundColor:
                                ADMIN_SCPWD_VERIFICATION_STATUS[row.status]
                                  .color,
                            }}
                          >
                            {ADMIN_SCPWD_VERIFICATION_STATUS[row.status].name}
                          </span>
                        </DataTableCell>
                        <DataTableCell>
                          <Moment format="LLL">{row.deateadded}</Moment>
                        </DataTableCell>
                        <DataTableCell>
                          {row.first_name +
                            " " +
                            row.middle_name +
                            " " +
                            row.last_name}
                        </DataTableCell>
                        <DataTableCell>{row.first_name}</DataTableCell>
                        <DataTableCell>{row.middle_name}</DataTableCell>
                        <DataTableCell>{row.last_name}</DataTableCell>
                        <DataTableCell>{row.birthday}</DataTableCell>
                        <DataTableCell>{row.id_number}</DataTableCell>

                        <DataTableCell align="left">
                          <button
                            onClick={() => {
                              const params = {
                                page_no: pageNo,
                                per_page: perPage,
                                status: status,
                                id_number: row.id_number,
                                order_by: orderBy,
                                order: order,
                                search: search,
                              };

                              const queryParams = createQueryParams(params);

                              navigate({
                                pathname: "",
                                search: queryParams,
                              });
                            }}
                          >
                            <FaEye className="text-lg" />
                          </button>
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
