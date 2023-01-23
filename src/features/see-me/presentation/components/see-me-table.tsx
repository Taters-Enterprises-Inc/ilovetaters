import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

function createData(
  franchiseType: string,
  store: string,
  kiosk: string,
  area: string,
  international: string
) {
  return { franchiseType, store, kiosk, area, international };
}

const rows = [
  createData(
    "Initial Fee",
    "PHP 500,000.00",
    "PHP 300,000.00",
    "PHP 900,000.00",
    "USD 60,000.00"
  ),
  createData("Initial Term", "5 years", "3 years", "3 years", "15 years"),
  createData("Renewal Term", "5 years", "3 years", "3 years", "Not Applicable"),
  createData("Renewal Fee", "60%", "60%", "60%", "Not Applicable"),
  createData(
    "Bond",
    "PHP 100,000.00",
    "PHP 50,000.00",
    "Not Applicable",
    "Not Applicable"
  ),
  createData("Royalty", "5%", "5%", "5%", "3% of gross sales"),
  createData(
    "Advertising",
    `
  LSM 1%
  SHARED ADS 2%`,
    `LSM 1%
  SHARED ADS 2%`,
    "Not Applicable",
    "Not Applicable"
  ),
  createData(
    "Upgrade Fee if Store Facility",
    "Not Applicable",
    "Not Applicable",
    "PHP 150,000.00",
    "Not Applicable"
  ),
  createData(
    "Master Franchise",
    "Not Applicable",
    "Not Applicable",
    "Not Applicable",
    `For the award of the rights
  to an entire country`
  ),
  createData(
    "Territory Development",
    "Not Applicable",
    "Not Applicable",
    "Not Applicable",
    `For USA, Canada, Australia
  where we award
  Territory Development`
  ),
  createData(
    "Inclusions",
    `
  - Use of Trademark
  - Site Approval
  - Training for franchise and staff
  - Procurement Program
  - Opening Assistance
  - Operations manual on loan
    `,
    `
  - Use of Trademark
  - Site Approval
  - Training for franchise and staff
  - Procurement Program
  - Opening Assistance
  - Operations manual on loan
    `,
    `- Use of Trademark
  - Site Approval
  - Training for franchise and staff
  - Procurement Program
  - Opening Assistance
  - Operations manual on loan
  `,
    "Not Applicable"
  ),
];

export default function SeeMeTable() {
  return (
    <TableContainer component={Paper}>
      <Table
        sx={{ minWidth: 650, backgroundColor: "#22201A" }}
        aria-label="simple table"
      >
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}></TableCell>
            <TableCell
              sx={{ color: "white", fontWeight: "bold", fontSize: 25 }}
              align="left"
            >
              Store
            </TableCell>
            <TableCell
              sx={{ color: "white", fontWeight: "bold", fontSize: 25 }}
              align="left"
            >
              Kiosk
            </TableCell>
            <TableCell
              sx={{ color: "white", fontWeight: "bold", fontSize: 25 }}
              align="left"
            >
              Area
            </TableCell>
            <TableCell
              sx={{ color: "white", fontWeight: "bold", fontSize: 25 }}
              align="left"
            >
              International
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.franchiseType}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell
                sx={{ color: "white", whiteSpace: "pre", fontWeight: "bold" }}
                component="th"
                scope="row"
              >
                {row.franchiseType}
              </TableCell>
              <TableCell
                sx={{ color: "white", whiteSpace: "pre" }}
                align="left"
              >
                {row.store}
              </TableCell>
              <TableCell
                sx={{ color: "white", whiteSpace: "pre" }}
                align="left"
              >
                {row.kiosk}
              </TableCell>
              <TableCell
                sx={{ color: "white", whiteSpace: "pre" }}
                align="left"
              >
                {row.area}
              </TableCell>
              <TableCell
                sx={{ color: "white", whiteSpace: "pre" }}
                align="left"
              >
                {row.international}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
