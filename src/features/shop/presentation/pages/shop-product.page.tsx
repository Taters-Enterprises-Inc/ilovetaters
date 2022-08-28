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
import { Addon } from "../components/addon";
import NumberFormat from "react-number-format";
import {
  addToCart,
  AddToCartState,
  selectAddToCart,
} from "../slices/add-to-cart.slice";
import {
  getSession,
  selectGetSession,
} from "features/shared/presentation/slices/get-session.slice";
import Radio from "@mui/material/Radio";
import { ShopPeopleAlsoBoughtCarousel } from "../carousels";
import { BsFillBagCheckFill } from "react-icons/bs";
import { LoginChooserModal } from "features/popclub/presentation/modals/login-chooser.modal";
import { ShopPageTitleAndBreadCrumbs } from "../components/shop-page-title-and-breadcrumbs";
import {
  getProductSku,
  GetProductSkuState,
  selectGetProductSku,
} from "../slices/get-product-sku.slice";
import { ShopProductDetailsAccordion } from "../components/shop-product-details-accordion";

export function ShopProduct() {
  const dispatch = useAppDispatch();
  const getProductDetailsState = useAppSelector(selectGetProductDetails);
  const getProductSkuState = useAppSelector(selectGetProductSku);
  const [openLoginChooserModal, setOpenLoginChooserModal] = useState(false);
  const getSessionState = useAppSelector(selectGetSession);
  const addToCartState = useAppSelector(selectAddToCart);

  const [quantity, setQuantity] = useState(1);

  const [currentSize, setCurrentSize] = useState<number>(-1);
  const [currentFlavor, setCurrentFlavor] = useState<number>(-1);

  const navigate = useNavigate();

  let { hash } = useParams();

  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location]);

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
    if (addToCartState.status === AddToCartState.success) {
      dispatch(getSession());
    }
  }, [addToCartState, dispatch]);

  useEffect(() => {
    if (hash !== undefined) {
      dispatch(getProductDetails({ hash }));
      dispatch(getSession());
    }
  }, [location, dispatch, hash]);

  const handleCheckout = () => {
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
      dispatch(
        addToCart({
          prod_id: getProductDetailsState.data.product.id,
          prod_image_name: getProductDetailsState.data.product.product_image,
          prod_name: getProductDetailsState.data.product.name,
          prod_qty: quantity,
          prod_flavor:
            currentFlavor === -1
              ? getProductDetailsState.data.product_flavor[0]
                ? getProductDetailsState.data.product_flavor[0].id
                : -1
              : currentFlavor,
          prod_size:
            currentSize === -1
              ? getProductDetailsState.data.product_size[0]
                ? getProductDetailsState.data.product_size[0].id
                : -1
              : currentSize,
          prod_price: getProductDetailsState.data.product.price,
          prod_calc_amount:
            getProductDetailsState.data.product.price * quantity,
          prod_category: getProductDetailsState.data.product.category,
          prod_with_drinks: -1,
          flavors_details: "",
          prod_sku_id: -1,
          prod_sku: -1,
        })
      );

      navigate("/shop/checkout");
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
      dispatch(
        addToCart({
          prod_id: getProductDetailsState.data.product.id,
          prod_image_name: getProductDetailsState.data.product.product_image,
          prod_name: getProductDetailsState.data.product.name,
          prod_qty: quantity,
          prod_flavor:
            currentFlavor === -1
              ? getProductDetailsState.data.product_flavor[0]
                ? getProductDetailsState.data.product_flavor[0].id
                : -1
              : currentFlavor,
          prod_size:
            currentSize === -1
              ? getProductDetailsState.data.product_size[0]
                ? getProductDetailsState.data.product_size[0].id
                : -1
              : currentSize,
          prod_price: getProductDetailsState.data.product.price,
          prod_calc_amount:
            getProductDetailsState.data.product.price * quantity,
          prod_category: getProductDetailsState.data.product.category,
          prod_with_drinks: -1,
          flavors_details: "",
          prod_sku_id: -1,
          prod_sku: -1,
        })
      );
    }
  };

  const handleSizeAndFlavorChange = (size: number, flavor: number) => {
    if (getProductDetailsState.data) {
      flavor =
        flavor === -1
          ? getProductDetailsState.data.product_flavor[0]
            ? getProductDetailsState.data.product_flavor[0].id
            : -1
          : flavor;
      size =
        size === -1
          ? getProductDetailsState.data.product_size[0]
            ? getProductDetailsState.data.product_size[0].id
            : -1
          : size;

      dispatch(
        getProductSku({
          prod_flavor: flavor,
          prod_size: size,
        })
      );
    }
  };

  return (
    <>
      <ShopPageTitleAndBreadCrumbs
        title={getProductDetailsState.data?.product.name}
        pageTitles={["Products", getProductDetailsState.data?.product.name]}
      />

      <section className="min-h-screen lg:space-x-4 pb-36">
        <div className="lg:-mt-[80px] lg:space-y-10 lg:container">
          <div className="bg-primary pb-20 lg:shadow-lg w-full lg:rounded-[30px] mb-10 lg:p-10 space-y-10">
            <div className="flex flex-col space-y-10 lg:flex-row lg:space-x-10 lg:space-y-0 ">
              <div className="lg:flex-[0_0_55%] lg:max-w-[0_0_55%] lg:h-[600px]">
                {getProductDetailsState.data?.product.product_image ? (
                  <img
                    src={`https://ilovetaters.com/shop/assets/img/500/${getProductDetailsState.data?.product.product_image}`}
                    className="lg:rounded-[20px] w-full h-full object-cover"
                    alt=""
                  />
                ) : null}
              </div>

              <div className="container flex-1 space-y-10 lg:px-0">
                {getProductDetailsState.data?.product.description ? (
                  <ShopProductDetailsAccordion
                    title={{
                      name: "Product Info",
                      prefixIcon: <AiFillInfoCircle className="text-3xl" />,
                    }}
                  >
                    <div className="p-4 text-sm">
                      {getProductDetailsState.data.product.description}
                    </div>
                  </ShopProductDetailsAccordion>
                ) : null}

                {getProductDetailsState.data?.product.delivery_details ? (
                  <ShopProductDetailsAccordion
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
                  </ShopProductDetailsAccordion>
                ) : null}

                {getProductDetailsState.data?.addons ? (
                  <ShopProductDetailsAccordion
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
                  </ShopProductDetailsAccordion>
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
                                checked={
                                  currentSize === -1 && i === 0
                                    ? true
                                    : size.id === currentSize
                                }
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

                {getProductDetailsState.data?.product_flavor &&
                getProductDetailsState.data?.product_flavor.length > 0 ? (
                  <div>
                    <h2 className="font-['Bebas_Neue'] text-4xl text-white tracking-[2px]">
                      Choose Flavor
                    </h2>

                    <ul>
                      {getProductDetailsState.data?.product_flavor.map(
                        (flavor, i) => {
                          return (
                            <li key={i} className="flex items-center">
                              <Radio
                                id={flavor.id.toString()}
                                color="tertiary"
                                checked={
                                  currentFlavor === -1 && i === 0
                                    ? true
                                    : flavor.id === currentFlavor
                                }
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
                          );
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
                          if (quantity > 1 && quantity <= 10)
                            setQuantity(quantity - 1);
                        }}
                        className=" h-full w-[150px] rounded-l cursor-pointer outline-none bg-primary"
                      >
                        <span className="m-auto text-5xl font-thin leading-3">
                          −
                        </span>
                      </button>

                      <input
                        value={quantity}
                        readOnly
                        onChange={(event: any) => {
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
                          if (quantity >= 1 && quantity < 10)
                            setQuantity(quantity + 1);
                        }}
                        className="h-full w-[150px] rounded-r cursor-pointer bg-primary"
                      >
                        <span className="m-auto text-5xl font-thin leading-3">
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
                    onClick={handleCheckout}
                    className="text-white text-xl flex space-x-2 justify-center items-center bg-[#CC5801] py-2 w-full rounded-lg shadow-lg"
                  >
                    <BsFillBagCheckFill className="text-3xl" />
                    <span className="text-2xl font-['Bebas_Neue'] tracking-[3px] font-light mt-1">
                      Checkout
                    </span>
                  </button>

                  <button
                    onClick={handleAddToCart}
                    className="text-white text-xl flex space-x-2 justify-center items-center bg-[#CC5801] py-2 w-full rounded-lg shadow-lg"
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
