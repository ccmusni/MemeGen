import { EffectFade } from "swiper";
import Swiper, { SwiperSlide } from "../../components/swiper";
import sliderData from "../../data/hero-sliders/hero-slider-eighteen.json";
import HeroSliderEighteenSingle from "../../components/hero-slider/HeroSliderEighteenSingle.jsx";

const params = {
  effect: "fade",
  fadeEffect: {
    crossFade: true,
  },
  modules: [EffectFade],
  loop: true,
  speed: 1000,
  navigation: true,
  autoHeight: false,
};

const HeroSliderEighteen = () => {
  return (
    <div className="slider-area">
      <div className="slider-active nav-style-1">
        {sliderData && (
          <Swiper options={params}>
            {sliderData.map((single, key) => (
              <SwiperSlide key={key}>
                <HeroSliderEighteenSingle data={single} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
};

export default HeroSliderEighteen;
