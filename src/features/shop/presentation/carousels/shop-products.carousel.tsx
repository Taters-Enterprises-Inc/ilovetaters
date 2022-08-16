import { REACT_APP_UPLOADS_URL } from "features/shared/constants";
import { Link } from "react-router-dom";
import NumberFormat from 'react-number-format';
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

    var _4x2 = spliceIntoChunks([...props.products], 8);
    var _3x2 = spliceIntoChunks([...props.products], 6);
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
                    <SwiperSlide key={i} className='hidden xl:block' >
                        <div className="flex flex-wrap">
                            {
                                chunk.map((product, i)=>(
                                    <Link key={i}  to={product.hash} className="bg-secondary shadow-tertiary flex flex-col shadow-md rounded-[10px] text-white max-w-[22%] flex-[0_0_22%] m-2">
                                        <img src={`https://ilovetaters.com/shop/assets/img/250/${product.image}`} className="rounded-t-[10px] w-full" alt="" />
                                        <div className="p-3 space-y-2 flex flex-col justify-between flex-1">
                                            <h2 className="text-white text-sm leading-4">{product.name}</h2>
                                            <h3 className="text-white font-bold">
                                                <NumberFormat value={product.price.toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'₱'} />
                                            </h3>
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
            _3x2.map((chunk, i) => {
                
                return(
                    <SwiperSlide key={i} className='hidden sm:block xl:hidden' >
                        <div className="flex flex-wrap">
                            {
                                chunk.map((product, i)=>(
                                    <Link key={i}  to={product.hash} className="bg-secondary shadow-tertiary flex flex-col shadow-md rounded-[10px] text-white sm:max-w-[30%] sm:flex-[0_0_30%] md:max-w-[31%] md:flex-[0_0_31%] lg:max-w-[29%] lg:flex-[0_0_29%] m-2">
                                        <img src={`https://ilovetaters.com/shop/assets/img/250/${product.image}`} className="rounded-t-[10px] w-full" alt="" />
                                        <div className="p-3 space-y-2 flex flex-col justify-between flex-1">
                                            <h2 className="text-white text-sm leading-4">{product.name}</h2>
                                            <h3 className="text-white font-bold">
                                                <NumberFormat value={product.price.toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'₱'} />
                                            </h3>
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
                    <SwiperSlide key={i} className='sm:hidden' >
                        <div className="flex flex-wrap">
                            {
                                chunk.map((product, i)=>(
                                    <Link key={i} to={product.hash} className="bg-secondary flex flex-col shadow-tertiary shadow-md rounded-[10px] text-white max-w-[44%] flex-[0_0_44%] m-2">
                                        <img src={`https://ilovetaters.com/shop/assets/img/250/${product.image}`} className="rounded-t-[10px] w-full" alt="" />
                                        <div className="p-3 space-y-2 flex flex-col justify-between flex-1">
                                            <h2 className="text-white text-sm leading-4">{product.name}</h2>
                                            <h3 className="text-white font-bold">
                                                <NumberFormat value={product.price.toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'₱'} />
                                            </h3>
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