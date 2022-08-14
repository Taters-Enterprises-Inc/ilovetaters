import { REACT_APP_UPLOADS_URL } from "features/shared/constants";
import { Link } from "react-router-dom";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';

import { Autoplay, Navigation } from "swiper";
interface ShopProductsCarouselProps {
    products: Array<any>
}

export function ShopProductsCarousel(props: ShopProductsCarouselProps){
    
    const spliceIntoChunks =(arr : Array<any>, chunkSize : number)=> {
        const res = [];
        while (arr.length > 0) {
            const chunk = arr.splice(0, chunkSize);
            res.push(chunk);
        }
        return res;
    }

    var _4x2 = spliceIntoChunks([...props.products], 6);
    var _2x2 = spliceIntoChunks([...props.products], 4);

    return(
        <Swiper
            slidesPerView={"auto"}
            modules={[Navigation, Autoplay]}
            navigation
            autoplay={{ delay: 5000 }} 
        >
        {
            _4x2.map((chunk, i) => {
                
                return(
                    <SwiperSlide key={i} className='hidden lg:block' >
                        <div className="flex flex-wrap">
                            {
                                chunk.map((product, i)=>(
                                    <Link key={i}  to={product.hash} className="bg-secondary shadow-tertiary shadow-md rounded-[10px] text-white max-w-[45%] flex-[0_0_45%] lg:max-w-[22.8%] lg:flex-[0_0_22.8%] m-2">
                                        <img src={`https://ilovetaters.com/shop/assets/img/250/${product.image}`} className="rounded-t-[10px] w-full" alt="" />
                                        <div className="p-3 space-y-2">
                                            <h2 className="text-white text-sm leading-4">{product.name}</h2>
                                            <h3 className="text-white font-bold">₱ {product.price}</h3>
                                        </div>
                                    </Link>
                                ))
                            }
                        </div>
                    </SwiperSlide>
                );
            })
        }
        {
            _2x2.map((chunk, i) => {
                
                return(
                    <SwiperSlide key={i} className=' lg:hidden' >
                        <div className="flex flex-wrap">
                            {
                                chunk.map((product, i)=>(
                                    <Link key={i} to={product.hash} className="bg-secondary shadow-tertiary shadow-md rounded-[10px] text-white max-w-[45%] flex-[0_0_45%] lg:max-w-[22.8%] lg:flex-[0_0_22.8%] m-2">
                                        <img src={REACT_APP_UPLOADS_URL + "images/shop/products/175/test.jpg"} className="rounded-t-[10px] w-full" alt="" />
                                        <div className="p-3 space-y-2">
                                            <h2 className="text-white text-sm leading-4">{product.name}</h2>
                                            <h3 className="text-white font-bold">₱ {product.price}</h3>
                                        </div>
                                    </Link>
                                ))
                            }
                        </div>
                    </SwiperSlide>
                );
            })
        }
        </Swiper>  
    );
}