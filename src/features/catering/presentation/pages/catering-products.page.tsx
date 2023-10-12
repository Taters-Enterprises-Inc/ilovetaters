import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import {
  getSession,
  GetSessionState,
  selectGetSession,
} from "features/shared/presentation/slices/get-session.slice";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getCateringCategoryPackages,
  selectGetCateringCategoryPackages,
} from "../slices/get-catering-category-packages.slice";

import { Link } from "react-router-dom";
import NumberFormat from "react-number-format";
import { CateringFaqs } from "../components";
import { CateringHeroCarousel } from "../components/catering-hero.carousel";
import { BsFillBagCheckFill } from "react-icons/bs";

export function CateringProducts() {
  const [
    openCateringPackageCustomizationModal,
    setOpenCateringPackageCustomizationModal,
  ] = useState(false);
  const getSessionState = useAppSelector(selectGetSession);
  const getCateringCategoryPackagesState = useAppSelector(
    selectGetCateringCategoryPackages
  );

  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location]);

  useEffect(() => {
    if (
      getSessionState.status === GetSessionState.success &&
      getSessionState.data
    ) {
      if (getSessionState.data.cache_data?.region_id) {
        dispatch(
          getCateringCategoryPackages({
            region_id: getSessionState.data.cache_data.region_id,
          })
        );
      }
    }
  }, [dispatch, getSessionState]);

  return (
    <main className="min-h-screen bg-primary">
      <section className="lg:container">
        <CateringHeroCarousel />
      </section>
      <section className="container space-y-10 pb-[90px]">
        {getCateringCategoryPackagesState.data?.map((category, i) => (
          <section key={i}>
            <h1 className="text-white font-['Bebas_Neue'] text-xl lg:text-3xl tracking-[3px] py-4">
              {category.category_name}
            </h1>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {category.category_products.map((product, i) => (
                <Link
                  key={i}
                  to={product.hash}
                  className="bg-secondary shadow-tertiary flex flex-col shadow-md rounded-[10px] text-white h-full"
                >
                  <img
                    src={`${REACT_APP_DOMAIN_URL}api/assets/images/shared/products/250/${product.image}`}
                    className="rounded-t-[10px] w-full"
                    alt={product.name}
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null;
                      currentTarget.src = `${REACT_APP_DOMAIN_URL}api/assets/images/shared/image_not_found/blank.jpg`;
                    }}
                  />
                  <div className="flex flex-col justify-between flex-1 p-3 space-y-2">
                    <h2 className="text-sm leading-4 text-white">
                      {product.name}
                    </h2>
                    <div className="font-bold text-white">
                      <NumberFormat
                        value={product.price.toFixed(2)}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"₱"}
                      />{" "}
                      <span className="text-sm font-normal">per head</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}
        <section>
          <h1 className="text-white font-['Bebas_Neue'] text-xl lg:text-3xl tracking-[3px] py-4">
            Build your own package
          </h1>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            <Link
              to="build-your-own-package"
              className="bg-secondary shadow-tertiary flex  justify-center items-center flex-col shadow-md rounded-[10px] text-white h-full"
            >
              <img
                src={`${REACT_APP_DOMAIN_URL}api/assets/images/home/cards/taters_catering.jpg`}
                className="rounded-t-[10px] w-full"
                alt="Build your own package catering"
              />

              <div className="flex flex-col justify-between flex-1 p-3 space-y-2">
                <h2 className="text-sm font-bold leading-4 text-white uppercase">
                  Customize your own package
                </h2>
              </div>
            </Link>
          </div>
        </section>

        <section className="container fixed bottom-[100px] sm:bottom-[120px] lg:bottom-[50px] z-10 h-1">
          <div className="container flex items-start justify-end">
            <div className="block ">
              {getSessionState.data?.orders === undefined ||
              getSessionState.data?.orders == null ||
              getSessionState.data?.orders.length <= 0 ? null : (
                <button
                  onClick={() => {
                    navigate("/shop/checkout");
                  }}
                  className="flex items-center justify-center px-2 py-1 space-x-2 text-white shadow-lg sm:max-h-fit rounded-xl bg-button"
                >
                  <BsFillBagCheckFill className="text-xl lg:text-2xl" />

                  <span className="text-base lg:text-lg font-['Bebas_Neue'] tracking-[3px] mt-1">
                    Checkout Cart
                  </span>
                </button>
              )}
            </div>
          </div>
        </section>

        <CateringFaqs />
      </section>

      <a
        onClick={() => {
          window.open(require("assets/Catering Packages.pdf"));
        }}
        className="bg-secondary cursor-pointer h-[100px] mb-14 lg:mb-0 flex justify-center items-center text-white font-['Bebas_Neue'] text-lg lg:text-2xl tracking-[3px]"
      >
        Download our Catering Flyer
      </a>
    </main>
  );
}
