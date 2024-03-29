import { useEffect, useState } from "react";
import { selectGetSession } from "../slices/get-session.slice";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { openLoginChooserModal } from "../slices/login-chooser-modal.slice";

export interface QuantityInputProps {
  min: number;
  max?: number;
  disableAdd: boolean;
  reset?: boolean;
  onChange: (quantity: number, action: "minus" | "plus") => void;
  defaultValue?: any;
  flavor?: any;
}

export function QuantityInput(props: QuantityInputProps) {
  const dispatch = useAppDispatch();
  const [quantity, setQuantity] = useState(props.min);
  const getSessionState = useAppSelector(selectGetSession);
  useEffect(() => {
    if (props.reset && quantity !== 0) {
      setQuantity(0);
    }
  }, [quantity, props]);

  useEffect(() => {
    if (props.defaultValue !== undefined && props.flavor !== undefined) {
      const index: number = props.flavor?.id;
      setQuantity(() =>
        props.defaultValue[index] !== undefined
          ? props.defaultValue[index].quantity
          : 0
      );
    }
  }, [props]);

  return (
    <div className="w-[200px] h-12">
      <div className="relative flex flex-row w-full h-12 mt-1 text-white bg-transparent border-2 border-white rounded-lg">
        <button
          onClick={() => {
            if (
              getSessionState.data?.userData == null ||
              getSessionState.data?.userData === undefined
            ) {
              dispatch(openLoginChooserModal({ required: false }));
              return;
            }

            if (quantity > props.min) {
              if (props.max) {
                if (quantity <= props.max) {
                  props.onChange(quantity - 1, "minus");
                  setQuantity(quantity - 1);
                }
              } else {
                props.onChange(quantity - 1, "minus");
                setQuantity(quantity - 1);
              }
            }
          }}
          className={`w-20 h-full rounded-l outline-none cursor-pointer bg-primary ${
            quantity === props.min ? "opacity-30 cursor-not-allowed" : ""
          }`}
        >
          <span className="m-auto text-2xl font-thin leading-3">−</span>
        </button>

        <input
          value={quantity}
          type="number"
          readOnly
          className="flex items-center w-full font-semibold text-center outline-none cursor-default leading-2 bg-secondary text-md md:text-base"
        />

        <button
          onClick={() => {
            if (
              getSessionState.data?.userData == null ||
              getSessionState.data?.userData === undefined
            ) {
              dispatch(openLoginChooserModal({ required: false }));
              return;
            }
            if (quantity >= props.min && props.disableAdd === false) {
              if (props.max) {
                if (quantity < props.max) {
                  props.onChange(quantity + 1, "plus");
                  setQuantity(quantity + 1);
                }
              } else {
                props.onChange(quantity + 1, "plus");
                setQuantity(quantity + 1);
              }
            }
          }}
          className={`w-20 h-full rounded-r cursor-pointer bg-primary ${
            (quantity === props.max) === true
              ? "opacity-30 cursor-not-allowed"
              : ""
          } ${props.disableAdd ? "opacity-30 cursor-not-allowed" : ""}`}
        >
          <span className="m-auto text-2xl font-thin leading-3 ">+</span>
        </button>
      </div>
    </div>
  );
}
