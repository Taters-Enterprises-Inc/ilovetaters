import { PopClubFlavorType, PopClubMultiFlavorsType } from "../modals/variants-chooser.modal";
import { PopClubQuantityInput } from "./popclub-quantity-input";

interface PopClubFlavorsProps {
  parent_name: string;
  productQuantity: number;
  flavors: Array<{
    id: number;
    name: string;
    product_variant_id: number;
    parent_name: string;
  }>;
  parent_index: number;
  currentMultiFlavors: PopClubMultiFlavorsType;
  onChange: (updatedMultiFlavors: PopClubFlavorType) => void;
}

export function PopClubFlavors(props: PopClubFlavorsProps) {
  return (
    <div>
      <span className="text-white text-2xl tracking-[3px] font-['Bebas_Neue']">
        {props.parent_name}
      </span>
      <ul className="space-y-3">
        {props.flavors.map((flavor, i) => (
          <li key={i}>
            <span className="text-sm text-white">{flavor.name}</span>
            <PopClubQuantityInput
              flavorId={flavor.id}
              productQuantity={props.productQuantity}
              parent_index={props.parent_index}
              currentMultiFlavors={props.currentMultiFlavors}
              onChange={(value) => {
                const currentMultiFlavors = props.currentMultiFlavors[
                  props.parent_index
                ]
                  ? props.currentMultiFlavors[props.parent_index]
                  : {};

                if (value !== undefined) {
                  currentMultiFlavors[flavor.id] = {
                    name: flavor.name,
                    quantity: value,
                  };

                  props.onChange(currentMultiFlavors);
                }
              }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
