import { useAppDispatch, useAppSelector } from 'features/config/hooks';
import { CountdownTimerLatestRedeem } from 'features/popclub/presentation/components';
import { getLatestUnexpiredRedeem, selectGetLatestUnexpiredRedeem } from 'features/popclub/presentation/slices/get-latest-unexpired-redeem.slice';
import { REACT_APP_DOMAIN_URL, REACT_APP_UPLOADS_URL } from 'features/shared/constants';
import { useEffect } from 'react';
import { FiMoreHorizontal } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export function FooterNav(){
    const getLatestUnexpiredRedeemState = useAppSelector(selectGetLatestUnexpiredRedeem);
    const dispatch = useAppDispatch();

    useEffect(()=>{
        dispatch(getLatestUnexpiredRedeem());
    },[]);
    
    return (
        <section className='fixed w-full bottom-0 z-20'>
            { getLatestUnexpiredRedeemState.data ? 
                <Link to={"/popclub/deal/" + getLatestUnexpiredRedeemState.data.deal_hash } className='text-white shadow-lg bg-secondary m-2 h-[105px] rounded-xl block'>
                    <div className='flex'>
                        <div className='flex-1 flex flex-col'>
                            <div className='flex-1 p-4 leading-2 text-sm'>
                                <h1 className='elipsis-3-line'>{getLatestUnexpiredRedeemState.data.name}</h1>
                            </div>
                            <CountdownTimerLatestRedeem/>
                        </div>
                        <img 
                            className='rounded-r-xl w-[105px] h-[105px] object-contain'
                            src={`${REACT_APP_DOMAIN_URL}v2/shop/assets/img/500/${getLatestUnexpiredRedeemState.data.product_image}`} alt='Deals'/> 
                    </div>
                </Link> : null }
            <footer className='w-full py-2 sm:hidden bg-secondary'>
                <nav className=" mx-auto">
                    <ul className="flex text-white items-stretch h-full md:px-10">
                        <li className="flex-1">
                            <Link to={'/'}  className="flex justify-between items-center flex-col h-full pt-1">
                                <img src={REACT_APP_UPLOADS_URL + 'images/shared/icons/home.webp'} className="w-[28px] sm:w-[40px]" alt="Tater home icon"></img>
                                <span className="text-[8px] sm:text-[14px]">Home</span>
                            </Link>
                        </li>
                        <li className='flex-1'>
                            <Link to={'/popclub'}  className="flex justify-between items-center flex-col h-full pt-1">
                                <img src={REACT_APP_UPLOADS_URL + 'images/shared/icons/popclub.webp'} className="w-[20px] sm:w-[24px]" alt="Tater home icon"></img>
                                <span className="text-[8px] sm:text-[14px]">Popclub</span>
                            </Link>
                        </li>
                        <li className='flex-1'>
                            <Link to={'/shop'} className="flex justify-center items-center flex-col h-full pt-1">
                                <img src={REACT_APP_UPLOADS_URL + 'images/shared/icons/snackshop.webp'} className="w-[24px] sm:w-[30px]" alt="Tater home icon"></img>
                                <span className="text-[8px] sm:text-[14px] pt-[2px]">Snackshop</span>
                            </Link>
                        </li>
                        <li className='flex-1'>
                            <Link to={'/catering'}  className="flex justify-center items-center flex-col h-full pt-1">
                                <img src={REACT_APP_UPLOADS_URL + 'images/shared/icons/catering.webp'} className="w-[24px] sm:w-[30px]" alt="Tater home icon"></img>
                                <span className="text-[8px] sm:text-[14px] pt-[2px]">Catering</span>
                            </Link>
                        </li>
                        <li className='flex-1'>
                            <Link to={'/branches'} className="flex justify-center items-center flex-col h-full pt-1">
                                <img src={REACT_APP_UPLOADS_URL + 'images/shared/icons/branches.webp'} className="w-[18px] sm:w-[25px]" alt="Tater home icon"></img>
                                <span className="text-[8px] sm:text-[14px] pt-[2px]">Branches</span>
                            </Link>
                        </li>
                        <li className="flex-[0.8]">
                            <a className="flex justify-center items-center flex-col h-full pt-1 pr-2">
                                <FiMoreHorizontal className='text-[25px] sm:text-4xl'></FiMoreHorizontal>
                                <span className="text-[8px] sm:text-[14px] pt-[2px]">More</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </footer>
        </section>
    )
}