// Filename - ImageSlider.js

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Images data
const images = [
  {
    id: 1,
    src: "https://rukminim2.flixcart.com/image/850/1000/xif0q/poster/7/x/7/small-poster-ktm-bike-photo-sl-15857-wall-poster-13x19-inches-original-imaghusggzsmdape.jpeg?q=90&crop=false",
    alt: "Image 1",
  },
  {
    id: 2,
    src: "https://rukminim2.flixcart.com/image/850/1000/xif0q/poster/7/x/7/small-poster-ktm-bike-photo-sl-15857-wall-poster-13x19-inches-original-imaghusggzsmdape.jpeg?q=90&crop=false",
    alt: "Image 2 ",
  },
  {
    id: 3,
    src: "https://rukminim2.flixcart.com/image/850/1000/xif0q/poster/7/x/7/small-poster-ktm-bike-photo-sl-15857-wall-poster-13x19-inches-original-imaghusggzsmdape.jpeg?q=90&crop=false",
    alt: "Image 3",
  },
];

const ImageSlider = () => {
  const settings = {
    infinite: true,
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    lazyLoad: true,
    autoplay: true,
    autoplaySpeed: 2000,
  };
  return (
    <>
      <div className="tag">
        <h1>Image Gallery</h1>
      </div>
      <div className="imgslider">
        <Slider {...settings}>
          {images.map((item) => (
            <div key={item.id}>
              <img src={item.src} alt={item.alt} />
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
};

export default ImageSlider;
