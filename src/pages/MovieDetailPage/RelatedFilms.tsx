import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { IRelatedFilms } from '../../models/IMovieModels';
import { useNavigate } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './relatedFilms.css';

interface IRelatedFilmsProps {
  relatedFilms: IRelatedFilms[];
}

export function RelatedFilms({ relatedFilms }: IRelatedFilmsProps) {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  const clickHandler = (filmId: number) => {
    navigate(`/film/${filmId}`);
  };

  const PrevArrow = (props: any) => (
    <button className={`slider-button prev ${currentIndex === 0 ? 'disabled' : ''}`} onClick={props.onClick}>
    </button>
  );

  const NextArrow = (props: any) => (
    <button className={`slider-button next ${currentIndex === relatedFilms.length - 1 ? 'disabled' : ''}`} onClick={props.onClick}>
    </button>
  );

  const prevSlide = () => {
    console.log(currentIndex)
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? relatedFilms.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    console.log(currentIndex)
    setCurrentIndex((prevIndex) =>
      prevIndex === relatedFilms.length - 1 ? 0 : prevIndex + 1
    );
  };

  

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 3,
    prevArrow: <PrevArrow onClick={prevSlide}/>,
    nextArrow: <NextArrow onClick={nextSlide}/>
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {relatedFilms.map((film) => (
          <div
            key={film.filmId}
            className="slider-item"
            onClick={() => clickHandler(film.filmId)}
          >
            <div className="relative">
              <img src={film.posterUrlPreview} className="max-w-[150px] max-h-[225px]" alt="poster" />
              <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-300 hover:opacity-20"></div>
            </div>
            <div className="max-w-[150px]">
              <p className="text-[15px]">{film.nameRu}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
