import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Movie from './pages/movies/Movie';
import Series from './pages/series/Series';
import MovieDescription from './pages/movies/MovieDescription';
import SeriesDescription from './pages/series/SeriesDescription';
import Navigation from './components/Navigation';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    <>
<Router>
  <Navigation />
  <Routes>
    <Route path='/' element={<Movie />}></Route>
    <Route path='/series' element={<Series />} />
    <Route path='/movie/:imdbID' element={<MovieDescription />} />
    <Route path='/series/:imdbID' element={<SeriesDescription />} />
  </Routes>
</Router>
    </>
  )
}

export default App
