import { FooterNav } from "features/shared";
import { REACT_APP_UPLOADS_URL } from "features/shared/constants";
import { Link } from "react-router-dom";
import { ShopBannerCarousel } from "../carousels";
import { ShopHeaderNav } from "../header/shop-header-nav.component";

const products = [
    {
        name : 'Lorem ipsum dolor sit amet ',
        hash: 'test-hash',
        price : '₱ 250.00',
    },
    {
        name : 'Lorem ipsum dolor sit amet ',
        hash: 'test-hash',
        price : '₱ 250.00',
    },
    {
        name : 'Lorem ipsum dolor sit amet ',
        hash: 'test-hash',
        price : '₱ 250.00',
    },
    {
        name : 'Lorem ipsum dolor sit amet ',
        hash: 'test-hash',
        price : '₱ 250.00',
    },
]

export function ShopProducts(){
    return (
        <main className="bg-primary">
            <ShopHeaderNav/>

            <section className="container mx-auto">
                <ShopBannerCarousel/>
                {/* <img className="lg:hidden" src={REACT_APP_UPLOADS_URL + "images/shop/hero/mobile/snackshop_delivered.webp"} alt="The best pop corn in town"></img>
                <img className="hidden lg:block" src={REACT_APP_UPLOADS_URL + "images/shop/hero/desktop/snackshop_delivered.webp"} alt="The best pop corn in town"></img>
                <img className="hidden lg:block" src={REACT_APP_UPLOADS_URL + "images/shop/instructions/snackshop_instructions.webp"} alt="The best pop corn in town"></img> */}
            </section>


            <section className="min-h-screen container mx-auto px-4 lg:px-0 flex flex-col lg:flex-row lg:space-x-3">
                
                <div 
                    style={{
                        backgroundImage : `url('${REACT_APP_UPLOADS_URL + "images/shop/categories/test.jpg"}')`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                    }}
                className="bg-secondary shadow-tertiary shadow-md rounded-[10px] mb-6 lg:flex-[0_0_38%] lg:p-10 hidden lg:block">
                    <h1 className="text-white text-center lg:text-start text-2xl lg:text-5xl py-3 font-['Bebas_Neue'] font-light tracking-[3px]">Snacks and Hotdogs</h1>
                </div>
                <div 
                className="bg-secondary shadow-tertiary shadow-md rounded-[10px] mb-6 lg:flex-[0_0_38%] lg:p-10  lg:hidden">
                    <h1 className="text-white text-center lg:text-start text-2xl lg:text-5xl py-3 font-['Bebas_Neue'] font-light tracking-[3px]">Snacks and Hotdogs</h1>
                </div>

                <div className="flex flex-wrap justify-start items-start">
                    {
                        products.map((product, i) => (
                            <Link to={product.hash} className="bg-secondary shadow-tertiary shadow-md rounded-[10px] text-white max-w-[45%] flex-[0_0_45%] lg:max-w-[22.8%] lg:flex-[0_0_22.8%] m-2 min-h-[200px]">
                                <img src={REACT_APP_UPLOADS_URL + "images/shop/products/175/test.jpg"} className="rounded-t-[10px] w-full" alt="" />
                                <div className="p-3 space-y-2">
                                    <h2 className="text-white text-sm leading-4">{product.name}</h2>
                                    <h3 className="text-white font-bold">{product.price}</h3>
                                </div>
                            </Link>
                        ))
                    }
                </div>


            </section>


            <FooterNav/>
        </main>
    );
}