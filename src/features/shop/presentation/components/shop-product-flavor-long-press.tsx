import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { LoginChooserModal } from "features/popclub/presentation/modals/login-chooser.modal";
import { selectGetSession } from "features/shared/presentation/slices/get-session.slice";
import { popUpSnackBar } from "features/shared/presentation/slices/pop-snackbar.slice";
import { ProductFlavorModel } from "features/shop/core/domain/product_flavor.model";
import { useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { ShopFlavorType } from "../pages/shop-product.page";

export type ShopFlavorQuantityActionType = "minus" | "plus";

interface ShopProductLongPressProps {
  flavor: ProductFlavorModel;
  numberOfFlavors: number;
  productQuantity: number;
  currentMultiFlavor: ShopFlavorType;
  onChange: (value: number) => void;
}

let timeout: any;
let interval: any;

export function ShopProductFlavorLongPress(props: ShopProductLongPressProps) {
  const [openLoginChooserModal, setOpenLoginChooserModal] = useState(false);
  const [quantity, setQuantity] = useState<string>("0");
  const getSessionState = useAppSelector(selectGetSession);
  const dispatch = useAppDispatch();

  let totalMultiFlavorsQuantity = 0;
  let totalMultiFlavorsQuantityWithoutCurrentInput = 0;

  if (props.currentMultiFlavor !== undefined) {
    Object.keys(props.currentMultiFlavor).forEach(function (key) {
      totalMultiFlavorsQuantity += props.currentMultiFlavor[key].quantity;
    });

    Object.keys(props.currentMultiFlavor).forEach(function (key) {
      if (props.flavor.id.toString() !== key)
        totalMultiFlavorsQuantityWithoutCurrentInput +=
          props.currentMultiFlavor[key].quantity;
    });
  } else if (quantity !== "0") {
    setQuantity("0");
  }

  const remainingNumberOfFlavor =
    props.numberOfFlavors * props.productQuantity - totalMultiFlavorsQuantity;

  const remainingNumberOfFlavorWithoutCurrentInput =
    props.numberOfFlavors * props.productQuantity -
    totalMultiFlavorsQuantityWithoutCurrentInput;

  const quantityOnPressed = (action: ShopFlavorQuantityActionType) => {
    const quantityToInt = parseInt(quantity);

    if (
      getSessionState.data?.userData == null ||
      getSessionState.data?.userData === undefined
    ) {
      setOpenLoginChooserModal(true);
      return;
    }

    switch (action) {
      case "plus":
        if (remainingNumberOfFlavor > 0) {
          const increaseQuantity = isNaN(quantityToInt) ? 1 : quantityToInt + 1;

          props.onChange(increaseQuantity);
          setQuantity(increaseQuantity.toString());
        } else {
          return;
        }
        break;
      case "minus":
        if (
          quantityToInt > 0 &&
          remainingNumberOfFlavor <
            props.numberOfFlavors * props.productQuantity
        ) {
          const decreaseQuantity = quantityToInt - 1;

          props.onChange(decreaseQuantity);
          setQuantity(decreaseQuantity.toString());
        } else {
          return;
        }
        break;
    }

    quantityLongPressed(action, false);
  };

  const quantityLongPressed = (
    action: ShopFlavorQuantityActionType,
    isWillCheckLoginUser: boolean
  ) => {
    if (isWillCheckLoginUser) {
      if (
        getSessionState.data?.userData == null ||
        getSessionState.data?.userData === undefined
      ) {
        setOpenLoginChooserModal(true);
        return;
      }
    }
    timeout = setTimeout(function () {
      let quantityToInt = parseInt(quantity);
      let counter = isNaN(quantityToInt) ? 1 : quantityToInt;

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
    <>
      <div className="w-full h-12">
        <div className="relative flex flex-row w-full h-12 mt-1 text-white bg-transparent border-2 border-white rounded-lg">
          <button
            onMouseDown={() => quantityOnPressed("minus")}
            onMouseUp={quantityOffPressed}
            onTouchStart={() => quantityLongPressed("minus", true)}
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
            type="number"
            value={quantity}
            onChange={(e) => {
              if (
                getSessionState.data?.userData == null ||
                getSessionState.data?.userData === undefined
              ) {
                setOpenLoginChooserModal(true);
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
                  props.numberOfFlavors * props.productQuantity -
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
            className="flex items-center w-full font-semibold text-center outline-none cursor-default leading-2 bg-secondary text-md md:text-base"
          />

          <button
            onMouseDown={() => quantityOnPressed("plus")}
            onMouseUp={quantityOffPressed}
            onTouchStart={() => quantityLongPressed("plus", true)}
            onTouchEnd={quantityOffPressed}
            className={`h-full w-[150px] flex justify-center items-center rounded-r bg-primary ${
              remainingNumberOfFlavor <= 0
                ? "opacity-30 cursor-not-allowed"
                : ""
            }`}
          >
            <AiOutlinePlus className="text-2xl font-thin" />
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
