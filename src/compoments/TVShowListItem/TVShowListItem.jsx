import s from "./style.module.css";

import { SMALL_IMAGE_COVER_BASE_URL } from "../../config";

const MAX_TITLE_CHAR = 20;


export function TVShowListItem({ tvShow, onClick }) {

    function onClick_() {
        onClick(tvShow)
    }

    return <div onClick={onClick_} className={s.container}>
        <img alt={tvShow.title} src={SMALL_IMAGE_COVER_BASE_URL + tvShow.backdrop_path}
            className={s.img}
        />
        <div className={s.title}>
            {tvShow.title.length > MAX_TITLE_CHAR ? tvShow.title.slice(0, MAX_TITLE_CHAR) + "..." : tvShow.title}
        </div>
    </div>;
}

