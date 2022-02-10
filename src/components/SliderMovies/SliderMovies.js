import { Link } from "react-router-dom"

import Carousel from "react-bootstrap/Carousel"
import Button from "react-bootstrap/Button"
import "./SliderMovies.scss"

import SpinnerLoading from "../SpinnerLoading"

export default function SliderMovies(props){

    const { movies } = props;    
    
    if (movies.loading || !movies.result) {
        return(
            <>
                <SpinnerLoading/>
            </>
        )
    }

    const {results} = movies.result

    const topten_results = results.slice(0, results.length/2)


    return(
        <div className="slidermovies-container">
            <Carousel fade interval={3000}>
                {topten_results.map(
                    (movie)=>{
                        return <Carousel.Item key={movie.id} interval={5000}>
                                    <Movie idMovie={movie.id} backdropPath={movie.backdrop_path} title={movie.title} overview={movie.overview} />
                                </Carousel.Item>
                    }
                )}
                
            </Carousel>

        </div>
    )
}

// internal component 
function Movie(props){ 

    const {idMovie, backdropPath, title, overview} = props
    
    const imgUrl = `https://image.tmdb.org/t/p/original${backdropPath}`
    
    const regex =/.+?([a-z]\.)/m
    const firstSentence = overview.toString().match(regex)[0]

    return(
        <div className="movie-container">
                <img className="movie-container__movie" src={imgUrl} alt={title} />

                <Carousel.Caption className="movie-container__movie-info">
                    <div className="movie-container__movie-info__overview">
                        <h2 className="movie-container__movie-info__overview__title">{title}</h2>
                        <p>{firstSentence}</p>
                        <Link to={`/movie/${idMovie}`}>
                        <Button className="movie-container__movie-info__button">See more</Button>
                        </Link>
                    </div>
                </Carousel.Caption>
                
        </div>
    )
}