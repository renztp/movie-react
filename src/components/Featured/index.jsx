import React from "react";
import theBg from "../../assets/bg.jpg";
import "swiper/css";
import "swiper/css/effect-fade";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade } from "swiper";
import { useNavigate } from "react-router-dom";

export default function Featured({ featuredItems }) {
  const imageUrl = import.meta.env.VITE_TMDB_IMAGE;
  let navigate = useNavigate();

  const featuredReady = () => {
    if (featuredItems.length > 0) {
      return (
        <Swiper
          slidesPerView={1}
          onSlideChange={() => console.log("slide changed")}
          loop={true}
          modules={[EffectFade]}
          effect="fade"
        >
          {featuredItems.map((item) => (
            <SwiperSlide
              key={item.id}
              style={{
                backgroundImage: `url(${imageUrl}w1280${item.backdrop_path})`,
              }}
            >
              <div className="content">
                <h2>{item.title}</h2>
                <p>{item.overview}</p>
              </div>
              <button onClick={() => navigate("/movie/" + item.id)}>
                Watch Show
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
      );
    } else {
      return <div className="featured-loading"></div>;
    }
  };

  return (
    <section className="featured-section">
      <h1>Featured</h1>
      {featuredReady()}
    </section>
  );
}
