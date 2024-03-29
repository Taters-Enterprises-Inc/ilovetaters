import { PlatformChooserModal } from "../modals/platform-chooser.modal";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SnacksDeliveredStoreChooserModal } from "../modals/snacks-delivered-store-chooser.modal";
import { StoreVisitStoreChooserModal } from "../modals/store-visit-store-chooser.modal";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";

export function PopClubIndexPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [openStoreChooserModal, setOpenStoreChooserModal] = useState(false);
  const [openStoreVisitStoreChooserModal, setOpenStoreVisitStoreChooserModal] =
    useState(false);

  return (
    <>
      <section className="lg:container">
        <img
          className="lg:hidden"
          src={
            REACT_APP_DOMAIN_URL +
            "api/assets/images/popclub/hero/mobile/popclub.jpg"
          }
          alt="The best pop corn in town"
        ></img>
        <img
          className="hidden lg:block"
          src={
            REACT_APP_DOMAIN_URL +
            "api/assets/images/popclub/hero/desktop/popclub.jpg"
          }
          alt="The best pop corn in town"
        ></img>

        <img
          className="hidden lg:block"
          src={
            REACT_APP_DOMAIN_URL +
            "api/assets/images/popclub/banner/popclub_instruction.jpg"
          }
          alt="The best pop corn in town"
        ></img>
      </section>
      <PlatformChooserModal
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
        hasCloseButton={false}
        open={true}
        onClose={() => {}}
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
