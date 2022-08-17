import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { FooterNav, HeaderNav } from "features/shared";
import { REACT_APP_UPLOADS_URL, SERVICES_DESKTOP, SERVICES_MOBILE } from "features/shared/constants";
import { useEffect, useState } from "react";
import { PlatformChooserModal } from "../modals/platform-chooser.modal";
import { StoreChooserModal } from "../modals/store-chooser.modal";
import { StoreVisitStoreChooserModal } from "../modals/store-visit-store-chooser.modal";
import { getAllPlatform, selectGetAllPlatform } from "../slices/get-all-platform.slice";

export function PopClubPlatformPicker(){
    const getAllPlatformState  = useAppSelector(selectGetAllPlatform);;
    const dispatch = useAppDispatch();
    
    const [openStoreChooserModal, setOpenStoreChooserModal] = useState(false);
    const [openStoreVisitStoreChooserModal, setOpenStoreVisitStoreChooserModal] = useState(false);

    useEffect(()=>{
        dispatch(getAllPlatform());
    },[dispatch]);
    
    return (
        
        <section className="bg-primary">

            <HeaderNav serviceReached={false} active='HOME'></HeaderNav>


            <img className="lg:hidden" src={REACT_APP_UPLOADS_URL + "images/popclub/hero/mobile/popclub.webp"} alt="The best pop corn in town"></img>
            <img className="hidden lg:block" src={REACT_APP_UPLOADS_URL + "images/popclub/hero/desktop/popclub.webp"} alt="The best pop corn in town"></img>

            <img  className="hidden lg:block" src={ REACT_APP_UPLOADS_URL + "images/popclub/banner/popclub_instruction.webp"} alt="The best pop corn in town"></img>

            <section>

                <section className="hidden lg:flex container flex-wrap pt-2 pb-[90px] lg:pb-0 justify-center items-center lg:min-h-screen content-start">

                    {
                        SERVICES_DESKTOP.map(function(service_desktop, i){
                            return (
                                <div key={i} className="flex-[0_0_50%] max-w-[50%] md:flex-[0_0_30%] md:max-w-[40%] lg:max-w-[30%]  lg:flex-[0_0_30%] h-[250px] sm:h-[300px] p-2 text-white">
                                    <div 
                                        style={{
                                            backgroundImage: `url("${REACT_APP_UPLOADS_URL+service_desktop.image}")`,
                                            backgroundPosition: 'center',
                                            backgroundRepeat: 'no-repeat',
                                            backgroundSize: 'cover',
                                            position: 'relative',
                                        }}
                                        className="shadow-xl h-full flex items-end bg-gray-400 cursor-pointer rounded-[1rem] lg:rounded-[1rem]">
                                        <div className="w-full px-6 pt-14 pb-3 rounded-b-[1rem] lg:rounded-b-[1rem]" style={{
                                            background: `linear-gradient(transparent 0%, ${service_desktop.color} 45%, ${service_desktop.color} 100%)`,
                                            lineHeight: '14px',
                                            color: service_desktop.textColor,
                                        }}>
                                            <h4 className="text-[16px] sm:text-lg lg:text-2xl font-bold ">{service_desktop.title}</h4>
                                            <p className="text-[9px] sm:text-xs lg:text-xs">{service_desktop.subtitle}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    }

                </section>

                
                <section className="lg:hidden container flex flex-wrap pt-2 pb-[90px] lg:pb-0 lg:justify-start justify-center items-center lg:min-h-screen content-start">

                    {
                        SERVICES_MOBILE.map(function(service_mobile, i){
                            return (
                                <div key={i} className="flex-[0_0_50%] max-w-[50%] md:flex-[0_0_30%] md:max-w-[40%] lg:max-w-[30%]  lg:flex-[0_0_30%] h-[250px] sm:h-[300px] p-2 text-white">
                                    <div 
                                        style={{
                                            backgroundImage: `url("${REACT_APP_UPLOADS_URL+service_mobile.image}")`,
                                            backgroundPosition: 'center',
                                            backgroundRepeat: 'no-repeat',
                                            backgroundSize: 'cover',
                                            position: 'relative',
                                        }}
                                        className="shadow-xl h-full flex items-end bg-gray-400 cursor-pointer rounded-[0.5rem] lg:rounded-[2rem]">
                                        <div className="w-full lg:px-6 px-2 pt-14 pb-3 rounded-b-[0.5rem] lg:rounded-b-[2rem]" style={{
                                            background: `linear-gradient(transparent 0%, ${service_mobile.color} 45%, ${service_mobile.color} 100%)`,
                                            lineHeight: '14px',
                                            color: service_mobile.textColor,
                                        }}>
                                            <h4 className="text-[16px] sm:text-lg lg:text-2xl font-bold ">{service_mobile.title}</h4>
                                            <p className="text-[9px] sm:text-xs lg:text-xs">{service_mobile.subtitle}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    }

                </section>

            </section>

            <PlatformChooserModal 
                platforms={getAllPlatformState.data} 
                onSelectedPlatform={(platform : string)=>{
                    switch(platform){
                        case 'store-visit':
                            setOpenStoreVisitStoreChooserModal(true);
                            break;
                        case 'online-delivery':
                            setOpenStoreChooserModal(true);
                            break;
                    }
                }}
                open={true}
            />
                
            <StoreChooserModal open={openStoreChooserModal} onClose={()=>{
                setOpenStoreChooserModal(false);
            }}></StoreChooserModal>


            <StoreVisitStoreChooserModal open={openStoreVisitStoreChooserModal} onClose={()=>{
                setOpenStoreVisitStoreChooserModal(false);
            }}></StoreVisitStoreChooserModal>
            
            <FooterNav></FooterNav>
        </section>
    )
}