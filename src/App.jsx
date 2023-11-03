import s from "./style.module.css"

import { TVShowAPI } from "./api/tv-show";
import { useEffect, useState } from "react";
import { BACKDROP_BASE_URL } from "./config"
import { TVShowDetail } from "./compoments/TVShowDetail/TVShowDetail";
import { Logo } from "./compoments/Logo/Logo";
import logoImg from "./assets/images/logo.png"
import { TVShowListItem } from "./compoments/TVShowListItem/TVShowListItem";
import { TVShowList } from "./compoments/TVShowList/TVShowList";


export function App() {

  const [currentTVShow, setCurrentTVShow] = useState();
  const [recommendationList, setRecommendationList] = useState([]);

  async function fetchPopulars() {
    const popularTVShowList = await TVShowAPI.fetchPopulars();
    const randomNum = Math.round(Math.random() * 19)
    if (popularTVShowList.length > 0) {
      setCurrentTVShow(popularTVShowList[randomNum]);
    }
  }

  async function fetchRecomendations(tvShowId) {
    const recommendationListResp = await TVShowAPI.fetchRecomendations(tvShowId);
    if (recommendationListResp.length > 0) {
      setRecommendationList(recommendationListResp.slice(0, 10));
    }
  }

  useEffect(() => {
    fetchPopulars();
  }, [])

  useEffect(() => {
    if (currentTVShow) {
      fetchRecomendations(currentTVShow.id);
    }
  }, [currentTVShow])

  console.log(recommendationList)

  return (
    <div className={s.main_container}
      style={{
        background: currentTVShow ? `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url("${BACKDROP_BASE_URL}${currentTVShow.backdrop_path}") no-repeat center / cover` : "black",
      }}>
      <div className={s.header}>
        <div className="row">
          <div className="col-4">
            <div><Logo img={logoImg} title={"Watowatch"} subtitle={"Find a show you may like"} /></div>
            <div>subtitle</div>
          </div>
          <div className="col-md-12 col-lg-4">
            <input style={{ width: "100%" }} type="text"></input>
          </div>
        </div>
      </div>
      <div className={s.tv_show_detail}>
        {currentTVShow && <TVShowDetail tvShow={currentTVShow} />}
      </div>
      <div className={s.recommended_shows}>
        {currentTVShow && <TVShowList tvShowList={recommendationList}/>}
      </div>
    </div>
  );
}

export default App;
