import { useRef } from "react";
import NumberFormat from "react-number-format";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";

import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import { Autoplay, EffectFade, Navigation } from "swiper";

interface ShopProductsCarouselProps {
  products: Array<any>;
  parentIndex: number;
}

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
        />
        <img
          className="hidden sm:block"
          src={
            REACT_APP_DOMAIN_URL +
            "api/assets/images/shop/hero/desktop/snackshop_delivered_black.jpg"
          }
          alt="The best pop corn in town"
        />
        <img
          className="hidden sm:block"
          src={
            REACT_APP_DOMAIN_URL +
            "api/assets/images/shop/instructions/snackshop_instructions.jpg"
          }
          alt="The best pop corn in town"
        />
      </SwiperSlide>
    </Swiper>
  );
}
