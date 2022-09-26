import { PlatformChooserModal } from "../modals/platform-chooser.modal";
import {
  getAllPlatform,
  selectGetAllPlatform,
} from "../slices/get-all-platform.slice";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StoreChooserModal } from "../modals/store-chooser.modal";
import { StoreVisitStoreChooserModal } from "../modals/store-visit-store-chooser.modal";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";

export function PopClubIndexPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const getAllPlatformState = useAppSelector(selectGetAllPlatform);

  const [openStoreChooserModal, setOpenStoreChooserModal] = useState(false);
  const [openStoreVisitStoreChooserModal, setOpenStoreVisitStoreChooserModal] =
    useState(false);

  useEffect(() => {
    dispatch(getAllPlatform());
  }, [dispatch]);
  return (
    <>
      <section className="lg:container">
        <img
          className="lg:hidden"
          src={
            REACT_APP_DOMAIN_URL +
            "api/assets/images/popclub/hero/mobile/popclub.webp"
          }
          alt="The best pop corn in town"
        ></img>
        <img
          className="hidden lg:block"
          src={
            REACT_APP_DOMAIN_URL +
            "api/assets/images/popclub/hero/desktop/popclub.webp"
          }
          alt="The best pop corn in town"
        ></img>

        <img
          className="hidden lg:block"
          src={
            REACT_APP_DOMAIN_URL +
            "api/assets/images/popclub/banner/popclub_instruction.webp"
          }
          alt="The best pop corn in town"
        ></img>
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
        open={true}
        onClose={() => {
          navigate("/");
        }}
      />
      <StoreChooserModal
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
