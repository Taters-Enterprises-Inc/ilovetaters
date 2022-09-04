interface LongPressQuantityInputProps {
  min: number;
  max?: number;
  quantity: number;
  disableAdd: boolean;

  onChange: (action: "plus" | "minus") => void;
}

let timeout: any;
let interval: any;

export function LongPressQuantityInput(props: LongPressQuantityInputProps) {
  const quantityOnPressed = (action: "plus" | "minus", isTouch = false) => {
    if (isTouch === false) props.onChange(action);

    timeout = setTimeout(function () {
      let counter = props.quantity;
      interval = setInterval(function () {
        counter = counter + (action === "plus" ? +1 : -1);

        if (counter > props.min) {
          props.onChange(action);
        } else {
          clearTimeout(timeout);
          clearInterval(interval);
        }
      }, 100);
    }, 500);
  };

  if (props.disableAdd) {
    clearTimeout(timeout);
    clearInterval(interval);
  }

  const quantityOffPressed = () => {
    clearTimeout(timeout);
    clearInterval(interval);
  };

  return (
    <div className="w-[200px] h-12">
      <div className="relative flex flex-row w-full h-12 mt-1 text-white bg-transparent border-2 border-white rounded-lg">
        <button
          onMouseDown={() => quantityOnPressed("minus")}
          onMouseUp={quantityOffPressed}
          onTouchStart={() => quantityOnPressed("minus", true)}
          onTouchEnd={quantityOffPressed}
          className={`w-20 h-full rounded-l outline-none cursor-pointer bg-primary ${
            props.quantity === props.min ? "opacity-30 cursor-not-allowed" : ""
          }`}
        >
          <span className="m-auto text-5xl font-thin leading-3 lg:leading-0">
            −
          </span>
        </button>

        <input
          value={props.quantity}
          readOnly
          type="number"
          className="flex items-center w-full text-3xl font-semibold text-center outline-none cursor-default leading-2 bg-secondary text-md md:text-base"
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
          } ${props.disableAdd ? "opacity-30 cursor-not-allowed" : ""}`}
        >
          <span className="m-auto text-5xl font-thin leading-3 lg:leading-0">
            +
          </span>
        </button>
      </div>
    </div>
  );
}
