import s from "./style.module.css"

import { TVShowAPI } from "./api/tv-show";
import { useEffect, useState } from "react";
import { BACKDROP_BASE_URL } from "./config"
import { TVShowDetail } from "./compoments/TVShowDetail/TVShowDetail";
import { Logo } from "./compoments/Logo/Logo";
import logoImg from "./assets/images/logo.png"
import { TVShowList } from "./compoments/TVShowList/TVShowList";
import { SearchBar } from "./compoments/SearchBar/SearchBar";

import image from "./assets/images/imagenull.jpg";
import { MovieOrTVShow } from "./compoments/MovieOrTVShow/MovieOrTVShow";


export function App() {

  const [currentTVShow, setCurrentTVShow] = useState();
  const [movieSearch, setmovieSearch] = useState();
  const [recommendationList, setRecommendationList] = useState([]);

  function fetchMovieSearch() {
    if (movieSearch) {
      setmovieSearch(false);
    } else {
      setmovieSearch(true);
    }
  }

  async function fetchMoviePopulars() {
    const popularTVShowList = await TVShowAPI.fetchMoviePopulars();
    const randomNum = Math.round(Math.random() * 19)
    if (popularTVShowList.length > 0) {
      setCurrentTVShow(popularTVShowList[randomNum]);
    }
  }

  async function fetchMovieRecomendations(tvShowId) {
    const recommendationListResp = await TVShowAPI.fetchMovieRecomendations(tvShowId);
    if (recommendationListResp.length > 0) {
      setRecommendationList(recommendationListResp.slice(0, 10));
    }
  }

  async function fetchTVShowByTitle(title) {
    const searchResponse = await TVShowAPI.fetchTVShowByTitle(title);
    if (searchResponse.length > 0) {
      setCurrentTVShow(searchResponse[0]);
    }
  }

  async function fetchMovieByTitle(title) {
    const searchResponse = await TVShowAPI.fetchMovieByTitle(title);
    if (searchResponse.length > 0) {
      setCurrentTVShow(searchResponse[0]);
    }
  }

  useEffect(() => {
    fetchMoviePopulars();
  }, [movieSearch])

  useEffect(() => {
    if (currentTVShow) {
      fetchMovieRecomendations(currentTVShow.id);
    }
  }, [currentTVShow])

  function updateCurrentTVShow(tvShow) {
    setCurrentTVShow(tvShow);
  }

  function backgroudImage(currentTVShow) {

    if (currentTVShow.backdrop_path === null) {
      return image;
    } else {
      return `${BACKDROP_BASE_URL}${currentTVShow.backdrop_path}`;
    }
  }

  return (

    <div className={s.main_container}
      style={{
        background: currentTVShow ? `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url("${backgroudImage(currentTVShow)}") no-repeat center / cover` : "black",
      }}>
      <div className={s.header}>
        <div className="row">
          <div className="col-4">
            <div><Logo img={logoImg} title={"Watowatch"} subtitle={"Find a movie you may like"} /></div>
          </div>
          <div className="col-md-12 col-lg-4">
            {movieSearch ? <SearchBar value="" type={"MOVIE"} onSubmit={fetchMovieByTitle} /> : <SearchBar value="" type={"TV SHOW"} onSubmit={fetchTVShowByTitle} />}
            {movieSearch ? <MovieOrTVShow type={"TV SHOW"} fetchMovieSearch={fetchMovieSearch} /> : <MovieOrTVShow type={"MOVIE"} fetchMovieSearch={fetchMovieSearch} />}
          </div>
        </div>
      </div>
      <div className={s.tv_show_detail}>
        {currentTVShow && <TVShowDetail tvShow={currentTVShow} />}
      </div>
      <div className={s.recommended_shows}>
        {currentTVShow && <TVShowList onCLickItem={updateCurrentTVShow} tvShowList={recommendationList} />}
      </div>
    </div>
  );
}

export default App;
