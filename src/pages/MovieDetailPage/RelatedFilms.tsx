import React, { useState } from 'react';
import { IRelatedFilms } from '../../models/IMovieModels';
import { useNavigate } from 'react-router-dom';
import './relatedFilms.css'
interface IRelatedFilmsProps {
  relatedFilms: IRelatedFilms[];
}

export function RelatedFilms({ relatedFilms }: IRelatedFilmsProps) {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  const clickHandler = (filmId: number) => {
    navigate(`/film/${filmId}`);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? relatedFilms.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === relatedFilms.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="slider-container">
      <button className="slider-button prev" onClick={handlePrev}>
        Prev
      </button>
      <div className="slider-content min-h-[300px]">
        {relatedFilms.map((film, index) => (
          <div
            key={film.filmId}
            className={`classes.slider_item ${index === currentIndex ? 'active' : ''}`}
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            <div
              className={`flex flex-col max-w-[200px] cursor-pointer ${index !== 0 ? 'ml-[20px]' : ''}`}
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
          </div>
        ))}
      </div>
      <button className="slider-button next" onClick={handleNext}>
        Next
      </button>
    </div>
  );
}
