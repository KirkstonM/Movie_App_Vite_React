import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { details, clearDetails, fetchSeriesDetails } from '../../features/seriesSlice';
import { useParams } from 'react-router';
import { AiFillStar } from "react-icons/ai";
import { FaThumbsUp } from "react-icons/fa";
import { MdLocalMovies } from "react-icons/md";
import { BsFillCalendarDateFill } from "react-icons/bs";

function SeriesDescription() {

  const seriesDetails = useSelector(details);
  const dispatch = useDispatch();
  const { imdbID } = useParams();

  useEffect(() => {
    dispatch(fetchSeriesDetails(imdbID))

    return () => {
      dispatch(clearDetails())
    }
  }, [dispatch]);


  return (
    <section className='mt-20 flex justify-evenly items-center px-10'>
    <div>
<h1 className='text-5xl'>{seriesDetails.Title}</h1>

<div className='flex justify-between mt-5'>
<div className='flex items-center'> IMDB Rating
<AiFillStar className='text-yellow-600 ms-2 me-2 font-bolder text-xl'/>: {seriesDetails.imdbRating}
</div>
<div className='flex items-center'> IMDB VOTES
<FaThumbsUp className='text-green-600 ms-2 me-2 font-bolder text-lg'/>: {seriesDetails.imdbVotes}</div>
<div className='flex items-center'> Runtime
<MdLocalMovies className='text-gray-600 ms-2 me-2 font-bolder text-xl'/>: {seriesDetails.Runtime}</div>
<div className='flex items-center'> Year
<BsFillCalendarDateFill className='text-orange-600 ms-2 me-2 font-bolder text-lg'/>: {seriesDetails.Year}</div>
</div>

<div className='my-5 text-lg font-sans'>
<p>{seriesDetails.Plot}</p>
</div>

<div className='flex '>
<div className='min-w-[8rem] p-2 mb-3 text-lg'> Director </div> 
<span className='p-2 text-blue-400'>
{seriesDetails.Director}
</span>
</div>

<div className='flex'>
<div className='min-w-[8rem] p-2 mb-3 text-lg'> Actors </div> 
<span className='p-2 text-blue-400'>
  {seriesDetails.Actors}
  </span>
  </div>

  <div className='flex'>
<div className='min-w-[8rem] p-2 mb-3 text-lg'> Genres </div> 
<span className='p-2 text-blue-400'>
{seriesDetails.Genre}
</span>
</div>

<div className='flex'>
<div className='min-w-[8rem] p-2 mb-3 text-lg'> Languages </div>
<span className='p-2 text-blue-400'>
{seriesDetails.Language}
</span>
</div>

<div className='flex'>
<div className='min-w-[8rem] p-2 mb-3 text-lg'> Awards </div>
<span className='p-2 text-blue-400'>
{seriesDetails.Awards}
</span>
</div>
    </div>

    <div className='p-5 bg-cover'>
      <img src={seriesDetails.Poster} alt={seriesDetails.Title} style={{ height : '57vh'}}/>
    </div>
  </section>
  )
}

export default SeriesDescription