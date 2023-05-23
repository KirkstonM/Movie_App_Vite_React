import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSeries, allSeries, errors, isloading } from '../../features/seriesSlice';
import Container from 'react-bootstrap/Container';
import SeriesCard from '../../components/SeriesCard';


function Series() {
  const seriesList = useSelector(allSeries);
  const errorMessage = useSelector(errors);
  const dispatch = useDispatch();
  const [seriesQuery, setSeriesQuery] = useState("");
  const loading = useSelector(isloading);


  const getSeries = () => {
    const INITIAL_SERIES = "Friends";
    dispatch(fetchSeries(INITIAL_SERIES))
  };

  useEffect(() => {
    getSeries();
  }, [dispatch])


  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(fetchSeries(seriesQuery))
  };

  const allRenderedSeries = seriesList.map((series, index) => {
    return <SeriesCard data={series} key={index} />
  })

  return (
    <>
      {loading ? (<div className='animate-pulse absolute
top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 tracking-widest text-4xl text-yellow-400'>
        Loading... </div>) :
        (<>


          <div className='mt-5 p-2'>
            <form className='flex justify-center items-center' onSubmit={handleSubmit}>
              <input
                type='text'
                name='seriesQuery'
                value={seriesQuery}
                placeholder='Search For Movie'
                onChange={(e) => setSeriesQuery(e.target.value)}
                className='form-control w-50 bg-transparent text-white'
              />
              <button className='ms-5 bg-gradient-to-r from-green-500 to-green-900 text-white font-bold py-2 px-4 rounded shadow-md'> Search </button>
            </form>
          </div>
          {errorMessage ?
            (<div className='text-center p-5 text-3xl font-bold absolute
top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 tracking-widest'>
              {errorMessage.error}
            </div>) :

            (
              <Container className='mt-5'>
                <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 xl:grid-cols-4 gap-y-5 gap-x-4'>
                  {allRenderedSeries}
                </div>
              </Container>

            )
          }
        </>)
      }
    </>
  )
}

export default Series