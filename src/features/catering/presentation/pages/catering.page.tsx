import { FooterNav, HeaderNav } from "features/shared";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import { useEffect, useRef, useState } from "react";

export function Catering(){

    return (
        <main className="bg-primary">
            <HeaderNav serviceReached={true} active='CATERING' sticky/>
            
            <img className="lg:hidden" src={REACT_APP_DOMAIN_URL + "uploads/images/catering/hero/mobile/catering_landing_page.webp"} alt="The best pop corn in town"></img>
            <img className="hidden lg:block" src={REACT_APP_DOMAIN_URL + "uploads/images/catering/hero/desktop/catering_landing_page.webp"} alt="The best pop corn in town"></img>

            <section className=" container mx-auto min-h-screen">

            </section>

            <FooterNav/>
        </main>
    );
}