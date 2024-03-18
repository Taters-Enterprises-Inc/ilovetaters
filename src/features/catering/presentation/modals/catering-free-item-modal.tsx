import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { IoMdClose } from "react-icons/io";
import {
  closeCateringFreeItemModal,
  selectFreeItemModal,
} from "../slices/catering-free-item-modal.slice";
import { selectGetCateringPackageDetails } from "features/catering/presentation/slices/get-catering-package-details.slice";
import { ProductDetailsAccordion } from "../../../shared/presentation/components/product-details-accordion";
import {
  GetSessionState,
  getSession,
  selectGetSession,
} from "../../../shared/presentation/slices/get-session.slice";
import { MdFastfood } from "react-icons/md";
import { CateringAddon } from "features/catering/presentation/components";
import {
  getCateringCategoryProducts,
  selectGetCateringCategoryProducts,
} from "features/catering/presentation/slices/get-catering-category-products.slice";
import { useEffect } from "react";
import {
  AddToCartCateringState,
  selectAddToCartCatering,
} from "features/catering/presentation/slices/add-to-cart-catering.slice";
import ReactGA from "react-ga";

export interface FreeItemModalButtonProps {
  text: string;
  color: string;
  onClick: () => void;
}

export function FreeItemModal() {
  const dispatch = useAppDispatch();

  const addToCartCateringState = useAppSelector(selectAddToCartCatering);
  const freeItemModalState = useAppSelector(selectFreeItemModal);
  const getSessionState = useAppSelector(selectGetSession);
  const getCateringCategoryProductsState = useAppSelector(
    selectGetCateringCategoryProducts
  );

  useEffect(() => {
    if (
      addToCartCateringState.status === AddToCartCateringState.success &&
      freeItemModalState.status
    ) {
      ReactGA.event({
        category: "Catering Order",
        action: "Add to cart item",
      });
      dispatch(getSession());
    }
  }, [addToCartCateringState, dispatch]);

  if (!freeItemModalState.status) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-30 flex items-start justify-center overflow-auto bg-black bg-opacity-30 backdrop-blur-sm no-scrollbar no-scrollbar::-webkit-scrollbar">
      <div className="bg-secondary px-3 py-[30px] round w-[90%] sm:w-[60%] lg:w-[40%] relative rounded-[10px] mt-10 mb-[150px]">
        <button
          className="absolute text-2xl text-white top-2 right-4 "
          onClick={() => {
            dispatch(closeCateringFreeItemModal());
          }}
        >
          <IoMdClose />
        </button>
        <section className="px-2 py-4 space-y-3">
          {getCateringCategoryProductsState.data?.addons &&
          getCateringCategoryProductsState.data.addons.length !== 0 ? (
            <ProductDetailsAccordion
              title={{
                name: "Catering Add-ons",
                prefixIcon: <MdFastfood className="text-3xl" />,
              }}
            >
              <div className="max-h-[500px] overflow-y-auto flex flex-col py-4 px-4">
                {getCateringCategoryProductsState.data.addons.map(
                  (product, i) => {
                    if (
                      getCateringCategoryProductsState.data &&
                      getSessionState.data
                    ) {
                      let calculatedPrice = 0;

                      const orders = getSessionState.data.orders;
                      let isFreeItemClaimed = false;

                      if (orders) {
                        for (let i = 0; i < orders.length; i++) {
                          calculatedPrice += orders[i].prod_calc_amount;

                          if (
                            orders[i].prod_id === product.id &&
                            orders[i].prod_price === 0
                          ) {
                            isFreeItemClaimed = true;
                          }
                        }
                      }

                      let isFreeItem = product.free_threshold
                        ? calculatedPrice >= product.free_threshold
                        : false;

                      let isFreeItemButAddToCartFirst = product.free_threshold
                        ? calculatedPrice >= product.free_threshold
                        : false;

                      return (
                        <CateringAddon
                          key={i}
                          product={product}
                          isFreeItem={isFreeItem}
                          isFreeItemButAddToCartFirst={
                            isFreeItemButAddToCartFirst
                          }
                          isFreeItemClaimed={isFreeItemClaimed}
                        />
                      );
                    }
                    return null;
                  }
                )}
              </div>
            </ProductDetailsAccordion>
          ) : null}
        </section>
      </div>
    </div>
  );
}
