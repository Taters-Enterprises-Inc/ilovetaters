import {
  useAppDispatch,
  useAppSelector,
  useQuery,
} from "features/config/hooks";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import {
  GetSessionState,
  selectGetSession,
} from "features/shared/presentation/slices/get-session.slice";
import {
  getCategoryProducts,
  selectGetCategoryProducts,
} from "features/shop/presentation/slices/get-category-products.slice";
import {
  getProductDetails,
  GetProductDetailsState,
  selectGetProductDetails,
} from "features/shop/presentation/slices/get-product-details.slice";
import { useEffect, useState } from "react";
import {
  BsCartX,
  BsFillBagCheckFill,
  BsFillCartPlusFill,
} from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import NumberFormat from "react-number-format";
import { Link, useNavigate } from "react-router-dom";
import { CateringPackageCustomizationQuantityFlavorModal } from "./catering-package-customization-quantity-flavor.modal";

interface CateringPackageCustomizationModalProps {
  open: boolean;
  onClose: () => void;
}
export function CateringPackageCustomizationModal(
  props: CateringPackageCustomizationModalProps
) {
  const navigate = useNavigate();
  const query = useQuery();

  const hash = query.get("hash");

  const dispatch = useAppDispatch();

  const [
    openCateringPackageCustomizationQuantityFlavor,
    setOpenCateringPackageCustomizationQuantityFlavor,
  ] = useState(false);

  const getSessionState = useAppSelector(selectGetSession);
  const getCategoryProductsState = useAppSelector(selectGetCategoryProducts);
  const getProductDetailsState = useAppSelector(selectGetProductDetails);

  useEffect(() => {
    if (
      getProductDetailsState.status === GetProductDetailsState.success &&
      getProductDetailsState.data
    ) {
      setOpenCateringPackageCustomizationQuantityFlavor(true);
    }
  }, [getProductDetailsState]);

  useEffect(() => {
    if (hash) {
      dispatch(getProductDetails({ hash }));
    }
  }, [dispatch, hash]);

  useEffect(() => {
    if (
      getSessionState.status === GetSessionState.success &&
      getSessionState.data &&
      getSessionState.data.cache_data?.region_id
    ) {
      dispatch(
        getCategoryProducts({
          region_id: getSessionState.data.cache_data.region_id,
        })
      );
    }
  }, [getSessionState, dispatch]);

  if (props.open) {
    document.body.classList.add("overflow-hidden");
  } else {
    document.body.classList.remove("overflow-hidden");
    return null;
  }

  return (
    <>
      <div
        style={{ display: props.open ? "flex" : "none" }}
        className="fixed inset-0 z-30 flex items-start justify-center overflow-auto bg-black bg-opacity-30 backdrop-blur-sm no-scrollbar no-scrollbar::-webkit-scrollbar"
      >
        <div className="bg-secondary px-3 py-[30px] round w-[90%] lg:w-[80%] relative rounded-[10px] my-10">
          <button
            className="absolute text-2xl text-white top-2 right-4 "
            onClick={() => {
              document.body.classList.remove("overflow-hidden");
              props.onClose();
            }}
          >
            <IoMdClose />
          </button>

          <section>
            <h1 className="p-4 text-4xl text-center tracking-[3px] font-['Bebas_Neue'] text-white">
              Build your own Package
            </h1>

            <div className="grid grid-cols-2 gap-4 p-4">
              <div>
                <div className="px-4 space-y-4 overflow-y-auto py-4 h-[500px]">
                  {getCategoryProductsState.data?.map((category, i) => (
                    <div key={i} className="space-y-3 cursor-pointer">
                      <h1 className="text-base text-white text-end">
                        {category.category_name}
                      </h1>
                      <div className="grid grid-cols-3 gap-4">
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
                              </h2>{" "}
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
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <div className="px-4  py-2 space-y-4 overflow-y-auto max-h-[350px]">
                  {getSessionState.data?.orders !== undefined &&
                  getSessionState.data?.orders !== null &&
                  getSessionState.data?.orders.length > 0 ? (
                    <>
                      {getSessionState.data.orders.map((order, i) => (
                        <div
                          key={i}
                          className="relative flex bg-secondary shadow-tertiary shadow-md rounded-[10px]"
                        >
                          <img
                            src={`${REACT_APP_DOMAIN_URL}api/assets/images/shared/products/75/${order.prod_image_name}`}
                            className="rounded-[10px] w-[75px] h-[75px]"
                            alt=""
                          />
                          <div className="flex flex-col flex-1 px-3 py-2 text-white">
                            <h3 className="text-sm w-[90%] font-bold leading-4">
                              {order.prod_size} {order.prod_name}
                            </h3>
                            <h3 className="text-xs">
                              Quantity:{" "}
                              <span className="text-tertiary">
                                {order.prod_qty}
                              </span>
                            </h3>

                            {order.prod_multiflavors ? (
                              <h3 className="text-xs">
                                Flavor:
                                <br />
                                <span
                                  className="text-tertiary"
                                  dangerouslySetInnerHTML={{
                                    __html: order.prod_multiflavors,
                                  }}
                                />
                              </h3>
                            ) : null}

                            <h3 className="flex items-end justify-end flex-1 text-base">
                              <NumberFormat
                                value={order.prod_calc_amount.toFixed(2)}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"₱"}
                              />
                            </h3>
                          </div>
                          <button
                            className="absolute text-white top-2 right-4 "
                            onClick={() => {}}
                          >
                            <IoMdClose />
                          </button>
                        </div>
                      ))}
                    </>
                  ) : null}
                </div>

                <div className="px-4">
                  <div className="flex">
                    <span className="text-lg font-bold text-white">
                      Package Quantity:
                    </span>

                    <h3 className="flex items-end justify-end flex-1 text-lg text-white">
                      10
                    </h3>
                  </div>

                  <div className="flex">
                    <span className="text-lg font-bold text-white">
                      Package Price:
                    </span>

                    <h3 className="flex items-end justify-end flex-1 text-lg text-white">
                      <NumberFormat
                        value={(100).toFixed(2)}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"₱"}
                      />
                    </h3>
                  </div>

                  <div className="mt-4 space-y-4">
                    <button
                      onClick={() => {}}
                      className="text-white text-xl border border-white flex space-x-2 justify-center items-center bg-[#CC5801] py-2 w-full rounded-lg shadow-lg"
                    >
                      <BsFillBagCheckFill className="text-3xl" />
                      <span className="text-2xl font-['Bebas_Neue'] tracking-[3px] font-light mt-1">
                        Checkout
                      </span>
                    </button>

                    <button
                      onClick={() => {}}
                      className="text-white text-xl border border-white flex space-x-2 justify-center items-center bg-[#CC5801] py-2 w-full rounded-lg shadow-lg"
                    >
                      <BsFillCartPlusFill className="text-3xl" />
                      <span className="text-2xl font-['Bebas_Neue'] tracking-[3px] font-light mt-1">
                        Add to cart
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <CateringPackageCustomizationQuantityFlavorModal
        open={openCateringPackageCustomizationQuantityFlavor}
        onClose={() => {
          navigate("");
          setOpenCateringPackageCustomizationQuantityFlavor(false);
        }}
      />
    </>
  );
}
