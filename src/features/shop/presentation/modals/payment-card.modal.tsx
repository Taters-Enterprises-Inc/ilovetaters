import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import { IoMdClose } from "react-icons/io";
import creditCardType, {
  getTypeInfo,
  types as CardType,
} from "credit-card-type";
import { useEffect, useState } from "react";
import { kMaxLength } from "buffer";
import { MaterialInput } from "features/shared/presentation/components";

interface PaymentCardModalProps {
  open: boolean;
  onClose: () => void;
}

//removed unwanted cards
creditCardType.removeCard(creditCardType.types.DINERS_CLUB);
creditCardType.removeCard(creditCardType.types.DISCOVER);
creditCardType.removeCard(creditCardType.types.UNIONPAY);
creditCardType.removeCard(creditCardType.types.MAESTRO);
creditCardType.removeCard(creditCardType.types.ELO);
creditCardType.removeCard(creditCardType.types.MIR);
creditCardType.removeCard(creditCardType.types.HIPER);
creditCardType.removeCard(creditCardType.types.HIPERCARD);

export function PaymentCardModal(props: PaymentCardModalProps) {
  const [cardNumber, setCardNumber] = useState("");
  const [cardType, setCardTypeState] = useState("");
  const [cardLengthMin, setCardLengthMinState] = useState(Number);
  const [cardLengthMax, setCardLengthMaxState] = useState(Number);
  const [cardCodeName, setCardCodeNameState] = useState("CVV/CVC/CID");
  const [cardCodeSize, setCardCodeTypeState] = useState(Number);

  useEffect(() => {
    if (cardNumber !== "") {
      creditCardType(cardNumber).filter(function (card) {
        setCardTypeState(card.type);
        setCardLengthMinState(card.lengths[0]);
        setCardLengthMaxState(card.lengths[card.lengths.length - 1]);
        setCardCodeNameState(card.code.name);
        setCardCodeTypeState(card.code.size);
      });
    }
  }, [cardNumber]);

  const limiter = (e: { target: { value: string } }, size: number) => {
    e.target.value = Math.max(0, parseInt(e.target.value))
      .toString()
      .slice(0, size);
  };

  const formatAndSetCcNumber = (e: { target: { value: string } }) => {
    const inputVal = e.target.value.replace(/ /g, "");
    let inputNumbersOnly = inputVal.replace(/\D/g, "");

    if (inputVal === "") {
      setCardCodeNameState("CVV/CVC/CID");
    }

    if (inputNumbersOnly.length > cardLengthMax) {
      inputNumbersOnly = inputNumbersOnly.substring(0, 16);
    }

    const splits = inputNumbersOnly.match(/.{1,4}/g);

    let spacedNumber = "";
    if (splits) {
      spacedNumber = splits.join(" ");
    }

    setCardNumber(spacedNumber);
  };

  const handleOnSubmit = () => {
    //HANDLE SUBMIT HERE
  };

  if (props.open) {
    document.body.classList.add("overflow-hidden");
  } else {
    document.body.classList.remove("overflow-hidden");
    return null;
  }

  return (
    <div className="fixed inset-0 z-30 flex items-start justify-center overflow-auto bg-black bg-opacity-30 backdrop-blur-sm">
      <div className="bg-white border-secondary border-2 px-4 pt-[30px] pb-3 round w-[90%] lg:w-[580px] mt-10 relative rounded-[10px]">
        <button
          className="absolute text-2xl text-secondary top-2 right-4 "
          onClick={() => {
            document.body.classList.remove("overflow-hidden");
            props.onClose();
          }}
        >
          <IoMdClose />
        </button>
        <form onSubmit={handleOnSubmit}>
          <div className="space-y-2">
            <div className="flex flex-col space-y-3 lg:items-center lg:justify-between lg:flex-row lg:space-y-0">
              <h1 className="text-2xl font-bold">Card Details</h1>
              <div className="flex items-center justify-end space-x-2">
                <img
                  className={`w-[30px] h-[24px] ${
                    cardType === "visa" || cardNumber === "" ? "" : "grayscale"
                  } `}
                  src={`${REACT_APP_DOMAIN_URL}api/assets/images/shared/cards/visa.png`}
                />
                <img
                  className={`w-[30px] h-[24px] ${
                    cardType === "mastercard" || cardNumber === ""
                      ? ""
                      : "grayscale"
                  } `}
                  src={`${REACT_APP_DOMAIN_URL}api/assets/images/shared/cards/master.png`}
                />
                <img
                  className={`w-[30px] h-[24px] ${
                    cardType === "jcb" || cardNumber === "" ? "" : "grayscale"
                  } `}
                  src={`${REACT_APP_DOMAIN_URL}api/assets/images/shared/cards/jcb.png`}
                />
                <img
                  className={`w-[30px] h-[24px] ${
                    cardType === "american-express" || cardNumber === ""
                      ? ""
                      : "grayscale"
                  } `}
                  src={`${REACT_APP_DOMAIN_URL}api/assets/images/shared/cards/american-express.png`}
                />
              </div>
            </div>
            <MaterialInput
              colorTheme="black"
              value={cardNumber}
              onChange={formatAndSetCcNumber}
              autoComplete="off"
              label="Card Number"
              name="cardNumber"
              fullWidth
              required
            />
            <div className="flex space-x-2">
              <MaterialInput
                colorTheme="black"
                onChange={() => {}}
                value=""
                name="expiryDate"
                label="Expiry Date (MM/YY)"
                className="flex-[0_0_70%] max-w-[70%]"
                onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                  limiter(e, 4);
                }}
                type="number"
                required
              />
              <MaterialInput
                colorTheme="black"
                onChange={() => {}}
                value=""
                name="expiryDate"
                type="number"
                onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                  limiter(e, cardCodeSize);
                }}
                label={cardCodeName}
                fullWidth
                required
              />
            </div>
            <MaterialInput
              colorTheme="black"
              onChange={() => {}}
              name="cardHolderName"
              value=""
              label="Card holder's name"
              inputProps={{ maxlength: 32 }}
              fullWidth
              required
            />
            <div className="flex items-center justify-end space-x-4">
              <button
                className="font-bold"
                onClick={() => {
                  props.onClose();
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1 text-white rounded-full bg-button"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
