import { IoMdClose } from "react-icons/io";
import { useState } from "react";
import { MaterialInput } from "features/shared/presentation/components";
import { selectGetInfluencer } from "../slices/get-influencer.slice";
import NumberFormat from "react-number-format";
import { useAppSelector } from "features/config/hooks";

interface ProfileCashoutModalProps {
  open: boolean;
  onClose: () => void;
  onCashout: (cashout: string) => void;
}

export function ProfileCashoutModal(props: ProfileCashoutModalProps) {
  const [cashout, setCashout] = useState("");

  const getInfluencerState = useAppSelector(selectGetInfluencer);

  if (props.open) {
    document.body.classList.add("overflow-hidden");
  } else {
    document.body.classList.remove("overflow-hidden");
    return null;
  }

  return (
    <div className="fixed inset-0 z-30 flex items-start justify-center bg-black bg-opacity-30 backdrop-blur-sm">
      <div className="w-[97%] lg:w-[400px] my-5 rounded-[10px]">
        <div className="bg-secondary rounded-t-[10px] flex items-center justify-between p-4">
          <span className="text-2xl text-white">Cashout</span>
          <button
            className="text-2xl text-white"
            onClick={() => {
              document.body.classList.remove("overflow-hidden");
              props.onClose();
            }}
          >
            <IoMdClose />
          </button>
        </div>

        <div className="px-4 pt-6 pb-2 space-y-4 bg-white border-b-2 border-l-2 border-r-2 border-secondary ">
          {getInfluencerState.data ? (
            <div className="flex lg:shadow-[0_3px_10px_rgb(0,0,0,0.3)]">
              <div className="bg-primary w-[4px]"></div>
              <div className="px-4 py-1 flex flex-col flex-1">
                <span className="text-lg text-secondary font-semibold">
                  CURRENT BALANCE
                </span>
                <span className="text-xs text-secondary mt-1">
                  {getInfluencerState.data.first_name +
                    " " +
                    getInfluencerState.data.middle_name +
                    " " +
                    getInfluencerState.data.last_name}
                </span>
                <div className="h-[40px] flex justify-end items-end">
                  <span className="text-[12px] font-semibold text-secondary mr-2 mb-[3px]">
                    PHP
                  </span>
                  <span className="text-2xl font-bold text-secondary">
                    {getInfluencerState.data.payable ? (
                      <NumberFormat
                        value={parseFloat(getInfluencerState.data.payable)}
                        displayType={"text"}
                        thousandSeparator={true}
                      />
                    ) : (
                      "0"
                    )}
                  </span>
                  <span className="text-[12px] font-semibold text-secondary mr-2 mb-[3px]">
                    .
                    {getInfluencerState.data.payable
                      ? parseFloat(getInfluencerState.data.payable)
                          .toFixed(2)
                          .split(".")[1]
                      : 0}
                  </span>
                </div>
              </div>
            </div>
          ) : null}
          <MaterialInput
            colorTheme="black"
            name="cashout"
            label="Cashout Amount"
            fullWidth
            value={cashout}
            onChange={(e) => {
              setCashout(e.target.value);
            }}
          />
          <div className="flex items-center justify-end space-x-2">
            <button
              onClick={() => {
                props.onCashout(cashout);
              }}
              className="w-[100px] py-1 text-white rounded-full bg-button"
            >
              Cashout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
