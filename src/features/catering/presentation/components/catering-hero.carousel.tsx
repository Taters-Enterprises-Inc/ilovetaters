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

export function CateringHeroCarousel() {
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
            className="lg:hidden"
            src={
              REACT_APP_DOMAIN_URL +
              "api/assets/images/catering/hero/mobile/catering_munch_better.jpg"
            }
            alt="The best pop corn in town"
          ></img>
          <img
            className="hidden lg:block"
            src={
              REACT_APP_DOMAIN_URL +
              "api/assets/images/catering/hero/desktop/catering_munch_better_black.jpg"
            }
            alt="The best pop corn in town"
          ></img>
        </SwiperSlide>
      </Swiper>
    </section>
  );
}
