import {
  useAppDispatch,
  useAppSelector,
  useQuery,
} from "features/config/hooks";
import {
  selectGetSnackShopOrderHistory,
  resetGetSnackShopOrderHistoryStatus,
  getSnackshopOrderHistory,
} from "features/profile/presentation/slices/get-snackshop-order-history.slice";
import { FaEye } from "react-icons/fa";
import Moment from "react-moment";
import { Link, useNavigate } from "react-router-dom";
import {
  Column,
  DataTable,
  DataTableCell,
  DataTableRow,
} from "../../../shared/presentation/components/data-table";
import { useEffect } from "react";
import { ProfileContainer } from "../components";
import NumberFormat from "react-number-format";
import { SnackShopOrderModel } from "features/profile/core/domain/snackshop-order.model";
import { DataList } from "features/shared/presentation/components";
import { createQueryParams } from "features/config/helpers";

const columns: Array<Column> = [
  { id: "dateadded", label: "Order Date" },
  { id: "tracking_no", label: "Tracking No." },
  { id: "purchase_amount", label: "Purchase Amount" },
  { id: "raffle_code", label: "Raffle Code" },
  { id: "raffle_status", label: "Raffle Status" },
  { id: "view", label: "View" },
];

export function ProfileSnackshopOrders() {
  const dispatch = useAppDispatch();
  const query = useQuery();
  const navigate = useNavigate();
  const getSnackshopOrderHistoryState = useAppSelector(
    selectGetSnackShopOrderHistory
  );
  const pageNo = query.get("page_no");
  const perPage = query.get("per_page");
  const orderBy = query.get("order_by");
  const order = query.get("order");
  const search = query.get("search");

  useEffect(() => {
    const query = createQueryParams({
      page_no: pageNo,
      per_page: perPage,
      order_by: orderBy,
      order: order,
      search: search,
    });
    dispatch(getSnackshopOrderHistory(query));
  }, [dispatch, pageNo, perPage, orderBy, order, search]);

  const calculatePurchaseAmount = (row: SnackShopOrderModel) => {
    let calculatedPrice = 0;

    if (row.purchase_amount) {
      calculatedPrice += parseInt(row.purchase_amount);
    }

    if (row.cod_fee) {
      calculatedPrice += parseInt(row.cod_fee);
    }
    if (row.distance_price) {
      calculatedPrice += parseInt(row.distance_price);
    }

    return (
      <NumberFormat
        value={calculatedPrice.toFixed(2)}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"₱"}
      />
    );
  };

  return (
    <ProfileContainer title="Snack Shop Orders" activeTab="snackshop">
      <h1 className="text-secondary font-['Bebas_Neue'] tracking-[3px] text-3xl leading-6">
        Snack Shop Orders
      </h1>

      {getSnackshopOrderHistoryState.data?.orders ? (
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

                  dispatch(resetGetSnackShopOrderHistoryStatus());
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

                  dispatch(resetGetSnackShopOrderHistoryStatus());
                  navigate({
                    pathname: "",
                    search: queryParams,
                  });
                }
              }}
              totalRows={
                getSnackshopOrderHistoryState.data.pagination.total_rows
              }
              perPage={getSnackshopOrderHistoryState.data.pagination.per_page}
              page={pageNo ? parseInt(pageNo) : 1}
            >
              <hr className="mt-4" />
              {getSnackshopOrderHistoryState.data.orders.map((row, i) => (
                <Link
                  to={`/delivery/order/${row.hash_key}`}
                  className="flex flex-col px-4 py-2 border-b"
                  key={i}
                >
                  <span className="flex flex-wrap items-center space-x-1 text-xl">
                    <span className="text-lg text-gray-600">
                      #{row.tracking_no}
                    </span>
                  </span>
                  <div className="flex justify-between">
                    <span className="text-xs">
                      <Moment format="LLL">{row.dateadded}</Moment>
                    </span>
                    <span className="text-lg font-semibold">
                      {calculatePurchaseAmount(row)}
                    </span>
                  </div>
                </Link>
              ))}
            </DataList>
          </div>
          <div className="hidden lg:block">
            <DataTable
              order={order === "asc" ? "asc" : "desc"}
              orderBy={orderBy ?? "dateadded"}
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

                const queryParams = createQueryParams(params);

                navigate({
                  pathname: "",
                  search: queryParams,
                });
              }}
              onRequestSort={(column_selected) => {
                const isAsc = orderBy === column_selected && order === "asc";

                const params = {
                  page_no: pageNo,
                  per_page: perPage,
                  order_by: column_selected,
                  order: isAsc ? "desc" : "asc",
                  search: search,
                };

                const queryParams = createQueryParams(params);

                dispatch(resetGetSnackShopOrderHistoryStatus());
                navigate({
                  pathname: "",
                  search: queryParams,
                });
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

                  dispatch(resetGetSnackShopOrderHistoryStatus());
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

                  dispatch(resetGetSnackShopOrderHistoryStatus());
                  navigate({
                    pathname: "",
                    search: queryParams,
                  });
                }
              }}
              totalRows={
                getSnackshopOrderHistoryState.data.pagination.total_rows
              }
              perPage={getSnackshopOrderHistoryState.data.pagination.per_page}
              page={pageNo ? parseInt(pageNo) : 1}
            >
              {getSnackshopOrderHistoryState.data.orders !== undefined ? (
                <>
                  {getSnackshopOrderHistoryState.data.orders.map((row, i) => (
                    <DataTableRow key={i}>
                      <DataTableCell>
                        <Moment format="LLL">{row.dateadded}</Moment>
                      </DataTableCell>
                      <DataTableCell>{row.tracking_no}</DataTableCell>
                      <DataTableCell>
                        {calculatePurchaseAmount(row)}
                      </DataTableCell>
                      <DataTableCell>N/A</DataTableCell>
                      <DataTableCell>N/A</DataTableCell>
                      <DataTableCell align="left">
                        <Link to={`/delivery/order/${row.hash_key}`}>
                          <FaEye className="text-lg" />
                        </Link>
                      </DataTableCell>
                    </DataTableRow>
                  ))}
                </>
              ) : null}
            </DataTable>
          </div>
        </>
      ) : null}
    </ProfileContainer>
  );
}
