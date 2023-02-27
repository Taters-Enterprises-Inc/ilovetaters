import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { forfeitRedeem } from "features/popclub/presentation/slices/forfeit-redeem.slice";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import {
  getSession,
  selectGetSession,
} from "features/shared/presentation/slices/get-session.slice";
import { useEffect } from "react";
import { BsCartX } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import NumberFormat from "react-number-format";
import { useNavigate } from "react-router-dom";
import {
  removeItemFromCartShop,
  RemoveItemFromCartShopState,
  resetRemoveItemFromCartShop,
  selectRemoveItemFromCartShop,
} from "../slices/remove-item-from-cart-shop.slice";

interface ShopCartModalProps {
  open: boolean;
  onClose: () => void;
}

export function ShopCartModal(props: ShopCartModalProps) {
  const getSessionState = useAppSelector(selectGetSession);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const removeItemFromCartShopState = useAppSelector(
    selectRemoveItemFromCartShop
  );

  useEffect(() => {
    if (
      removeItemFromCartShopState.status === RemoveItemFromCartShopState.success
    ) {
      dispatch(getSession());
      dispatch(resetRemoveItemFromCartShop());
    }
  }, [removeItemFromCartShopState]);

  if (props.open) {
    document.body.classList.add("overflow-hidden");
  } else {
    document.body.classList.remove("overflow-hidden");
    return null;
  }

  const calculateOrdersPrice = () => {
    let calculatedPrice = 0;
    const orders = getSessionState.data?.orders;

    if (orders) {
      for (let i = 0; i < orders.length; i++) {
        const order = orders[i];
        const discountPercentage = order.promo_discount_percentage;
        const discount = discountPercentage
          ? order.prod_calc_amount * discountPercentage
          : 0;
        const deal_products_promo_includes =
          getSessionState.data?.redeem_data?.deal_products_promo_include;

        if (deal_products_promo_includes) {
          let deal_products_promo_include_match = null;

          for (let i = 0; i < deal_products_promo_includes.length; i++) {
            const deal_products_promo_include = deal_products_promo_includes[i];

            if (
              deal_products_promo_include.product_id === order.prod_id &&
              deal_products_promo_include.product_variant_option_tb_id &&
              order.prod_qty >= deal_products_promo_include.quantity + 1
            ) {
              deal_products_promo_include_match = deal_products_promo_include;

              break;
            }
          }

          if (deal_products_promo_include_match) {
            let addedObtainable: Array<{
              product_id: number;
              price: number;
              product_variant_option_tb_id: number;
              promo_discount_percentage: string;
            }> = [];
            let obtainableDiscountedPrice = 0;
            let obtainablePrice = 0;

            for (
              let y = 0;
              y < deal_products_promo_include_match.obtainable.length;
              y++
            ) {
              const val = deal_products_promo_include_match.obtainable[y];

              if (
                val.price &&
                val.promo_discount_percentage &&
                !addedObtainable.some(
                  (value) => value.product_id === val.product_id
                )
              ) {
                obtainableDiscountedPrice +=
                  val.price -
                  val.price * parseFloat(val.promo_discount_percentage);
                obtainablePrice += val.price;

                addedObtainable.push(val);
              }
            }
            calculatedPrice +=
              obtainableDiscountedPrice +
              order.prod_calc_amount -
              obtainablePrice;
          } else {
            calculatedPrice += order.prod_calc_amount - discount;
          }
        } else {
          calculatedPrice += order.prod_calc_amount - discount;
        }
      }
    }

    if (getSessionState.data?.redeem_data) {
      if (getSessionState.data.redeem_data.deal_promo_price)
        calculatedPrice += getSessionState.data?.redeem_data.deal_promo_price;
    }

    return (
      <NumberFormat
        value={calculatedPrice.toFixed(2)}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"₱"}
      />
    );
  };

  const calculateOrderPrice = (order: {
    prod_id: number;
    prod_image_name: string;
    prod_name: string;
    prod_qty: number;
    prod_price: number;
    prod_calc_amount: number;
    prod_flavor?: string;
    prod_flavor_id?: number;
    prod_with_drinks?: number;
    prod_size?: string;
    prod_size_id?: number;
    prod_multiflavors?: string;
    prod_sku_id?: number;
    prod_sku?: number;
    prod_discount?: number;
    prod_category: number;
    is_free_item?: number;
    free_threshold?: number;
    promo_discount_percentage: number | null;
  }) => {
    const deal_products_promo_includes =
      getSessionState.data?.redeem_data?.deal_products_promo_include;

    if (deal_products_promo_includes) {
      let deal_products_promo_include_match = null;

      for (let i = 0; i < deal_products_promo_includes.length; i++) {
        const deal_products_promo_include = deal_products_promo_includes[i];

        if (
          deal_products_promo_include.product_id === order.prod_id &&
          deal_products_promo_include.product_variant_option_tb_id &&
          order.prod_qty >= deal_products_promo_include.quantity + 1
        ) {
          deal_products_promo_include_match = deal_products_promo_include;

          break;
        }
      }

      if (deal_products_promo_include_match) {
        let addedObtainable: Array<{
          product_id: number;
          price: number;
          product_variant_option_tb_id: number;
          promo_discount_percentage: string;
        }> = [];
        let obtainableDiscountedPrice = 0;
        let obtainablePrice = 0;

        for (
          let y = 0;
          y < deal_products_promo_include_match.obtainable.length;
          y++
        ) {
          const val = deal_products_promo_include_match.obtainable[y];

          if (
            val.price &&
            val.promo_discount_percentage &&
            !addedObtainable.some(
              (value) => value.product_id === val.product_id
            )
          ) {
            obtainableDiscountedPrice +=
              val.price - val.price * parseFloat(val.promo_discount_percentage);
            obtainablePrice += val.price;

            addedObtainable.push(val);
          }
        }

        return (
          <div>
            <h3 className="flex items-end justify-end flex-1 text-sm line-through">
              <NumberFormat
                value={order.prod_calc_amount.toFixed(2)}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"₱"}
              />
            </h3>
            <h3 className="flex items-end justify-end flex-1 text-base">
              <NumberFormat
                value={(
                  obtainableDiscountedPrice +
                  order.prod_calc_amount -
                  obtainablePrice
                ).toFixed(2)}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"₱"}
              />
            </h3>
          </div>
        );
      } else {
        return (
          <h3 className="flex items-end justify-end flex-1 text-base">
            <NumberFormat
              value={order.prod_calc_amount.toFixed(2)}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"₱"}
            />
          </h3>
        );
      }
    } else if (order.promo_discount_percentage) {
      return (
        <div>
          <h3 className="flex items-end justify-end flex-1 text-sm line-through">
            <NumberFormat
              value={order.prod_calc_amount.toFixed(2)}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"₱"}
            />
          </h3>
          <h3 className="flex items-end justify-end flex-1 text-base">
            <NumberFormat
              value={(
                order.prod_calc_amount -
                order.prod_calc_amount * order.promo_discount_percentage
              ).toFixed(2)}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"₱"}
            />
          </h3>
        </div>
      );
    } else {
      return (
        <h3 className="flex items-end justify-end flex-1 text-base">
          <NumberFormat
            value={order.prod_calc_amount.toFixed(2)}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"₱"}
          />
        </h3>
      );
    }
  };

  return (
    <div className="fixed inset-0 z-30 flex items-start justify-center overflow-auto bg-black bg-opacity-30 backdrop-blur-sm">
      <div className="bg-white border-secondary border-2 px-4 pt-[30px] pb-3 mb-[200px] lg:mb-0 round w-[90%] lg:w-[400px] mt-10 relative rounded-[10px]">
        <button
          className="absolute text-2xl text-secondary top-2 right-4 "
          onClick={() => {
            document.body.classList.remove("overflow-hidden");
            props.onClose();
          }}
        >
          <IoMdClose />
        </button>

        {(getSessionState.data?.orders === undefined ||
          getSessionState.data?.orders == null ||
          getSessionState.data?.orders.length <= 0) &&
        getSessionState.data?.redeem_data === null ? (
          <div className="flex flex-col items-center justify-center space-y-2">
            <BsCartX className="text-secondary text-7xl" />
            <span className="text-secondary text-4xl font-['Bebas_Neue'] tracking-[2px]">
              Cart Empty
            </span>
          </div>
        ) : (
          <div>
            <h1 className="text-secondary text-3xl font-['Bebas_Neue'] tracking-[2px] text-center border-secondary border-2 rounded-t-2xl py-2 my-4">
              My Cart
            </h1>

            <div className="space-y-6 overflow-y-auto max-h-[400px] px-[4px] py-[10px]">
              {getSessionState.data?.orders !== undefined &&
              getSessionState.data?.orders !== null &&
              getSessionState.data?.orders.length > 0 ? (
                <>
                  {getSessionState.data.orders.map((order, i) => (
                    <div
                      key={i}
                      className="flex bg-secondary rounded-[10px] relative"
                    >
                      <img
                        src={`${REACT_APP_DOMAIN_URL}api/assets/images/shared/products/75/${order.prod_image_name}`}
                        className="rounded-[10px] w-[92px] h-[92px]"
                        alt={order.prod_name}
                        onError={({ currentTarget }) => {
                          currentTarget.onerror = null;
                          currentTarget.src = `${REACT_APP_DOMAIN_URL}api/assets/images/shared/image_not_found/blank.jpg`;
                        }}
                      />
                      <div className="flex flex-col flex-1 px-3 py-2 text-white">
                        <h3 className="text-sm w-[90%] font-bold leading-4">
                          {order.prod_size} {order.prod_name}
                        </h3>
                        <h3 className="text-xs">
                          Quantity:{" "}
                          <span className="text-tertiary">
                            {order.prod_qty}
                          </span>
                        </h3>
                        {order.prod_flavor ? (
                          <h3 className="text-xs">
                            Flavor:{" "}
                            <span className="text-tertiary">
                              {order.prod_flavor}
                            </span>
                          </h3>
                        ) : null}

                        {order.prod_multiflavors ? (
                          <h3 className="text-xs">
                            Flavor:
                            <br />
                            <span
                              className="text-tertiary"
                              dangerouslySetInnerHTML={{
                                __html: order.prod_multiflavors,
                              }}
                            />
                          </h3>
                        ) : null}
                        {calculateOrderPrice(order)}
                      </div>
                      <button
                        className="absolute text-white top-2 right-4 "
                        onClick={() => {
                          dispatch(removeItemFromCartShop(i));
                        }}
                      >
                        <IoMdClose />
                      </button>
                    </div>
                  ))}
                </>
              ) : null}

              {getSessionState.data?.redeem_data ? (
                <div className="flex bg-secondary shadow-md shadow-tertiary rounded-[10px] relative">
                  <img
                    src={`${REACT_APP_DOMAIN_URL}api/assets/images/shared/products/75/${getSessionState.data.redeem_data.deal_image_name}`}
                    className="rounded-[10px] w-[92px] h-[92px]"
                    alt={getSessionState.data.redeem_data.deal_name}
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null;
                      currentTarget.src = `${REACT_APP_DOMAIN_URL}api/assets/images/shared/image_not_found/blank.jpg`;
                    }}
                  />
                  <div className="flex flex-col flex-1 px-3 py-2 text-white">
                    <h3 className="text-sm w-[90%] font-bold leading-4">
                      {getSessionState.data.redeem_data.deal_name}
                    </h3>
                    <h3 className="text-xs">
                      Quantity:{" "}
                      <span className="text-tertiary">
                        {getSessionState.data.redeem_data.deal_qty}
                      </span>
                    </h3>

                    {getSessionState.data.redeem_data.deal_remarks ? (
                      <h3 className="text-xs">
                        Flavor:
                        <br />
                        <span
                          className="text-tertiary"
                          dangerouslySetInnerHTML={{
                            __html:
                              getSessionState.data.redeem_data.deal_remarks,
                          }}
                        />
                      </h3>
                    ) : null}
                    {getSessionState.data.redeem_data.deal_promo_price ? (
                      <h3 className="flex items-end justify-end flex-1 text-base">
                        <NumberFormat
                          value={getSessionState.data.redeem_data.deal_promo_price.toFixed(
                            2
                          )}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"₱"}
                        />
                      </h3>
                    ) : null}
                  </div>
                  <button
                    className="absolute text-white top-2 right-4 "
                    onClick={() => {
                      dispatch(forfeitRedeem());
                    }}
                  >
                    <IoMdClose />
                  </button>
                </div>
              ) : null}
            </div>

            <hr className="mt-6 mb-2 border-t-1 border-secondary" />

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-secondary">Total:</span>
                <span className="font-bold text-secondary">
                  {calculateOrdersPrice()}
                </span>
              </div>

              <button
                onClick={() => {
                  props.onClose();
                  navigate("/delivery/checkout");
                }}
                className="w-full py-2 text-lg text-white border rounded-lg bg-button border-secondary"
              >
                Process Orders
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
