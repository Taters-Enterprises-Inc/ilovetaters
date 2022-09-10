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
import { useAppSelector } from "features/config/hooks";
import {
  getSession,
  selectGetSession,
} from "features/shared/presentation/slices/get-session.slice";

type Anchor = "left";

export default function MoreDrawer() {
  const [state, setState] = React.useState({
    left: false,
  });

  const getSessionState = useAppSelector(selectGetSession);

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
            path: "/shop/profile",
          },
          {
            text: "Franchising",
            icon: <MdStore className="text-white" />,
            path: "/franchising",
          },
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
            <div
              className={`${
                getSessionState.data?.userData === null
                  ? text === "My Account"
                    ? "hidden"
                    : null
                  : null
              }`}
            >
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  {icon && (
                    <Link to={path}>
                      <ListItemIcon className="text-[25px] sm:text-4xl">
                        {icon}
                        <ListItemText
                          className="ml-3 text-white"
                          primary={text}
                        />
                      </ListItemIcon>
                    </Link>
                  )}
                </ListItemButton>
              </ListItem>
            </div>
          );
        })}
      </List>
    </Box>
  );

  return (
    <div className="flex justify-center items-center pr-[8px] sm:pt-[4px]">
      {(["left"] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <button
            className="flex flex-col items-center justify-center mt-[8px] sm:mt-[0px]"
            onClick={
              state[anchor]
                ? toggleDrawer(anchor, false)
                : toggleDrawer(anchor, true)
            }
          >
            <FiMoreHorizontal className="text-[25px] sm:text-4xl text-white"></FiMoreHorizontal>
            <span className="text-[8px] sm:text-[14px] text-white capitalize">
              More
            </span>
          </button>
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
