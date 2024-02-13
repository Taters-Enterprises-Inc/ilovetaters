import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";
import {
  useAppDispatch,
  useAppSelector,
  useQuery,
} from "features/config/hooks";
import {
  LogoutHrState,
  logoutHr,
  resetLogoutHr,
  selectLogoutHr,
} from "../slices/logout-hr.slice";
import {
  getHrSession,
  selectGetHrSession,
} from "../slices/get-hr-session.slice";
import { MaterialInput } from "features/shared/presentation/components";
import { useNavigate } from "react-router-dom";
import { createQueryParams } from "features/config/helpers";
import { HrDataTable } from "../components";
import {
  Column,
  DataTableCell,
  DataTableRow,
} from "../components/hr-data-table";
import { FaEye } from "react-icons/fa";
import {
  getDepartments,
  selectGetDepartments,
} from "../slices/get-departments.slice";
import MenuItem from "@mui/material/MenuItem";
import {
  getUserEmployees,
  resetGetUserEmployeesStatus,
  selectGetUserEmployees,
} from "../slices/get-user-employees.slice";
import { HrEmployeeInfoModal } from "../modals";
import { getEmployeeInfo } from "../slices/get-employee-info.slice";

const columns: Array<Column> = [
  { id: "name", label: "Name" },
  { id: "action", label: "Action" },
];

export function HrUserEmployees() {
  const dispatch = useAppDispatch();
  const query = useQuery();
  const navigate = useNavigate();
  const pageNo = query.get("page_no");
  const perPage = query.get("per_page");
  const orderBy = query.get("order_by");
  const order = query.get("order");
  const search = query.get("search");
  const departmentId = query.get("department_id");
  const userId = query.get("user_id");

  const logoutHrState = useAppSelector(selectLogoutHr);
  const getHrSessionState = useAppSelector(selectGetHrSession);
  const getUserEmployeesState = useAppSelector(selectGetUserEmployees);
  const getDepartmentsState = useAppSelector(selectGetDepartments);

  const [openHrEmployeeInfoModal, setOpenHrEmployeeInfoModal] = useState(false);

  useEffect(() => {
    if (userId) {
      dispatch(getEmployeeInfo(userId)).then(() => {
        setOpenHrEmployeeInfoModal(true);
      });
    }
  }, [dispatch, userId]);

  useEffect(() => {
    dispatch(getDepartments());
  }, [dispatch]);

  useEffect(() => {
    const defaultDepartment =
      getHrSessionState.data?.hr.user_job_details?.department_id;

    const query = createQueryParams({
      page_no: pageNo,
      per_page: perPage,
      order_by: orderBy,
      user_id: userId,
      department_id: departmentId ?? defaultDepartment,
      order: order,
      search: search,
    });
    dispatch(getUserEmployees(query));
  }, [dispatch, pageNo, perPage, orderBy, order, search, departmentId]);

  useEffect(() => {
    if (logoutHrState.status === LogoutHrState.success) {
      dispatch(getHrSession());
      dispatch(resetLogoutHr());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [logoutHrState]);

  return (
    <>
      <Helmet>
        <title>Taters | Human Resourcee</title>
      </Helmet>
      <main className="min-h-screen text-[#242424] flex flex-col items-stretch border-b-[#F2F2F2]">
        <div className="border-b h-[50px] px-[24px] flex items-center flex justify-between flex-initial">
          <img
            src="https://www.ilovetaters.com/api/assets/images/shared/logo/taters-logo.png"
            alt="Taters Logo"
            className="w-[80px] "
          />
          <div className="flex items-center space-x-8">
            <div className="flex flex-col justify-center items-center">
              <img
                alt=""
                className="rounded-[50%] w-[25px] h-[25px] bg-[#F2F2F2] border border-gray "
                src="https://miro.medium.com/v2/resize:fill:32:32/1*dmbNkD5D-u45r44go_cf0g.png"
                loading="lazy"
                role="presentation"
              />
              <span className="text-[11px] text-[#6B6B6B] font-[400] hover:text-black cursor-pointer ">
                {getHrSessionState.data?.hr.user_personal_details?.first_name}
              </span>
            </div>

            <span
              onClick={() => {
                dispatch(logoutHr());
              }}
              className="text-[11px] font-[400] hover:text-black cursor-pointer bg-red-700 px-4 pt-[1px] pb-[2px] rounded-full text-white"
            >
              Logout
            </span>
          </div>
        </div>

        <div className="px-4 py-2">
          {getDepartmentsState.data ? (
            <MaterialInput
              colorTheme="black"
              label="Filter by department"
              name="department"
              select
              className="!min-w-[150px]"
              size="small"
              value={
                departmentId ??
                getHrSessionState.data?.hr.user_job_details?.department_id
              }
              onChange={(event) => {
                const params = {
                  page_no: pageNo,
                  per_page: perPage,
                  user_id: userId,
                  department_id: event.target.value,
                  search: search,
                };

                const queryParams = createQueryParams(params);

                navigate({
                  pathname: "",
                  search: queryParams,
                });
              }}
            >
              <MenuItem value="all">
                <span className="text-xs lg:text-base">All</span>
              </MenuItem>
              {getDepartmentsState.data?.map((department, index) => (
                <MenuItem key={index} value={department.id}>
                  <span className="text-xs lg:text-base">
                    {department.name}
                  </span>
                </MenuItem>
              ))}
            </MaterialInput>
          ) : null}
        </div>

        {getUserEmployeesState.data?.employees ? (
          <>
            <div className="hidden p-4 lg:block">
              <HrDataTable
                order={order === "asc" ? "asc" : "desc"}
                orderBy={orderBy ?? "id"}
                emptyMessage="Empty employees."
                search={search ?? ""}
                onSearch={(val) => {
                  const params = {
                    page_no: null,
                    per_page: perPage,
                    order_by: orderBy,
                    department_id: departmentId,
                    user_id: userId,
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
                    const isAsc =
                      orderBy === column_selected && order === "asc";

                    const params = {
                      page_no: pageNo,
                      per_page: perPage,
                      order_by: column_selected,
                      department_id: departmentId,
                      user_id: userId,
                      order: isAsc ? "desc" : "asc",
                      search: search,
                    };

                    const queryParams = createQueryParams(params);

                    dispatch(resetGetUserEmployeesStatus());
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
                      department_id: departmentId,
                      user_id: userId,
                      order: order,
                      search: search,
                    };

                    const queryParams = createQueryParams(params);

                    dispatch(resetGetUserEmployeesStatus());
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
                      department_id: departmentId,
                      user_id: userId,
                      order: order,
                      search: search,
                    };

                    const queryParams = createQueryParams(params);

                    dispatch(resetGetUserEmployeesStatus());
                    navigate({
                      pathname: "",
                      search: queryParams,
                    });
                  }
                }}
                totalRows={getUserEmployeesState.data.pagination.total_rows}
                perPage={getUserEmployeesState.data.pagination.per_page}
                page={pageNo ? parseInt(pageNo) : 1}
              >
                {getUserEmployeesState.data.employees !== undefined ? (
                  <>
                    {getUserEmployeesState.data.employees.map((row, i) => (
                      <DataTableRow key={i}>
                        <DataTableCell>
                          <div className="font-bold">
                            {row.first_name + " " + row.last_name}
                            <span className="font-semibold text-[9px] ml-1 text-gray-500">
                              {row.employee_number}
                            </span>
                          </div>
                          <div className="font-semibold text-[10px]">
                            {row.position}
                          </div>
                        </DataTableCell>
                        <DataTableCell align="left">
                          <button
                            onClick={() => {
                              const params = {
                                page_no: pageNo,
                                per_page: perPage,
                                order_by: orderBy,
                                department_id: departmentId,
                                user_id: row.id,
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
              </HrDataTable>
            </div>
          </>
        ) : null}
      </main>

      <HrEmployeeInfoModal
        open={openHrEmployeeInfoModal}
        onClose={() => {
          const params = {
            page_no: pageNo,
            per_page: perPage,
            order_by: orderBy,
            department_id: departmentId,
            user_id: userId,
            order: order,
            search: search,
          };

          const queryParams = createQueryParams(params);

          navigate({
            pathname: "",
            search: queryParams,
          });
          setOpenHrEmployeeInfoModal(false);
        }}
      />
    </>
  );
}