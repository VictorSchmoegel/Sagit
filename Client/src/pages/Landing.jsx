import { Swiper, SwiperSlide } from 'swiper/react';
import { register } from 'swiper/element/bundle';
import { MdOutlineArrowCircleDown } from "react-icons/md";
import { Link } from "react-scroll";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';

import videoFundo from '../assets/video.mp4';
import sagit from '../assets/sagit.png';
import truck from '../assets/truck.jpeg';
import solda from '../assets/solda.png';
import trem1 from '../assets/trem1.jpeg';
import trem2 from '../assets/trem2.jpeg';
import trem3 from '../assets/trem3.jpeg';
import antonilson from '../assets/Antonilson.png';
import ari from '../assets/Ari.png';
import felipe from '../assets/felipe.png';
import neuris from '../assets/Neuris.png';
import thais from '../assets/thais.png';
import zeMaria from '../assets/ZeMaria.png';
import edi from '../assets/Edi.png';

register();

const slides = [
  { id: 1, image: sagit },
  { id: 2, image: truck },
  { id: 3, image: solda },
  { id: 4, image: trem1 },
  { id: 5, image: trem2 },
  { id: 6, image: trem3 },
];

const avatarImages = [
  { id: 1, image: ari, title: 'Controller' },
  { id: 2, image: felipe, title: 'Gestor de Serviços' },
  { id: 3, image: neuris, title: 'Supervisor' },
  { id: 4, image: thais, title: 'Analista de RH pleno' },
  { id: 5, image: zeMaria, title: 'Supervisor Operacional' },
  { id: 6, image: edi, title: 'Analista de RH Sênior' },
  { id: 7, image: antonilson, title: 'Supervisor Operacional' },
]

export default function Login() {

  return (
    <main className='flex flex-col items-center justify-center'>

      {/* Contêiner de vídeo no topo */}
      <div className='relative w-full h-[100vh]'>
        <video
          autoPlay
          muted
          loop
          className='absolute top-0 left-0 w-full h-full object-cover'
        >
          <source src={videoFundo} type="video/mp4" />
          Seu navegador não suporta vídeos em HTML5.
        </video>
        {/* Texto sobreposto ao vídeo */}
        <div className='absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center'>
          <h1 className='text-white text-5xl font-bold drop-shadow-lg text-center'>
            Juntos, impulsionamos o futuro com inovação e dedicação!
          </h1>
          <Link
            to="home"
            spy={true}
            smooth={true}
            offset={50}
            duration={700}
            
          >
            <MdOutlineArrowCircleDown className=' text-black text-5xl animate-bounce mt-20 cursor-pointer' />
          </Link>
          <Link
            to="home"
            spy={true}
            smooth={true}
            offset={50}
            duration={700}
            
          >
            <p
              className='text-white text-2xl font-bold drop-shadow-lg text-center cursor-pointer'
            >
              Explore mais
            </p>
          </Link>
        </div>
      </div>

      {/* Conteúdo abaixo do vídeo */}
      <div className='w-full max-w-screen-2xl mx-auto pt-96' id='home'>
        <h2 className='text-8xl font-bold text-center mb-10'>
          A experiência de quem conhece o mercado
        </h2>
        <div className='bg-blue-600 text-white w-full rounded-lg shadow-lg p-8'>
          <ul className='grid grid-cols-1 md:grid-cols-3 gap-10'>
            <li className='flex flex-col items-center'>
              <h3 className='text-3xl font-bold mb-3 text-center'>+10<br />anos de experiência</h3>
              <p className='text-lg text-center'>
                Temos mais de 10 anos de experiência ajudando empresas por todo o território brasileiro.
              </p>
            </li>
            <li className='flex flex-col items-center'>
              <h3 className='text-3xl font-bold mb-3 text-center'>+50<br />projetos concluídos</h3>
              <p className='text-lg text-center'>
                Nossos projetos abrangem uma ampla variedade de soluções inovadoras e eficazes.
              </p>
            </li>
            <li className='flex flex-col items-center'>
              <h3 className='text-3xl font-bold mb-3 text-center'>+100<br />colaboradores</h3>
              <p className='text-lg text-center'>
                Nossa equipe é composta por mais de 100 profissionais altamente qualificados.
              </p>
            </li>
          </ul>
        </div>
      </div>
      <div className='w-full max-w-screen-2xl mx-auto bg-white bg-opacity-90 rounded-lg shadow-lg mt-10 p-36'>
        <h1 className='text-3xl text-logoColor font-bold underline p-5 text-center'>
          GALERIA GRUPO SAGIT
        </h1>
        <Swiper
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
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

      <div className='w-full max-w-screen-2xl mx-auto p-3 mt-10'>
        <h1 className='text-2xl font-bold p-5'>
          Conheça nossa equipe
        </h1>
        <Swiper
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
          pagination={{ clickable: true }}
          navigation
        >
          {avatarImages.map((avatar) => (
            <SwiperSlide key={avatar.id}>
              <div className='flex flex-col gap-4 border border-black p-3 bg-white'>
                <div className='border border-black p-3'>
                  <img
                    className='w-36 h-36 object-cover mx-auto border border-black'
                    src={avatar.image}
                    alt={avatar.title || 'Avatar image'}
                  />
                </div>
                <div>
                  <h2 className='sm:text-xl text-sm text-logoColor font-bold p-5 text-center'>
                    {avatar.title}
                  </h2>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </main>
  );
}
