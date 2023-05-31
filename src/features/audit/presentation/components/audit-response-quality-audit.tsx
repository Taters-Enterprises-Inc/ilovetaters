import {
  useAppDispatch,
  useAppSelector,
  useQuery,
} from "features/config/hooks";
import { useNavigate } from "react-router-dom";
import { resetGetAuditSettingQuestionsStatus } from "../slices/get-audit-setting-questions.slice";
import { DataList, DataTable } from "features/shared/presentation/components";
import { createQueryParams } from "features/config/helpers";
import { useEffect } from "react";
import {
  Column,
  DataTableCell,
  DataTableRow,
} from "features/shared/presentation/components/data-table";
import {
  getAuditResponseInformationQualityAuditInformation,
  selectGetAuditResponseInformationQualityAuditInformation,
} from "../slices/get-audit-response-quality-audit-information.slice";
import { Divider } from "@mui/material";

export function AuditResponseQualityAudit() {
  const dispatch = useAppDispatch();
  const query = useQuery();
  const navigate = useNavigate();

  const pageNo = query.get("page_no");
  const perPage = query.get("per_page");
  const orderBy = query.get("order_by");
  const order = query.get("order");
  const search = query.get("search");

  let columns: Array<Column> = [
    { id: "dateadded", label: "Dateadded" },
    { id: "audittype", label: "Store Type", minWidth: 220 },
    { id: "store_id", label: "Store Name", minWidth: 220 },
    { id: "audit_period", label: "Audit Period" },
  ];

  const getResponseState = useAppSelector(
    selectGetAuditResponseInformationQualityAuditInformation
  );

  useEffect(() => {
    const query = createQueryParams({
      page_no: pageNo,
      per_page: perPage,
      order_by: orderBy,
      order: order,
      search: search,
    });

    dispatch(getAuditResponseInformationQualityAuditInformation(query));
  }, [dispatch, pageNo, perPage, orderBy, order, search]);

  return (
    <>
      <div className="flex flex-col px-4 lg:flex-row lg:items-end">
        <span className="text-secondary text-3xl font-['Bebas_Neue'] flex-1">
          Internal Quality Audit Responses
        </span>
      </div>

      {getResponseState.data?.responses ? (
        <>
          <div className="p-4 lg:hidden">
            <DataList
              search={search ?? ""}
              emptyMessage="No products yet."
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

                  dispatch(resetGetAuditSettingQuestionsStatus());
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

                  dispatch(resetGetAuditSettingQuestionsStatus());
                  navigate({
                    pathname: "",
                    search: queryParams,
                  });
                }
              }}
              totalRows={getResponseState.data.pagination.total_rows}
              perPage={getResponseState.data.pagination.per_page}
              page={pageNo ? parseInt(pageNo) : 1}
            >
              <hr className="mt-4" />
              {getResponseState.data.responses.map((row, i) => (
                <div
                  className="flex flex-col px-4 py-2 space-y-4 border-b lg:space-y-0"
                  key={i}
                >
                  <span className="flex flex-wrap items-center space-x-1 text-xl">
                    <div className="flex flex-col">
                      <span className="text-lg">{row.store_name}</span>
                      <div className="flex flex-row space-x-2">
                        <span className="text-base">{row.type_name}</span>
                        <Divider orientation="vertical" flexItem />
                        <span className="text-base">
                          {new Date(row.audit_period).toLocaleString("en-US", {
                            month: "long",
                            year: "numeric",
                          })}
                        </span>
                      </div>

                      <span className="text-xs mt-4">
                        {new Date(row.dateadded).toLocaleString("en-PH", {
                          timeZone: "Asia/Manila",
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                          hour: "numeric",
                          minute: "numeric",
                          hour12: true,
                        })}
                      </span>
                    </div>
                  </span>
                </div>
              ))}
            </DataList>
          </div>

          <div className="hidden p-4 lg:block">
            <DataTable
              order={order === "asc" ? "asc" : "desc"}
              orderBy={orderBy ?? "id"}
              emptyMessage="No internal quality audit responses yet."
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

                  dispatch(resetGetAuditSettingQuestionsStatus());
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

                  dispatch(resetGetAuditSettingQuestionsStatus());
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

                  dispatch(resetGetAuditSettingQuestionsStatus());
                  navigate({
                    pathname: "",
                    search: queryParams,
                  });
                }
              }}
              totalRows={getResponseState.data.pagination.total_rows}
              perPage={getResponseState.data.pagination.per_page}
              page={pageNo ? parseInt(pageNo) : 1}
            >
              {getResponseState.data.responses !== undefined ? (
                <>
                  {getResponseState.data.responses.map((row, i) => (
                    <DataTableRow
                      className="cursor-pointer hover:bg-gray-100"
                      onClick={() =>
                        navigate("/internal/audit/form/review/" + row.hash)
                      }
                      key={i}
                    >
                      <DataTableCell>
                        {new Date(row.dateadded).toLocaleString("en-PH", {
                          timeZone: "Asia/Manila",
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                          hour: "numeric",
                          minute: "numeric",
                          hour12: true,
                        })}
                      </DataTableCell>

                      <DataTableCell>{row.type_name}</DataTableCell>
                      <DataTableCell>{row.store_name}</DataTableCell>
                      <DataTableCell>
                        {new Date(row.audit_period).toLocaleString("en-US", {
                          month: "long",
                          year: "numeric",
                        })}
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
