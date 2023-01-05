import {
  useAppDispatch,
  useAppSelector,
  useQuery,
} from "features/config/hooks";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import { ProductDetailsAccordion } from "features/shared/presentation/components/product-details-accordion";
import {
  getSession,
  GetSessionState,
  selectGetSession,
} from "features/shared/presentation/slices/get-session.slice";
import {
  getProductDetails,
  selectGetProductDetails,
} from "features/shop/presentation/slices/get-product-details.slice";
import { useEffect, useState } from "react";
import { BsFillBagCheckFill, BsFillCartPlusFill } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import { MdFastfood } from "react-icons/md";
import NumberFormat from "react-number-format";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CateringAddon } from "../components";
import { CateringPackageCustomizationQuantityFlavorModal } from "../modals";
import {
  addToCartCateringProducts,
  AddToCartCateringProductsState,
  resetAddToCartCateringProductsState,
  selectAddToCartCateringProducts,
} from "../slices/add-to-cart-catering-products.slice";
import {
  AddToCartCateringState,
  selectAddToCartCatering,
} from "../slices/add-to-cart-catering.slice";
import {
  getCateringCategoryProducts,
  selectGetCateringCategoryProducts,
} from "../slices/get-catering-category-products.slice";
import ReactGA from "react-ga";
import { Addon } from "features/shared/presentation/components";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";

import { Autoplay, Navigation } from "swiper";
import { PageTitleAndBreadCrumbs } from "features/shared/presentation/components/page-title-and-breadcrumbs";

export interface CustomizePackageProduct {
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
  flavors_details?: string;
  prod_sku_id?: number;
  prod_sku?: number;
  prod_discount?: number;
  prod_category: number;
  prod_type: "main" | "addon" | "product";
  promo_discount_percentage: string | null;
}

export function CateringBuildYourOwnPackage() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const query = useQuery();

  const hash = query.get("hash");

  const [customizePackage, setCustomizePackage] = useState<
    Array<CustomizePackageProduct>
  >([]);

  const [
    openCateringPackageCustomizationQuantityFlavor,
    setOpenCateringPackageCustomizationQuantityFlavor,
  ] = useState(false);

  const getSessionState = useAppSelector(selectGetSession);
  const getCateringCategoryProductsState = useAppSelector(
    selectGetCateringCategoryProducts
  );
  const getProductDetailsState = useAppSelector(selectGetProductDetails);
  const addToCartCateringProductsState = useAppSelector(
    selectAddToCartCateringProducts
  );
  const addToCartCateringState = useAppSelector(selectAddToCartCatering);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location]);

  useEffect(() => {
    if (addToCartCateringState.status === AddToCartCateringState.success) {
      ReactGA.event({
        category: "Catering Order",
        action: "Add to cart item",
      });
      dispatch(getSession());
    }
  }, [addToCartCateringState, dispatch]);

  useEffect(() => {
    if (
      addToCartCateringProductsState.status ===
      AddToCartCateringProductsState.success
    ) {
      ReactGA.event({
        category: "Catering Order",
        action: "Add to cart item",
      });

      navigate("/shop/products");
      dispatch(getSession());
      dispatch(resetAddToCartCateringProductsState());
    }
  }, [addToCartCateringProductsState, dispatch]);

  useEffect(() => {
    if (hash) {
      dispatch(getProductDetails({ hash })).then(() => {
        setOpenCateringPackageCustomizationQuantityFlavor(true);
      });
    }
  }, [dispatch, hash]);

  useEffect(() => {
    if (
      getSessionState.status === GetSessionState.success &&
      getSessionState.data &&
      getSessionState.data.cache_data?.region_id
    ) {
      dispatch(
        getCateringCategoryProducts({
          region_id: getSessionState.data.cache_data.region_id,
        })
      );
    }
  }, [getSessionState, dispatch]);

  const calculateTotalQuantity = () => {
    let totalQuantity = 0;

    for (let i = 0; i < customizePackage.length; i++) {
      totalQuantity += customizePackage[i].prod_qty;
    }

    return totalQuantity;
  };

  const calculateTotalPackagePrice = () => {
    let calculatedPackagePrice = 0;

    for (let i = 0; i < customizePackage.length; i++) {
      calculatedPackagePrice += customizePackage[i].prod_calc_amount;
    }

    return calculatedPackagePrice;
  };

  const spliceIntoChunks = (arr: Array<any>, chunkSize: number) => {
    const res = [];
    while (arr.length > 0) {
      const chunk = arr.splice(0, chunkSize);
      res.push(chunk);
    }
    return res;
  };

  return (
    <>
      <main className="min-h-screen bg-primary">
        <PageTitleAndBreadCrumbs
          home={{
            title: "Catering",
            url: "/shop",
          }}
          title="Build your own package"
          pageTitles={[
            { name: "Products", url: "/shop/products" },
            { name: "Build your own package" },
          ]}
        />
        <section className="container pt-8 pb-64 mx-auto">
          <div
            className={`${
              customizePackage.length > 0
                ? "flex justify-start items-start flex-col sm:flex-row sm:space-x-4"
                : null
            } `}
          >
            <div className="m-0 ml-[-12px] lg:ml-0 flex-1">
              {customizePackage.length > 0 ? (
                <Swiper
                  slidesPerView={"auto"}
                  modules={[Navigation, Autoplay]}
                  navigation
                  autoplay={{ delay: 5000 }}
                  className="w-[103%] sm:w-[102%] lg:w-full "
                >
                  {getCateringCategoryProductsState.data?.products.map(
                    (category, i) => {
                      var _2x2 = spliceIntoChunks(
                        [...category.category_products],
                        4
                      );

                      var _3x2 = spliceIntoChunks(
                        [...category.category_products],
                        6
                      );

                      var _4x2 = spliceIntoChunks(
                        [...category.category_products],
                        8
                      );

                      return (
                        <>
                          {_2x2.map((chunk, i) => {
                            return (
                              <SwiperSlide
                                key={i}
                                className={`lg:hidden pb-2 px-3 `}
                              >
                                <div className="grid grid-cols-2 gap-4">
                                  {chunk.map((product, i) => (
                                    <Link
                                      key={i}
                                      to={`?hash=${product.hash}`}
                                      className="bg-secondary shadow-tertiary flex flex-col shadow-md rounded-[10px] text-white h-full"
                                    >
                                      <img
                                        src={`${REACT_APP_DOMAIN_URL}api/assets/images/shared/products/250/${product.image}`}
                                        className="rounded-t-[10px] w-full"
                                        alt=""
                                      />
                                      <div className="flex flex-col justify-between flex-1 p-3 space-y-2">
                                        <h2 className="text-sm leading-4 text-white">
                                          {product.name}
                                        </h2>
                                        <h3 className="font-bold text-white">
                                          <NumberFormat
                                            value={product.price.toFixed(2)}
                                            displayType={"text"}
                                            thousandSeparator={true}
                                            prefix={"₱"}
                                          />
                                        </h3>
                                      </div>
                                    </Link>
                                  ))}
                                </div>
                              </SwiperSlide>
                            );
                          })}

                          {_3x2.map((chunk, i) => {
                            return (
                              <SwiperSlide
                                key={i}
                                className={`pb-2 px-3 hidden lg:block xl:hidden`}
                              >
                                <div className="grid grid-cols-3 gap-4">
                                  {chunk.map((product, i) => (
                                    <Link
                                      key={i}
                                      to={`?hash=${product.hash}`}
                                      className="bg-secondary shadow-tertiary flex flex-col shadow-md rounded-[10px] text-white h-full"
                                    >
                                      <img
                                        src={`${REACT_APP_DOMAIN_URL}api/assets/images/shared/products/250/${product.image}`}
                                        className="rounded-t-[10px] w-full"
                                        alt=""
                                      />
                                      <div className="flex flex-col justify-between flex-1 p-3 space-y-2">
                                        <h2 className="text-sm leading-4 text-white">
                                          {product.name}
                                        </h2>
                                        <h3 className="font-bold text-white">
                                          <NumberFormat
                                            value={product.price.toFixed(2)}
                                            displayType={"text"}
                                            thousandSeparator={true}
                                            prefix={"₱"}
                                          />
                                        </h3>
                                      </div>
                                    </Link>
                                  ))}
                                </div>
                              </SwiperSlide>
                            );
                          })}

                          {_4x2.map((chunk, i) => {
                            return (
                              <SwiperSlide
                                key={i}
                                className={`pb-2 px-3 hidden xl:block `}
                              >
                                <div className="grid grid-cols-4 gap-4">
                                  {chunk.map((product, i) => (
                                    <Link
                                      key={i}
                                      to={`?hash=${product.hash}`}
                                      className="bg-secondary shadow-tertiary flex flex-col shadow-md rounded-[10px] text-white h-full"
                                    >
                                      <img
                                        src={`${REACT_APP_DOMAIN_URL}api/assets/images/shared/products/250/${product.image}`}
                                        className="rounded-t-[10px] w-full"
                                        alt=""
                                      />
                                      <div className="flex flex-col justify-between flex-1 p-3 space-y-2">
                                        <h2 className="text-sm leading-4 text-white">
                                          {product.name}
                                        </h2>
                                        <h3 className="font-bold text-white">
                                          <NumberFormat
                                            value={product.price.toFixed(2)}
                                            displayType={"text"}
                                            thousandSeparator={true}
                                            prefix={"₱"}
                                          />
                                        </h3>
                                      </div>
                                    </Link>
                                  ))}
                                </div>
                              </SwiperSlide>
                            );
                          })}
                        </>
                      );
                    }
                  )}
                </Swiper>
              ) : null}
            </div>

            <div
              className={` ${
                customizePackage.length > 0
                  ? "hidden"
                  : "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 "
              }`}
            >
              {getCateringCategoryProductsState.data?.products.map(
                (category, i) => (
                  <>
                    {category.category_products.map((product, i) => (
                      <Link
                        key={i}
                        to={`?hash=${product.hash}`}
                        className="bg-secondary shadow-tertiary flex flex-col shadow-md rounded-[10px] text-white h-full"
                      >
                        <img
                          src={`${REACT_APP_DOMAIN_URL}api/assets/images/shared/products/250/${product.image}`}
                          className="rounded-t-[10px] w-full"
                          alt=""
                        />
                        <div className="flex flex-col justify-between flex-1 p-3 space-y-2">
                          <h2 className="text-sm leading-4 text-white">
                            {product.name}
                          </h2>
                          <h3 className="font-bold text-white">
                            <NumberFormat
                              value={product.price.toFixed(2)}
                              displayType={"text"}
                              thousandSeparator={true}
                              prefix={"₱"}
                            />
                          </h3>
                        </div>
                      </Link>
                    ))}
                  </>
                )
              )}
            </div>

            {customizePackage.length > 0 ? (
              <div className="flex-1 space-y-4">
                <div className="py-2 space-y-4 overflow-y-auto max-h-[350px] px-1">
                  {customizePackage.map((product, i) => {
                    const productSize = product.prod_size;
                    return (
                      <div
                        key={i}
                        className="relative flex bg-secondary shadow-tertiary shadow-md rounded-[10px]"
                      >
                        <img
                          src={`${REACT_APP_DOMAIN_URL}api/assets/images/shared/products/75/${product.prod_image_name}`}
                          className="rounded-[10px] w-[75px] h-[75px]"
                          alt=""
                        />
                        <div className="flex flex-col flex-1 px-3 py-2 text-white">
                          <h3 className="text-sm w-[90%] font-bold leading-4">
                            {productSize
                              ? getProductDetailsState.data?.product_size?.find(
                                  (size) => size.id === parseInt(productSize)
                                )?.name
                              : null}{" "}
                            {product.prod_name}
                          </h3>
                          <h3 className="text-xs">
                            Quantity:{" "}
                            <span className="text-tertiary">
                              {product.prod_qty}
                            </span>
                          </h3>

                          {product.flavors_details ? (
                            <h3 className="text-xs">
                              Flavor:
                              <br />
                              <span
                                className="text-tertiary"
                                dangerouslySetInnerHTML={{
                                  __html: product.flavors_details,
                                }}
                              />
                            </h3>
                          ) : null}

                          <h3 className="flex items-end justify-end flex-1 text-base">
                            <NumberFormat
                              value={product.prod_calc_amount.toFixed(2)}
                              displayType={"text"}
                              thousandSeparator={true}
                              prefix={"₱"}
                            />
                          </h3>
                        </div>
                        <button
                          className="absolute text-white top-2 right-4 "
                          onClick={() => {
                            const filteredPackage = customizePackage.filter(
                              (product, productIndex) => productIndex !== i
                            );
                            setCustomizePackage(filteredPackage);
                          }}
                        >
                          <IoMdClose />
                        </button>
                      </div>
                    );
                  })}
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex">
                      <span className="text-lg  text-white">
                        Package Quantity:
                      </span>

                      <h3 className="flex items-end justify-end flex-1 text-xl font-semibold text-white">
                        {calculateTotalQuantity()}
                      </h3>
                    </div>

                    <div className="flex">
                      <span className="text-lg  text-white">
                        Package Price:
                      </span>

                      <h3 className="flex items-end justify-end flex-1 text-xl font-semibold text-white">
                        <NumberFormat
                          value={calculateTotalPackagePrice().toFixed(2)}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"₱"}
                        />
                      </h3>
                    </div>
                  </div>

                  <div className="mt-4 space-y-4">
                    <button
                      onClick={() => {
                        dispatch(
                          addToCartCateringProducts({
                            products: customizePackage,
                          })
                        ).then(() => {
                          setCustomizePackage([]);
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
                        dispatch(
                          addToCartCateringProducts({
                            products: customizePackage,
                          })
                        ).then(() => {
                          setCustomizePackage([]);
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
                </div>

                {getCateringCategoryProductsState.data?.product_addons &&
                getCateringCategoryProductsState.data.addons.length !== 0 ? (
                  <ProductDetailsAccordion
                    title={{
                      name: "Product Add-ons",
                      prefixIcon: <MdFastfood className="text-3xl" />,
                    }}
                  >
                    <div className="max-h-[500px] overflow-y-auto flex flex-col py-4 px-4">
                      {getCateringCategoryProductsState.data?.product_addons.map(
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

                {getCateringCategoryProductsState.data?.addons &&
                getCateringCategoryProductsState.data.addons.length !== 0 ? (
                  <ProductDetailsAccordion
                    title={{
                      name: "Catering Add-ons",
                      prefixIcon: <MdFastfood className="text-3xl" />,
                    }}
                  >
                    <div className="max-h-[500px] overflow-y-auto flex flex-col py-4 px-4">
                      {getCateringCategoryProductsState.data.addons.map(
                        (product, i) => {
                          if (
                            getCateringCategoryProductsState.data &&
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
                                ? calculateTotalPackagePrice() +
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
            ) : (
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 py-8">
                <div>
                  {getCateringCategoryProductsState.data?.product_addons &&
                  getCateringCategoryProductsState.data.addons.length !== 0 ? (
                    <ProductDetailsAccordion
                      title={{
                        name: "Product Add-ons",
                        prefixIcon: <MdFastfood className="text-3xl" />,
                      }}
                    >
                      <div className="max-h-[500px] overflow-y-auto flex flex-col py-4 px-4">
                        {getCateringCategoryProductsState.data?.product_addons.map(
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
                </div>

                <div>
                  {getCateringCategoryProductsState.data?.addons &&
                  getCateringCategoryProductsState.data.addons.length !== 0 ? (
                    <ProductDetailsAccordion
                      title={{
                        name: "Catering Add-ons",
                        prefixIcon: <MdFastfood className="text-3xl" />,
                      }}
                    >
                      <div className="max-h-[500px] overflow-y-auto flex flex-col py-4 px-4">
                        {getCateringCategoryProductsState.data.addons.map(
                          (product, i) => {
                            if (
                              getCateringCategoryProductsState.data &&
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
                                  ? calculateTotalPackagePrice() +
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
            )}
          </div>
        </section>
      </main>

      <CateringPackageCustomizationQuantityFlavorModal
        open={openCateringPackageCustomizationQuantityFlavor}
        onAddProduct={(product) => {
          setCustomizePackage([...customizePackage, product]);
        }}
        onClose={() => {
          navigate("");
          setOpenCateringPackageCustomizationQuantityFlavor(false);
        }}
      />
    </>
  );
}
