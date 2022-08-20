import { FooterNav } from "features/shared";
import { REACT_APP_UPLOADS_URL } from "features/shared/constants";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { Link } from "react-router-dom";
import { ShopHeaderNav } from "../header/shop-header-nav.component";

export function ShopOrder(){
    return(
        <>
            <div className="bg-secondary lg:h-[200px] text-white pt-4">

                <div className="container py-6 flex flex-col lg:flex-row justify-between items-center bg-secondary space-y-2">
                    <h1 className="text-white font-['Bebas_Neue'] tracking-[3px] text-3xl leading-8">Order View</h1>
                    
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
                                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                                <Link to='/shop/products' className="ml-1 text-xs lg:text-base font-medium text-gray-400 md:ml-2">Products</Link>
                            </div>
                            </li>
                            <li aria-current="page">
                            <div className="flex items-center">
                                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                                <span className="ml-1 text-xs lg:text-base font-medium text-white md:ml-2 ">Order View</span>
                            </div>
                            </li>
                        </ol>

                    </nav>
                    
                </div>
                
                <div className="pb-4 flex lg:hidden">
                    <div className="flex-1">
                        <div className="bg-white h-[0.25rem] relative">
                            <div className="absolute rounded-[50%] bg-white font-bold h-[1.625rem] w-[1.625rem] text-center top-[-0.75rem] left-[50%] ml-[-0.8125rem] text-black">1</div>
                        </div>
                        <div className="flex justify-center items-center mt-5 text-xs text-white">
                            Your Details
                        </div>
                    </div>
                    
                    <div className="flex-1">
                        <div className="bg-white h-[0.25rem] relative">
                            <div className="absolute rounded-[50%] text-black font-bold bg-white h-[1.625rem] w-[1.625rem] text-center top-[-0.75rem] left-[50%] ml-[-0.8125rem]">2</div>
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
            </div>
                
            <section className="min-h-screen container lg:space-x-4 pb-36">
                    
                <div className="lg:mt-[-80px] flex justify-between items-start flex-col lg:flex-row px-4">
                    
                    <div className="space-y-8 lg:flex-[0_0_65%] lg:max-w-[65%]">
                        
                        <div className="pb-8 hidden lg:flex">
                            <div className="flex-1">
                                <div className="bg-white h-[0.25rem] relative">
                                    <div className="absolute rounded-[50%] bg-white font-bold h-[1.625rem] w-[1.625rem] text-center top-[-0.75rem] left-[50%] ml-[-0.8125rem]">1</div>
                                </div>
                                <div className="flex justify-center items-center mt-5 text-xs text-white">
                                    Your Details
                                </div>
                            </div>
                            
                            <div className="flex-1">
                                <div className="bg-white h-[0.25rem] relative">
                                    <div className="absolute rounded-[50%] text-black font-bold bg-white h-[1.625rem] w-[1.625rem] text-center top-[-0.75rem] left-[50%] ml-[-0.8125rem]">2</div>
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

                        <div className="flex flex-col lg:flex-row space-y-8 lg:space-y-0 lg:space-x-4">
                            <div className="text-white flex-1 space-y-2">
                                <h2 className="text-xl font-['Bebas_Neue'] tracking-[3px]">From: </h2>
                                <h3 className="font-semibold text-sm">Taters Malate</h3>
                                <h3 className="text-sm">1020 San Andres St. Cor Singalong St. Malate Manila</h3>
                                <div className="text-sm">
                                    <strong>Contact #</strong> 09084741500
                                </div>
                                <div className="text-sm">
                                    <strong>Email :</strong> taters.tdcgt.s@tatersgroup.com
                                </div>
                            </div>

                            <div className="text-white flex-1 space-y-2">
                                <h2 className="text-xl font-['Bebas_Neue'] tracking-[3px]">Deliver To Address: </h2>
                                <h3 className="font-semibold text-sm">Eco Villaraza</h3>
                                <div className="text-sm">
                                    <strong>Address:</strong> Adamson University, San Marcelino Street, Ermita, Manila, Metro Manila, Philippines
                                </div>
                                <div className="text-sm">
                                    <strong>Email: </strong> taters.tdcgt.s@tatersgroup.com
                                </div>
                            </div>

                            <div className="text-white flex-1 space-y-2">
                                <h2 className="text-xl font-['Bebas_Neue'] tracking-[3px]">Tracking Information</h2>
                                <div className="text-sm">
                                    <strong>Tracking Number:</strong> #661dbd
                                </div>
                                <div className="text-sm space-x-2">
                                    <strong>Order Status:</strong> <span className="rounded-full bg-green-700 text-white px-2 py-1">Order Placed In System</span>
                                </div>
                                <div className="text-sm">
                                    <strong>Mode of handling:</strong> Delivery
                                </div>
                                <div className="text-sm">
                                    <strong>Gift Card Number:</strong> 0
                                </div>
                            </div>

                        </div>

                        <div className="text-white">
                            <h2 className="text-white font-['Bebas_Neue'] tracking-[3px] text-2xl mb-2">Orders</h2>
                            
                            <hr className="mt-1 mb-4" />
                            
                            <div className="flex bg-secondary shadow-md shadow-tertiary rounded-[10px]">
                                <img src={REACT_APP_UPLOADS_URL + "images/shop/products/100/test.jpg"} className="rounded-[10px] w-[92px] h-[92px]" alt="" />
                                <div className="flex-1 text-white px-3 py-2 flex flex-col">
                                    <h3 className="text-sm">Family Pack Tofu Chips</h3>
                                    <h3 className="text-xs">Quntity: <span className="text-tertiary">3</span></h3>
                                    <h3 className="text-xs">Flavor: <span className="text-tertiary">Natural</span></h3>
                                    <h3 className="text-base flex-1 flex justify-end items-end">₱ 295.00</h3>
                                </div>
                            </div>
                        </div>
                        
                        <div className="text-white">
                            <h2 className="text-white font-['Bebas_Neue'] tracking-[3px] text-2xl mb-2">Freebies</h2>
                            
                            <div className="flex bg-secondary shadow-md shadow-tertiary rounded-[10px]">
                                <img src={REACT_APP_UPLOADS_URL + "images/shop/products/100/test.jpg"} className="rounded-[10px] w-[92px] h-[92px]" alt="" />
                                <div className="flex-1 text-white px-3 py-2 flex flex-col">
                                    <h3 className="text-sm">Family Pack Tofu Chips</h3>
                                    <h3 className="text-xs">Quntity: <span className="text-tertiary">1</span></h3>
                                    <h3 className="text-xs">Flavor: <span className="text-tertiary">Natural</span></h3>
                                    <h3 className="text-base flex-1 flex justify-end items-end">FREE</h3>
                                </div>
                            </div>
                        </div>

                        <div className="flex lg:flex-row flex-col lg:space-x-2 space-y-2 lg:space-y-0">
                            <div className="text-white lg:flex-1">
                                <h2 className="text-2xl font-['Bebas_Neue'] tracking-[3px]">Delivery Information</h2>
                                <h3 className="font-semibold text-lg">Eco Villaraza</h3>
                                <h3 className="text-sm">1020 San Andres St. Cor Singalong St. Malate Manila</h3>
                                <h3 className="text-sm">09686097100</h3>
                            </div>

                            <div className="text-white lg:flex-1">
                                <h2 className="text-2xl font-['Bebas_Neue'] tracking-[3px]">Payment Options</h2>
                                <img src={`${REACT_APP_UPLOADS_URL}images/shop/payments/bdo.webp`} alt="" />

                                <div>
                                    <div>
                                        <strong>Account Name:</strong> Sierra Dreams Consumer Goods Trading
                                    </div>
                                    <div>
                                        <strong>Account #:</strong> 0101-7800-1264
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>

                    <div className="space-y-4 lg:flex-[0_0_30%] lg:max-w-[30%] bg-primary lg:shadow-[#540808] lg:shadow-md lg:rounded-[30px] py-6 lg:px-4">
                        
                        <h2 className="font-['Bebas_Neue'] text-3xl  text-white tracking-[3px] text-center">Order Summary</h2>

                        <div className="grid grid-cols-2 text-white">
                            <span>Subtotal:</span>
                            <span className="text-end">₱ 295.00</span>
                            <span>Delivery Fee:</span>
                            <span className="text-end">+ ₱ 0.00</span>
                        </div>

                        <hr className="mt-1" />

                        <h1 className="text-4xl text-center text-white">₱ 295.00</h1>

                        <h2 className="font-['Bebas_Neue'] text-2xl  text-white tracking-[3px] text-center">Upload Proof of Payment</h2>

                        <div>
                            <div className="border-dashed border-t-2 border-l-2 border-r-2 border-white h-[200px] rounded-lg flex justify-center items-center flex-col space-y-2">

                                <AiOutlineCloudUpload className="text-white text-5xl"/>
                                <span className="text-white text-lg">Drag and drop here to upload</span>
                                <button className="text-white text-lg bg-secondary px-3 py-1 rounded-lg">Or select file</button>

                            </div>

                            <button className="bg-button w-full text-white font-['Bebas_Neue'] tracking-[2px] text-2xl py-2 rounded-b-lg mt-[-10px]">
                                Upload
                            </button>

                            <h4 className="text-white mt-1 leading-5">Note: Supported file types: JPG, JPEG, PNG and GIF. Maximum file size is 2MB.</h4>
                            
                        </div>


                    </div>
                </div>
                
                
            </section>
        </>
    );
}