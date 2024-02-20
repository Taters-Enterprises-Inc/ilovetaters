// This code referenced from admin-user-discounts.tsx
import { DataList, DataTable } from "features/shared/presentation/components";
import {
  Column,
  DataTableCell,
  DataTableRow,
} from "features/shared/presentation/components/data-table";
import { ChangeEvent } from "react";
import { FaEye } from "react-icons/fa";
import { TbCheckupList } from "react-icons/tb";
import { TicketingTriageModal } from "../modals/ticketing-triage.modal";
import React from "react";
import { Link } from "react-router-dom";

const columns: Array<Column> = [
  { id: "status", label: "Status" },
  { id: "ticketNumber", label: "Ticket Number" },
  { id: "ticketTitle", label: "Ticket Title" },
  { id: "dateCreated", label: "Date Created" },
  { id: "actions", label: "Actions" },
];

export function AllTicketsContents() {
  const [openTriageModal, setOpenTriageModal] = React.useState(false);

  return (
    <>
      <div className="flex flex-col lg:flex-row lg:items-end">
        <span className="px-4 text-secondary text-3xl font-['Bebas_Neue'] flex-1">
          All Tickets
        </span>
        {/* Add Chips Here */}
      </div>

      <>
        <div className="p-4 lg:hidden">
          <DataList
            search={""} // 👈  Edit This
            emptyMessage="No tickets yet."
            // 🔴 onSearch Not yet functional
            onSearch={function (value: string): void {
              throw new Error("Function not implemented.");
            }}
            // 🔴 onRowsPerPageChange Not yet functional
            onRowsPerPageChange={function (
              event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ): void {
              throw new Error("Function not implemented.");
            }}
            // 🔴 onPageChange Not yet functional
            onPageChange={function (
              event: ChangeEvent<unknown>,
              value: number
            ): void {
              throw new Error("Function not implemented.");
            }}
            totalRows={0} // 👈 Edit this
            perPage={0} // 👈 Edit this
            page={0} // 👈 Edit this
          >
            <hr className="mt-4" />
            <div className="flex flex-col px-4 py-2 border-b">
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
          </DataList>
        </div>
        <div className="hidden p-4 lg:block">
          <DataTable
            order={"asc" ? "asc" : "desc"} // 👈  Edit This
            orderBy={"dateCreated"} // 👈  Edit This
            emptyMessage="No tickets yet."
            search={""} // 👈  Edit This
            // 🔴 onSearch Not yet functional
            onSearch={function (value: string): void {
              throw new Error("Function not implemented.");
            }}
            // 🔴 onRequestSort Not yet functional
            onRequestSort={function (property: string): void {
              throw new Error("Function not implemented.");
            }}
            columns={columns}
            // 🔴 onRowsPerPageChange Not yet functional
            onRowsPerPageChange={function (
              event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ): void {
              throw new Error("Function not implemented.");
            }}
            // 🔴 onPageChange Not yet functional
            onPageChange={function (
              event: ChangeEvent<unknown>,
              value: number
            ): void {
              throw new Error("Function not implemented.");
            }}
            totalRows={0} // 👈 Edit this
            perPage={0} // 👈 Edit this
            page={0} // 👈 Edit this
          >
            <DataTableRow key={0}>
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
            </DataTableRow>
          </DataTable>
        </div>
      </>

      <TicketingTriageModal
        open={openTriageModal}
        onClose={() => setOpenTriageModal(false)}
      />
    </>
  );
}
