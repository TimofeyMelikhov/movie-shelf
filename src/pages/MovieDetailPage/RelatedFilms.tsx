import { useNavigate } from 'react-router-dom'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'

import { IRelatedFilms } from '../../models/IMovieModels'

import './relatedFilms.css'

interface IRelatedFilmsProps {
	relatedFilms: IRelatedFilms[]
}

export function RelatedFilms({ relatedFilms }: IRelatedFilmsProps) {
	const navigate = useNavigate()

	const clickHandler = (filmId: number) => {
		navigate(`/film/${filmId}`)
	}

	const PrevArrow = (props: any) => (
		<button className={`slider-button prev`} onClick={props.onClick}></button>
	)

	const NextArrow = (props: any) => (
		<button className={`slider-button next`} onClick={props.onClick}></button>
	)

	const settings = {
		infinite: true,
		speed: 500,
		slidesToShow: 4,
		slidesToScroll: 3,
		prevArrow: <PrevArrow />,
		nextArrow: <NextArrow />
	}

	return (
		<div className='slider-container'>
			<Slider {...settings}>
				{relatedFilms.map(film => (
					<div
						key={film.filmId}
						className='slider-item'
						onClick={() => clickHandler(film.filmId)}
					>
						<div className='relative min-w-[150px]'>
							<img
								src={film.posterUrlPreview}
								className='min-w-[150px] min-h-[225px]'
								alt='poster'
							/>
							<div className='absolute inset-0 w-[100%] bg-black opacity-0 transition-opacity duration-300 hover:opacity-20'></div>
						</div>
						<div className='max-w-[150px]'>
							<p className='text-[15px]'>{film.nameRu}</p>
						</div>
					</div>
				))}
			</Slider>
		</div>
	)
}
