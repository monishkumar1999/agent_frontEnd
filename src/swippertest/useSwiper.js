import { useEffect } from "react";
import Swiper from "swiper";
import { EffectCards, Mousewheel } from "swiper/modules";

const useSwiperExpo=()=>{
    useEffect(() => {
        new Swiper(".swiper", {
          effect: "cards",
          grabCursor: true,
          initialSlide: 2,
          speed: 500,
          loop: true,
          rotate: true,
          modules: [EffectCards, Mousewheel],  // Ensure modules array is correct
          mousewheel: {
            invert: false,
          },
        });
      }, []);
}

export default useSwiperExpo;