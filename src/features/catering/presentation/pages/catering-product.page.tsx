import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import { PageTitleAndBreadCrumbs } from "features/shared/presentation/components/page-title-and-breadcrumbs";
import { ProductDetailsAccordion } from "features/shared/presentation/components/product-details-accordion";
import { getSession } from "features/shared/presentation/slices/get-session.slice";
import { useEffect, useState } from "react";
import { AiFillInfoCircle } from "react-icons/ai";
import { useLocation, useParams } from "react-router-dom";
import {
  getCateringProductDetails,
  selectGetCateringProductDetails,
} from "../slices/get-catering-product-details.slice";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper";

import "swiper/css";
import NumberFormat from "react-number-format";
import Radio from "@mui/material/Radio";
import { QuantityInput } from "features/shared/presentation/components";
import { BsFillBagCheckFill, BsFillCartPlusFill } from "react-icons/bs";
import { MdFastfood } from "react-icons/md";
import { Addon } from "features/shop/presentation/components/addon";
import { CateringAddon } from "../components";

const DEFAULT_CAROUSEL = [
  "table_setup",
  "rustic_cart",
  "sporty_cart",
  "mr_poppy",
];

export function CateringProduct() {
  const dispatch = useAppDispatch();
  let { hash } = useParams();
  const location = useLocation();

  const [quantity, setQuantity] = useState(1);

  const getCateringProductDetailsState = useAppSelector(
    selectGetCateringProductDetails
  );

  useEffect(() => {
    if (hash !== undefined) {
      dispatch(getCateringProductDetails({ hash }));
      dispatch(getSession());
    }
  }, [location, dispatch, hash]);

  return (
    <>
      <PageTitleAndBreadCrumbs
        home={{
          title: "Catering",
          url: "/catering",
        }}
        title={getCateringProductDetailsState.data?.product.name}
        pageTitles={[
          { name: "Products", url: "/catering/products" },
          { name: getCateringProductDetailsState.data?.product.name },
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
                  {getCateringProductDetailsState.data?.product_images.map(
                    (name) => (
                      <SwiperSlide>
                        <img
                          src={`${REACT_APP_DOMAIN_URL}api/assets/images/catering/products/${name}.jpg`}
                          className="lg:rounded-[20px] w-full h-full object-cover"
                          alt=""
                        />
                      </SwiperSlide>
                    )
                  )}
                  {DEFAULT_CAROUSEL.map((name) => (
                    <SwiperSlide>
                      <img
                        src={`${REACT_APP_DOMAIN_URL}api/assets/images/catering/products/catering_addon/${name}.jpg`}
                        className="lg:rounded-[20px] w-full h-full object-cover"
                        alt=""
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              <div className="container flex-1 space-y-10 lg:px-0">
                {getCateringProductDetailsState.data?.product.add_details ? (
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
                            getCateringProductDetailsState.data.product
                              .add_details,
                        }}
                      />
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

                    <div className="h-[60px] w-full">
                      <div className="relative flex flex-row w-full h-full mt-1 text-white bg-transparent border-2 border-white rounded-lg">
                        <button
                          onClick={() => {
                            if (quantity > 1 && quantity <= 10)
                              setQuantity(quantity - 1);
                          }}
                          className={`h-full w-[150px] rounded-l cursor-pointer outline-none bg-primary ${
                            quantity === 1
                              ? "opacity-30 cursor-not-allowed"
                              : ""
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
                            quantity === 10
                              ? "opacity-30 cursor-not-allowed"
                              : ""
                          }`}
                        >
                          <span className="m-auto text-5xl font-thin leading-3 lg:leading-0">
                            +
                          </span>
                        </button>
                      </div>
                    </div>

                    <span className="text-base text-white">
                      base price: ₱ 315.00 x (21)
                    </span>
                  </div>

                  {getCateringProductDetailsState.data?.product.price ? (
                    <h2 className="mt-4 text-4xl text-white">
                      <NumberFormat
                        value={(
                          getCateringProductDetailsState.data.product.price *
                          quantity
                        ).toFixed(2)}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"₱"}
                      />
                    </h2>
                  ) : null}
                </div>

                {getCateringProductDetailsState.data?.product_flavor &&
                getCateringProductDetailsState.data?.product_flavor.length >
                  0 ? (
                  <div>
                    <h2 className="font-['Bebas_Neue'] text-4xl text-white tracking-[2px] mb-4">
                      Choose Flavor
                    </h2>

                    <ul className="space-y-3">
                      {getCateringProductDetailsState.data?.product_flavor.map(
                        (flavor, i) => {
                          return (
                            <li key={i}>
                              <span className="text-white">{flavor.name}</span>
                              <QuantityInput />
                            </li>
                          );
                        }
                      )}
                    </ul>
                  </div>
                ) : null}

                <div className="space-y-4">
                  <button className="text-white text-xl flex space-x-2 justify-center items-center bg-[#CC5801] py-2 w-full rounded-lg shadow-lg">
                    <BsFillBagCheckFill className="text-3xl" />
                    <span className="text-2xl font-['Bebas_Neue'] tracking-[3px] font-light mt-1">
                      Checkout
                    </span>
                  </button>

                  <button className="text-white text-xl flex space-x-2 justify-center items-center bg-[#CC5801] py-2 w-full rounded-lg shadow-lg">
                    <BsFillCartPlusFill className="text-3xl" />
                    <span className="text-2xl font-['Bebas_Neue'] tracking-[3px] font-light mt-1">
                      Add to cart
                    </span>
                  </button>
                </div>

                {getCateringProductDetailsState.data?.product_addons ? (
                  <ProductDetailsAccordion
                    title={{
                      name: "Product Add-ons",
                      prefixIcon: <MdFastfood className="text-3xl" />,
                    }}
                  >
                    <div className="max-h-[300px] overflow-y-auto flex flex-col py-4 px-4">
                      {getCateringProductDetailsState.data?.product_addons.map(
                        (product, i) => (
                          <Addon key={i} product={product} />
                        )
                      )}
                    </div>
                  </ProductDetailsAccordion>
                ) : null}

                {getCateringProductDetailsState.data?.addons ? (
                  <ProductDetailsAccordion
                    title={{
                      name: "Catering Add-ons",
                      prefixIcon: <MdFastfood className="text-3xl" />,
                    }}
                  >
                    <div className="max-h-[300px] overflow-y-auto flex flex-col py-4 px-4">
                      {getCateringProductDetailsState.data?.addons.map(
                        (product, i) => (
                          <CateringAddon key={i} product={product} />
                        )
                      )}
                    </div>
                  </ProductDetailsAccordion>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
