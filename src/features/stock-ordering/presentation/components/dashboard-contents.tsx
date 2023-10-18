import React from "react";
import { Avatar, Badge, Box, Button, Divider, List, ListItem, ListItemAvatar, ListItemText, Modal, Typography } from "@mui/material";
import { GoAlertFill, GoCheckCircle, GoPencil} from "react-icons/go";

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #d6d6d6',
  p: 4,
};

export function DashboardContents() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
                Tasks
              </span>
              <hr/>
              <List
                sx={{
                    width: '100%',
                    bgcolor: 'background.paper',
                }}>
                    <ListItem className="flex space-x-5 hover:bg-zinc-200">
                    <Badge badgeContent={3} color="primary"
                     anchorOrigin={{ vertical: 'top', horizontal: 'left',}} 
                      sx={{ display: { xs: 'none', md: 'block' }}}>
                    <ListItemAvatar>
                      <GoAlertFill size={40}/>
                    </ListItemAvatar>
                    </Badge>
                    <ListItemText primary={<div><Box fontWeight="fontWeightBold">Taters Market Market</Box><Box fontSize={"14px"}>Last Updated: October 6, 2023</Box></div>} 
                    secondary={<div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, consectetur fugit at quia minima animi distinctio assumenda.</div>} />
                    <Box>
                      <Button variant="contained" startIcon={<GoPencil />} onClick={handleOpen}>
                      <Box sx={{ display: { xs: 'none', md: 'block' }}}>Update</Box>
                      </Button>
                    </Box>
                    <Modal
                      open={open}
                      onClose={handleClose}
                    >
                      <Box sx={style}>
                        <Typography className="text-center py-3">Update the following task?</Typography>
                        <Box className="flex justify-center space-x-4">
                          <Button variant="contained" onClick={handleClose}>Cancel</Button>
                          <Button variant="contained">Update</Button>
                        </Box>
                      </Box>
                    </Modal>
                </ListItem>

                <Divider variant="inset" component="li" />
                
                <ListItem className="flex space-x-5 hover:bg-zinc-200">
                    <Badge badgeContent={3} color="primary"
                     anchorOrigin={{ vertical: 'top', horizontal: 'left',}} 
                      sx={{ display: { xs: 'none', md: 'block' }}}>
                    <ListItemAvatar>
                      <GoAlertFill size={40}/>
                    </ListItemAvatar>
                    </Badge>
                    <ListItemText primary={<div><Box fontWeight="fontWeightBold">Taters Trinoma</Box><Box fontSize={"14px"}>Last Updated: October 6, 2023</Box></div>} 
                    secondary={<div className="text-justify"><Box>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, consectetur fugit at quia minima animi distinctio assumenda.</Box></div>} />
                    <Box>
                      <Button variant="contained" startIcon={<GoPencil />} onClick={handleOpen}>
                      <Box sx={{ display: { xs: 'none', md: 'block' }}}>Update</Box>
                      </Button>
                    </Box>
                    <Modal
                      open={open}
                      onClose={handleClose}
                    >
                      <Box sx={style}>
                        <Typography className="text-center py-3">Update the following task?</Typography>
                        <Box className="flex justify-center space-x-4">
                          <Button variant="contained" onClick={handleClose}>Cancel</Button>
                          <Button variant="contained">Update</Button>
                        </Box>
                      </Box>
                    </Modal>
                </ListItem>
                

                <Divider variant="inset" component="li" />

                <ListItem className="flex space-x-5 hover:bg-zinc-200">
                    <Badge badgeContent={3} color="primary"
                     anchorOrigin={{ vertical: 'top', horizontal: 'left',}} 
                      sx={{ display: { xs: 'none', md: 'block' }}}>
                    <ListItemAvatar>
                      <GoAlertFill size={40}/>
                    </ListItemAvatar>
                    </Badge>
                    <ListItemText primary={<div><Box fontWeight="fontWeightBold">Taters SM North Edsa</Box><Box fontSize={"14px"}>Last Updated: October 6, 2023</Box></div>} 
                    secondary={<div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, consectetur fugit at quia minima animi distinctio assumenda.</div>} />
                    <Box>
                      <Button variant="contained" startIcon={<GoPencil />} onClick={handleOpen}>
                      <Box sx={{ display: { xs: 'none', md: 'block' }}}>Update</Box>
                      </Button>
                    </Box>
                    <Modal
                      open={open}
                      onClose={handleClose}
                    >
                      <Box sx={style}>
                        <Typography className="text-center py-3">Update the following task?</Typography>
                        <Box className="flex justify-center space-x-4">
                          <Button variant="contained" onClick={handleClose}>Cancel</Button>
                          <Button variant="contained">Update</Button>
                        </Box>
                      </Box>
                    </Modal>
                </ListItem>

                </List>
            </div>
          </div>
        </div>
        
    </>
  );
}
