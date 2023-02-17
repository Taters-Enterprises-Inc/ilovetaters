import { Link } from "react-router-dom";
import NumberFormat from "react-number-format";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";

import { Autoplay, Navigation } from "swiper";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";

interface ShopProductsCarouselProps {
  products: Array<any>;
  parentIndex: number;
}

export function ShopProductsCarousel(props: ShopProductsCarouselProps) {
  const spliceIntoChunks = (arr: Array<any>, chunkSize: number) => {
    const res = [];
    while (arr.length > 0) {
      const chunk = arr.splice(0, chunkSize);
      res.push(chunk);
    }
    return res;
  };

  var _4x2 = spliceIntoChunks([...props.products], 8);
  var _3x2 = spliceIntoChunks([...props.products], 6);
  var _2x2 = spliceIntoChunks([...props.products], 4);

  return (
    <Swiper
      slidesPerView={"auto"}
      modules={[Navigation, Autoplay]}
      navigation
      autoplay={{ delay: 5000 }}
      className="w-[103%] sm:w-[102%] lg:w-full"
    >
      {_4x2.map((chunk, i) => {
        return (
          <SwiperSlide
            key={i}
            className={`hidden xl:block ${
              props.parentIndex % 2 === 0 ? "pl-4 pr-1" : "pr-4 pl-1"
            } pb-2`}
          >
            <div className="grid grid-cols-4 gap-4">
              {chunk.map((product, i) => (
                <Link
                  key={i}
                  to={product.hash}
                  className="bg-secondary shadow-tertiary flex flex-col shadow-md rounded-[10px] text-white h-full"
                >
                  <img
                    src={`${REACT_APP_DOMAIN_URL}api/assets/images/shared/products/250/${product.image}`}
                    className="rounded-t-[10px] w-full"
                    alt={product.name}
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null;
                      currentTarget.src = `${REACT_APP_DOMAIN_URL}api/assets/images/shared/image_not_found/blank.jpg`;
                    }}
                  />
                  <div className="flex flex-col justify-between flex-1 p-3 space-y-2">
                    <h2 className="text-sm leading-4 text-white">
                      {product.name}
                    </h2>
                    {product.promo_discount_percentage ? (
                      <div>
                        <h3 className="text-sm font-bold text-white line-through">
                          <NumberFormat
                            value={product.price.toFixed(2)}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={"₱"}
                          />
                        </h3>

                        <h3 className="font-bold text-white ">
                          <NumberFormat
                            value={(
                              product.price -
                              product.price *
                                parseFloat(product.promo_discount_percentage)
                            ).toFixed(2)}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={"₱"}
                          />
                        </h3>
                      </div>
                    ) : (
                      <h3 className="font-bold text-white">
                        <NumberFormat
                          value={product.price.toFixed(2)}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"₱"}
                        />
                      </h3>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </SwiperSlide>
        );
      })}
      {_3x2.map((chunk, i) => {
        return (
          <SwiperSlide
            key={i}
            className={`hidden sm:block xl:hidden ${
              props.parentIndex % 2 === 0
                ? "lg:pl-4 lg:pr-1"
                : "lg:pr-4 lg:pl-1"
            } pb-2 px-3 lg:px-0`}
          >
            <div className="grid grid-cols-3 gap-4">
              {chunk.map((product, i) => (
                <Link
                  key={i}
                  to={product.hash}
                  className="bg-secondary shadow-tertiary flex flex-col shadow-md rounded-[10px] text-white h-full"
                >
                  <img
                    src={`${REACT_APP_DOMAIN_URL}api/assets/images/shared/products/250/${product.image}`}
                    className="rounded-t-[10px] w-full"
                    alt={product.name}
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null;
                      currentTarget.src = `${REACT_APP_DOMAIN_URL}api/assets/images/shared/image_not_found/blank.jpg`;
                    }}
                  />
                  <div className="flex flex-col justify-between flex-1 p-3 space-y-2">
                    <h2 className="text-sm leading-4 text-white">
                      {product.name}
                    </h2>
                    {product.promo_discount_percentage ? (
                      <div>
                        <h3 className="text-sm font-bold text-white line-through">
                          <NumberFormat
                            value={product.price.toFixed(2)}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={"₱"}
                          />
                        </h3>

                        <h3 className="font-bold text-white ">
                          <NumberFormat
                            value={(
                              product.price -
                              product.price *
                                parseFloat(product.promo_discount_percentage)
                            ).toFixed(2)}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={"₱"}
                          />
                        </h3>
                      </div>
                    ) : (
                      <h3 className="font-bold text-white">
                        <NumberFormat
                          value={product.price.toFixed(2)}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"₱"}
                        />
                      </h3>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </SwiperSlide>
        );
      })}
      {_2x2.map((chunk, i) => {
        return (
          <SwiperSlide key={i} className={`sm:hidden pb-2 px-3`}>
            <div className="grid grid-cols-2 gap-4">
              {chunk.map((product, i) => (
                <Link
                  key={i}
                  to={product.hash}
                  className="bg-secondary h-full flex flex-col shadow-tertiary shadow-md rounded-[10px] text-white "
                >
                  <img
                    src={`${REACT_APP_DOMAIN_URL}api/assets/images/shared/products/250/${product.image}`}
                    className="rounded-t-[10px] w-full"
                    alt={product.name}
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null;
                      currentTarget.src = `${REACT_APP_DOMAIN_URL}api/assets/images/shared/image_not_found/blank.jpg`;
                    }}
                  />
                  <div className="flex flex-col justify-between flex-1 p-3 space-y-2">
                    <h2 className="text-sm leading-4 text-white">
                      {product.name}
                    </h2>
                    {product.promo_discount_percentage ? (
                      <div>
                        <h3 className="text-sm font-bold text-white line-through">
                          <NumberFormat
                            value={product.price.toFixed(2)}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={"₱"}
                          />
                        </h3>

                        <h3 className="font-bold text-white ">
                          <NumberFormat
                            value={(
                              product.price -
                              product.price *
                                parseFloat(product.promo_discount_percentage)
                            ).toFixed(2)}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={"₱"}
                          />
                        </h3>
                      </div>
                    ) : (
                      <h3 className="font-bold text-white">
                        <NumberFormat
                          value={product.price.toFixed(2)}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"₱"}
                        />
                      </h3>
                    )}
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
