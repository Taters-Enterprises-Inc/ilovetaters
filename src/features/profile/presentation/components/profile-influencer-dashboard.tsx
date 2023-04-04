import { useEffect, useState } from "react";
import {
  useAppDispatch,
  useAppSelector,
  useQuery,
} from "features/config/hooks";
import {
  getInfluencer,
  selectGetInfluencer,
} from "../slices/get-influencer.slice";
import {
  Column,
  DataTable,
  DataTableCell,
  DataTableRow,
} from "../../../shared/presentation/components/data-table";
import {
  getInfluencerReferees,
  selectGetInfluencerReferees,
  resetGetInfluencerRefereesStatus,
} from "../slices/get-influencer-referees.slice";
import { createQueryParams } from "features/config/helpers";
import { DataList } from "features/shared/presentation/components";
import Moment from "react-moment";
import NumberFormat from "react-number-format";
import { GiCash } from "react-icons/gi";
import { ProfileCashoutModal } from "../modals";
import { influencerCashout } from "../slices/influencer-cashout.slice";
import { popUpSnackBar } from "features/shared/presentation/slices/pop-snackbar.slice";

const columns: Array<Column> = [
  { id: "dateadded", label: "Date" },
  { id: "tracking_no", label: "Tracking No." },
  { id: "referee_name", label: "Referee Name" },
  { id: "customer_discount", label: "Payable Received" },
];

export function ProfileInfluencerDashboard() {
  const dispatch = useAppDispatch();
  const query = useQuery();

  const pageNo = query.get("page_no");
  const perPage = query.get("per_page");
  const orderBy = query.get("order_by");
  const order = query.get("order");
  const search = query.get("search");

  const getInfluencerState = useAppSelector(selectGetInfluencer);
  const getInfluencerRefereesState = useAppSelector(
    selectGetInfluencerReferees
  );

  const [openCashoutModal, setOpenCashoutModal] = useState(false);

  useEffect(() => {
    const query = createQueryParams({
      page_no: pageNo,
      per_page: perPage,
      order_by: orderBy,
      order: order,
      search: search,
    });
    dispatch(getInfluencerReferees(query));
  }, [dispatch, pageNo, perPage, orderBy, order, search]);

  useEffect(() => {
    dispatch(getInfluencer());
  }, [dispatch]);

  return (
    <>
      <div className="space-y-6">
        <div className="flex">
          {getInfluencerState.data ? (
            <div
              onClick={() => {
                setOpenCashoutModal(true);
              }}
              className="flex cursor-pointer lg:shadow-[0_3px_10px_rgb(0,0,0,0.3)] w-[350px]"
            >
              <div className="bg-primary w-[4px]"></div>
              <div className="px-4 py-1 flex flex-col flex-1">
                <span className="text-lg text-secondary font-semibold">
                  INFLUENCER BALANCE
                </span>
                <span className="text-xs text-secondary mt-1">
                  {getInfluencerState.data.first_name +
                    " " +
                    getInfluencerState.data.middle_name +
                    " " +
                    getInfluencerState.data.last_name}
                </span>
                <div className="h-[40px] flex justify-end items-end">
                  <span className="text-[12px] font-semibold text-secondary mr-2 mb-[3px]">
                    PHP
                  </span>
                  <span className="text-2xl font-bold text-secondary">
                    {getInfluencerState.data.payable ? (
                      <NumberFormat
                        value={parseFloat(getInfluencerState.data.payable)}
                        displayType={"text"}
                        thousandSeparator={true}
                      />
                    ) : (
                      "0"
                    )}
                  </span>
                  <span className="text-[12px] font-semibold text-secondary mr-2 mb-[3px]">
                    .
                    {getInfluencerState.data.payable
                      ? parseFloat(getInfluencerState.data.payable)
                          .toFixed(2)
                          .split(".")[1]
                      : 0}
                  </span>
                </div>
              </div>
            </div>
          ) : null}
        </div>

        {getInfluencerRefereesState.data?.referees ? (
          <>
            <div className="py-4 lg:hidden">
              <DataList
                search={search ?? ""}
                emptyMessage="No referees yet."
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

                    dispatch(resetGetInfluencerRefereesStatus());
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

                    dispatch(resetGetInfluencerRefereesStatus());
                  }
                }}
                totalRows={
                  getInfluencerRefereesState.data.pagination.total_rows
                }
                perPage={getInfluencerRefereesState.data.pagination.per_page}
                page={pageNo ? parseInt(pageNo) : 1}
              >
                <hr className="mt-4" />
                {getInfluencerRefereesState.data.referees.map((row, i) => {
                  return (
                    <div
                      className={`flex flex-col cursor-pointer px-4 py-2 border-b`}
                      key={i}
                    >
                      <span className="flex items-center justify-between space-x-1 text-xl">
                        <span className="overflow-hidden text-secondary text-ellipsis whitespace-nowrap max-w-[360px]">
                          {row.tracking_no}
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
                emptyMessage="No referees yet."
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
                    const isAsc =
                      orderBy === column_selected && order === "asc";

                    const params = {
                      page_no: pageNo,
                      per_page: perPage,
                      order_by: column_selected,
                      order: isAsc ? "desc" : "asc",
                      search: search,
                    };

                    dispatch(resetGetInfluencerRefereesStatus());
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

                    dispatch(resetGetInfluencerRefereesStatus());
                  }
                }}
                onPageChange={(event, newPage) => {
                  const pageNoInt = pageNo ? parseInt(pageNo) : null;
                  if (newPage !== pageNoInt) {
                    dispatch(resetGetInfluencerRefereesStatus());
                  }
                }}
                totalRows={
                  getInfluencerRefereesState.data.pagination.total_rows
                }
                perPage={getInfluencerRefereesState.data.pagination.per_page}
                page={pageNo ? parseInt(pageNo) : 1}
              >
                {getInfluencerRefereesState.data.referees !== undefined ? (
                  <>
                    {getInfluencerRefereesState.data.referees.map((row, i) => {
                      return (
                        <DataTableRow key={i}>
                          <DataTableCell>
                            <Moment format="LLL">{row.dateadded}</Moment>
                          </DataTableCell>
                          <DataTableCell>{row.tracking_no}</DataTableCell>
                          <DataTableCell>{row.client_name}</DataTableCell>
                          <DataTableCell>
                            <NumberFormat
                              value={parseFloat(
                                row.influencer_discount
                              ).toFixed(2)}
                              displayType={"text"}
                              thousandSeparator={true}
                              prefix={"₱"}
                            />
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
      </div>
      <ProfileCashoutModal
        open={openCashoutModal}
        onClose={() => {
          setOpenCashoutModal(false);
        }}
        onCashout={(cashout) => {
          if (getInfluencerState.data) {
            if (
              getInfluencerState.data.payable &&
              parseFloat(cashout) <= parseFloat(getInfluencerState.data.payable)
            ) {
              dispatch(
                influencerCashout({
                  influencerId: getInfluencerState.data.id,
                  cashout,
                })
              );
              setOpenCashoutModal(false);
            } else {
              dispatch(
                popUpSnackBar({
                  message: "You can't cashout above your balance.",
                  severity: "error",
                })
              );
            }
          }
        }}
      />
    </>
  );
}
