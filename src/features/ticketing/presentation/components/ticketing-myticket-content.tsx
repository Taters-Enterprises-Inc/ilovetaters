import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { createQueryParams } from "features/config/helpers";
import { DataList } from "features/shared/presentation/components";
import { AdminChipsButton } from "features/admin/presentation/components/chips-button";
import { TICKET_STATUS } from "features/shared/constants";
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
} from "features/shared/presentation/components/data-table";
import {
  getMyTickets,
  resetGetMyTicketsStatus,
  selectGetMyTickets,
} from "../slices/get-my-tickets.slice";

// Table Columns
const columns: Array<Column> = [
  { id: "status", label: "Status" },
  { id: "id", label: "Ticket Number" },
  { id: "ticket_title", label: "Ticket Title" },
  { id: "dateCreated", label: "Date Created" },
  { id: "actions", label: "Actions" },
];

export function MyTicketContents() {
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

  const getMyTicketStates = useAppSelector(selectGetMyTickets);

  useEffect(() => {
    const query = createQueryParams({
      page_no: pageNo,
      per_page: perPage,
      status: status,
      order_by: orderBy,
      order: order,
      search: search,
    });
    dispatch(getMyTickets(query));
  }, [dispatch, pageNo, status, perPage, orderBy, order, search]);

  return (
    <>
      <div className="flex flex-col lg:flex-row lg:items-end">
        <span className="px-4 text-secondary text-3xl font-['Bebas_Neue'] flex-1">
          My Tickets: MANAGEMENT INFORMATION SYSTEM DEPARTMENT
        </span>
        <AdminChipsButton
          createQueryParams={createQueryParams}
          data={TICKET_STATUS}
          dispatchAction={() => {
            dispatch(resetGetMyTicketsStatus());
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

      {getMyTicketStates.data?.tickets ? (
        <>
          {/* Mobile View */}
          <div className="p-4 lg:hidden">
            <DataList
              search={search ?? ""}
              emptyMessage="No tickets yet."
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
              onRowsPerPageChange={(event) => {
                if (perPage !== event.target.value) {
                  const params = {
                    page_no: pageNo,
                    per_page: event.target.value,
                    status: status,
                    search: search,
                  };

                  const queryParams = createQueryParams(params);

                  dispatch(resetGetMyTicketsStatus());
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
                    status: status,
                    search: search,
                  };

                  const queryParams = createQueryParams(params);

                  dispatch(resetGetMyTicketsStatus());
                  navigate({
                    pathname: "",
                    search: queryParams,
                  });
                }
              }}
              totalRows={getMyTicketStates.data.pagination.total_rows}
              perPage={getMyTicketStates.data.pagination.per_page}
              page={pageNo ? parseInt(pageNo) : 1}
            >
              <hr className="mt-4" />

              {getMyTicketStates.data.tickets.map((row, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center px-4 py-2 border-b"
                >
                  <div className="flex flex-col">
                    <span className="flex flex-wrap items-center space-x-1 text-xl">
                      <span>{row.ticket_title}</span>
                      <span
                        className="px-2 py-1 text-xs rounded-full"
                        style={{
                          color: "white",
                          backgroundColor: TICKET_STATUS[row.status].color,
                        }}
                      >
                        {TICKET_STATUS[row.status].name}
                      </span>
                    </span>
                    <span className="text-xs text-gray-600">
                      <strong>Ticket Number:</strong> {row.id}
                    </span>
                    <span className="text-xs text-gray-600">
                      <strong>Date Created:</strong> No data on db yet.
                    </span>
                  </div>
                  {/* 👇 EDIT THIS 👇 */}
                  <div className="flex items-center">
                    <Link
                      to="/admin/ticketing/view-ticket"
                      style={{ marginRight: "10px" }}
                    >
                      <FaEye className="text-lg" />
                    </Link>
                  </div>
                </div>
              ))}
            </DataList>
          </div>

          {/* Desktop View */}
          <div className="hidden p-4 lg:block">
            <DataTable
              order={order === "asc" ? "asc" : "desc"}
              orderBy={orderBy ?? "id"}
              emptyMessage="No tickets yet."
              search={search ?? ""}
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
              onRequestSort={(column_selected) => {
                if (column_selected !== "actions") {
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

                  dispatch(resetGetMyTicketsStatus());
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
                    status: status,
                    order_by: orderBy,
                    order: order,
                    search: search,
                  };

                  const queryParams = createQueryParams(params);

                  dispatch(resetGetMyTicketsStatus());
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
                    status: status,
                    order_by: orderBy,
                    order: order,
                    search: search,
                  };

                  const queryParams = createQueryParams(params);

                  dispatch(resetGetMyTicketsStatus());
                  navigate({
                    pathname: "",
                    search: queryParams,
                  });
                }
              }}
              totalRows={getMyTicketStates.data.pagination.total_rows}
              perPage={getMyTicketStates.data.pagination.per_page}
              page={pageNo ? parseInt(pageNo) : 1}
            >
              {getMyTicketStates.data.tickets.map((row, i) => (
                <>
                  <DataTableRow key={i}>
                    <DataTableCell>
                      <span
                        className="px-2 py-1 text-xs rounded-full"
                        style={{
                          color: "white",
                          backgroundColor: TICKET_STATUS[row.status].color,
                        }}
                      >
                        {TICKET_STATUS[row.status].name}
                      </span>
                    </DataTableCell>
                    <DataTableCell>{row.id}</DataTableCell>
                    <DataTableCell>{row.ticket_title}</DataTableCell>
                    <DataTableCell>No data on db yet.</DataTableCell>
                    <DataTableCell>
                      {/* 👇 EDIT THIS 👇 */}
                      <div className="flex items-center">
                        <Link
                          to="/admin/ticketing/view-ticket"
                          style={{ marginRight: "10px" }}
                        >
                          <FaEye className="text-lg" />
                        </Link>
                      </div>
                    </DataTableCell>
                  </DataTableRow>
                </>
              ))}
            </DataTable>
          </div>
        </>
      ) : null}
    </>
  );
}
