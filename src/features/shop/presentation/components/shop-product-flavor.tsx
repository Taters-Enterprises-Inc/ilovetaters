import { ProductFlavorsModel } from "features/shop/core/domain/product_flavors.model";
import { ShopFlavorType } from "../pages/shop-product.page";
import { ShopProductFlavorLongPress } from "./shop-product-flavor-long-press";

interface ShopProductFlavorProps {
  flavor: ProductFlavorsModel;
  numberOfFlavors: number;
  productQuantity: number;
  currentMultiFlavor: ShopFlavorType;
  onChangeMultiFlavor: (updatedMultiFlavors: ShopFlavorType) => void;
}

export function ShopProductFlavor(props: ShopProductFlavorProps) {
  // console.log(props.currentMultiFlavor);

  return (
    <div>
      {props.flavor.parent_name === "flavor" ? (
        <h2 className="font-['Bebas_Neue'] text-4xl text-white tracking-[2px]">
          Choose Flavor
        </h2>
      ) : (
        <span className="text-white text-2xl tracking-[3px] font-['Bebas_Neue']">
          {props.flavor.parent_name}
        </span>
      )}
      <ul className="space-y-3">
        {props.flavor.flavors.map((flavor, i) => (
          <li key={i}>
            <span className="text-sm text-white">{flavor.name}</span>
            <ShopProductFlavorLongPress
              flavor={flavor}
              currentMultiFlavor={props.currentMultiFlavor}
              numberOfFlavors={props.numberOfFlavors}
              productQuantity={props.productQuantity}
              onChange={(value) => {
                const currentMultiFlavors = props.currentMultiFlavor
                  ? props.currentMultiFlavor
                  : {};

                if (value !== undefined) {
                  currentMultiFlavors[flavor.id] = {
                    name: flavor.name,
                    quantity: value,
                  };

                  props.onChangeMultiFlavor(currentMultiFlavors);
                }
              }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
