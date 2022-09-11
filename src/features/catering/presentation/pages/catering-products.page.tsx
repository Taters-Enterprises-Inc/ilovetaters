import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import {
  getSession,
  GetSessionState,
  selectGetSession,
} from "features/shared/presentation/slices/get-session.slice";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  getCateringCategoryProducts,
  selectGetCateringCategoryProducts,
} from "../slices/get-catering-category-products.slice";

import { Link } from "react-router-dom";
import NumberFormat from "react-number-format";
import { CateringFaqs } from "../components";

export function CateringProducts() {
  const getSessionState = useAppSelector(selectGetSession);
  const getCateringCategoryProductsState = useAppSelector(
    selectGetCateringCategoryProducts
  );

  const dispatch = useAppDispatch();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location]);

  useEffect(() => {
    dispatch(getSession());
  }, [dispatch]);

  useEffect(() => {
    if (
      getSessionState.status === GetSessionState.success &&
      getSessionState.data
    ) {
      if (getSessionState.data.cache_data?.region_id) {
        dispatch(
          getCateringCategoryProducts({
            region_id: getSessionState.data.cache_data.region_id,
          })
        );
      }
    }
  }, [dispatch, getSessionState]);

  return (
    <main className="min-h-screen bg-primary">
      <section className="lg:container">
        <img
          className="sm:hidden"
          src={
            REACT_APP_DOMAIN_URL +
            "api/assets/images/catering/hero/mobile/catering_munch_better.webp"
          }
          alt="The best pop corn in town"
        ></img>
        <img
          className="hidden sm:block"
          src={
            REACT_APP_DOMAIN_URL +
            "api/assets/images/catering/hero/desktop/catering_munch_better.webp"
          }
          alt="The best pop corn in town"
        ></img>
        <img
          className="hidden sm:block"
          src={
            REACT_APP_DOMAIN_URL +
            "api/assets/images/catering/instructions/catering_instructions.webp"
          }
          alt="The best pop corn in town"
        ></img>
      </section>
      <section className="container space-y-10 pb-[90px]">
        {getCateringCategoryProductsState.data?.map((category, i) => (
          <section key={i}>
            <h1 className="text-white font-['Bebas_Neue'] text-xl lg:text-3xl tracking-[3px]">
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

        <CateringFaqs />
      </section>

      <a
        target="_blank"
        rel="noreferrer"
        href="https://ilovetaters.com/shop/assets/upload/catering/Catering%20Packages.pdf"
        className="bg-secondary cursor-pointer h-[100px] flex justify-center items-center mb-14 text-white font-['Bebas_Neue'] text-lg lg:text-2xl tracking-[3px]"
      >
        Download our Catering Flyer
      </a>
    </main>
  );
}
