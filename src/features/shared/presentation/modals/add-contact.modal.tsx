import { useAppDispatch } from "features/config/hooks";
import { addContact } from "features/shared/presentation/slices/add-contact.slice";
import { FormEvent, useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { PhoneInput } from "../components";

interface AddContactModalProps {
  open: boolean;
  onClose: any;
}
interface AddContactFormElements extends HTMLFormControlsCollection {
  phoneNumber: HTMLInputElement;
}

interface AddContactFormElement extends HTMLFormElement {
  readonly elements: AddContactFormElements;
}

export function AddContactModal(props: AddContactModalProps) {
  const dispatch = useAppDispatch();
  const [contact, setContact] = useState<string>("");

  if (props.open) {
    document.body.classList.add("overflow-hidden");
  } else {
    document.body.classList.remove("overflow-hidden");
    return null;
  }

  const handleAddContact = (e: FormEvent<AddContactFormElement>) => {
    dispatch(
      addContact({
        contact: contact,
      })
    );
    props.onClose();
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

        <form onSubmit={handleAddContact}>
          <div className="text-secondary text-3xl flex justify-center items-center space-x-2 font-['Bebas_Neue'] tracking-[2px] text-center border-secondary border-2 rounded-t-2xl py-2 my-4">
            <span>Add Contact</span>
          </div>
          <div className="space-y-4">
            <PhoneInput
              colorTheme="black"
              required
              fullWidth
              onChange={(e) => {
                setContact(e.target.value);
              }}
              name="contact"
              value={contact}
            />

            <button
              type="submit"
              className="w-full py-2 text-lg text-white border rounded-lg bg-button border-secondary"
            >
              Add Contact
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
