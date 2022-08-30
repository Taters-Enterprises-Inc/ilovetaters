import { useAppDispatch, useAppSelector } from "features/config/hooks";
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
          "Products",
          getCateringProductDetailsState.data?.product.name,
        ]}
      />
      <section className="min-h-screen lg:space-x-4 pb-36">
        <div className="lg:-mt-[80px] lg:space-y-10 lg:container">
          <div className="bg-primary pb-20 lg:shadow-lg w-full lg:rounded-[30px] mb-10 lg:p-10 space-y-10">
            <div className="flex flex-col space-y-10 lg:flex-row lg:space-x-10 lg:space-y-0 ">
              <div className="lg:flex-[0_0_55%] lg:max-w-[0_0_55%] lg:h-[600px]">
                {getCateringProductDetailsState.data?.product.product_image ? (
                  <img
                    src={`https://ilovetaters.com/shop/assets/img/catering/packages/${getCateringProductDetailsState.data?.product.product_image}`}
                    className="lg:rounded-[20px] w-full h-full object-cover"
                    alt=""
                  />
                ) : null}
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
