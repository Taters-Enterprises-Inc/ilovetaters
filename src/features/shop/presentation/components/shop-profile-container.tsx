import TextField from "@mui/material/TextField";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { FooterNav } from "features/shared";
import { getSession, selectGetSession } from "features/shared/presentation/slices/get-session.slice";
import { ReactNode, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShopPageTitleAndBreadCrumbs } from "../components/shop-page-title-and-breadcrumbs";
import { ShopProfileTabs, ShopProfileTabsProps } from "../components/shop-profile-tabs";
import { ShopHeaderNav } from "../header/shop-header-nav.component";

interface ShopProfileContainerProps extends ShopProfileTabsProps{
    title: string;
    children: ReactNode;
}

export function ShopProfileContainer(props: ShopProfileContainerProps){

    const getSessionState = useAppSelector(selectGetSession);
    const dispatch = useAppDispatch();
    const location = useLocation();


    useEffect(()=>{
        dispatch(getSession());
    },[]);
    
    useEffect(() => {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    }, [location]);

    return(
        <>
            <ShopPageTitleAndBreadCrumbs title={props.title} pageTitles={['Products', props.title]}/>
            
            <section className="min-h-screen lg:space-x-4 pb-36">

                <div className="lg:-mt-[80px] lg:space-y-8">

                    <div className="container">
                        
                        <ShopProfileTabs activeTab={props.activeTab}/>

                        <div className="bg-primary profile-tab-content py-6 lg:shadow-[0_3px_10px_rgba(0,0,0,0.5)] w-full mb-10 p-6 space-y-6">
                           {props.children}
                        </div>

                    </div>

                </div>
                    
            </section>

        </>
    );
}