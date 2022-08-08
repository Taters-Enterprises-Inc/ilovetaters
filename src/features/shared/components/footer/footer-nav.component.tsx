import { useAppDispatch, useAppSelector } from 'features/config/hooks';
import { CountdownTimerLatestRedeem } from 'features/popclub/presentation/components';
import { getLatestUnexpiredRedeem, selectGetLatestUnexpiredRedeem } from 'features/popclub/presentation/slices/get-latest-unexpired-redeem.slice';
import { REACT_APP_BASE_NAME, REACT_APP_DOMAIN_URL } from 'features/shared/constants';
import { useEffect } from 'react';
import { FiMoreHorizontal } from 'react-icons/fi';

export function FooterNav(){
    const getLatestUnexpiredRedeemState = useAppSelector(selectGetLatestUnexpiredRedeem);
    const dispatch = useAppDispatch();

    useEffect(()=>{
        dispatch(getLatestUnexpiredRedeem());
    },[]);
    return (
        <section className='fixed w-full bottom-0 '>
            { getLatestUnexpiredRedeemState.data ? 
                <div className='text-white bg-primaryDark m-2 h-[105px] rounded-xl'>
                    <div className='flex'>
                        <div className='flex-1 flex flex-col'>
                            <div className='flex-1 p-4 leading-2 text-sm'>
                                <h1>{getLatestUnexpiredRedeemState.data.name}</h1>
                            </div>
                            <CountdownTimerLatestRedeem/>
                        </div>
                        <img 
                            className='rounded-r-xl w-[100px] h-[100px] object-contain'
                            src={`${REACT_APP_DOMAIN_URL}v2/shop/assets/img/500/${getLatestUnexpiredRedeemState.data.product_image}`} alt='Deals'/> 
                    </div>
                </div> : null }
            <footer className='w-full py-2 lg:hidden bg-primaryDark'>
                <nav className=" mx-auto">
                    <ul className="flex text-white items-stretch h-full md:px-10">
                        <li className="flex-1">
                            <a href={REACT_APP_BASE_NAME}  className="flex justify-between items-center flex-col h-full pt-1">
                                <img src={REACT_APP_DOMAIN_URL + 'uploads/images/icons/home.png'} className="w-[28px] sm:w-[40px]" alt="Tater home icon"></img>
                                <span className="text-[8px] sm:text-[14px]">Home</span>
                            </a>
                        </li>
                        <li className='flex-1'>
                            <a href={REACT_APP_BASE_NAME + 'popclub'}  className="flex justify-between items-center flex-col h-full pt-1">
                                <img src={REACT_APP_DOMAIN_URL + 'uploads/images/icons/popclub.png'} className="w-[20px] sm:w-[24px]" alt="Tater home icon"></img>
                                <span className="text-[8px] sm:text-[14px]">Popclub</span>
                            </a>
                        </li>
                        <li className='flex-1'>
                            <a href={REACT_APP_DOMAIN_URL + '/v2/shop'} className="flex justify-center items-center flex-col h-full pt-1">
                                <img src={REACT_APP_DOMAIN_URL + 'uploads/images/icons/snackshop.png'} className="w-[24px] sm:w-[30px]" alt="Tater home icon"></img>
                                <span className="text-[8px] sm:text-[14px] pt-[2px]">Snackshop</span>
                            </a>
                        </li>
                        <li className='flex-1'>
                            <a href={REACT_APP_DOMAIN_URL + '/v2/shop'}  className="flex justify-center items-center flex-col h-full pt-1">
                                <img src={REACT_APP_DOMAIN_URL + 'uploads/images/icons/catering.png'} className="w-[24px] sm:w-[30px]" alt="Tater home icon"></img>
                                <span className="text-[8px] sm:text-[14px] pt-[2px]">Catering</span>
                            </a>
                        </li>
                        <li className='flex-1'>
                            <a href='https://ilovetaters.com/branches' className="flex justify-center items-center flex-col h-full pt-1">
                                <img src={REACT_APP_DOMAIN_URL + 'uploads/images/icons/branches.png'} className="w-[18px] sm:w-[25px]" alt="Tater home icon"></img>
                                <span className="text-[8px] sm:text-[14px] pt-[2px]">Branches</span>
                            </a>
                        </li>
                        <li className="flex-[0.8]">
                            <a  className="flex justify-center items-center flex-col h-full pt-1 pr-2">
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