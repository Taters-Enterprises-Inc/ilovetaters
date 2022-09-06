import { AiFillInfoCircle } from "react-icons/ai";
import { TbTruckDelivery } from "react-icons/tb";
import { MdFastfood } from "react-icons/md";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { BsFillCartPlusFill } from "react-icons/bs";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import {
  changeProductPrice,
  getProductDetails,
  GetProductDetailsState,
  selectGetProductDetails,
} from "../slices/get-product-details.slice";
import { useEffect, useState } from "react";
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
  QuantityInput,
  SnackbarAlert,
} from "features/shared/presentation/components";
import {
  addToCartShop,
  AddToCartShopState,
  selectAddToCartShop,
} from "../slices/add-to-cart-shop.slice";
import { popUpSnackBar } from "features/shared/presentation/slices/pop-snackbar.slice";

export function ShopProduct() {
  const dispatch = useAppDispatch();
  const getProductDetailsState = useAppSelector(selectGetProductDetails);
  const getProductSkuState = useAppSelector(selectGetProductSku);
  const [openLoginChooserModal, setOpenLoginChooserModal] = useState(false);
  const getSessionState = useAppSelector(selectGetSession);
  const addToCartShopState = useAppSelector(selectAddToCartShop);
  const [resetMultiFlavors, setResetMultiFlavors] = useState(false);

  const [quantity, setQuantity] = useState(1);

  const [currentSize, setCurrentSize] = useState<number | undefined>();
  const [currentFlavor, setCurrentFlavor] = useState<number | undefined>();
  const [currentMultiFlavors, setCurrentMultiFlavors] = useState<any>();
  const [totalMultiFlavorsQuantity, setTotalMultiFlavorsQuantity] =
    useState<number>(0);

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
    if (hash !== undefined) {
      dispatch(getProductDetails({ hash }));
      dispatch(getSession());
    }
  }, [location, dispatch, hash]);

  useEffect(() => {
    if (
      getProductDetailsState.status &&
      getProductDetailsState.data &&
      getProductDetailsState.data.product_size &&
      getProductDetailsState.data.product_size.length > 0 &&
      getProductDetailsState.data.product.product_hash === hash &&
      currentSize === undefined
    ) {
      setCurrentSize(getProductDetailsState.data.product_size[0].id);
    }
  }, [getProductDetailsState, currentSize, hash]);

  useEffect(() => {
    if (
      getProductDetailsState.status &&
      getProductDetailsState.data &&
      getProductDetailsState.data.product_flavor &&
      getProductDetailsState.data.product_flavor.length > 0 &&
      getProductDetailsState.data.product.product_hash === hash &&
      currentFlavor === undefined &&
      getProductDetailsState.data.product.num_flavor === 1
    ) {
      setCurrentFlavor(getProductDetailsState.data.product_flavor[0].id);
    }
  }, [getProductDetailsState, currentFlavor, hash]);

  useEffect(() => {
    if (
      getProductSkuState.status === GetProductSkuState.success &&
      getProductSkuState.data
    ) {
      dispatch(
        changeProductPrice({ price: parseInt(getProductSkuState.data.price) })
      );
    }
  }, [getProductSkuState, dispatch]);

  useEffect(() => {
    if (addToCartShopState.status === AddToCartShopState.success) {
      dispatch(getSession());
    }
  }, [addToCartShopState, dispatch]);

  const createFlavorDetails = (): string | undefined => {
    if (currentMultiFlavors === undefined) return undefined;
    const multiFlavorsArray: Array<{
      name: string;
      quantity: number;
    }> = Object.values(currentMultiFlavors);
    let result: string = "<br/>";

    for (let i = 0; i < multiFlavorsArray.length; i++) {
      if (multiFlavorsArray[i].quantity > 0)
        result =
          (result === undefined ? "" : result) +
          `<span>(${multiFlavorsArray[i].quantity.toString()}) ${
            multiFlavorsArray[i].name
          }</span><br/>`;
    }
    return result === "<br/>" ? undefined : result;
  };

  const dispatchAddToCart = (callBackSuccess?: () => void) => {
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
        getProductDetailsState.data.product.num_flavor > 1 &&
        totalMultiFlavorsQuantity !==
          getProductDetailsState.data.product.num_flavor * quantity
      ) {
        dispatch(
          popUpSnackBar({
            message: "Please meet the required number of flavors.",
            severity: "error",
          })
        );
        return;
      }

      let flavors_details = createFlavorDetails();

      if (callBackSuccess) callBackSuccess();

      dispatch(
        addToCartShop({
          prod_id: getProductDetailsState.data.product.id,
          prod_image_name: getProductDetailsState.data.product.product_image,
          prod_name: getProductDetailsState.data.product.name,
          prod_qty: quantity,
          prod_flavor: currentFlavor,
          prod_size: currentSize,
          prod_price: getProductDetailsState.data.product.price,
          prod_calc_amount:
            getProductDetailsState.data.product.price * quantity,
          prod_category: getProductDetailsState.data.product.category,
          prod_with_drinks: -1,
          flavors_details: flavors_details,
          prod_sku_id: -1,
          prod_sku: -1,
        })
      );
    }
  };

  const handleSizeAndFlavorChange = (
    size: number | undefined,
    flavor: number | undefined
  ) => {
    if (getProductDetailsState.data) {
      dispatch(
        getProductSku({
          prod_flavor: flavor ? flavor : -1,
          prod_size: size ? size : -1,
        })
      );
    }
  };
  return (
    <>
      <PageTitleAndBreadCrumbs
        home={{
          title: "Snackshop",
          url: "/shop",
        }}
        title={getProductDetailsState.data?.product.name}
        pageTitles={[
          { name: "Products", url: "/shop/products" },
          { name: getProductDetailsState.data?.product.name, url: "" },
        ]}
      />

      <section className="min-h-screen lg:space-x-4 pb-36">
        <div className="lg:-mt-[80px] lg:space-y-10 lg:container">
          <div className="bg-primary pb-20 lg:shadow-lg w-full lg:rounded-[30px] mb-10 lg:p-10 space-y-10">
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
                        src={`${REACT_APP_DOMAIN_URL}api/assets/images/shared/products/500/${name}.jpg`}
                        className="lg:rounded-[20px] w-full h-full object-cover"
                        alt=""
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              <div className="container flex-1 space-y-10 lg:px-0">
                {getProductDetailsState.data?.product.description ? (
                  <ProductDetailsAccordion
                    title={{
                      name: "Product Info",
                      prefixIcon: <AiFillInfoCircle className="text-3xl" />,
                    }}
                  >
                    <div className="p-4 text-sm">
                      {getProductDetailsState.data.product.description}
                    </div>
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

                {getProductDetailsState.data?.addons ? (
                  <ProductDetailsAccordion
                    title={{
                      name: "Product Add-ons",
                      prefixIcon: <MdFastfood className="text-3xl" />,
                    }}
                  >
                    <div className="max-h-[300px] overflow-y-auto flex flex-col py-4 px-4">
                      {getProductDetailsState.data?.addons.map((product, i) => (
                        <Addon key={i} product={product} />
                      ))}
                    </div>
                  </ProductDetailsAccordion>
                ) : null}

                {getProductDetailsState.data?.product_size &&
                getProductDetailsState.data?.product_size.length > 0 ? (
                  <div>
                    <h2 className="font-['Bebas_Neue'] text-4xl text-white tracking-[2px]">
                      Choose Size
                    </h2>

                    <ul>
                      {getProductDetailsState.data?.product_size.map(
                        (size, i) => {
                          return (
                            <li key={i} className="flex items-center">
                              <Radio
                                id={size.id.toString()}
                                color="tertiary"
                                checked={size.id === currentSize}
                                onChange={() => {
                                  setCurrentSize(size.id);
                                  handleSizeAndFlavorChange(
                                    size.id,
                                    currentFlavor
                                  );
                                }}
                              />
                              <label
                                htmlFor={size.id.toString()}
                                className="text-white"
                              >
                                {size.name}
                              </label>
                            </li>
                          );
                        }
                      )}
                    </ul>
                  </div>
                ) : null}

                {getProductDetailsState.data &&
                getProductDetailsState.data.product_flavor &&
                getProductDetailsState.data.product &&
                getProductDetailsState.data.product_flavor.length > 0 ? (
                  <div>
                    <h2 className="font-['Bebas_Neue'] text-4xl text-white tracking-[2px]">
                      Choose Flavor
                    </h2>
                    <ul>
                      {getProductDetailsState.data.product_flavor.map(
                        (flavor, i) => {
                          if (getProductDetailsState.data) {
                            return (
                              <>
                                {getProductDetailsState.data.product
                                  .num_flavor > 1 ? (
                                  <li key={i}>
                                    <span className="text-sm text-white">
                                      {flavor.name}
                                    </span>
                                    <QuantityInput
                                      reset={resetMultiFlavors}
                                      min={0}
                                      disableAdd={
                                        getProductDetailsState.data.product
                                          .num_flavor *
                                          quantity -
                                          totalMultiFlavorsQuantity ===
                                        0
                                      }
                                      onChange={(val, action) => {
                                        if (currentMultiFlavors) {
                                          currentMultiFlavors[flavor.id] = {
                                            name: flavor.name,
                                            quantity: val,
                                          };

                                          setCurrentMultiFlavors(
                                            currentMultiFlavors
                                          );
                                        } else {
                                          const temp: any = {};
                                          temp[flavor.id] = {
                                            name: flavor.name,
                                            quantity: val,
                                          };
                                          setCurrentMultiFlavors(temp);
                                        }
                                        setTotalMultiFlavorsQuantity(
                                          totalMultiFlavorsQuantity +
                                            (action === "plus" ? +1 : -1)
                                        );
                                      }}
                                    />
                                  </li>
                                ) : (
                                  <li key={i} className="flex items-center">
                                    <Radio
                                      id={flavor.id.toString()}
                                      color="tertiary"
                                      checked={flavor.id === currentFlavor}
                                      onChange={() => {
                                        setCurrentFlavor(flavor.id);
                                        handleSizeAndFlavorChange(
                                          currentSize,
                                          flavor.id
                                        );
                                      }}
                                    />
                                    <label
                                      htmlFor={flavor.id.toString()}
                                      className="text-white"
                                    >
                                      {flavor.name}
                                    </label>
                                  </li>
                                )}
                              </>
                            );
                          }

                          return null;
                        }
                      )}
                    </ul>
                  </div>
                ) : null}

                <div>
                  <h2 className="font-['Bebas_Neue'] text-4xl text-white tracking-[2px]">
                    Quantity
                  </h2>

                  <div className="h-[60px] w-full mt-2">
                    <div className="relative flex flex-row w-full h-full mt-1 text-white bg-transparent border-2 border-white rounded-lg">
                      <button
                        onClick={() => {
                          if (
                            getSessionState.data?.userData == null ||
                            getSessionState.data?.userData === undefined
                          ) {
                            setOpenLoginChooserModal(true);
                            return;
                          }

                          if (quantity > 1) {
                            setQuantity(quantity - 1);

                            if (
                              getProductDetailsState.data &&
                              getProductDetailsState.data?.product.num_flavor >
                                1
                            ) {
                              setCurrentMultiFlavors(undefined);
                              setTotalMultiFlavorsQuantity(0);
                              setResetMultiFlavors(true);
                            }
                          }
                        }}
                        className={`h-full w-[150px] rounded-l cursor-pointer outline-none bg-primary ${
                          quantity === 1 ? "opacity-30 cursor-not-allowed" : ""
                        }`}
                      >
                        <span className="m-auto text-5xl font-thin leading-3 lg:leading-0">
                          −
                        </span>
                      </button>

                      <input
                        value={quantity}
                        readOnly
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
                        min="1"
                        max="10"
                        className="flex items-center w-full text-3xl font-semibold text-center outline-none cursor-default leading-2 bg-secondary text-md md:text-base"
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
                        className={`h-full w-[150px] rounded-r cursor-pointer bg-primary ${
                          quantity === 10 ? "opacity-30 cursor-not-allowed" : ""
                        }`}
                      >
                        <span className="m-auto text-5xl font-thin leading-3 lg:leading-0">
                          +
                        </span>
                      </button>
                    </div>
                  </div>
                </div>

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

                <div className="space-y-4">
                  <button
                    onClick={() => {
                      dispatchAddToCart(() => {
                        navigate("/shop/checkout");
                      });
                    }}
                    className="text-white border border-white text-xl flex space-x-2 justify-center items-center bg-[#CC5801] py-2 w-full rounded-lg shadow-lg"
                  >
                    <BsFillBagCheckFill className="text-3xl" />
                    <span className="text-2xl font-['Bebas_Neue'] tracking-[3px] font-light mt-1">
                      Checkout
                    </span>
                  </button>

                  <button
                    onClick={() => {
                      dispatchAddToCart();
                    }}
                    className="text-white border border-white text-xl flex space-x-2 justify-center items-center bg-[#CC5801] py-2 w-full rounded-lg shadow-lg"
                  >
                    <BsFillCartPlusFill className="text-3xl" />
                    <span className="text-2xl font-['Bebas_Neue'] tracking-[3px] font-light mt-1">
                      Add to cart
                    </span>
                  </button>
                </div>
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
    </>
  );
}
