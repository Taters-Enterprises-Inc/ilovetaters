import TextField from "@mui/material/TextField";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { ContactModel } from "features/shared/core/domain/contact.model";
import { selectAddContact } from "features/shared/presentation/slices/add-contact.slice";
import { deleteContact, selectDeleteContact } from "features/shared/presentation/slices/delete-contact.slice";
import { getContacts, selectGetContacts } from "features/shared/presentation/slices/get-contacts.slice";
import { getSession, selectGetSession } from "features/shared/presentation/slices/get-session.slice";
import { selectUpdateContact } from "features/shared/presentation/slices/update-contact.slice";
import { useEffect, useState } from "react";
import { BsFillTrashFill } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { IoMdAdd } from "react-icons/io";
import { useLocation } from "react-router-dom";
import { ShopProfileContainer } from "../components/shop-profile-container";
import { AddContactModal, UpdateContactModal } from "../modals";

export function ShopProfile(){
    const getSessionState = useAppSelector(selectGetSession);
    const addContactState = useAppSelector(selectAddContact);
    const deleteContactState = useAppSelector(selectDeleteContact);
    const updateContactState = useAppSelector(selectUpdateContact);
    const getContactsState = useAppSelector(selectGetContacts);
    const dispatch = useAppDispatch();

    const [openAddContactModal, setOpenAddContactModal] = useState(false);
    const [openUpdateContactModal, setOpenUpdateContactModal] = useState<{status: boolean; contact?: ContactModel}>({
        status: false,
        contact: undefined
    });

    useEffect(()=>{
        dispatch(getContacts());
        dispatch(getSession());
    },[addContactState, deleteContactState, updateContactState,dispatch]);
    
    const location = useLocation();
    
    useEffect(() => {
        window.scrollTo({top: 0, left: 0, behavior: 'auto'});
    }, [location]);

    return(
        <>
            <ShopProfileContainer title="My Profile" activeTab="profile">
                <h1 className="text-white font-['Bebas_Neue'] tracking-[3px] text-3xl leading-6">Personal Information</h1>

                <div className="flex space-x-4">
                    {
                        getSessionState.data?.userData.first_name? 
                        <TextField
                            required
                            label="First Name"
                            defaultValue={getSessionState.data?.userData.first_name}
                            className='flex-1'
                            name='firstName'
                        />
                        : null
                    }
                    <TextField required label="First Name" variant="outlined" className={`flex-1 ${getSessionState.data?.userData.first_name ? '!hidden' : ''}`} name='firstName'/>

                    {
                        getSessionState.data?.userData.last_name? 
                        <TextField
                            required
                            label="Last Name"
                            defaultValue={getSessionState.data?.userData.last_name}
                            className='flex-1'
                            name='lastName'
                        />
                        : null
                    }
                    <TextField required label="Last Name" variant="outlined" className={`flex-1 ${getSessionState.data?.userData.last_name ? '!hidden' : ''}`} name='lastName'/>

                </div>

                {
                    getSessionState.data?.userData.email? 
                    <TextField
                        required
                        label="E-mail"
                        defaultValue={getSessionState.data?.userData.email}
                        className='flex-1'
                        name='eMail'
                    />
                    : null
                }

                <TextField required label="E-mail" variant="outlined" className={`w-full ${getSessionState.data?.userData.email ? '!hidden' : ''}`} name='eMail'/>

                <div className="py-8 space-y-4">

                    <div className="flex justify-between items-center">
                        <h1 className="text-white font-['Bebas_Neue'] tracking-[3px] text-3xl leading-6">Contact</h1>
                        <button onClick={()=>{
                            setOpenAddContactModal(true);
                        }} className="bg-button text-white text-xl shadow-lg w-[100px] h-[40px] flex justify-center items-center rounded-md">
                            <IoMdAdd/>
                        </button>
                    </div>

                    <div className="space-y-4">
                        {
                            getContactsState.data?.map((val)=>(
                                <div className="flex">
                                    <div className="border border-white rounded-l-md flex-1">
                                        <input readOnly className="px-4 text-white py-4 bg-transparent w-full" value={val.contact}/>
                                    </div>
                                    <button onClick={()=>{
                                        setOpenUpdateContactModal({
                                            status: true,
                                            contact: val,
                                        })
                                    }} className="text-white border border-blue-700 bg-blue-700 px-4">
                                        <FiEdit/>
                                    </button>
                                    <button onClick={()=>{
                                        dispatch(deleteContact({
                                            id: val.id,
                                        }));
                                    }}  className="text-white border border-orange-700 bg-orange-700 px-4">
                                        <BsFillTrashFill/>
                                    </button>
                                </div>
                            ))
                        }
                        
                    </div>



                </div>
            </ShopProfileContainer>
            <AddContactModal open={openAddContactModal} onClose={()=>{
                setOpenAddContactModal(false);
            }}/>

            <UpdateContactModal open={openUpdateContactModal.status} contact={openUpdateContactModal.contact} onClose={()=>{
                setOpenUpdateContactModal({
                    status: false,
                    contact: undefined,
                })
            }}/>
        </>
    );
}