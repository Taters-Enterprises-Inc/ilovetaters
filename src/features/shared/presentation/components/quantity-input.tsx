import { useState } from "react";

export interface QuantityInputProps {
  min: number;
  max: number;
}

export function QuantityInput(props: QuantityInputProps) {
  const [quantity, setQuantity] = useState(props.min);

  return (
    <div className="w-[200px] h-12">
      <div className="relative flex flex-row w-full h-12 mt-1 text-white bg-transparent border-2 border-white rounded-lg">
        <button
          onClick={() => {
            if (quantity > props.min && quantity <= props.max)
              setQuantity(quantity - 1);
          }}
          className={`w-20 h-full rounded-l outline-none cursor-pointer bg-primary ${
            quantity === props.min ? "opacity-30 cursor-not-allowed" : ""
          }`}
        >
          <span className="m-auto text-2xl font-thin leading-3">−</span>
        </button>

        <input
          value={quantity}
          onChange={(event: any) => {
            const value = event.target.value;
            if (value >= props.min && value <= props.max)
              setQuantity(Math.floor(event.target.value));
          }}
          type="number"
          readOnly
          className="flex items-center w-full font-semibold text-center outline-none cursor-default leading-2 bg-secondary text-md md:text-base"
          name="custom-input-number"
        />

        <button
          onClick={() => {
            if (quantity >= props.min && quantity < props.max)
              setQuantity(quantity + 1);
          }}
          className={`w-20 h-full rounded-r cursor-pointer bg-primary ${
            quantity === props.max ? "opacity-30 cursor-not-allowed" : ""
          }`}
        >
          <span className="m-auto text-2xl font-thin leading-3 ">+</span>
        </button>
      </div>
    </div>
  );
}
