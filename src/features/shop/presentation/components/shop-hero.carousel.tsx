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

export function ShopHeroCarousel() {
  return (
    <Swiper
      // modules={[Navigation, EffectFade]}
      // navigation
      // speed={800}
      slidesPerView={1}
      // loop
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
    </Swiper>
  );
}
