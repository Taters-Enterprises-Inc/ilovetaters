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
import { useEffect, useRef, useState } from "react";
import { BsFillBagCheckFill, BsFillCartPlusFill } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import { MdFastfood } from "react-icons/md";
import NumberFormat from "react-number-format";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  addToCartCateringProduct,
  AddToCartCateringProductState,
  resetAddToCartCateringProductState,
  selectAddToCartCateringProduct,
} from "../slices/add-to-cart-catering-products.slice";
import {
  AddToCartCateringState,
  selectAddToCartCatering,
} from "../slices/add-to-cart-catering.slice";
import {
  getCateringCategoryProducts,
  GetCateringCategoryProductsState,
  selectGetCateringCategoryProducts,
} from "../slices/get-catering-category-products.slice";
import { Autoplay, Navigation } from "swiper";
import { PageTitleAndBreadCrumbs } from "features/shared/presentation/components/page-title-and-breadcrumbs";

import { CateringAddon } from "../components";
import { CateringPackageCustomizationQuantityFlavorModal } from "../modals";

import ReactGA from "react-ga";
import { Addon } from "features/shared/presentation/components";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";

import { ProductModel } from "features/shared/core/domain/product.model";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { FiArrowLeft } from "react-icons/fi";
import {
  closeMessageModal,
  openMessageModal,
} from "features/shared/presentation/slices/message-modal.slice";
import { numberWithCommas } from "features/config/helpers";

const SweetAlert = withReactContent(Swal);

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

  const cateringAddonsRef = useRef<null | HTMLDivElement>(null);

  const [
    openCateringPackageCustomizationQuantityFlavor,
    setOpenCateringPackageCustomizationQuantityFlavor,
  ] = useState(false);

  const getSessionState = useAppSelector(selectGetSession);
  const getCateringCategoryProductsState = useAppSelector(
    selectGetCateringCategoryProducts
  );
  const addToCartCateringProductState = useAppSelector(
    selectAddToCartCateringProduct
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
      addToCartCateringProductState.status ===
      AddToCartCateringProductState.success
    ) {
      ReactGA.event({
        category: "Catering Order",
        action: "Add to cart item",
      });
      dispatch(getSession());
      dispatch(resetAddToCartCateringProductState());
    }
  }, [addToCartCateringProductState, dispatch]);

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

  const checkFreeItem = (param: {
    product: CustomizePackageProduct;
    freeItemAvailable: (freeItem: Array<ProductModel>) => void;
    freeItemNotAvailable: (
      almostItem: ProductModel | null,
      totalPrice: number
    ) => void;
  }) => {
    if (
      getCateringCategoryProductsState.data &&
      getSessionState.status === GetSessionState.success &&
      getSessionState.data &&
      getCateringCategoryProductsState.status ===
        GetCateringCategoryProductsState.success
    ) {
      const addons = getCateringCategoryProductsState.data.addons;
      let freeItem: Array<ProductModel> = [];
      let calculatedPrice = 0;
      let almostItem: ProductModel | null = null;

      const orders = getSessionState.data.orders;

      if (orders) {
        for (let i = 0; i < orders.length; i++) {
          const order = orders[i];
          calculatedPrice += order.prod_calc_amount;
        }
      }
      const totalPrice = param.product.prod_calc_amount + calculatedPrice;

      if (addons) {
        for (let i = 0; i < addons.length; i++) {
          const freeThreshold = addons[i].free_threshold;
          console.log(freeThreshold);
          if (freeThreshold) {
            if (totalPrice >= freeThreshold) {
              freeItem.push(addons[i]);
            }

            if (almostItem == null && freeThreshold != undefined) {
              almostItem = addons[i];
            } else if (
              almostItem != null &&
              almostItem.free_threshold != undefined &&
              freeThreshold != undefined &&
              freeThreshold < almostItem.free_threshold
            ) {
              almostItem = addons[i];
            }
          }
        }
      }

      if (freeItem.length > 0) {
        param.freeItemAvailable(freeItem);
      } else {
        param.freeItemNotAvailable(almostItem, totalPrice);
      }
    }
  };

  const handleAddToCart = (product: CustomizePackageProduct) => {
    checkFreeItem({
      product: product,
      freeItemAvailable: () => {
        SweetAlert.fire({
          title: "Claim you free item! 🎉",
          text: "You're eligible to claim a free item!",
          icon: "info",
          showCancelButton: true,
          confirmButtonText: "Add to cart, then check the item",
          background: "#22201A",
          color: "white",
        }).then((result) => {
          if (result.isConfirmed) {
            dispatch(
              addToCartCateringProduct({
                product: product,
              })
            ).then(() => {
              setTimeout(() => {
                if (cateringAddonsRef.current)
                  cateringAddonsRef.current.scrollIntoView();
              }, 500);
            });
          }
        });
      },
      freeItemNotAvailable(val, totalPrice) {
        dispatch(
          addToCartCateringProduct({
            product: product,
          })
        ).then(() => {
          if (val && val.free_threshold != null) {
            SweetAlert.fire({
              title: "Unlock a Free Item! 🎉",
              text: `You're on your way to unlocking a free ${
                val.name
              }. You'll need to add items worth ₱${numberWithCommas(
                val.free_threshold - totalPrice
              )} more to your cart to claim your freebies.`,
              icon: "info",
              showCancelButton: true,
              confirmButtonText: "Okay",
              background: "#22201A",
              color: "white",
            });
          }
        });
      },
    });
  };

  const handleCheckout = (product: CustomizePackageProduct) => {
    checkFreeItem({
      product: product,
      freeItemAvailable: () => {
        SweetAlert.fire({
          title: "Claim you free item! 🎉",
          text: "You're eligible to claim a free item!",
          icon: "info",
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: "Check the free item",
          denyButtonText: `Proceed to checkout`,
        }).then((result) => {
          if (result.isConfirmed) {
            setTimeout(() => {
              if (cateringAddonsRef.current)
                cateringAddonsRef.current.scrollIntoView();
            }, 500);
          } else if (result.isDenied) {
            dispatch(
              addToCartCateringProduct({
                product: product,
              })
            ).then(() => {
              navigate("/shop/checkout");
            });
          }
        });
      },
      freeItemNotAvailable(val, totalPrice) {
        if (val && val.free_threshold != null) {
          SweetAlert.fire({
            title: "Unlock a Free Item! 🎉",
            text: `You're on your way to unlocking a free ${
              val.name
            }. You'll need to add items worth ₱${numberWithCommas(
              val.free_threshold - totalPrice
            )} more to your cart to claim your freebies.`,
            icon: "info",
            showDenyButton: true,
            confirmButtonText: "Okay",
            denyButtonText: `Proceed to checkout`,
            background: "#22201A",
            color: "white",
          }).then((result) => {
            if (result.isConfirmed) {
              navigate("/shop/products");
            } else if (result.isDenied) {
              dispatch(
                addToCartCateringProduct({
                  product: product,
                })
              ).then(() => {
                navigate("/shop/checkout");
              });
            }
          });
        }
      },
    });
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
        <section className={"container pt-8 pb-64 mx-auto"}>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 ">
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

          <div className="flex flex-col py-8 space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
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
                        <Addon key={i} product={product} maxQuantity={99999} />
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
                  <div
                    ref={cateringAddonsRef}
                    className="max-h-[500px] overflow-y-auto flex flex-col py-4 px-4"
                  >
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
                              ? calculatedPrice >= product.free_threshold
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
        </section>

        <section
          className={`fixed ${
            getSessionState.data?.orders === undefined ||
            getSessionState.data?.orders == null ||
            getSessionState.data?.orders.length <= 0
              ? "bottom-[100px] sm:bottom-[120px] lg:bottom-[50px] "
              : "bottom-[150px] sm:bottom-[170px] lg:bottom-[100px] "
          }  z-10 h-1 w-full`}
        >
          <div className="container flex items-start justify-end">
            <div className="block flex flex-col justify-end items-end">
              {getSessionState.data?.orders === undefined ||
              getSessionState.data?.orders == null ||
              getSessionState.data?.orders.length <= 0 ? null : (
                <button
                  onClick={() => {
                    navigate("/shop/checkout");
                  }}
                  className="flex items-center justify-center px-2 py-1 space-x-2 text-white shadow-lg sm:max-h-fit rounded-xl bg-button mb-[10px]"
                >
                  <BsFillBagCheckFill className="text-xl lg:text-2xl" />

                  <span className="text-base lg:text-lg font-['Bebas_Neue'] tracking-[3px] mt-1">
                    Checkout Cart
                  </span>
                </button>
              )}
              <button
                onClick={() => {
                  navigate("/shop/products");
                }}
                className="flex items-center justify-center px-2 py-1 space-x-2 text-white shadow-lg sm:max-h-fit rounded-xl bg-button"
              >
                <FiArrowLeft className="text-xl lg:text-2xl" />

                <span className="text-base lg:text-lg font-['Bebas_Neue'] tracking-[3px] mt-1">
                  Go Back to Packages
                </span>
              </button>
            </div>
          </div>
        </section>
      </main>

      <CateringPackageCustomizationQuantityFlavorModal
        open={openCateringPackageCustomizationQuantityFlavor}
        onAddProduct={(product) => {
          handleAddToCart(product);
        }}
        onCheckout={(product) => {
          handleCheckout(product);
        }}
        onClose={() => {
          navigate("");
          setOpenCateringPackageCustomizationQuantityFlavor(false);
        }}
      />
    </>
  );
}
