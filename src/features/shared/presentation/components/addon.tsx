import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { LoginChooserModal } from "features/popclub/presentation/modals/login-chooser.modal";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import { ProductModel } from "features/shared/core/domain/product.model";
import {
  getSession,
  selectGetSession,
} from "features/shared/presentation/slices/get-session.slice";
import { useEffect, useState } from "react";
import { BsFillCartPlusFill } from "react-icons/bs";
import NumberFormat from "react-number-format";
import {
  addToCartShop,
  selectAddToCartShop,
  AddToCartShopState,
} from "../../../shop/presentation/slices/add-to-cart-shop.slice";
interface AddonProps {
  product: ProductModel;
}

let quantityId: any;

export function Addon(props: AddonProps) {
  const [quantity, setQuantity] = useState(1);
  const getSessionState = useAppSelector(selectGetSession);
  const [openLoginChooserModal, setOpenLoginChooserModal] = useState(false);
  const dispatch = useAppDispatch();
  const addToCartShopState = useAppSelector(selectAddToCartShop);
  const [setDisabled] = useState(true);

  useEffect(() => {
    if (addToCartShopState.status === AddToCartShopState.success) {
      dispatch(getSession());
    }
  }, [addToCartShopState, dispatch]);

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

  const handleAddToCart = () => {
    if (
      getSessionState.data?.userData == null ||
      getSessionState.data?.userData === undefined
    ) {
      setOpenLoginChooserModal(true);
      return;
    }

    dispatch(
      addToCartShop({
        prod_id: props.product.id,
        prod_image_name: props.product.product_image,
        prod_name: props.product.name,
        prod_qty: quantity,
        prod_flavor: -1,
        prod_size: -1,
        prod_price: props.product.price,
        prod_calc_amount: props.product.price * quantity,
        prod_category: props.product.category,
        prod_with_drinks: -1,
        flavors_details: "",
        prod_sku_id: -1,
        prod_sku: -1,
      })
    );
  };

  return (
    <>
      <div className="my-3 mb-6 shadow-md bg-secondary rounded-xl shadow-tertiary">
        <div className="flex p-4 space-x-2">
          <img
            src={`${REACT_APP_DOMAIN_URL}api/assets/images/shared/products/75/${props.product.product_image}`}
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
                  <span className="m-auto text-2xl font-thin leading-3">−</span>
                </button>

                <input
                  value={quantity}
                  type="number"
                  onChange={(e) => {
                    const value = e.target.value;

                    if (
                      getSessionState.data?.userData == null ||
                      getSessionState.data?.userData === undefined
                    ) {
                      clearInterval(quantityId);
                      setOpenLoginChooserModal(true);
                    } else {
                      parseInt(value) >= 10
                        ? setQuantity(10)
                        : setQuantity(parseInt(value));

                      parseInt(value) <= 1
                        ? setQuantity(1)
                        : setQuantity(parseInt(value));
                    }
                  }}
                  className="flex items-center w-full font-semibold text-center outline-none cursor-default leading-2 bg-secondary text-md md:text-base"
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
