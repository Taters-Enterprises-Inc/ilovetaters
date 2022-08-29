import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { CountdownTimerLatestRedeem } from "features/popclub/presentation/components";
import {
  getLatestUnexpiredRedeem,
  selectGetLatestUnexpiredRedeem,
} from "features/popclub/presentation/slices/get-latest-unexpired-redeem.slice";
import {
  REACT_APP_DOMAIN_URL,
  REACT_APP_UPLOADS_URL,
} from "features/shared/constants";
import { useEffect, useState } from "react";
import { FiMoreHorizontal } from "react-icons/fi";
import { Link } from "react-router-dom";
import { PlatformChooserModal } from "features/popclub/presentation/modals/platform-chooser.modal";
import { StoreChooserModal } from "features/popclub/presentation/modals/store-chooser.modal";
import { StoreVisitStoreChooserModal } from "features/popclub/presentation/modals/store-visit-store-chooser.modal";
import {
  getAllPlatform,
  selectGetAllPlatform,
} from "features/popclub/presentation/slices/get-all-platform.slice";

interface FooterNavProps {
  activeUrl: "SNACKSHOP" | "CATERING" | "POPCLUB" | "BRANCHES" | "HOME";
}

export function FooterNav(props: FooterNavProps) {
  const getLatestUnexpiredRedeemState = useAppSelector(
    selectGetLatestUnexpiredRedeem
  );
  const dispatch = useAppDispatch();

  const getAllPlatformState = useAppSelector(selectGetAllPlatform);

  const [openPlatformChooserModal, setOpenPlatformChooserModal] =
    useState(false);
  const [openStoreChooserModal, setOpenStoreChooserModal] = useState(false);
  const [openStoreVisitStoreChooserModal, setOpenStoreVisitStoreChooserModal] =
    useState(false);

  // useEffect(() => {
  //   dispatch(getAllPlatform());
  // }, [dispatch]);

  useEffect(() => {
    dispatch(getLatestUnexpiredRedeem());
  }, [dispatch]);

  return (
    <>
      <section className="fixed bottom-0 z-20 w-full">
        {getLatestUnexpiredRedeemState.data ? (
          <Link
            to={"/popclub/deal/" + getLatestUnexpiredRedeemState.data.deal_hash}
            className="text-white shadow-lg bg-secondary m-2 h-[105px] rounded-xl block"
          >
            <div className="flex">
              <div className="flex flex-col flex-1">
                <div className="flex-1 p-4 text-sm leading-2">
                  <h1 className="elipsis-3-line">
                    {getLatestUnexpiredRedeemState.data.name}
                  </h1>
                </div>
                <CountdownTimerLatestRedeem />
              </div>
              <img
                className="rounded-r-xl w-[105px] h-[105px] object-contain"
                src={`${REACT_APP_DOMAIN_URL}v2/shop/assets/img/500/${getLatestUnexpiredRedeemState.data.product_image}`}
                alt="Deals"
              />
            </div>
          </Link>
        ) : null}
        <footer className="w-full py-2 lg:hidden bg-secondary">
          <nav className="mx-auto ">
            <ul className="flex items-stretch h-full text-white md:px-10">
              <li className="flex-1">
                <Link
                  to={"/"}
                  className="flex flex-col items-center justify-between h-full pt-1"
                >
                  <img
                    src={`${REACT_APP_UPLOADS_URL}images/shared/icons/home${
                      props.activeUrl === "HOME" ? "-active" : ""
                    }.webp`}
                    className="w-[28px] sm:w-[40px]"
                    alt="Tater home icon"
                  ></img>
                  <span
                    className={`text-[8px] sm:text-[14px] ${
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
                  className="flex flex-col items-center justify-between h-full pt-1 cursor-pointer"
                >
                  <img
                    src={`${REACT_APP_UPLOADS_URL}images/shared/icons/popclub${
                      props.activeUrl === "POPCLUB" ? "-active" : ""
                    }.webp`}
                    className="w-[20px] sm:w-[24px]"
                    alt="Tater home icon"
                  ></img>
                  <span
                    className={`text-[8px] sm:text-[14px] ${
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
                  className="flex flex-col items-center justify-center h-full pt-1"
                >
                  <img
                    src={`${REACT_APP_UPLOADS_URL}images/shared/icons/snackshop${
                      props.activeUrl === "SNACKSHOP" ? "-active" : ""
                    }.webp`}
                    className="w-[24px] sm:w-[30px]"
                    alt="Tater home icon"
                  ></img>
                  <span
                    className={`text-[8px] sm:text-[14px] pt-[2px] ${
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
                  className="flex flex-col items-center justify-center h-full pt-1"
                >
                  <img
                    src={`${REACT_APP_UPLOADS_URL}images/shared/icons/catering${
                      props.activeUrl === "CATERING" ? "-active" : ""
                    }.webp`}
                    className="w-[24px] sm:w-[30px]"
                    alt="Tater home icon"
                  ></img>
                  <span
                    className={`text-[8px] sm:text-[14px] pt-[2px] ${
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
                  className="flex flex-col items-center justify-center h-full pt-1"
                >
                  <img
                    src={`${REACT_APP_UPLOADS_URL}images/shared/icons/branches${
                      props.activeUrl === "BRANCHES" ? "-active" : ""
                    }.webp`}
                    className="w-[18px] sm:w-[25px]"
                    alt="Tater home icon"
                  ></img>
                  <span
                    className={`text-[8px] sm:text-[14px] pt-[2px] ${
                      props.activeUrl === "BRANCHES"
                        ? "text-tertiary"
                        : "text-white"
                    }`}
                  >
                    Branches
                  </span>
                </Link>
              </li>
              <li className="flex-[0.8]">
                <button className="flex flex-col items-center justify-center h-full pt-1 pr-2">
                  <FiMoreHorizontal className="text-[25px] sm:text-4xl"></FiMoreHorizontal>
                  <span className="text-[8px] sm:text-[14px] pt-[2px]">
                    More
                  </span>
                </button>
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
