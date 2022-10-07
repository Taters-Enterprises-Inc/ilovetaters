import { useAppDispatch } from "features/config/hooks";
import { popUpSnackBar } from "features/shared/presentation/slices/pop-snackbar.slice";
import { useEffect, useState } from "react";
import { CateringLongPressQuantityInput } from "./catering-long-press-quantity-input";

export interface CateringFlavorQuantityProps {
  min: number;
  max?: number;
  reset?: boolean;
  productQuantity: number;
  totalMultiFlavorsQuantity: number;
  onChange: (action: "minus" | "plus" | "edit", value: number) => void;
}

export function CateringFlavorQuantity(props: CateringFlavorQuantityProps) {
  const dispatch = useAppDispatch();
  const [quantity, setQuantity] = useState(props.min);

  useEffect(() => {
    if (props.reset && quantity !== 0) {
      setQuantity(0);
    }
  }, [quantity, props]);

  return (
    <>
      <CateringLongPressQuantityInput
        min={props.min}
        max={props.max}
        productQuantity={props.productQuantity}
        totalMultiFlavorsQuantity={props.totalMultiFlavorsQuantity}
        quantity={quantity}
        onChange={(action, val) => {
          switch (action) {
            case "plus":
              if (isNaN(quantity)) {
                setQuantity(0);
              }

              if (props.productQuantity - props.totalMultiFlavorsQuantity > 0) {
                props.onChange(action, NaN);
                setQuantity((value) => value + 1);
              }
              break;
            case "minus":
              if (quantity > props.min) {
                props.onChange(action, NaN);
                setQuantity((value) => value - 1);
              }
              break;

            case "edit":
              if (
                val + props.totalMultiFlavorsQuantity <=
                props.productQuantity
              ) {
                setQuantity(val);
                props.onChange(action, val);
              } else if (
                val + props.totalMultiFlavorsQuantity >
                props.productQuantity
              ) {
                dispatch(
                  popUpSnackBar({
                    message: "Over the the limit of package quantity",
                    severity: "error",
                  })
                );
                setQuantity(0);
                // props.onChange(action, 0);
              } else {
                setQuantity(val);
                // props.onChange(action, 0);
              }
              break;
          }
        }}
      />
    </>
  );
}
