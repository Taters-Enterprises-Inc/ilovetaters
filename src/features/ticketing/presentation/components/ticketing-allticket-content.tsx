// This code referenced from admin-user-discounts.tsx
import { DataList, DataTable } from "features/shared/presentation/components";
import {
  Column,
  DataTableCell,
  DataTableRow,
} from "features/shared/presentation/components/data-table";
import { useEffect } from "react";
import { FaEye } from "react-icons/fa";
import { TbCheckupList } from "react-icons/tb";
import { TicketingTriageModal } from "../modals/ticketing-triage.modal";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  useAppDispatch,
  useAppSelector,
  useQuery,
} from "features/config/hooks";
import { createQueryParams } from "features/config/helpers";
import {
  getAllTickets,
  selectGetAllTickets,
} from "../slices/get-all-tickets.slice";

// 👇 Edit this
const columns: Array<Column> = [
  { id: "status", label: "Status" },
  { id: "ticketNumber", label: "Ticket Number" },
  { id: "ticketTitle", label: "Ticket Title" },
  { id: "dateCreated", label: "Date Created" },
  { id: "actions", label: "Actions" },
];

export function AllTicketsContents() {
  const dispatch = useAppDispatch();
  const query = useQuery();
  const navigate = useNavigate();
  const pageNo = query.get("page_no");
  const perPage = query.get("per_page");
  const status = query.get("status");
  const id = query.get("id");
  const orderBy = query.get("order_by");
  const order = query.get("order");
  const search = query.get("search");

  const [openTriageModal, setOpenTriageModal] = React.useState(false);

  const getAllTicketStates = useAppSelector(selectGetAllTickets);

  // 👇 Edit This
  useEffect(() => {
    const query = createQueryParams({
      page_no: pageNo,
      per_page: perPage,
      status: status,
      order_by: orderBy,
      order: order,
      search: search,
    });
    dispatch(getAllTickets(query));
  }, [dispatch, pageNo, status, perPage, orderBy, order, search]);

  return (
    <>
      <div className="flex flex-col lg:flex-row lg:items-end">
        <span className="px-4 text-secondary text-3xl font-['Bebas_Neue'] flex-1">
          All Tickets
        </span>
        {/* Add Chips Here */}
      </div>

      {/* 👇 EDIT THIS 👇 */}
      {getAllTicketStates.data?.discounts ? (
        <>
          {/* Mobile View */}
          <div className="p-4 lg:hidden">
            <DataList
              search={search ?? ""}
              emptyMessage="No tickets yet."
              // 🟡 onSearch ongoing edits
              onSearch={(val) => {
                const params = {
                  page_no: null,
                  per_page: perPage,
                  status: status,
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
              // 🟡 onRowsPerPageChange ongoing edits
              onRowsPerPageChange={(event) => {
                if (perPage !== event.target.value) {
                  const params = {
                    page_no: pageNo,
                    per_page: event.target.value,
                    status: status,
                    search: search,
                  };

                  const queryParams = createQueryParams(params);

                  // dispatch(resetGetAdminUserDiscountsStatus()); // 👈  Edit This
                  navigate({
                    pathname: "",
                    search: queryParams,
                  });
                }
              }}
              // 🟡 onPageChange ongoing edits
              onPageChange={(event, newPage) => {
                const pageNoInt = pageNo ? parseInt(pageNo) : null;
                if (newPage !== pageNoInt) {
                  const params = {
                    page_no: newPage,
                    per_page: perPage,
                    status: status,
                    search: search,
                  };

                  const queryParams = createQueryParams(params);

                  // dispatch(resetGetAdminUserDiscountsStatus()); // 👈  Edit This
                  navigate({
                    pathname: "",
                    search: queryParams,
                  });
                }
              }}
              totalRows={0} // 👈 Edit this
              perPage={0} // 👈 Edit this
              page={0} // 👈 Edit this
            >
              <hr className="mt-4" />
              <div className="flex justify-between items-center px-4 py-2 border-b">
                <div className="flex flex-col">
                  <span className="flex flex-wrap items-center space-x-1 text-xl">
                    <span>My PC Isn't Working</span>
                    <span
                      className="px-2 py-1 text-xs rounded-full"
                      style={{
                        color: "white",
                        backgroundColor: "#cca300",
                      }}
                    >
                      Open
                    </span>
                  </span>
                  <span className="text-xs text-gray-600">
                    <strong>Ticket Number:</strong> 159
                  </span>
                  <span className="text-xs text-gray-600">
                    <strong>Date Created:</strong> February 13, 2024
                  </span>
                </div>
                <div className="flex items-center">
                  <Link
                    to="/admin/ticketing/view-ticket"
                    style={{ marginRight: "10px" }}
                  >
                    <FaEye className="text-lg" />
                  </Link>
                  <button
                    onClick={() => {
                      setOpenTriageModal(true);
                    }}
                  >
                    <TbCheckupList className="text-lg" />
                  </button>
                </div>
              </div>
            </DataList>
          </div>

          {/* Desktop View */}
          <div className="hidden p-4 lg:block">
            <DataTable
              order={"asc" ? "asc" : "desc"} // 👈  Edit This
              orderBy={"dateCreated"} // 👈  Edit This
              emptyMessage="No tickets yet."
              search={search ?? ""} // 👈  Edit This
              // 🟡 onSearch on editing stage
              onSearch={(val) => {
                const params = {
                  page_no: pageNo,
                  per_page: perPage,
                  status: status,
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
              // 🟡 onRequestSort ongoing edits
              onRequestSort={(column_selected) => {
                if (column_selected !== "action") {
                  const isAsc = orderBy === column_selected && order === "asc";

                  const params = {
                    page_no: pageNo,
                    per_page: perPage,
                    status: status,
                    order_by: column_selected,
                    order: isAsc ? "desc" : "asc",
                    search: search,
                  };

                  const queryParams = createQueryParams(params);

                  // dispatch(resetGetAdminUserDiscountsStatus()); // 👈  Edit This
                  navigate({
                    pathname: "",
                    search: queryParams,
                  });
                }
              }}
              columns={columns}
              // 🟡 onRowsPerPageChange ongoing edits
              onRowsPerPageChange={(event) => {
                if (perPage !== event.target.value) {
                  const params = {
                    page_no: pageNo,
                    per_page: event.target.value,
                    status: status,
                    order_by: orderBy,
                    order: order,
                    search: search,
                  };

                  const queryParams = createQueryParams(params);

                  // dispatch(resetGetAdminUserDiscountsStatus()); // 👈  Edit This
                  navigate({
                    pathname: "",
                    search: queryParams,
                  });
                }
              }}
              // 🟡 onPageChange ongoing edits
              onPageChange={(event, newPage) => {
                const pageNoInt = pageNo ? parseInt(pageNo) : null;
                if (newPage !== pageNoInt) {
                  const params = {
                    page_no: newPage,
                    per_page: perPage,
                    status: status,
                    order_by: orderBy,
                    order: order,
                    search: search,
                  };

                  const queryParams = createQueryParams(params);

                  // dispatch(resetGetAdminUserDiscountsStatus()); // 👈  Edit This
                  navigate({
                    pathname: "",
                    search: queryParams,
                  });
                }
              }}
              totalRows={0} // 👈 Edit this
              perPage={0} // 👈 Edit this
              page={pageNo ? parseInt(pageNo) : 1} // 👈 Edit this
            >
              {/* 👇 EDIT THIS 👇 */}
              {getAllTicketStates.data.discounts.map((row, i) => (
                <>
                  <DataTableRow key={i}>
                    <DataTableCell>
                      <span
                        className="px-2 py-1 text-xs rounded-full"
                        style={{
                          color: "white",
                          backgroundColor: "#cca300",
                        }}
                      >
                        {" "}
                        Open{" "}
                      </span>
                    </DataTableCell>
                    <DataTableCell>{row.id}</DataTableCell>
                    <DataTableCell>{row.discount_name}</DataTableCell>
                    <DataTableCell>{row.dateadded}</DataTableCell>
                    <DataTableCell>
                      <div className="flex items-center">
                        <Link
                          to="/admin/ticketing/view-ticket"
                          style={{ marginRight: "10px" }}
                        >
                          <FaEye className="text-lg" />
                        </Link>
                        <button
                          onClick={() => {
                            setOpenTriageModal(true);
                          }}
                        >
                          <TbCheckupList className="text-lg" />
                        </button>
                      </div>
                    </DataTableCell>
                  </DataTableRow>
                </>
              ))}

              {/* 👇 HARDCODED VERSION 👇 */}
              {/* <DataTableRow key={0}>
                <DataTableCell>
                  <span
                    className="px-2 py-1 text-xs rounded-full"
                    style={{
                      color: "white",
                      backgroundColor: "#cca300",
                    }}
                  >
                    {" "}
                    Open{" "}
                  </span>
                </DataTableCell>
                <DataTableCell>159</DataTableCell>
                <DataTableCell>My PC Isn't Working</DataTableCell>
                <DataTableCell>February 13, 2024</DataTableCell>
                <DataTableCell>
                  <div className="flex items-center">
                    <Link
                      to="/admin/ticketing/view-ticket"
                      style={{ marginRight: "10px" }}
                    >
                      <FaEye className="text-lg" />
                    </Link>
                    <button
                      onClick={() => {
                        setOpenTriageModal(true);
                      }}
                    >
                      <TbCheckupList className="text-lg" />
                    </button>
                  </div>
                </DataTableCell>
              </DataTableRow> */}
            </DataTable>
          </div>
        </>
      ) : null}

      <TicketingTriageModal
        open={openTriageModal}
        onClose={() => setOpenTriageModal(false)}
      />
    </>
  );
}
