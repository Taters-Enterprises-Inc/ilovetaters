import {
  useAppDispatch,
  useAppSelector,
  useQuery,
} from "features/config/hooks";
import { useEffect } from "react";
import { MdEditNote, MdOutlinePersonAddAlt1 } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { AdminHead } from "../components";
import {
  getAllCataringPackageLists,
  getPagination,
  selectAllCataringPackageLists,
  resetGetCataringPackageListsStatus,
  deleteCataringPackage,
} from "../slices/admin-setting-caters-package.slice";
import {
  Column,
  DataTable,
  DataTableCell,
  DataTableRow,
} from "../../../shared/presentation/components/data-table";
import { createQueryParams } from "features/config/helpers";
import { TbTrash } from "react-icons/tb";
// import { CreatePackageModal } from "../modals/admin-setting-create-caters-package-modal";

const columns: Array<Column> = [
  { id: "name", label: "Name" },
  { id: "description", label: "Description" },
  { id: "package_type", label: "Package Type" },
  { id: "uom", label: "Unit of Measure" },
  { id: "price", label: "Price" },
  { id: "category", label: "Category" },
  { id: "id", label: "Action" },
];

export function AdminSettingCatersPackage() {
  const dispatch = useAppDispatch();
  const query = useQuery();
  const navigate = useNavigate();
  const pageNo = query.get("page_no");
  const perPage = query.get("per_page");
  const orderBy = query.get("order_by");
  const order = query.get("order");
  const search = query.get("search");

  const packages = useAppSelector(selectAllCataringPackageLists);
  const pagination = useAppSelector(getPagination);

  // const [openModal, setOpenModal] = useState(true);

  useEffect(() => {
    const query = createQueryParams({
      page_no: pageNo,
      per_page: perPage,
      order_by: orderBy,
      order: order,
      search: search,
    });

    dispatch(getAllCataringPackageLists(query));
  }, [dispatch, pageNo, perPage, orderBy, order, search]);

  const onDeletePackage = (id: number) => {
    dispatch(deleteCataringPackage(id));
  };
  return (
    <>
      <AdminHead
        AdminBreadCrumbsProps={{
          home: {
            title: "Home",
            url: "/admin",
          },
          className: "lg:h-[200px]",
          pageTitles: [
            { name: "Cataring Packages", url: "/admin/setting/caters-setting" },
          ],
        }}
      />

      <div className="flex flex-col px-4 lg:flex-row lg:items-end">
        <span className="text-secondary text-3xl font-['Bebas_Neue'] flex-1">
          List of Caters Package
        </span>
        <div className="flex flex-col space-y-1 lg:flex-row lg:space-x-4 lg:space-y-0">
          <div>
            <Link
              to="create-caters-package"
              className="inline-flex items-center px-4 tracking-wide py-1  bg-button font-['Varela_Round'] text-white text-xs rounded-md font-700"
            >
              <MdOutlinePersonAddAlt1 size={20} />
              <span>&nbsp;&nbsp;Create New Package</span>
            </Link>
          </div>
          {/* <div>
            <Link
              to="create-group"
              className="inline-flex items-center px-4 tracking-wide bg-button font-['Varela_Round'] text-white py-1 text-xs rounded-md font-700"
            >
              <MdOutlineGroupAdd size={20} />
              <span>&nbsp;&nbsp;Create New Package Add-Ons</span>
            </Link>
          </div>
          <div>
            <Link
              to="create-group"
              className="inline-flex items-center px-4 tracking-wide bg-button font-['Varela_Round'] text-white py-1 text-xs rounded-md font-700"
            >
              <MdOutlineGroupAdd size={20} />
              <span>&nbsp;&nbsp;Create New Product Add-Ons</span>
            </Link>
          </div> */}
        </div>
      </div>
      {/* $data['results'] */}
      <div className="hidden p-4 lg:block">
        <DataTable
          order={order === "asc" ? "asc" : "desc"}
          orderBy={orderBy ?? "dateadded"}
          emptyMessage="There is no packages yet."
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
            if (
              column_selected !== "action" &&
              column_selected !== "status" &&
              column_selected !== "store" &&
              column_selected !== "groups"
            ) {
              const isAsc = orderBy === column_selected && order === "asc";

              const params = {
                page_no: pageNo,
                per_page: perPage,
                order_by: column_selected,
                order: isAsc ? "desc" : "asc",
                search: search,
              };

              const queryParams = createQueryParams(params);

              dispatch(resetGetCataringPackageListsStatus());

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
              dispatch(resetGetCataringPackageListsStatus());
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
              dispatch(resetGetCataringPackageListsStatus());

              navigate({
                pathname: "",
                search: queryParams,
              });
            }
          }}
          totalRows={pagination.total_rows}
          perPage={pagination.per_page}
          page={pageNo ? parseInt(pageNo) : 1}
        >
          {packages !== undefined ? (
            <>
              {packages.map((row, i) => (
                <DataTableRow key={i}>
                  <DataTableCell>{row.name}</DataTableCell>
                  <DataTableCell>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: row.description,
                      }}
                    />
                  </DataTableCell>
                  <DataTableCell>
                    {row.package_type === 0 ? "Package" : "Add-ons"}
                  </DataTableCell>
                  <DataTableCell>{row.uom}</DataTableCell>
                  <DataTableCell>{row.price}</DataTableCell>
                  <DataTableCell>{row.category}</DataTableCell>
                  <DataTableCell>
                    <div className="flex">
                      <Link to={`edit-caters-package/${row.id}`}>
                        <MdEditNote className="text-2xl text-slate-500 hover:text-black"></MdEditNote>
                      </Link>
                      <TbTrash
                        className="text-2xl cursor-pointer text-slate-500 hover:text-black"
                        onClick={() => onDeletePackage(row.id)}
                      ></TbTrash>
                    </div>
                  </DataTableCell>
                </DataTableRow>
              ))}
            </>
          ) : null}
        </DataTable>
      </div>
      {/* <CreatePackageModal
        open={openModal}
        onClose={() => {
          const params = {
            page_no: pageNo,
            per_page: perPage,
            order_by: orderBy,
            order: order,
            search: search,
            user_id: null,
          };

          const queryParams = createQueryParams(params);

          navigate({
            pathname: "",
            search: queryParams,
          });
          setOpenModal(false);
        }}
      /> */}
    </>
  );
}
