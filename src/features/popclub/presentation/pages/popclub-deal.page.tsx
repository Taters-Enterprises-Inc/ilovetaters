import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { FooterNav, HeaderNav } from "features/shared";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDeal, GetDealState, selectGetDeal } from "../slices/get-deal.slice";
import { getSession, selectGetSession } from "../slices/get-session.slice";
import { getDealProductVariants, GetDealProductVariantsState, resetGetDealProductVariantsState, selectGetDealProductVariants } from "../slices/get-deal-product-variants.slice";
import { VariantsChooserModal } from "../modals/variants-chooser.modal";
import { CountdownTimer } from "../components";
import { redeemDeal, RedeemDealState, resetRedeemDeal, selectRedeemDeal } from "../slices/redeem-deal.slice";
import { getRedeem, GetRedeemState, selectGetRedeem } from "../slices/get-redeem.slice";
import { resetGetRedeem } from "../slices/get-redeem.slice";
import { LoginChooserModal } from "../modals/login-chooser.modal";
import 'react-toastify/dist/ReactToastify.css';
import { getLatestUnexpiredRedeem, selectGetLatestUnexpiredRedeem } from "../slices/get-latest-unexpired-redeem.slice";
import Countdown from "react-countdown";
import { AiOutlineFieldTime } from "react-icons/ai";
import moment from "moment";

export function PopClubDeal(){
    const [openLoginChooserModal, setOpenLoginChooserModal] = useState(false);
    const getDealState = useAppSelector(selectGetDeal);
    const getDealProductVariantsState = useAppSelector(selectGetDealProductVariants);
    const redeemDealState = useAppSelector(selectRedeemDeal);
    const getRedeemState = useAppSelector(selectGetRedeem);
    const getLatestUnexpiredRedeemState = useAppSelector(selectGetLatestUnexpiredRedeem);

    const dispatch = useAppDispatch();
    let { hash } = useParams();

    const getSessionState = useAppSelector(selectGetSession);
    
    const [openVariantChooserModal, setOpenVariantChooserModal ] = useState(false);

    useEffect(()=>{
        if(
            getDealState.status === GetDealState.success &&
            getDealProductVariantsState.status === GetDealProductVariantsState.success
        ){
            if(getDealProductVariantsState.data?.length > 0){
                setOpenVariantChooserModal(true);
            }else{
                if(getDealState.data?.hash){
                    dispatch(redeemDeal({
                        hash: getDealState.data?.hash,
                    }));
                    dispatch(resetGetDealProductVariantsState());
                }
            }
        }
    },[getDealProductVariantsState, dispatch, getDealState]);

    useEffect(()=>{
        dispatch(resetGetRedeem());
        dispatch(getLatestUnexpiredRedeem());
    },[]);

    useEffect(()=>{
        
        if(
            getDealState.status === GetDealState.success &&
            getDealState.data && redeemDealState.status === RedeemDealState.success
            ){
            dispatch(getRedeem({
                deal_id : getDealState.data.id
            }));
            dispatch(resetRedeemDeal());
        }
        
    },[redeemDealState, dispatch, getDealState]);


    useEffect(()=>{
        dispatch(getLatestUnexpiredRedeem());
        
        
        if(
            getDealState.status === GetDealState.success &&
            getDealState.data && getRedeemState.status === GetRedeemState.initial
            ){
            dispatch(getRedeem({
                deal_id : getDealState.data.id
            }));
        }

    },[getDealState, dispatch, getRedeemState]);

    useEffect(()=>{
        dispatch(getSession());
    },[dispatch]);

    
    useEffect(()=>{
        if(hash){
            dispatch(getDeal(hash));
        }
    },[dispatch, hash]);

    const handleRedeem =()=>{
        if(hash){
            dispatch(getDealProductVariants({
                hash,
            }));
        }
    }
    

    const loginToRedeem = () => {
        setOpenLoginChooserModal(true);
    }
    


    const redeemButton =()=> {
        if(getSessionState.data?.userData && getLatestUnexpiredRedeemState.next_avialable_redeem){

            const pad =(number : number) => ('0' + number).slice(-2);
        
            const renderer = ({ hours, minutes, seconds, completed} : any) => {
                if(completed){
                    if(
                        getDealState.status === GetDealState.success &&
                        getDealState.data
                        ){
                        dispatch(getRedeem({
                            deal_id : getDealState.data.id
                        }));
                    }
                    dispatch(getLatestUnexpiredRedeem());
                }else if (!completed) {
                    let timeName = '';
                    
                    if(hours > 0){
                        if(hours === 1){
                            timeName = 'hour';
                        }else{
                            timeName = 'hours';
                        }
                    } else if(minutes > 0){
                        if(minutes === 1){
                            timeName = 'minute';
                        }else{
                            timeName = 'minutes';
                        }
                    } else if(seconds > 0){
                        if(seconds === 1){
                            timeName = 'second';
                        }else{
                            timeName = 'seconds';
                        }
                    }
        
                    return(
                        <>
                            <div className="text-white flex justify-center items-center text-xl px-4 ">
                                <AiOutlineFieldTime className="text-4xl mr-3"/>
                                <div className="font-['Bebas_Neue'] tracking-[4px]">
                                    <span >
                                        {pad(hours)}:{pad(minutes)}:{pad(seconds)} 
                                    </span>
                                    <span className="text-sm ml-2">{timeName}</span>
                                </div>
                            </div>
                        </>
                    );
                }
            };
            
            return(
                <div className="bg-primaryDark text-white py-3 w-full">
                    <span className="mt-3">You can redeem after </span>
                    <Countdown renderer={renderer} date={new Date(getLatestUnexpiredRedeemState.next_avialable_redeem)}/>
                </div>
            );
        }else if(getSessionState.data?.userData && getLatestUnexpiredRedeemState.redeem_cooldown){

            const pad =(number : number) => ('0' + number).slice(-2);
        
            const renderer = ({ hours, minutes, seconds, completed} : any) => {
                if(completed){
                    if(
                        getDealState.status === GetDealState.success &&
                        getDealState.data
                        ){
                        dispatch(getRedeem({
                            deal_id : getDealState.data.id
                        }));
                    }
                    dispatch(getLatestUnexpiredRedeem());
                }else if (!completed) {
                    let timeName = '';
                    
                    if(hours > 0){
                        if(hours === 1){
                            timeName = 'hour';
                        }else{
                            timeName = 'hours';
                        }
                    } else if(minutes > 0){
                        if(minutes === 1){
                            timeName = 'minute';
                        }else{
                            timeName = 'minutes';
                        }
                    } else if(seconds > 0){
                        if(seconds === 1){
                            timeName = 'second';
                        }else{
                            timeName = 'seconds';
                        }
                    }
        
                    return(
                        <>
                            <div className="text-white flex justify-center items-center text-xl px-4 ">
                                <AiOutlineFieldTime className="text-4xl mr-3"/>
                                <div className="font-['Bebas_Neue'] tracking-[4px]">
                                    <span >
                                        {pad(hours)}:{pad(minutes)}:{pad(seconds)} 
                                    </span>
                                    <span className="text-sm ml-2">{timeName}</span>
                                </div>
                            </div>
                        </>
                    );
                }
            };
            
            return(
                <div className="bg-primaryDark text-white py-3 w-full">
                    <span className="mt-3">Redeem cooldown: </span>
                    <Countdown renderer={renderer} date={new Date(getLatestUnexpiredRedeemState.redeem_cooldown)}/>
                </div>
            );
        }else if(
            getSessionState.data?.userData && 
            getRedeemState.status === GetRedeemState.success &&
            getRedeemState.data ){
            return (
                <div className="bg-green-700 text-white py-3 w-full uppercase border border-white rounded-xl">CODE : 
                    <span className="font-bold ml-1">{getRedeemState.data.redeem_code}</span>
                </div>
            );
        }else if(getSessionState.data?.userData && getLatestUnexpiredRedeemState.data?.deal_hash  && getLatestUnexpiredRedeemState.data?.deal_hash !== hash){
            return(
                <div className="bg-primaryDark text-white py-3 w-full uppercase border border-white rounded-xl">
                    You currently have running deal
                </div>
            );
        }else if(getSessionState.data?.userData){
            return(
                <button className="bg-primary text-white py-3 w-full uppercase border border-white rounded-xl" onClick={handleRedeem}>Redeem</button>
            );
        } else if (getSessionState.data?.userData === null){
            return(
                <button className="bg-primary text-white py-3 w-full uppercase border border-white rounded-xl" onClick={loginToRedeem}>Login to Redeem</button>
            );
        }
    }
    


    return(
        <>
            <section className='bg-primaryDark relative min-h-screen flex flex-col'>
                <HeaderNav serviceReached={true} active='POPCLUB' sticky></HeaderNav>
                <div className="text-white text-center font-['Bebas_Neue'] tracking-[4px] pt-2 text-xl">{getDealState.data?.category_name}</div>

                <section className="mx-auto lg:w-[40%] flex-1 flex flex-col">
                    <div className="relative flex w-full flex-1 flex-col bg-primaryDark shadow-lg pb-10 ">
                        { getDealState.data?.original_price && getDealState.data?.promo_price ? 
                            <div className="absolute top-0 left-0">
                                <div className=" text-[14px] bg-yellow-500 pl-2 pr-4 text-white rounded-r-[4px] mt-3 mb-[2px] font-bold">{Math.floor(((getDealState.data?.original_price - getDealState.data?.promo_price) / getDealState.data?.original_price) * 100)}% OFF</div>
                                <div className=" bg-red-500 pl-2 text-white rounded-r-[4px] pr-2 leading-5 py-[3px]">
                                    <div className="text-left text-[14px] font-normal line-through mb-[1px]">₱{getDealState.data?.original_price}</div>
                                    <span className='text-[28px] font-bold'> ₱{getDealState.data?.promo_price}</span>
                                </div>
                            </div> : null }
                        { getDealState.data?.product_image ? 
                            <img src={`${REACT_APP_DOMAIN_URL}v2/shop/assets/img/500/${getDealState.data?.product_image}`} alt='Deals'/> : null
                        }
                        <CountdownTimer></CountdownTimer>
                        <div className="p-4 flex-col space-y-4">
                            <h1 className="text-white whitespace-pre-wrap font-['Bebas_Neue'] tracking-[3px] text-3xl ">{getDealState.data?.name}</h1>
                            <h1 className="text-white text-lg">{getDealState.data?.description}</h1>

                            <div className="text-center">
                                {redeemButton()}
                            </div>
                        </div>
                    </div>
                </section>
            </section>

            <VariantsChooserModal open={openVariantChooserModal} onClose={()=>{
                setOpenVariantChooserModal(false);
            }}/>

            <LoginChooserModal open={openLoginChooserModal} onClose={()=>{
                setOpenLoginChooserModal(false);
            }}/>
            
            <FooterNav></FooterNav>
        </>
    );
}