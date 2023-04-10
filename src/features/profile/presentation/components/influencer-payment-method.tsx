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
    id: 4,
    type: 3,
    name: "GCASH",
    acct: "TATERS",
    acct_name: "GCASH",
    qr_code: "gcash_qr.png",
  },
];

export function InfluencerPaymentMethod(props: InfluencerPaymentMethodProps) {
  return (
    <FormControl>
      <RadioGroup
        aria-labelledby="payops aria label"
        name="payops"
        value={props.paymentSelected}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          props.setPaymentSelected((event.target as HTMLInputElement).value);
        }}
      >
        <div className="mt-2 flex flex-col space-y-2">
          <div>
            {PAYOPS_LIST.map((payops, i) => (
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
            ))}
          </div>
          <div className="flex space-x-4">
            <MaterialInput
              colorTheme="black"
              size="small"
              required
              name="bankAccountNumber"
              label={
                props.paymentSelected === "4"
                  ? "Phone Number"
                  : "Bank Account Number"
              }
              value={props.accountNumber}
              onChange={(e) => {
                props.setAccountNumber(e.target.value);
              }}
            />
            <MaterialInput
              colorTheme="black"
              size="small"
              required
              name="accountName"
              label={
                props.paymentSelected === "4"
                  ? "E-Wallet Name"
                  : "Bank Account Name"
              }
              value={props.accountName}
              onChange={(e) => {
                props.setAccountName(e.target.value);
              }}
            />
          </div>
        </div>
      </RadioGroup>
    </FormControl>
  );
}
