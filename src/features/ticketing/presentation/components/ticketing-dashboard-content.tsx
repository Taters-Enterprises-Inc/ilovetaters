import {
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { Link } from "react-router-dom";

export function TicketingDashboardContents() {
  return (
    <>
      <div className="flex flex-col space-y-5">
        <div>
          <span className="text-secondary text-3xl font-['Bebas_Neue'] flex-1">
            Dashboard
          </span>
        </div>

        <div className="rounded-lg">
          <div className="flex flex-col border border-gray-200 rounded-md shadow-sm bg-white p-5 space-y-3 w-full md:w-3/3">
            <span className="text-secondary text-3xl font-['Bebas_Neue'] flex">
              All Tickets
            </span>
            <Divider />

            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>Ticket#</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Title</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* Row 1 */}
                <TableRow
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                  className="w-full"
                >
                  <TableCell sx={{ fontSize: 14 }}>1</TableCell>
                  <TableCell sx={{ fontSize: 14 }}>
                    My PC isn't working
                  </TableCell>

                  <TableCell sx={{ fontSize: 14 }}>
                    <Link to="/view-ticket" style={{ color: "blue" }}>
                      View
                    </Link>{" "}
                    |{" "}
                    <Link to="/triage-ticket" style={{ color: "blue" }}>
                      Triage
                    </Link>
                  </TableCell>
                </TableRow>

                {/* Row 2 */}
                <TableRow
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                  className="w-full"
                >
                  <TableCell sx={{ fontSize: 14 }}>2</TableCell>
                  <TableCell sx={{ fontSize: 14 }}>
                    My Mouse isn't working
                  </TableCell>

                  <TableCell sx={{ fontSize: 14 }}>
                    <Link to="/view-ticket" style={{ color: "blue" }}>
                      View
                    </Link>{" "}
                    |{" "}
                    <Link to="/triage-ticket" style={{ color: "blue" }}>
                      Triage
                    </Link>
                  </TableCell>
                </TableRow>

                {/* Row 3 */}
                <TableRow
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                  className="w-full"
                >
                  <TableCell sx={{ fontSize: 14 }}>3</TableCell>
                  <TableCell sx={{ fontSize: 14 }}>Taters Logo</TableCell>
                  <TableCell sx={{ fontSize: 14 }}>
                    <Link to="/view-ticket" style={{ color: "blue" }}>
                      View
                    </Link>{" "}
                    |{" "}
                    <Link to="/triage-ticket" style={{ color: "blue" }}>
                      Triage
                    </Link>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
}
