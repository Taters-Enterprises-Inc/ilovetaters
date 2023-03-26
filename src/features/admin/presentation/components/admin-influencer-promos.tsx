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
  selectGetAdminInfluencerPromos,
  getAdminInfluencerPromos,
  resetGetAdminInfluencerPromosState,
} from "../slices/get-admin-influencer-promos.slice";

export function AdminInfluencerPromos() {
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
    { id: "influencer_name", label: "Influencer Name" },
    { id: "referral_code", label: "Referral Code" },
    { id: "customer_discount", label: "Customer Discount" },
    { id: "influencer_discount", label: "Influencer Discount" },
    { id: "dateadded", label: "Date Created" },
  ];

  const getAdminInfluencerPromosState = useAppSelector(
    selectGetAdminInfluencerPromos
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

    dispatch(getAdminInfluencerPromos(query));
  }, [dispatch, pageNo, perPage, orderBy, order, search, status]);

  return (
    <>
      <div className="flex flex-col px-4 lg:flex-row lg:items-end">
        <span className="text-secondary text-3xl font-['Bebas_Neue'] flex-1">
          List of Influencer Promos
        </span>
        <div className="flex flex-col space-y-1 lg:flex-row lg:space-x-4 lg:space-y-0">
          <div>
            <Link
              to="create"
              className="inline-flex items-center px-4 tracking-wide py-1  bg-button font-['Varela_Round'] text-white text-xs rounded-md font-700"
            >
              <AiFillFolderAdd size={20} />
              <span>&nbsp;&nbsp;Create a Influencer Promo</span>
            </Link>
          </div>
        </div>
      </div>
      {getAdminInfluencerPromosState.data?.influencer_promos ? (
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

                  dispatch(resetGetAdminInfluencerPromosState());
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

                  dispatch(resetGetAdminInfluencerPromosState());
                  navigate({
                    pathname: "",
                    search: queryParams,
                  });
                }
              }}
              totalRows={
                getAdminInfluencerPromosState.data.pagination.total_rows
              }
              perPage={getAdminInfluencerPromosState.data.pagination.per_page}
              page={pageNo ? parseInt(pageNo) : 1}
            >
              <hr className="mt-4" />
              {getAdminInfluencerPromosState.data.influencer_promos.map(
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

                  dispatch(resetGetAdminInfluencerPromosState());
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

                  dispatch(resetGetAdminInfluencerPromosState());
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

                  dispatch(resetGetAdminInfluencerPromosState());
                  navigate({
                    pathname: "",
                    search: queryParams,
                  });
                }
              }}
              totalRows={
                getAdminInfluencerPromosState.data.pagination.total_rows
              }
              perPage={getAdminInfluencerPromosState.data.pagination.per_page}
              page={pageNo ? parseInt(pageNo) : 1}
            >
              {getAdminInfluencerPromosState.data.influencer_promos !==
              undefined ? (
                <>
                  {getAdminInfluencerPromosState.data.influencer_promos.map(
                    (row, i) => (
                      <DataTableRow key={i}>
                        <DataTableCell>
                          {row.fb_user_name} {row.mobile_user_name}
                        </DataTableCell>
                        <DataTableCell>{row.referral_code}</DataTableCell>
                        <DataTableCell>{row.customer_discount}</DataTableCell>
                        <DataTableCell>{row.influencer_discount}</DataTableCell>
                        <DataTableCell>{row.dateadded}</DataTableCell>
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
