import {  REACT_APP_UPLOADS_URL } from "features/shared/constants";
import { Link } from "react-router-dom";
import { ShopHeaderNav } from "../header/shop-header-nav.component";
import { FooterNav } from "features/shared";
import { MdDeliveryDining } from "react-icons/md";
import { FaMapMarkerAlt, FaStore } from "react-icons/fa";
import { PaymentAccordion } from "../components/payment-accordion";
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Checkbox from "@mui/material/Checkbox";

export function ShopCheckout(){
    const navigate = useNavigate();

    return (
        <main className="bg-primary">

            <ShopHeaderNav/>

            <div className="bg-secondary lg:h-[240px] text-white">
            </div>
                
            <section className="min-h-screen container mx-auto lg:space-x-4 pb-36">
                
                <div className="lg:-mt-[200px] lg:space-y-8">

                    <div className="px-4 py-6 lg:py-0 flex flex-col lg:flex-row justify-between items-center bg-secondary space-y-2">
                        <h1 className="text-white font-['Bebas_Neue'] tracking-[3px] text-3xl leading-8">Checkout</h1>
                        
                        <nav className="flex" aria-label="Breadcrumb">

                            <ol className="inline-flex items-center space-x-1 md:space-x-3">
                                <li className="inline-flex items-center">
                                    <Link to='/shop' className="inline-flex items-center text-xs lg:text-base font-medium text-gray-700 dark:text-white dark:hover:text-white">
                                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
                                        Snackshop
                                    </Link>
                                </li>
                                <li>
                                <div className="flex items-center">
                                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                                    <Link to='/shop/products' className="ml-1 text-xs lg:text-base font-medium text-gray-700 md:ml-2 dark:text-white dark:hover:text-white">Products</Link>
                                </div>
                                </li>
                                <li aria-current="page">
                                <div className="flex items-center">
                                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                                    <span className="ml-1 text-xs lg:text-base font-medium text-white md:ml-2 ">Checkout</span>
                                </div>
                                </li>
                            </ol>

                        </nav>
                        
                    </div>
                    
                    <div className="flex">
                        <div className="flex-1">
                            <div className="bg-white h-[0.25rem] relative">
                                <div className="absolute rounded-[50%] bg-white font-bold h-[1.625rem] w-[1.625rem] text-center top-[-0.75rem] left-[50%] ml-[-0.8125rem]">1</div>
                            </div>
                            <div className="flex justify-center items-center mt-5 text-xs text-white">
                                Your Details
                            </div>
                        </div>
                        
                        <div className="flex-1">
                            <div className="bg-[#424242] h-[0.25rem] relative">
                                <div className="absolute rounded-[50%] text-white font-bold bg-[#424242] h-[1.625rem] w-[1.625rem] text-center top-[-0.75rem] left-[50%] ml-[-0.8125rem]">2</div>
                            </div>
                            <div className="flex justify-center items-center mt-5 text-xs text-white">
                                Payment
                            </div>
                        </div>

                        
                        <div className="flex-1">
                            <div className="bg-[#424242] h-[0.25rem] relative">
                                <div className="absolute rounded-[50%] text-white font-bold bg-[#424242] h-[1.625rem] w-[1.625rem] text-center top-[-0.75rem] left-[50%] ml-[-0.8125rem]">3</div>
                            </div>
                            <div className="flex justify-center items-center mt-5 text-xs text-white">
                                Complete
                            </div>
                        </div>

                    </div>
                    

                    <div className="bg-primary py-6 px-4 lg:shadow-[#540808] lg:shadow-md w-full lg:rounded-[30px] mb-10 lg:p-10 flex justify-between flex-col lg:flex-row">
                        
                        <div className="space-y-4 lg:flex-[0_0_55%] lg:max-w-[55%] order-2 lg:order-1 lg:mt-0 mt-4">
                            <TextField label="First Name" variant="outlined"/>
                            <TextField label="Last Name" variant="outlined"/>
                            <div className="flex lg:space-x-4 flex-col lg:flex-row space-y-4 lg:space-y-0">
                                <div className="flex-1">
                                    <TextField label="E-mail Address" variant="outlined"/>
                                </div>
                                <div className="flex-1">
                                    <TextField label="Phone Number" variant="outlined"/>
                                    <span className="text-xs text-tertiary underline underline-offset-4">Setup your phone number</span>
                                </div>
                            </div>
                            

                            <div className="text-white lg:mt-0 mt-4">
                                <h2 className="text-2xl font-['Bebas_Neue'] tracking-[2px]">Handling Method</h2>

                                <ul className="space-y-1 mt-2">
                                    <li className="flex space-x-2 items-center">
                                        <MdDeliveryDining className="text-2xl text-tertiary"/>
                                        <h3 className="text-sm">Delivery</h3>
                                    </li>
                                    <li className="flex space-x-3 items-start">
                                        <FaStore className="text-lg text-tertiary"/>
                                        <h3 className="text-sm">Store: Taters Robinsons Magnolia</h3>
                                    </li>
                                    <li className="flex space-x-3 items-start ">
                                        <FaMapMarkerAlt className="text-lg text-tertiary"/>
                                        <h3 className="text-sm flex-1">Store Address: 3rd Level, Robinsons Movieworld Magnolia Town Center, Brgy Kaunlara, Quezon City</h3>
                                    </li>
                                </ul>
                            </div>

                            <div className="text-white lg:mt-0 mt-4">
                                <h2 className="text-2xl font-['Bebas_Neue'] tracking-[2px]">Note: </h2>

                                <ul className="space-y-2 mt-2">
                                    <li>
                                        <h3 className="text-sm">Delivery and/or Pick-up of items are from Monday to Sunday (except holidays) between 11AM to 7PM</h3>
                                    </li>
                                    <li>
                                        <h3 className="text-sm">Delivery and/or Pick-up of product would be on the same day if paid before 5:00 pm</h3>
                                    </li>
                                    <li>
                                        <h3 className="text-sm">You will be charged with a delivery fee depending on your location</h3>
                                    </li>
                                    <li>
                                        <h3 className="text-sm">Our stores will reach out to you via SMS once orders are ready for delivery/pick-up</h3>
                                    </li>
                                </ul>
                            </div>
                            
                            <div className="text-white lg:mt-0 mt-4">
                                <h2 className="text-2xl font-['Bebas_Neue'] tracking-[2px]">Choose payment method</h2>
                                <PaymentAccordion />
                            </div>

                            <div className="flex justify-start items-center space-x-1 text-white">
                                <Checkbox />
                                <span>I agree with the </span>
                                <button className="text-tertiary">Terms & Conditions</button>
                            </div>

                            <div className="flex flex-col lg:flex-row lg:space-x-4">
                                <button className="bg-white font-bold text-black py-3 w-full uppercase border border-white rounded-xl mt-4 order-2 lg:order-1" onClick={()=>{
                                        navigate(-1);
                                }}>Go Back</button>

                                <button className="bg-[#CC5801] text-white py-3 w-full uppercase border rounded-xl mt-4 order-1 lg:order-2" onClick={()=>{
                                        navigate(-1);
                                }}>Checkout</button>
                            </div>
                        </div>

                        <div className="space-y-4 lg:flex-[0_0_40%] lg:max-w-[40%] order-1 lg:order-2">
                            <h2 className="font-['Bebas_Neue'] text-3xl  text-white tracking-[3px] text-center">Order Summary</h2>

                            <div className="flex bg-secondary shadow-md shadow-tertiary rounded-[10px]">
                                <img src={REACT_APP_UPLOADS_URL + "images/shop/products/100/test.jpg"} className="rounded-[10px] w-[92px] h-[92px]" alt="" />
                                <div className="flex-1 text-white px-3 py-2 flex flex-col">
                                    <h3 className="text-sm">Family Pack Tofu Chips</h3>
                                    <h3 className="text-xs">Quntity: <span className="text-tertiary">3</span></h3>
                                    <h3 className="text-xs">Flavor: <span className="text-tertiary">Natural</span></h3>
                                    <h3 className="text-base flex-1 flex justify-end items-end">₱ 295.00</h3>
                                </div>
                            </div>
                            <hr className="mt-1" />

                            <div className="grid grid-cols-2 text-white">
                                <span>Subtotal:</span>
                                <span className="text-end">₱ 295.00</span>
                                <span>Delivery Fee:</span>
                                <span className="text-end">₱ 0.00</span>
                                <span>Discount:</span>
                                <span className="text-end">( ₱ 0.00 )</span>
                            </div>

                            <h1 className="text-4xl text-center text-white">₱ 295.00</h1>
                        </div>
                    </div>
                </div>
            </section>

            <FooterNav/>

        </main>
    )
}