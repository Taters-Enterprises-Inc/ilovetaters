import {
  AiFillInfoCircle,
  AiOutlineMinus,
  AiOutlinePlus,
} from "react-icons/ai";
import { TbTruckDelivery } from "react-icons/tb";
import { MdFastfood, MdStore } from "react-icons/md";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { BsCartX, BsFillCartPlusFill } from "react-icons/bs";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import {
  changeProductPrice,
  getProductDetails,
  GetProductDetailsState,
  selectGetProductDetails,
} from "../slices/get-product-details.slice";
import { useEffect, useState, useRef, ChangeEvent } from "react";
import { Addon } from "../../../shared/presentation/components/addon";
import NumberFormat from "react-number-format";

import {
  getSession,
  selectGetSession,
} from "features/shared/presentation/slices/get-session.slice";
import Radio from "@mui/material/Radio";
import { ShopPeopleAlsoBoughtCarousel } from "../carousels";
import { BsFillBagCheckFill } from "react-icons/bs";
import { LoginChooserModal } from "features/popclub/presentation/modals/login-chooser.modal";
import {
  getProductSku,
  GetProductSkuState,
  selectGetProductSku,
} from "../slices/get-product-sku.slice";
import { ProductDetailsAccordion } from "features/shared/presentation/components/product-details-accordion";
import { PageTitleAndBreadCrumbs } from "features/shared/presentation/components/page-title-and-breadcrumbs";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper";

import "swiper/css";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import {
  addToCartShop,
  AddToCartShopState,
  selectAddToCartShop,
} from "../slices/add-to-cart-shop.slice";
import {
  addToCartCheckoutShop,
  AddToCartCheckoutShopState,
  resetAddToCartCheckout,
  selectAddToCartCheckoutShop,
} from "../slices/add-to-cart-checkout-shop.slice";
import { popUpSnackBar } from "features/shared/presentation/slices/pop-snackbar.slice";
import { removeItemFromCartShop } from "../slices/remove-item-from-cart-shop.slice";
import { IoMdClose } from "react-icons/io";
import {
  ForfeitRedeemState,
  resetForfeitRedeemStateStatus,
  selectForfeitRedeem,
} from "features/popclub/presentation/slices/forfeit-redeem.slice";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import { ShopStoreChooserModal } from "features/shop/presentation/modals/shop-store-chooser.modal";
import { ShopProductFlavor } from "../components";
import ReactGA from "react-ga";

let quantityId: any;

export type ShopFlavorType = {
  [key: string]: {
    name: string;
    quantity: number;
  };
};

export type ShopMultiFlavorType = {
  [key: string]: ShopFlavorType;
};

export function ShopProduct() {
  const dispatch = useAppDispatch();
  const getProductDetailsState = useAppSelector(selectGetProductDetails);
  const getProductSkuState = useAppSelector(selectGetProductSku);
  const [openLoginChooserModal, setOpenLoginChooserModal] = useState(false);
  const getSessionState = useAppSelector(selectGetSession);
  const addToCartShopState = useAppSelector(selectAddToCartShop);
  const addToCartCheckoutShopState = useAppSelector(
    selectAddToCartCheckoutShop
  );
  const forfeitRedeemState = useAppSelector(selectForfeitRedeem);

  const [resetMultiFlavors, setResetMultiFlavors] = useState(false);
  const [setDisabled] = useState(true);
  const [quantity, setQuantity] = useState(1);

  const timerRef = useRef(0);
  const isLongPress = useRef(false);
  const isQuantityNull = useRef(false);

  const [currentSize, setCurrentSize] = useState<string>("");
  const [currentMultiFlavors, setCurrentMultiFlavors] =
    useState<ShopMultiFlavorType>({});

  const [shopOpenStoreChooserModal, setShopOpenStoreChooserModal] =
    useState(false);

  const navigate = useNavigate();

  let { hash } = useParams();

  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location]);

  useEffect(() => {
    if (resetMultiFlavors === true) {
      setResetMultiFlavors(false);
    }
  }, [resetMultiFlavors]);

  useEffect(() => {
    if (forfeitRedeemState.status === ForfeitRedeemState.success) {
      setCurrentSize("");
      dispatch(resetForfeitRedeemStateStatus());
    }
  }, [dispatch, forfeitRedeemState]);

  useEffect(() => {
    if (hash !== undefined) {
      dispatch(getProductDetails({ hash }));
    }
  }, [location, dispatch, hash, forfeitRedeemState]);

  useEffect(() => {
    if (
      getProductSkuState.status === GetProductSkuState.success &&
      getProductSkuState.data
    ) {
      dispatch(
        changeProductPrice({
          price: getProductSkuState.data.price,
        })
      );
    }
  }, [getProductSkuState, dispatch]);

  useEffect(() => {
    if (addToCartShopState.status === AddToCartShopState.success) {
      ReactGA.event({
        category: "Snackshop Order",
        action: "Add to cart item",
      });
      dispatch(getSession());
    }
  }, [addToCartShopState, dispatch]);

  useEffect(() => {
    if (
      addToCartCheckoutShopState.status === AddToCartCheckoutShopState.success
    ) {
      ReactGA.event({
        category: "Snackshop Order",
        action: "Add to cart item",
      });
      dispatch(getSession());
      navigate("/delivery/checkout");
      dispatch(resetAddToCartCheckout());
    }
  }, [addToCartCheckoutShopState, navigate, dispatch]);

  useEffect(() => {
    if (
      getProductDetailsState.status &&
      getProductDetailsState.data &&
      getProductDetailsState.data.product_size &&
      getProductDetailsState.data.product_size.length > 0 &&
      getProductDetailsState.data.product.product_hash === hash &&
      currentSize === ""
    ) {
      setCurrentSize(getProductDetailsState.data.product_size[0].id.toString());
    }
  }, [getProductDetailsState, currentSize, hash]);

  const calculateOrdersPrice = () => {
    let calculatedPrice = 0;
    const orders = getSessionState.data?.orders;

    if (orders) {
      for (let i = 0; i < orders.length; i++) {
        calculatedPrice += orders[i].prod_calc_amount;
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

  function handleOnClick() {
    if (isLongPress.current === true) {
      return;
    }
  }

  function handleOnMouseUp() {
    clearTimeout(timerRef.current);
    clearInterval(quantityId);

    if (quantity > 1) {
      if (
        getProductDetailsState.data &&
        getProductDetailsState.data?.product.num_flavor > 0
      ) {
        setCurrentMultiFlavors({});
        setResetMultiFlavors(true);
      }
    }
  }

  function handleOnMouseDown(action: string) {
    isQuantityNull.current = false;
    if (
      getSessionState.data?.userData == null ||
      getSessionState.data?.userData === undefined
    ) {
      clearInterval(quantityId);
      setOpenLoginChooserModal(true);
    } else {
      pressTimer(action);
    }
  }

  function pressTimer(action: string) {
    isLongPress.current = false;

    action === "add"
      ? setQuantity(() => {
          return isNaN(quantity) ? 1 : quantity + 1;
        })
      : setQuantity(quantity - 1);

    timerRef.current = window.setTimeout(() => {
      handleOnLongPress(action);
      isLongPress.current = true;
    }, 300);
  }

  function handleOnLongPress(action: string) {
    let counter = isNaN(quantity) ? 1 : quantity;

    quantityId = setInterval(() => {
      if (action === "add") counter += 1;
      else counter -= 1;

      if (counter >= 10) {
        clearTimeout(timerRef.current);
        clearInterval(quantityId);
        setQuantity(10);
      } else if (counter <= 1) {
        clearTimeout(timerRef.current);
        clearInterval(quantityId);
        setQuantity(1);
      } else {
        setQuantity(counter);
      }
    }, 100);
  }

  const createFlavorDetails = (): string | undefined => {
    if (currentMultiFlavors === undefined) return undefined;
    let result: string | undefined;

    Object.keys(currentMultiFlavors).forEach((key) => {
      const multiFlavorsArray: Array<{
        name: string;
        quantity: number;
      }> = Object.values(currentMultiFlavors[key]);

      for (let i = 0; i < multiFlavorsArray.length; i++) {
        if (multiFlavorsArray[i].quantity > 0)
          result =
            (result === undefined ? "" : result) +
            `<strong>${multiFlavorsArray[i].quantity.toString()}</strong> - ${
              multiFlavorsArray[i].name
            }<br/>`;
      }
    });

    return result ? result : undefined;
  };

  const handleAddToCartCheckout = () => {
    if (
      getSessionState.data?.userData == null ||
      getSessionState.data?.userData === undefined
    ) {
      setOpenLoginChooserModal(true);
      return;
    }

    if (
      getProductDetailsState.status === GetProductDetailsState.success &&
      getProductDetailsState.data
    ) {
      if (
        getProductDetailsState.data?.product_flavor &&
        getProductDetailsState.data.product.num_flavor > 0 &&
        getProductDetailsState.data.product_flavor.length > 0
      ) {
        for (
          let i = 0;
          i < getProductDetailsState.data.product_flavor.length;
          i++
        ) {
          let totalMultiFlavorsQuantity = 0;

          if (currentMultiFlavors[i] === undefined) {
            dispatch(
              popUpSnackBar({
                message: "Please meet the required number of flavors.",
                severity: "error",
              })
            );

            return;
          }

          Object.keys(currentMultiFlavors[i]).forEach(function (key) {
            const currentFlavor = currentMultiFlavors[i];
            totalMultiFlavorsQuantity += currentFlavor[key].quantity;
          });

          if (
            totalMultiFlavorsQuantity !==
            quantity * getProductDetailsState.data.product.num_flavor
          ) {
            dispatch(
              popUpSnackBar({
                message: "Please meet the required number of flavors.",
                severity: "error",
              })
            );

            return;
          }
        }
      }

      let flavors_details = createFlavorDetails();

      dispatch(
        addToCartCheckoutShop({
          prod_id: getProductDetailsState.data.product.id,
          prod_image_name: getProductDetailsState.data.product.product_image,
          prod_name: getProductDetailsState.data.product.name,
          prod_qty: quantity,
          prod_size: currentSize,
          prod_price: getProductDetailsState.data.product.price,
          prod_calc_amount:
            getProductDetailsState.data.product.price * quantity,
          prod_category: getProductDetailsState.data.product.category,
          promo_discount_percentage:
            getProductDetailsState.data.product.promo_discount_percentage,
          prod_with_drinks: -1,
          flavors_details: flavors_details,
          prod_sku_id: -1,
          prod_sku: -1,
          prod_type: "main",
        })
      );
    }
  };

  const handleAddToCart = () => {
    if (
      getSessionState.data?.userData == null ||
      getSessionState.data?.userData === undefined
    ) {
      setOpenLoginChooserModal(true);
      return;
    }

    if (
      getProductDetailsState.status === GetProductDetailsState.success &&
      getProductDetailsState.data
    ) {
      if (
        getProductDetailsState.data?.product_flavor &&
        getProductDetailsState.data.product.num_flavor > 0 &&
        getProductDetailsState.data.product_flavor.length > 0
      ) {
        for (
          let i = 0;
          i < getProductDetailsState.data.product_flavor.length;
          i++
        ) {
          let totalMultiFlavorsQuantity = 0;

          if (currentMultiFlavors[i] === undefined) {
            dispatch(
              popUpSnackBar({
                message: "Please meet the required number of flavors.",
                severity: "error",
              })
            );

            return;
          }

          Object.keys(currentMultiFlavors[i]).forEach(function (key) {
            const currentFlavor = currentMultiFlavors[i];
            totalMultiFlavorsQuantity += currentFlavor[key].quantity;
          });

          if (
            totalMultiFlavorsQuantity !==
            quantity * getProductDetailsState.data.product.num_flavor
          ) {
            dispatch(
              popUpSnackBar({
                message: "Please meet the required number of flavors.",
                severity: "error",
              })
            );

            return;
          }
        }
      }

      let flavors_details = createFlavorDetails();

      dispatch(
        addToCartShop({
          prod_id: getProductDetailsState.data.product.id,
          prod_image_name: getProductDetailsState.data.product.product_image,
          prod_name: getProductDetailsState.data.product.name,
          prod_qty: quantity,
          prod_size: currentSize,
          prod_price: getProductDetailsState.data.product.price,
          prod_calc_amount:
            getProductDetailsState.data.product.price * quantity,
          prod_category: getProductDetailsState.data.product.category,
          promo_discount_percentage:
            getProductDetailsState.data.product.promo_discount_percentage,
          prod_with_drinks: -1,
          flavors_details: flavors_details,
          prod_sku_id: -1,
          prod_sku: -1,
          prod_type: "main",
        })
      );
    }
  };

  const handleSizeAndFlavorChange = (size: string) => {
    if (getProductDetailsState.data) {
      dispatch(
        getProductSku({
          prod_flavor: "",
          prod_size: size,
        })
      );
    }
  };

  const pageTitles: Array<{
    name?: string;
    url?: string;
  }> = [];

  if (
    getSessionState.data?.cache_data ||
    getSessionState.data?.customer_address
  ) {
    pageTitles.push({ name: "Products", url: "/delivery/products" });
  }
  pageTitles.push({ name: getProductDetailsState.data?.product.name, url: "" });

  return (
    <main className="bg-secondary">
      <PageTitleAndBreadCrumbs
        home={{
          title: "Snackshop",
          url: "/delivery",
        }}
        title={getProductDetailsState.data?.product.name}
        pageTitles={pageTitles}
      />

      <section className="min-h-screen lg:space-x-4 pb-36">
        <div className="lg:space-y-10 lg:container">
          <div className="bg-secondary pb-20 w-full lg:rounded-[30px] space-y-10">
            <div className="flex flex-col space-y-10 lg:flex-row lg:space-x-10 lg:space-y-0 ">
              <div className="lg:flex-[0_0_55%] lg:max-w-[0_0_55%] lg:h-[600px]">
                <Swiper
                  slidesPerView={"auto"}
                  autoplay={{ delay: 5000 }}
                  modules={[Navigation, Autoplay]}
                  navigation
                  className="w-full"
                >
                  {getProductDetailsState.data?.product_images.map((name) => (
                    <SwiperSlide>
                      <img
                        src={`${REACT_APP_DOMAIN_URL}api/assets/images/shared/products/500/${name}`}
                        className="lg:rounded-[20px] w-full h-full object-cover"
                        alt=""
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              <div className="container flex-1 space-y-10 lg:px-0">
                {getProductDetailsState.data?.product.add_details ? (
                  <ProductDetailsAccordion
                    title={{
                      name: "Product Info",
                      prefixIcon: <AiFillInfoCircle className="text-3xl" />,
                    }}
                  >
                    <div
                      className="p-4 text-sm"
                      dangerouslySetInnerHTML={{
                        __html: getProductDetailsState.data.product.add_details,
                      }}
                    />
                  </ProductDetailsAccordion>
                ) : null}

                {getProductDetailsState.data?.product.delivery_details ? (
                  <ProductDetailsAccordion
                    title={{
                      name: "Delivery Details",
                      prefixIcon: <TbTruckDelivery className="text-3xl" />,
                    }}
                  >
                    <div className="p-4 text-sm">
                      <div
                        dangerouslySetInnerHTML={{
                          __html:
                            getProductDetailsState.data.product
                              .delivery_details,
                        }}
                      />
                    </div>
                  </ProductDetailsAccordion>
                ) : null}

                {getSessionState.data?.orders !== undefined &&
                getSessionState.data?.orders !== null &&
                getSessionState.data?.orders.length > 0 ? (
                  <ProductDetailsAccordion
                    title={{
                      name: "Cart Summary",
                      prefixIcon: <BsCartX className="text-3xl" />,
                    }}
                  >
                    <div className="space-y-6 overflow-y-auto max-h-[400px] px-[14px] py-[10px]">
                      {getSessionState.data.orders.map((order, i) => (
                        <div key={i} className="relative flex">
                          <img
                            src={`${REACT_APP_DOMAIN_URL}api/assets/images/shared/products/75/${order.prod_image_name}`}
                            className="rounded-[10px] w-[75px] h-[75px]"
                            alt=""
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
                              dispatch(removeItemFromCartShop(i));
                            }}
                          >
                            <IoMdClose />
                          </button>
                        </div>
                      ))}
                    </div>

                    <div className="px-4 py-2 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-lg text-white">Total:</span>
                        <span className="text-lg font-bold text-white">
                          {calculateOrdersPrice()}
                        </span>
                      </div>
                    </div>
                  </ProductDetailsAccordion>
                ) : null}

                <div>
                  <h2 className="font-['Bebas_Neue'] text-4xl text-white tracking-[2px]">
                    Quantity
                  </h2>

                  <div className="h-[60px] w-full mt-2">
                    <div className="relative flex flex-row w-full h-full mt-1 text-white bg-transparent border-2 border-white rounded-lg">
                      <button
                        onClick={() =>
                          quantity <= 1 || isQuantityNull.current
                            ? setDisabled
                            : handleOnClick()
                        }
                        onMouseDown={() =>
                          quantity <= 1
                            ? setDisabled
                            : handleOnMouseDown("minus")
                        }
                        onMouseUp={handleOnMouseUp}
                        onTouchStart={() =>
                          quantity <= 1
                            ? setDisabled
                            : handleOnMouseDown("minus")
                        }
                        onTouchEnd={(e) => {
                          e.preventDefault();
                          handleOnMouseUp();
                        }}
                        className={`h-full w-[150px] rounded-l cursor-pointer outline-none bg-primary ${
                          quantity <= 1 || isQuantityNull.current
                            ? "opacity-30 cursor-not-allowed"
                            : ""
                        }`}
                      >
                        <AiOutlineMinus className="mx-8 text-3xl " />
                      </button>

                      <input
                        value={quantity}
                        type="number"
                        onChange={(e) => {
                          let value = e.target.value;
                          isQuantityNull.current = false;

                          if (
                            getSessionState.data?.userData == null ||
                            getSessionState.data?.userData === undefined
                          ) {
                            clearInterval(quantityId);
                            setOpenLoginChooserModal(true);
                          } else {
                            if (isNaN(parseInt(value)) || value === "0") {
                              isQuantityNull.current = true;
                            }
                            if (parseInt(value) >= 10) {
                              setQuantity(10);
                            } else if (parseInt(value) < 0) {
                              setQuantity(1);
                            } else {
                              setQuantity(parseInt(value));
                            }
                          }
                        }}
                        min="1"
                        max="10"
                        className="flex items-center w-full text-3xl font-semibold text-center outline-none cursor-default leading-2 bg-secondary text-md md:text-base"
                        name="custom-input-number"
                      />

                      <button
                        onClick={() =>
                          quantity >= 10 ? setDisabled : handleOnClick()
                        }
                        onMouseDown={() =>
                          quantity >= 10
                            ? setDisabled
                            : handleOnMouseDown("add")
                        }
                        onMouseUp={handleOnMouseUp}
                        onTouchStart={() =>
                          quantity >= 10
                            ? setDisabled
                            : handleOnMouseDown("add")
                        }
                        onTouchEnd={(e) => {
                          e.preventDefault();

                          handleOnMouseUp();
                        }}
                        className={`h-full w-[150px] rounded-r cursor-pointer bg-primary ${
                          quantity >= 10 ? "opacity-30 cursor-not-allowed" : ""
                        }`}
                      >
                        <AiOutlinePlus className="mx-8 text-3xl" />
                      </button>
                    </div>
                  </div>
                </div>

                {getProductDetailsState.data?.product
                  .promo_discount_percentage ? (
                  <div>
                    <h2 className="mt-4 text-2xl text-white line-through">
                      <NumberFormat
                        value={(
                          getProductDetailsState.data?.product.price * quantity
                        ).toFixed(2)}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"₱"}
                      />
                    </h2>
                    {getProductDetailsState.data?.product.price ? (
                      <h2 className="text-4xl text-white">
                        <NumberFormat
                          value={(
                            (getProductDetailsState.data.product.price -
                              getProductDetailsState.data.product.price *
                                parseFloat(
                                  getProductDetailsState.data.product
                                    .promo_discount_percentage
                                )) *
                            quantity
                          ).toFixed(2)}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"₱"}
                        />
                      </h2>
                    ) : null}
                  </div>
                ) : (
                  <>
                    {getProductDetailsState.data?.product.price ? (
                      <h2 className="mt-4 text-4xl text-white">
                        <NumberFormat
                          value={(
                            getProductDetailsState.data.product.price * quantity
                          ).toFixed(2)}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"₱"}
                        />
                      </h2>
                    ) : null}
                  </>
                )}

                {getProductDetailsState.data?.product_size &&
                getProductDetailsState.data?.product_size.length > 0 ? (
                  <div>
                    <h2 className="font-['Bebas_Neue'] text-4xl text-white tracking-[2px]">
                      Choose Size
                    </h2>
                    <FormControl>
                      <RadioGroup
                        value={currentSize}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
                          const sizeId = (event.target as HTMLInputElement)
                            .value;

                          setCurrentSize(sizeId);
                          handleSizeAndFlavorChange(sizeId);
                        }}
                      >
                        {getProductDetailsState.data?.product_size.map(
                          (size, i) => {
                            return (
                              <FormControlLabel
                                key={i}
                                value={size.id}
                                control={
                                  <Radio
                                    color="tertiary"
                                    sx={{ color: "white" }}
                                  />
                                }
                                label={
                                  <span className="!text-white">
                                    {size.name}
                                  </span>
                                }
                              />
                            );
                          }
                        )}
                      </RadioGroup>
                    </FormControl>
                  </div>
                ) : null}

                {getProductDetailsState.data?.product_flavor.map(
                  (flavor, i) => (
                    <>
                      {getProductDetailsState.data ? (
                        <ShopProductFlavor
                          key={i}
                          numberOfFlavors={
                            getProductDetailsState.data.product.num_flavor
                          }
                          productQuantity={quantity}
                          currentMultiFlavor={currentMultiFlavors[i]}
                          flavor={flavor}
                          onChangeMultiFlavor={(updatedMultiFlavors) => {
                            const updateCurrentMultiFlavor = {
                              ...currentMultiFlavors,
                            };

                            updateCurrentMultiFlavor[i] = updatedMultiFlavors;

                            setCurrentMultiFlavors(updateCurrentMultiFlavor);
                          }}
                        />
                      ) : null}
                    </>
                  )
                )}

                {getSessionState.data?.cache_data ||
                getSessionState.data?.customer_address ? (
                  <>
                    <div className="space-y-4">
                      <button
                        onClick={() =>
                          isQuantityNull.current
                            ? setDisabled
                            : handleAddToCartCheckout()
                        }
                        className={`text-white border border-white text-xl flex space-x-2 justify-center items-center bg-[#CC5801] py-2 w-full rounded-lg shadow-lg ${
                          isQuantityNull.current
                            ? "opacity-30 cursor-not-allowed"
                            : ""
                        }`}
                      >
                        <BsFillBagCheckFill className="text-3xl" />
                        <span className="text-2xl font-['Bebas_Neue'] tracking-[3px] font-light mt-1">
                          Checkout
                        </span>
                      </button>

                      <button
                        onClick={() =>
                          isQuantityNull.current
                            ? setDisabled
                            : handleAddToCart()
                        }
                        className={`text-white border border-white text-xl flex space-x-2 justify-center items-center bg-[#CC5801] py-2 w-full rounded-lg shadow-lg ${
                          isQuantityNull.current
                            ? "opacity-30 cursor-not-allowed"
                            : ""
                        }`}
                      >
                        <BsFillCartPlusFill className="text-3xl" />
                        <span className="text-2xl font-['Bebas_Neue'] tracking-[3px] font-light mt-1">
                          Add to cart
                        </span>
                      </button>
                    </div>

                    {getProductDetailsState.data?.addons ? (
                      <ProductDetailsAccordion
                        title={{
                          name: "Product Add-ons",
                          prefixIcon: <MdFastfood className="text-3xl" />,
                        }}
                      >
                        <div className="max-h-[300px] overflow-y-auto flex flex-col py-4 px-4">
                          {getProductDetailsState.data?.addons.map(
                            (product, i) => (
                              <Addon
                                key={i}
                                product={product}
                                maxQuantity={10}
                              />
                            )
                          )}
                        </div>
                      </ProductDetailsAccordion>
                    ) : null}
                  </>
                ) : (
                  <div className="space-y-4">
                    <button
                      onClick={() => {
                        setShopOpenStoreChooserModal(true);
                      }}
                      className="text-white border border-white text-xl flex space-x-2 justify-center items-center bg-[#CC5801] py-2 w-full rounded-lg shadow-lg"
                    >
                      <MdStore className="text-3xl" />
                      <span className="text-2xl font-['Bebas_Neue'] tracking-[3px] font-light mt-1">
                        Select Store
                      </span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {getProductDetailsState.data?.suggested_products &&
            getProductDetailsState.data?.suggested_products.length > 0 ? (
              <div className="container space-y-3">
                <h1 className="font-['Bebas_Neue'] tracking-[2px] text-xl text-white text-center ">
                  People Also Bought
                </h1>
                <ShopPeopleAlsoBoughtCarousel
                  products={getProductDetailsState.data?.suggested_products}
                />
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <LoginChooserModal
        open={openLoginChooserModal}
        onClose={() => {
          setOpenLoginChooserModal(false);
        }}
      />

      <ShopStoreChooserModal
        open={shopOpenStoreChooserModal}
        onClose={() => {
          setShopOpenStoreChooserModal(false);
        }}
        onDefaultStoreSelectHandler={() => {
          if (hash) {
            dispatch(getProductDetails({ hash }));
          }
        }}
      />
    </main>
  );
}
