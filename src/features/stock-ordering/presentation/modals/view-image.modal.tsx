import { IoMdClose } from "react-icons/io";
import { Button } from "@mui/material";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import { useAppDispatch } from "features/config/hooks";
import { useEffect } from "react";
import { togglePopupScroll } from "../slices/popup-scroll.slice";

interface ViewImageModalProps {
  open: boolean;
  onClose: () => void;
  image: File | string;
  isDownloadable: boolean;
}

export function ViewImageModal(props: ViewImageModalProps) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(togglePopupScroll());
  }, [props.open]);

  const handlePaymentDownload = () => {
    const url = `${REACT_APP_DOMAIN_URL}api/stock/ordered/download-payment/${props.image}`;

    window.open(url, "_blank");
  };

  if (props.open) {
    document.body.classList.add("overflow-hidden");
  } else {
    document.body.classList.remove("overflow-hidden");
    return null;
  }

  return (
    <>
      <div className="fixed inset-0 -top-5 z-30 flex items-start justify-center overflow-auto bg-black bg-opacity-30 backdrop-blur-sm">
        <div className="w-[97%] lg:w-[25%] my-5 rounded-[10px]">
          <div className="bg-secondary rounded-t-[10px] flex items-center justify-between p-4">
            <span className="text-2xl text-white">Preview</span>
            <button
              className="text-2xl text-white"
              onClick={() => {
                document.body.classList.remove("overflow-hidden");
                props.onClose();
              }}
            >
              <IoMdClose />
            </button>
          </div>
          <div className="flex flex-col space-y-3 bg-white p-1">
            {typeof props.image === "string" ? (
              <img src={props.image} alt="sales invoice" />
            ) : (
              <img src={URL.createObjectURL(props.image)} alt="sales invoice" />
            )}

            {props.isDownloadable ? (
              <Button
                onClick={() => handlePaymentDownload()}
                fullWidth
                variant="contained"
              >
                Download
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}
