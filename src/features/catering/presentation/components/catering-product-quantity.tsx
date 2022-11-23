import { useAppSelector } from "features/config/hooks";
import { LoginChooserModal } from "features/popclub/presentation/modals/login-chooser.modal";
import { selectGetSession } from "features/shared/presentation/slices/get-session.slice";
import { useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

export type CateringProductQuantityActionType =
  | "plus"
  | "minus"
  | "manual-input";

interface CateringProductQuantityProps {
  onChange: (action: CateringProductQuantityActionType, value: number) => void;
  quantity: number;
  quantityChange: (value: string) => void;
}

let timeout: any;
let interval: any;

export function CateringProductQuantity(props: CateringProductQuantityProps) {
  const [openLoginChooserModal, setOpenLoginChooserModal] = useState(false);
  const getSessionState = useAppSelector(selectGetSession);

  const quantityOnPressed = (
    action: CateringProductQuantityActionType,
    isTouch = false
  ) => {
    if (
      getSessionState.data?.userData == null ||
      getSessionState.data?.userData === undefined
    ) {
      setOpenLoginChooserModal(true);
      return;
    }

    // if (isNaN(props.quantity)) {
    //   props.onChange(action, 0);
    // }

    if (isTouch === false) {
      switch (action) {
        case "plus":
          props.onChange(action, props.quantity + 1);
          break;
        case "minus":
          if (props.quantity > 1) {
            props.onChange(action, props.quantity - 1);
          } else {
            return;
          }
          break;
      }
    }

    timeout = setTimeout(function () {
      let counter = props.quantity;

      interval = setInterval(function () {
        counter = counter + (action === "plus" ? +1 : -1);

        if (counter >= 1) {
          props.onChange(action, counter);
        } else {
          clearTimeout(timeout);
          clearInterval(interval);
        }
      }, 100);
    }, 500);
  };

  const quantityOffPressed = () => {
    clearTimeout(timeout);
    clearInterval(interval);
  };

  return (
    <>
      <div className="h-[60px] w-full">
        <div className="relative flex flex-row w-full h-full mt-1 text-white bg-transparent border-2 border-white rounded-lg">
          <button
            onMouseDown={() => quantityOnPressed("minus")}
            onMouseUp={quantityOffPressed}
            onTouchStart={() => quantityOnPressed("minus", true)}
            onTouchEnd={quantityOffPressed}
            className={`h-full w-[150px] rounded-l outline-none flex justify-center items-center bg-primary ${
              props.quantity === 1 || isNaN(props.quantity)
                ? "opacity-30 cursor-not-allowed"
                : ""
            }`}
          >
            <AiOutlineMinus className="text-3xl" />
          </button>

          <input
            onWheel={(event) => event.currentTarget.blur()}
            value={props.quantity}
            type="number"
            onChange={(e) => {
              if (
                getSessionState.data?.userData == null ||
                getSessionState.data?.userData === undefined
              ) {
                setOpenLoginChooserModal(true);
                return;
              }

              props.quantityChange(e.target.value);

              if (e.target.value) {
                const value = parseInt(e.target.value);
                if (value >= 1) {
                  value >= 99999
                    ? props.onChange("manual-input", 99999)
                    : props.onChange("manual-input", value);
                } else {
                  props.onChange("manual-input", 1);
                }
              }
            }}
            min="1"
            max="99999"
            className="flex items-center w-full text-3xl font-semibold text-center outline-none cursor-default leading-2 bg-secondary text-md md:text-base"
          />

          <button
            onMouseDown={() => quantityOnPressed("plus")}
            onMouseUp={quantityOffPressed}
            onTouchStart={() => quantityOnPressed("plus", true)}
            onTouchEnd={quantityOffPressed}
            className={`h-full w-[150px] rounded-l outline-none flex justify-center items-center bg-primary ${
              props.quantity === 99999 ? "opacity-30 cursor-not-allowed" : ""
            }`}
            disabled={props.quantity === 99999 ? true : false}
          >
            <AiOutlinePlus className="text-3xl" />
          </button>
        </div>
      </div>

      <LoginChooserModal
        open={openLoginChooserModal}
        onClose={() => {
          setOpenLoginChooserModal(false);
        }}
      />
    </>
  );
}
