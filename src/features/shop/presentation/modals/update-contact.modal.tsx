import { useAppDispatch } from "features/config/hooks";
import { ContactModel } from "features/shared/core/domain/contact.model";
import { MaterialPhoneInput } from "features/shared/presentation/components";
import { updateContact } from "features/shared/presentation/slices/update-contact.slice";
import { FormEvent, useState } from "react";
import { IoMdClose } from "react-icons/io";

interface UpdateContactModalProps {
  open: boolean;
  onClose: any;
  contact?: ContactModel;
}
interface UpdateContactFormElements extends HTMLFormControlsCollection {
  phoneNumber: HTMLInputElement;
}

interface UpdateContactFormElement extends HTMLFormElement {
  readonly elements: UpdateContactFormElements;
}

export function UpdateContactModal(props: UpdateContactModalProps) {
  const dispatch = useAppDispatch();
  const [contact, setContact] = useState<string>("");

  if (props.open && props.contact) {
    document.body.classList.add("overflow-hidden");
  } else {
    document.body.classList.remove("overflow-hidden");
    return null;
  }

  const handleUpdateContact = (e: FormEvent<UpdateContactFormElement>) => {
    if (props.contact) {
      props.onClose();

      dispatch(
        updateContact({
          id: props.contact.id,
          body: {
            contact: contact,
          },
        })
      );
    }

    e.preventDefault();
  };

  return (
    <div className="fixed inset-0 z-30 flex items-start justify-center overflow-auto bg-black bg-opacity-30 backdrop-blur-sm">
      <div className="bg-paper px-4 pt-[30px] pb-3 round w-[90%] lg:w-[400px] mt-10 relative rounded-[10px]">
        <button
          className="absolute text-2xl text-secondary top-2 right-4"
          onClick={() => {
            document.body.classList.remove("overflow-hidden");
            props.onClose();
          }}
        >
          <IoMdClose />
        </button>

        <form onSubmit={handleUpdateContact}>
          <div className="text-secondary text-3xl flex justify-center items-center space-x-2 font-['Bebas_Neue'] tracking-[2px] text-center border-secondary border-2 rounded-t-2xl py-2 my-4">
            <span>Update Contact</span>
          </div>
          <div className="space-y-4">
            <MaterialPhoneInput
              colorTheme="black"
              onChange={(e) => {
                setContact(e.target.value);
              }}
              required
              fullWidth
              value={contact}
              name="contact"
            />

            <button
              type="submit"
              className="w-full py-2 text-lg text-white border rounded-lg bg-button border-whitet"
            >
              Update Contact
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
