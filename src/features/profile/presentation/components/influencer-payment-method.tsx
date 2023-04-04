import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import { ChangeEvent, useState } from "react";
import { MaterialInput } from "features/shared/presentation/components";

interface InfluencerPaymentMethodOption {
  name: string;
  value: string;
}
const PAYMENT_OPTIONS: Array<InfluencerPaymentMethodOption> = [
  {
    name: "E-Wallet",
    value: "E-WALLET",
  },
  {
    name: "Bank Account",
    value: "BANK-ACCOUNT",
  },
];

interface InfluencerPaymentMethodProps {
  paymentSelected: string;
  accountNumber: string;
  accountName: string;
  setPaymentSelected: (payment: string) => void;
  setAccountNumber: (value: string) => void;
  setAccountName: (value: string) => void;
}

const PAYOPS_LIST = [
  {
    id: 1,
    type: 3,
    name: "BPI",
    acct: "0381-0160-99",
    acct_name: "Taters Enterprises, Inc.",
    qr_code: "",
  },
  {
    id: 2,
    type: 3,
    name: "BDO",
    acct: "0006-7804-8382",
    acct_name: "Taters Enterprises, Inc.",
    qr_code: "",
  },
  {
    id: 3,
    type: 3,
    name: "CASH",
    acct: "",
    acct_name: "Taters Enterprises, Inc.",
    qr_code: "",
  },
  {
    id: 4,
    type: 3,
    name: "GCASH",
    acct: "TATERS",
    acct_name: "GCASH",
    qr_code: "gcash_qr.png",
  },
];

export function InfluencerPaymentMethod(props: InfluencerPaymentMethodProps) {
  const [paymentSectionSelected, setPaymentSectionSelected] =
    useState("E-WALLET");

  const handleInfluencerPaymentMethodChange = (
    option: InfluencerPaymentMethodOption
  ) => {
    setPaymentSectionSelected(option.value);
  };

  return (
    <>
      <ul className="flex space-x-2">
        {PAYMENT_OPTIONS.map((option) => (
          <li>
            <button
              type="button"
              onClick={() => handleInfluencerPaymentMethodChange(option)}
              className={`relative px-4 py-3 font-semibold border w-full text-sm lg:text-base lg:w-fit ${
                option.value === paymentSectionSelected
                  ? "text-green-900 border-green-900"
                  : " text-secondary border-secondary"
              } `}
            >
              {option.name}
              <div
                className={`payment-method-active ${
                  option.value === paymentSectionSelected ? "" : "hidden"
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

      <FormControl>
        <RadioGroup
          aria-labelledby="payops aria label"
          name="payops"
          value={props.paymentSelected}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            props.setPaymentSelected((event.target as HTMLInputElement).value);
          }}
        >
          {paymentSectionSelected === "BANK-ACCOUNT" ? (
            <div className="mt-2 flex flex-col space-y-2">
              <MaterialInput
                colorTheme="black"
                name="bankAccountNumber"
                label="Account Number"
                value={props.accountNumber}
                size="small"
                onChange={(e) => {
                  props.setAccountNumber(e.target.value);
                }}
              />
              <MaterialInput
                colorTheme="black"
                name="accountName"
                label="Bank Account Name"
                value={props.accountName}
                size="small"
                onChange={(e) => {
                  props.setAccountName(e.target.value);
                }}
              />
              {PAYOPS_LIST.map((payops, i) => (
                <>
                  {payops.name !== "GCASH" &&
                  payops.name !== "PAYMAYA" &&
                  payops.name !== "CASH" ? (
                    <FormControlLabel
                      value={payops.id}
                      control={<Radio required />}
                      label={
                        <img
                          src={`${REACT_APP_DOMAIN_URL}api/assets/images/shared/payops/payops${payops.id}.png`}
                          alt=""
                        />
                      }
                    />
                  ) : null}
                </>
              ))}
            </div>
          ) : null}

          {paymentSectionSelected === "E-WALLET" ? (
            <div className="mt-2 flex flex-col space-y-2">
              <MaterialInput
                colorTheme="black"
                name="phoneNumber"
                label="Phone Number"
                value={props.accountNumber}
                size="small"
                onChange={(e) => {
                  props.setAccountNumber(e.target.value);
                }}
              />
              <MaterialInput
                colorTheme="black"
                name="accountName"
                label="Account Name"
                value={props.accountName}
                size="small"
                onChange={(e) => {
                  props.setAccountName(e.target.value);
                }}
              />
              {PAYOPS_LIST.map((payops, i) => (
                <>
                  {payops.name === "PAYMAYA" || payops.name === "GCASH" ? (
                    <FormControlLabel
                      value={payops.id}
                      control={<Radio required />}
                      label={
                        <img
                          src={`${REACT_APP_DOMAIN_URL}api/assets/images/shared/payops/payops4.png`}
                          alt="Pay Ops"
                        />
                      }
                    />
                  ) : null}
                </>
              ))}
            </div>
          ) : null}
        </RadioGroup>
      </FormControl>
    </>
  );
}
