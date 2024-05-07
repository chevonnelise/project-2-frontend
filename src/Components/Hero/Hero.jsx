import React, {useState} from 'react';
import Carousel from 'react-bootstrap/Carousel';

const data = [
  {
   image: require('../Assets/welcome_banner.png'), 
   caption:"Welcome to Superfoods",
   description:"Welcome banner"
  },
  {
    image:require('../Assets/opening_sale_banner.png'), 
    caption:"Opening Sale Banner",
    description:"Opening Sale Banner"
   }
]

function Hero() {
  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
       {data.map((slide, i) => {
        return (
          <Carousel.Item>        
        <img
          className="d-block w-100"
          src={slide.image}
          alt="slider image"
        />
        {/* <Carousel.Caption>
          <h3>{slide.caption}</h3>
          <p>{slide.description}</p>
        </Carousel.Caption> */}
      </Carousel.Item>
        )
      })}
      
    </Carousel>
  );
}
export default Hero;