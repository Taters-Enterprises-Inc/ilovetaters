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
}

let timeout: any;
let interval: any;

export function CateringProductQuantity(props: CateringProductQuantityProps) {
  const [openLoginChooserModal, setOpenLoginChooserModal] = useState(false);
  const [quantity, setQuantity] = useState<string>("1");
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
    if (isTouch === false) {
      switch (action) {
        case "plus":
          props.onChange(action, parseInt(quantity) + 1);
          setQuantity((parseInt(quantity) + 1).toString());
          break;
        case "minus":
          if (parseInt(quantity) > 1) {
            props.onChange(action, parseInt(quantity) - 1);
            setQuantity((parseInt(quantity) - 1).toString());
          } else {
            return;
          }
          break;
      }
    }

    timeout = setTimeout(function () {
      let counter = parseInt(quantity);

      interval = setInterval(function () {
        counter = counter + (action === "plus" ? +1 : -1);

        if (counter >= 1) {
          props.onChange(action, counter);
          setQuantity(counter.toString());
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
              quantity === "1" ? "opacity-30 cursor-not-allowed" : ""
            }`}
          >
            <AiOutlineMinus className="text-3xl" />
          </button>

          <input
            onWheel={(event) => event.currentTarget.blur()}
            value={quantity}
            type="number"
            onChange={(e) => {
              setQuantity(e.target.value);

              if (e.target.value) {
                const value = parseInt(e.target.value);
                if (value > 1) {
                  props.onChange("manual-input", value);
                }
              }
            }}
            min="1"
            className="flex items-center w-full text-3xl font-semibold text-center outline-none cursor-default leading-2 bg-secondary text-md md:text-base"
          />

          <button
            onMouseDown={() => quantityOnPressed("plus")}
            onMouseUp={quantityOffPressed}
            onTouchStart={() => quantityOnPressed("plus", true)}
            onTouchEnd={quantityOffPressed}
            className={`h-full w-[150px] rounded-r flex justify-center items-center bg-primary`}
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
