
import { FooterNav, HeaderNav } from "features/shared";
import { useEffect, useRef, useState } from "react";
import { REACT_APP_DOMAIN_URL, SERVICES_DESKTOP, SERVICES_MOBILE } from "features/shared/constants";



export function Home(){
    
    const [serviceReached, setServiceReached] = useState(false);
    const servicesRef = useRef<any>(null);
    const listenScrollEvent = (event: any) => {
    if (window.scrollY < 203) {
        return setServiceReached(false);
    } else if (window.scrollY > 200) {
        return setServiceReached(true);
    } 
    }

    useEffect(() => {
        
        window.addEventListener('scroll', listenScrollEvent);

        return () => window.removeEventListener('scroll', listenScrollEvent);
    }, []);


    return (
        <section className="bg-[#a21013]">

            <HeaderNav serviceReached={serviceReached} active='HOME'></HeaderNav>

            <section 
                style={{
                    backgroundImage: `url('${REACT_APP_DOMAIN_URL}uploads/images/mobile/banners/taters_entertainment_snacks.jpg')`,
                    backgroundSize: 'contain',
                    backgroundPositionX: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundAttachment: 'fixed',
                }}
                className="sm:hidden flex items-end justify-center relative ">
                    <img src={REACT_APP_DOMAIN_URL + "uploads/images/mobile/banners/taters_entertainment_snacks.jpg"} alt="The best pop corn in town" style={{visibility: 'hidden'}}></img>
            </section>
            
            <section 
                style={{
                    backgroundImage: `url('${REACT_APP_DOMAIN_URL}uploads/images/desktop/banners/taters_entertainment_snacks.jpg')`,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundAttachment: 'fixed',
                }}
                className="hidden sm:flex items-end justify-center relative ">
                    <img src={REACT_APP_DOMAIN_URL + "uploads/images/desktop/banners/taters_entertainment_snacks.jpg"} alt="The best pop corn in town" style={{visibility: 'hidden'}}></img>
            </section>


            <section>

                <section ref={servicesRef} className="hidden lg:flex max-w-[1000px] mx-auto flex-wrap pt-2 pb-[90px] lg:pb-0 px-2 justify-center items-center lg:min-h-screen content-start">

                    {
                        SERVICES_DESKTOP.map(function(service_desktop, i){
                            return (
                                <a href={service_desktop.url} key={i} className="flex-[0_0_50%] max-w-[50%] md:flex-[0_0_30%] md:max-w-[40%] lg:max-w-[30%]  lg:flex-[0_0_30%] h-[250px] sm:h-[300px] p-2 text-white">
                                    <div 
                                        style={{
                                            backgroundImage: `url("${REACT_APP_DOMAIN_URL+service_desktop.image}")`,
                                            backgroundPosition: 'center',
                                            backgroundRepeat: 'no-repeat',
                                            backgroundSize: 'cover',
                                            position: 'relative',
                                        }}
                                        className=" h-full flex items-end bg-gray-400 cursor-pointer rounded-[1rem] lg:rounded-[1rem] shadow-md shadow-[#ffcd17]">
                                        <div className="w-full px-6 pt-14 pb-3 rounded-b-[1rem] lg:rounded-b-[1rem]" style={{
                                            background: `linear-gradient(transparent 0%, ${service_desktop.color} 45%, ${service_desktop.color} 100%)`,
                                            lineHeight: '14px',
                                            color: service_desktop.textColor,
                                        }}>
                                            <h4 className="text-[16px] sm:text-lg lg:text-2xl font-bold font-['Bebas_Neue'] ">{service_desktop.title}</h4>
                                            <p className="text-[9px] sm:text-xs lg:text-xs">{service_desktop.subtitle}</p>
                                        </div>
                                    </div>
                                </a>
                            );
                        })
                    }

                </section>

                
                <section ref={servicesRef} className="lg:hidden max-w-[1000px] mx-auto flex flex-wrap pt-2 pb-[90px] lg:pb-0 px-2 lg:justify-start justify-center items-center lg:min-h-screen content-start">

                    {
                        SERVICES_MOBILE.map(function(service_mobile, i){
                            return (
                                <div key={i} className=" flex-[0_0_50%] max-w-[50%] md:flex-[0_0_30%] md:max-w-[40%] lg:max-w-[30%]  lg:flex-[0_0_30%] h-[250px] sm:h-[300px] p-2 text-white">
                                {
                                    service_mobile.url ?
                                    <a href={service_mobile.url}>
                                        <div 
                                            style={{
                                                backgroundImage: `url("${REACT_APP_DOMAIN_URL+service_mobile.image}")`,
                                                backgroundPosition: 'center',
                                                backgroundRepeat: 'no-repeat',
                                                backgroundSize: 'cover',
                                                position: 'relative',
                                            }}
                                            className="shadow-md shadow-[#ffcd17] h-full flex items-end bg-gray-400 cursor-pointer rounded-[0.5rem] lg:rounded-[2rem]">
                                            <div className="w-full lg:px-6 px-2 pt-14 pb-3 rounded-b-[0.5rem] lg:rounded-b-[2rem] " style={{
                                                background: `linear-gradient(transparent 0%, ${service_mobile.color} 45%, ${service_mobile.color} 100%)`,
                                                lineHeight: '14px',
                                                color: service_mobile.textColor,
                                            }}>
                                                <h4 className="text-[20px] sm:text-lg lg:text-2xl font-['Bebas_Neue'] tracking-[1px]">{service_mobile.title}</h4>
                                                <p className="text-[10px] sm:text-xs lg:text-xs font-semibold">{service_mobile.subtitle}</p>
                                            </div>
                                        </div>
                                    </a> : 
                                    <div className="h-full">
                                        <div 
                                            style={{
                                                backgroundImage: `url("${REACT_APP_DOMAIN_URL+service_mobile.image}")`,
                                                backgroundPosition: 'center',
                                                backgroundRepeat: 'no-repeat',
                                                backgroundSize: 'cover',
                                                position: 'relative',
                                            }}
                                            className="shadow-md shadow-[#ffcd17] h-full flex items-end bg-gray-400 cursor-pointer rounded-[0.5rem] lg:rounded-[2rem]">
                                            <div className="w-full lg:px-6 px-2 pt-14 pb-3 rounded-b-[0.5rem] lg:rounded-b-[2rem] " style={{
                                                background: `linear-gradient(transparent 0%, ${service_mobile.color} 45%, ${service_mobile.color} 100%)`,
                                                lineHeight: '14px',
                                                color: service_mobile.textColor,
                                            }}>
                                                <h4 className="text-[20px] sm:text-lg lg:text-2xl font-['Bebas_Neue'] tracking-[1px]">{service_mobile.title}</h4>
                                                <p className="text-[10px] sm:text-xs lg:text-xs font-semibold">{service_mobile.subtitle}</p>
                                            </div>
                                        </div>
                                    </div>
                                }
                                </div>
                            );
                        })
                    }

                </section>

            </section>
            
            <FooterNav></FooterNav>
        </section>
    )
}