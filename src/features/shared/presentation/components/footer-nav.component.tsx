import { useAppSelector } from "features/config/hooks";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import { useState } from "react";
import { Link } from "react-router-dom";
import { PlatformChooserModal } from "features/popclub/presentation/modals/platform-chooser.modal";
import { StoreChooserModal } from "features/popclub/presentation/modals/store-chooser.modal";
import { StoreVisitStoreChooserModal } from "features/popclub/presentation/modals/store-visit-store-chooser.modal";
import { selectGetAllPlatform } from "features/popclub/presentation/slices/get-all-platform.slice";
import MoreDrawer from "./more-drawer.component";

interface FooterNavProps {
  activeUrl: "SNACKSHOP" | "CATERING" | "POPCLUB" | "BRANCHES" | "HOME";
}

export function FooterNav(props: FooterNavProps) {
  const getAllPlatformState = useAppSelector(selectGetAllPlatform);

  const [openPlatformChooserModal, setOpenPlatformChooserModal] =
    useState(false);
  const [openStoreChooserModal, setOpenStoreChooserModal] = useState(false);
  const [openStoreVisitStoreChooserModal, setOpenStoreVisitStoreChooserModal] =
    useState(false);

  return (
    <>
      <section className="fixed bottom-0 z-[2003]  w-full">
        <footer className="w-full shadowl-2xl lg:hidden bg-secondary">
          <nav className="mx-auto ">
            <ul className="flex items-stretch h-full py-1 text-white md:px-10">
              <li className="flex-1">
                <Link
                  to={"/"}
                  className="flex flex-col items-center justify-center h-full pt-1"
                >
                  <img
                    src={`${REACT_APP_DOMAIN_URL}api/assets/images/shared/icons/home${
                      props.activeUrl === "HOME" ? "-active" : ""
                    }.webp`}
                    className="w-[28px] sm:w-[40px]"
                    alt="Tater home icon"
                  ></img>
                  <span
                    className={`text-[8px] sm:text-[14px] pt-[3px] pb-[5px] ${
                      props.activeUrl === "HOME"
                        ? "text-tertiary"
                        : "text-white"
                    }`}
                  >
                    Home
                  </span>
                </Link>
              </li>
              <li className="flex-1">
                <div
                  onClick={() => {
                    setOpenPlatformChooserModal(true);
                  }}
                  className="flex flex-col items-center justify-center h-full pt-1 cursor-pointer"
                >
                  <img
                    src={`${REACT_APP_DOMAIN_URL}api/assets/images/shared/icons/popclub${
                      props.activeUrl === "POPCLUB" ? "-active" : ""
                    }.webp`}
                    className="w-[20px] sm:w-[24px]"
                    alt="Tater home icon"
                  ></img>
                  <span
                    className={`text-[8px] sm:text-[14px] pt-[3px] pb-[5px] ${
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
                <Link
                  to={"/shop"}
                  className="flex flex-col items-center justify-center h-full pt-[5px] sm:pt-[5px] md:pt-2"
                >
                  <img
                    src={`${REACT_APP_DOMAIN_URL}api/assets/images/shared/icons/snackshop${
                      props.activeUrl === "SNACKSHOP" ? "-active" : ""
                    }.webp`}
                    className="w-[24px] sm:w-[30px]"
                    alt="Tater home icon"
                  ></img>
                  <span
                    className={`text-[8px] sm:text-[14px] pt-[3px] pb-[5px] ${
                      props.activeUrl === "SNACKSHOP"
                        ? "text-tertiary"
                        : "text-white"
                    }`}
                  >
                    Snackshop
                  </span>
                </Link>
              </li>
              <li className="flex-1">
                <Link
                  to={"/catering"}
                  className="flex flex-col items-center justify-center h-full pt-[5px] sm:pt-[5px] md:pt-2"
                >
                  <img
                    src={`${REACT_APP_DOMAIN_URL}api/assets/images/shared/icons/catering${
                      props.activeUrl === "CATERING" ? "-active" : ""
                    }.webp`}
                    className="w-[24px] sm:w-[30px]"
                    alt="Tater home icon"
                  ></img>
                  <span
                    className={`text-[8px] sm:text-[14px] pt-[3px] pb-[5px] ${
                      props.activeUrl === "CATERING"
                        ? "text-tertiary"
                        : "text-white"
                    }`}
                  >
                    Catering
                  </span>
                </Link>
              </li>
              <li className="flex-1">
                <Link
                  to={"/branches"}
                  className="flex flex-col items-center justify-center h-full pt-[5px] sm:pt-[5px] md:pt-1"
                >
                  <img
                    src={`${REACT_APP_DOMAIN_URL}api/assets/images/shared/icons/branches${
                      props.activeUrl === "BRANCHES" ? "-active" : ""
                    }.webp`}
                    className="w-[18px] sm:w-[25px]"
                    alt="Tater home icon"
                  ></img>
                  <span
                    className={`text-[8px] sm:text-[14px] pt-[3px] pb-[5px] ${
                      props.activeUrl === "BRANCHES"
                        ? "text-tertiary"
                        : "text-white"
                    }`}
                  >
                    Branches
                  </span>
                </Link>
              </li>
              <li className="flex-1">
                <MoreDrawer />
              </li>
            </ul>
          </nav>
        </footer>
      </section>

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
