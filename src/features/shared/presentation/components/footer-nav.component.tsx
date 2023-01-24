import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { PlatformChooserModal } from "features/popclub/presentation/modals/platform-chooser.modal";
import { SnacksDeliveredStoreChooserModal } from "features/popclub/presentation/modals/snacks-delivered-store-chooser.modal";
import { StoreVisitStoreChooserModal } from "features/popclub/presentation/modals/store-visit-store-chooser.modal";
import MoreDrawer from "./more-drawer.component";
import { MessageModal } from "../modals";
import { selectGetSession } from "../slices/get-session.slice";

interface FooterNavProps {
  activeUrl: "SNACKSHOP" | "CATERING" | "POPCLUB" | "BRANCHES" | "HOME";
}

export function FooterNav(props: FooterNavProps) {
  const navigate = useNavigate();
  const getSessionState = useAppSelector(selectGetSession);
  const currentLocation = useLocation();
  const dispatch = useAppDispatch();

  function isMoreActive() {
    const loc = currentLocation.pathname;
    if (
      loc === "/franchising" ||
      loc === "/profile" ||
      loc === "/delivery/terms-and-conditions"
    ) {
      return true;
    }
  }

  const [openPlatformChooserModal, setOpenPlatformChooserModal] =
    useState(false);

  const [openStoreChooserModal, setOpenStoreChooserModal] = useState(false);

  const [openStoreVisitStoreChooserModal, setOpenStoreVisitStoreChooserModal] =
    useState(false);

  const [
    openMessageModalWhenSwitchingTabWhenCacheDataExist,
    setOpenMessageModalWhenSwitchingTabWhenCacheDataExist,
  ] = useState<{
    status: boolean;
    message: string;
    url?: string;
    onYes?: () => void;
  }>({
    status: false,
    message: "",
  });

  const handleSwitchTab = (param: {
    url?: string;
    tabName: string;
    onYes?: () => void;
  }) => {
    if (
      getSessionState.data &&
      getSessionState.data.cache_data &&
      getSessionState.data.customer_address
    ) {
      setOpenMessageModalWhenSwitchingTabWhenCacheDataExist({
        status: true,
        url: param.url,
        onYes: param.onYes,
        message: `This would remove all your cart items, store selection and send you to the ${param.tabName} home page. Are you sure you want to proceed?`,
      });
    } else {
      if (param.url) navigate(param.url);
      if (param.onYes) param.onYes();
    }
  };

  return (
    <>
      <section className="fixed bottom-0 z-[2003] lg:hidden w-full">
        <footer className="w-full shadow-l-2xl bg-secondary">
          <nav className="mx-auto lg:px-[200px] xl:px-[400px]">
            <ul className="flex h-full py-1 text-white item-stretch md:px-10">
              <li className="flex-1">
                <div
                  onClick={() => handleSwitchTab({ url: "/", tabName: "home" })}
                  className="flex flex-col items-center justify-center h-full pt-1 cursor-pointer"
                >
                  <img
                    src={`${REACT_APP_DOMAIN_URL}api/assets/images/shared/icons/home${
                      props.activeUrl === "HOME" && !isMoreActive()
                        ? "-active"
                        : ""
                    }.png`}
                    className="w-[28px] sm:w-[40px] lg:w-[30px]"
                    alt="Entertainment Snacks est. 1994."
                  />
                  <span
                    className={`text-[8px] sm:text-[14px] lg:text-[11px] pt-[3px] pb-[5px] ${
                      props.activeUrl === "HOME" && !isMoreActive()
                        ? "text-tertiary"
                        : "text-white"
                    }`}
                  >
                    Home
                  </span>
                </div>
              </li>
              <li className="flex-1">
                <div
                  onClick={() => {
                    handleSwitchTab({
                      onYes: () => {
                        setOpenPlatformChooserModal(true);
                      },
                      tabName: "popclub",
                    });
                  }}
                  className="flex flex-col items-center justify-center h-full pt-1 cursor-pointer"
                >
                  <img
                    src={`${REACT_APP_DOMAIN_URL}api/assets/images/shared/icons/popclub${
                      props.activeUrl === "POPCLUB" ? "-active" : ""
                    }.png`}
                    className="w-[20px] sm:w-[24px] lg:w-[22.69px]"
                    alt="Best deals in town."
                  />
                  <span
                    className={`text-[8px] sm:text-[14px] lg:text-[11px] pt-[3px] pb-[5px] ${
                      props.activeUrl === "POPCLUB"
                        ? "text-tertiary"
                        : "text-white"
                    }`}
                  >
                    Popclub
                  </span>
                </div>
              </li>
              <li className="flex-1">
                <div
                  onClick={() =>
                    handleSwitchTab({ url: "/delivery", tabName: "snackshop" })
                  }
                  className="flex flex-col items-center justify-center h-full pt-[5px] sm:pt-[5px] md:pt-2 cursor-pointer"
                >
                  <img
                    src={`${REACT_APP_DOMAIN_URL}api/assets/images/shared/icons/snackshop${
                      props.activeUrl === "SNACKSHOP" && !isMoreActive()
                        ? "-active"
                        : ""
                    }.png`}
                    className="w-[24px] sm:w-[30px] lg:w-[23px]"
                    alt="Snacks cravings delivered."
                  ></img>
                  <span
                    className={`text-[8px] sm:text-[14px] lg:text-[11px] pt-[3px] pb-[5px] ${
                      props.activeUrl === "SNACKSHOP" && !isMoreActive()
                        ? "text-tertiary"
                        : "text-white"
                    }`}
                  >
                    Snackshop
                  </span>
                </div>
              </li>
              <li className="flex-1">
                <div
                  onClick={() =>
                    handleSwitchTab({ url: "/shop", tabName: "catering" })
                  }
                  className="flex flex-col items-center justify-center h-full pt-[5px] sm:pt-[5px] md:pt-2 cursor-pointer"
                >
                  <img
                    src={`${REACT_APP_DOMAIN_URL}api/assets/images/shared/icons/catering${
                      props.activeUrl === "CATERING" ? "-active" : ""
                    }.png`}
                    className="w-[24px] sm:w-[30px] lg:w-[24px]"
                    alt="Caters munch better celebrations."
                  ></img>
                  <span
                    className={`text-[8px] sm:text-[14px] lg:text-[11px] pt-[3px] pb-[5px] ${
                      props.activeUrl === "CATERING"
                        ? "text-tertiary"
                        : "text-white"
                    }`}
                  >
                    Catering
                  </span>
                </div>
              </li>
              <li className="flex-1">
                <div
                  onClick={() =>
                    handleSwitchTab({ url: "/branches", tabName: "branches" })
                  }
                  className="flex flex-col items-center justify-center h-full pt-[5px] sm:pt-[5px] md:pt-1 cursor-pointer"
                >
                  <img
                    src={`${REACT_APP_DOMAIN_URL}api/assets/images/shared/icons/branches${
                      props.activeUrl === "BRANCHES" ? "-active" : ""
                    }.png`}
                    className="w-[18px] sm:w-[25px] lg:w-[21px]"
                    alt="Over 80 branches nationwide."
                  ></img>
                  <span
                    className={`text-[8px] sm:text-[14px] lg:text-[11px] pt-[3px] pb-[5px] ${
                      props.activeUrl === "BRANCHES"
                        ? "text-tertiary"
                        : "text-white"
                    }`}
                  >
                    Branches
                  </span>
                </div>
              </li>
              <li className="flex-1">
                <MoreDrawer isMoreActive={isMoreActive() ? true : false} />
              </li>
            </ul>
          </nav>
        </footer>
      </section>

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

      <MessageModal
        open={openMessageModalWhenSwitchingTabWhenCacheDataExist.status}
        onClose={() => {
          setOpenMessageModalWhenSwitchingTabWhenCacheDataExist({
            status: false,
            message: "",
            url: undefined,
            onYes: undefined,
          });
        }}
        onYes={() => {
          setOpenMessageModalWhenSwitchingTabWhenCacheDataExist({
            status: false,
            message: "",
            url: undefined,
            onYes: undefined,
          });
          if (openMessageModalWhenSwitchingTabWhenCacheDataExist.url)
            navigate(openMessageModalWhenSwitchingTabWhenCacheDataExist.url);

          if (openMessageModalWhenSwitchingTabWhenCacheDataExist.onYes)
            openMessageModalWhenSwitchingTabWhenCacheDataExist.onYes();
        }}
        message={openMessageModalWhenSwitchingTabWhenCacheDataExist.message}
      />
    </>
  );
}
