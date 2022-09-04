interface CateringProductQuantityProps {
  min: number;
  quantity: number;
  onChange: (action: "plus" | "minus") => void;
}

let timeout: any;
let interval: any;

export function CateringProductQuantity(props: CateringProductQuantityProps) {
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

  const quantityOffPressed = () => {
    clearTimeout(timeout);
    clearInterval(interval);
  };

  return (
    <div className="h-[60px] w-full">
      <div className="relative flex flex-row w-full h-full mt-1 text-white bg-transparent border-2 border-white rounded-lg">
        <button
          onMouseDown={() => quantityOnPressed("minus")}
          onMouseUp={quantityOffPressed}
          onTouchStart={() => quantityOnPressed("minus", true)}
          onTouchEnd={quantityOffPressed}
          className={`h-full w-[150px] rounded-l cursor-pointer outline-none bg-primary ${
            props.quantity === 1 ? "opacity-30 cursor-not-allowed" : ""
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
          min="1"
          max="10"
          className="flex items-center w-full text-3xl font-semibold text-center outline-none cursor-default leading-2 bg-secondary text-md md:text-base"
        />

        <button
          onMouseDown={() => quantityOnPressed("plus")}
          onMouseUp={quantityOffPressed}
          onTouchStart={() => quantityOnPressed("plus", true)}
          onTouchEnd={quantityOffPressed}
          className={`h-full w-[150px] rounded-r cursor-pointer bg-primary`}
        >
          <span className="m-auto text-5xl font-thin leading-3 lg:leading-0">
            +
          </span>
        </button>
      </div>
    </div>
  );
}
