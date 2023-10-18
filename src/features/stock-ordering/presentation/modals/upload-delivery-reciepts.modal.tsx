import { IoMdClose } from "react-icons/io";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { UploadFile } from "features/shared/presentation/components/upload-file";
import { togglePopupScroll } from "../slices/popup-scroll.slice";
import { useAppDispatch } from "features/config/hooks";

interface UploadDeliveryRecieptModalProps {
  open: boolean;
  onClose: () => void;
  setUploadedReciept: ((file: File | string) => void) | undefined;
  isButtonAvailable: boolean;
}

export function UploadDeliveryRecieptModal(
  props: UploadDeliveryRecieptModalProps
) {
  const dispatch = useAppDispatch();
  const [uploadedReceipt, setUploadedReciept] = useState<File | string>("");

  useEffect(() => {
    dispatch(togglePopupScroll());
  }, [props.open]);

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    props.setUploadedReciept?.(uploadedReceipt);

    document.body.classList.remove("overflow-hidden");
    props.onClose();
  };

  if (props.open) {
    document.body.classList.add("overflow-hidden");
  } else {
    document.body.classList.remove("overflow-hidden");
    return null;
  }

  return (
    <>
      <div
        id="place-order-modal"
        className="fixed inset-0 -top-5 z-30 flex items-start justify-center overflow-auto bg-black bg-opacity-30 backdrop-blur-sm"
      >
        <div className="w-[97%] lg:w-[25%] my-5 rounded-[10px]">
          <div className="bg-secondary rounded-t-[10px] flex items-center justify-between p-4">
            <span className="text-2xl text-white">Upload Sales Invoice</span>
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

          <form onSubmit={handleSubmit}>
            <div className="p-4 bg-white border-b-2 border-l-2 border-r-2 border-secondary space-y-5">
              <UploadFile
                image={uploadedReceipt}
                onChange={(file) => {
                  setUploadedReciept(file);
                }}
                description="DeliveryReciept"
              />
              <h4 className="mt-1 text-sm leading-5 text-secondary">
                <strong>Note:</strong>
                Maximum file size is 2MB.
              </h4>
              {props.isButtonAvailable ? (
                <div>
                  <Button
                    type="submit"
                    fullWidth
                    sx={{
                      bgcolor: "#CC5801",
                      "&:hover": {
                        bgcolor: "#9C4100",
                      },
                    }}
                    variant="contained"
                  >
                    Upload
                  </Button>
                </div>
              ) : null}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
