import { useState } from "react"
import useFetch from "../../hooks/useFetch"
import { API_URL, API_KEY } from "../../utils/constants"
import { useParams } from "react-router-dom"

import SpinnerLoading from "../../components/SpinnerLoading"
import ModalTrailer from "../../components/ModalTrailer/ModalTrailer"

import Button from "react-bootstrap/Button"
import {BsPlayCircle} from "react-icons/bs"
import "./movie.scss"


export default function Movie(){

    const {movie_id} = useParams();
    const movieInfo = useFetch(`${API_URL}/movie/${movie_id}?api_key=${API_KEY}&language=en-US`);

    if (movieInfo.loading || !movieInfo.result) {
        return <SpinnerLoading/>
    }
    return(  
        <>
            <RenderMovie movieInfo={movieInfo.result}/>
        </>      
    )
}

function RenderMovie(props){
    const {movieInfo:{backdrop_path, title, release_date, poster_path, overview, genres}} = props;
    const bgMovie = `https://image.tmdb.org/t/p/original${backdrop_path}`

    return(
    <div className="render-movie__container" >
        <div style={{ backgroundImage:`url('${bgMovie}')`}}  className="render-movie__container__dark-layer">
        </div>
        <div className="render-movie__container__poster-info">
            <PosterMovie poster_path={poster_path}/>
            <InfoMovie overview={overview} genres={genres} title={title} release_date={release_date} />
        </div>
    </div>
    )
}

function PosterMovie(props){
    const {poster_path} = props
    const posterPath = `https://image.tmdb.org/t/p/original${poster_path}`

    return(
        <div className="poster-movie__container">
            <img src={posterPath} alt="" className="poster-movie" />
        </div>
    )
}

function InfoMovie(props){
    const {movie_id} = useParams();
    const {overview, genres,title, release_date} = props;
    let converted_to_date = new Date(release_date)
    let released_year = new Intl.DateTimeFormat('en-US', {year: "numeric"}).format(converted_to_date)
    
    const [isVisibleModal, setIsVisibleModal] = useState(false)
    const videoMovie = useFetch(`${API_URL}/movie/${movie_id}/videos?api_key=${API_KEY}&language=en-US`)


    const openModal = ()=>{
        setIsVisibleModal(true)
    }

    const closeModal = ()=>{
        setIsVisibleModal(false)
    }

    const renderVideo = ()=>{
        if(videoMovie.result){
            if(videoMovie.result.results.length > 0){
                return(
                    <>
                <Button className="info-movie__header__button-trailer" onClick={openModal}>
                    <BsPlayCircle/> Watch trailer
                </Button>
                <ModalTrailer
                    videoKey={videoMovie.result.results[0].key}
                    videoPlatform={videoMovie.result.results[0].site}
                    isOpen={isVisibleModal}
                    close={closeModal}
                />
                    </>
                )
            }
        }
    }

    return(
        <div className="info-movie__container">
            <div className="info-movie__header">
                <h2>{title} <span>({released_year})</span></h2>
                {renderVideo()}
            </div>
            <div className="info-movie__content">
                <h5>General</h5>
                <p>{overview}</p>
                <h5>Genres</h5>
                <ul className="ul-genres">
                    {genres.map(
                    (genre)=>{return <li key={genre.id}>{genre.name}</li>}
                    )}
                </ul>
            </div>
        </div>
    )
}