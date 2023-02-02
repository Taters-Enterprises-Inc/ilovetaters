import { ListItemText, MenuItem } from "@mui/material";
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
        const discountPercentage = orders[i].promo_discount_percentage;
        const discount = discountPercentage
          ? orders[i].prod_calc_amount * discountPercentage
          : 0;
        calculatedPrice += orders[i].prod_calc_amount - discount;
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
                        <img
                          src={`${REACT_APP_DOMAIN_URL}api/assets/images/shared/products/75/${order.prod_image_name}`}
                          className="rounded-[10px] w-[92px] h-[92px]"
                          alt=""
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
                          {order.promo_discount_percentage ? (
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
                                      order.promo_discount_percentage
                                  ).toFixed(2)}
                                  displayType={"text"}
                                  thousandSeparator={true}
                                  prefix={"₱"}
                                />
                              </h3>
                            </div>
                          ) : (
                            <h3 className="flex items-end justify-end flex-1 text-base">
                              <NumberFormat
                                value={order.prod_calc_amount.toFixed(2)}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"₱"}
                              />
                            </h3>
                          )}
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
                    <img
                      src={`${REACT_APP_DOMAIN_URL}api/assets/images/shared/products/75/${getSessionState.data.redeem_data.deal_image_name}`}
                      className="rounded-[10px] w-[92px] h-[92px]"
                      alt=""
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
