import React from 'react';
import { Link } from 'react-router-dom';

function SeriesCard(props) {
  const {Poster, Title, imdbID, Year } = props.data
  return (
    <Link to={`/series/${imdbID}`}>
    <div className='hover:scale-105 delay-50 ease-in'>
     <img src={Poster} alt={Title}className='w-full max-h-[25rem] bg-cover bg-center'/>
     <div className='p-2 text-[1.1rem] font-serif'>
     <h2> {Title } ({Year})</h2>
     </div>
    </div>
    </Link>
  )
}

export default SeriesCard