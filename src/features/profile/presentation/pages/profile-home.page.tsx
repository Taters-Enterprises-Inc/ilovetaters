import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { ContactModel } from "features/shared/core/domain/contact.model";
import { MaterialInput } from "features/shared/presentation/components";
import { AddContactModal } from "features/shared/presentation/modals";
import {
  AddContactState,
  selectAddContact,
} from "features/shared/presentation/slices/add-contact.slice";
import {
  deleteContact,
  DeleteContactState,
  selectDeleteContact,
} from "features/shared/presentation/slices/delete-contact.slice";
import {
  getContacts,
  selectGetContacts,
} from "features/shared/presentation/slices/get-contacts.slice";
import {
  getSession,
  selectGetSession,
} from "features/shared/presentation/slices/get-session.slice";
import { selectUpdateContact } from "features/shared/presentation/slices/update-contact.slice";
import { UpdateContactModal } from "features/shop/presentation/modals";
import { useEffect, useState } from "react";
import { BsFillTrashFill } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { IoMdAdd } from "react-icons/io";
import { useLocation } from "react-router-dom";
import { ProfileContainer } from "../components/profile-container";

export function ProfileHome() {
  const getSessionState = useAppSelector(selectGetSession);
  const addContactState = useAppSelector(selectAddContact);
  const deleteContactState = useAppSelector(selectDeleteContact);
  const updateContactState = useAppSelector(selectUpdateContact);
  const getContactsState = useAppSelector(selectGetContacts);
  const dispatch = useAppDispatch();

  const [openAddContactModal, setOpenAddContactModal] = useState(false);
  const [openUpdateContactModal, setOpenUpdateContactModal] = useState<{
    status: boolean;
    contact?: ContactModel;
  }>({
    status: false,
    contact: undefined,
  });

  useEffect(() => {
    if (
      addContactState.status === AddContactState.success ||
      deleteContactState.status === DeleteContactState.success
    ) {
      dispatch(getContacts());
      dispatch(getSession());
    }
  }, [addContactState, deleteContactState]);

  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location]);

  return (
    <>
      <ProfileContainer title="My Profile" activeTab="profile">
        <h1 className="text-secondary font-['Bebas_Neue'] tracking-[3px] text-3xl leading-6">
          Personal Information
        </h1>

        {getSessionState.data ? (
          <>
            <div className="flex space-x-4">
              <MaterialInput
                colorTheme="black"
                required
                className="flex-1"
                label="First Name"
                onChange={() => {}}
                name="firstName"
                value={getSessionState.data.userData.first_name}
              />

              <MaterialInput
                colorTheme="black"
                required
                className="flex-1"
                label="Last Name"
                onChange={() => {}}
                name="lastName"
                value={getSessionState.data.userData.last_name}
              />
            </div>

            <MaterialInput
              colorTheme="black"
              required
              className="flex-1"
              label="E-mail"
              onChange={() => {}}
              name="email"
              fullWidth
              value={getSessionState.data.userData.email}
            />

            <div className="py-8 space-y-4">
              <div className="flex items-center justify-between">
                <h1 className="text-secondary font-['Bebas_Neue'] tracking-[3px] text-3xl leading-6">
                  Contact
                </h1>
                <button
                  onClick={() => {
                    setOpenAddContactModal(true);
                  }}
                  className="bg-button border border-secondary  text-white text-xl shadow-lg w-[100px] h-[40px] flex justify-center items-center rounded-md"
                >
                  <IoMdAdd />
                </button>
              </div>

              <div className="space-y-4">
                {getContactsState.data?.map((val) => (
                  <div className="flex">
                    <div className="flex-1 border border-secondary rounded-l-md">
                      <input
                        readOnly
                        className="w-full px-4 py-4 bg-transparent text-secondary"
                        value={val.contact}
                      />
                    </div>
                    <button
                      onClick={() => {
                        setOpenUpdateContactModal({
                          status: true,
                          contact: val,
                        });
                      }}
                      className="px-4 text-white bg-blue-700 border border-blue-700"
                    >
                      <FiEdit />
                    </button>
                    <button
                      onClick={() => {
                        dispatch(
                          deleteContact({
                            id: val.id,
                          })
                        );
                      }}
                      className="px-4 text-white bg-orange-700 border border-orange-700"
                    >
                      <BsFillTrashFill />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : null}
      </ProfileContainer>
      <AddContactModal
        open={openAddContactModal}
        onClose={() => {
          setOpenAddContactModal(false);
        }}
      />

      <UpdateContactModal
        open={openUpdateContactModal.status}
        contact={openUpdateContactModal.contact}
        onClose={() => {
          setOpenUpdateContactModal({
            status: false,
            contact: undefined,
          });
        }}
      />
    </>
  );
}
