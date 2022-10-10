import { Link } from "react-router-dom";
import { useRef } from "react";
import NumberFormat from "react-number-format";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/autoplay";

import { Autoplay, Navigation, EffectFade } from "swiper";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";

interface ShopProductsCarouselProps {
  products: Array<any>;
  parentIndex: number;
}

export function ShopHeroCarousel() {
  return (
    <section className="lg:container">
      <Swiper
        modules={[Navigation, EffectFade]}
        navigation
        speed={800}
        slidesPerView={1}
        loop
        className="myswiper"
      >
        <SwiperSlide>
          <img
            className="sm:hidden"
            src={
              REACT_APP_DOMAIN_URL +
              "api/assets/images/shop/hero/mobile/snackshop_delivered.jpg"
            }
            alt="The best pop corn in town"
          ></img>
          <img
            className="hidden sm:block"
            src={
              REACT_APP_DOMAIN_URL +
              "api/assets/images/shop/hero/desktop/snackshop_delivered_black.jpg"
            }
            alt="The best pop corn in town"
          ></img>
          <img
            className="hidden sm:block"
            src={
              REACT_APP_DOMAIN_URL +
              "api/assets/images/shop/instructions/snackshop_instructions.jpg"
            }
            alt="The best pop corn in town"
          ></img>
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="sm:hidden"
            src={
              REACT_APP_DOMAIN_URL +
              "api/assets/images/shop/hero/mobile/snackshop_delivered.jpg"
            }
            alt="The best pop corn in town"
          ></img>
          <img
            className="hidden sm:block"
            src={
              REACT_APP_DOMAIN_URL +
              "api/assets/images/shop/hero/desktop/snackshop_delivered_black.jpg"
            }
            alt="The best pop corn in town"
          ></img>
          <img
            className="hidden sm:block"
            src={
              REACT_APP_DOMAIN_URL +
              "api/assets/images/shop/instructions/snackshop_instructions.jpg"
            }
            alt="The best pop corn in town"
          ></img>
        </SwiperSlide>
      </Swiper>

      {/* <img
        className="sm:hidden"
        src={
          REACT_APP_DOMAIN_URL +
          "api/assets/images/shop/hero/mobile/snackshop_delivered.jpg"
        }
        alt="The best pop corn in town"
      ></img>
      <img
        className="hidden sm:block"
        src={
          REACT_APP_DOMAIN_URL +
          "api/assets/images/shop/hero/desktop/snackshop_delivered_black.jpg"
        }
        alt="The best pop corn in town"
      ></img>
      <img
        className="hidden sm:block"
        src={
          REACT_APP_DOMAIN_URL +
          "api/assets/images/shop/instructions/snackshop_instructions.jpg"
        }
        alt="The best pop corn in town"
      ></img> */}
    </section>
  );
}
