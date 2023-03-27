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
import { createQueryParams } from "features/config/helpers";
import { AiFillFolderAdd } from "react-icons/ai";
import {
  selectGetAdminInfluencerCashouts,
  getAdminInfluencerCashouts,
  resetGetAdminInfluencerCashoutsState,
} from "../slices/get-admin-influencer-cashouts.slice";
import { AdminChipsButton } from "./chips-button";
import { ADMIN_INFLUENCER_CASHOUT_STATUS } from "features/shared/constants";
import { FaEye } from "react-icons/fa";
import NumberFormat from "react-number-format";

export function AdminInfluencerCashouts() {
  const dispatch = useAppDispatch();

  const query = useQuery();
  const navigate = useNavigate();
  const pageNo = query.get("page_no");
  const perPage = query.get("per_page");
  const orderBy = query.get("order_by");
  const order = query.get("order");
  const search = query.get("search");
  const status = query.get("status");

  let columns: Array<Column> = [
    { id: "cashout_status", label: "Status" },
    { id: "influencer_name", label: "Influencer Name" },
    { id: "cashout", label: "Cashout" },
    { id: "dateadded", label: "Dateadded" },
    { id: "action", label: "Action" },
  ];

  const getAdminInfluencerCashoutsState = useAppSelector(
    selectGetAdminInfluencerCashouts
  );

  useEffect(() => {
    const query = createQueryParams({
      page_no: pageNo,
      per_page: perPage,
      order_by: orderBy,
      order: order,
      search: search,
      status: status,
    });

    dispatch(getAdminInfluencerCashouts(query));
  }, [dispatch, pageNo, perPage, orderBy, order, search, status]);

  return (
    <>
      <div className="flex flex-col lg:flex-row lg:items-end">
        <span className="px-4 text-secondary text-3xl font-['Bebas_Neue'] flex-1">
          List of Influencer Cashouts
        </span>
        <AdminChipsButton
          createQueryParams={createQueryParams}
          data={ADMIN_INFLUENCER_CASHOUT_STATUS}
          dispatchAction={() => {
            dispatch(resetGetAdminInfluencerCashoutsState());
          }}
          status={status}
          params={(value) => {
            const params = {
              page_no: pageNo,
              per_page: perPage,
              status: value === -1 ? null : value,
              search: search,
            };
            return params;
          }}
        />
      </div>
      {getAdminInfluencerCashoutsState.data?.influencer_cashouts ? (
        <>
          <div className="p-4 lg:hidden">
            <DataList
              search={search ?? ""}
              emptyMessage="No packages yet."
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

                  dispatch(resetGetAdminInfluencerCashoutsState());
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

                  dispatch(resetGetAdminInfluencerCashoutsState());
                  navigate({
                    pathname: "",
                    search: queryParams,
                  });
                }
              }}
              totalRows={
                getAdminInfluencerCashoutsState.data.pagination.total_rows
              }
              perPage={getAdminInfluencerCashoutsState.data.pagination.per_page}
              page={pageNo ? parseInt(pageNo) : 1}
            >
              <hr className="mt-4" />
              {getAdminInfluencerCashoutsState.data.influencer_cashouts.map(
                (row, i) => (
                  <div
                    className="flex flex-col px-4 py-2 space-y-4 border-b lg:space-y-0"
                    key={i}
                  >
                    <span className="flex flex-wrap items-center space-x-1 text-xl">
                      <span className="text-xs lg:text-bas">
                        {row.fb_user_name} {row.mobile_user_name}
                      </span>
                    </span>
                  </div>
                )
              )}
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

                  dispatch(resetGetAdminInfluencerCashoutsState());
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

                  dispatch(resetGetAdminInfluencerCashoutsState());
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

                  dispatch(resetGetAdminInfluencerCashoutsState());
                  navigate({
                    pathname: "",
                    search: queryParams,
                  });
                }
              }}
              totalRows={
                getAdminInfluencerCashoutsState.data.pagination.total_rows
              }
              perPage={getAdminInfluencerCashoutsState.data.pagination.per_page}
              page={pageNo ? parseInt(pageNo) : 1}
            >
              {getAdminInfluencerCashoutsState.data.influencer_cashouts !==
              undefined ? (
                <>
                  {getAdminInfluencerCashoutsState.data.influencer_cashouts.map(
                    (row, i) => (
                      <DataTableRow key={i}>
                        <DataTableCell>
                          <span
                            className="px-2 py-1 text-xs rounded-full "
                            style={{
                              color: "white",
                              backgroundColor:
                                ADMIN_INFLUENCER_CASHOUT_STATUS[
                                  row.influencer_cashout_status_id
                                ].color,
                            }}
                          >
                            {
                              ADMIN_INFLUENCER_CASHOUT_STATUS[
                                row.influencer_cashout_status_id
                              ].name
                            }
                          </span>
                        </DataTableCell>
                        <DataTableCell>
                          {row.fb_user_name} {row.mobile_user_name}
                        </DataTableCell>
                        <DataTableCell>
                          <NumberFormat
                            value={parseFloat(row.cashout).toFixed(2)}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={"₱"}
                          />
                        </DataTableCell>
                        <DataTableCell>{row.dateadded}</DataTableCell>
                        <DataTableCell align="left">
                          <button
                            onClick={() => {
                              // if (notification) {
                              //   dispatch(
                              //     updateAdminNotificationDateSeen(
                              //       notification.id
                              //     )
                              //   );
                              // }
                              // const params = {
                              //   page_no: pageNo,
                              //   per_page: perPage,
                              //   status: status,
                              //   id: row.id,
                              //   order_by: orderBy,
                              //   order: order,
                              //   search: search,
                              // };
                              // const queryParams = createQueryParams(params);
                              // navigate({
                              //   pathname: "",
                              //   search: queryParams,
                              // });
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
