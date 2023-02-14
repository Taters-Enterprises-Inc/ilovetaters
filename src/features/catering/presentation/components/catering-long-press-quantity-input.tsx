import { selectGetSession } from "features/shared/presentation/slices/get-session.slice";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { CateringMultiFlavorsType } from "../pages/catering-product.page";
import { popUpSnackBar } from "features/shared/presentation/slices/pop-snackbar.slice";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { openLoginChooserModal } from "features/shared/presentation/slices/login-chooser-modal.slice";

export type CateringFlavorQuantityActionType = "minus" | "plus";

interface LongPressQuantityInputProps {
  productQuantity: number;
  parent_index: number;
  flavorId: number;
  currentMultiFlavors: CateringMultiFlavorsType;
  onChange: (value: number) => void;
}

let timeout: any;
let interval: any;

export function CateringLongPressQuantityInput(
  props: LongPressQuantityInputProps
) {
  const [quantity, setQuantity] = useState<string>("0");
  const getSessionState = useAppSelector(selectGetSession);
  const dispatch = useAppDispatch();

  let totalMultiFlavorsQuantity = 0;
  let totalMultiFlavorsQuantityWithoutCurrentInput = 0;
  const currentMultiFlavors = props.currentMultiFlavors[props.parent_index];

  if (currentMultiFlavors !== undefined) {
    Object.keys(currentMultiFlavors).forEach(function (key) {
      totalMultiFlavorsQuantity += currentMultiFlavors[key].quantity;
    });

    Object.keys(currentMultiFlavors).forEach(function (key) {
      if (props.flavorId.toString() !== key)
        totalMultiFlavorsQuantityWithoutCurrentInput +=
          currentMultiFlavors[key].quantity;
    });
  } else if (quantity !== "0") {
    setQuantity("0");
  }

  const remainingNumberOfFlavor =
    props.productQuantity - totalMultiFlavorsQuantity;

  const remainingNumberOfFlavorWithoutCurrentInput =
    props.productQuantity - totalMultiFlavorsQuantityWithoutCurrentInput;

  const quantityOnPressed = (
    action: CateringFlavorQuantityActionType,
    isTouch = false
  ) => {
    if (
      getSessionState.data?.userData == null ||
      getSessionState.data?.userData === undefined
    ) {
      dispatch(openLoginChooserModal({ required: false }));
      return;
    }

    if (isTouch === false) {
      switch (action) {
        case "plus":
          if (remainingNumberOfFlavor > 0) {
            props.onChange(
              isNaN(parseInt(quantity)) ? 1 : parseInt(quantity) + 1
            );
            setQuantity(
              isNaN(parseInt(quantity))
                ? "1"
                : (parseInt(quantity) + 1).toString()
            );
          } else {
            return;
          }
          break;
        case "minus":
          if (
            parseInt(quantity) > 0 &&
            remainingNumberOfFlavor < props.productQuantity
          ) {
            props.onChange(parseInt(quantity) - 1);
            setQuantity((parseInt(quantity) - 1).toString());
          } else {
            return;
          }
          break;
      }
    }

    timeout = setTimeout(function () {
      let counter = isNaN(parseInt(quantity)) ? 1 : parseInt(quantity);
      interval = setInterval(function () {
        counter = counter + (action === "plus" ? +1 : -1);
        if (
          action === "plus" &&
          remainingNumberOfFlavorWithoutCurrentInput < counter
        ) {
          clearTimeout(timeout);
          clearInterval(interval);
        } else if (action === "minus" && counter < 0) {
          clearTimeout(timeout);
          clearInterval(interval);
        } else {
          props.onChange(counter);
          setQuantity(counter.toString());
        }
      }, 100);
    }, 500);
  };

  const quantityOffPressed = () => {
    clearTimeout(timeout);
    clearInterval(interval);
  };

  return (
    <div className="w-full sm:w-[200px] h-12">
      <div className="relative flex flex-row w-full h-12 mt-1 text-white bg-transparent border-2 border-white rounded-lg">
        <button
          onMouseDown={() => quantityOnPressed("minus")}
          onMouseUp={quantityOffPressed}
          onTouchStart={() => quantityOnPressed("minus", true)}
          onTouchEnd={quantityOffPressed}
          className={`w-[150px] h-full flex justify-center items-center rounded-l outline-none bg-primary ${
            quantity === "0" || quantity === ""
              ? "opacity-30 cursor-not-allowed"
              : ""
          }`}
        >
          <AiOutlineMinus className="text-2xl font-thin" />
        </button>

        <input
          onWheel={(event) => event.currentTarget.blur()}
          value={quantity}
          onChange={(e) => {
            if (
              getSessionState.data?.userData == null ||
              getSessionState.data?.userData === undefined
            ) {
              dispatch(openLoginChooserModal({ required: false }));
              return;
            }

            if (e.target.value === "") {
              props.onChange(0);

              setQuantity(e.target.value);
              return;
            }

            if (e.target.value) {
              const value = parseInt(e.target.value);

              const remainingNumberOfFlavorWithoutCurrentInput =
                props.productQuantity -
                totalMultiFlavorsQuantityWithoutCurrentInput;

              if (remainingNumberOfFlavorWithoutCurrentInput >= value) {
                setQuantity(value.toString());
                props.onChange(value);
              } else {
                dispatch(
                  popUpSnackBar({
                    message: "Number of flavor exceeded",
                    severity: "error",
                  })
                );
              }
            }
          }}
          type="number"
          className="flex items-center w-full font-semibold text-center outline-none cursor-default leading-2 bg-secondary text-md md:text-base"
        />

        <button
          onMouseDown={() => quantityOnPressed("plus")}
          onMouseUp={quantityOffPressed}
          onTouchStart={() => quantityOnPressed("plus", true)}
          onTouchEnd={quantityOffPressed}
          className={`h-full w-[150px] flex justify-center items-center rounded-r bg-primary ${
            remainingNumberOfFlavor <= 0 ? "opacity-30 cursor-not-allowed" : ""
          }`}
        >
          <AiOutlinePlus className="text-2xl font-thin" />
        </button>
      </div>
    </div>
  );
}
