import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import { useState } from "react";
import { PaymentCardModal } from "../modals";
interface PaymentMethodOption {
  name: string;
  value: "COD" | "E-WALLET" | "CARD";
}
const PAYMENT_OPTIONS: Array<PaymentMethodOption> = [
  {
    name: "Cash on Delivery",
    value: "COD",
  },
  {
    name: "Payment Center / e-Wallet",
    value: "E-WALLET",
  },
  {
    name: "Credit / Debit Card",
    value: "CARD",
  },
];

export function PaymentMethod() {
  const [openPaymentCardModal, setOpenPaymentCardModal] = useState(false);
  const [paymentSelected, setPaymentSelected] = useState<
    "COD" | "E-WALLET" | "CARD"
  >("COD");

  const handlePaymentMethodChange = (option: PaymentMethodOption) => {
    if (option.value === "CARD") {
      setOpenPaymentCardModal(true);
      return;
    }
    setPaymentSelected(option.value);
  };

  return (
    <>
      <ul className="flex flex-col space-y-2 lg:flex-row lg:space-y-0 lg:space-x-2">
        {PAYMENT_OPTIONS.map((option) => (
          <li>
            <button
              type="button"
              onClick={() => handlePaymentMethodChange(option)}
              className={`relative px-4 py-3 font-semibold border w-full lg:w-fit ${
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
                  enable-background="new 0 0 12 12"
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

      {paymentSelected === "E-WALLET" ? (
        <FormControl>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
          >
            <FormControlLabel
              value="female"
              control={<Radio />}
              label={
                <img
                  src={`${REACT_APP_DOMAIN_URL}api/assets/images/shared/payops/payops4.png`}
                />
              }
            />
          </RadioGroup>
        </FormControl>
      ) : null}

      <PaymentCardModal
        open={openPaymentCardModal}
        onClose={() => {
          setOpenPaymentCardModal(false);
        }}
      />
    </>
  );
}
