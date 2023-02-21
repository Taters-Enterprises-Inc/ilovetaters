import { selectGetDealProductVariants } from "../slices/get-deal-product-variants.slice";
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
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import { PopClubQuantityInput } from "../components";

export type PopClubFlavorType = {
  [key: string]: {
    name: string;
    quantity: number;
  };
};

export type PopClubMultiFlavorsType = {
  [key: string]: PopClubFlavorType;
};

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

  // const [optionsSelected, setOptionsSelected] = useState({});

  
  const [currentMultiFlavors, setCurrentMultiFlavors] =
    useState<PopClubMultiFlavorsType>({});


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
      getSessionState.data?.popclub_data.platform === "online-delivery"
    ) {
      navigate("/delivery/checkout");
      dispatch(getSession());
      dispatch(resetRedeemDeal());
    } else if (
      redeemDealState.status === RedeemDealState.success &&
      getSessionState.status === GetSessionState.success &&
      getSessionState.data?.popclub_data.platform === "store-visit"
    ) {
      props.onClose();
      dispatch(resetRedeemDeal());
    }
  }, [
    getSessionState,
    navigate,
    redeemDealState,
    getRedeemsState,
    props,
    dispatch,
  ]);

  const onSubmit = (event: any) => {
    event.preventDefault();

    if (getDealProductVariantsState.data) {
      const dealProductVariants = getDealProductVariantsState.data;
      let remarks = "";
      if (getDealState.data?.hash && remarks) {
        dispatch(
          redeemDeal({
            hash: getDealState.data?.hash,
            remarks,
          })
        );
      }
    }
  };

  return (
    <div
      style={{ display: props.open ? "flex" : "none" }}
      className="fixed inset-0 z-30 flex items-start justify-center overflow-auto bg-black bg-opacity-30 backdrop-blur-sm"
    >
      <div className="bg-secondary px-4 mb-36 py-8 lg:p-8 round w-[90%] lg:w-[400px] mt-10 relative rounded-[10px] text-white">
        <button
          className="absolute text-white top-2 right-4"
          onClick={props.onClose}
        >
          X
        </button>
        <form onSubmit={onSubmit}>
          {getDealProductVariantsState.data?.map((dealProductVariant, i) => {
            return (
              <div
                key={i}
                className={`${
                  dealProductVariant.product_variants.length > 0 ? "pb-4" : ""
                }`}
              >
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
                      <ul className="w-full mt-2 text-sm font-medium text-white rounded-lg bg-secondary">
                        {productVariant.options.map((option, i) => (
                          <li key={i} className="w-full ">
                            {/* <div className="flex items-center pl-3">
                              <FormControlLabel
                                value={option.name}
                                control={
                                  <Radio
                                    required
                                    color="tertiary"
                                    sx={{ color: "white" }}
                                  />
                                }
                                label={
                                  <span className="py-3 ml-2 w-full text-sm font-medium !text-white">
                                    {option.name}
                                  </span>
                                }
                              />
                            </div> */}
                            
                            <span className="text-sm text-white">{option.name}</span>
                            <PopClubQuantityInput
                              flavorId={option.id}
                              productQuantity={dealProductVariant.quantity}
                              parent_index={1}
                              currentMultiFlavors={currentMultiFlavors}
                              onChange={(value) => {
                                // const currentMultiFlavors = currentMultiFlavors[
                                //   props.parent_index
                                // ]
                                //   ? props.currentMultiFlavors[props.parent_index]
                                //   : {};

                                // if (value !== undefined) {
                                //   currentMultiFlavors[flavor.id] = {
                                //     name: flavor.name,
                                //     quantity: value,
                                //   };

                                //   props.onChange(currentMultiFlavors);
                                // }
                              }}
                            />
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
            className="bg-button border mt-8 border-white w-full py-2 rounded-md font-['Bebas_Neue'] tracking-widest"
          >
            Redeem Deal
          </button>
        </form>
      </div>
    </div>
  );
}
