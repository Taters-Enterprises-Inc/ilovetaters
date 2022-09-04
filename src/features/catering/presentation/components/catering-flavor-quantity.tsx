import { LongPressQuantityInput } from "features/shared/presentation/components";
import { useEffect, useState } from "react";

export interface CateringFlavorQuantityProps {
  min: number;
  max?: number;
  disableAdd: boolean;
  reset?: boolean;
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
      <LongPressQuantityInput
        min={props.min}
        max={props.max}
        quantity={quantity}
        disableAdd={props.disableAdd}
        onChange={(action) => {
          switch (action) {
            case "plus":
              if (props.disableAdd === false) {
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
