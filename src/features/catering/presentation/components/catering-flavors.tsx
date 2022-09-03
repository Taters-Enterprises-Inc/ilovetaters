import { QuantityInput } from "features/shared/presentation/components";
import { useEffect, useState } from "react";

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
    <>
      <span className="text-white text-2xl tracking-[3px] font-['Bebas_Neue']">
        {props.parent_name}
      </span>
      <ul className="space-y-3">
        {props.flavors.map((flavor, i) => (
          <li key={i}>
            <span className="text-sm text-white">{flavor.name}</span>
            <QuantityInput
              min={0}
              reset={props.resetFlavorsQuantity}
              disableAdd={
                props.productQuantity - totalMultiFlavorsQuantity === 0
              }
              max={10}
              onChange={(val, action) => {
                const updateTotalMultiFlavorsQuantity =
                  totalMultiFlavorsQuantity + (action === "plus" ? +1 : -1);
                if (props.currentMultiFlavors) {
                  props.currentMultiFlavors[flavor.id] = {
                    name: flavor.name,
                    quantity: val,
                  };

                  props.onChange(props.currentMultiFlavors, action);
                } else {
                  const temp: any = {};
                  temp[flavor.id] = {
                    name: flavor.name,
                    quantity: val,
                  };
                  props.onChange(temp, action);
                }
                setTotalMultiFlavorsQuantity(updateTotalMultiFlavorsQuantity);
              }}
            />
          </li>
        ))}
      </ul>
    </>
  );
}
