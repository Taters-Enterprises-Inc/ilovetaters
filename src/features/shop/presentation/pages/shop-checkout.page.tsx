import {  REACT_APP_UPLOADS_URL } from "features/shared/constants";
import { Link, useLocation } from "react-router-dom";
import { ShopHeaderNav } from "../header/shop-header-nav.component";
import { FooterNav } from "features/shared";
import { MdDeliveryDining, MdPayment } from "react-icons/md";
import { FaMapMarkerAlt, FaStore } from "react-icons/fa";
import { PaymentAccordion } from "../components/payment-accordion";
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Checkbox from "@mui/material/Checkbox";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { getSession, selectGetSession } from "features/shared/presentation/slices/get-session.slice";
import { FormEvent, useEffect } from "react";
import NumberFormat from "react-number-format";
import { BiUserCircle } from 'react-icons/bi';
import { AiOutlineCheckCircle, AiOutlineCreditCard } from "react-icons/ai";
import { checkoutOrders, CheckoutOrdersState, resetCheckoutOrders, selectCheckoutOrders } from "../slices/checkout-orders.slice";

interface formDataType {[key:string]: FormDataEntryValue}

export function ShopCheckout(){
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const getSessionState = useAppSelector(selectGetSession);
    const checkoutOrdersState = useAppSelector(selectCheckoutOrders);
    const location = useLocation();

    useEffect(()=>{
        if( checkoutOrdersState.status === CheckoutOrdersState.success && checkoutOrdersState.data){
            navigate(`/shop/order/${checkoutOrdersState.data.hash}`);
            dispatch(resetCheckoutOrders());
        }
    },[checkoutOrdersState, dispatch]);

    useEffect(()=>{
        dispatch(getSession());
    },[dispatch]);
    
    useEffect(() => {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    }, [location]);

    const handleCheckout =(e : FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        const responseBody: any = {};
        
        const formData = new FormData(e.currentTarget as HTMLFormElement)

        formData.forEach((value, property:string) => responseBody[property] = value);

        dispatch(checkoutOrders(responseBody));
    }

    const calculateSubTotalPrice =()=>{
        let calculatedPrice = 0;
        const orders = getSessionState.data?.orders;

        if(orders){
            for(let i = 0; i < orders.length; i++){
                calculatedPrice += orders[i].prod_calc_amount;
            }
            return <NumberFormat value={calculatedPrice.toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'₱'} />
        }else {
        return <NumberFormat value={0} displayType={'text'} thousandSeparator={true} prefix={'₱'} />
        }
    }
    
    const calculateDeliveryFee =()=>{

        if(getSessionState.data?.distance_rate_price){
            return <NumberFormat value={getSessionState.data.distance_rate_price.toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'₱'} />
        }else {
            return <NumberFormat value={0} displayType={'text'} thousandSeparator={true} prefix={'₱'} />
        }
    }

    const calculateTotalPrice =()=>{
        let calculatedPrice = 0;
        const orders = getSessionState.data?.orders;

        if(orders && getSessionState.data?.distance_rate_price){
            for(let i = 0; i < orders.length; i++){
                calculatedPrice += orders[i].prod_calc_amount;
            }

            calculatedPrice += getSessionState.data.distance_rate_price;
            return <NumberFormat value={calculatedPrice.toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'₱'} />
        }else {
         return <NumberFormat value={0} displayType={'text'} thousandSeparator={true} prefix={'₱'} />
        }
    }

    return (
        <>
            <div className="bg-secondary lg:h-[240px] text-white">
            </div>
                
            <section className="min-h-screen lg:space-x-4 pb-36">
                <div className="lg:-mt-[200px] lg:space-y-8">

                    <div className="py-6 lg:py-0 flex flex-col lg:flex-row justify-between items-center bg-secondary lg:container space-y-2 lg:space-y-0">
                        <h1 className="text-white font-['Bebas_Neue'] tracking-[3px] text-3xl leading-6">Checkout</h1>
                        
                        <nav className="flex" aria-label="Breadcrumb">

                            <ol className="inline-flex items-center space-x-1 md:space-x-3">
                                <li className="inline-flex items-center">
                                    <Link to='/shop' className="inline-flex items-center text-xs lg:text-base font-medium text-gray-400">
                                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
                                        Snackshop
                                    </Link>
                                </li>
                                <li>
                                <div className="flex items-center">
                                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                                    <Link to='/shop/products' className="ml-1 text-xs lg:text-base font-medium text-gray-400 md:ml-2">Products</Link>
                                </div>
                                </li>
                                <li aria-current="page">
                                <div className="flex items-center">
                                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                                    <span className="ml-1 text-xs lg:text-base font-medium text-white md:ml-2 ">Checkout</span>
                                </div>
                                </li>
                            </ol>

                        </nav>
                        
                    </div>
                    
                    <div className="flex lg:container">
                        <div className="flex-1">
                            <div className="bg-white h-[0.25rem] relative">
                                <div className="absolute rounded-[50%] bg-white font-bold h-[1.625rem] w-[1.625rem] text-center top-[-0.75rem] left-[50%] ml-[-0.8125rem]">1</div>
                            </div>
                            <div className="flex justify-center items-center mt-5 text-xs text-white space-x-1 pl-4 lg:pl-0">
                                <BiUserCircle className="text-2xl"/> <span>Your Details</span>
                            </div>
                        </div>
                        
                        <div className="flex-1">
                            <div className="bg-[#424242] h-[0.25rem] relative">
                                <div className="absolute rounded-[50%] text-white font-bold bg-[#424242] h-[1.625rem] w-[1.625rem] text-center top-[-0.75rem] left-[50%] ml-[-0.8125rem]">2</div>
                            </div>
                            <div className="flex justify-center items-center mt-5 text-xs text-white space-x-1">
                                <AiOutlineCreditCard className="text-2xl"/> <span>Payment</span>
                            </div>
                        </div>

                        
                        <div className="flex-1">
                            <div className="bg-[#424242] h-[0.25rem] relative">
                                <div className="absolute rounded-[50%] text-white font-bold bg-[#424242] h-[1.625rem] w-[1.625rem] text-center top-[-0.75rem] left-[50%] ml-[-0.8125rem]">3</div>
                            </div>
                            <div className="flex justify-center items-center mt-5 text-xs text-white space-x-1 pr-4 lg:pr-0">
                                <AiOutlineCheckCircle className="text-2xl"/> <span>Complete</span>
                            </div>
                        </div>

                    </div>

                    <div className="container">
                        <form 
                            onSubmit={handleCheckout}
                            className="bg-primary py-6 lg:shadow-[#540808] lg:shadow-md w-full lg:rounded-[30px] mb-10 lg:p-10 flex justify-between flex-col lg:flex-row">
                            
                            <div className="space-y-4 lg:flex-[0_0_55%] lg:max-w-[55%] order-2 lg:order-1 lg:mt-0 mt-4">

                                {
                                    getSessionState.data?.userData.first_name ? 
                                    <TextField aria-readonly value={getSessionState.data.userData.first_name} variant="outlined" className="w-full" name='firstName'/>
                                    :
                                    <TextField required label="First Name" variant="outlined" className="w-full" name='firstName'/>
                                }

                                {
                                    getSessionState.data?.userData.last_name ? 
                                    <TextField aria-readonly value={getSessionState.data.userData.last_name} variant="outlined" className="w-full" name='lastName'/>
                                    :
                                    <TextField required label="Last Name" variant="outlined" className="w-full" name='lastName'/>
                                }
                                
                                
                                <div className="flex lg:space-x-4 flex-col lg:flex-row space-y-4 lg:space-y-0">
                                    <div className="flex-1">
                                        {
                                            getSessionState.data?.userData.email ? 
                                            <TextField aria-readonly value={getSessionState.data.userData.email} variant="outlined" className="w-full" name='eMail'/>
                                            :
                                            <TextField required label="E-mail Address" variant="outlined" className="w-full" name='eMail'/>
                                        }
                                    </div>
                                    <div className="flex-1">
                                        <TextField required label="Phone Number" variant="outlined" className="w-full" name='phoneNumber'/>
                                        <span className="text-xs text-tertiary underline underline-offset-4">Setup your phone number</span>
                                    </div>
                                </div>
                                
                                <TextField aria-readonly value={getSessionState.data?.customer_address} variant="outlined" className="w-full" name='address'/>

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
                                    <Checkbox color="tertiary" required/>
                                    <span>I agree with the </span>
                                    <button className="text-tertiary">Terms & Conditions</button>
                                </div>

                                <div className="flex flex-col lg:flex-row lg:space-x-4">
                                <button type="button" className="bg-white font-bold text-black py-3 w-full uppercase border border-white rounded-xl mt-4 order-2 lg:order-1" onClick={()=>{
                                        navigate(-1);
                                }}>Go Back</button>

                                <button type="submit" className="bg-[#CC5801] text-white py-3 w-full uppercase border rounded-xl mt-4 order-1 lg:order-2">Checkout</button>
                                </div>
                            </div>

                            {
                                getSessionState.data?.orders ? 
                                    <div className="space-y-4 lg:flex-[0_0_40%] lg:max-w-[40%] order-1 lg:order-2">
                                        <h2 className="font-['Bebas_Neue'] text-3xl  text-white tracking-[3px] text-center">Order Summary</h2>

                                        <div className="max-h-[400px] overflow-y-auto space-y-4 px-[4px] py-[10px]">

                                            {
                                                getSessionState.data?.orders.map((order, i)=>(
                                                    <div key={i} className="flex bg-secondary shadow-md shadow-tertiary rounded-[10px]">
                                                        <img  src={`https://ilovetaters.com/staging/v2/shop/assets/img/75/${order.prod_image_name}`} className="rounded-[10px] w-[92px] h-[92px]" alt="" />
                                                        <div className="flex-1 text-white px-3 py-2 flex flex-col">
                                                            <h3 className="text-sm">{order.prod_size} {order.prod_name}</h3>
                                                            <h3 className="text-xs">Quntity: <span className="text-tertiary">{order.prod_qty}</span></h3>

                                                            {
                                                                order.prod_flavor ? 
                                                                <h3 className="text-xs">Flavor: <span className="text-tertiary">{order.prod_flavor}</span></h3> 
                                                                : null
                                                            }
                                                            <h3 className="text-base flex-1 flex justify-end items-end">
                                                                <NumberFormat value={order.prod_calc_amount.toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'₱'} />
                                                            </h3>
                                                        </div>
                                                    </div>
                                                ))
                                            }

                                        </div>

                                        <hr className="mt-1 mb-2" />
                                        <div className="grid grid-cols-2 text-white">
                                            <span>Subtotal:</span>
                                            <span className="text-end">{calculateSubTotalPrice()}</span>
                                            <span>Delivery Fee:</span>
                                            <span className="text-end">{calculateDeliveryFee()}</span>
                                            <span>Discount:</span>
                                            <span className="text-end">( ₱ 0.00 )</span>
                                        </div>

                                        <h1 className="text-4xl text-center text-white">{calculateTotalPrice()}</h1>
                                    </div>
                                : null
                            }
                        </form>
                    </div>

                    </div>
                    
            </section>
        </>
    )
}