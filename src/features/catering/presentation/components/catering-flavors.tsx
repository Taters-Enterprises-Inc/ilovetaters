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
  onChange: (updatedMultiFlavors: any, action: "plus" | "minus") => void;
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
              onChange={(flavorQuantity, action) => {
                if (props.currentMultiFlavors) {
                  props.currentMultiFlavors[flavor.id] = {
                    name: flavor.name,
                    quantity: flavorQuantity,
                  };

                  props.onChange(props.currentMultiFlavors, action);
                } else {
                  const temp: any = {};
                  temp[flavor.id] = {
                    name: flavor.name,
                    quantity: flavorQuantity,
                  };
                  props.onChange(temp, action);
                }

                setTotalMultiFlavorsQuantity(
                  (value) => value + (action === "plus" ? +1 : -1)
                );
              }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
