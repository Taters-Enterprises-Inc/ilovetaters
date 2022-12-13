import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { Autoplay, Navigation } from "swiper";
import "swiper/css";
import { getCartItem, selectGetCartItem } from "../slices/get-cart-item.slice";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import { Addon, QuantityInput } from "features/shared/presentation/components/";
import { MdFastfood, MdProductionQuantityLimits } from "react-icons/md";
import { ProductDetailsAccordion } from "features/shared/presentation/components/product-details-accordion";
import { TbTruckDelivery } from "react-icons/tb";
import { AiFillInfoCircle } from "react-icons/ai";
import { LoginChooserModal } from "features/popclub/presentation/modals/login-chooser.modal";
import { PageTitleAndBreadCrumbs } from "features/shared/presentation/components/page-title-and-breadcrumbs";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { FaRegEdit } from "react-icons/fa";
import { ShopPeopleAlsoBoughtCarousel } from "../carousels";
import NumberFormat from "react-number-format";
import { getProductSku } from "../slices/get-product-sku.slice";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  editCartItem,
  selectEditCartItem,
  EditCartItemState,
  resetEditCartItem,
} from "../slices/edit-cart-item.slice";
import { getSession } from "features/shared/presentation/slices/get-session.slice";
import { ShopProductFlavor } from "../components/shop-product-flavor";
import { popUpSnackBar } from "features/shared/presentation/slices/pop-snackbar.slice";

export type ShopFlavorType = {
  [key: string]: {
    name: string;
    quantity: number;
  };
};

export type ShopMultiFlavorType = {
  [key: string]: ShopFlavorType;
};

export const ShopEditCartItem: React.FC = (): JSX.Element => {
  const [flavorName, setFlavorName] = useState<string>("");
  const [sizeName, setSizeName] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [currentFlavor, setCurrentFlavor] = useState<string>("");
  const [currentSize, setCurrentSize] = useState<string>("");
  const [openLoginChooserModal, setOpenLoginChooserModal] = useState(false);
  const dispatch = useAppDispatch();
  const getEditCartProduct = useAppSelector(selectGetCartItem);
  const editCartProductState = useAppSelector(selectEditCartItem);
  const [resetMultiFlavors, setResetMultiFlavors] = useState<boolean>(false);
  const [totalMultiFlavorsQuantity, setTotalMultiFlavorsQuantity] =
    useState<number>(0);

  const navigate = useNavigate();

  const [currentMultiFlavors, setCurrentMultiFlavors] =
    useState<ShopMultiFlavorType>({});

  let { cart_id } = useParams();
  const location = useLocation();

  const flavorCallBack = useCallback((value: string) => {
    setFlavorName(value);
  }, []);
  const SizeCallBack = useCallback((value: string) => {
    setSizeName(value);
  }, []);

  const multiFlavorContainer = useCallback((value: any) => {
    setCurrentMultiFlavors(value);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location]);

  useEffect(() => {
    if (getEditCartProduct.status && getEditCartProduct.data) {
      setQuantity(getEditCartProduct.data.order_item.prod_qty);

      setCurrentMultiFlavors(multi_flavor);

      setCurrentSize(
        getEditCartProduct.data.order_item?.prod_size_id.toString()
      );
    }
  }, [getEditCartProduct, currentFlavor]);

  useEffect(() => {
    if (resetMultiFlavors === true) {
      setResetMultiFlavors(false);
    }
  }, [resetMultiFlavors]);

  useEffect(() => {
    if (getEditCartProduct.data) {
      if (quantity < getEditCartProduct.data?.order_item.prod_qty) {
        setCurrentMultiFlavors({});
      }
    }
  }, [quantity]);

  useEffect(() => {
    dispatch(getCartItem(cart_id));
  }, [cart_id, dispatch]);

  useEffect(() => {
    if (editCartProductState.status === EditCartItemState.success) {
      dispatch(getSession());
      dispatch(resetEditCartItem());
    }
  }, [editCartProductState, dispatch]);

  const multi_flavor = useMemo(() => {
    let count = 0;
    const item: Array<{ quantity: number; name: string; id: number }> = [];
    const defaultMultyflavor =
      getEditCartProduct?.data?.order_item?.prod_multiflavors
        ?.split("<strong>")
        .join("")
        .split("</strong>")
        .join("")
        .split("<")
        .join("")
        .split(">")
        .join("")
        .split("/")
        .join("")
        .split("br")
        .join(",")
        .trim()
        .split(",");

    getEditCartProduct?.data?.product_flavor?.map((data, i) => {
      data.flavors.map((data, i) => {
        defaultMultyflavor?.forEach((multi_data: any) => {
          if (data.name.trim() === multi_data.split("-")[1]?.trim()) {
            item.push({
              id: data.id,
              quantity: parseInt(multi_data.split("-")[0]),
              name: data.name,
            });
          }
        });
      });
    });

    let result: any = {};

    for (var i = 0; i < item.length; ++i) {
      count = count + item[i].quantity;
      let id = item[i].id;
      result[id] = { name: item[i].name, quantity: item[i].quantity };
    }

    let multi_flav: any = { 0: result };

    return multi_flav;
  }, [getEditCartProduct?.data]);

  const handleSizeAndFlavorChange = (size: string) => {
    if (getEditCartProduct.data) {
      dispatch(
        getProductSku({
          prod_flavor: "",
          prod_size: size,
        })
      );
    }
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
            }<br/>`;
      }
    });

    return result ? result : undefined;
  };

  const handleEditSubmit = () => {
    console.log("ts");

    if (
      getEditCartProduct.data?.product_flavor &&
      getEditCartProduct.data.product.num_flavor > 0 &&
      getEditCartProduct.data.product_flavor.length > 0
    ) {
      for (let i = 0; i < getEditCartProduct.data.product_flavor.length; i++) {
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
          quantity * getEditCartProduct.data.product.num_flavor
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
      editCartItem({
        product_id: cart_id,
        quantity,
        currentFlavor,
        currentSize,
        sizeName,
        flavorName,
        total_amount:
          getEditCartProduct.data?.product.price &&
          getEditCartProduct.data?.product.price * quantity,
        prod_multiflavors: flavors_details,
      })
    );
  };

  return (
    <section className="text-white bg-secondary">
      <PageTitleAndBreadCrumbs
        home={{
          title: "Snackshop",
          url: "/delivery",
        }}
        title={getEditCartProduct.data?.product.name}
        pageTitles={[
          { name: "Products", url: "/delivery/products" },
          { name: getEditCartProduct.data?.product.name, url: "" },
        ]}
      />
      <section className="min-h-screen lg:space-x-4 pb-36">
        <div className="lg:space-y-10 lg:container">
          <div className="bg-secondary  pb-20 w-full lg:rounded-[30px] space-y-10">
            <div className="flex flex-col space-y-10 lg:flex-row lg:space-x-10 lg:space-y-0">
              <div className="lg:flex-[0_0_55%] lg:max-w-[0_0_55%] lg:h-[600px]">
                <Swiper
                  slidesPerView={"auto"}
                  autoplay={{ delay: 5000 }}
                  modules={[Navigation, Autoplay]}
                  navigation
                  className="w-full"
                >
                  {getEditCartProduct?.data?.product_images.map(
                    (name: string, index: number): JSX.Element => (
                      <SwiperSlide key={index}>
                        <img
                          src={`${REACT_APP_DOMAIN_URL}api/assets/images/shared/products/500/${name}`}
                          className="lg:rounded-[20px] w-full h-full object-cover"
                          alt=""
                        />
                      </SwiperSlide>
                    )
                  )}
                </Swiper>
              </div>

              <div className="container flex-1 space-y-10 lg:px-0">
                {getEditCartProduct.data?.product.description ? (
                  <ProductDetailsAccordion
                    title={{
                      name: "Product Info",
                      prefixIcon: <AiFillInfoCircle className="text-3xl" />,
                    }}
                  >
                    <div className="p-4 text-sm">
                      {getEditCartProduct.data.product.description}
                    </div>
                  </ProductDetailsAccordion>
                ) : null}

                {getEditCartProduct.data?.product.delivery_details ? (
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
                            getEditCartProduct.data.product.delivery_details,
                        }}
                      />
                    </div>
                  </ProductDetailsAccordion>
                ) : null}

                {getEditCartProduct?.data?.product_addson ? (
                  <ProductDetailsAccordion
                    title={{
                      name: "Product Add-ons",
                      prefixIcon: <MdFastfood className="text-3xl" />,
                    }}
                  >
                    <div className="max-h-[300px] overflow-y-auto flex flex-col py-4 px-4">
                      {getEditCartProduct?.data?.product_addson.map(
                        (product, i: number) => (
                          <Addon key={i} product={product} />
                        )
                      )}
                    </div>
                  </ProductDetailsAccordion>
                ) : null}

                {getEditCartProduct.data?.product_size &&
                getEditCartProduct.data?.product_size.length > 0 ? (
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
                        {getEditCartProduct.data?.product_size.map(
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

                {getEditCartProduct.data &&
                getEditCartProduct.data.product_flavor &&
                getEditCartProduct.data.product &&
                getEditCartProduct.data.product_flavor.length > 0 ? (
                  <div>
                    {getEditCartProduct.data?.product_flavor.map(
                      (flavor, i) => (
                        <>
                          {getEditCartProduct.data ? (
                            <ShopProductFlavor
                              key={i}
                              numberOfFlavors={
                                getEditCartProduct.data.product.num_flavor
                              }
                              productQuantity={quantity}
                              currentMultiFlavor={currentMultiFlavors[i]}
                              flavor={flavor}
                              onChangeMultiFlavor={(updatedMultiFlavors) => {
                                const updateCurrentMultiFlavor = {
                                  ...currentMultiFlavors,
                                };

                                updateCurrentMultiFlavor[i] =
                                  updatedMultiFlavors;

                                console.log(updateCurrentMultiFlavor);

                                setCurrentMultiFlavors(
                                  updateCurrentMultiFlavor
                                );
                              }}
                            />
                          ) : null}
                        </>
                      )
                    )}
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
                {getEditCartProduct.data?.product.price ? (
                  <h2 className="mt-4 text-4xl text-white">
                    <NumberFormat
                      value={(
                        getEditCartProduct.data.product.price * quantity
                      ).toFixed(2)}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"₱"}
                    />
                  </h2>
                ) : null}

                <div className="space-y-4">
                  <button
                    onClick={handleEditSubmit}
                    className="text-white text-xl flex space-x-2 justify-center items-center bg-[#CC5801] py-2 w-full rounded-lg shadow-lg"
                  >
                    <FaRegEdit className="text-3xl" />
                    <span className="text-2xl font-['Bebas_Neue'] tracking-[3px] font-light mt-1">
                      Edit
                    </span>
                  </button>

                  <button
                    type="button"
                    className="order-2 w-full py-3 mt-4 font-bold text-white uppercase border bg-secondary rounded-xl lg:order-1"
                    onClick={() => {
                      navigate(-1);
                    }}
                  >
                    Go Back
                  </button>
                </div>
              </div>
            </div>

            {getEditCartProduct.data?.suggested_products &&
            getEditCartProduct.data?.suggested_products.length > 0 ? (
              <div className="container space-y-3">
                <h1 className="font-['Bebas_Neue'] tracking-[2px] text-xl text-white text-center ">
                  People Also Bought
                </h1>
                <ShopPeopleAlsoBoughtCarousel
                  products={getEditCartProduct.data?.suggested_products}
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
    </section>
  );
};
