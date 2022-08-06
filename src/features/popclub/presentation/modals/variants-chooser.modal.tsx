import { selectGetDealProductVariants } from "../slices/get-deal-product-variants.slice";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { redeemDeal } from "../slices/redeem-deal.slice";
import { DealModel } from "features/popclub/core/domain/deal.model";
import { selectGetDeal } from "../slices/get-deal.slice";
import { useEffect, useState } from "react";
import { ProductModel } from "features/popclub/core/domain/product.model";
import { DealProductVariantsModel } from "features/popclub/core/domain/deal_product_variants.model";
import { getSession, selectGetSession } from "../slices/get-session.slice";
import { selectRedeemDeal } from "../slices/redeem-deal.slice";
import axios from "axios";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";

interface VariantChooserModalProps{
    open: boolean;
    onClose: () => void;
}

export function VariantsChooserModal(props: VariantChooserModalProps){
    const getDealProductVariantsState = useAppSelector(selectGetDealProductVariants);
    const getDealState = useAppSelector(selectGetDeal);
    const getSessionState = useAppSelector(selectGetSession);
    const redeemDealState = useAppSelector(selectRedeemDeal);

    const [optionsSelected, setOptionsSelected] = useState({});
    const dispatch = useAppDispatch();

    useEffect(()=>{
        if(redeemDealState.data){
            dispatch(getSession());
        }
    }, [redeemDealState, dispatch]);

    useEffect(()=>{
        if(redeemDealState.data){
            axios.post(`${REACT_APP_DOMAIN_URL}v2/popclub/v3_to_v2_session_connector`,{
                session : getSessionState.data,
            }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true,
            })
            .then(function (response: any) {
                window.location.href = `${REACT_APP_DOMAIN_URL}v2/shop/products`;
            });
        }
    }, [getSessionState, redeemDealState]);
        
    if(props.open){
        document.body.classList.add('overflow-hidden');
    }

    const onSubmit =(event: any)=>{
        event.preventDefault();

        const remarks = Object.values(optionsSelected).join();

        if(getDealState.data?.hash && remarks){
            dispatch(redeemDeal({
                hash: getDealState.data?.hash,
                remarks,
            }));
        }
    }

    const handleFormChange =( event : any, dealProductVariant: DealProductVariantsModel)=>{
        const data : any = optionsSelected;
        const optionName = event.target.value;
        const productName = dealProductVariant.product.name;
        const quantity = dealProductVariant.quantity;

        data[event.target.name] =  '('  + quantity + ') ' + productName + ' (' + optionName + ')<br>';
        setOptionsSelected(data);
    }
    

    return (
        <div
        style={{display: props.open? 'flex':'none'}}
        className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-30 flex justify-center items-start overflow-auto'>
            <div className='bg-primaryDark px-4 py-[13px] lg:p-8 round w-[90%] lg:w-[80%] mt-10 relative rounded-[10px] text-white mb-10'>
                <form onSubmit={onSubmit}>
                    {
                        getDealProductVariantsState.data.map((dealProductVariant, i) => {
                            return (
                                <div key={i} className="pb-4">
                                    <h1 className="text-lg font-bold">{dealProductVariant.product.name}</h1>
                                    {
                                        dealProductVariant.product_variants.map(
                                            (productVariant, i) => (
                                                <div key={i}>
                                                    <h2 className="text-base uppercase">
                                                        {productVariant.name}
                                                    </h2>
                                                    <ul className="w-full mt-2 text-sm font-medium text-gray-900 bg-primaryDark rounded-lg border border-gray-200 0 dark:border-gray-600 dark:text-white">
                                                        {
                                                            productVariant.options.map(
                                                                (option, i)=>(
                                                                    <li key={i} className="w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600">
                                                                        <div className="flex items-center pl-3">
                                                                            <input onChange={(e) => handleFormChange(e, dealProductVariant)} id={dealProductVariant.option_id + '_' + productVariant.id + "_" + option.id } type="radio" value={option.name} name={dealProductVariant.option_id + '_' + productVariant.id } className="w-4 h-4 text-blue-600 bg-primaryDark border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                                                                            <label htmlFor={dealProductVariant.option_id + '_' + productVariant.id + "_" + option.id} className="py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300">{option.name}</label>
                                                                        </div>
                                                                    </li>
                                                                )
                                                            )
                                                        }
                                                    </ul>
                                                </div>
                                            )
                                        )
                                    }
                                </div>

                            );
                        })
                    }
                    
                    <button type="submit" className="bg-primary w-full py-2 rounded-md font-['Bebas_Neue'] tracking-widest">Checkout to Snackshop</button>
                </form>
            </div>
        </div>
    );
}