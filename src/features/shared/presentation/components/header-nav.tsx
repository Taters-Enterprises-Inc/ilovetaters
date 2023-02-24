import Box from "@mui/material/Box";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Popover from "@mui/material/Popover";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import { CateringCartModal } from "features/catering/presentation/components/catering-cart.modal";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { PlatformChooserModal } from "features/popclub/presentation/modals/platform-chooser.modal";
import { StoreVisitStoreChooserModal } from "features/popclub/presentation/modals/store-visit-store-chooser.modal";
import { PROFILE_MENU, TABS } from "features/shared/constants";
import {
  facebookLogout,
  FacebookLogoutState,
  selectFacebookLogout,
} from "features/shared/presentation/slices/facebook-logout.slice";
import {
  getSession,
  selectGetSession,
} from "features/shared/presentation/slices/get-session.slice";
import { useEffect, useRef, useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import { BsCart4 } from "react-icons/bs";
import { FaUserAlt, FaUserCircle } from "react-icons/fa";
import { MdLocationPin } from "react-icons/md";
import { VscCircleFilled } from "react-icons/vsc";
import NumberFormat from "react-number-format";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ShopCartModal } from "../../../shop/presentation/modals";
import {
  getNotifications,
  selectGetNotifications,
} from "../slices/get-notifications.slice";
import {
  SeenNotificationState,
  selectSeenNotification,
} from "../slices/seen-notification.slice";
import { CartListItem } from "./cart-item-list";
import { SnacksDeliveredStoreChooserModal } from "features/popclub/presentation/modals/snacks-delivered-store-chooser.modal";
import { openLoginChooserModal } from "../slices/login-chooser-modal.slice";

import {
  closeMessageModal,
  openMessageModal,
} from "features/shared/presentation/slices/message-modal.slice";

export type ActiveUrl =
  | "PROFILE"
  | "SNACKSHOP"
  | "CATERING"
  | "POPCLUB"
  | "HOME"
  | "BRANCHES"
  | "FRANCHISING"
  | "SEE_ME";

interface HeaderNavProps {
  className?: string;
  homePageUrl: string;
  activeUrl: ActiveUrl;
  logoProps: {
    src: string;
    alt: string;
    className: string;
  };
}

export function HeaderNav(props: HeaderNavProps) {
  const [openShopCartModal, setOpenShopCartModal] = useState(false);
  const [openCateringCartModal, setOpenCateringCartModal] = useState(false);
  const [openProfileMenu, setOpenProfileMenu] = useState<null | HTMLElement>(
    null
  );
  const [openCartMenu, setOpenCartMenu] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const currentLocation = useLocation();

  const getSessionState = useAppSelector(selectGetSession);
  const seenNotificationState = useAppSelector(selectSeenNotification);
  const getNotificationsState = useAppSelector(selectGetNotifications);

  const facebookLogoutState = useAppSelector(selectFacebookLogout);
  const dispatch = useAppDispatch();

  const [openPlatformChooserModal, setOpenPlatformChooserModal] =
    useState(false);
  const [openStoreChooserModal, setOpenStoreChooserModal] = useState(false);
  const [openStoreVisitStoreChooserModal, setOpenStoreVisitStoreChooserModal] =
    useState(false);

  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);

  const handleSwitchTab = (
    id:
      | "home"
      | "popclub"
      | "snackshop"
      | "catering"
      | "branches"
      | "franchising"
  ) => {
    if (
      getSessionState.data &&
      getSessionState.data.cache_data &&
      getSessionState.data.orders &&
      getSessionState.data.customer_address
    ) {
      dispatch(
        openMessageModal({
          message: `This would remove all your cart items, store selection and send you to the ${id} home page. Are you sure you want to proceed?`,
          buttons: [
            {
              color: "#22201A",
              text: "No",
              onClick: () => {
                dispatch(closeMessageModal());
              },
            },
            {
              color: "#CC5801",
              text: "Yes",
              onClick: () => {
                switch (id) {
                  case "home":
                    navigate("/");
                    dispatch(closeMessageModal());
                    break;
                  case "popclub":
                    setOpenPlatformChooserModal(true);
                    dispatch(closeMessageModal());
                    break;
                  case "snackshop":
                    navigate("/delivery");
                    dispatch(closeMessageModal());
                    break;
                  case "catering":
                    navigate("/shop");
                    dispatch(closeMessageModal());
                    break;
                  case "branches":
                    navigate("/branches");
                    dispatch(closeMessageModal());
                    break;
                  case "franchising":
                    navigate("/franchising");
                    dispatch(closeMessageModal());
                    break;
                }
              },
            },
          ],
        })
      );
    } else {
      switch (id) {
        case "home":
          navigate("/");
          break;
        case "popclub":
          setOpenPlatformChooserModal(true);
          break;
        case "snackshop":
          navigate("/delivery");
          break;
        case "catering":
          navigate("/shop");
          break;
        case "branches":
          navigate("/branches");
          break;
        case "franchising":
          navigate("/franchising");
          break;
      }
    }
  };

  const handleProfileMenuClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setOpenProfileMenu(event.currentTarget);
  };

  useEffect(() => {
    if (facebookLogoutState.status === FacebookLogoutState.success) {
      dispatch(getSession());
    }
  }, [facebookLogoutState, dispatch]);

  useEffect(() => {
    if (seenNotificationState.status === SeenNotificationState.success) {
      dispatch(getNotifications());
    }
  }, [seenNotificationState, dispatch]);

  const handleCart = () => {
    setOpenCartMenu(null);
    switch (props.activeUrl) {
      case "SNACKSHOP":
        setOpenShopCartModal(true);
        break;
      case "POPCLUB":
        setOpenShopCartModal(true);
        break;
      case "PROFILE":
        setOpenShopCartModal(true);
        break;
      case "CATERING":
        setOpenCateringCartModal(true);
        break;
    }
  };

  const calculateCartQuantity = () => {
    let calculatedQuantity = 0;

    if (getSessionState.data?.orders) {
      calculatedQuantity += getSessionState.data.orders.length;
    }

    if (getSessionState.data?.redeem_data) {
      calculatedQuantity += 1;
    }

    return calculatedQuantity;
  };

  const calculateOrdersPrice = () => {
    let calculatedPrice = 0;
    const orders = getSessionState.data?.orders;

    if (orders) {
      for (let i = 0; i < orders.length; i++) {
        const discountPercentage = orders[i].promo_discount_percentage;
        const discount = discountPercentage
          ? orders[i].prod_calc_amount * discountPercentage
          : 0;
        calculatedPrice += orders[i].prod_calc_amount - discount;
      }
    }

    if (getSessionState.data?.redeem_data) {
      if (getSessionState.data.redeem_data.deal_promo_price)
        calculatedPrice += getSessionState.data?.redeem_data.deal_promo_price;
    }

    return (
      <NumberFormat
        value={calculatedPrice.toFixed(2)}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"₱"}
      />
    );
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  const prevOpen = useRef(open);

  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setOpenCartMenu(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setOpenCartMenu(null);
  };

  return (
    <>
      <header className={`sticky w-full top-0 z-20 ${props.className}`}>
        <div className={` w-full bg-primary shadow-2xl`}>
          <nav
            className={`flex justify-between items-center container py-2 h-[64px]`}
          >
            <Link to={props.homePageUrl}>
              <img {...props.logoProps} alt="Taters Logo" />
            </Link>

            <div className="flex items-center justify-center pt-3 space-x-4">
              <ul className="text-white font-semibold items-stretch h-[40px] justify-center hidden lg:flex">
                <li
                  className={`font-['Bebas_Neue'] tracking-[4px] px-4 pb-1 flex justify-center items-center text-lg font-light ${
                    "HOME" === props.activeUrl ? "text-tertiary" : "text-white"
                  }`}
                >
                  <div
                    className="cursor-pointer"
                    onClick={() => {
                      handleSwitchTab("home");
                    }}
                  >
                    Home
                  </div>
                </li>

                <li
                  className={`font-['Bebas_Neue'] tracking-[4px] px-4 pb-1 flex justify-center items-center text-lg font-light ${
                    "BRANCHES" === props.activeUrl
                      ? "text-tertiary"
                      : "text-white"
                  }`}
                >
                  <div
                    className="cursor-pointer"
                    onClick={() => {
                      handleSwitchTab("branches");
                    }}
                  >
                    Branches
                  </div>
                </li>

                <li className="flex items-center justify-center px-4 pb-1">
                  <button
                    ref={anchorRef}
                    aria-controls={open ? "composition-menu" : undefined}
                    aria-expanded={open ? "true" : undefined}
                    aria-haspopup="true"
                    className={`font-['Bebas_Neue'] tracking-[4px] ${
                      "HOME" !== props.activeUrl &&
                      "BRANCHES" !== props.activeUrl
                        ? "text-tertiary"
                        : "text-white"
                    } text-lg font-light`}
                    onClick={handleToggle}
                  >
                    Services
                  </button>
                  <Popper
                    open={open}
                    anchorEl={anchorRef.current}
                    role={undefined}
                    placement="bottom-start"
                    transition
                    disablePortal
                  >
                    {({ TransitionProps, placement }) => (
                      <Grow
                        {...TransitionProps}
                        style={{
                          transformOrigin:
                            placement === "bottom-start"
                              ? "left top"
                              : "left bottom",
                        }}
                      >
                        <Paper>
                          <ClickAwayListener
                            onClickAway={() => {
                              setOpen(false);
                            }}
                          >
                            <MenuList
                              autoFocusItem={open}
                              id="composition-menu"
                              aria-labelledby="composition-button"
                              onKeyDown={handleListKeyDown}
                            >
                              {TABS.map((tab, i) => {
                                return (
                                  <MenuItem
                                    key={i}
                                    onClick={() => {
                                      handleSwitchTab(tab.name);
                                    }}
                                    className="uppercase"
                                  >
                                    {tab.name}
                                  </MenuItem>
                                );
                              })}
                            </MenuList>
                          </ClickAwayListener>
                        </Paper>
                      </Grow>
                    )}
                  </Popper>
                </li>
              </ul>
              <div className="flex items-center justify-center space-x-3 lg:space-x-6">
                {getSessionState.data?.userData ? (
                  <div>
                    <button
                      aria-controls={
                        Boolean(openProfileMenu) ? "basic-menu" : undefined
                      }
                      aria-haspopup="true"
                      aria-expanded={
                        Boolean(openProfileMenu) ? "true" : undefined
                      }
                      onClick={handleProfileMenuClick}
                      className="flex flex-col items-center justify-center pb-2 space-y-1 "
                    >
                      {getSessionState.data?.userData.login_type ===
                      "mobile" ? (
                        <>
                          <span className="relative inline-block">
                            <FaUserCircle className="w-6 h-6 text-2xl text-white fill-current" />

                            {getNotificationsState.data &&
                            getNotificationsState.data.all
                              .unseen_notifications_count !== 0 ? (
                              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                                {
                                  getNotificationsState.data.all
                                    .unseen_notifications_count
                                }
                              </span>
                            ) : null}
                          </span>
                        </>
                      ) : (
                        <>
                          <span className="relative inline-block">
                            <img
                              src={getSessionState.data?.userData.picture}
                              alt="Profile pic"
                              className="rounded-full mt-[2px] w-6 h-6 fill-current"
                              width={30}
                            />
                            {getNotificationsState.data &&
                            getNotificationsState.data.all
                              .unseen_notifications_count !== 0 ? (
                              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                                {
                                  getNotificationsState.data.all
                                    .unseen_notifications_count
                                }
                              </span>
                            ) : null}
                          </span>
                        </>
                      )}
                    </button>
                    <Menu
                      anchorEl={openProfileMenu}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      open={Boolean(openProfileMenu)}
                      onClose={() => setOpenProfileMenu(null)}
                      PaperProps={{
                        style: {
                          backgroundColor: "transparent",
                          boxShadow: "none",
                          borderRadius: 0,
                        },
                      }}
                    >
                      <Box
                        sx={{
                          position: "relative",
                          mt: "10px",
                          "&::before": {
                            backgroundColor: "white",
                            content: '""',
                            display: "block",
                            position: "absolute",
                            width: 12,
                            height: 12,
                            top: -6,
                            transform: "rotate(45deg)",
                            left: "calc(96% - 6px)",
                          },
                        }}
                      />
                      <div className="bg-white">
                        <MenuItem
                          onClick={() => {
                            setOpenProfileMenu(null);
                            navigate(`/profile`);
                          }}
                          className="bg-secondary"
                        >
                          <ListItemIcon className="text-[20px] sm:text-xl">
                            <FaUserAlt />
                          </ListItemIcon>

                          <ListItemText
                            primary={
                              getSessionState.data?.userData
                                ? getSessionState.data?.userData.first_name +
                                  " " +
                                  getSessionState.data?.userData.last_name
                                : ""
                            }
                          />
                        </MenuItem>
                        <hr />
                        {PROFILE_MENU.map((menu) => (
                          <MenuItem
                            onClick={() => {
                              setOpenProfileMenu(null);
                              navigate(`/profile/${menu.urlId}`);
                            }}
                            className="bg-secondary"
                          >
                            <ListItemIcon className="text-[20px] sm:text-xl">
                              {menu.icon}
                              {(menu.urlId === "snackshop-orders" &&
                                getNotificationsState.data?.snackshop_order
                                  .unseen_notifications_count) ||
                              (menu.urlId === "inbox" &&
                                getNotificationsState.data?.inbox
                                  .unseen_notifications_count) ||
                              (menu.urlId === "catering-bookings" &&
                                getNotificationsState.data?.catering_booking
                                  .unseen_notifications_count) ||
                              (menu.urlId === "popclub-redeems" &&
                                getNotificationsState.data?.popclub_redeem
                                  .unseen_notifications_count) ? (
                                <VscCircleFilled className="text-xs text-red-600 " />
                              ) : null}
                            </ListItemIcon>

                            <ListItemText primary={menu.name} />
                          </MenuItem>
                        ))}
                        <hr />

                        <MenuItem
                          onClick={() => {
                            setOpenProfileMenu(null);

                            if (currentLocation.pathname === "/profile") {
                              dispatch(facebookLogout());
                              navigate("/");
                            } else {
                              dispatch(facebookLogout());
                            }
                          }}
                          className="bg-secondary"
                        >
                          <ListItemIcon className="text-[20px] sm:text-xl">
                            <BiLogOut />
                          </ListItemIcon>

                          <ListItemText primary="Logout" />
                        </MenuItem>
                      </div>
                    </Menu>
                  </div>
                ) : getSessionState.data?.userData === null ? (
                  <>
                    <button
                      onClick={() =>
                        dispatch(openLoginChooserModal({ required: false }))
                      }
                      className="flex flex-col items-center justify-center mt-1 mb-4 space-y-1 text-white rounded-xl"
                    >
                      <AiOutlineUser className="text-2xl" />
                      <span className="tracking-[2px] text-xs font-light">
                        Sign In
                      </span>
                    </button>
                  </>
                ) : null}
                {getSessionState.data?.cache_data &&
                (props.activeUrl === "CATERING" ||
                  props.activeUrl === "SNACKSHOP") ? (
                  <div
                    aria-owns={open ? "mouse-over-popover" : undefined}
                    aria-haspopup="true"
                    onMouseEnter={handlePopoverOpen}
                    onMouseLeave={handlePopoverClose}
                  >
                    <button
                      onClick={handleCart}
                      className="flex flex-col items-center justify-center mt-1 mb-4 space-y-1"
                    >
                      <div className="flex items-center justify-center">
                        <div className="relative flex flex-col items-center justify-center w-8 space-y-1 text-white rounded-xl">
                          <BsCart4 className="text-2xl text-white" />
                          <span className="absolute rounded-full bg-red-500 h-[1rem] w-[1rem] -top-2 -right-1 flex justify-center items-center text-[10px]">
                            {calculateCartQuantity()}
                          </span>
                        </div>
                      </div>
                      <h5 className="text-xs font-light text-white">
                        {calculateOrdersPrice()}
                      </h5>
                    </button>

                    <Popover
                      id="mouse-over-popover"
                      sx={{
                        pointerEvents: "none",
                      }}
                      PaperProps={{
                        style: {
                          backgroundColor: "transparent",
                          boxShadow: "none",
                          borderRadius: 0,
                        },
                      }}
                      anchorEl={openCartMenu}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      open={Boolean(openCartMenu)}
                      onClose={() => setOpenCartMenu(null)}
                      disableRestoreFocus
                    >
                      <Box
                        sx={{
                          position: "relative",
                          mt: "10px",
                          "&::before": {
                            backgroundColor: "white",
                            content: '""',
                            display: "block",
                            position: "absolute",
                            width: 12,
                            height: 12,
                            top: -6,
                            transform: "rotate(45deg)",
                            left: "calc(95% - 6px)",
                          },
                        }}
                      />

                      <div className="bg-white pointer-events-auto">
                        <CartListItem
                          activeUrl={props.activeUrl}
                          onProcessOrder={() => {
                            setOpenCartMenu(null);
                            if (props.activeUrl === "CATERING") {
                              navigate("/shop/checkout");
                            } else {
                              navigate("/delivery/checkout");
                            }
                          }}
                        />
                      </div>
                    </Popover>
                  </div>
                ) : null}
              </div>
            </div>
          </nav>
        </div>
        {getSessionState.data &&
        getSessionState.data.cache_data &&
        getSessionState.data.customer_address &&
        getSessionState.data.cache_data.store_name &&
        (props.activeUrl === "CATERING" || props.activeUrl === "SNACKSHOP") ? (
          <div className="w-full py-1 text-white bg-secondary">
            <div className="container flex">
              <div className="truncate w-full lg:w-[400px]">
                {" "}
                <strong>
                  {props.activeUrl === "CATERING" ? "Event Address" : "Address"}
                  :{" "}
                </strong>{" "}
                {getSessionState.data.customer_address}
              </div>
              <div className="flex-1"></div>
              <div className="items-center justify-center hidden space-x-2 lg:flex">
                {" "}
                <MdLocationPin className="text-lg" />
                <Link
                  to={props.activeUrl === "CATERING" ? "/shop" : "/delivery"}
                >
                  <strong> Store: </strong>{" "}
                  {getSessionState.data.cache_data?.store_name}
                </Link>
              </div>
            </div>
          </div>
        ) : null}
      </header>

      <CateringCartModal
        open={openCateringCartModal}
        onClose={() => {
          setOpenCateringCartModal(false);
        }}
      />

      <ShopCartModal
        open={openShopCartModal}
        onClose={() => {
          setOpenShopCartModal(false);
        }}
      />

      <PlatformChooserModal
        hasCloseButton={true}
        onSelectedPlatform={(platform: string) => {
          switch (platform) {
            case "store-visit":
              setOpenStoreVisitStoreChooserModal(true);
              break;
            case "online-delivery":
              setOpenStoreChooserModal(true);
              break;
          }
        }}
        open={openPlatformChooserModal}
        onClose={() => {
          setOpenPlatformChooserModal(false);
        }}
      />

      <SnacksDeliveredStoreChooserModal
        open={openStoreChooserModal}
        onClose={() => {
          setOpenStoreChooserModal(false);
        }}
      />

      <StoreVisitStoreChooserModal
        open={openStoreVisitStoreChooserModal}
        onClose={() => {
          setOpenStoreVisitStoreChooserModal(false);
        }}
      />
    </>
  );
}
