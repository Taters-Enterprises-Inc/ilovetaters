import {
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { IoMdClose } from "react-icons/io";
import Grid from "@mui/material/Grid";
import { SiGmail } from "react-icons/si";
import { AiFillPhone } from "react-icons/ai";

interface AdminForgotPasswordModalProps {
  open: boolean;
  onClose: () => void;
}

export function AdminForgotPasswordModal(props: AdminForgotPasswordModalProps) {
  if (props.open) {
    document.body.classList.add("overflow-hidden");
  } else {
    document.body.classList.remove("overflow-hidden");
    return null;
  }

  return (
    <div className="fixed inset-0 z-30 bg-black bg-opacity-30 backdrop-blur-sm overflow-auto flex items-start justify-center">
      <div className="w-2/3 md:w-2/6 my-5 rounded-[10px]">
        <div className="bg-secondary rounded-t-[10px] flex items-center justify-between p-4">
          <span className="font-semibold text-lg text-white">
            Forgot Password?
          </span>
          <IoMdClose
            color="white"
            size={25}
            onClick={() => {
              document.body.classList.remove("overflow-hidden");
              props.onClose();
            }}
          />
        </div>

        <div className="p-4 bg-white border-b-2 border-l-2 border-r-2 border-secondary overflow-auto">
          <div>
            <span>MIS Department</span>
            <List dense disablePadding>
              <ListItem>
                <ListItemIcon>
                  <SiGmail />
                </ListItemIcon>
                <ListItemText primary="Email" secondary="tei.mis@gmail.com" />
              </ListItem>
            </List>
          </div>
          <div>
            <span>Ken Harvey Oresca</span>
            <List dense disablePadding>
              <ListItem>
                <ListItemIcon>
                  <SiGmail />
                </ListItemIcon>
                <ListItemText
                  primary="Email"
                  secondary="ken.oresca.tei@gmail.com"
                />
              </ListItem>
            </List>
          </div>
          <div>
            <span>Michael Ryan Aquino</span>
            <List dense disablePadding>
              <ListItem>
                <ListItemIcon>
                  <SiGmail />
                </ListItemIcon>
                <ListItemText
                  primary="Email"
                  secondary="michael.aquino.tei@gmail.com"
                />
              </ListItem>
            </List>
          </div>
        </div>
      </div>
    </div>
  );
}
