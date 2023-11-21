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
        <div className="flex flex-col border border-gray-200 rounded-md shadow-sm bg-white p-5 space-y-3 w-full md:w-3/3">
          <div className="hidden md:block">
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
                  <TableCell width={20} sx={{ fontSize: 18 }}>
                    #09123456789
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, fontSize: 18 }} width={400}>
                    Taters Waltermart Makati
                  </TableCell>
                  <TableCell sx={{ fontSize: 18 }} width={150}>
                    2023-11-17
                  </TableCell>
                  <TableCell sx={{ fontSize: 18 }} width={80}>
                    AM
                  </TableCell>
                  <TableCell sx={{ fontSize: 18 }} width={150}>
                    Test Name
                  </TableCell>
                  <TableCell align="right">
                    <Typography fontSize={18}>
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
                  <TableCell width={20} sx={{ fontSize: 18 }}>
                    #0912345
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, fontSize: 18 }} width={400}>
                    Taters Trinoma
                  </TableCell>
                  <TableCell sx={{ fontSize: 18 }} width={150}>
                    2023-11-17
                  </TableCell>
                  <TableCell sx={{ fontSize: 18 }} width={80}>
                    AM
                  </TableCell>
                  <TableCell sx={{ fontSize: 18 }} width={150}>
                    Test Name
                  </TableCell>
                  <TableCell align="right">
                    <Typography fontSize={18}>
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

          {/* <List
            sx={{
              width: "100%",
              bgcolor: "background.paper",
            }}
          >
            <>
              <ListItem className="flex space-x-5 hover:bg-neutral-100">
                <ListItemAvatar>
                  <TbProgressAlert size={40} />
                </ListItemAvatar>

                <ListItemText
                  primary={
                    <div>
                      <Box fontWeight="fontWeightBold" fontSize={"16px"}>
                        Taters Waltermart Makati
                      </Box>
                      <hr className="my-2 self-center" />
                    </div>
                  }
                  secondary={
                    <>
                      <div className="flex flex-row text-black w-1/2">
                        <Box fontSize={"14px"}>
                          <span className="font-semibold">Date: </span>
                          2023-11-17
                        </Box>
                      </div>
                      <div className="flex flex-row text-black w-1/2">
                        <Box fontSize={"14px"}>
                          <span className="font-semibold">Shift: </span>
                          AM
                        </Box>
                      </div>
                      <Box className="" fontSize={"14px"}>
                        <span className="font-semibold">Cashier Name: </span>
                        Test Name
                      </Box>
                    </>
                  }
                />
                <Box className="flex flex-col">
                  <Typography className="text-center pb-6" fontSize={14}>
                    <Box
                      sx={{ fontWeight: 600 }}
                      className="border-2 rounded-full bg-amber-500  py-0.5"
                    >
                      PENDING
                    </Box>
                  </Typography>

                  <Button
                    variant="contained"
                    startIcon={<GoPencil />}
                    onClick={() => handleOpen()}
                    className="flex flex-row"
                  >
                    <Box sx={{ display: { xs: "none", md: "block" } }}>
                      Update
                    </Box>
                  </Button>
                </Box>
              </ListItem>
            </>
          </List> */}
        </div>
      </div>
    </div>
  );
}
