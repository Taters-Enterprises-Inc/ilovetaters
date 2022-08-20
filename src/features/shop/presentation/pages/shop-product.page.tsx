import { FooterNav } from "features/shared";
import { AiFillInfoCircle } from "react-icons/ai";
import { TbTruckDelivery } from "react-icons/tb";
import { MdFastfood } from "react-icons/md";
import { ShopHeaderNav } from "../header/shop-header-nav.component";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { IoIosArrowDown } from 'react-icons/io';
import { BsFillCartPlusFill } from 'react-icons/bs';
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { getProductDetails, GetProductDetailsState, selectGetProductDetails } from "../slices/get-product-details.slice";
import { useEffect, useState } from "react";
import { Addon } from "../components/addon";
import NumberFormat from 'react-number-format';
import { addToCart, AddToCartState, resetAddToCart, selectAddToCart } from "../slices/add-to-cart.slice";
import { getSession, selectGetSession } from "features/shared/presentation/slices/get-session.slice";
import Radio from "@mui/material/Radio";
import { ShopPeopleAlsoBoughtCarousel } from "../carousels";
import { BsFillBagCheckFill } from 'react-icons/bs';
import { LoginChooserModal } from "features/popclub/presentation/modals/login-chooser.modal";
import { ShopPageTitleAndBreadCrumbs } from "../components/shop-page-title-and-breadcrumbs";

export function ShopProduct(){
    const dispatch = useAppDispatch();
    const getProductDetailsState = useAppSelector(selectGetProductDetails);
    const [openLoginChooserModal, setOpenLoginChooserModal] = useState(false);
    const getSessionState = useAppSelector(selectGetSession);
    const addToCartState = useAppSelector(selectAddToCart);

    const [quantity, setQuantity] = useState(1);
    
    const [currentSize, setCurrentSize] = useState<number | undefined>(undefined);
    const [currentFlavor, setCurrentFlavor] = useState<number | undefined>(undefined);

    const navigate = useNavigate();

    let { hash } = useParams();

    const location = useLocation();

    useEffect(()=>{
        if(addToCartState.status === AddToCartState.success){
            dispatch(getSession());
            dispatch(resetAddToCart());
        }
    },[addToCartState, dispatch]);

    useEffect(() => {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    }, [location]);
  
    useEffect(()=>{
        if(hash !== undefined){
            dispatch(getProductDetails({hash}));
            dispatch(getSession());
        }
    },[location]);

    const handleCheckout =()=>{
        
        if(getSessionState.data?.userData == null || getSessionState.data?.userData === undefined){
            setOpenLoginChooserModal(true);
            return;
        }
        
        if(getProductDetailsState.status === GetProductDetailsState.success && getProductDetailsState.data){
            dispatch(addToCart({
                prod_id : getProductDetailsState.data.product.id,
                prod_image_name : getProductDetailsState.data.product.product_image,
                prod_name : getProductDetailsState.data.product.name,
                prod_qty : quantity,
                prod_flavor : currentFlavor,
                prod_size : currentSize,
                prod_price : getProductDetailsState.data.product.price,
                prod_calc_amount : getProductDetailsState.data.product.price * quantity,
                prod_category : getProductDetailsState.data.product.category,
            }));

            navigate('/shop/checkout');
        }
    }

    const handleAddToCart =()=>{
        
        if(getSessionState.data?.userData == null || getSessionState.data?.userData === undefined){
            setOpenLoginChooserModal(true);
            return;
        }
        
        if(getProductDetailsState.status === GetProductDetailsState.success && getProductDetailsState.data){
            dispatch(addToCart({
                prod_id : getProductDetailsState.data.product.id,
                prod_image_name : getProductDetailsState.data.product.product_image,
                prod_name : getProductDetailsState.data.product.name,
                prod_qty : quantity,
                prod_flavor : currentFlavor,
                prod_size : currentSize,
                prod_price : getProductDetailsState.data.product.price,
                prod_calc_amount : getProductDetailsState.data.product.price * quantity,
                prod_category : getProductDetailsState.data.product.category,
            }));
        }
    }
    
    return (
        <>
            <ShopPageTitleAndBreadCrumbs title={getProductDetailsState.data?.product.name} pageTitles={['Products', getProductDetailsState.data?.product.name]} />
            
            <section className="min-h-screen lg:space-x-4 pb-36">

                <div className="lg:-mt-[80px] lg:space-y-10 lg:container">

                    <div className="bg-primary pb-20 lg:shadow-lg w-full lg:rounded-[30px] mb-10 lg:p-10 space-y-10">
                        <div className="flex-col lg:flex-row flex lg:space-x-10 space-y-10 lg:space-y-0 ">
                            <div className="lg:flex-[0_0_55%] lg:max-w-[0_0_55%] lg:h-[600px]">
                                {
                                    getProductDetailsState.data?.product.product_image ? 
                                        <img src={`https://ilovetaters.com/shop/assets/img/500/${getProductDetailsState.data?.product.product_image}`} className="lg:rounded-[20px] w-full h-full object-cover" alt="" />
                                    : null
                                }
                            </div>
                            
                            <div className="flex-1 space-y-10 lg:px-0 container">

                                <div className="border-2 border-white text-white rounded-xl">
                                    <div className="px-6 py-4 flex space-x-2 items-center">
                                        <AiFillInfoCircle className="text-3xl" />
                                        <h3 className="font-['Bebas_Neue'] text-lg tracking-[3px] font-light mt-1 flex-1">Product Info</h3>
                                        <IoIosArrowDown className="text-xl"/>
                                    </div>

                                    <hr/>

                                    <div className="p-6 text-sm">
                                        {getProductDetailsState.data?.product.description}
                                    </div>

                                </div>

                                <div className="border-2 border-white text-white rounded-xl">
                                    <div className="px-6 py-4 flex space-x-2 items-center">
                                        <TbTruckDelivery className="text-3xl" />
                                        <h3 className="font-['Bebas_Neue'] text-lg tracking-[3px] font-light mt-1 flex-1">Delivery Details</h3>
                                        <IoIosArrowDown className="text-xl"/>
                                    </div>

                                    <hr/>

                                    <div className="p-6 text-sm">
                                        {
                                            getProductDetailsState.data?.product.delivery_details ? 
                                                <div dangerouslySetInnerHTML={{__html:getProductDetailsState.data?.product.delivery_details }} />
                                            : null
                                        }
                                        
                                    </div>

                                </div>

                                
                                <div className=" text-white">
                                    <div className="px-6 py-4 flex space-x-2 items-center rounded-t-xl border-2 border-white">
                                        <MdFastfood className="text-3xl" />
                                        <h3 className="font-['Bebas_Neue'] text-lg tracking-[3px] font-light mt-1 flex-1">Product Add-ons</h3>
                                        <IoIosArrowDown className="text-xl"/>
                                    </div>
                                    <div className="max-h-[300px] overflow-y-auto flex flex-col border-2 border-white py-4 px-3">
                                        {
                                            getProductDetailsState.data?.addons.map((product, i)=> <Addon key={i} product={product}/>)
                                        }
                                    </div>
                                    
                                </div>
                                
                                {
                                    getProductDetailsState.data?.product_size && getProductDetailsState.data?.product_size.length > 0 ? 
                                        <div>
                                            <h2 className="font-['Bebas_Neue'] text-4xl text-white tracking-[2px]">Choose Size</h2>
                    
                                            <ul>
                                                {
                                                    getProductDetailsState.data?.product_size.map((size, i)=>{

                                                        if(i === 0 && currentSize === undefined){
                                                            setCurrentSize(size.id);
                                                        }

                                                        return(
                                                            <li key={i} className="flex items-center">
                                                            <Radio  id={size.id.toString()} color='tertiary' checked={size.id === currentSize} onChange={()=>{
                                                                setCurrentSize(size.id);
                                                            }} />
                                                            <label htmlFor={size.id.toString()} className='text-white'>{size.name}</label>
                                                        </li>
                                                        );
                                                    })
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
                                                    getProductDetailsState.data?.product_flavor.map((flavor, i)=>{

                                                        if(i === 0 && currentFlavor === undefined){
                                                            setCurrentFlavor(flavor.id);
                                                        }

                                                        return(
                                                            <li key={i} className="flex items-center">
                                                                <Radio id={flavor.id.toString()} color='tertiary' checked={flavor.id === currentFlavor}  onChange={()=>{
                                                                    setCurrentFlavor(flavor.id);
                                                                }} />
                                                                <label htmlFor={flavor.id.toString()} className='text-white'>{flavor.name}</label>
                                                            </li>
                                                        );
                                                    })
                                                }
                                            </ul>

                                        </div>
                                        : null
                                }


                                <div>
                                    <h2 className="font-['Bebas_Neue'] text-4xl text-white tracking-[2px]">Quantity</h2>
                                    
                                    <div className="h-[60px] w-full mt-2">

                                        <div className="flex flex-row h-full w-full rounded-lg relative bg-transparent mt-1 border-2 border-white text-white">

                                            <button onClick={()=>{
                                                if(quantity > 1)
                                                    setQuantity(quantity - 1)
                                            }} className=" h-full w-[150px] rounded-l cursor-pointer outline-none bg-primary">
                                                <span className="m-auto text-5xl font-thin leading-3">−</span>
                                            </button>

                                            <input value={quantity} 
                                                onChange={(event : any) => {
                                                    const value = event.target.value;
                                                    if(value >= 1)
                                                        setQuantity(event.target.value);
                                                }}
                                            type="number" className="text-3xl leading-2 bg-secondary outline-none text-center w-full font-semibold text-md  md:text-basecursor-default flex items-center" name="custom-input-number" />
                                            
                                            <button onClick={()=>{
                                                if(quantity >= 1)
                                                    setQuantity(quantity + 1)
                                            }} className="h-full w-[150px] rounded-r cursor-pointer bg-primary">
                                                <span className="m-auto text-5xl font-thin leading-3">+</span>
                                            </button>

                                        </div>

                                    </div>
                                </div>

                                {
                                    getProductDetailsState.data?.product.price ? 
                                        <h2 className="text-4xl text-white mt-4">
                                            <NumberFormat value={(getProductDetailsState.data.product.price * quantity).toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'₱'} />
                                        </h2>
                                    : null
                                }

                                <div className="space-y-4">
                                    <button onClick={handleCheckout} className="text-white text-xl flex space-x-2 justify-center items-center bg-[#CC5801] py-2 w-full rounded-lg shadow-lg">
                                        <BsFillBagCheckFill className="text-3xl"/>
                                        <span className="text-2xl font-['Bebas_Neue'] tracking-[3px] font-light mt-1">Checkout</span>
                                    </button>

                                    <button onClick={handleAddToCart} className="text-white text-xl flex space-x-2 justify-center items-center bg-[#CC5801] py-2 w-full rounded-lg shadow-lg">
                                        <BsFillCartPlusFill className="text-3xl"/>
                                        <span className="text-2xl font-['Bebas_Neue'] tracking-[3px] font-light mt-1">Add to cart</span>
                                    </button>
                                </div>

                                
                            </div>
                        </div>

                        {
                            getProductDetailsState.data?.suggested_products && getProductDetailsState.data?.suggested_products.length > 0 ? 
                            <div className="container space-y-3">
                                <h1 className="font-['Bebas_Neue'] tracking-[2px] text-xl text-white text-center ">People  Also Bought</h1>
                                <ShopPeopleAlsoBoughtCarousel products={getProductDetailsState.data?.suggested_products}/>
                            </div> : null
                        }

                    </div>


                </div>


            </section>

            <LoginChooserModal open={openLoginChooserModal} onClose={()=>{
                setOpenLoginChooserModal(false);
            }}/>
        </>
    );
}