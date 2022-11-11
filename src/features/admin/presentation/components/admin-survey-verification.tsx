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
import { ADMIN_USER_DISCOUNT_STATUS } from "features/shared/constants";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { createQueryParams } from "features/config/helpers";
import {
  getAdminUserDiscounts,
  resetGetAdminUserDiscountsStatus,
  selectGetAdminUserDiscounts,
} from "../slices/get-admin-user-discounts.slice";
import { DataList } from "features/shared/presentation/components";
import Moment from "react-moment";
import { FaEye } from "react-icons/fa";
import { AdminUserDiscountModal } from "../modals";
import { getAdminUserDiscount } from "../slices/get-admin-discount-verification.slice";
import { selectAdminUserDiscountChangeStatus } from "../slices/admin-user-discount-change-status.slice";

const columns: Array<Column> = [
  { id: "status", label: "Status" },
  { id: "date_time", label: "Date and Time" },
  { id: "receipt_number", label: "Receipt Number" },
  { id: "full_name", label: "Full Name" },
  { id: "action", label: "Action" },
];

export function AdminSurveyVerifications() {
  const dispatch = useAppDispatch();
  const query = useQuery();
  const navigate = useNavigate();
  const pageNo = query.get("page_no");
  const perPage = query.get("per_page");
  const status = query.get("status");
  const id = query.get("id");
  const orderBy = query.get("order_by");
  const order = query.get("order");
  const search = query.get("search");

  const [openAdminUserDiscountModal, setOpenAdminUserDiscountModal] =
    useState(false);

  const getAdminUserDiscountsStates = useAppSelector(
    selectGetAdminUserDiscounts
  );

  const adminUserDicountChangeStatusState = useAppSelector(
    selectAdminUserDiscountChangeStatus
  );

  useEffect(() => {
    if (id) {
      dispatch(getAdminUserDiscount(id)).then(() => {
        setOpenAdminUserDiscountModal(true);
      });
    }
  }, [dispatch, id]);

  useEffect(() => {
    const query = createQueryParams({
      page_no: pageNo,
      per_page: perPage,
      status: status,
      order_by: orderBy,
      order: order,
      search: search,
    });
    dispatch(getAdminUserDiscounts(query));
  }, [
    dispatch,
    pageNo,
    status,
    perPage,
    orderBy,
    order,
    search,
    adminUserDicountChangeStatusState,
  ]);

  return (
    <>
      <div className="flex flex-col px-4 lg:flex-row lg:items-end">
        <span className="text-secondary text-3xl font-['Bebas_Neue'] flex-1">
          User Discount
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
                  search: search,
                };

                const queryParams = createQueryParams(params);

                dispatch(resetGetAdminUserDiscountsStatus());
                navigate({
                  pathname: "",
                  search: queryParams,
                });
              }
            }}
          >
            <MenuItem value={-1}>All</MenuItem>
            {ADMIN_USER_DISCOUNT_STATUS.map((value, index) => {
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

      {getAdminUserDiscountsStates.data?.discounts ? (
        <>
          <div className="p-4 lg:hidden">
            <DataList
              search={search ?? ""}
              emptyMessage="No survey verification yet."
              onSearch={(val) => {
                const params = {
                  page_no: null,
                  per_page: perPage,
                  status: status,
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
                    search: search,
                  };

                  const queryParams = createQueryParams(params);

                  dispatch(resetGetAdminUserDiscountsStatus());
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
                    search: search,
                  };

                  const queryParams = createQueryParams(params);

                  dispatch(resetGetAdminUserDiscountsStatus());
                  navigate({
                    pathname: "",
                    search: queryParams,
                  });
                }
              }}
              totalRows={getAdminUserDiscountsStates.data.pagination.total_rows}
              perPage={getAdminUserDiscountsStates.data.pagination.per_page}
              page={pageNo ? parseInt(pageNo) : 1}
            >
              <hr className="mt-4" />

              {getAdminUserDiscountsStates.data.discounts.map((row, i) => (
                <div
                  onClick={() => {
                    const params = {
                      page_no: pageNo,
                      per_page: perPage,
                      status: status,
                      id: row.id,
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
                          ADMIN_USER_DISCOUNT_STATUS[row.status].color,
                      }}
                    >
                      {ADMIN_USER_DISCOUNT_STATUS[row.status].name}
                    </span>
                  </span>
                  {/* 
                  <span className="text-xs text-gray-600">
                    <strong> ID Number:</strong> {row.id_number}
                  </span> */}
                  <span className="text-xs text-gray-600">
                    <strong>Application Date: </strong>
                    <Moment format="lll">{row.dateadded}</Moment>
                  </span>
                </div>
              ))}
            </DataList>
          </div>
          <div className="hidden p-4 lg:block">
            <DataTable
              order={order === "asc" ? "asc" : "desc"}
              orderBy={orderBy ?? "dateadded"}
              emptyMessage="No user discounts yet."
              search={search ?? ""}
              onSearch={(val) => {
                const params = {
                  page_no: pageNo,
                  per_page: perPage,
                  status: status,
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
                if (column_selected !== "action") {
                  const isAsc = orderBy === column_selected && order === "asc";

                  const params = {
                    page_no: pageNo,
                    per_page: perPage,
                    status: status,
                    order_by: column_selected,
                    order: isAsc ? "desc" : "asc",
                    search: search,
                  };

                  const queryParams = createQueryParams(params);

                  dispatch(resetGetAdminUserDiscountsStatus());
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
                    order_by: orderBy,
                    order: order,
                    search: search,
                  };

                  const queryParams = createQueryParams(params);

                  dispatch(resetGetAdminUserDiscountsStatus());
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
                    order_by: orderBy,
                    order: order,
                    search: search,
                  };

                  const queryParams = createQueryParams(params);

                  dispatch(resetGetAdminUserDiscountsStatus());
                  navigate({
                    pathname: "",
                    search: queryParams,
                  });
                }
              }}
              totalRows={getAdminUserDiscountsStates.data.pagination.total_rows}
              perPage={getAdminUserDiscountsStates.data.pagination.per_page}
              page={pageNo ? parseInt(pageNo) : 1}
            >
              {getAdminUserDiscountsStates.data.discounts !== undefined ? (
                <>
                  {getAdminUserDiscountsStates.data.discounts.map((row, i) => (
                    <DataTableRow key={i}>
                      <DataTableCell>
                        <span
                          className="px-2 py-1 text-xs rounded-full "
                          style={{
                            color: "white",
                            backgroundColor:
                              ADMIN_USER_DISCOUNT_STATUS[row.status].color,
                          }}
                        >
                          {ADMIN_USER_DISCOUNT_STATUS[row.status].name}
                        </span>
                      </DataTableCell>
                      <DataTableCell>
                        <Moment format="lll">{row.dateadded}</Moment>
                      </DataTableCell>
                      <DataTableCell>{row.discount_type_name}</DataTableCell>
                      <DataTableCell>
                        {row.first_name} {row.middle_name} {row.last_name}
                      </DataTableCell>
                      <DataTableCell>
                        <Moment format="ll">{row.birthday}</Moment>
                      </DataTableCell>
                      <DataTableCell>{row.id_number}</DataTableCell>

                      <DataTableCell align="left">
                        <button
                          onClick={() => {
                            const params = {
                              page_no: pageNo,
                              per_page: perPage,
                              status: status,
                              id: row.id,
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
                  ))}
                </>
              ) : null}
            </DataTable>
          </div>
        </>
      ) : null}

      <AdminUserDiscountModal
        open={openAdminUserDiscountModal}
        onClose={() => {
          const params = {
            page_no: pageNo,
            per_page: perPage,
            status: status,
            redeem_code: null,
            order_by: orderBy,
            order: order,
            search: search,
          };

          const queryParams = createQueryParams(params);

          navigate({
            pathname: "",
            search: queryParams,
          });
          setOpenAdminUserDiscountModal(false);
        }}
      />
    </>
  );
}
