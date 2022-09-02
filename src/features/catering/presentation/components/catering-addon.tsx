import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { LoginChooserModal } from "features/popclub/presentation/modals/login-chooser.modal";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import { ProductModel } from "features/shared/core/domain/product.model";
import { selectGetSession } from "features/shared/presentation/slices/get-session.slice";
import { useState } from "react";
import { BsFillCartPlusFill } from "react-icons/bs";
import NumberFormat from "react-number-format";
interface AddonProps {
  product: ProductModel;
}

export function CateringAddon(props: AddonProps) {
  const [quantity, setQuantity] = useState(1);
  const getSessionState = useAppSelector(selectGetSession);
  const [openLoginChooserModal, setOpenLoginChooserModal] = useState(false);
  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    if (
      getSessionState.data?.userData == null ||
      getSessionState.data?.userData === undefined
    ) {
      setOpenLoginChooserModal(true);
      return;
    }

    // dispatch(
    //   addToCart({
    //     prod_id: props.product.id,
    //     prod_image_name: props.product.product_image,
    //     prod_name: props.product.name,
    //     prod_qty: quantity,
    //     prod_flavor: -1,
    //     prod_size: -1,
    //     prod_price: props.product.price,
    //     prod_calc_amount: props.product.price * quantity,
    //     prod_category: props.product.category,
    //     prod_with_drinks: -1,
    //     flavors_details: "",
    //     prod_sku_id: -1,
    //     prod_sku: -1,
    //   })
    // );
  };

  return (
    <>
      <div className="my-3 mb-6 shadow-md bg-secondary rounded-xl shadow-tertiary">
        <div className="flex p-4 space-x-2">
          <img
            src={`${REACT_APP_DOMAIN_URL}api/assets/images/catering/products/${props.product.product_image}`}
            className="rounded-[10px] w-[100px] h-[100px]"
            alt=""
          />
          <div className="p-2 space-y-2">
            <h4 className="font-['Bebas_Neue'] text-lg tracking-[2px] leading-5">
              {props.product.name}
            </h4>
            <h5 className="leading-5 text-tertiary">
              <NumberFormat
                value={(props.product.price * quantity).toFixed(2)}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"₱"}
              />
            </h5>

            <div className="w-24 h-10">
              <div className="relative flex flex-row w-full h-10 mt-1 text-white bg-transparent border-2 border-white rounded-lg">
                <button
                  onClick={() => {
                    if (
                      getSessionState.data?.userData == null ||
                      getSessionState.data?.userData === undefined
                    ) {
                      setOpenLoginChooserModal(true);
                      return;
                    }

                    if (quantity > 1 && quantity <= 10)
                      setQuantity(quantity - 1);
                  }}
                  className={`w-20 h-full rounded-l outline-none cursor-pointer bg-primary ${
                    quantity === 1 ? "opacity-30 cursor-not-allowed" : ""
                  }`}
                >
                  <span className="m-auto text-2xl font-thin leading-3">−</span>
                </button>

                <input
                  value={quantity}
                  onChange={(event: any) => {
                    if (
                      getSessionState.data?.userData == null ||
                      getSessionState.data?.userData === undefined
                    ) {
                      setOpenLoginChooserModal(true);
                      return;
                    }

                    const value = event.target.value;
                    if (value >= 1 && value <= 10)
                      setQuantity(Math.floor(event.target.value));
                  }}
                  type="number"
                  readOnly
                  className="flex items-center w-full font-semibold text-center outline-none cursor-default leading-2 bg-secondary text-md md:text-base"
                  name="custom-input-number"
                />

                <button
                  onClick={() => {
                    if (
                      getSessionState.data?.userData == null ||
                      getSessionState.data?.userData === undefined
                    ) {
                      setOpenLoginChooserModal(true);
                      return;
                    }
                    if (quantity >= 1 && quantity < 10)
                      setQuantity(quantity + 1);
                  }}
                  className={`w-20 h-full rounded-r cursor-pointer bg-primary ${
                    quantity === 10 ? "opacity-30 cursor-not-allowed" : ""
                  }`}
                >
                  <span className="m-auto text-2xl font-thin leading-3 ">
                    +
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={handleAddToCart}
          className="flex items-center justify-center w-full py-2 space-x-4 font-light bg-primary rounded-b-xl"
        >
          <BsFillCartPlusFill className="text-2xl" />
          <span className="text-2xl font-['Bebas_Neue'] tracking-[3px] font-light mt-1">
            Add to cart
          </span>
        </button>
      </div>

      <LoginChooserModal
        open={openLoginChooserModal}
        onClose={() => {
          setOpenLoginChooserModal(false);
        }}
      />
    </>
  );
}
