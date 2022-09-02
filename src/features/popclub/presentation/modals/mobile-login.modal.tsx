import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import { HiOutlinePhone } from "react-icons/hi";
import { MdLockOutline } from "react-icons/md";
import { AiFillUnlock } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { useState, useRef } from "react";
import { IoMdClose } from 'react-icons/io';
import PhoneInput from "react-phone-input-2";

interface MobileLoginModalProps {

    open: boolean;
    onClose: () => void;
}

export function MobileLoginModal(props: MobileLoginModalProps) {

    const [message, setMessage]     = useState("Login with your mobile number and password below.");
    const [display, setDisplay]     = useState("none");
    const [button, setButton]       = useState("Sign in");
    const [inactive, setInactive]   = useState(" text-white");
    const [active, setActive]       = useState(" border-b-2 border-tertiary text-tertiary");

    const phoneNumberRef = useRef(null);

    return (
        <main style={{ display: props.open ? "flex" : "none" }}
            className="h-screen bg-primary ">
            <section className="fixed inset-0 z-30 grid h-screen ml-2 mr-2 place-items-center bg-secondary bg-opacity-30 backdrop-blur-sm">
                <div className='bg-secondary max-w-[350px] mx-auto p-6 px-6 
                    font-["Roboto"] text-sm text-center rounded-3xl shadow-md shadow-tertiary'>    
                    <div className="pb-8">
                        <button
                                    className="float-right text-xl text-white mb-1.5"
                                    onClick={props.onClose}>
                                <IoMdClose />
                        </button>               
                        <ul className="flex items-center justify-evenly">
                            <li className={"flex items-center justify-center w-1/2 pb-2 text-base cursor-pointer border-tertiary hover:border-b-2 hover:border-tertiary hover:text-tertiary"
                                + (active)}
                                onClick={() => {
                                    setMessage("Login with your mobile number and password below.");
                                    setDisplay("none");
                                    setButton("Sign in");
                                    setInactive(" text-white");
                                    setActive(" border-b-2 text-tertiary");
                                }}
                                >    
                                <AiFillUnlock className="mr-2"/>
                                Sign in
                            </li>
                            <li className={"flex items-center justify-center w-1/2 pb-2 text-base cursor-pointer hover:border-b-2 hover:border-tertiary hover:text-tertiary"
                                + (inactive)}
                                onClick={() => {
                                    setMessage("Please fill up the required information for each field.");
                                    setDisplay("flex");
                                    setButton("Sign up");
                                    setInactive(" border-b-2 border-tertiary text-tertiary");
                                    setActive(" text-white");
                                }}>
                                <CgProfile className="mr-2"/>
                                Sign up
                            </li> 
                        </ul>
                    </div>
                    
                    <div className="flex items-center justify-center header_image">
                        <img src={`${REACT_APP_DOMAIN_URL}api/assets/images/shop/snackshop-logo-creamy-red.png`}
                            alt="taterslogo"
                            className="w-36">
                        </img>
                    </div>
                        
                    <div className="pt-4 login-body">
                        <form>
                            <p className="text-white"> {message} </p>
                                
                            <div style={{display}} className="items-center justify-between hidden w-full mt-6">
                                <div className="flex items-center justify-center w-[49%] bg-gray-100 rounded-2xl">
                                    <CgProfile className="m-3" />
                                    <input
                                        type="text"
                                        name="firstName"
                                        placeholder="First Name"
                                        className="w-full text-sm bg-gray-100 outline-none none h-9 rounded-2xl">
                                    </input>
                                </div>
                                <div className="flex items-center justify-center w-[49%] bg-gray-100 rounded-2xl">
                                    <CgProfile className="m-3" />
                                    <input
                                        type="text"
                                        name="lastName"
                                        placeholder="Last Name"
                                        className="w-full text-sm bg-gray-100 outline-none h-9 rounded-2xl">
                                    </input>
                                </div>
                            </div>
                                
                            <div className="flex items-center w-full mt-4 bg-gray-100 rounded-2xl font-['Roboto']">
                                <PhoneInput
                                    country={"ph"}
                                    disableDropdown
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
                                    placeholder="Use +63 or 09 format"
                                    inputStyle={{
                                        flex: "1, 1, 10%",
                                        width: "100%",
                                        fontSize: "0.875rem",
                                        lineHeight: "1.25rem",
                                        backgroundColor: "rgb(243, 244, 246)",
                                        outline: "2px solid transparent",
                                        outlineOffset: "2px",
                                        height: "2.25rem",
                                        borderRadius: "1rem",
                                        fontStyle: "Roboto",
                                    }}
                                    buttonStyle={{
                                        borderRadius: "1rem",
                                        pointerEvents: "none",
                                    }}
                                />
                           </div>
                            <div style={{display}} className="items-center hidden w-full mt-4 bg-gray-100 rounded-2xl">
                                <MdLockOutline className="m-3" />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    className="flex-1 w-full mr-4 text-sm bg-gray-100 outline-none h-9">
                                </input>
                            </div>
                            <div className="flex items-center w-full mt-4 bg-gray-100 rounded-2xl">
                                    <MdLockOutline className="m-3" />
                                    <input
                                        type="password"
                                        name="passw"
                                        placeholder="Password"
                                        className="flex-1 w-full mr-4 text-sm bg-gray-100 outline-none h-9">
                                    </input>
                            </div>
                                
                            <div className="flex justify-between py-4 text-white">
                                <p className="flex items-center">
                                    <input className="mr-2" type="checkbox" />
                                    Remember Me
                                </p>
                                <a href="#"> Forgot Password? </a>
                            </div>
                            <button className="w-full py-2 my-2 text-white shadow-md bg-button rounded-3xl">
                                {button}
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </main>
    );
}

