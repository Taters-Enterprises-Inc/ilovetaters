import {
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Box,
  Button,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import { MdPending } from "react-icons/md";
import { GoPencil } from "react-icons/go";
import { TbProgressAlert } from "react-icons/tb";

export function SalesTaskListTC() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="w-full">
      <div className="flex flex-col space-y-5">
        <div className="hidden md:block">
          <div className="flex flex-col border border-gray-200 rounded-md shadow-sm bg-white p-5 space-y-3 w-full md:w-3/3">
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableBody>
                <TableRow
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    "&:hover": { backgroundColor: "#f5f5f5" },
                  }}
                  onClick={() => {
                    console.log("hello world");
                  }}
                  className="w-full"
                >
                  <TableCell component="th" scope="row" width={40}>
                    <TbProgressAlert size={25} />
                  </TableCell>
                  <TableCell width={100} sx={{ fontSize: 14 }}>
                    #09123456789
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, fontSize: 14 }} width={400}>
                    Taters Waltermart Makati
                  </TableCell>
                  <TableCell sx={{ fontSize: 14 }} width={150}>
                    2023-11-17
                  </TableCell>
                  <TableCell sx={{ fontSize: 14 }} width={80}>
                    AM
                  </TableCell>
                  <TableCell sx={{ fontSize: 14 }} width={150}>
                    Test Name
                  </TableCell>
                  <TableCell align="right">
                    <Typography fontSize={14}>
                      <Box
                        sx={{ fontWeight: 600 }}
                        className="border-2 border-none"
                      >
                        <span className="bg-amber-300 px-2 py-0.5 rounded text-amber-600">
                          Pending
                        </span>
                      </Box>
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    "&:hover": { backgroundColor: "#f5f5f5" },
                  }}
                  onClick={() => {
                    console.log("hello world");
                  }}
                  className="w-full"
                >
                  <TableCell component="th" scope="row" width={40}>
                    <TbProgressAlert size={25} />
                  </TableCell>
                  <TableCell width={100} sx={{ fontSize: 14 }}>
                    #0912345
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, fontSize: 14 }} width={400}>
                    Taters Trinoma
                  </TableCell>
                  <TableCell sx={{ fontSize: 14 }} width={150}>
                    2023-11-17
                  </TableCell>
                  <TableCell sx={{ fontSize: 14 }} width={80}>
                    AM
                  </TableCell>
                  <TableCell sx={{ fontSize: 14 }} width={150}>
                    Test Name
                  </TableCell>
                  <TableCell align="right">
                    <Typography fontSize={14}>
                      <Box
                        sx={{ fontWeight: 600 }}
                        className="border-2 border-none"
                      >
                        <span className="bg-amber-300 px-2 py-0.5 rounded text-amber-600">
                          Pending
                        </span>
                      </Box>
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>

        <div className="block md:hidden">
          <div className="flex flex-col border border-gray-200 rounded-md shadow-sm bg-white w-full">
            <div className="flex flex-col my-2 p-2 font-['Roboto']">
              <List>
                <ListItem>
                  <div className="w-full">
                    <div className="flex justify-between">
                      <span className="text-left bg-neutral-200 px-2 py-0.5 rounded">
                        123456
                      </span>
                      <span className="text-end bg-amber-300 px-2 py-0.5 rounded text-amber-600">
                        Pending
                      </span>
                    </div>
                    <div className="pt-2 font-semibold">
                      <span>Taters Waltermart Makati</span>
                    </div>
                    <div className="py-px">
                      <span>2023-11-17 - AM</span>
                    </div>
                    <div className="py-px">
                      <span>Test Name</span>
                    </div>
                  </div>
                </ListItem>
                <Divider sx={{ marginY: 1 }} />
                <ListItem>
                  <div className="w-full">
                    <div className="flex justify-between">
                      <span className="text-left bg-neutral-200 px-2 py-0.5 rounded">
                        123456
                      </span>
                      <span className="text-end bg-amber-300 px-2 py-0.5 rounded text-amber-600">
                        Pending
                      </span>
                    </div>
                    <div className="pt-2 font-semibold">
                      <span>Taters Trinoma</span>
                    </div>
                    <div className="py-px">
                      <span>2023-11-17 - AM</span>
                    </div>
                    <div className="py-px">
                      <span>Test Name</span>
                    </div>
                  </div>
                </ListItem>
              </List>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
