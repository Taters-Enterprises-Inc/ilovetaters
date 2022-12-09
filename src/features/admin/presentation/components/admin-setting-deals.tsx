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
import { selectUpdateStoreDeal } from "../slices/update-store-deal.slice";
import {
  getDealCategories,
  selectGetDealCategories,
} from "../slices/get-deal-categories.slice";
import { selectGetAdminSession } from "../slices/get-admin-session.slice";
import { createQueryParams } from "features/config/helpers";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import { MdOutlinePersonAddAlt1 } from "react-icons/md";
import {
  selectGetAdminSettingDeals,
  getAdminSettingDeals,
  resetGetAdminSettingDealsStatus,
} from "../slices/get-admin-setting-deals.slices";

const columns: Array<Column> = [
  { id: "photo", label: "Photo" },
  { id: "alias", label: "Alias" },
  { id: "name", label: "Name" },
  { id: "action", label: "Action" },
];

export function AdminSettingDeals() {
  const dispatch = useAppDispatch();
  const query = useQuery();
  const navigate = useNavigate();
  const pageNo = query.get("page_no");
  const perPage = query.get("per_page");
  const status = query.get("status");
  const storeId = query.get("store_id");
  const categoryId = query.get("category_id");
  const orderBy = query.get("order_by");
  const order = query.get("order");
  const search = query.get("search");

  const getAdminSettingDealsState = useAppSelector(selectGetAdminSettingDeals);
  const getAdminSessionState = useAppSelector(selectGetAdminSession);
  const getDealCategoriesState = useAppSelector(selectGetDealCategories);
  const updateStoreDealState = useAppSelector(selectUpdateStoreDeal);

  useEffect(() => {
    dispatch(getDealCategories());
  }, [dispatch]);

  useEffect(() => {
    const defaultStoreId =
      getAdminSessionState.data?.admin.user_details.stores[0].store_id ?? 3;

    const query = createQueryParams({
      page_no: pageNo,
      per_page: perPage,
      status: status,
      store_id: storeId ?? defaultStoreId,
      category_id: categoryId,
      order_by: orderBy,
      order: order,
      search: search,
    });
    dispatch(getAdminSettingDeals(query));
  }, [
    dispatch,
    pageNo,
    status,
    perPage,
    orderBy,
    order,
    search,
    storeId,
    categoryId,
    updateStoreDealState,
    getAdminSessionState,
  ]);

  const chipColors = [
      "#004d00",
      "#a21013",
      "#a21013",
      "#004d00",
      "#a21013",
      "#004d00",
    ]

  return (
    <>
      <div className="flex flex-col px-4 lg:flex-row lg:items-end">
        <span className="text-secondary text-3xl font-['Bebas_Neue'] flex-1">
          Deals
        </span>

        <div className="flex flex-col space-y-4 lg:items-center lg:justify-center lg:space-y-0 lg:space-x-2 lg:flex-row">
          <div>
            <Link
              to="create-deal"
              className="inline-flex items-center px-4 tracking-wide py-1  bg-button font-['Varela_Round'] text-white text-xs rounded-md font-700"
            >
              <MdOutlinePersonAddAlt1 size={20} />
              <span>&nbsp;&nbsp;Create a new deal</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="px-4 py-2">
        <div className="flex  flex-wrap gap-2  md:justify-end justify-start items-center ">
          <button
            onClick={() => {
              const queryParams = createQueryParams({});
              navigate({
                pathname: "",
                search: queryParams,
              });
            }}
            className={` ${
              !categoryId
                ? "sm:text-base h-auto text-[13px]"
                : "text-xs opacity-40"
            } rounded-full px-4 py-1 text-white bg-black h-auto `}
          >
            All
          </button>
          {getDealCategoriesState.data?.map((value: any, index: number) => {
            return (
              <button
                key={index}
                onClick={() => {
                  if (value) {
                    const params = {
                      page_no: pageNo,
                      per_page: perPage,
                      store_id: storeId,
                      category_id: value.id === "all" ? null : value.id,
                      search: search,
                    };

                    const queryParams = createQueryParams(params);
                    navigate({
                      pathname: "",
                      search: queryParams,
                    });
                  }
                }}
                style={{backgroundColor:chipColors[index]}}
                className={` ${
                  categoryId === value.id.toString()
                    ? "sm:text-base h-auto text-[13px]"
                    : "text-xs opacity-40 "
                } rounded-full px-4  py-1 text-white  text-center 	`}
              >
                {value.name}
              </button>
            );
          })}
        </div>
      </div>

      {getAdminSettingDealsState.data?.deals ? (
        <>
          <div className="p-4 lg:hidden">
            <DataList
              search={search ?? ""}
              emptyMessage="Empty availability deals."
              onSearch={(val) => {
                const params = {
                  page_no: null,
                  per_page: perPage,
                  status: status,
                  order_by: orderBy,
                  store_id: storeId,
                  category_id: categoryId,
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
                    store_id: storeId,
                    category_id: categoryId,
                    search: search,
                  };

                  const queryParams = createQueryParams(params);

                  dispatch(resetGetAdminSettingDealsStatus());
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
                    store_id: storeId,
                    category_id: categoryId,
                    search: search,
                  };

                  const queryParams = createQueryParams(params);

                  dispatch(resetGetAdminSettingDealsStatus());
                  navigate({
                    pathname: "",
                    search: queryParams,
                  });
                }
              }}
              totalRows={getAdminSettingDealsState.data.pagination.total_rows}
              perPage={getAdminSettingDealsState.data.pagination.per_page}
              page={pageNo ? parseInt(pageNo) : 1}
            >
              <hr className="mt-4" />
              {getAdminSettingDealsState.data.deals.map((row, i) => {
                return (
                  <div
                    className="flex flex-col px-4 py-2 space-y-4 border-b lg:space-y-0"
                    key={i}
                  >
                    <span className="flex flex-wrap items-center space-x-1 font-semibold">
                      <img
                        src={
                          REACT_APP_DOMAIN_URL +
                          "api/assets/images/shared/products/500/" +
                          row.product_image
                        }
                        alt={row.product_image}
                        className="w-24 h-24 rounded-lg"
                      />
                    </span>
                    <span className="flex flex-wrap items-center space-x-1 font-semibold">
                      {row.alias}
                    </span>

                    <div
                      className="text-sm"
                      dangerouslySetInnerHTML={{
                        __html: row.name,
                      }}
                    />
                  </div>
                );
              })}
            </DataList>
          </div>

          <div className="hidden p-4 lg:block">
            <DataTable
              order={order === "asc" ? "asc" : "desc"}
              orderBy={orderBy ?? "id"}
              emptyMessage="Empty availability deals."
              search={search ?? ""}
              onSearch={(val) => {
                const params = {
                  page_no: null,
                  per_page: perPage,
                  store_id: storeId,
                  category_id: categoryId,
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
                if (
                  column_selected !== "action" &&
                  column_selected !== "photo"
                ) {
                  const isAsc = orderBy === column_selected && order === "asc";

                  const params = {
                    page_no: pageNo,
                    per_page: perPage,
                    store_id: storeId,
                    category_id: categoryId,
                    order_by: column_selected,
                    order: isAsc ? "desc" : "asc",
                    search: search,
                  };

                  const queryParams = createQueryParams(params);

                  dispatch(resetGetAdminSettingDealsStatus());
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
                    store_id: storeId,
                    category_id: categoryId,
                    order_by: orderBy,
                    order: order,
                    search: search,
                  };

                  const queryParams = createQueryParams(params);

                  dispatch(resetGetAdminSettingDealsStatus());
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
                    store_id: storeId,
                    category_id: categoryId,
                    order_by: orderBy,
                    order: order,
                    search: search,
                  };

                  const queryParams = createQueryParams(params);

                  dispatch(resetGetAdminSettingDealsStatus());
                  navigate({
                    pathname: "",
                    search: queryParams,
                  });
                }
              }}
              totalRows={getAdminSettingDealsState.data.pagination.total_rows}
              perPage={getAdminSettingDealsState.data.pagination.per_page}
              page={pageNo ? parseInt(pageNo) : 1}
            >
              {getAdminSettingDealsState.data.deals !== undefined ? (
                <>
                  {getAdminSettingDealsState.data.deals.map((row, i) => (
                    <DataTableRow key={i}>
                      <DataTableCell>
                        <img
                          src={
                            REACT_APP_DOMAIN_URL +
                            "api/assets/images/shared/products/500/" +
                            row.product_image
                          }
                          alt={row.product_image}
                          className="w-24 h-24 rounded-lg"
                        />
                      </DataTableCell>
                      <DataTableCell>{row.alias}</DataTableCell>
                      <DataTableCell>{row.name}</DataTableCell>
                      <DataTableCell>
                        <Link
                          to={`/admin/setting/deals/edit-deal/${row.id}`}
                          className="px-3 py-1 border rounded-lg border-secondary font-['Varela_Round']"
                        >
                          Edit
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
    </>
  );
}

{
  /* {getDealCategoriesState.data ? (
          <MaterialInput
            colorTheme="black"
            label="Filter by category"
            name="category"
            select
            className="!min-w-[150px]"
            size="small"
            value={categoryId ?? "all"}
            onChange={(event) => {
              if (event.target.value) {
                const params = {
                  page_no: pageNo,
                  per_page: perPage,
                  store_id: storeId,
                  category_id:
                    event.target.value === "all" ? null : event.target.value,
                  search: search,
                };

                const queryParams = createQueryParams(params);
                navigate({
                  pathname: "",
                  search: queryParams,
                });
              }
            }}
          >
            <MenuItem value="all">
              <span className="text-xs lg:text-base">All</span>
            </MenuItem>
            {getDealCategoriesState.data?.map((category, index) => (
              <MenuItem key={index} value={category.id}>
                <span className="text-xs lg:text-base">{category.name}</span>
              </MenuItem>
            ))}
          </MaterialInput>
        ) : null} */
}
