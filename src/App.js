import { useState} from "react";

// routing system
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"

// scroll to top with react-router-dom
import ScrollToTop from "./hooks/ScrollToTop";

// components
import MenuTop from "./components/MenuTop"
import Footer from "./components/Footer"
import SpinnerLoading from "./components/SpinnerLoading";

// pages
import Home from "./pages/home"
import Movie from "./pages/Movie/movie"
import NewMovies from "./pages/new-movies"
import PopularMovies from "./pages/popular-movies"
import Search from "./pages/search"
import Error404 from "./pages/error404"

// api request
import useFetch from "./hooks/useFetch"
import {API_URL, API_KEY} from "./utils/constants"

// style
import Container from "react-bootstrap/Container"
import "./App.scss"

function App() {

  const newMovies = useFetch(`${API_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`);
  const popularMovies = useFetch(`${API_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`);
  const topRatedMovies = useFetch(`${API_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`);

  const [spinner, setSpinner] = useState(true)
 
  if (!newMovies) {
    setSpinner(true)
  } else {
    setTimeout(()=>{setSpinner(false)},500)
  }

  return (
    <>
    {spinner ? <SpinnerLoading/>:
    <Container fluid className="app-main-container">
      
      <Router>
        <MenuTop />
        <ScrollToTop/>
        <Container fluid className="main-container">        
          <Routes>
            <Route exact={true} path="/" element={<Home newMovies={newMovies} popularMovies={popularMovies} topRatedMovies={topRatedMovies}/>} />
            <Route exact={true} path="/movie/:movie_id" element={<Movie/>} />
            <Route exact={true} path="/new-movies" element={<NewMovies/>} />
            <Route exact={true} path="/popular-movies" element={<PopularMovies/>} />
            <Route exact={true} path="/search" element={<Search/>} />
            <Route exact={true} path="*" element={<Error404/>} />
          </Routes>
              
        </Container>
        <Footer fluid/>
      </Router>
      
    </Container >}
    </>
  );
}

export default App;
