import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import { PageTitleAndBreadCrumbs } from "features/shared/presentation/components/page-title-and-breadcrumbs";
import { ProductDetailsAccordion } from "features/shared/presentation/components/product-details-accordion";
import { getSession } from "features/shared/presentation/slices/get-session.slice";
import { useEffect } from "react";
import { AiFillInfoCircle } from "react-icons/ai";
import { useLocation, useParams } from "react-router-dom";
import {
  getCateringProductDetails,
  selectGetCateringProductDetails,
} from "../slices/get-catering-product-details.slice";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper";

import "swiper/css";

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
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
