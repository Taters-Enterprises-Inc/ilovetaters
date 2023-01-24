import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import { PageTitleAndBreadCrumbs } from "features/shared/presentation/components/page-title-and-breadcrumbs";
import { ProductDetailsAccordion } from "features/shared/presentation/components/product-details-accordion";
import {
  getSession,
  GetSessionState,
  selectGetSession,
} from "features/shared/presentation/slices/get-session.slice";
import { useCallback, useEffect, useRef, useState } from "react";
import { AiFillInfoCircle } from "react-icons/ai";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  changeCateringPackagePrice,
  getCateringPackageDetails,
  GetCateringPackageDetailsState,
  selectGetCateringPackageDetails,
} from "../slices/get-catering-package-details.slice";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper";

import "swiper/css";
import NumberFormat from "react-number-format";
import {
  BsCartX,
  BsFillBagCheckFill,
  BsFillCartPlusFill,
} from "react-icons/bs";
import { MdFastfood, MdStore } from "react-icons/md";
import {
  CateringAddon,
  CateringFlavors,
  CateringProductQuantity,
} from "../components";
import { LoginChooserModal } from "features/popclub/presentation/modals/login-chooser.modal";
import { popUpSnackBar } from "features/shared/presentation/slices/pop-snackbar.slice";
import {
  addToCartCatering,
  AddToCartCateringState,
  selectAddToCartCatering,
} from "../slices/add-to-cart-catering.slice";
import { Addon } from "features/shared/presentation/components";
import { ProductModel } from "features/shared/core/domain/product.model";
import { removeItemFromCartCatering } from "../slices/remove-item-from-cart-catering.slice";
import { IoMdClose } from "react-icons/io";
import { removeItemFromCartShop } from "features/shop/presentation/slices/remove-item-from-cart-shop.slice";
import { CateringStoreChooserModal } from "../modals";
import ReactGA from "react-ga";

const DEFAULT_CAROUSEL = [
  "table_setup",
  "rustic_cart",
  "sporty_cart",
  "mr_poppy",
];

export type CateringFlavorType = {
  [key: string]: {
    name: string;
    quantity: number;
  };
};

export type CateringMultiFlavorsType = {
  [key: string]: CateringFlavorType;
};

export function CateringProduct() {
  const dispatch = useAppDispatch();
  let { hash } = useParams();
  const location = useLocation();

  const [quantity, setQuantity] = useState(1);

  const [openLoginChooserModal, setOpenLoginChooserModal] = useState(false);
  const [openCateringStoreChooserModal, setOpenCateringStoreChooserModal] =
    useState(false);

  const getCateringPackageDetailsState = useAppSelector(
    selectGetCateringPackageDetails
  );
  const getSessionState = useAppSelector(selectGetSession);
  const addToCartCateringState = useAppSelector(selectAddToCartCatering);
  const [currentMultiFlavors, setCurrentMultiFlavors] =
    useState<CateringMultiFlavorsType>({});
  const navigate = useNavigate();

  const checkBaseProduct = (updatedQuantity: number) => {
    if (
      getCateringPackageDetailsState.data &&
      getCateringPackageDetailsState.status ===
        GetCateringPackageDetailsState.success
    ) {
      const productPrices = getCateringPackageDetailsState.data.product_prices;
      for (let i = 0; i < productPrices.length; i++) {
        if (productPrices[i].min_qty <= updatedQuantity) {
          dispatch(
            changeCateringPackagePrice({ price: productPrices[i].price })
          );
        }
      }
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location]);

  useEffect(() => {
    if (hash !== undefined) {
      dispatch(getCateringPackageDetails({ hash }));
      dispatch(getSession());
    }
  }, [location, dispatch, hash]);

  useEffect(() => {
    if (addToCartCateringState.status === AddToCartCateringState.success) {
      ReactGA.event({
        category: "Catering Order",
        action: "Add to cart item",
      });
      dispatch(getSession());
    }
  }, [addToCartCateringState, dispatch]);

  const calculateFreeAddon = () => {
    if (
      getCateringPackageDetailsState.data &&
      getSessionState.status === GetSessionState.success &&
      getSessionState.data &&
      getCateringPackageDetailsState.status ===
        GetCateringPackageDetailsState.success
    ) {
      const addons = getCateringPackageDetailsState.data.addons;
      let freeItem: Array<ProductModel> = [];
      let calculatedPrice = 0;

      const orders = getSessionState.data.orders;
      let existingFreeOrder:
        | undefined
        | {
            index: number;
            data: any;
          };

      if (orders) {
        for (let i = 0; i < orders.length; i++) {
          const order = orders[i];
          calculatedPrice += order.prod_calc_amount;
          if (order.is_free_item) {
            existingFreeOrder = { index: i, data: order };
          }
        }
      }
      const totalPrice =
        getCateringPackageDetailsState.data.product.price * quantity +
        calculatedPrice;

      if (
        existingFreeOrder &&
        existingFreeOrder.data.free_threshold &&
        existingFreeOrder.data.free_threshold >
          getCateringPackageDetailsState.data.product.price * quantity +
            calculatedPrice
      ) {
        dispatch(removeItemFromCartCatering(existingFreeOrder.index));
      }

      if (addons) {
        for (let i = 0; i < addons.length; i++) {
          const freeThreshold = addons[i].free_threshold;
          if (freeThreshold) {
            if (totalPrice >= freeThreshold) {
              freeItem.push(addons[i]);
            }
          }
        }
      }

      if (freeItem.length > 0) {
        return (
          <div className="text-white ">
            🎉 <strong>Claim</strong> FREE{" "}
            <strong>{freeItem[freeItem.length - 1].name}</strong>
          </div>
        );
      }

      return null;
    }

    return null;
  };

  const calculateTotalSavings = () => {
    if (
      getCateringPackageDetailsState.data &&
      getCateringPackageDetailsState.status ===
        GetCateringPackageDetailsState.success &&
      getCateringPackageDetailsState.data.product.base_price &&
      getCateringPackageDetailsState.data.product.base_price !==
        getCateringPackageDetailsState.data.product.price
    ) {
      const totalSavings =
        getCateringPackageDetailsState.data.product.base_price * quantity -
        getCateringPackageDetailsState.data.product.price * quantity;
      return (
        <div className="text-white ">
          total savings:{" "}
          <NumberFormat
            value={totalSavings.toFixed(2)}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"₱"}
          />
        </div>
      );
    }

    return null;
  };

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
            }<br>`;
      }
    });

    return result ? result : undefined;
  };

  const dispatchAddToCartCatering = (callBackSuccess?: () => void) => {
    if (
      getSessionState.data?.userData == null ||
      getSessionState.data?.userData === undefined
    ) {
      setOpenLoginChooserModal(true);
      return;
    }

    if (
      getSessionState.data?.userData == null ||
      getSessionState.data?.userData === undefined
    ) {
      setOpenLoginChooserModal(true);
      return;
    }

    if (
      getCateringPackageDetailsState.status ===
        GetCateringPackageDetailsState.success &&
      getCateringPackageDetailsState.data
    ) {
      if (
        getCateringPackageDetailsState.data?.product_flavor &&
        getCateringPackageDetailsState.data.product_flavor.length
      ) {
        for (
          let i = 0;
          i < getCateringPackageDetailsState.data.product_flavor.length;
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

          if (totalMultiFlavorsQuantity !== quantity) {
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
        addToCartCatering({
          prod_id: getCateringPackageDetailsState.data.product.id,
          prod_image_name:
            getCateringPackageDetailsState.data.product.product_image,
          prod_name: getCateringPackageDetailsState.data.product.name,
          prod_qty: quantity,
          prod_price: getCateringPackageDetailsState.data.product.price,
          prod_calc_amount:
            getCateringPackageDetailsState.data.product.price * quantity,
          prod_category: getCateringPackageDetailsState.data.product.category,
          prod_with_drinks: -1,
          flavors_details: flavors_details,
          prod_sku_id: -1,
          prod_type: "main",
          prod_sku: -1,
        })
      ).then(() => {
        if (callBackSuccess) callBackSuccess();
      });
    }
  };

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

  const pageTitles: Array<{
    name?: string;
    url?: string;
  }> = [];

  if (
    getSessionState.data?.cache_data ||
    getSessionState.data?.customer_address
  ) {
    pageTitles.push({ name: "Products", url: "/shop/products" });
  }
  pageTitles.push({ name: getCateringPackageDetailsState.data?.product.name });

  return (
    <main className="bg-secondary">
      <PageTitleAndBreadCrumbs
        home={{
          title: "Catering",
          url: "/shop",
        }}
        title={getCateringPackageDetailsState.data?.product.name}
        pageTitles={pageTitles}
      />
      <section className="min-h-screen lg:space-x-4 pb-36">
        <div className=" lg:space-y-10 lg:container">
          <div className="bg-secondary pb-20 lg:shadow-lg w-full lg:rounded-[30px] space-y-10">
            <div className="flex flex-col space-y-10 lg:flex-row lg:space-x-10 lg:space-y-0 ">
              <div className="lg:flex-[0_0_55%] lg:max-w-[0_0_55%] lg:h-[600px]">
                <Swiper
                  slidesPerView={"auto"}
                  autoplay={{ delay: 5000 }}
                  modules={[Navigation, Autoplay]}
                  navigation
                  className="w-full"
                >
                  {getCateringPackageDetailsState.data?.product_images.map(
                    (name) => (
                      <SwiperSlide>
                        <img
                          src={`${REACT_APP_DOMAIN_URL}api/assets/images/shared/products/500/${name}`}
                          className="lg:rounded-[20px] w-full h-full object-cover"
                          alt=""
                        />
                      </SwiperSlide>
                    )
                  )}
                  {DEFAULT_CAROUSEL.map((name) => (
                    <SwiperSlide>
                      <img
                        src={`${REACT_APP_DOMAIN_URL}api/assets/images/catering/carousel/${name}.jpg`}
                        className="lg:rounded-[20px] w-full h-full object-cover"
                        alt=""
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              <div className="container flex-1 space-y-10 lg:px-0">
                {getCateringPackageDetailsState.data?.product.add_details ? (
                  <ProductDetailsAccordion
                    title={{
                      name: "Product Info",
                      prefixIcon: <AiFillInfoCircle className="text-3xl" />,
                    }}
                  >
                    <div className="p-4 text-sm">
                      <div
                        className="mt-2 space-y-2 text-sm"
                        dangerouslySetInnerHTML={{
                          __html:
                            getCateringPackageDetailsState.data.product
                              .add_details,
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

                            <h3 className="flex items-end justify-end flex-1 text-base">
                              <NumberFormat
                                value={order.prod_calc_amount.toFixed(2)}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"₱"}
                              />
                            </h3>
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

                <div className="space-y-2">
                  <h2 className="font-['Bebas_Neue'] text-4xl text-white tracking-[2px]">
                    Quantity
                  </h2>

                  <div>
                    <span className="text-base text-white">
                      Note: base price varies on order qty
                    </span>
                    <CateringProductQuantity
                      quantity={quantity}
                      onChange={(action, value) => {
                        switch (action) {
                          case "plus":
                            checkBaseProduct(value);
                            break;
                          case "minus":
                            checkBaseProduct(value);
                            setCurrentMultiFlavors({});
                            break;
                          case "manual-input":
                            checkBaseProduct(value);
                            if (value < quantity) setCurrentMultiFlavors({});
                            break;
                        }
                        setQuantity(value);
                      }}
                      quantityChange={(value) => {
                        setQuantity(parseInt(value));
                      }}
                    />
                    {getCateringPackageDetailsState.data ? (
                      <span className="text-base text-white">
                        base price:{" "}
                        <NumberFormat
                          value={getCateringPackageDetailsState.data.product.price.toFixed(
                            2
                          )}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"₱"}
                        />{" "}
                        x ({quantity})
                      </span>
                    ) : null}
                    {calculateTotalSavings()}
                    {calculateFreeAddon()}
                  </div>

                  {getCateringPackageDetailsState.data?.product.price ? (
                    <h2 className="mt-4 text-4xl text-white">
                      <NumberFormat
                        value={(
                          getCateringPackageDetailsState.data.product.price *
                          quantity
                        ).toFixed(2)}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"₱"}
                      />
                    </h2>
                  ) : null}
                </div>

                {getCateringPackageDetailsState.data?.product_flavor &&
                getCateringPackageDetailsState.data?.product_flavor.length >
                  0 ? (
                  <div>
                    <h2 className="font-['Bebas_Neue'] text-4xl text-white tracking-[2px] mb-4">
                      Choose Flavor
                    </h2>

                    <ul className="space-y-6">
                      {getCateringPackageDetailsState.data?.product_flavor.map(
                        (product_flavor, i) => (
                          <CateringFlavors
                            key={i}
                            currentMultiFlavors={currentMultiFlavors}
                            parent_index={i}
                            parent_name={product_flavor.parent_name}
                            flavors={product_flavor.flavors}
                            productQuantity={quantity}
                            onChange={(updatedMultiFlavors) => {
                              const updateCurrentMultiFlavor = {
                                ...currentMultiFlavors,
                              };

                              updateCurrentMultiFlavor[i] = updatedMultiFlavors;

                              setCurrentMultiFlavors(updateCurrentMultiFlavor);
                            }}
                          />
                        )
                      )}
                    </ul>
                  </div>
                ) : null}

                {getSessionState.data?.cache_data ||
                getSessionState.data?.customer_address ? (
                  <div className="space-y-4">
                    <button
                      onClick={() => {
                        dispatchAddToCartCatering(() => {
                          navigate("/shop/checkout");
                        });
                      }}
                      className="text-white text-xl border border-white flex space-x-2 justify-center items-center bg-[#CC5801] py-2 w-full rounded-lg shadow-lg"
                    >
                      <BsFillBagCheckFill className="text-3xl" />
                      <span className="text-2xl font-['Bebas_Neue'] tracking-[3px] font-light mt-1">
                        Checkout
                      </span>
                    </button>

                    <button
                      onClick={() => {
                        dispatchAddToCartCatering(() => {
                          setQuantity(1);
                          setCurrentMultiFlavors({});
                        });
                      }}
                      className="text-white text-xl border border-white flex space-x-2 justify-center items-center bg-[#CC5801] py-2 w-full rounded-lg shadow-lg"
                    >
                      <BsFillCartPlusFill className="text-3xl" />
                      <span className="text-2xl font-['Bebas_Neue'] tracking-[3px] font-light mt-1">
                        Add to cart
                      </span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <button
                      onClick={() => {
                        setOpenCateringStoreChooserModal(true);
                      }}
                      className="text-white text-xl border border-white flex space-x-2 justify-center items-center bg-[#CC5801] py-2 w-full rounded-lg shadow-lg"
                    >
                      <MdStore className="text-3xl" />
                      <span className="text-2xl font-['Bebas_Neue'] tracking-[3px] font-light mt-1">
                        Select Store
                      </span>
                    </button>
                  </div>
                )}

                {getCateringPackageDetailsState.data?.product_addons &&
                getCateringPackageDetailsState.data.addons.length !== 0 ? (
                  <ProductDetailsAccordion
                    title={{
                      name: "Product Add-ons",
                      prefixIcon: <MdFastfood className="text-3xl" />,
                    }}
                  >
                    <div className="max-h-[500px] overflow-y-auto flex flex-col py-4 px-4">
                      {getCateringPackageDetailsState.data?.product_addons.map(
                        (product, i) => (
                          <Addon
                            key={i}
                            product={product}
                            maxQuantity={99999}
                          />
                        )
                      )}
                    </div>
                  </ProductDetailsAccordion>
                ) : null}

                {getCateringPackageDetailsState.data?.addons &&
                getCateringPackageDetailsState.data.addons.length !== 0 ? (
                  <ProductDetailsAccordion
                    title={{
                      name: "Catering Add-ons",
                      prefixIcon: <MdFastfood className="text-3xl" />,
                    }}
                  >
                    <div className="max-h-[500px] overflow-y-auto flex flex-col py-4 px-4">
                      {getCateringPackageDetailsState.data.addons.map(
                        (product, i) => {
                          if (
                            getCateringPackageDetailsState.data &&
                            getSessionState.data
                          ) {
                            let calculatedPrice = 0;

                            const orders = getSessionState.data.orders;
                            let isFreeItemClaimed = false;

                            if (orders) {
                              for (let i = 0; i < orders.length; i++) {
                                calculatedPrice += orders[i].prod_calc_amount;

                                if (
                                  orders[i].prod_id === product.id &&
                                  orders[i].prod_price === 0
                                ) {
                                  isFreeItemClaimed = true;
                                }
                              }
                            }

                            let isFreeItem = product.free_threshold
                              ? calculatedPrice >= product.free_threshold
                              : false;

                            let isFreeItemButAddToCartFirst =
                              product.free_threshold
                                ? getCateringPackageDetailsState.data.product
                                    .price *
                                    quantity +
                                    calculatedPrice >=
                                  product.free_threshold
                                : false;

                            return (
                              <CateringAddon
                                key={i}
                                product={product}
                                isFreeItem={isFreeItem}
                                isFreeItemButAddToCartFirst={
                                  isFreeItemButAddToCartFirst
                                }
                                isFreeItemClaimed={isFreeItemClaimed}
                              />
                            );
                          }
                          return null;
                        }
                      )}
                    </div>
                  </ProductDetailsAccordion>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </section>
      <LoginChooserModal
        open={openLoginChooserModal}
        onClose={() => {
          setOpenLoginChooserModal(false);
        }}
      />

      <CateringStoreChooserModal
        open={openCateringStoreChooserModal}
        onClose={() => {
          setOpenCateringStoreChooserModal(false);
        }}
      />
    </main>
  );
}
