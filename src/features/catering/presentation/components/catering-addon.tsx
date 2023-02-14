import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import { ProductModel } from "features/shared/core/domain/product.model";
import { selectGetSession } from "features/shared/presentation/slices/get-session.slice";
import { openLoginChooserModal } from "features/shared/presentation/slices/login-chooser-modal.slice";
import { popUpSnackBar } from "features/shared/presentation/slices/pop-snackbar.slice";
import { BsFillCartPlusFill, BsCheckLg } from "react-icons/bs";
import NumberFormat from "react-number-format";
import { addToCartCatering } from "../slices/add-to-cart-catering.slice";

interface AddonProps {
  isFreeItem: boolean;
  isFreeItemClaimed: boolean;
  isFreeItemButAddToCartFirst: boolean;
  product: ProductModel;
}

export function CateringAddon(props: AddonProps) {
  const getSessionState = useAppSelector(selectGetSession);
  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    if (
      getSessionState.data?.userData == null ||
      getSessionState.data?.userData === undefined
    ) {
      dispatch(openLoginChooserModal({ required: false }));
      return;
    }

    dispatch(
      addToCartCatering({
        prod_id: props.product.id,
        prod_image_name: props.product.product_image,
        prod_name: props.product.name,
        prod_qty: 1,
        prod_price: props.product.price,
        prod_calc_amount: props.product.price,
        prod_category: props.product.category,
        prod_with_drinks: -1,
        flavors_details: "",
        prod_sku_id: -1,
        prod_sku: -1,
        is_free_item: props.isFreeItem,
        prod_type: "main",
      })
    );
  };

  return (
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
              value={props.product.price.toFixed(2)}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"₱"}
            />
          </h5>
          {props.product.free_threshold ? (
            <p className="text-xs leading-4">
              FREE at{" "}
              <NumberFormat
                value={props.product.free_threshold.toFixed(2)}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"₱"}
              />{" "}
              worth of purchase
            </p>
          ) : null}
        </div>
      </div>
      {props.isFreeItem ? (
        props.isFreeItemClaimed ? (
          <button className="flex items-center justify-center w-full py-2 space-x-4 font-light bg-green-900 rounded-b-xl">
            <BsCheckLg className="text-2xl" />
            <span className="text-2xl font-['Bebas_Neue'] tracking-[3px] font-light mt-1">
              Claimed
            </span>
          </button>
        ) : (
          <button
            onClick={handleAddToCart}
            className="flex items-center justify-center w-full py-2 space-x-4 font-light bg-green-700 rounded-b-xl"
          >
            <BsFillCartPlusFill className="text-2xl" />
            <span className="text-2xl font-['Bebas_Neue'] tracking-[3px] font-light mt-1">
              Claim for free
            </span>
          </button>
        )
      ) : props.isFreeItemButAddToCartFirst ? (
        <button
          onClick={() => {
            dispatch(
              popUpSnackBar({
                message:
                  "Add to cart your package before claiming this free item.",
                severity: "error",
              })
            );
          }}
          className="w-full p-2 font-light bg-orange-700 sm:space-x-4 rounded-b-xl"
        >
          <div className="flex items-center justify-center space-x-2 ">
            <BsFillCartPlusFill className="text-2xl" />
            <span className="text-2xl font-['Bebas_Neue'] tracking-[3px] font-light mt-1">
              Claim for free
            </span>
          </div>
          <span className="text-xs font-light ">
            Add to cart the package, before claiming this free item
          </span>
        </button>
      ) : (
        <button
          onClick={handleAddToCart}
          className="flex items-center justify-center w-full py-2 space-x-4 font-light bg-primary rounded-b-xl"
        >
          <BsFillCartPlusFill className="text-2xl" />
          <span className="text-2xl font-['Bebas_Neue'] tracking-[3px] font-light mt-1">
            Add to cart
          </span>
        </button>
      )}
    </div>
  );
}
