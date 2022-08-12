import { FooterNav } from "features/shared";
import { Link } from "react-router-dom";
import { ShopHeaderNav } from "../header/shop-header-nav.component";

export function ShopOrder(){
    return(
        <main className="bg-primary">
            <ShopHeaderNav/>

            
            <div className="bg-secondary lg:h-[240px] text-white">
            </div>
                
            <section className="min-h-screen container mx-auto lg:space-x-4 pb-36">
                
                <div className="lg:-mt-[200px] lg:space-y-8">

                    <div className="px-4 py-6 lg:py-0 flex flex-col lg:flex-row justify-between items-center bg-secondary space-y-2">
                        <h1 className="text-white font-['Bebas_Neue'] tracking-[3px] text-3xl leading-8">Order View</h1>
                        
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
                                    <span className="ml-1 text-xs lg:text-base font-medium text-white md:ml-2 ">Order View</span>
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
                    

                    <div className="bg-primary py-6 px-4 lg:shadow-[#540808] lg:shadow-md w-full lg:rounded-[30px] mb-10 lg:p-10 flex justify-between flex-col lg:flex-row">
                        
                        <div className="space-y-4 lg:flex-[0_0_55%] lg:max-w-[55%] order-2 lg:order-1 lg:mt-0 mt-4">
                            
                        </div>

                        <div className="space-y-4 lg:flex-[0_0_40%] lg:max-w-[40%] order-1 lg:order-2">

                        </div>
                    </div>
                </div>
            </section>

            <FooterNav/>
        </main>
    );
}