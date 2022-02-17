import SpinnerLoading from "../SpinnerLoading";

import {Link} from "react-router-dom"

import Table from "react-bootstrap/Table"
import "./MovieList.scss"
import {URL_POSTER_PATH} from "../../utils/constants";

export default function MovieList(props){
 
    const { title, moviesList:{loading, result} } = props;
    const {results} = result;

    
    return(
    <>
    {loading || !result?<SpinnerLoading/>:
        <Table striped hover variant="dark" className="movie-list__table">
            <thead>
                <tr>
                    <th className="movie-list__table__title">{title}</th>
                </tr>
            </thead>
            <tbody className="movie-list__table__body">
            
            { results.map(
                (movie, index)=>{
                return <tr key={index} className="movie-list__row">
                            <td className="movie-list__table__body__item">
                                <Link to={`/movie/${movie.id}`} className="table-movie__link">
                                    <span className="movie-list__movie-title">{movie.title}</span>
                                    <img className="movie-thumbnail" src={`${URL_POSTER_PATH}${movie.poster_path}`} alt={movie.title}/>
                                </Link>
                            </td>
                        </tr> 
                }
            )}
            </tbody>
        </Table>}
    </>
    )
}