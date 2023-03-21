import { useEffect } from "react";
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
  getInfluencerDealRedeems,
  selectGetInfluencerDealRedeems,
  resetGetInfluencerDealRedeemsStatus,
} from "../slices/get-influencer-deal-redeems.slice";
import { createQueryParams } from "features/config/helpers";
import { DataList } from "features/shared/presentation/components";
import { NotificationModel } from "features/shared/core/domain/notification.model";
import { selectGetNotifications } from "features/shared/presentation/slices/get-notifications.slice";
import { seenNotification } from "features/shared/presentation/slices/seen-notification.slice";
import Moment from "react-moment";
import { VscCircleFilled } from "react-icons/vsc";

const columns: Array<Column> = [
  { id: "redeem_code", label: "Date" },
  { id: "referee_name", label: "Referee Name" },
  { id: "discount", label: "Discount Received" },
  { id: "dateadded", label: "Date Redeemed" },
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
  const getInfluencerDealRedeemsState = useAppSelector(
    selectGetInfluencerDealRedeems
  );
  const getNotificationsState = useAppSelector(selectGetNotifications);

  useEffect(() => {
    const query = createQueryParams({
      page_no: pageNo,
      per_page: perPage,
      order_by: orderBy,
      order: order,
      search: search,
    });
    dispatch(getInfluencerDealRedeems(query));
  }, [dispatch, pageNo, perPage, orderBy, order, search]);

  useEffect(() => {
    dispatch(getInfluencer());
  }, [dispatch]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-start sm:flex-row sm:justify-between sm:items-center">
        <h1 className="text-secondary font-['Bebas_Neue'] tracking-[3px] text-3xl ">
          Influencer Profile
        </h1>
      </div>
      <div>
        <span>Influencer Discount: </span>
        {getInfluencerState.data?.discount_points ? (
          <span className="text-lg font-bold">
            {parseFloat(getInfluencerState.data.discount_points) * 100}%
          </span>
        ) : (
          "0%"
        )}
      </div>

      {getInfluencerDealRedeemsState.data?.deal_redeems ? (
        <>
          <div className="py-4 lg:hidden">
            <DataList
              search={search ?? ""}
              emptyMessage="No snackshop orders yet."
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

                  dispatch(resetGetInfluencerDealRedeemsStatus());
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

                  dispatch(resetGetInfluencerDealRedeemsStatus());
                }
              }}
              totalRows={
                getInfluencerDealRedeemsState.data.pagination.total_rows
              }
              perPage={getInfluencerDealRedeemsState.data.pagination.per_page}
              page={pageNo ? parseInt(pageNo) : 1}
            >
              <hr className="mt-4" />
              {getInfluencerDealRedeemsState.data.deal_redeems.map((row, i) => {
                return (
                  <div
                    className={`flex flex-col cursor-pointer px-4 py-2 border-b`}
                    key={i}
                  >
                    <span className="flex items-center justify-between space-x-1 text-xl">
                      <span className="overflow-hidden text-secondary text-ellipsis whitespace-nowrap max-w-[360px]">
                        {row.redeem_code}
                      </span>
                    </span>
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-600 ">
                        <Moment format="LLL">{row.redeem_dateadded}</Moment>
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
              emptyMessage="No snackshop orders yet."
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

                  dispatch(resetGetInfluencerDealRedeemsStatus());
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

                  dispatch(resetGetInfluencerDealRedeemsStatus());
                }
              }}
              onPageChange={(event, newPage) => {
                const pageNoInt = pageNo ? parseInt(pageNo) : null;
                if (newPage !== pageNoInt) {
                  dispatch(resetGetInfluencerDealRedeemsStatus());
                }
              }}
              totalRows={
                getInfluencerDealRedeemsState.data.pagination.total_rows
              }
              perPage={getInfluencerDealRedeemsState.data.pagination.per_page}
              page={pageNo ? parseInt(pageNo) : 1}
            >
              {getInfluencerDealRedeemsState.data.deal_redeems !== undefined ? (
                <>
                  {getInfluencerDealRedeemsState.data.deal_redeems.map(
                    (row, i) => {
                      return (
                        <DataTableRow key={i}>
                          <DataTableCell>{row.redeem_code}</DataTableCell>
                          <DataTableCell>{row.referee_name}</DataTableCell>
                          <DataTableCell>
                            {parseFloat(row.influencer_discount) * 100}%
                          </DataTableCell>
                          <DataTableCell>
                            <Moment format="LLL">{row.redeem_dateadded}</Moment>
                          </DataTableCell>
                        </DataTableRow>
                      );
                    }
                  )}
                </>
              ) : null}
            </DataTable>
          </div>
        </>
      ) : null}
    </div>
  );
}
