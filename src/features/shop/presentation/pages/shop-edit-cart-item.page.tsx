import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { Autoplay, Navigation } from "swiper";
import "swiper/css";
import { getCartItem, selectGetCartItem } from "../slices/get-cart-item.slice";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import { Addon, QuantityInput } from "features/shared/presentation/components/";
import { MdFastfood } from "react-icons/md";
import { ProductDetailsAccordion } from "features/shared/presentation/components/product-details-accordion";
import { TbTruckDelivery } from "react-icons/tb";
import { AiFillInfoCircle } from "react-icons/ai";
import { PageTitleAndBreadCrumbs } from "features/shared/presentation/components/page-title-and-breadcrumbs";
import Radio from "@mui/material/Radio";
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

export const ShopEditCartItem: React.FC = (): JSX.Element => {
  const [flavorName, setFlavorName] = useState<string>("");
  const [sizeName, setSizeName] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [currentFlavor, setCurrentFlavor] = useState<string>("");
  const [currentSize, setCurrentSize] = useState<string>("");
  const dispatch = useAppDispatch();
  const getEditCartProduct = useAppSelector(selectGetCartItem);
  const editCartProductState = useAppSelector(selectEditCartItem);
  const [resetMultiFlavors, setResetMultiFlavors] = useState<boolean>(false);
  const [totalMultiFlavorsQuantity, setTotalMultiFlavorsQuantity] =
    useState<number>(0);

  const [currentMultiFlavors, setCurrentMultiFlavors] =
    useState<any>(undefined);

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
    if (
      getEditCartProduct.status &&
      getEditCartProduct.data &&
      (currentFlavor === undefined || currentSize === undefined)
    ) {
      setCurrentFlavor(
        getEditCartProduct.data.order_item.prod_flavor_id.toString()
      );
      setCurrentSize(
        getEditCartProduct.data.order_item?.prod_size_id.toString()
      );
    }
  }, [getEditCartProduct, currentFlavor, currentSize]);

  useEffect(() => {
    if (resetMultiFlavors === true) {
      setResetMultiFlavors(false);
    }
  }, [resetMultiFlavors]);

  useEffect(() => {
    dispatch(getCartItem(cart_id));
  }, [cart_id, dispatch]);

  useEffect(() => {
    if (editCartProductState.status === EditCartItemState.success) {
      setCurrentMultiFlavors(undefined);
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
    getEditCartProduct?.data?.product_flavor?.forEach(
      (data: any, i: number) => {
        defaultMultyflavor?.forEach((multi_data: any) => {
          if (data.name.trim() === multi_data.split("-")[1]?.trim()) {
            item.push({
              quantity: parseInt(multi_data.split("-")[0]),
              name: data.name,
              id: data.id,
            });
          }
        });
      }
    );

    let result: any = {};

    for (var i = 0; i < item.length; ++i) {
      count = count + item[i].quantity;
      let id = item[i].id;
      result[id] = { name: item[i].name, quantity: item[i].quantity };
    }

    return { result, count };
  }, [getEditCartProduct?.data]);

  const handleSizeAndFlavorChange = (size: string, flavor: string) => {
    if (getEditCartProduct.data) {
      flavor =
        flavor === "-1"
          ? getEditCartProduct.data.product_flavor[0]
            ? getEditCartProduct.data.product_flavor[0].id.toString()
            : "-1"
          : flavor;
      size =
        size === "-1"
          ? getEditCartProduct.data.product_size[0]
            ? getEditCartProduct.data.product_size[0].id.toString()
            : "-1"
          : size;

      dispatch(
        getProductSku({
          prod_flavor: flavor,
          prod_size: size,
        })
      );
    }
  };

  const handleEditSubmit = () => {
    let toString_prod_multiflavors = "";
    if (currentMultiFlavors) {
      Object.entries(currentMultiFlavors).forEach(([__, value]: any) => {
        if (value.quantity !== 0) {
          toString_prod_multiflavors += `<strong>${value.quantity}</strong> - ${value.name}</br>`;
        }
      });
    }

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
        prod_multiflavors: toString_prod_multiflavors,
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
                          <Addon key={i} product={product} maxQuantity={10} />
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

                    <ul>
                      <RadioSizeComponent
                        getEditCartProduct={
                          getEditCartProduct.data?.product_size
                        }
                        SizeCallBack={SizeCallBack}
                        currentFlavor={currentFlavor}
                        currentSize={currentSize}
                        handleSizeAndFlavorChange={handleSizeAndFlavorChange}
                        setCurrentSize={setCurrentSize}
                      />
                    </ul>
                  </div>
                ) : null}

                {getEditCartProduct.data &&
                getEditCartProduct.data.product_flavor &&
                getEditCartProduct.data.product &&
                getEditCartProduct.data.product_flavor.length > 0 ? (
                  <div>
                    <h2 className="font-['Bebas_Neue'] text-4xl text-white tracking-[2px]">
                      Choose Flavor
                    </h2>
                    <ul>
                      <RadioFlavorComponent
                        currentFlavor={currentFlavor}
                        currentMultiFlavors={currentMultiFlavors}
                        currentSize={currentSize}
                        flavorCallBack={flavorCallBack}
                        handleSizeAndFlavorChange={handleSizeAndFlavorChange}
                        quantity={quantity}
                        resetMultiFlavors={resetMultiFlavors}
                        setCurrentFlavor={setCurrentFlavor}
                        setTotalMultiFlavorsQuantity={
                          setTotalMultiFlavorsQuantity
                        }
                        totalMultiFlavorsQuantity={totalMultiFlavorsQuantity}
                        getEditCartProduct={getEditCartProduct.data}
                        multiFlavorContainer={multiFlavorContainer}
                        defaultMultiFlavor={multi_flavor}
                      />
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
    </section>
  );
};

const RadioSizeComponent: React.FC<{
  currentFlavor: string;
  getEditCartProduct: Array<{ id: number; name: string }>;
  currentSize: string;
  setCurrentSize: React.Dispatch<React.SetStateAction<string>>;
  handleSizeAndFlavorChange: (size: string, flavor: string) => void;
  SizeCallBack: any;
}> = ({
  getEditCartProduct,
  currentSize,
  handleSizeAndFlavorChange,
  setCurrentSize,
  currentFlavor,
  SizeCallBack,
}): JSX.Element => {
  return (
    <React.Fragment>
      {getEditCartProduct.map(
        (size: { id: number; name: string }, i: number) => {
          return (
            <li key={i} className="flex items-center">
              <Radio
                id={size.id.toString()}
                color="tertiary"
                sx={{ color: "white" }}
                checked={
                  currentSize === "-1" && i === 0
                    ? true
                    : size.id.toString() === currentSize
                }
                onChange={() => {
                  SizeCallBack(size.name);
                  setCurrentSize(size.id.toString());
                  handleSizeAndFlavorChange(size.id.toString(), currentFlavor);
                }}
              />
              <label htmlFor={size.id.toString()} className="text-white">
                {size.name}
              </label>
            </li>
          );
        }
      )}
    </React.Fragment>
  );
};

const RadioFlavorComponent: React.FC<{
  currentFlavor: string;
  handleSizeAndFlavorChange: (size: string, flavor: string) => void;
  setCurrentFlavor: React.Dispatch<React.SetStateAction<string>>;
  currentSize: string;
  getEditCartProduct: any;
  flavorCallBack: (value: string) => void;
  resetMultiFlavors: boolean;
  totalMultiFlavorsQuantity: number;
  currentMultiFlavors: any;
  quantity: number;
  setTotalMultiFlavorsQuantity: React.Dispatch<React.SetStateAction<number>>;
  multiFlavorContainer: any;
  defaultMultiFlavor: any;
}> = ({
  currentFlavor,
  handleSizeAndFlavorChange,
  setCurrentFlavor,
  currentSize,
  getEditCartProduct,
  flavorCallBack,
  resetMultiFlavors,
  totalMultiFlavorsQuantity,
  currentMultiFlavors,
  quantity,
  setTotalMultiFlavorsQuantity,
  multiFlavorContainer,
  defaultMultiFlavor,
}): JSX.Element => {
  const [con, setCon] = useState<any>(undefined);
  useEffect(() => {
    multiFlavorContainer(con);
  });
  return (
    <React.Fragment>
      {getEditCartProduct.product_flavor.map((flavor: any, i: number) => {
        if (getEditCartProduct) {
          return (
            <EditMultiFlavorComponent
              defaultMultiFlavor={defaultMultiFlavor}
              currentFlavor={currentFlavor}
              currentMultiFlavors={currentMultiFlavors}
              currentSize={currentSize}
              flavor={flavor}
              flavorCallBack={flavorCallBack}
              getEditCartProduct={getEditCartProduct}
              handleSizeAndFlavorChange={handleSizeAndFlavorChange}
              quantity={quantity}
              resetMultiFlavors={resetMultiFlavors}
              setCon={setCon}
              setCurrentFlavor={setCurrentFlavor}
              setTotalMultiFlavorsQuantity={setTotalMultiFlavorsQuantity}
              totalMultiFlavorsQuantity={totalMultiFlavorsQuantity}
            />
          );
        }

        return null;
      })}
    </React.Fragment>
  );
};

const EditMultiFlavorComponent: React.FC<{
  getEditCartProduct: any;
  flavor: { id: number; name: string };
  resetMultiFlavors: boolean;
  quantity: number;
  totalMultiFlavorsQuantity: number;
  currentMultiFlavors: any;
  setTotalMultiFlavorsQuantity: React.Dispatch<React.SetStateAction<number>>;
  flavorCallBack: (value: string) => void;
  currentSize: string;
  currentFlavor: string;
  setCurrentFlavor: React.Dispatch<React.SetStateAction<string>>;
  handleSizeAndFlavorChange: (size: string, flavor: string) => void;
  setCon: React.Dispatch<any>;
  defaultMultiFlavor: any;
}> = ({
  flavor,
  getEditCartProduct,
  resetMultiFlavors,
  quantity,
  totalMultiFlavorsQuantity,
  currentMultiFlavors,
  setTotalMultiFlavorsQuantity,
  flavorCallBack,
  currentSize,
  currentFlavor,
  setCurrentFlavor,
  handleSizeAndFlavorChange,
  setCon,
  defaultMultiFlavor,
}) => {
  useEffect(() => {
    setCon(defaultMultiFlavor.result);
  }, [defaultMultiFlavor, setCon]);

  return (
    <React.Fragment>
      {getEditCartProduct.product.num_flavor > 1 ? (
        <li>
          <span className="text-sm text-white">{flavor.name}</span>
          <QuantityInput
            flavor={flavor}
            defaultValue={currentMultiFlavors}
            reset={resetMultiFlavors}
            min={0}
            disableAdd={
              getEditCartProduct.product.num_flavor * quantity -
                totalMultiFlavorsQuantity ===
              0 + defaultMultiFlavor.count
            }
            onChange={(val, action) => {
              if (currentMultiFlavors) {
                currentMultiFlavors[flavor.id] = {
                  name: flavor.name,
                  quantity: val,
                };
                setCon(currentMultiFlavors);
              } else {
                const temp: any = {};
                temp[flavor.id] = {
                  name: flavor.name,
                  quantity: val,
                };
                setCon(temp);
              }
              setTotalMultiFlavorsQuantity(
                totalMultiFlavorsQuantity + (action === "plus" ? +1 : -1)
              );
            }}
          />
        </li>
      ) : (
        <li className="flex items-center">
          <Radio
            id={flavor.id.toString()}
            color="tertiary"
            sx={{ color: "white" }}
            checked={flavor.id.toString() === currentFlavor}
            onChange={() => {
              setCurrentFlavor(flavor.id.toString());
              handleSizeAndFlavorChange(currentSize, flavor.id.toString());
              flavorCallBack(flavor.name);
            }}
          />
          <label htmlFor={flavor.id.toString()} className="text-white">
            {flavor.name}
          </label>
        </li>
      )}
    </React.Fragment>
  );
};
