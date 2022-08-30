import { useAppDispatch } from "features/config/hooks";
import { ContactModel } from "features/shared/core/domain/contact.model";
import { updateContact } from "features/shared/presentation/slices/update-contact.slice";
import { useRef } from "react";
import { IoMdClose } from "react-icons/io";
import PhoneInput from "react-phone-input-2";

interface UpdateContactModalProps {
  open: boolean;
  onClose: any;
  contact?: ContactModel;
}

export function UpdateContactModal(props: UpdateContactModalProps) {
  const dispatch = useAppDispatch();
  const phoneNumberRef = useRef(null);

  if (props.open && props.contact) {
    document.body.classList.add("overflow-hidden");
  } else {
    document.body.classList.remove("overflow-hidden");
    return null;
  }

  return (
    <div className="fixed inset-0 z-30 flex items-start justify-center overflow-auto bg-black bg-opacity-30 backdrop-blur-sm">
      <div className="bg-primary px-4 pt-[30px] pb-3 round w-[90%] lg:w-[400px] mt-10 relative rounded-[10px]">
        <button
          className="absolute text-2xl text-white top-2 right-4"
          onClick={() => {
            document.body.classList.remove("overflow-hidden");
            props.onClose();
          }}
        >
          <IoMdClose />
        </button>

        <div>
          <div className="text-white text-3xl flex justify-center items-center space-x-2 font-['Bebas_Neue'] tracking-[2px] text-center border-white border-2 rounded-t-2xl py-2 my-4">
            <span>Update Contact</span>
          </div>
          <div className="space-y-4">
            <PhoneInput
              country={"ph"}
              disableDropdown
              value={props.contact.contact}
              inputClass="!bg-transparent !text-white !py-[27px] !w-full"
              inputProps={{
                ref: phoneNumberRef,
                required: true,
              }}
              isValid={(value, country: any) => {
                if (value.match(/63/) || value.match(/09/)) {
                  return true;
                } else {
                  return "Please use +63 or 09";
                }
              }}
            />

            <button
              onClick={() => {
                const phoneNumber: any = phoneNumberRef.current;

                if (
                  (phoneNumber.value.match(/63/) &&
                    phoneNumber.value.length === 15) ||
                  (phoneNumber.value.match(/09/) &&
                    phoneNumber.value.length === 14)
                ) {
                  if (props.contact) {
                    dispatch(
                      updateContact({
                        id: props.contact.id,
                        body: {
                          contact: phoneNumber.value,
                        },
                      })
                    );
                  }

                  props.onClose();
                } else {
                  if (phoneNumber) {
                    phoneNumber.focus();
                  }
                }
              }}
              className="w-full py-2 text-lg text-white rounded-lg bg-button"
            >
              Update Contact
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}