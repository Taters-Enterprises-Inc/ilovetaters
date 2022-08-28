import { Link, useNavigate } from "react-router-dom";
import NumberFormat from "react-number-format";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";

import { Autoplay, Navigation } from "swiper";

interface ShopPeopleAlsoBoughtCarouselProps {
  products: Array<any>;
}

export function ShopPeopleAlsoBoughtCarousel(
  props: ShopPeopleAlsoBoughtCarouselProps
) {
  const navigate = useNavigate();

  const spliceIntoChunks = (arr: Array<any>, chunkSize: number) => {
    const res = [];
    while (arr.length > 0) {
      const chunk = arr.splice(0, chunkSize);
      res.push(chunk);
    }
    return res;
  };

  var _4x2 = spliceIntoChunks([...props.products], 4);
  var _3x2 = spliceIntoChunks([...props.products], 3);
  var _2x2 = spliceIntoChunks([...props.products], 2);

  // return null;

  return (
    <Swiper
      slidesPerView={"auto"}
      modules={[Navigation, Autoplay]}
      navigation
      autoplay={{ delay: 5000 }}
      className=" h-[400px] w-full"
    >
      {_4x2.map((chunk, i) => {
        return (
          <SwiperSlide key={i} className={`hidden xl:block pb-2`}>
            <div className="grid grid-cols-4 gap-4">
              {chunk.map((product, i) => (
                <button
                  key={i}
                  onClick={() => {
                    if (product.hash !== undefined) {
                      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
                      navigate(`/shop/products/${product.hash}`);
                    }
                  }}
                  className="bg-secondary shadow-tertiary flex flex-col shadow-md rounded-[10px] text-white h-full"
                >
                  <img
                    src={`https://ilovetaters.com/staging/v2/shop/assets/img/250/${product.image}`}
                    className="rounded-t-[10px] w-full"
                    alt=""
                  />
                  <div className="p-3 space-y-2 flex flex-col justify-between flex-1">
                    <h2 className="text-white text-sm leading-4">
                      {product.name}
                    </h2>
                    <h3 className="text-white font-bold">
                      <NumberFormat
                        value={product.price.toFixed(2)}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"₱"}
                      />
                    </h3>
                  </div>
                </button>
              ))}
            </div>
          </SwiperSlide>
        );
      })}
      {_3x2.map((chunk, i) => {
        return (
          <SwiperSlide
            key={i}
            className={`hidden sm:block xl:hidden pb-2 lg:px-0`}
          >
            <div className="grid grid-cols-3 gap-4">
              {chunk.map((product, i) => (
                <Link
                  key={i}
                  to={`/shop/products/${product.hash}`}
                  className="bg-secondary shadow-tertiary flex flex-col shadow-md rounded-[10px] text-white h-full"
                >
                  <img
                    src={`https://ilovetaters.com/staging/v2/shop/assets/img/250/${product.image}`}
                    className="rounded-t-[10px] w-full"
                    alt=""
                  />
                  <div className="p-3 space-y-2 flex flex-col justify-between flex-1">
                    <h2 className="text-white text-sm leading-4">
                      {product.name}
                    </h2>
                    <h3 className="text-white font-bold">
                      <NumberFormat
                        value={product.price.toFixed(2)}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"₱"}
                      />
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </SwiperSlide>
        );
      })}
      {_2x2.map((chunk, i) => {
        return (
          <SwiperSlide key={i} className={`sm:hidden pb-2`}>
            <div className="grid grid-cols-2 gap-4">
              {chunk.map((product, i) => (
                <Link
                  key={i}
                  to={`/shop/products/${product.hash}`}
                  className="bg-secondary h-full flex flex-col shadow-tertiary shadow-md rounded-[10px] text-white "
                >
                  <img
                    src={`https://ilovetaters.com/staging/v2/shop/assets/img/250/${product.image}`}
                    className="rounded-t-[10px] w-full"
                    alt=""
                  />
                  <div className="p-3 space-y-2 flex flex-col justify-between flex-1">
                    <h2 className="text-white text-sm leading-4">
                      {product.name}
                    </h2>
                    <h3 className="text-white font-bold">
                      <NumberFormat
                        value={product.price.toFixed(2)}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"₱"}
                      />
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
