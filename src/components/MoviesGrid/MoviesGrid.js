import Card from "react-bootstrap/Card"
import Col from "react-bootstrap/Col"

import { Link } from "react-router-dom"
import {URL_POSTER_PATH} from "../../utils/constants";

import defaultImg from "../../assets/img/movie-finder.svg"

import "./MoviesGrid.scss"

export default function MoviesGrid(props){
    const {movieList:{results}} = props;

    return (
        <>
            {results.map(movie =>{return <Col className="movies-grid__card" xl={2} lg={3} md={4} sm={6} xs={12} key={movie.id}><MovieCard movie={movie}/></Col>})}
        </>
    )

}


function MovieCard(props){
    const { movie: {id, poster_path, title} } = props;
    
    return (
        <Link to={`/movie/${id}`} className="movie-card__link">
        <Card>
            {poster_path !== null ? <Card.Img src={`${URL_POSTER_PATH}${poster_path}`}/>:
                <Card.Img src={defaultImg}/>
            }
            
            <Card.Body>
                <Card.Title>
                    {title}
                </Card.Title>
            </Card.Body>
        </Card>
        </Link>

    )
}