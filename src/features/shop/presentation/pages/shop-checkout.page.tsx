import { Link, useLocation } from "react-router-dom";
import { MdDeliveryDining } from "react-icons/md";
import { FaMapMarkerAlt, FaStore } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import {
  getSession,
  GetSessionState,
  selectGetSession,
} from "features/shared/presentation/slices/get-session.slice";
import { FormEvent, useEffect, useRef, useState } from "react";
import NumberFormat from "react-number-format";
import { BiUserCircle } from "react-icons/bi";
import { AiOutlineCheckCircle, AiOutlineCreditCard } from "react-icons/ai";
import {
  checkoutOrders,
  CheckoutOrdersState,
  resetCheckoutOrders,
  selectCheckoutOrders,
} from "../slices/checkout-orders.slice";
import { AddContactModal } from "features/shared/presentation/modals";
import {
  getContacts,
  selectGetContacts,
} from "features/shared/presentation/slices/get-contacts.slice";
import MenuItem from "@mui/material/MenuItem";
import {
  AddContactState,
  selectAddContact,
} from "features/shared/presentation/slices/add-contact.slice";
import { PageTitleAndBreadCrumbs } from "features/shared/presentation/components/page-title-and-breadcrumbs";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import { IoMdClose } from "react-icons/io";
import { removeItemFromCartShop } from "features/shop/presentation/slices/remove-item-from-cart-shop.slice";
import {
  MaterialInput,
  MaterialPhoneInput,
  Media,
} from "features/shared/presentation/components";
import { ShopPaymentMethod } from "../components";
import {
  GetLatestUnexpiredRedeemState,
  selectGetLatestUnexpiredRedeem,
} from "features/popclub/presentation/slices/get-latest-unexpired-redeem.slice";
import {
  getAvailableUserDiscount,
  selectGetAvailableUserDiscount,
} from "features/shared/presentation/slices/get-available-user-discount.slice";
import { getNotifications } from "features/shared/presentation/slices/get-notifications.slice";
import ReactGA from "react-ga";

import {
  getSnackshopInfluencerPromo,
  selectGetSnackshopInfluencerPromo,
  GetSnackshopInfluencerPromoState,
  resetGetSnackshopInfluencerPromoState,
} from "../slices/get-snackshop-influencer-promo.slice";
import { insertShopInitialCheckoutLog } from "../slices/insert-shop-initial-checkout-log.slice";

export function ShopCheckout() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();

  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    eMail: "",
    payops: "",
    phoneNumber: "",
    landmarkAddress: "",
    completeDeliveryAddress: "",
  });

  const [openAddContactModal, setOpenAddContactModal] = useState(false);
  const [cashOnDelivery, setCashOnDelivery] = useState<number>();

  const [referralCode, setReferralCode] = useState("");

  const isDeliveryApplied = useRef(false);
  const getContactsState = useAppSelector(selectGetContacts);
  const addContactState = useAppSelector(selectAddContact);
  const getSessionState = useAppSelector(selectGetSession);
  const checkoutOrdersState = useAppSelector(selectCheckoutOrders);

  const shopInitialCheckoutLogInserted = useRef(false);

  const getLatestUnexpiredRedeemState = useAppSelector(
    selectGetLatestUnexpiredRedeem
  );

  const getAvailableUserDiscountState = useAppSelector(
    selectGetAvailableUserDiscount
  );

  const getSnackshopInfluencerPromoState = useAppSelector(
    selectGetSnackshopInfluencerPromo
  );

  useEffect(() => {
    if (
      getSessionState.status === GetSessionState.success &&
      getLatestUnexpiredRedeemState.status ===
        GetLatestUnexpiredRedeemState.success &&
      shopInitialCheckoutLogInserted.current === false
    ) {
      dispatch(
        insertShopInitialCheckoutLog({
          subtotal: calculateSubTotalPrice(),
          discount: calculateDiscount(),
          deliveryFee: calculateDeliveryFee(),
        })
      );

      shopInitialCheckoutLogInserted.current = true;
    }
  }, [dispatch, getSessionState, getLatestUnexpiredRedeemState]);

  useEffect(() => {
    dispatch(getAvailableUserDiscount());
  }, [dispatch]);

  useEffect(() => {
    dispatch(resetGetSnackshopInfluencerPromoState());
  }, [dispatch]);

  useEffect(() => {
    if (
      checkoutOrdersState.status === CheckoutOrdersState.success &&
      checkoutOrdersState.data
    ) {
      ReactGA.event({
        category: "Snackshop Order",
        action: "Checkout order",
      });
      dispatch(getNotifications());
      navigate(`/delivery/order/${checkoutOrdersState.data.hash}`);
      dispatch(resetCheckoutOrders());
    }
  }, [checkoutOrdersState, dispatch, navigate]);

  useEffect(() => {
    if (addContactState.status === AddContactState.success) {
      dispatch(getSession());
      dispatch(getContacts());
    }
  }, [addContactState, dispatch]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [location]);

  useEffect(() => {
    if (
      getSessionState.status === GetSessionState.success &&
      getSessionState.data
    ) {
      setFormState({
        firstName: getSessionState.data.userData.first_name,
        lastName: getSessionState.data.userData.last_name,
        eMail: getSessionState.data.userData.email,
        payops: "",
        phoneNumber:
          getContactsState.data && getContactsState.data.length > 0
            ? getContactsState.data[0].contact
            : "",
        landmarkAddress: getSessionState.data.customer_address,
        completeDeliveryAddress: "",
      });
    }
  }, [getSessionState, getContactsState]);

  const handleInputChange = (evt: any) => {
    const value = evt.target.value;
    setFormState({
      ...formState,
      [evt.target.name]: value,
    });
  };

  const handleCheckout = (e: FormEvent<HTMLFormElement>) => {
    dispatch(
      checkoutOrders({
        ...formState,
        referralCode:
          getSnackshopInfluencerPromoState.data?.referral_code ?? "",
      })
    );
    e.preventDefault();
  };

  const calculateSubTotalPrice = () => {
    let calculatedPrice = 0;
    const orders = getSessionState.data?.orders;

    if (orders) {
      for (let i = 0; i < orders.length; i++) {
        let order = orders[i];
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

    return calculatedPrice;
  };

  const calculateDeliveryFee = () => {
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
        calculatedPrice += parseFloat(
          getSessionState.data?.redeem_data.deal_promo_price
        );
    }

    if (getSessionState.data && getSessionState.data.distance_rate_price) {
      if (
        getLatestUnexpiredRedeemState.data &&
        getLatestUnexpiredRedeemState.data?.minimum_purchase &&
        getLatestUnexpiredRedeemState.data.minimum_purchase <=
          calculatedPrice &&
        getLatestUnexpiredRedeemState.data.is_free_delivery === 1 &&
        getLatestUnexpiredRedeemState.data.store ===
          getSessionState.data.cache_data?.store_id
      ) {
        isDeliveryApplied.current = true;

        return 0;
      }

      return getSessionState.data.distance_rate_price;
    } else {
      return 0;
    }
  };

  const calculateDiscount = () => {
    let calculatedPrice = 0;

    const orders = getSessionState.data?.orders;

    if (orders) {
      for (let i = 0; i < orders.length; i++) {
        calculatedPrice += orders[i].prod_calc_amount;
      }
    }

    if (getSessionState.data?.redeem_data) {
      if (getSessionState.data.redeem_data.deal_promo_price)
        calculatedPrice += parseFloat(
          getSessionState.data?.redeem_data.deal_promo_price
        );
    }

    if (
      getLatestUnexpiredRedeemState.data ||
      getSnackshopInfluencerPromoState.data?.customer_discount
    ) {
      let discountedPrice = 0;
      if (getLatestUnexpiredRedeemState.data?.promo_discount_percentage)
        discountedPrice =
          calculatedPrice *
          parseFloat(
            getLatestUnexpiredRedeemState.data.promo_discount_percentage
          );

      if (getLatestUnexpiredRedeemState.data?.subtotal_promo_discount)
        discountedPrice =
          calculatedPrice *
          parseFloat(
            getLatestUnexpiredRedeemState.data.subtotal_promo_discount
          );
      if (getSnackshopInfluencerPromoState.data?.customer_discount)
        discountedPrice =
          calculatedPrice *
          parseFloat(getSnackshopInfluencerPromoState.data.customer_discount);

      return discountedPrice;
    }

    return 0;
  };

  const calculateTotalPrice = () => {
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

    if (
      getLatestUnexpiredRedeemState.data ||
      getSnackshopInfluencerPromoState.data
    ) {
      let discountedPrice = 0;
      if (getLatestUnexpiredRedeemState.data?.promo_discount_percentage)
        discountedPrice =
          calculatedPrice *
          parseFloat(
            getLatestUnexpiredRedeemState.data.promo_discount_percentage
          );

      if (getLatestUnexpiredRedeemState.data?.subtotal_promo_discount)
        discountedPrice =
          calculatedPrice *
          parseFloat(
            getLatestUnexpiredRedeemState.data.subtotal_promo_discount
          );

      if (getSnackshopInfluencerPromoState.data?.customer_discount)
        discountedPrice =
          calculatedPrice *
          parseFloat(getSnackshopInfluencerPromoState.data.customer_discount);

      calculatedPrice -= discountedPrice;
    }

    if (getAvailableUserDiscountState.data?.percentage) {
      const percentage = parseFloat(
        getAvailableUserDiscountState.data.percentage
      );

      calculatedPrice -= calculatedPrice * percentage;
    }

    if (cashOnDelivery) {
      calculatedPrice += cashOnDelivery;
    }

    if (getSessionState.data?.distance_rate_price) {
      calculatedPrice += getSessionState.data.distance_rate_price;

      if (
        getLatestUnexpiredRedeemState.data &&
        getLatestUnexpiredRedeemState.data?.minimum_purchase &&
        getLatestUnexpiredRedeemState.data.minimum_purchase <=
          calculatedPrice &&
        getLatestUnexpiredRedeemState.data.is_free_delivery === 1
      ) {
        calculatedPrice -= getSessionState.data.distance_rate_price;
      }
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

  const calculateAvailableUserDiscount = () => {
    let calculatedPrice = 0;
    const orders = getSessionState.data?.orders;

    if (orders) {
      for (let i = 0; i < orders.length; i++) {
        calculatedPrice += orders[i].prod_calc_amount;
      }
    }

    if (getSessionState.data?.redeem_data) {
      if (getSessionState.data.redeem_data.deal_promo_price)
        calculatedPrice += parseFloat(
          getSessionState.data?.redeem_data.deal_promo_price
        );
    }

    if (getAvailableUserDiscountState.data) {
      const percentage = parseFloat(
        getAvailableUserDiscountState.data.percentage
      );
      return (
        <>
          <span>
            {percentage * 100}%{" "}
            {getAvailableUserDiscountState.data.discount_name}:
          </span>
          <span className="text-end">
            -{" "}
            <NumberFormat
              value={(calculatedPrice * percentage).toFixed(2)}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"₱"}
            />
          </span>
        </>
      );
    }

    return null;
  };

  const handlePaymentMethodChange = (payment: string) => {
    setFormState({
      ...formState,
      payops: payment,
    });
    if (
      getSessionState.data &&
      getSessionState.data.cash_delivery &&
      payment === "3"
    ) {
      setCashOnDelivery(parseInt(getSessionState.data.cash_delivery));
    } else {
      setCashOnDelivery(undefined);
    }
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
          deal_products_promo_include_match.obtainable.length &&
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
          <h3 className="flex items-end justify-end flex-1 text-base font-bold ">
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
        <h3 className="flex items-end justify-end flex-1 text-base font-bold ">
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

  const influencerAndCustomerDiscount = () => {
    if (getSnackshopInfluencerPromoState.data) {
      let calculatedPrice = 0;

      const orders = getSessionState.data?.orders;

      if (orders) {
        for (let i = 0; i < orders.length; i++) {
          calculatedPrice += orders[i].prod_calc_amount;
        }
      }

      let influencerDiscount = parseFloat(
        getSnackshopInfluencerPromoState.data.influencer_discount
      );
      influencerDiscount = calculatedPrice * influencerDiscount;

      return (
        <div className="text-sm">
          <span>
            <b>
              {getSnackshopInfluencerPromoState.data.fb_user_name ??
                "" +
                  " " +
                  getSnackshopInfluencerPromoState.data.mobile_user_name ??
                ""}
            </b>{" "}
            will get{" "}
          </span>
          <b>
            <NumberFormat
              value={influencerDiscount.toFixed(2)}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"₱"}
            />
          </b>
        </div>
      );
    }

    return null;
  };

  return (
    <main className="bg-paper">
      <PageTitleAndBreadCrumbs
        home={{
          title: "Snackshop",
          url: "/delivery",
        }}
        className="lg:h-[200px]"
        title="Checkout"
        pageTitles={[
          { name: "Products", url: "/delivery/products" },
          { name: "Checkout" },
        ]}
      />

      <section className="min-h-screen lg:space-x-4 pb-36">
        <div className="lg:-mt-[80px] lg:space-y-8">
          <div className="flex lg:container">
            <div className="flex-1">
              <div className="bg-green-700 h-[0.25rem] relative">
                <div className="absolute rounded-[50%] bg-green-700 text-white font-bold h-[1.625rem] w-[1.625rem] text-center top-[-0.75rem] left-[50%] ml-[-0.8125rem]">
                  1
                </div>
              </div>
              <div className="flex items-center justify-center pl-4 mt-5 space-x-1 text-xs text-secondary lg:text-white lg:pl-0">
                <BiUserCircle className="text-2xl" /> <span>Your Details</span>
              </div>
            </div>

            <div className="flex-1">
              <div className="bg-[#424242] h-[0.25rem] relative">
                <div className="absolute rounded-[50%] text-white font-bold bg-[#424242] h-[1.625rem] w-[1.625rem] text-center top-[-0.75rem] left-[50%] ml-[-0.8125rem]">
                  2
                </div>
              </div>
              <div className="flex items-center justify-center mt-5 space-x-1 text-xs text-secondary lg:text-white">
                <AiOutlineCreditCard className="text-2xl" />{" "}
                <span>Payment</span>
              </div>
            </div>

            <div className="flex-1">
              <div className="bg-[#424242] h-[0.25rem] relative">
                <div className="absolute rounded-[50%] text-white font-bold bg-[#424242] h-[1.625rem] w-[1.625rem] text-center top-[-0.75rem] left-[50%] ml-[-0.8125rem]">
                  3
                </div>
              </div>
              <div className="flex items-center justify-center pr-4 mt-5 space-x-1 text-xs text-secondary lg:text-white lg:pr-0">
                <AiOutlineCheckCircle className="text-2xl" />{" "}
                <span>Complete</span>
              </div>
            </div>
          </div>

          <div className="container">
            {getSessionState.data ? (
              <form
                onSubmit={handleCheckout}
                className="flex flex-col justify-between w-full py-6 mb-10 lg:flex-row"
              >
                <div className="space-y-4 lg:flex-[0_0_55%] lg:max-w-[55%] order-2 lg:order-1 lg:mt-0 mt-4">
                  <MaterialInput
                    colorTheme="black"
                    required
                    label="First Name"
                    name="firstName"
                    fullWidth
                    value={formState.firstName}
                    onChange={handleInputChange}
                  />

                  <MaterialInput
                    colorTheme="black"
                    required
                    label="Last Name"
                    name="lastName"
                    fullWidth
                    value={formState.lastName}
                    onChange={handleInputChange}
                  />

                  <div className="flex flex-col space-y-4 lg:space-x-4 lg:flex-row lg:space-y-0">
                    <div className="flex-1">
                      <MaterialInput
                        colorTheme="black"
                        required
                        label="E-mail"
                        name="eMail"
                        type="email"
                        fullWidth
                        value={formState.eMail}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="flex-1">
                      {getContactsState.data &&
                      getContactsState.data.length > 0 ? (
                        <MaterialInput
                          colorTheme="black"
                          select
                          fullWidth
                          label="Contacts"
                          name="phoneNumber"
                          onChange={handleInputChange}
                          value={formState.phoneNumber}
                          required
                          autoComplete="off"
                        >
                          {getContactsState.data.map((val) => (
                            <MenuItem value={val.contact}>
                              {val.contact}
                            </MenuItem>
                          ))}
                        </MaterialInput>
                      ) : (
                        <MaterialPhoneInput
                          colorTheme="black"
                          fullWidth
                          required
                          onChange={handleInputChange}
                          value={formState.phoneNumber}
                          name="phoneNumber"
                        />
                      )}
                      <button
                        type="button"
                        onClick={() => {
                          setOpenAddContactModal(true);
                        }}
                        className="text-xs underline text-primary underline-offset-4"
                      >
                        Setup your phone number
                      </button>
                    </div>
                  </div>

                  <MaterialInput
                    colorTheme="black"
                    required
                    label="Landmark Address"
                    name="landmarkAddress"
                    fullWidth
                    autoComplete="off"
                    InputProps={{
                      readOnly: true,
                    }}
                    value={formState.landmarkAddress}
                    onChange={() => {}}
                  />

                  <MaterialInput
                    colorTheme="black"
                    required
                    label="Complete Delivery Address"
                    name="completeDeliveryAddress"
                    fullWidth
                    autoComplete="off"
                    value={formState.completeDeliveryAddress}
                    onChange={handleInputChange}
                  />

                  {getSessionState.data.cache_data ? (
                    <>
                      <div className="mt-4 text-secondary lg:mt-0">
                        <h2 className="text-2xl font-['Bebas_Neue'] tracking-[2px]">
                          Handling Method
                        </h2>

                        <ul className="mt-2 space-y-1">
                          <li className="flex items-center space-x-2">
                            <MdDeliveryDining className="text-2xl text-primary" />
                            <h3 className="text-sm">Delivery</h3>
                          </li>
                          <li className="flex items-start space-x-3">
                            <FaStore className="text-lg text-primary" />
                            <h3 className="text-sm">
                              Store:{" "}
                              {getSessionState.data.cache_data.store_name}
                            </h3>
                          </li>
                          <li className="flex items-start space-x-3 ">
                            <FaMapMarkerAlt className="text-lg text-primary" />
                            <h3 className="flex-1 text-sm">
                              Store Address:{" "}
                              {getSessionState.data.cache_data.store_address}
                            </h3>
                          </li>
                        </ul>
                      </div>

                      <div className="mt-4 text-secondary lg:mt-0">
                        <h2 className="text-2xl font-['Bebas_Neue'] tracking-[2px]">
                          Note:
                        </h2>

                        <ul
                          className="mt-2 space-y-2 text-sm notes"
                          dangerouslySetInnerHTML={{
                            __html: getSessionState.data.cache_data?.moh_notes
                              ? getSessionState.data.cache_data.moh_notes
                              : "",
                          }}
                        />
                      </div>
                    </>
                  ) : null}

                  <div className="hidden mt-4 space-y-2 text-secondary lg:mt-0 lg:block">
                    <h2 className="text-2xl font-['Bebas_Neue'] tracking-[2px]">
                      Choose payment method
                    </h2>
                    <ShopPaymentMethod onChange={handlePaymentMethodChange} />

                    {/* <PaymentAccordion /> */}
                  </div>

                  <div className="flex items-center justify-start space-x-1 text-sm text-secondary lg:text-base">
                    <Checkbox color="primary" required />
                    <span>I agree with the </span>
                    <Link
                      to="/delivery/terms-and-conditions"
                      className="text-primary"
                      target="_blank"
                    >
                      Terms & Conditions
                    </Link>
                  </div>

                  <div className="flex flex-col lg:flex-row lg:space-x-4">
                    <button
                      type="button"
                      className="order-2 w-full py-3 mt-4 font-bold text-white uppercase border bg-secondary rounded-xl lg:order-1"
                      onClick={() => {
                        navigate(-1);
                      }}
                    >
                      Go Back
                    </button>

                    <button
                      type="submit"
                      className="order-1 w-full py-3 mt-4 text-white uppercase border bg-button border-secondary rounded-xl lg:order-2"
                    >
                      Checkout
                    </button>
                  </div>
                </div>

                {getSessionState.data.orders ||
                getSessionState.data.redeem_data ? (
                  <div className="space-y-4 lg:flex-[0_0_40%] lg:max-w-[40%] order-1 lg:order-2">
                    <h2 className="font-['Bebas_Neue'] text-3xl  text-secondary tracking-[3px] text-center">
                      Order Summary
                    </h2>

                    {getSessionState.data.orders ? (
                      <div className="max-h-[400px] overflow-y-auto space-y-4 px-[4px] py-[10px]">
                        {getSessionState.data.orders.map((order, i) => (
                          <div
                            key={i}
                            className="flex bg-secondary shadow-lg rounded-[10px] relative "
                          >
                            <Media
                              src={`${REACT_APP_DOMAIN_URL}api/assets/images/shared/products/75/${order.prod_image_name}`}
                              className="rounded-[10px] w-[92px] h-[92px]"
                              alt={order.prod_name}
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
                                <h3 className="text-xs ">
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
                              type="button"
                              className="absolute text-white top-2 right-4 "
                              onClick={() => {
                                dispatch(removeItemFromCartShop(i));
                              }}
                            >
                              <IoMdClose />
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : null}
                    {getSessionState.data.redeem_data ? (
                      <div className="max-h-[400px] overflow-y-auto space-y-4 px-[4px] py-[10px]">
                        <div className="flex bg-secondary shadow-md shadow-tertiary rounded-[10px] relative">
                          <Media
                            src={`${REACT_APP_DOMAIN_URL}api/assets/images/shared/products/75/${getSessionState.data.redeem_data.deal_image_name}`}
                            className="rounded-[10px] w-[92px] h-[92px]"
                            alt={getSessionState.data.redeem_data.deal_name}
                          />
                          <div className="flex flex-col flex-1 px-3 py-2 text-white">
                            <h3 className="text-sm w-[90%] font-bold leading-4">
                              {getSessionState.data.redeem_data.deal_name}
                            </h3>

                            {getSessionState.data.redeem_data
                              .promo_discount_percentage ? (
                              <>
                                <span className="text-xs leading-4">
                                  {getSessionState.data.redeem_data.description}
                                </span>
                              </>
                            ) : null}

                            <span
                              className="text-xs text-tertiary"
                              dangerouslySetInnerHTML={{
                                __html:
                                  getSessionState.data.redeem_data.deal_remarks,
                              }}
                            />
                            {getSessionState.data.redeem_data
                              .deal_promo_price ? (
                              <h3 className="flex items-end justify-end flex-1 text-base">
                                <NumberFormat
                                  value={parseFloat(
                                    getSessionState.data.redeem_data
                                      .deal_promo_price
                                  ).toFixed(2)}
                                  displayType={"text"}
                                  thousandSeparator={true}
                                  prefix={"₱"}
                                />
                              </h3>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    ) : null}

                    <div className="mt-4 space-y-2 text-secondary lg:mt-0 lg:hidden">
                      <hr className="mt-1 mb-2 border-secondary" />
                      <h2 className="text-2xl font-['Bebas_Neue'] tracking-[2px]">
                        Choose payment method
                      </h2>
                      <ShopPaymentMethod onChange={handlePaymentMethodChange} />

                      {/* <PaymentAccordion /> */}
                    </div>

                    <hr className="mt-1 mb-2 border-secondary" />
                    <div className="grid grid-cols-2 text-secondary ">
                      <span>Subtotal:</span>
                      <span className="text-end">
                        <NumberFormat
                          value={calculateSubTotalPrice().toFixed(2)}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"₱"}
                        />
                      </span>
                      <span>Discount:</span>
                      <span className="text-end">
                        -
                        <NumberFormat
                          value={calculateDiscount().toFixed(2)}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"₱"}
                        />
                      </span>

                      {calculateAvailableUserDiscount()}

                      <span>Delivery Fee:</span>
                      <span className="text-end">
                        +
                        <NumberFormat
                          value={calculateDeliveryFee().toFixed(2)}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"₱"}
                        />
                      </span>
                      {cashOnDelivery ? (
                        <>
                          <span>COD charge:</span>
                          <span className="text-end">
                            +{" "}
                            <NumberFormat
                              value={cashOnDelivery.toFixed(2)}
                              displayType={"text"}
                              thousandSeparator={true}
                              prefix={"₱"}
                            />
                          </span>
                        </>
                      ) : null}
                    </div>
                    <div>
                      <div className="flex">
                        <MaterialInput
                          colorTheme="black"
                          required={false}
                          label="Referral Code"
                          name="referralCode"
                          fullWidth
                          value={referralCode}
                          onChange={(e) => {
                            if (
                              getSnackshopInfluencerPromoState.status !==
                              GetSnackshopInfluencerPromoState.success
                            ) {
                              const value = e.target.value;
                              setReferralCode(value);
                            }
                          }}
                          className="rounded-none"
                        />
                        {getSnackshopInfluencerPromoState.data ? (
                          <button
                            type="button"
                            className={`text-white border w-[200px] border-white text-xl flex space-x-2 justify-center items-center bg-green-900 py-2 rounded-r-lg shadow-lg`}
                          >
                            <span className="text-2xl font-['Bebas_Neue'] tracking-[3px] font-light mt-1">
                              Applied
                            </span>
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              dispatch(
                                getSnackshopInfluencerPromo({
                                  referralCode,
                                })
                              );
                            }}
                            type="button"
                            className={`text-white border w-[200px] border-white text-xl flex space-x-2 justify-center items-center bg-[#CC5801] py-2 rounded-r-lg shadow-lg`}
                          >
                            <span className="text-2xl font-['Bebas_Neue'] tracking-[3px] font-light mt-1">
                              Apply
                            </span>
                          </button>
                        )}
                      </div>
                      {influencerAndCustomerDiscount()}
                    </div>

                    <h1 className="text-4xl font-bold text-center text-secondary">
                      {calculateTotalPrice()}
                    </h1>
                  </div>
                ) : null}
              </form>
            ) : null}
          </div>
        </div>
      </section>

      <AddContactModal
        open={openAddContactModal}
        onClose={() => {
          setOpenAddContactModal(false);
        }}
      />
    </main>
  );
}
