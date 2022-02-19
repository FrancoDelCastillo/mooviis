import {useState, useEffect} from "react"
import { API_URL, API_KEY } from "../../utils/constants"

import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

import SpinnerLoading from "../../components/SpinnerLoading"
import MoviesGrid from "../../components/MoviesGrid"

import "./popular-movies.scss"


export default function PopularMovies(){

    //state with list of movies
    const [ movieList, setMovieList] = useState([]);

    //get list of movies
    useEffect(
        ()=>{
            (async ()=>{
                const response = await fetch(`${API_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`);
                const popularMovies = await response.json();
                setMovieList(popularMovies);
            })();
        },[]);

    return(
        <Row className="popular-movies__row">
            <Col lg={12}>
                <h1 className="popular-movies__title">Popular Movies</h1>
            </Col>

            {movieList.results ?
            (<>
                <Row lg={12}>
                    <MoviesGrid movieList={movieList}/>
                </Row>
            </>)
            :(<SpinnerLoading/>)}
        </Row>
    )
}