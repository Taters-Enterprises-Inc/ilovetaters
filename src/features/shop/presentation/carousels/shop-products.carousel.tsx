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
                    <SwiperSlide key={i} className='hidden xl:block pr-4 pl-1' >
                        <div className="grid grid-cols-4 gap-4">
                            {
                                chunk.map((product, i)=>(
                                    <Link key={i}  to={product.hash} className="bg-secondary shadow-tertiary flex flex-col shadow-md rounded-[10px] text-white h-full">
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
                        <div className="grid grid-cols-3 gap-4">
                            {
                                chunk.map((product, i)=>(
                                    <Link key={i}  to={product.hash} className="bg-secondary shadow-tertiary flex flex-col shadow-md rounded-[10px] text-white h-full">
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
                        <div className="grid gap-4 grid-cols-2">
                            {
                                chunk.map((product, i)=>(
                                    <Link key={i} to={product.hash} className="bg-secondary h-full flex flex-col shadow-tertiary shadow-md rounded-[10px] text-white ">
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