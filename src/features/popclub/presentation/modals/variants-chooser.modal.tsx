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
import { popUpSnackBar } from "features/shared/presentation/slices/pop-snackbar.slice";

export type PopClubFlavorType = {
  [key: string]: {
    productName: string;
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
  const dispatch = useAppDispatch();

  const getDealProductVariantsState = useAppSelector(
    selectGetDealProductVariants
  );
  const getDealState = useAppSelector(selectGetDeal);
  const getRedeemsState = useAppSelector(selectGetRedeems);
  const redeemDealState = useAppSelector(selectRedeemDeal);
  const getSessionState = useAppSelector(selectGetSession);
  const navigate = useNavigate();

  const [currentMultiFlavors, setCurrentMultiFlavors] =
    useState<PopClubMultiFlavorsType>({});

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

  const createFlavorDetails = (): string | undefined => {
    if (currentMultiFlavors === undefined) return undefined;
    let result = "";
    let isFirst = true;

    Object.keys(currentMultiFlavors).forEach((key) => {
      const multiFlavorsArray: Array<{
        productName: string;
        name: string;
        quantity: number;
      }> = Object.values(currentMultiFlavors[key]);

      result +=
        (isFirst ? "" : "<br>") + multiFlavorsArray[0].productName + "<br>";
      isFirst = false;

      for (let i = 0; i < multiFlavorsArray.length; i++) {
        if (multiFlavorsArray[i].quantity > 0)
          result += `<strong>${multiFlavorsArray[
            i
          ].quantity.toString()}</strong> - ${multiFlavorsArray[i].name}<br>`;
      }
    });

    return result;
  };

  const onSubmit = (event: any) => {
    event.preventDefault();

    if (
      getDealProductVariantsState.data &&
      getDealProductVariantsState.data.length
    ) {
      let dealWithoutFlavor = "";

      for (let i = 0; i < getDealProductVariantsState.data.length; i++) {
        const dealProductVariant = getDealProductVariantsState.data[i];
        if (dealProductVariant.product_variants.length === 0) {
          dealWithoutFlavor +=
            "<strong>" +
            dealProductVariant.quantity +
            "</strong> - " +
            dealProductVariant.product.name +
            "<br/>";
          continue;
        }
        let totalMultiFlavorsQuantity = 0;

        if (currentMultiFlavors[i] === undefined) {
          dispatch(
            popUpSnackBar({
              message: "Please meet the required number of flavors.",
              severity: "error",
            })
          );

          return;
        }

        Object.keys(currentMultiFlavors[i]).forEach(function (key) {
          const currentFlavor = currentMultiFlavors[i];
          totalMultiFlavorsQuantity += currentFlavor[key].quantity;
        });

        if (totalMultiFlavorsQuantity !== dealProductVariant.quantity) {
          dispatch(
            popUpSnackBar({
              message: "Please meet the required number of flavors.",
              severity: "error",
            })
          );

          return;
        }
      }

      let flavors_details = createFlavorDetails();

      const remarks =
        (dealWithoutFlavor ? dealWithoutFlavor + "<br>" : "") + flavors_details;

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
          {getDealProductVariantsState.data?.map(
            (dealProductVariant, dealProductVariantId) => {
              return (
                <div
                  key={dealProductVariantId}
                  className={`${
                    dealProductVariant.product_variants.length > 0 ? "pb-4" : ""
                  }`}
                >
                  <h1 className="text-lg font-bold">
                    {dealProductVariant.quantity}{" "}
                    {dealProductVariant.product.name}
                  </h1>
                  {dealProductVariant.product_variants.map(
                    (productVariant, productVariantId) => (
                      <div key={productVariantId}>
                        <h2 className="text-base uppercase">
                          PICK A {productVariant.name}
                        </h2>
                        <ul className="w-full mt-2 text-sm font-medium text-white rounded-lg bg-secondary">
                          {productVariant.options.map((option, optionId) => (
                            <li key={optionId} className="w-full ">
                              <span className="text-sm text-white">
                                {option.name}
                              </span>
                              <PopClubQuantityInput
                                flavorId={option.id}
                                productQuantity={dealProductVariant.quantity}
                                parent_index={dealProductVariantId}
                                currentMultiFlavors={currentMultiFlavors}
                                onChange={(value) => {
                                  const tempCurrentMultiFlavors =
                                    currentMultiFlavors[dealProductVariantId]
                                      ? currentMultiFlavors[
                                          dealProductVariantId
                                        ]
                                      : {};

                                  if (value !== undefined) {
                                    tempCurrentMultiFlavors[option.id] = {
                                      productName:
                                        dealProductVariant.product.name,
                                      name: option.name,
                                      quantity: value,
                                    };

                                    const updateCurrentMultiFlavor = {
                                      ...currentMultiFlavors,
                                    };

                                    updateCurrentMultiFlavor[
                                      dealProductVariantId
                                    ] = tempCurrentMultiFlavors;

                                    setCurrentMultiFlavors(
                                      updateCurrentMultiFlavor
                                    );
                                  }
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
            }
          )}

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
