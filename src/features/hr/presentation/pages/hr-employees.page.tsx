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
import {
  getEmployees,
  resetGetEmployeesStatus,
  selectGetEmployees,
} from "../slices/get-employees.slice";
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
import { getEmployeeInfo } from "../slices/get-employee-info.slice";
import { HrEmployeeInfoModal } from "../modals";

const columns: Array<Column> = [
  { id: "name", label: "Name" },
  { id: "kra", label: "KRA" },
  { id: "self-assessment", label: "Self Assessment" },
  { id: "management-assessment", label: "Management Assessment" },
  { id: "180-degree-assessment", label: "180 Degree Assessment" },
  { id: "action", label: "Action" },
];

export function HrEmployees() {
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
  const getEmployeesState = useAppSelector(selectGetEmployees);
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
    const query = createQueryParams({
      page_no: pageNo,
      per_page: perPage,
      order_by: orderBy,
      department_id: departmentId,
      order: order,
      search: search,
    });
    dispatch(getEmployees(query));
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
              value={departmentId ?? "all"}
              onChange={(event) => {
                const params = {
                  page_no: pageNo,
                  per_page: perPage,
                  department_id:
                    event.target.value === "all" ? null : event.target.value,
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

        {getEmployeesState.data?.employees ? (
          <>
            <div className="hidden p-4 lg:block">
              <HrDataTable
                order={order === "asc" ? "asc" : "desc"}
                orderBy={orderBy ?? "id"}
                emptyMessage="Empty availability deals."
                search={search ?? ""}
                onSearch={(val) => {
                  const params = {
                    page_no: null,
                    per_page: perPage,
                    order_by: orderBy,
                    department_id: departmentId,
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
                      order: isAsc ? "desc" : "asc",
                      search: search,
                    };

                    const queryParams = createQueryParams(params);

                    dispatch(resetGetEmployeesStatus());
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
                      order: order,
                      search: search,
                    };

                    const queryParams = createQueryParams(params);

                    dispatch(resetGetEmployeesStatus());
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
                      order: order,
                      search: search,
                    };

                    const queryParams = createQueryParams(params);

                    dispatch(resetGetEmployeesStatus());
                    navigate({
                      pathname: "",
                      search: queryParams,
                    });
                  }
                }}
                totalRows={getEmployeesState.data.pagination.total_rows}
                perPage={getEmployeesState.data.pagination.per_page}
                page={pageNo ? parseInt(pageNo) : 1}
              >
                {getEmployeesState.data.employees !== undefined ? (
                  <>
                    {getEmployeesState.data.employees.map((row, i) => (
                      <DataTableRow key={i}>
                        <DataTableCell>
                          {row.first_name + " " + row.last_name}
                        </DataTableCell>
                        <DataTableCell>{row.kra_completed}</DataTableCell>
                        <DataTableCell>
                          {row.self_assessment_completed}
                        </DataTableCell>
                        <DataTableCell>
                          {row.management_assessment_completed}
                        </DataTableCell>
                        <DataTableCell>
                          {row.hr_180_degree_assessment_completed}
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
