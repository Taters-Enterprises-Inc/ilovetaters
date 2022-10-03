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
              if (val > props.productQuantity) {
                console.log("over Total");
                val = props.productQuantity;
              } else if (
                val + props.totalMultiFlavorsQuantity >
                props.productQuantity
              ) {
                val = props.productQuantity - props.totalMultiFlavorsQuantity;
              }
              setQuantity(val);

              setTimeout(() => {
                if (isNaN(val)) props.onChange(action, 0);
                else props.onChange(action, val);
              }, 500);

              break;
          }
        }}
      />
    </>
  );
}
