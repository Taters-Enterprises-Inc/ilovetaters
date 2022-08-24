import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { LoginChooserModal } from "features/popclub/presentation/modals/login-chooser.modal";
import { ProductModel } from "features/shared/core/domain/product.model";
import { selectGetSession } from "features/shared/presentation/slices/get-session.slice";
import { useState } from "react";
import { BsFillCartPlusFill } from "react-icons/bs";
import NumberFormat from 'react-number-format';
import { addToCart } from "../slices/add-to-cart.slice";
import { GetProductDetailsState, selectGetProductDetails } from "../slices/get-product-details.slice";

interface AddonProps {
    product : ProductModel;
}

export function Addon(props: AddonProps){

    const [quantity, setQuantity] = useState(1);
    const getSessionState = useAppSelector(selectGetSession);
    const [openLoginChooserModal, setOpenLoginChooserModal] = useState(false);
    const dispatch = useAppDispatch();
    
    const handleAddToCart =()=>{
        
        if(getSessionState.data?.userData == null || getSessionState.data?.userData === undefined){
            setOpenLoginChooserModal(true);
            return;
        }
        
        dispatch(addToCart({
            prod_id : props.product.id,
            prod_image_name : props.product.product_image,
            prod_name : props.product.name,
            prod_qty : quantity,
            prod_flavor: -1,
            prod_size: -1,
            prod_price : props.product.price,
            prod_calc_amount : props.product.price * quantity,
            prod_category : props.product.category,
            prod_with_drinks: -1,
            flavors_details: '',
            prod_sku_id: -1,
            prod_sku: -1,
        }));
    }
    
    return(
        <>
            <div className="my-3 bg-secondary rounded-xl shadow-tertiary shadow-md mb-6">
                <div className="p-4 flex space-x-2">
                    <img src={`http://ilovetaters.com/shop/assets/img/75/${props.product.product_image}`} className="rounded-[10px] w-[100px] h-[100px]" alt="" />
                    <div className="p-2 space-y-2">
                        <h4 className="font-['Bebas_Neue'] text-lg tracking-[2px] leading-5">{props.product.name}</h4>
                        <h5 className=" text-tertiary leading-5">
                            <NumberFormat value={(props.product.price * quantity).toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'₱'} />
                        </h5>
                        
                        <div className="h-10 w-24">

                            <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1 border-2 border-white text-white">

                                <button onClick={()=>{
                                    if(quantity > 1)
                                        setQuantity(quantity - 1);
                                }} className=" h-full w-20 rounded-l cursor-pointer outline-none bg-primary">
                                    <span className="m-auto text-2xl font-thinleading-3" >−</span>
                                </button>

                                <input value={quantity} onChange={(event : any) => {
                                    const value = event.target.value;
                                    if(value >= 1)
                                        setQuantity(event.target.value);
                                }} type="number" className="leading-2 bg-secondary outline-none text-center w-full font-semibold text-md  md:text-basecursor-default flex items-center" name="custom-input-number" />
                                
                                <button onClick={()=>{
                                    if(quantity >= 1)
                                        setQuantity(quantity + 1);
                                }} className="h-full w-20 rounded-r cursor-pointer bg-primary">
                                    <span className="m-auto text-2xl font-thin leading-3">+</span>
                                </button>

                            </div>

                        </div>
                    </div>
                </div>
                <button onClick={handleAddToCart} className="bg-primary w-full py-2 rounded-b-xl font-light flex space-x-4 justify-center items-center">
                    <BsFillCartPlusFill className="text-2xl"/>
                    <span className="text-2xl font-['Bebas_Neue'] tracking-[3px] font-light mt-1">Add to cart</span>
                </button>
            </div>
            
            <LoginChooserModal open={openLoginChooserModal} onClose={()=>{
                setOpenLoginChooserModal(false);
            }}/>
        </>
    );
}