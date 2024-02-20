import { BadgeProps, Tab, Tabs, styled, Badge } from "@mui/material";
import { createQueryParams } from "features/config/helpers";
import { useQuery } from "features/config/hooks";
import { TabPanel } from "features/sales/presentation/components/sales-utils";
import { TICKETING_TAB_NAVIGATION } from "features/shared/constants";
import { DataList } from "features/shared/presentation/components";
import {
  Column,
  DataTable,
  DataTableCell,
  DataTableRow,
} from "features/shared/presentation/components/data-table";
import { ChangeEvent, useEffect } from "react";
import { FaEye } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const StyledBadge = styled(Badge)<BadgeProps>(() => ({
  "& .MuiBadge-badge": {
    right: 3,
    top: -13,
    border: `2px solid #ffcd17`,
    backgroundColor: "#ffcd17",
    padding: "0 4px",
  },
}));

export function MyTicketContents() {
  const navigate = useNavigate();

  const query = useQuery();
  const pageNo = query.get("page_no");
  const perPage = query.get("per_page");
  const orderBy = query.get("order_by");
  const order = query.get("order");

  const search = query.get("search");
  const tabValue = query.get("tab");

  const columns: Array<Column> = [
    { id: "ticketNumber", label: "Ticket Number" },
    { id: "ticketTitle", label: "Ticket Title" },
    { id: "dateCreated", label: "Date Created" },
    { id: "actions", label: "Actions" },
  ];

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    const params = {
      page_no: null,
      per_page: perPage,
      order_by: orderBy,
      order: order,
      search: search,
      tab: newValue,
    };
    const queryParams = createQueryParams(params);
    navigate({
      pathname: "",
      search: queryParams,
    });
  };

  useEffect(() => {
    const query = createQueryParams({
      page_no: pageNo,
      per_page: perPage,
      order_by: orderBy,
      order: order,
      search: search,
      tab: tabValue,
    });
  });

  return (
    <>
      <div className="space-y-3">
        <div>
          <span className="text-secondary text-3xl font-['Bebas_Neue'] flex-1">
            My Tickets
            {" > " + TICKETING_TAB_NAVIGATION[Number(tabValue)].label2}
          </span>
        </div>

        <div className="bg-paper border-2 border-t-8 rounded-t-lg border-secondary">
          <Tabs
            className="bg-secondary text-white"
            value={Number(tabValue)} // Di ko pa alam ginagawa neto haha.
            onChange={handleTabChange}
            scrollButtons="auto"
            allowScrollButtonsMobile
            variant="scrollable"
            TabIndicatorProps={{
              style: {
                backgroundColor: "black",
              },
            }}
          >
            {TICKETING_TAB_NAVIGATION.map((tabs, index) => (
              // Edit the SytledBadge component
              <Tab
                className="hidden"
                key={index}
                sx={{
                  backgroundColor: "#a21013",
                  borderTopRightRadius: 5,
                  borderTopLeftRadius: 5,
                  borderLeft: 1,
                  borderRight: 1,
                  paddingY: 3,
                }}
                label={
                  <StyledBadge max={99}>
                    <div className="flex flex-col text-white">
                      <span className="text-md">{tabs.label}</span>
                    </div>
                  </StyledBadge>
                }
              />
            ))}
          </Tabs>

          <TabPanel value={Number(tabValue)} index={Number(tabValue)}>
            <div className="hidden md:block space-y-3">
              <DataTable
                order={order === "asc" ? "asc" : "desc"}
                orderBy={orderBy ?? "dateCreated"}
                search={search ?? ""}
                emptyMessage={`No ${
                  TICKETING_TAB_NAVIGATION[Number(tabValue)].label2
                } yet.`}
                // 🔴 onSearch not yet functional
                onSearch={function (value: string): void {
                  throw new Error("Function not implemented.");
                }}
                // 🔴 onRequestSort not yet functional
                onRequestSort={function (property: string): void {
                  throw new Error("Function not implemented.");
                }}
                columns={columns}
                // 🔴 onRowsPerPageChange not yet functional
                onRowsPerPageChange={function (
                  event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
                ): void {
                  throw new Error("Function not implemented.");
                }}
                // 🔴 onPageChange not yet functional
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
                  <DataTableCell>159</DataTableCell>
                  <DataTableCell>My PC Isn't Working</DataTableCell>
                  <DataTableCell>February 13, 2024</DataTableCell>
                  <DataTableCell>
                    <Link
                      to="/admin/ticketing/view-ticket"
                      style={{ marginRight: "10px" }}
                    >
                      <FaEye className="text-lg" />
                    </Link>
                  </DataTableCell>
                </DataTableRow>
              </DataTable>
            </div>

            <div className="block md:hidden space-y-5">
              <DataList
                search={search ?? ""}
                emptyMessage={`No ${
                  TICKETING_TAB_NAVIGATION[Number(tabValue)].label2
                } yet.`}
                // 🔴 onSearch not yet functional
                onSearch={function (value: string): void {
                  throw new Error("Function not implemented.");
                }}
                // 🔴 onRowsPerPageChange not yet functional
                onRowsPerPageChange={function (
                  event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
                ): void {
                  throw new Error("Function not implemented.");
                }}
                // 🔴 onPageChange not yet functional
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
                <div className="space-y-2 mt-2">
                  <div
                    onClick={() => {
                      alert("Button Not Yet Working");
                    }}
                    className="flex flex-col border border-gray-200 rounded-md shadow-sm p-2 bg-white"
                  >
                    <div className="flex justify-between text-normal">
                      <span className="normal-case">My PC Isn't Working</span>
                      <span>#159</span>
                    </div>
                    <div className="text-xs capitalize space-x-1">
                      <span>Date Created:</span>
                      <span>February 13, 2024</span>
                    </div>
                  </div>
                </div>
              </DataList>
            </div>
          </TabPanel>
        </div>
      </div>
    </>
  );
}
