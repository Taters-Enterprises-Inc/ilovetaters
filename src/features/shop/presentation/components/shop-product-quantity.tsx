import {
  getSession,
  selectGetSession,
} from "features/shared/presentation/slices/get-session.slice";
import { SetSessionState } from "features/shared/presentation/slices/set-session.slice";
import { useEffect, useState, useRef } from "react";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { LoginChooserModal } from "features/popclub/presentation/modals/login-chooser.modal";

let timeout: any;
let quantityId: any;

export function ProductQuantity({}) {
  const [quantity, setQuantity] = useState(1);
  const [setDisabled] = useState(true);
  const getSessionState = useAppSelector(selectGetSession);
  const [openLoginChooserModal, setOpenLoginChooserModal] = useState(false);

  function handleonMouseUp() {
    clearInterval(quantityId);
  }

  function handleonMouseDown(action: string) {
    if (
      getSessionState.data?.userData == null ||
      getSessionState.data?.userData === undefined
    ) {
      clearInterval(quantityId);
      setOpenLoginChooserModal(true);
    } else {
      action === "add" ? setQuantity(quantity + 1) : setQuantity(quantity - 1);
      onpressed(action);
    }
  }

  const onpressed = (action: string) => {
    let counter = quantity;
    quantityId = setInterval(function () {
      if (action === "add") counter += 1;
      else counter -= 1;
      setQuantity(counter);

      if (counter === 10 || counter === 1) clearInterval(quantityId);
    }, 500);
  };

  return (
    <div>
      <h2 className="font-['Bebas_Neue'] text-4xl text-white tracking-[2px]">
        Quantity
      </h2>
      <div className="h-[60px] w-full mt-2">
        <div className="relative flex flex-row w-full h-full mt-1 text-white bg-transparent border-2 border-white rounded-lg">
          <button
            onMouseDown={() =>
              quantity <= 1 ? setDisabled : handleonMouseDown("minus")
            }
            onMouseUp={handleonMouseUp}
            onTouchStart={() =>
              quantity <= 1 ? setDisabled : handleonMouseDown("minus")
            }
            onTouchEnd={handleonMouseUp}
            className={`h-full w-[150px] rounded-l cursor-pointer outline-none bg-primary ${
              quantity <= 1 ? "opacity-30 cursor-not-allowed" : ""
            }`}
          >
            <span className="m-auto text-5xl font-thin leading-3 lg:leading-0">
              −
            </span>
          </button>

          <input
            value={quantity}
            readOnly
            type="number"
            min="1"
            max="10"
            className="flex items-center w-full text-3xl font-semibold text-center outline-none cursor-default leading-2 bg-secondary text-md md:text-base"
            name="custom-input-number"
          />

          <button
            onMouseDown={() =>
              quantity >= 10 ? setDisabled : handleonMouseDown("add")
            }
            onMouseUp={handleonMouseUp}
            onTouchStart={() =>
              quantity <= 1 ? setDisabled : handleonMouseDown("add")
            }
            onTouchEnd={handleonMouseUp}
            className={`h-full w-[150px] rounded-r cursor-pointer bg-primary ${
              quantity >= 10 ? "opacity-30 cursor-not-allowed" : ""
            }`}
          >
            <span className="m-auto text-5xl font-thin leading-3 lg:leading-0">
              +
            </span>
          </button>
        </div>
      </div>
      <LoginChooserModal
        open={openLoginChooserModal}
        onClose={() => {
          setOpenLoginChooserModal(false);
        }}
      />
    </div>
  );
}
