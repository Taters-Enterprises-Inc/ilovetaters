import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import {
  GetSessionState,
  selectGetSession,
} from "features/shared/presentation/slices/get-session.slice";
import {
  getCategoryProducts,
  selectGetCategoryProducts,
} from "features/shop/presentation/slices/get-category-products.slice";
import { useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import NumberFormat from "react-number-format";

interface CateringPackageCustomizationModalProps {
  open: boolean;
  onClose: () => void;
}
export function CateringPackageCustomizationModal(
  props: CateringPackageCustomizationModalProps
) {
  const dispatch = useAppDispatch();

  const getSessionState = useAppSelector(selectGetSession);
  const getCategoryProductsState = useAppSelector(selectGetCategoryProducts);

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

        <section className="grid grid-cols-2 gap-4 p-4">
          <div>
            <h1 className="p-4 text-2xl tracking-[3px] font-['Bebas_Neue'] text-white">
              Select Product
            </h1>
            <div
              className="px-4 space-y-4 overflow-y-auto h-[500px]"
              style={{ direction: "rtl" }}
            >
              {getCategoryProductsState.data?.map((category, i) => (
                <div key={i} className="space-y-3">
                  <h1 className="text-base text-white text-end">
                    {category.category_name}
                  </h1>
                  <div className="grid grid-cols-3 gap-4">
                    {category.category_products.map((product, i) => (
                      <div
                        key={i}
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
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="p-4">
            <h1 className=" text-2xl tracking-[3px] font-['Bebas_Neue'] text-white">
              Package Products List
            </h1>
          </div>
        </section>
      </div>
    </div>
  );
}
