import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import {
  getSession,
  GetSessionState,
  selectGetSession,
} from "features/shared/presentation/slices/get-session.slice";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  getCateringCategoryPackages,
  selectGetCateringCategoryPackages,
} from "../slices/get-catering-category-packages.slice";

import { Link } from "react-router-dom";
import NumberFormat from "react-number-format";
import { CateringFaqs } from "../components";
import { CateringHeroCarousel } from "../components/catering-hero.carousel";
import { CateringPackageCustomizationModal } from "../modals";

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
                    alt=""
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
            <button
              onClick={() => {
                setOpenCateringPackageCustomizationModal(true);
              }}
              className="bg-secondary shadow-tertiary flex  justify-center items-center flex-col shadow-md rounded-[10px] text-white h-full"
            >
              <img
                src={`${REACT_APP_DOMAIN_URL}api/assets/images/shared/products/250/Popcorn_Catering_Taters_7.jpg`}
                className="rounded-t-[10px] w-full"
                alt=""
              />

              <div className="flex flex-col justify-between flex-1 p-3 space-y-2">
                <h2 className="text-sm font-bold leading-4 text-white uppercase">
                  Customize your own package
                </h2>
              </div>
            </button>{" "}
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

      <CateringPackageCustomizationModal
        open={openCateringPackageCustomizationModal}
        onClose={() => {
          setOpenCateringPackageCustomizationModal(false);
        }}
      />
    </main>
  );
}
