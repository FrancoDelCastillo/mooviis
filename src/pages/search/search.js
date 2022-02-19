import {useState, useEffect} from "react"

// brings url history, location
import { useLocation, useNavigate } from "react-router-dom"

// to render results
import MoviesGrid from "../../components/MoviesGrid"

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

    // consume API
    useEffect(()=>{
        (async ()=>{
            const getSearch = queryString.parseUrl(location.search);
            const { find } = getSearch.query;
            if(find !== undefined){
            const response = await fetch(`${API_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${find}&page=1&include_adult=false`);
            const movies = await response.json();
            setMoviesObtained(movies);
            setSearchedValue(find);
            }
        })();
    },[searchedValue,location.search]);

    const onChangeSearch = (event)=>{
        const urlParams = queryString.parseUrl(location.search);
        urlParams.query.find = event.target.value;
        history(`?find=${urlParams.query.find}`);
        setSearchedValue(event.target.value);
    }


    return(
            <Row className="search__row">
                <Col lg={12} className="search__row__col">
                <h1 className="search__title">Movie finder</h1>
                <FloatingLabel label="search a movie">
                    <Form.Control onChange={(event)=>{onChangeSearch(event)}} type="text" placeholder="search a movie" className="search__bar"/>
                </FloatingLabel>
                </Col>
                {moviesObtained.results &&
                    <Row lg={12}>
                        <MoviesGrid movieList={moviesObtained} />
                    </Row>}
            </Row>
        
    )
}
