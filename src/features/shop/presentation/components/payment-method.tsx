import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { useAppSelector } from "features/config/hooks";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import { selectGetSession } from "features/shared/presentation/slices/get-session.slice";
import { ChangeEvent, useState } from "react";
import { PaymentCardModal } from "../modals";
interface PaymentMethodOption {
  name: string;
  value: "COD" | "E-WALLET" | "BANK-ACCOUNT" | "CARD";
}
const PAYMENT_OPTIONS: Array<PaymentMethodOption> = [
  {
    name: "COD",
    value: "COD",
  },
  {
    name: "E-Wallet",
    value: "E-WALLET",
  },
  {
    name: "Bank Account",
    value: "BANK-ACCOUNT",
  },
  // To be implemented.....
  // {
  //   name: "Credit / Debit Card",
  //   value: "CARD",
  // },
];

type PaymentMethodType = "COD" | "E-WALLET" | "CARD" | "BANK-ACCOUNT";

interface PaymentMethodProps {
  onChange: (payment: string) => void;
}

export function PaymentMethod(props: PaymentMethodProps) {
  const getSessionState = useAppSelector(selectGetSession);
  const [openPaymentCardModal, setOpenPaymentCardModal] = useState(false);
  const [paymentSelected, setPaymentSelected] =
    useState<PaymentMethodType>("COD");

  const handlePaymentMethodChange = (option: PaymentMethodOption) => {
    if (option.value === "CARD") {
      setOpenPaymentCardModal(true);
      return;
    }
    setPaymentSelected(option.value);
  };

  return (
    <>
      <ul className="flex space-x-2">
        {PAYMENT_OPTIONS.map((option, i) => (
          <li key={i}>
            <button
              type="button"
              onClick={() => handlePaymentMethodChange(option)}
              className={`relative px-4 py-3 font-semibold border w-full text-sm lg:text-base lg:w-fit ${
                option.value === paymentSelected
                  ? "text-green-900 border-green-900"
                  : " text-secondary border-secondary"
              } `}
            >
              {option.name}
              <div
                className={`payment-method-active ${
                  option.value === paymentSelected ? "" : "hidden"
                }`}
              >
                <svg
                  enableBackground="new 0 0 12 12"
                  viewBox="0 0 12 12"
                  x="0"
                  y="0"
                  className="taters-svg-icon icon-tick-bold"
                >
                  <g>
                    <path d="m5.2 10.9c-.2 0-.5-.1-.7-.2l-4.2-3.7c-.4-.4-.5-1-.1-1.4s1-.5 1.4-.1l3.4 3 5.1-7c .3-.4 1-.5 1.4-.2s.5 1 .2 1.4l-5.7 7.9c-.2.2-.4.4-.7.4 0-.1 0-.1-.1-.1z"></path>
                  </g>
                </svg>
              </div>
            </button>
          </li>
        ))}
      </ul>

      {/* Temporary fix will be deprecated once the payment gate away done  */}
      <FormControl>
        <RadioGroup
          aria-labelledby="payops aria label"
          name="payops"
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            props.onChange((event.target as HTMLInputElement).value);
          }}
        >
          {paymentSelected === "COD" ? (
            <>
              {getSessionState.data?.payops_list.map((payops, i) =>
                payops.name === "CASH" ? (
                  <FormControlLabel
                    key={i}
                    value={payops.id}
                    control={<Radio required />}
                    label={
                      <img
                        src={`${REACT_APP_DOMAIN_URL}api/assets/images/shared/payops/payops${payops.id}.png`}
                        alt=""
                      />
                    }
                  />
                ) : null
              )}
            </>
          ) : null}

          {paymentSelected === "BANK-ACCOUNT" ? (
            <>
              {getSessionState.data?.payops_list.map((payops, i) =>
                !payops.qr_code && payops.name !== "CASH" ? (
                  <FormControlLabel
                    key={i}
                    value={payops.id}
                    control={<Radio required />}
                    label={
                      <img
                        src={`${REACT_APP_DOMAIN_URL}api/assets/images/shared/payops/payops${payops.id}.png`}
                        alt=""
                      />
                    }
                  />
                ) : null
              )}
            </>
          ) : null}

          {paymentSelected === "E-WALLET" ? (
            <>
              {getSessionState.data?.payops_list.map((payops, i) =>
                payops.qr_code ? (
                  <FormControlLabel
                    key={i}
                    value={payops.id}
                    control={<Radio required />}
                    label={
                      <img
                        src={`${REACT_APP_DOMAIN_URL}api/assets/images/shared/payops/payops4.png`}
                        alt="Pay Ops"
                      />
                    }
                  />
                ) : null
              )}
            </>
          ) : null}
        </RadioGroup>
      </FormControl>

      <PaymentCardModal
        open={openPaymentCardModal}
        onClose={() => {
          setOpenPaymentCardModal(false);
        }}
      />
    </>
  );
}
