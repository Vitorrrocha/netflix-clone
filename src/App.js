import React, { useEffect, useState } from 'react';
import Tmdb from './Tmdb';

import MovieRow from './components/MovieRow';
import FeaturedMovie from './components/FeaturedMovie';
import Header from './components/Header';

import './App.css';

export default () => {

  const [ movieList, setMovieList ] = useState([]);
  const [ featuredData, setFeaturedData ] = useState(null);
  const [ blackHeader, setBlackHeader ]= useState(false);


  useEffect(()=>{
    const loadAll = async () => {      //Getting all movie list
      let list = await Tmdb.getHomeList();
      setMovieList(list);

      let originals = list.filter(i=> i.slug === 'originals');
      let randonChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
      let chosen = originals[0].items.results[randonChosen]
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
      setFeaturedData(chosenInfo);
    }

    loadAll();
  }, []);

  useEffect(()=>{
    const scrollListener = () =>{
        if(window.scrollY > 10){
          setBlackHeader(true);
        }else{
          setBlackHeader(false);
        }
    }

    window.addEventListener('scroll', scrollListener);

    return () =>{
      window.removeEventListener('scroll', scrollListener);
    }
  }, []);

  return(
    <div className='page'>

      <Header black={blackHeader}/>

      {featuredData &&  
        <FeaturedMovie item={featuredData} />
      }

      <section className='lists'>
        {movieList.map((item, key)=>(
          <MovieRow key={key} title={item.title} items={item.items} />
        ))}
      </section>

      <footer>
        Neftlix Reserves All Rights.<br/><br/>
        Developed by: <a href='http://vitorrrocha.github.io/'>Vitor A. B. Rocha</a> to study react<span role='img' aria-label='computer'>💻</span>.<br />
        Data extracted at https://www.themoviedb.org/<br/>
      </footer>

    </div>
  );
}