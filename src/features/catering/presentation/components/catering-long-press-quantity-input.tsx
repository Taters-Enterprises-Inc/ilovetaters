import { LoginChooserModal } from "features/popclub/presentation/modals/login-chooser.modal";
import { selectGetSession } from "features/shared/presentation/slices/get-session.slice";
import { useRef, useState } from "react";
import { useAppSelector } from "features/config/hooks";

interface LongPressQuantityInputProps {
  min: number;
  max?: number;
  quantity: number;
  productQuantity: number;
  totalMultiFlavorsQuantity: number;
  onChange: (action: "plus" | "minus" | "edit", value: number) => void;
}

let timeout: any;
let interval: any;

export function CateringLongPressQuantityInput(
  props: LongPressQuantityInputProps
) {
  const [openLoginChooserModal, setOpenLoginChooserModal] = useState(false);
  const getSessionState = useAppSelector(selectGetSession);
  const [setDisabled] = useState(true);

  const quantityOnPressed = (action: "plus" | "minus") => {
    if (
      getSessionState.data?.userData == null ||
      getSessionState.data?.userData === undefined
    ) {
      setOpenLoginChooserModal(true);
      return;
    }

    props.onChange(action, 0);

    timeout = setTimeout(function () {
      let counter = action === "plus" ? 0 : props.quantity;
      interval = setInterval(function () {
        console.log("LongPress");
        counter = counter + (action === "plus" ? +1 : -1);

        if (
          action === "plus" &&
          props.productQuantity - (props.totalMultiFlavorsQuantity + counter) <=
            0
        ) {
          clearTimeout(timeout);
          clearInterval(interval);
        } else if (counter > props.min) {
          props.onChange(action, 0);
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

  const onChangeQuantity = (e: any) => {
    if (
      getSessionState.data?.userData == null ||
      getSessionState.data?.userData === undefined
    ) {
      setOpenLoginChooserModal(true);
      return;
    }

    let val = parseInt(e.target.value);

    props.onChange("edit", val);
  };

  return (
    <>
      <div className="w-full sm:w-[200px] h-12">
        <div className="relative flex flex-row w-full h-12 mt-1 text-white bg-transparent border-2 border-white rounded-lg">
          <button
            onMouseDown={() => quantityOnPressed("minus")}
            onMouseUp={(e) => quantityOffPressed()}
            onTouchStart={() => quantityOnPressed("minus")}
            onTouchEnd={(e) => {
              e.preventDefault();
              quantityOffPressed();
            }}
            className={`w-[150px] h-full rounded-l outline-none cursor-pointer bg-primary ${
              props.quantity === props.min || isNaN(props.quantity)
                ? "opacity-30 cursor-not-allowed"
                : ""
            }`}
          >
            <span className="m-auto text-2xl font-thin leading-3">−</span>
          </button>

          <input
            value={props.quantity}
            onChange={(e) => onChangeQuantity(e)}
            min="1"
            type="number"
            className="flex items-center w-full font-semibold text-center outline-none cursor-default leading-2 bg-secondary text-md md:text-base"
          />

          <button
            onMouseDown={() => quantityOnPressed("plus")}
            onMouseUp={(e) => quantityOffPressed()}
            onTouchStart={() => quantityOnPressed("plus")}
            onTouchEnd={(e) => {
              e.preventDefault();
              quantityOffPressed();
            }}
            className={`h-full w-[150px] rounded-r cursor-pointer bg-primary ${
              (props.quantity === props.max) === true
                ? "opacity-30 cursor-not-allowed"
                : ""
            } ${
              props.productQuantity - props.totalMultiFlavorsQuantity <= 0
                ? "opacity-30 cursor-not-allowed"
                : ""
            }`}
          >
            <span className="m-auto text-2xl font-thin leading-3">+</span>
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
