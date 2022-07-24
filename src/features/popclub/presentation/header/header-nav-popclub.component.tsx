import { SocialMediaLink } from "features/shared/components/button";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import useCollapse from 'react-collapsed'
import { FaViber, FaFacebookF, FaInstagram } from "react-icons/fa";

export function HeaderNavPopClub() {
    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse()

    return (
        <header className="bg-primary py-2 sticky top-0 z-10 shadow-lg">
            <section className="container lg:px-0 md:px-8 px-4 mx-auto ">
                <div className="flex items-center justify-between">
                    <a href="https://ilovetaters.com/">
                        <img src={REACT_APP_DOMAIN_URL + "uploads/images/logo/taters-logo.png"} alt="Taters Logo"  className='w-[100px] md:w-[130px] lg:w-[140px]' />
                    </a>
                    
                    <nav className="flex-1 hidden lg:block">
                        <ul className="flex text-white items-center justify-center text-sm">
                            <li><a href="." className="pr-10">Snack Shop</a></li>
                            <li><a href="https://ilovetaters.com/catering" target='_blank' rel="noreferrer" className="pr-10">Taters Caters</a></li>
                            <li><a href="https://ilovetaters.com/reseller" target='_blank' rel="noreferrer" className="pr-10">Reseller Program</a></li>
                            <li><a href="https://ilovetaters.com/franchising" target='_blank' rel="noreferrer" className="pr-10">Franchising</a></li>
                            <li><a href="https://ilovetaters.com/branches" target='_blank' rel="noreferrer" className="pr-10">Store List</a></li>
                            <li><a href="https://ilovetaters.com/raffle-mechanics" target='_blank' rel="noreferrer" >Raffle Mechanics</a></li>
                        </ul>
                    </nav>

                    <div className="w-[140px] hidden lg:flex text-white space-x-2 justify-end">
                        <SocialMediaLink className="bg-[rgba(255,255,255,0.08)] hover:text-violet-700" icon={<FaViber/>} url='http://tiny.cc/TatersPH-Viber' />
                        <SocialMediaLink className="bg-[rgba(255,255,255,0.08)] hover:text-blue-700" icon={<FaFacebookF/>} url='https://www.facebook.com/ilovetaters.ph/'/>
                        <SocialMediaLink className="bg-[rgba(255,255,255,0.08)] hover:text-violet-700" icon={<FaInstagram/>} url='https://www.instagram.com/ilovetaters.ph/'/>
                    </div>
                    
                    <button {...getToggleProps()}>
                        {/* <FontAwesomeIcon icon={faBars} className='text-white text-2xl lg:hidden'/> */}
                    </button>


                </div>

                <div className="lg:hidden" {...getCollapseProps()}>

                    <nav className="flex-1">
                        <ul className="text-white text-sm">
                            <li><a href="." className="pb-6 text-base block pt-4">Snack Shop</a></li>
                            <li><a href="https://ilovetaters.com/catering" target='_blank' rel="noreferrer" className="pb-6 text-base block">Taters Caters</a></li>
                            <li><a href="https://ilovetaters.com/reseller" target='_blank' rel="noreferrer" className="pb-6 text-base block">Reseller Program</a></li>
                            <li><a href="https://ilovetaters.com/shop" target='_blank' rel="noreferrer" className="pb-6 text-base block">Store List</a></li>
                            <li><a href="https://ilovetaters.com/branches" target='_blank' rel="noreferrer" className="pb-6 text-base block">Contact Us</a></li>
                            <li><a href="https://ilovetaters.com/raffle-mechanics" target='_blank' rel="noreferrer"  className="pb-4 text-base block" >Raffle Mechanics</a></li>
                        </ul>
                    </nav>

                    <hr className="mt-1 mb-1"></hr>
                    <div className="text-white">
                        <small>Address: TEI Center, 3536 Hilario Street, Brgy. Palanan Makati City, 1235 PH</small>
                        <br/>
                        <small>Hotline: (+63) 916-145-0314</small>
                        <br/>
                        <small>E-Mail: support@tatersgroup.com</small>
                    </div>
                    
                    <hr className="mt-1 mb-1"></hr>
                    
                    <div className="w-[140px] flex text-white space-x-2 my-4">
                        <SocialMediaLink className="bg-[rgba(255,255,255,0.08)] hover:text-violet-700" icon={<FaViber/>} url='http://tiny.cc/TatersPH-Viber'/>
                        <SocialMediaLink className="bg-[rgba(255,255,255,0.08)] hover:text-blue-700" icon={<FaFacebookF/>} url='https://www.facebook.com/ilovetaters.ph/'/>
                        <SocialMediaLink className="bg-[rgba(255,255,255,0.08)] hover:text-violet-700" icon={<FaInstagram/>} url='https://www.instagram.com/ilovetaters.ph/'/>
                    </div>

                </div>
                

            </section>
            
        </header>
    );
}