import { Button } from "@mui/material";
import { updateCancelledStatus } from "features/stock-ordering/core/stock-ordering.params";
import { updateOrderCancelled } from "../slices/update-order-cancelled.slice";
import { useAppDispatch } from "features/config/hooks";
import { AiFillWarning } from "react-icons/ai";
import { STOCK_ORDERING_BUTTON_STYLE } from "features/shared/constants";

interface CompleteModalProps {
  open: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  title: string;
  message: string;
  remarks?: string;
  id?: string;
  cancelOrder?: boolean;
  customButton?: boolean;
  orderCancelled?: (isCancelled: boolean) => void;
}

export function PopupModal(props: CompleteModalProps) {
  const dispatch = useAppDispatch();

  const handleCancelOrder = async () => {
    const cancelParameter: updateCancelledStatus = {
      id: props.id ?? "",
      remarks: props.remarks ?? "",
    };
    dispatch(updateOrderCancelled(cancelParameter));
    document.body.classList.remove("overflow-hidden");

    props.orderCancelled?.(true);
  };

  if (props.open) {
    document.body.classList.add("overflow-hidden");
  } else {
    document.body.classList.remove("overflow-hidden");
    return null;
  }

  return (
    <>
      {/* <div className="fixed inset-0 z-30 flex items-start justify-center overflow-auto bg-black bg-opacity-30 backdrop-blur-sm">
        <div className="w-[50%] lg:w-[400px] my-32 rounded-[10px]"> */}
      <div className="fixed inset-0 z-30 flex items-start justify-center overflow-auto">
        <div className="w-[50%] lg:w-[400px] my-32 border-2 border-black rounded-md">
          <div className="bg-secondary rounded-t-[10px] flex items-center justify-between p-4">
            <span className="text-sm text-white font-semibold">
              {props.title}
            </span>
          </div>
          <div className="flex flex-col bg-paper p-3 rounded-b-md space-y-8">
            <div className="flex space-x-3">
              <AiFillWarning className="text-2xl text-tertiary" />
              <span>{props.message}</span>
            </div>

            <div className="space-y-4">{props.children}</div>

            {!props.customButton && (
              <div className="flex space-x-3">
                {props.cancelOrder && (
                  <Button
                    fullWidth
                    size="small"
                    onClick={handleCancelOrder}
                    variant="contained"
                    sx={STOCK_ORDERING_BUTTON_STYLE}
                  >
                    Yes
                  </Button>
                )}
                <Button
                  fullWidth
                  size="small"
                  variant="contained"
                  onClick={() => props.onClose()}
                  sx={STOCK_ORDERING_BUTTON_STYLE}
                >
                  {props.cancelOrder ? "No" : "Ok"}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
