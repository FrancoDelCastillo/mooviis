import {useState, useEffect} from "react"

// brings url history, location
import { useLocation, useNavigate } from "react-router-dom"

// to render results
import MoviesGrid from "../../components/MoviesGrid"
import PaginationMovies from "../../components/Pagination/Pagination"

// to catch query strings in URL
import queryString from "query-string"

// to consume API for search
import { API_URL, API_KEY } from "../../utils/constants"

import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Form from "react-bootstrap/Form"
import FloatingLabel from "react-bootstrap/FloatingLabel"
import "./search.scss"

export default function Search(){
    
    // to get params in browser bar
    const location = useLocation();

    //to put params in browser bar
    const history = useNavigate();

    // value inside search bar
    const [searchedValue, setSearchedValue]= useState("")
    // response from API
    const [moviesObtained, setMoviesObtained ] = useState([])

    // page obtained
    const [page, setPage]= useState(1);

    // consume API
    useEffect(()=>{
        (async ()=>{
            // access to params encoded in the URL with location.search
            const urlParams = queryString.parseUrl(location.search);
            const { find } = urlParams.query;
            if(find !== undefined ){
            const response = await fetch(`${API_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${find}&page=${page}&include_adult=false`);
            const movies = await response.json();
            setMoviesObtained(movies);
            } 
        })();
    },[searchedValue, location.search, page]);

    const onChangeSearch = (event)=>{
        // location is a react-router-dom object based on window.location
        // access to params encoded in the URL with location.search
        // parse params with queryString as an object with a url and query property
        // query property parsed from URL encoding to string
        const urlParams = queryString.parseUrl(location.search);
        // assign query's value with every change in search bar
        urlParams.query.find = event.target.value;
        // add query's value from search bar to broswer bar
        history(`?find=${urlParams.query.find}`);
        // update state value with every change
        setSearchedValue(event.target.value);
        setPage(1);
    }

    console.log(moviesObtained)

    const updatePageNumber = (pageNumber)=>{
        setPage(pageNumber)
    }

    return(
            <Row className="search__row">
                <Col lg={12} className="search__row__col">
                <h1 className="search__title">Movie finder</h1>
                <FloatingLabel label="search a movie">
                    <Form.Control onChange={(event)=>{onChangeSearch(event)}} type="text" placeholder="search a movie" className="search__bar"/>
                </FloatingLabel>
                </Col>
                {moviesObtained.total_pages ?
                <>
                    <Row lg={12}>
                        <MoviesGrid movieList={moviesObtained} />
                    </Row>
                    <Col lg={12} className="col-pagination-search">
                        <PaginationMovies 
                        currentPage={moviesObtained.page}
                        totalItems={moviesObtained.total_results}
                        updatePageNumber={updatePageNumber}
                        />
                    </Col>
                </> : <div className="search-no-results">No results :(</div>
                }
            </Row>
        
    )
}
