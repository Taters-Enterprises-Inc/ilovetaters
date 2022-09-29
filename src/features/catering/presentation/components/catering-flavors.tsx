import { QuantityInput } from "features/shared/presentation/components";
import { useEffect, useState } from "react";
import { CateringFlavorQuantity } from "./catering-flavor-quantity";

interface CateringFlavorsProps {
  parent_name: string;
  productQuantity: number;
  flavors: Array<{
    id: number;
    name: string;
    product_variant_id: number;
    parent_name: string;
  }>;
  currentMultiFlavors: any;
  onChange: (
    updatedMultiFlavors: any,
    action: "plus" | "minus" | "edit",
    value: number
  ) => void;
  resetFlavorsQuantity: boolean;
}

export function CateringFlavors(props: CateringFlavorsProps) {
  const [totalMultiFlavorsQuantity, setTotalMultiFlavorsQuantity] =
    useState<number>(0);

  useEffect(() => {
    if (props.resetFlavorsQuantity) {
      setTotalMultiFlavorsQuantity(0);
    }
  }, [totalMultiFlavorsQuantity, props]);

  return (
    <div>
      <span className="text-white text-2xl tracking-[3px] font-['Bebas_Neue']">
        {props.parent_name}
      </span>
      <ul className="space-y-3">
        {props.flavors.map((flavor, i) => (
          <li key={i}>
            <span className="text-sm text-white">{flavor.name}</span>
            <CateringFlavorQuantity
              min={0}
              reset={props.resetFlavorsQuantity}
              productQuantity={props.productQuantity}
              totalMultiFlavorsQuantity={totalMultiFlavorsQuantity}
              onChange={(action, val) => {
                action === "edit"
                  ? (props.currentMultiFlavors[flavor.id] = {
                      name: flavor.name,
                      quantity: props.currentMultiFlavors[flavor.id]
                        ? (props.currentMultiFlavors[flavor.id].quantity = val)
                        : val,
                      parent: props.parent_name,
                    })
                  : (props.currentMultiFlavors[flavor.id] = {
                      name: flavor.name,
                      quantity: props.currentMultiFlavors[flavor.id]
                        ? props.currentMultiFlavors[flavor.id].quantity + 1
                        : 1,
                    });

                props.onChange(props.currentMultiFlavors, action, val);

                console.log(props.currentMultiFlavors);

                setTotalMultiFlavorsQuantity((value) => {
                  let sum = 0;

                  for (let elem in props.currentMultiFlavors) {
                    if (
                      props.parent_name ===
                      props.currentMultiFlavors[elem].parent
                    )
                      sum += props.currentMultiFlavors[elem].quantity;
                  }

                  if (action === "edit") {
                    console.log(val, " ", value, " ", val + value);

                    return sum;
                  } else {
                    return value + (action === "plus" ? +1 : -1);
                  }
                });
              }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
