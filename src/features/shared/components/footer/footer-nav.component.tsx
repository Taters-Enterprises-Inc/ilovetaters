import { REACT_APP_DOMAIN_URL } from 'features/shared/constants';
import { FiMoreHorizontal } from 'react-icons/fi';

export function FooterNav(){
    return (
        <footer className='fixed bg-gray-700 w-full bottom-0 py-2  lg:hidden'>
            <nav className=" mx-auto">
                <ul className="flex text-white items-stretch h-full md:px-10">
                    <li className="flex justify-between items-center flex-col flex-1 pt-1">
                        <img src={REACT_APP_DOMAIN_URL + 'uploads/images/icons/home.png'} className="w-[28px] sm:w-[40px]" alt="Tater home icon"></img>
                        <span className="text-[8px] sm:text-[14px]">Home</span>
                    </li>
                    <li className='flex-1'>
                        <a href='https://ilovetaters.com/deals'  className="flex justify-between items-center flex-col h-full pt-1">
                            <img src={REACT_APP_DOMAIN_URL + 'uploads/images/icons/popclub.png'} className="w-[20px] sm:w-[24px]" alt="Tater home icon"></img>
                            <span className="text-[8px] sm:text-[14px]">Popclub</span>
                        </a>
                    </li>
                    <li className='flex-1'>
                        <a href='https://ilovetaters.com/shop' className="flex justify-center items-center flex-col h-full pt-1">
                            <img src={REACT_APP_DOMAIN_URL + 'uploads/images/icons/snackshop.png'} className="w-[24px] sm:w-[30px]" alt="Tater home icon"></img>
                            <span className="text-[8px] sm:text-[14px] pt-[2px]">Snackshop</span>
                        </a>
                    </li>
                    <li className='flex-1'>
                        <a href='https://ilovetaters.com/catering'  className="flex justify-center items-center flex-col h-full pt-1">
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
                    <li className="flex justify-center items-center flex-col flex-1 h-full pt-1">
                        <FiMoreHorizontal className='text-2xl sm:text-4xl'></FiMoreHorizontal>
                        <span className="text-[8px] sm:text-[14px] pt-[2px]">More</span>
                    </li>
                </ul>
            </nav>
        </footer>
    )
}