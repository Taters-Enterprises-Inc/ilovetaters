import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { getSession } from "features/shared/presentation/slices/get-session.slice";
import {
  resetCateringPackageStoreAndAddress,
  selectSetCateringPackageStoreAndAddress,
  SetCateringPackageStoreAndAddressState,
} from "features/catering/presentation/slices/set-catering-package-store-and-address.slice";
import { useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import { CateringHeroCarousel } from "../components/catering-hero.carousel";
import { CateringStoreChooser } from "../components/catering-store-chooser";
import { getCateringPackageDetails } from "../slices/get-catering-package-details.slice";

interface CateringStoreChooserModalProps {
  open: boolean;
  onClose: () => void;
}
export function CateringStoreChooserModal(
  props: CateringStoreChooserModalProps
) {
  let { hash } = useParams();

  const setCateringPackageStoreAndAddressState = useAppSelector(
    selectSetCateringPackageStoreAndAddress
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (
      setCateringPackageStoreAndAddressState.status ===
      SetCateringPackageStoreAndAddressState.success
    ) {
      if (hash !== undefined) {
        dispatch(getCateringPackageDetails({ hash }));
      }
      dispatch(getSession());
      dispatch(resetCateringPackageStoreAndAddress());
      props.onClose();
    }
  }, [setCateringPackageStoreAndAddressState, hash, dispatch, props]);

  if (props.open) {
    document.body.classList.add("overflow-hidden");
  } else {
    document.body.classList.remove("overflow-hidden");
    return null;
  }

  return (
    <div
      style={{ display: props.open ? "flex" : "none" }}
      className="fixed inset-0 z-30 flex items-start justify-center overflow-auto bg-black bg-opacity-30 backdrop-blur-sm no-scrollbar no-scrollbar::-webkit-scrollbar"
    >
      <div className="bg-primary px-3 py-[30px] round w-[90%] lg:w-[80%] relative rounded-[10px] my-10">
        <button
          className="absolute text-2xl text-white top-2 right-4 "
          onClick={() => {
            document.body.classList.remove("overflow-hidden");
            props.onClose();
          }}
        >
          <IoMdClose />
        </button>

        <div className="mt-4">
          <CateringHeroCarousel />
        </div>

        <CateringStoreChooser />
      </div>
    </div>
  );
}
