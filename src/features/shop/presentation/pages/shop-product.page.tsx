import { FooterNav } from "features/shared";
import { REACT_APP_UPLOADS_URL } from "features/shared/constants";
import { AiFillInfoCircle } from "react-icons/ai";
import { TbTruckDelivery } from "react-icons/tb";
import { MdFastfood } from "react-icons/md";
import { ShopHeaderNav } from "../header/shop-header-nav.component";
import { Link, useLocation, useParams } from "react-router-dom";
import { IoIosArrowDown } from 'react-icons/io';
import { CounterInput } from "../components/counter-input";
import { BsFillCartPlusFill } from 'react-icons/bs';
import { Radio } from "@material-tailwind/react";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { getProductDetails, selectGetProductDetails } from "../slices/get-product-details.slice";
import { useEffect } from "react";

export function ShopProduct(){
    const dispatch = useAppDispatch();
    const getProductDetailsState = useAppSelector(selectGetProductDetails);

    let { hash } = useParams();

    const location = useLocation();

    useEffect(() => {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    }, [location]);
  


    useEffect(()=>{
        if(hash !== undefined){
            dispatch(getProductDetails({hash}));
        }
    },[]);
    
    return (
        <main className="bg-primary">
            <ShopHeaderNav/>

            <div className="bg-secondary lg:h-[200px] text-white lg:pt-4">

                <div className="mx-auto container px-4 py-6 flex flex-col lg:flex-row justify-between items-center bg-secondary space-y-2">
                    <h1 className="text-white font-['Bebas_Neue'] tracking-[3px] text-xl leading-8 lg:text-3xl">{getProductDetailsState.data?.product.name}</h1>
                    
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
                                    <span className="ml-1 text-xs lg:text-base font-medium text-white md:ml-2 whitespace-nowrap overflow-hidden lg:max-w-full max-w-[80px] text-ellipsis">{getProductDetailsState.data?.product.name}</span>
                                </div>
                            </li>
                        </ol>

                    </nav>
                    
                </div>
            </div>
            
            <section className="min-h-screen container mx-auto lg:space-x-4 pb-36">

                <div className="lg:-mt-[80px] lg:space-y-10">

                    <div className="bg-primary pb-20 lg:shadow-lg w-full lg:rounded-[30px] mb-10 lg:p-10 flex lg:space-x-10 space-y-10 lg:space-y-0 flex-col lg:flex-row">
                        <div className="lg:flex-[0_0_55%] lg:max-w-[0_0_55%] lg:h-[600px]">
                            <img src={`https://ilovetaters.com/shop/assets/img/500/${getProductDetailsState.data?.product.product_image}`} className="lg:rounded-[20px] w-full h-full object-cover" alt="" />
                        </div>

                        <div className="flex-1 space-y-10 px-4 lg:px-0">

                            <div className="border-2 border-white text-white rounded-xl">
                                <div className="px-6 py-4 flex space-x-2 items-center">
                                    <AiFillInfoCircle className="text-3xl" />
                                    <h3 className="font-['Bebas_Neue'] text-lg tracking-[3px] font-light mt-1 flex-1">Product Info</h3>
                                    <IoIosArrowDown className="text-xl"/>
                                </div>

                                <hr/>

                                <p className="p-6 text-sm">
                                    {getProductDetailsState.data?.product.description}
                                </p>

                            </div>

                            <div className="border-2 border-white text-white rounded-xl">
                                <div className="px-6 py-4 flex space-x-2 items-center">
                                    <TbTruckDelivery className="text-3xl" />
                                    <h3 className="font-['Bebas_Neue'] text-lg tracking-[3px] font-light mt-1 flex-1">Delivery Details</h3>
                                    <IoIosArrowDown className="text-xl"/>
                                </div>

                                <hr/>

                                <p className="p-6 text-sm">
                                    {
                                        getProductDetailsState.data?.product.delivery_details ? 
                                            <div dangerouslySetInnerHTML={{__html:getProductDetailsState.data?.product.delivery_details }} />
                                        : null
                                    }
                                    
                                </p>

                            </div>

                            
                            <div className=" text-white">
                                <div className="px-6 py-4 flex space-x-2 items-center rounded-t-xl border-2 border-white">
                                    <MdFastfood className="text-3xl" />
                                    <h3 className="font-['Bebas_Neue'] text-lg tracking-[3px] font-light mt-1 flex-1">Product Add-ons</h3>
                                    <IoIosArrowDown className="text-xl"/>
                                </div>
                                <div className="h-[400px] overflow-y-auto flex flex-col items-center border-2 border-white py-4">
                                    {
                                        getProductDetailsState.data?.addons.map((product, i)=>(
                                            <div key={i} className="my-3 bg-secondary rounded-xl shadow-tertiary shadow-md mb-6 w-[92%]">
                                                <div className="p-4 flex space-x-2">
                                                    <img src={`http://ilovetaters.com/shop/assets/img/75/${product.product_image}`} className="rounded-[10px] w-[100px] h-[100px]" alt="" />
                                                    <div className="p-2 space-y-2">
                                                        <h4 className="font-['Bebas_Neue'] text-lg tracking-[2px] leading-5">{product.name}</h4>
                                                        <h5 className=" text-tertiary leading-5">₱ {product.price.toFixed(2)}</h5>
                                                        <CounterInput/>
            
                                                    </div>
                                                </div>
                                                <button className="bg-primary w-full py-2 rounded-b-xl font-light flex space-x-4 justify-center items-center">
                                                    <BsFillCartPlusFill className="text-2xl"/>
                                                    <span className="text-2xl font-['Bebas_Neue'] tracking-[3px] font-light mt-1">Add to cart</span>
                                                </button>
                                            </div>
                                        ))
                                    }
                                </div>
                                
                            </div>
                            
                            {
                                getProductDetailsState.data?.product_size && getProductDetailsState.data?.product_size.length > 0 ? 
                                    <div>
                                        <h2 className="font-['Bebas_Neue'] text-4xl text-white tracking-[2px]">Choose Size</h2>
                
                                        <ul>
                                            {
                                                getProductDetailsState.data?.product_size.map((size, i)=>(
                                                    <>
                                                        <li className="flex items-center">
                                                            <Radio id={size.id.toString()} color="orange" name="size" label={size.name} />
                                                        </li>
                                                    </>
                                                ))
                                            }
                                        </ul>

                                    </div>
                                    : null
                            }

                            {
                                getProductDetailsState.data?.product_flavor && getProductDetailsState.data?.product_flavor.length > 0 ? 
                                    <div>
                                        <h2 className="font-['Bebas_Neue'] text-4xl text-white tracking-[2px]">Choose Flavor</h2>
                
                                        <ul>
                                            {
                                                getProductDetailsState.data?.product_flavor.map((flavor, i)=>(
                                                    <>
                                                        <li className="flex items-center">
                                                            <Radio id={flavor.id.toString()} color="orange" name="flavor" label={flavor.name} />
                                                        </li>
                                                    </>
                                                ))
                                            }
                                        </ul>

                                    </div>
                                    : null
                            }


                            <div>
                                <h2 className="font-['Bebas_Neue'] text-4xl text-white tracking-[2px]">Quantity</h2>
                                
                                <div className="h-[60px] w-full mt-2">

                                    <div className="flex flex-row h-full w-full rounded-lg relative bg-transparent mt-1 border-2 border-white text-white">

                                        <button className=" h-full w-[150px] rounded-l cursor-pointer outline-none bg-primary">
                                            <span className="m-auto text-5xl font-thin">−</span>
                                        </button>

                                        <input type="number" className="text-3xl leading-2 bg-secondary outline-none text-center w-full font-semibold text-md  md:text-basecursor-default flex items-center" name="custom-input-number" value="0"/>
                                        
                                        <button className="h-full w-[150px] rounded-r cursor-pointer bg-primary">
                                            <span className="m-auto text-5xl font-thin">+</span>
                                        </button>

                                    </div>

                                </div>
                            </div>

                            {
                                getProductDetailsState.data?.product.price ? 
                                    <h2 className="text-4xl text-white mt-4">₱ {getProductDetailsState.data.product.price.toFixed(2)}</h2>
                                : null
                            }

                            <button className="text-white text-xl flex space-x-2 justify-center items-center bg-[#CC5801] py-2 w-full rounded-lg shadow-lg">
                                <BsFillCartPlusFill className="text-3xl"/>
                                <span className="text-2xl font-['Bebas_Neue'] tracking-[3px] font-light mt-1">Add to cart</span>
                            </button>
                            
                        </div>

                    </div>
                </div>


            </section>


            <FooterNav/>
        </main>
    );
}