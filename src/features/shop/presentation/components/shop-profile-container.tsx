import { ReactNode } from "react";
import { ShopPageTitleAndBreadCrumbs } from "../components/shop-page-title-and-breadcrumbs";
import { ShopProfileTabs, ShopProfileTabsProps } from "../components/shop-profile-tabs";

interface ShopProfileContainerProps extends ShopProfileTabsProps{
    title: string;
    children: ReactNode;
}

export function ShopProfileContainer(props: ShopProfileContainerProps){
    return(
        <>
            <ShopPageTitleAndBreadCrumbs title={props.title} pageTitles={['Products', props.title]}/>
            
            <section className="min-h-screen lg:space-x-4 pb-36">

                <div className="lg:-mt-[80px] lg:space-y-8">

                    <div className="container">
                        
                        <ShopProfileTabs activeTab={props.activeTab}/>

                        <div className="bg-primary profile-tab-content py-6 lg:shadow-[0_3px_10px_rgba(0,0,0,0.5)] w-full mb-10 lg:p-6 space-y-6">
                           {props.children}
                        </div>

                    </div>

                </div>
                    
            </section>

        </>
    );
}