import { useEffect } from "react";
import {
  useAppDispatch,
  useAppSelector,
  useQuery,
} from "features/config/hooks";
import {
  Column,
  DataTable,
  DataTableCell,
  DataTableRow,
} from "../../../shared/presentation/components/data-table";
import {
  getInfluencerCashouts,
  selectGetInfluencerCashouts,
  resetGetInfluencerCashoutsStatus,
} from "../slices/get-influencer-cashouts.slice";
import { createQueryParams } from "features/config/helpers";
import { DataList } from "features/shared/presentation/components";
import Moment from "react-moment";
import NumberFormat from "react-number-format";
import { INFLUENCER_CASHOUT_STATUS } from "features/shared/constants";

const columns: Array<Column> = [
  { id: "dateadded", label: "Date" },
  { id: "cashout", label: "Cashout" },
  { id: "status", label: "Status" },
];

export function ProfileInfluencerCashouts() {
  const dispatch = useAppDispatch();
  const query = useQuery();

  const pageNo = query.get("page_no");
  const perPage = query.get("per_page");
  const orderBy = query.get("order_by");
  const order = query.get("order");
  const search = query.get("search");

  const getInfluencerCashoutsState = useAppSelector(
    selectGetInfluencerCashouts
  );

  useEffect(() => {
    const query = createQueryParams({
      page_no: pageNo,
      per_page: perPage,
      order_by: orderBy,
      order: order,
      search: search,
    });
    dispatch(getInfluencerCashouts(query));
  }, [dispatch, pageNo, perPage, orderBy, order, search]);

  return (
    <>
      {getInfluencerCashoutsState.data?.cashouts ? (
        <>
          <div className="py-4 lg:hidden">
            <DataList
              search={search ?? ""}
              emptyMessage="No Cashouts yet."
              onSearch={(val) => {
                const params = {
                  page_no: null,
                  per_page: perPage,
                  order_by: orderBy,
                  order: order,
                  search: val === "" ? null : val,
                };

                const queryParams = createQueryParams(params);
              }}
              onRowsPerPageChange={(event) => {
                if (perPage !== event.target.value) {
                  const params = {
                    page_no: pageNo,
                    per_page: event.target.value,
                    search: search,
                  };

                  const queryParams = createQueryParams(params);

                  dispatch(resetGetInfluencerCashoutsStatus());
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

                  dispatch(resetGetInfluencerCashoutsStatus());
                }
              }}
              totalRows={getInfluencerCashoutsState.data.pagination.total_rows}
              perPage={getInfluencerCashoutsState.data.pagination.per_page}
              page={pageNo ? parseInt(pageNo) : 1}
            >
              <hr className="mt-4" />
              {getInfluencerCashoutsState.data.cashouts.map((row, i) => {
                return (
                  <div
                    className={`flex flex-col cursor-pointer px-4 py-2 border-b`}
                    key={i}
                  >
                    <span className="flex items-center justify-between space-x-1 text-xl">
                      <span className="overflow-hidden text-secondary text-ellipsis whitespace-nowrap max-w-[360px]">
                        {row.cashout}
                      </span>
                    </span>
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-600 ">
                        <Moment format="LLL">{row.dateadded}</Moment>
                      </span>
                    </div>
                  </div>
                );
              })}
            </DataList>
          </div>
          <div className="hidden lg:block">
            <DataTable
              order={order === "asc" ? "asc" : "desc"}
              orderBy={orderBy ?? "redeem_dateadded"}
              emptyMessage="No Cashouts yet."
              search={search ?? ""}
              onSearch={(val) => {
                const params = {
                  page_no: null,
                  per_page: perPage,
                  order_by: orderBy,
                  order: order,
                  search: val === "" ? null : val,
                };
              }}
              onRequestSort={(column_selected) => {
                if (column_selected !== "view") {
                  const isAsc = orderBy === column_selected && order === "asc";

                  const params = {
                    page_no: pageNo,
                    per_page: perPage,
                    order_by: column_selected,
                    order: isAsc ? "desc" : "asc",
                    search: search,
                  };

                  dispatch(resetGetInfluencerCashoutsStatus());
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

                  dispatch(resetGetInfluencerCashoutsStatus());
                }
              }}
              onPageChange={(event, newPage) => {
                const pageNoInt = pageNo ? parseInt(pageNo) : null;
                if (newPage !== pageNoInt) {
                  dispatch(resetGetInfluencerCashoutsStatus());
                }
              }}
              totalRows={getInfluencerCashoutsState.data.pagination.total_rows}
              perPage={getInfluencerCashoutsState.data.pagination.per_page}
              page={pageNo ? parseInt(pageNo) : 1}
            >
              {getInfluencerCashoutsState.data.cashouts !== undefined ? (
                <>
                  {getInfluencerCashoutsState.data.cashouts.map((row, i) => {
                    return (
                      <DataTableRow key={i}>
                        <DataTableCell>
                          <Moment format="LLL">{row.dateadded}</Moment>
                        </DataTableCell>
                        <DataTableCell>
                          <NumberFormat
                            value={parseFloat(row.cashout).toFixed(2)}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={"₱"}
                          />
                        </DataTableCell>
                        <DataTableCell>
                          <span
                            className="px-2 py-1 text-xs rounded-full "
                            style={{
                              color: "white",
                              backgroundColor:
                                INFLUENCER_CASHOUT_STATUS[
                                  row.influencer_cashout_status_id
                                ].color,
                            }}
                          >
                            {
                              INFLUENCER_CASHOUT_STATUS[
                                row.influencer_cashout_status_id
                              ].name
                            }
                          </span>
                        </DataTableCell>
                      </DataTableRow>
                    );
                  })}
                </>
              ) : null}
            </DataTable>
          </div>
        </>
      ) : null}
    </>
  );
}
