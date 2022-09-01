import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { FiMoreHorizontal } from "react-icons/fi";
import {
  RiAccountBoxFill,
  RiContactsBookLine,
  RiFilePaper2Fill,
} from "react-icons/ri";
import { MdSell, MdStore } from "react-icons/md";
import { AiOutlineFileSearch } from "react-icons/ai";
import { Link } from "react-router-dom";

type Anchor = "left";

export default function MoreDrawer() {
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const list = (anchor: Anchor) => (
    <Box
      className="h-full bg-secondary"
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List className="text-white">
        {[
          {
            text: "My Account",
            icon: <RiAccountBoxFill className="text-white" />,
            path: "shop/profile",
          },
          { text: "Franchising", icon: <MdStore className="text-white" /> },
          {
            text: "Reseller Program",
            icon: <MdSell className="text-white" />,
            path: "/reseller",
          },
          {
            text: "Explore Menu",
            icon: <AiOutlineFileSearch className="text-white" />,
            path: "/",
          },
          {
            text: "Contact Us",
            icon: <RiContactsBookLine className="text-white" />,
            path: "/branches",
          },
          {
            text: "Terms & Conditions",
            icon: <RiFilePaper2Fill className="text-white" />,
            path: "/shop/terms-and-conditions",
          },
        ].map((item, index) => {
          const { text, icon, path } = item;
          return (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                {path && (
                  <Link to={path}>
                    {icon && (
                      <ListItemIcon className="text-[25px] sm:text-4xl">
                        {icon}
                      </ListItemIcon>
                    )}
                    <ListItemText primary={text} />
                  </Link>
                )}
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );

  return (
    <div>
      {(["left"] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <Button
            className="flex flex-col items-center justify-center h-full pt-1 pr-2"
            onClick={toggleDrawer(anchor, true)}
          >
            <FiMoreHorizontal className="text-[25px] sm:text-4xl text-white"></FiMoreHorizontal>
            <span className="text-[8px] sm:text-[14px] pt-[2px] text-white">
              More
            </span>
          </Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
