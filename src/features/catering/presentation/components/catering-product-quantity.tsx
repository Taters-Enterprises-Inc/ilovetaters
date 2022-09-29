import { useAppSelector } from "features/config/hooks";
import { LoginChooserModal } from "features/popclub/presentation/modals/login-chooser.modal";
import { selectGetSession } from "features/shared/presentation/slices/get-session.slice";
import { TouchEvent, useRef, useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

interface CateringProductQuantityProps {
  min: number;
  quantity: number;
  onChange: (action: "plus" | "minus") => void;
  onEditInput: (value: number) => void;
}

let timeout: any;
let interval: any;

export function CateringProductQuantity(props: CateringProductQuantityProps) {
  const [openLoginChooserModal, setOpenLoginChooserModal] = useState(false);
  const getSessionState = useAppSelector(selectGetSession);
  const onPressRef = useRef(false);

  const quantityOnPressed = (action: "plus" | "minus") => {
    onPressRef.current = false;
    if (
      getSessionState.data?.userData == null ||
      getSessionState.data?.userData === undefined
    ) {
      setOpenLoginChooserModal(true);
      return;
    }

    // if (isTouch === false) props.onChange(action);

    // props.onChange(action);

    timeout = setTimeout(function () {
      let counter = props.quantity;

      interval = setInterval(function () {
        counter = counter + (action === "plus" ? +1 : -1);

        if (counter >= props.min) {
          props.onChange(action);
        } else {
          clearTimeout(timeout);
          clearInterval(interval);
        }

        onPressRef.current = true;
      }, 100);
    }, 500);

    if (!onPressRef.current) props.onChange(action);
  };

  const quantityOffPressed = () => {
    clearTimeout(timeout);
    clearInterval(interval);
  };

  const onChangeQuantity = (e: any) => {
    props.onEditInput(parseInt(e.target.value));
  };

  return (
    <>
      <div className="h-[60px] w-full">
        <div className="relative flex flex-row w-full h-full mt-1 text-white bg-transparent border-2 border-white rounded-lg">
          <button
            onMouseDown={() => quantityOnPressed("minus")}
            onMouseUp={(e) => quantityOffPressed()}
            onTouchStart={() => quantityOnPressed("minus")}
            onTouchEnd={(e) => {
              e.preventDefault();
              quantityOffPressed();
            }}
            className={`h-full w-[150px] rounded-l cursor-pointer outline-none flex justify-center items-center bg-primary ${
              props.quantity <= 1 || isNaN(props.quantity)
                ? "opacity-30 cursor-not-allowed"
                : ""
            }`}
          >
            <AiOutlineMinus className="text-3xl" />
          </button>

          <input
            value={props.quantity}
            type="number"
            onChange={(e) => onChangeQuantity(e)}
            min="1"
            className="flex items-center w-full text-3xl font-semibold text-center outline-none cursor-default leading-2 bg-secondary text-md md:text-base"
          />

          <button
            onMouseDown={() => quantityOnPressed("plus")}
            onMouseUp={(e) => quantityOffPressed()}
            onTouchStart={() => quantityOnPressed("plus")}
            onTouchEnd={(e) => {
              e.preventDefault();
              quantityOffPressed();
            }}
            className={`h-full w-[150px] rounded-r cursor-pointer flex justify-center items-center bg-primary`}
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
