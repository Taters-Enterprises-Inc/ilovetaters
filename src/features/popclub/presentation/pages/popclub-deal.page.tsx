import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { HeaderNav } from "features/shared";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDeal, selectGetDeal } from "../slices/get-deal.slice";
import axios from "axios"
import { getSession, selectGetSession } from "../slices/get-session.slice";

export function PopClubDeal(){
    const getDealState = useAppSelector(selectGetDeal);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    let { hash } = useParams();

    const getSessionState = useAppSelector(selectGetSession);

    useEffect(()=>{
        dispatch(getSession());
    },[]);

    
    useEffect(()=>{
        if(hash){
            dispatch(getDeal(hash));
        }
    },[dispatch, hash]);

    const loginToFacebook = () => {
        
        axios.get(`${REACT_APP_DOMAIN_URL}api/facebook/login`, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true,
        })
        .then(function (response: any) {
            const facebookURL = response.data.url;
            console.log(response.data);
            
            
            if (response.data.result === false) {
                axios.post(`${REACT_APP_DOMAIN_URL}api/facebook/login_point/`,{
                    fb_login_point: window.location.href 
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true,
                }).then(()=>{
                    window.location.href = facebookURL;
                });
            }
            
        })
    }
    


    return(
        <>
            <section className='bg-black relative min-h-screen flex flex-col'>
                <HeaderNav serviceReached={true} active='POPCLUB' sticky></HeaderNav>
                
                <div style={{
                    backgroundImage: `url('${REACT_APP_DOMAIN_URL}v2/shop/assets/img/500/${getDealState.data?.product_image}')`,
                    filter: 'blur(8px) brightness(50%)',
                    height: '100%',
                    width: '100%',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    position: 'absolute'
                }}>
                </div>
                
                <section className="mx-auto lg:w-[40%] flex-1 flex flex-col">
                    <div className="relative flex w-full flex-1 flex-col bg-primary shadow-lg pb-10">
                        { getDealState.data?.original_price && getDealState.data?.promo_price ? 
                            <div className="absolute top-0 left-0">
                                <div className=" text-[8px] lg:text-[20px] bg-yellow-500 pl-2 pr-4 text-white rounded-r-[4px] mt-3 mb-[2px] font-bold">{Math.floor(((getDealState.data?.original_price - getDealState.data?.promo_price) / getDealState.data?.original_price) * 100)}% OFF</div>
                                <div className=" bg-red-500 pl-2 text-white rounded-r-[4px] pr-2 leading-3 lg:leading-7 py-[3px]">
                                    <div className="text-left text-[8px] lg:text-[20px] font-normal line-through mb-[1px]">₱ {getDealState.data?.original_price}</div>
                                    <span className='text-[16px] lg:text-[35px]'> ₱ {getDealState.data?.promo_price}</span>
                                </div>
                            </div> : null }
                        <img src={`${REACT_APP_DOMAIN_URL}v2/shop/assets/img/500/${getDealState.data?.product_image}`} alt='Deals'/>
                        <div className="p-4 flex items-center justify-center flex-col space-y-4">
                            <h1 className="text-white">{getDealState.data?.description}</h1>
                            
                            {
                                getSessionState.data?.userData ? 
                                    <button className="bg-transparent text-white py-3 px-10 uppercase border border-white rounded" onClick={loginToFacebook}>Redeem</button> : 
                                    getSessionState.data?.userData === null ? 
                                    <button className="bg-transparent text-white py-3 px-10 uppercase border border-white rounded" onClick={loginToFacebook}>Login to Redeem</button>
                                : null
                            }
                        </div>
                    </div>
                </section>
            </section>
        </>
    );
}