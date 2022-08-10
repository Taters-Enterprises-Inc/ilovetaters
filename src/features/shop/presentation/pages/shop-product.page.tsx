import { FooterNav } from "features/shared";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import { AiFillInfoCircle } from "react-icons/ai";
import { TbTruckDelivery } from "react-icons/tb";
import { MdFastfood } from "react-icons/md";
import { ShopHeaderNav } from "../header/shop-header-nav.component";
import { Link } from "react-router-dom";
import { IoIosArrowDown } from 'react-icons/io';

export function ShopProduct(){
    return (
        <main className="bg-primary">
            <ShopHeaderNav/>

            <div className="bg-secondary lg:h-[200px] text-white">
            </div>
            
            <section className="min-h-screen container mx-auto lg:space-x-4 pb-36">

                <div className="lg:-mt-[150px] lg:space-y-10">

                    <div className="px-4 py-6 lg:py-0 flex flex-col lg:flex-row justify-between items-center bg-secondary space-y-2">
                        <h1 className="text-white font-['Bebas_Neue'] tracking-[3px] text-3xl leading-8 lg:text-3xl">Lorem ipsum dolor sit amet</h1>
                        
                        <nav className="flex" aria-label="Breadcrumb">

                            <ol className="inline-flex items-center space-x-1 md:space-x-3">
                                <li className="inline-flex items-center">
                                    <Link to='/shop' className="inline-flex items-center text-xs lg:text-base font-medium text-gray-700 hover:text-gray-900 dark:text-white dark:hover:text-white">
                                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
                                        Snackshop
                                    </Link>
                                </li>
                                <li>
                                <div className="flex items-center">
                                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                                    <Link to='/shop/products' className="ml-1 text-xs lg:text-base font-medium text-gray-700 hover:text-gray-900 md:ml-2 dark:text-white dark:hover:text-white">Products</Link>
                                </div>
                                </li>
                                <li aria-current="page">
                                <div className="flex items-center">
                                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                                    <span className="ml-1 text-xs lg:text-base font-medium text-gray-400 md:ml-2 ">Lorem ipsum dolor sit amet</span>
                                </div>
                                </li>
                            </ol>

                        </nav>
                        
                    </div>

                    <div className="bg-primary pb-20 shadow-black shadow-md w-full lg:rounded-[30px] mb-10 lg:p-10 flex lg:space-x-10 space-y-10 lg:space-y-0 flex-col lg:flex-row">
                        <div className="lg:flex-[0_0_55%] lg:max-w-[0_0_55%] lg:h-[900px]">
                            <img src={REACT_APP_DOMAIN_URL + "uploads/images/shop/products/350/test.jpg"} className="lg:rounded-[20px] w-full h-full object-cover" alt="" />
                        </div>

                        <div className="flex-1 space-y-10 px-4 lg:px-0">

                            <div className="border-2 border-white text-white rounded-xl">
                                <div className="px-6 py-4 flex space-x-2 items-center">
                                    <AiFillInfoCircle className="text-3xl" />
                                    <h3 className="font-['Bebas_Neue'] text-2xl tracking-[3px] font-light mt-1 flex-1">Product Info</h3>
                                    <IoIosArrowDown className="text-4xl"/>
                                </div>

                                <hr/>

                                <p className="p-6 text-sm">
                                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Amet, ut quibusdam quod quae odit, 
                                    repudiandae tenetur fugit ipsa eligendi nostrum, autem totam? Nesciunt, unde! Nemo dolorum illum 
                                    excepturi quia temporibus?
                                </p>

                            </div>

                            <div className="border-2 border-white text-white rounded-xl">
                                <div className="px-6 py-4 flex space-x-2 items-center">
                                    <TbTruckDelivery className="text-3xl" />
                                    <h3 className="font-['Bebas_Neue'] text-2xl tracking-[3px] font-light mt-1 flex-1">Delivery Details</h3>
                                    <IoIosArrowDown className="text-4xl"/>
                                </div>

                                <hr/>

                                <p className="p-6 text-sm">
                                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Amet, ut quibusdam quod quae odit, 
                                    repudiandae tenetur fugit ipsa eligendi nostrum, autem totam? Nesciunt, unde! Nemo dolorum illum 
                                    excepturi quia temporibus?
                                </p>

                            </div>

                            
                            <div className="border-2 border-white text-white rounded-xl">
                                <div className="px-6 py-4 flex space-x-2 items-center">
                                    <MdFastfood className="text-3xl" />
                                    <h3 className="font-['Bebas_Neue'] text-2xl tracking-[3px] font-light mt-1 flex-1">Product Add-ons</h3>
                                    <IoIosArrowDown className="text-4xl"/>
                                </div>

                                <hr/>

                                <p className="p-6 text-sm">
                                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Amet, ut quibusdam quod quae odit, 
                                    repudiandae tenetur fugit ipsa eligendi nostrum, autem totam? Nesciunt, unde! Nemo dolorum illum 
                                    excepturi quia temporibus?
                                </p>

                            </div>

                        </div>

                    </div>
                </div>


            </section>


            <FooterNav/>
        </main>
    );
}