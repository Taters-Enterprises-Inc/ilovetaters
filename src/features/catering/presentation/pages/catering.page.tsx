import { FooterNav, HeaderNav } from "features/shared";
import { REACT_APP_UPLOADS_URL } from "features/shared/constants";

export function Catering(){

    return (
        <main className="bg-primary">
            <HeaderNav serviceReached={true} active='CATERING' sticky/>
            

            <section className=" container min-h-screen">
                
                <img className="lg:hidden" src={REACT_APP_UPLOADS_URL + "images/catering/hero/mobile/catering_landing_page.webp"} alt="The best pop corn in town"></img>
                <img className="hidden lg:block" src={REACT_APP_UPLOADS_URL + "images/catering/hero/desktop/catering_landing_page.webp"} alt="The best pop corn in town"></img>

            </section>

            <FooterNav/>
        </main>
    );
}