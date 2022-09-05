import { useEffect, useState } from "react";
import { CateringLongPressQuantityInput } from "./catering-long-press-quantity-input";

export interface CateringFlavorQuantityProps {
  min: number;
  max?: number;
  reset?: boolean;
  productQuantity: number;
  totalMultiFlavorsQuantity: number;
  onChange: (quantity: number, action: "minus" | "plus") => void;
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
        onChange={(action) => {
          switch (action) {
            case "plus":
              if (props.productQuantity - props.totalMultiFlavorsQuantity > 0) {
                props.onChange(quantity + 1, action);
                setQuantity((value) => value + 1);
              }
              break;
            case "minus":
              if (quantity > props.min) {
                props.onChange(quantity - 1, action);
                setQuantity((value) => value - 1);
              }
              break;
          }
        }}
      />
    </>
  );
}
