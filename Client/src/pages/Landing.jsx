import { Swiper, SwiperSlide } from 'swiper/react';
import { register } from 'swiper/element/bundle';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import imageFundo from '../assets/imagem2.png';
import truck from '../assets/truck.jpeg';
register();

const slides = [
  { id: 1, image: truck },
  { id: 2, image: imageFundo },
  { id: 3, image: truck },
  { id: 4, image: imageFundo },
];

export default function Login() {
  return (
    <main
      style={{ backgroundImage: `url(${imageFundo})` }}
      className='min-h-screen bg-no-repeat bg-cover bg-center flex items-center opacity-80'
    >
      <div className='w-full max-w-screen-2xl mx-auto p-3 bg-white bg-opacity-90 rounded-lg shadow-lg'>
        <h1 className='text-3xl text-logoColor font-bold underline p-5 text-center'>
          GALERIA GRUPO SAGIT
        </h1>
        <Swiper
          slidesPerView={3}
          pagination={{ clickable: true }}
          navigation
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <img
                className='rounded-2xl w-auto h-60 object-cover mx-auto'
                src={slide.image}
                alt={slide.title || 'Slide image'}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </main>
  );
}
