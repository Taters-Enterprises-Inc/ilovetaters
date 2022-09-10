import { useAppDispatch, useAppSelector } from "features/config/hooks";
import {
  getSession,
  selectGetSession,
} from "features/shared/presentation/slices/get-session.slice";
import { REACT_APP_DOMAIN_URL, TABS } from "features/shared/constants";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LoginChooserModal } from "features/popclub/presentation/modals/login-chooser.modal";

import { PlatformChooserModal } from "features/popclub/presentation/modals/platform-chooser.modal";
import { StoreChooserModal } from "features/popclub/presentation/modals/store-chooser.modal";
import { StoreVisitStoreChooserModal } from "features/popclub/presentation/modals/store-visit-store-chooser.modal";
import {
  getAllPlatform,
  selectGetAllPlatform,
} from "features/popclub/presentation/slices/get-all-platform.slice";

interface HeaderNavProps {
  active: string;
  sticky?: boolean;
}

export function HomeHeaderNav(props: HeaderNavProps) {
  const getSessionState = useAppSelector(selectGetSession);
  const getAllPlatformState = useAppSelector(selectGetAllPlatform);

  const dispatch = useAppDispatch();
  const [openLoginChooserModal, setOpenLoginChooserModal] = useState(false);
  const [openPlatformChooserModal, setOpenPlatformChooserModal] =
    useState(false);
  const [openStoreChooserModal, setOpenStoreChooserModal] = useState(false);
  const [openStoreVisitStoreChooserModal, setOpenStoreVisitStoreChooserModal] =
    useState(false);

  useEffect(() => {
    dispatch(getAllPlatform());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getSession());
  }, [dispatch]);

  return (
    <>
      <header
        className={`${props.sticky ? "sticky" : "fixed"} w-full top-0 z-20 `}
      >
        <div className={` w-full bg-primary shadow-2xl`}>
          <nav
            className={`lg:flex hidden justify-between items-center container py-2 h-[64px]`}
          >
            <img
              src={
                REACT_APP_DOMAIN_URL +
                "api/assets/images/shared/logo/taters-logo.webp"
              }
              alt="Taters Logo"
              className="w-[150px] lg:w-[160px] px-6"
            ></img>

            <div className="flex items-center justify-center space-x-4">
              <ul className="flex text-white font-semibold items-stretch h-[40px] justify-center ">
                {TABS.map((tab: any, i) => {
                  return (
                    <li
                      key={i}
                      className={`font-['Bebas_Neue'] tracking-[4px] px-4 pb-1 flex justify-center items-center text-lg font-light ${
                        props.active === tab.name
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
              {getSessionState.data?.userData ? (
                <img
                  src={getSessionState.data?.userData.picture}
                  alt="Profile pic"
                  className="rounded-full"
                ></img>
              ) : getSessionState.data?.userData === null ? (
                <button
                  onClick={() => setOpenLoginChooserModal(true)}
                  className="bg-red-600 text-white mb-1 h-[40px] px-4 rounded-full uppercase tracking-lg flex justify-center items-center font-['Bebas_Neue'] text-lg tracking-[2px] font-light"
                >
                  SIGN IN
                </button>
              ) : null}
            </div>
          </nav>
        </div>
      </header>

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
