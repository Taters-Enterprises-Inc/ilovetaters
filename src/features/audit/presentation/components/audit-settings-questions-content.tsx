import {
  useAppDispatch,
  useAppSelector,
  useQuery,
} from "features/config/hooks";
import { useNavigate } from "react-router-dom";
import {
  getAuditSettingQuestions,
  resetGetAuditSettingQuestionsStatus,
  selectGetAuditSettingQuestions,
} from "../slices/get-audit-setting-questions.slice";
import {
  DataList,
  DataTable,
  MaterialSwitch,
} from "features/shared/presentation/components";
import { createQueryParams } from "features/config/helpers";
import { useEffect } from "react";
import {
  Column,
  DataTableCell,
  DataTableRow,
} from "features/shared/presentation/components/data-table";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import {
  closeMessageModal,
  openMessageModal,
} from "features/shared/presentation/slices/message-modal.slice";
import {
  selectUpdateAuditSettingsQuestion,
  updateAuditSettingsQuestion,
} from "../slices/update-admin-settings-questions.slice";
import { BiEdit } from "react-icons/bi";
import { Button } from "@mui/material";

export function AuditSettingsQuestionsContent() {
  const dispatch = useAppDispatch();
  const query = useQuery();
  const navigate = useNavigate();

  const pageNo = query.get("page_no");
  const perPage = query.get("per_page");
  const orderBy = query.get("order_by");
  const order = query.get("order");
  const search = query.get("search");

  let columns: Array<Column> = [
    { id: "question", label: "Questions" },
    { id: "urgency", label: "Urgency", minWidth: 220 },
    { id: "eqv", label: "Equivalent", minWidth: 220 },
    { id: "status", label: "Active" },
  ];

  const getAuditSettingsQuestionsState = useAppSelector(
    selectGetAuditSettingQuestions
  );

  const updateAuditSettingsQuestionState = useAppSelector(
    selectUpdateAuditSettingsQuestion
  );

  useEffect(() => {
    const query = createQueryParams({
      page_no: pageNo,
      per_page: perPage,
      order_by: orderBy,
      order: order,
      search: search,
    });

    dispatch(getAuditSettingQuestions(query));
  }, [
    updateAuditSettingsQuestionState,
    dispatch,
    pageNo,
    perPage,
    orderBy,
    order,
    search,
  ]);

  return (
    <>
      <div className="flex flex-col px-4 lg:flex-row lg:items-end">
        <span className="text-secondary text-3xl font-['Bebas_Neue'] flex-1">
          Edit Questions
        </span>
      </div>

      {getAuditSettingsQuestionsState.data?.questions ? (
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
              totalRows={
                getAuditSettingsQuestionsState.data.pagination.total_rows
              }
              perPage={getAuditSettingsQuestionsState.data.pagination.per_page}
              page={pageNo ? parseInt(pageNo) : 1}
            >
              <hr className="mt-4" />
              {getAuditSettingsQuestionsState.data.questions.map((row, i) => (
                <div
                  className="flex flex-col px-4 py-2 space-y-4 border-b lg:space-y-0"
                  key={i}
                >
                  <span className="flex flex-wrap items-center space-x-1 text-xl">
                    <span className="text-xs lg:text-bas">{row.questions}</span>
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
              totalRows={
                getAuditSettingsQuestionsState.data.pagination.total_rows
              }
              perPage={getAuditSettingsQuestionsState.data.pagination.per_page}
              page={pageNo ? parseInt(pageNo) : 1}
            >
              {getAuditSettingsQuestionsState.data.questions !== undefined ? (
                <>
                  {getAuditSettingsQuestionsState.data.questions.map(
                    (row, i) => (
                      <DataTableRow key={i}>
                        <DataTableCell>{row.questions}</DataTableCell>
                        <DataTableCell>
                          <div className="flex flex-row text-xl">
                            <span className="basis-1">{row.urgency_level}</span>
                          </div>
                        </DataTableCell>

                        <DataTableCell>
                          <div className="flex flex-row text-xl">
                            <span className="basis-1">
                              {row.equivalent_point}
                            </span>
                          </div>
                        </DataTableCell>

                        <DataTableCell>
                          <MaterialSwitch
                            label=""
                            checked={row.status === 1 ? true : false}
                            onChange={(e) => {
                              const checked = e.target.checked;
                              dispatch(
                                openMessageModal({
                                  message: `Are you sure you want to ${
                                    checked ? "enable" : "disable"
                                  } the product ?`,
                                  buttons: [
                                    {
                                      color: "#CC5801",
                                      text: "Yes",
                                      onClick: () => {
                                        dispatch(
                                          updateAuditSettingsQuestion({
                                            id: row.id,
                                            status: checked ? 1 : 0,
                                            type: "status",
                                          })
                                        );
                                        dispatch(closeMessageModal());
                                      },
                                    },
                                    {
                                      color: "#22201A",
                                      text: "No",
                                      onClick: () => {
                                        dispatch(closeMessageModal());
                                      },
                                    },
                                  ],
                                })
                              );
                            }}
                          />
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
