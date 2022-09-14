import {
  resetGetDealProductVariantsState,
  selectGetDealProductVariants,
} from "../slices/get-deal-product-variants.slice";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import {
  redeemDeal,
  RedeemDealState,
  resetRedeemDeal,
  selectRedeemDeal,
} from "../slices/redeem-deal.slice";
import { selectGetDeal } from "../slices/get-deal.slice";
import { useEffect, useState } from "react";
import { DealProductVariantsModel } from "features/popclub/core/domain/deal_product_variants.model";
import { selectGetRedeems } from "../slices/get-redeems.slice";
import {
  getSession,
  GetSessionState,
  selectGetSession,
} from "features/shared/presentation/slices/get-session.slice";
import { useNavigate } from "react-router-dom";
interface VariantChooserModalProps {
  open: boolean;
  onClose: () => void;
}

export function VariantsChooserModal(props: VariantChooserModalProps) {
  const getDealProductVariantsState = useAppSelector(
    selectGetDealProductVariants
  );
  const getDealState = useAppSelector(selectGetDeal);
  const getRedeemsState = useAppSelector(selectGetRedeems);
  const redeemDealState = useAppSelector(selectRedeemDeal);
  const getSessionState = useAppSelector(selectGetSession);
  const navigate = useNavigate();

  const [optionsSelected, setOptionsSelected] = useState({});
  const dispatch = useAppDispatch();
  if (props.open) {
    document.body.classList.add("overflow-hidden");
  } else {
    document.body.classList.remove("overflow-hidden");
  }

  useEffect(() => {
    if (
      redeemDealState.status === RedeemDealState.success &&
      getSessionState.status === GetSessionState.success &&
      getSessionState.data?.popclub_data.platform === "online-delivery" &&
      redeemDealState.data
    ) {
      navigate("/shop/checkout");
      dispatch(getSession());
      dispatch(resetRedeemDeal());
    } else if (
      redeemDealState.status === RedeemDealState.success &&
      getSessionState.status === GetSessionState.success &&
      getSessionState.data?.popclub_data.platform === "store-visit" &&
      redeemDealState.data
    ) {
      props.onClose();
      dispatch(resetRedeemDeal());
    }
  }, [
    getSessionState,
    navigate,
    redeemDealState,
    getRedeemsState,
    dispatch,
    props,
  ]);

  const onSubmit = (event: any) => {
    event.preventDefault();

    if (getDealProductVariantsState.data) {
      const dealProductVariants = getDealProductVariantsState.data;
      let remarks = Object.values(optionsSelected).join("");

      for (let i = 0; i < dealProductVariants.length; i++) {
        const dealProductVariant = dealProductVariants[i];

        if (dealProductVariant.product_variants.length <= 0) {
          remarks +=
            "<strong>" +
            dealProductVariant.quantity +
            "</strong> - " +
            dealProductVariant.product.name +
            "<br/>";
        }
      }

      if (getDealState.data?.hash && remarks) {
        dispatch(resetGetDealProductVariantsState());
        dispatch(
          redeemDeal({
            hash: getDealState.data?.hash,
            remarks,
          })
        );
      }
    }
  };

  const handleFormChange = (
    event: any,
    dealProductVariant: DealProductVariantsModel
  ) => {
    const data: any = optionsSelected;
    const optionName = event.target.value;
    const productName = dealProductVariant.product.name;
    const quantity = dealProductVariant.quantity;

    data[event.target.name] =
      "<strong>" +
      quantity +
      "</strong> - " +
      productName +
      " (" +
      optionName +
      ")<br/>";
    setOptionsSelected(data);
  };

  return (
    <div
      style={{ display: props.open ? "flex" : "none" }}
      className="fixed inset-0 z-30 flex items-start justify-center overflow-auto bg-black bg-opacity-30 backdrop-blur-sm"
    >
      <div className="bg-secondary px-4 py-8 lg:p-8 round w-[90%] lg:w-[400px] mt-10 relative rounded-[10px] text-white mb-10">
        <button
          className="absolute text-white top-2 right-4"
          onClick={props.onClose}
        >
          X
        </button>
        <form onSubmit={onSubmit}>
          {getDealProductVariantsState.data?.map((dealProductVariant, i) => {
            return (
              <div key={i} className="pb-4">
                <h1 className="text-lg font-bold">
                  {dealProductVariant.quantity}{" "}
                  {dealProductVariant.product.name}
                </h1>
                {dealProductVariant.product_variants.map(
                  (productVariant, i) => (
                    <div key={i}>
                      <h2 className="text-base uppercase">
                        PICK A {productVariant.name}
                      </h2>
                      <ul className="w-full mt-2 text-sm font-medium text-white border border-gray-200 rounded-lg bg-secondary 0 dark:border-gray-600 dark:text-white">
                        {productVariant.options.map((option, i) => (
                          <li
                            key={i}
                            className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600"
                          >
                            <div className="flex items-center pl-3">
                              <input
                                onChange={(e) =>
                                  handleFormChange(e, dealProductVariant)
                                }
                                id={
                                  dealProductVariant.option_id +
                                  "_" +
                                  productVariant.id +
                                  "_" +
                                  option.id
                                }
                                type="radio"
                                value={option.name}
                                name={
                                  dealProductVariant.option_id +
                                  "_" +
                                  productVariant.id
                                }
                                className="w-4 h-4 text-blue-600 border-gray-300 bg-secondary focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                              />
                              <label
                                htmlFor={
                                  dealProductVariant.option_id +
                                  "_" +
                                  productVariant.id +
                                  "_" +
                                  option.id
                                }
                                className="py-3 ml-2 w-full text-sm font-medium !text-white"
                              >
                                {option.name}
                              </label>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )
                )}
              </div>
            );
          })}

          <button
            type="submit"
            className="bg-button border border-white w-full py-2 rounded-md font-['Bebas_Neue'] tracking-widest"
          >
            Redeem Deal
          </button>
        </form>
      </div>
    </div>
  );
}
