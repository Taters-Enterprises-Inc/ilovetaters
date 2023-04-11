import {
  removeItemFromCartCatering,
  RemoveItemFromCartCateringState,
  resetRemoveItemFromCartCatering,
  selectRemoveItemFromCartCatering,
} from "features/catering/presentation/slices/remove-item-from-cart-catering.slice";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { forfeitRedeem } from "features/popclub/presentation/slices/forfeit-redeem.slice";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import {
  removeItemFromCartShop,
  RemoveItemFromCartShopState,
  resetRemoveItemFromCartShop,
  selectRemoveItemFromCartShop,
} from "features/shop/presentation/slices/remove-item-from-cart-shop.slice";
import { useEffect } from "react";
import { BsCartX } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import NumberFormat from "react-number-format";
import { getSession, selectGetSession } from "../slices/get-session.slice";
import { ActiveUrl } from "./header-nav";
import { Media } from "./media";

export interface CartListItemProps {
  activeUrl: ActiveUrl;
  onProcessOrder: () => void;
}

export function CartListItem(props: CartListItemProps) {
  const getSessionState = useAppSelector(selectGetSession);
  const dispatch = useAppDispatch();
  const removeItemFromCartShopState = useAppSelector(
    selectRemoveItemFromCartShop
  );
  const removeItemFromCartCateringState = useAppSelector(
    selectRemoveItemFromCartCatering
  );

  useEffect(() => {
    if (
      removeItemFromCartShopState.status === RemoveItemFromCartShopState.success
    ) {
      dispatch(getSession());
      dispatch(resetRemoveItemFromCartShop());
    }
  }, [removeItemFromCartShopState, dispatch]);

  useEffect(() => {
    if (
      removeItemFromCartCateringState.status ===
      RemoveItemFromCartCateringState.success
    ) {
      dispatch(getSession());
      dispatch(resetRemoveItemFromCartCatering());
    }
  }, [removeItemFromCartCateringState, dispatch]);

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
              deal_products_promo_include.product_variant_option_tb_id === null
            ) {
              deal_products_promo_include_match = deal_products_promo_include;

              break;
            } else if (
              deal_products_promo_include.product_id === order.prod_id &&
              deal_products_promo_include.product_variant_option_tb_id
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
                val.product_id === order.prod_id &&
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

            if (
              deal_products_promo_include_match.obtainable.length > 0 &&
              deal_products_promo_include_match.quantity &&
              order.prod_qty >=
                deal_products_promo_include_match.quantity + 1 &&
              obtainableDiscountedPrice &&
              obtainablePrice
            ) {
              calculatedPrice +=
                obtainableDiscountedPrice +
                order.prod_calc_amount -
                obtainablePrice;
            } else {
              calculatedPrice +=
                order.prod_calc_amount -
                order.prod_calc_amount *
                  parseFloat(
                    deal_products_promo_include_match.promo_discount_percentage
                  );
            }
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
        calculatedPrice += parseFloat(
          getSessionState.data?.redeem_data.deal_promo_price
        );
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
          deal_products_promo_include.product_variant_option_tb_id === null
        ) {
          deal_products_promo_include_match = deal_products_promo_include;

          break;
        } else if (
          deal_products_promo_include.product_id === order.prod_id &&
          deal_products_promo_include.product_variant_option_tb_id
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
            val.product_id === order.prod_id &&
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

        if (
          deal_products_promo_include_match.obtainable.length > 0 &&
          deal_products_promo_include_match.quantity &&
          order.prod_qty >= deal_products_promo_include_match.quantity + 1 &&
          obtainableDiscountedPrice &&
          obtainablePrice
        ) {
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
                    order.prod_calc_amount *
                      parseFloat(
                        deal_products_promo_include_match.promo_discount_percentage
                      )
                  ).toFixed(2)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"₱"}
                />
              </h3>
            </div>
          );
        }
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
    <>
      <div className="pb-2">
        <div>
          {(getSessionState.data?.orders === undefined ||
            getSessionState.data?.orders == null ||
            getSessionState.data?.orders.length <= 0) &&
          getSessionState.data?.redeem_data === null ? (
            <div className="flex flex-row items-center justify-center px-10 pt-2 space-x-5 space-y-2">
              <BsCartX className="text-2xl text-secondary" />
              <span className="text-secondary text-md font-['Bebas_Neue'] tracking-[2px]">
                Cart Empty
              </span>
            </div>
          ) : (
            <div>
              <div className="flex flex-row items-center justify-center px-10 pt-2 space-x-5 space-y-2">
                <span className="text-secondary text-md font-['Bebas_Neue']">
                  My Cart
                </span>
              </div>
              <hr className="mt-1 mb-1 border-t-1 border-secondary" />

              <div className="space-y-6 overflow-y-auto max-h-[400px] px-2 py-2">
                {getSessionState.data?.orders !== undefined &&
                getSessionState.data?.orders !== null &&
                getSessionState.data?.orders.length > 0 ? (
                  <>
                    {getSessionState.data.orders.map((order, i) => (
                      <div
                        key={i}
                        className="flex bg-secondary rounded-[10px] relative pr-10"
                      >
                        <Media
                          src={`${REACT_APP_DOMAIN_URL}api/assets/images/shared/products/75/${order.prod_image_name}`}
                          className="rounded-[10px] w-[92px] h-[92px]"
                          alt={order.prod_name}
                        />
                        <div className="flex flex-col flex-1 px-3 py-2 text-white">
                          <h3 className="w-full text-sm font-bold leading-4">
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
                            switch (props.activeUrl) {
                              case "SNACKSHOP":
                                dispatch(removeItemFromCartShop(i));

                                break;
                              case "CATERING":
                                dispatch(removeItemFromCartCatering(i));

                                break;
                            }
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
                    <Media
                      src={`${REACT_APP_DOMAIN_URL}api/assets/images/shared/products/75/${getSessionState.data.redeem_data.deal_image_name}`}
                      className="rounded-[10px] w-[92px] h-[92px]"
                      alt={getSessionState.data.redeem_data.deal_name}
                    />
                    <div className="flex flex-col flex-1 px-3 py-2 text-white">
                      <h3 className="w-full text-sm font-bold leading-4">
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
                            value={parseFloat(
                              getSessionState.data.redeem_data.deal_promo_price
                            ).toFixed(2)}
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

              <hr className="mt-1 mb-1 border-t-1 border-secondary" />

              <div className="px-5 space-y-2">
                <div className="flex justify-between">
                  <span className="text-secondary">Total:</span>
                  <span className="font-bold text-secondary">
                    {calculateOrdersPrice()}
                  </span>
                </div>
                <button
                  onClick={() => {
                    props.onProcessOrder();
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
    </>
  );
}
