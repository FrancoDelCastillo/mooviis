import {useState, useEffect} from "react"
import { API_URL, API_KEY } from "../../utils/constants"

import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

import SpinnerLoading from "../../components/SpinnerLoading"
import MoviesGrid from "../../components/MoviesGrid"
import PaginationMovies from "../../components/Pagination"

import "./new-movies.scss"

export default function NewMovies(){

    // state to store list of movies
    const [movieList, setMovieList] = useState([]);
    // state to store pagination
    const [page, setPage] = useState(1);

    useEffect(()=>{
        (async () =>{
            const response = await fetch(`${API_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=${page}`);
            const newMovies = await response.json();
            setMovieList(newMovies)
        })();
    },[page]);

    // update pagination number state
    const updatePageNumber = pageNumber => {
        setPage(pageNumber)
    }
    

    return(
        <Row className="new-movies__row">
            <Col lg={12}>
                <h1 className="new-movies__title">Latest Releases</h1>
            </Col>
                {movieList.results ? (
                    <>
                        <Row lg={12}>
                            <MoviesGrid movieList={movieList}/>
                        </Row>
                        <Col lg={12} className="col-pagination-movies">
                            <PaginationMovies
                            currentPage={movieList.page}
                            totalItems={movieList.total_results}
                            updatePageNumber={updatePageNumber}/>
                        </Col>
                    </>
                ):(<SpinnerLoading/>)}
            
        </Row>
        
        
    )
}