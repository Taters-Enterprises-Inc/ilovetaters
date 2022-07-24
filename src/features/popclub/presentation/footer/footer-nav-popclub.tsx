import { FaFacebookF, FaInstagram, FaTwitter, FaViber, FaYoutube, FaPaperPlane } from 'react-icons/fa';
import { SocialMediaLink } from 'features/shared/components/button';

export function FooterNavPopClub(){
    
    return (
        <footer className="bg-secondary">
            <section className="flex flex-col md:flex-row lg:flex-row container lg:px-0 md:px-8 px-4 lg:text-base justify-between items-center text-white py-4 mx-auto text-xs space-y-2 md:space-y-0">
                <span>© All rights reserved. Taters Enterprises Incorporated</span>
                <span>Customer Hotline: (+63) 997-275-5595</span>

                <div className="space-x-2 md:space-x-1 lg:space-x-2 flex">
                    <SocialMediaLink className="bg-gray-600 hover:text-blue-400" icon={<FaTwitter/>} url='https://twitter.com/ilovetatersph'/>
                    <SocialMediaLink className="bg-gray-600 hover:text-blue-700" icon={<FaFacebookF/>} url='https://www.facebook.com/ilovetaters.ph/'/>
                    <SocialMediaLink className="bg-gray-600 hover:text-violet-700" icon={<FaInstagram/>} url='https://www.instagram.com/ilovetaters.ph/'/>
                    <SocialMediaLink className="bg-gray-600 hover:text-blue-400" icon={<FaPaperPlane/>} url='http://tiny.cc/TatersPH-Viber'/>
                    <SocialMediaLink className="bg-gray-600 hover:text-violet-700" icon={<FaViber/>} url='http://tiny.cc/TatersPH-Viber'/>
                    <SocialMediaLink className="bg-gray-600 hover:text-red-700" icon={<FaYoutube/>} url='https://www.youtube.com/user/TatersSnackLeague'/>
                </div>

            </section>
        </footer>
    );
}