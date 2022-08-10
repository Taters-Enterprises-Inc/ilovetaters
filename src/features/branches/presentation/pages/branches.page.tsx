import { FooterNav, HeaderNav } from "features/shared";
import { useEffect, useRef, useState } from "react";

export function Branches(){
    
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
        <main className="bg-primary">
            <HeaderNav serviceReached={serviceReached} active='BRANCHES'/>

            <section ref={servicesRef} className=" container mx-auto min-h-screen">

            </section>

            <FooterNav/>
        </main>
    );
}