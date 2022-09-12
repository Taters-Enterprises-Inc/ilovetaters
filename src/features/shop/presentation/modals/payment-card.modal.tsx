import TextField from "@mui/material/TextField";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import { IoMdClose } from "react-icons/io";

interface PaymentCardModalProps {
  open: boolean;
  onClose: () => void;
}

export function PaymentCardModal(props: PaymentCardModalProps) {
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

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Card Details</h1>
            <div className="flex items-center justify-center space-x-2">
              <img
                className="w-[30px] h-[24px]"
                src={`${REACT_APP_DOMAIN_URL}api/assets/images/shared/cards/visa.png`}
              />
              <img
                className="w-[30px] h-[24px]"
                src={`${REACT_APP_DOMAIN_URL}api/assets/images/shared/cards/master.png`}
              />
              <img
                className="w-[30px] h-[24px]"
                src={`${REACT_APP_DOMAIN_URL}api/assets/images/shared/cards/jcb.png`}
              />
              <img
                className="w-[30px] h-[24px]"
                src={`${REACT_APP_DOMAIN_URL}api/assets/images/shared/cards/american-express.png`}
              />
            </div>
          </div>
          <TextField variant="outlined" label="Card Name" fullWidth />
          <div className="flex space-x-4">
            <TextField
              variant="outlined"
              label="Expiry Date (MM/YY)"
              className="flex-[0_0_70%] max-w-[70%]"
            />
            <TextField variant="outlined" label="CVV" />
          </div>
          <TextField variant="outlined" label="Name on Card" fullWidth />
          <div className="flex items-center justify-end space-x-4">
            <button className="font-bold">Cancel</button>
            <button className="px-4 py-1 text-white rounded-full bg-button">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
