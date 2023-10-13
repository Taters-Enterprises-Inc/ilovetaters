import { Button } from "@mui/material";
import { useAppDispatch } from "features/config/hooks";
import { AiFillWarning } from "react-icons/ai";
import { STOCK_ORDERING_BUTTON_STYLE } from "features/shared/constants";
import { useEffect } from "react";
import { togglePopupScroll } from "../slices/popup-scroll.slice";

interface CompleteModalProps {
  open: boolean;
  children?: React.ReactNode;
  title: string;
  message: string;
  customButton?: boolean;
  handleYesButton?: () => void;
  handleNoButton?: () => void;
  okayButton?: boolean;
  handleOkayButton?: () => void;
}

export function PopupModal(props: CompleteModalProps) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(togglePopupScroll());
  }, [props.open]);

  if (props.open) {
    document.body.classList.add("overflow-hidden");
  } else {
    document.body.classList.remove("overflow-hidden");
    return null;
  }

  return (
    <>
      <div className="fixed inset-0 -top-5 z-40 flex items-start justify-center bg-black bg-opacity-30 backdrop-blur-sm">
        <div className="w-[50%] lg:w-[400px] my-32 rounded-[10px]">
          <div className="bg-secondary flex items-center justify-between p-4">
            <span className="text-sm text-white font-semibold">
              {props.title}
            </span>
          </div>
          <div className="flex flex-col bg-paper p-3 rounded-b-md space-y-8">
            <div className="flex space-x-3">
              <AiFillWarning className="text-5xl text-tertiary" />
              <span>{props.message}</span>
            </div>

            {props.children && (
              <div className="space-y-4">{props.children}</div>
            )}
            {!props.customButton && (
              <>
                {props.okayButton ? (
                  <Button
                    fullWidth
                    size="small"
                    onClick={props.handleOkayButton}
                    variant="contained"
                    sx={STOCK_ORDERING_BUTTON_STYLE}
                  >
                    Okay
                  </Button>
                ) : (
                  <div className="flex space-x-3">
                    <Button
                      fullWidth
                      size="small"
                      onClick={props.handleYesButton}
                      variant="contained"
                      sx={STOCK_ORDERING_BUTTON_STYLE}
                    >
                      Yes
                    </Button>

                    <Button
                      fullWidth
                      size="small"
                      variant="contained"
                      onClick={props.handleNoButton}
                      sx={STOCK_ORDERING_BUTTON_STYLE}
                    >
                      No
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
