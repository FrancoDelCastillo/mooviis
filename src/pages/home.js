import SliderMovies from "../components/SliderMovies"
import MovieList from "../components/MovieList"

import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

export default function Home(props){

const {newMovies,popularMovies,topRatedMovies} = props;
 
    return(
        <>
            <SliderMovies movies={newMovies} />
            <Container fluid="sm" >
                <Row>
                    <Col sm={12} md={6} ><MovieList title="Popular Movies" moviesList={popularMovies}/></Col>
                    <Col sm={12} md={6} ><MovieList title="Top Rated Movies" moviesList={topRatedMovies}/></Col>
                </Row>
            </Container>
            
        </>
    )
}