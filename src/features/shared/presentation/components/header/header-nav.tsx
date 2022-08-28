import axios from "axios";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import {
  getSession,
  selectGetSession,
} from "features/shared/presentation/slices/get-session.slice";
import {
  REACT_APP_DOMAIN_URL,
  REACT_APP_UPLOADS_URL,
  TABS,
} from "features/shared/constants";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import { AiOutlineUser } from "react-icons/ai";
import { BsCart4 } from "react-icons/bs";
import { ShopCartModal } from "../../../../shop/presentation/modals";
import { LoginChooserModal } from "features/popclub/presentation/modals/login-chooser.modal";
import NumberFormat from "react-number-format";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {
  facebookLogout,
  selectFacebookLogout,
} from "features/shared/presentation/slices/facebook-logout.slice";
import { PlatformChooserModal } from "features/popclub/presentation/modals/platform-chooser.modal";
import { StoreChooserModal } from "features/popclub/presentation/modals/store-chooser.modal";
import { StoreVisitStoreChooserModal } from "features/popclub/presentation/modals/store-visit-store-chooser.modal";
import {
  getAllPlatform,
  selectGetAllPlatform,
} from "features/popclub/presentation/slices/get-all-platform.slice";

interface HeaderNavProps {
  activeUrl: "SNACKSHOP" | "CATERING" | "POPCLUB";
  logoProps: {
    src: string;
    alt: string;
    className: string;
  };
}

export function HeaderNav(props: HeaderNavProps) {
  const [openLoginChooserModal, setOpenLoginChooserModal] = useState(false);
  const [openShopCartModal, setOpenShopCartModal] = useState(false);
  const [openProfileMenu, setOpenProfileMenu] = useState<null | HTMLElement>(
    null
  );
  const navigate = useNavigate();

  const getSessionState = useAppSelector(selectGetSession);
  const facebookLogoutState = useAppSelector(selectFacebookLogout);
  const dispatch = useAppDispatch();

  const getAllPlatformState = useAppSelector(selectGetAllPlatform);

  const [openPlatformChooserModal, setOpenPlatformChooserModal] =
    useState(false);
  const [openStoreChooserModal, setOpenStoreChooserModal] = useState(false);
  const [openStoreVisitStoreChooserModal, setOpenStoreVisitStoreChooserModal] =
    useState(false);

  useEffect(() => {
    dispatch(getAllPlatform());
  }, [dispatch]);

  const handleProfileMenuClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setOpenProfileMenu(event.currentTarget);
  };

  const handleMyProfile = () => {
    setOpenProfileMenu(null);
    navigate("/shop/profile");
  };

  const handleLogout = () => {
    setOpenProfileMenu(null);
    dispatch(facebookLogout());
  };

  useEffect(() => {
    dispatch(getSession());
  }, [facebookLogoutState]);

  const handleCart = () => {
    setOpenShopCartModal(true);
  };

  const calculateOrdersPrice = () => {
    let calculatedPrice = 0;
    const orders = getSessionState.data?.orders;

    if (orders) {
      for (let i = 0; i < orders.length; i++) {
        calculatedPrice += orders[i].prod_calc_amount;
      }
      return (
        <NumberFormat
          value={calculatedPrice.toFixed(2)}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"₱"}
        />
      );
    } else {
      return <>₱0.00</>;
    }
  };

  return (
    <>
      <header className={"sticky w-full top-0 z-20"}>
        <div className={` w-full bg-primary shadow-2xl`}>
          <nav className={`flex justify-between items-center container py-2`}>
            <Link to={"/shop"}>
              <img {...props.logoProps} />
            </Link>

            <div className="flex items-center justify-center space-x-4">
              <ul className="text-white font-semibold items-stretch h-[40px] justify-center hidden lg:flex">
                {TABS.map((tab: any, i) => {
                  return (
                    <li
                      key={i}
                      className={`font-['Bebas_Neue'] tracking-[4px] px-4 pb-1 flex justify-center items-center text-lg font-extralight ${
                        tab.name === props.activeUrl
                          ? "text-tertiary"
                          : "text-white"
                      }`}
                    >
                      {tab.name === "POPCLUB" ? (
                        <button
                          className="tracking-[4px]"
                          onClick={() => {
                            setOpenPlatformChooserModal(true);
                          }}
                        >
                          {tab.name}
                        </button>
                      ) : (
                        <Link to={tab.url}>{tab.name}</Link>
                      )}
                    </li>
                  );
                })}
              </ul>
              <div className="flex items-center justify-center space-x-3 lg:space-x-6">
                {getSessionState.data?.userData ? (
                  <div>
                    <Button
                      aria-controls={
                        Boolean(openProfileMenu) ? "basic-menu" : undefined
                      }
                      aria-haspopup="true"
                      aria-expanded={
                        Boolean(openProfileMenu) ? "true" : undefined
                      }
                      onClick={handleProfileMenuClick}
                      className="flex justify-center items-center flex-col space-y-1 mt-[-5px]"
                    >
                      <img
                        src={getSessionState.data?.userData.picture}
                        alt="Profile pic"
                        className="rounded-full"
                        width={30}
                      ></img>
                      <span className="text-xs text-white font-extralight">
                        {getSessionState.data?.userData.first_name}{" "}
                        {getSessionState.data?.userData.last_name}
                      </span>
                    </Button>
                    <Menu
                      anchorEl={openProfileMenu}
                      open={Boolean(openProfileMenu)}
                      onClose={() => setOpenProfileMenu(null)}
                    >
                      <MenuItem
                        onClick={handleMyProfile}
                        className="bg-secondary"
                      >
                        My profile
                      </MenuItem>
                      <MenuItem onClick={handleLogout} className="bg-secondary">
                        Logout
                      </MenuItem>
                    </Menu>
                  </div>
                ) : getSessionState.data?.userData === null ? (
                  <>
                    <button
                      onClick={() => setOpenLoginChooserModal(true)}
                      className="flex flex-col items-center justify-center space-y-1 text-white rounded-xl"
                    >
                      <AiOutlineUser className="text-2xl" />
                      <span className="tracking-[2px] text-xs font-extralight">
                        Sign In
                      </span>
                    </button>
                  </>
                ) : null}
                {getSessionState.data?.cache_data ? (
                  <button
                    onClick={handleCart}
                    className="flex-col items-center space-y-1 justifiy-center"
                  >
                    <div className="relative flex flex-col items-center justify-center space-y-1 text-white rounded-xl">
                      <BsCart4 className="text-2xl text-white" />
                      <span className="absolute rounded-full bg-red-500 h-[1.2rem] w-[1.2rem] lg:h-[1.25rem] lg:w-[1.25rem] -top-2 -right-2 lg:-top-3 lg:-right-2 flex justify-center items-center text-[10px]">
                        {getSessionState.data?.orders
                          ? getSessionState.data.orders.length
                          : 0}
                      </span>
                    </div>
                    <h5 className="text-[13px] font-extralight text-white">
                      {calculateOrdersPrice()}
                    </h5>
                  </button>
                ) : null}
              </div>
            </div>
          </nav>
        </div>
      </header>

      <ShopCartModal
        open={openShopCartModal}
        onClose={() => {
          setOpenShopCartModal(false);
        }}
      />

      <LoginChooserModal
        open={openLoginChooserModal}
        onClose={() => {
          setOpenLoginChooserModal(false);
        }}
      />

      <PlatformChooserModal
        platforms={getAllPlatformState.data}
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

      <StoreChooserModal
        open={openStoreChooserModal}
        onClose={() => {
          setOpenStoreChooserModal(false);
        }}
      ></StoreChooserModal>

      <StoreVisitStoreChooserModal
        open={openStoreVisitStoreChooserModal}
        onClose={() => {
          setOpenStoreVisitStoreChooserModal(false);
        }}
      ></StoreVisitStoreChooserModal>
    </>
  );
}
