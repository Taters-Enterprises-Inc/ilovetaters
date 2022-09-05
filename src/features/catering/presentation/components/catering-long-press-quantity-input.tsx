interface LongPressQuantityInputProps {
  min: number;
  max?: number;
  quantity: number;
  productQuantity: number;
  totalMultiFlavorsQuantity: number;
  onChange: (action: "plus" | "minus") => void;
}

let timeout: any;
let interval: any;

export function CateringLongPressQuantityInput(
  props: LongPressQuantityInputProps
) {
  const quantityOnPressed = (action: "plus" | "minus", isTouch = false) => {
    if (isTouch === false) props.onChange(action);

    timeout = setTimeout(function () {
      let counter = props.quantity;
      interval = setInterval(function () {
        counter = counter + (action === "plus" ? +1 : -1);

        if (
          action === "plus" &&
          props.productQuantity - (props.totalMultiFlavorsQuantity + counter) <=
            0
        ) {
          if (isTouch) props.onChange(action);
          clearTimeout(timeout);
          clearInterval(interval);
        } else if (counter > props.min) {
          props.onChange(action);
        } else {
          if (isTouch) props.onChange(action);
          clearTimeout(timeout);
          clearInterval(interval);
        }
      }, 100);
    }, 500);
  };

  const quantityOffPressed = () => {
    clearTimeout(timeout);
    clearInterval(interval);
  };

  return (
    <div className="w-full sm:w-[200px] h-12">
      <div className="relative flex flex-row w-full h-12 mt-1 text-white bg-transparent border-2 border-white rounded-lg">
        <button
          onMouseDown={() => quantityOnPressed("minus")}
          onMouseUp={quantityOffPressed}
          onTouchStart={() => quantityOnPressed("minus", true)}
          onTouchEnd={quantityOffPressed}
          className={`w-[150px] h-full rounded-l outline-none cursor-pointer bg-primary ${
            props.quantity === props.min ? "opacity-30 cursor-not-allowed" : ""
          }`}
        >
          <span className="m-auto text-2xl font-thin leading-3">−</span>
        </button>

        <input
          value={props.quantity}
          readOnly
          type="number"
          className="flex items-center w-full font-semibold text-center outline-none cursor-default leading-2 bg-secondary text-md md:text-base"
        />

        <button
          onMouseDown={() => quantityOnPressed("plus")}
          onMouseUp={quantityOffPressed}
          onTouchStart={() => quantityOnPressed("plus", true)}
          onTouchEnd={quantityOffPressed}
          className={`h-full w-[150px] rounded-r cursor-pointer bg-primary ${
            (props.quantity === props.max) === true
              ? "opacity-30 cursor-not-allowed"
              : ""
          } ${
            props.productQuantity - props.totalMultiFlavorsQuantity <= 0
              ? "opacity-30 cursor-not-allowed"
              : ""
          }`}
        >
          <span className="m-auto text-2xl font-thin leading-3">+</span>
        </button>
      </div>
    </div>
  );
}
