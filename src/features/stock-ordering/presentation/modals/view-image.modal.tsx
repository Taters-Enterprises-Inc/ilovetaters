import { IoMdClose } from "react-icons/io";
import { Button } from "@mui/material";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";

interface ViewImageModalProps {
  open: boolean;
  onClose: () => void;
  image: File | string;
  isDownloadable: boolean;
}

export function ViewImageModal(props: ViewImageModalProps) {
  const handlePaymentDownload = () => {
    const url =
      "https://site.test/staging/api/stock/ordered/download-payment/-1688640199.jpg";
    const link = document.createElement("a");
    link.href = url;
    link.download = "";
    link.target = "_blank";
    link.click();
  };

  if (props.open) {
    document.body.classList.add("overflow-hidden");
  } else {
    document.body.classList.remove("overflow-hidden");
    return null;
  }

  return (
    <>
      <div className="fixed inset-0 z-30 flex items-start justify-center overflow-auto bg-black bg-opacity-30 backdrop-blur-sm">
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
            <img
              src={`${REACT_APP_DOMAIN_URL}api/assets/uploads/screenshots/${props.image}`}
              alt="sales invoice"
            />

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
