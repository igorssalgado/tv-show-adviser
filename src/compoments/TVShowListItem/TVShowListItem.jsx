import s from "./style.module.css";

import { SMALL_IMAGE_COVER_BASE_URL } from "../../config";
import image from "../../assets/images/imagenull.jpg";

const MAX_TITLE_CHAR = 20;


export function TVShowListItem({ tvShow, onClick }) {

    function onClick_() {
        onClick(tvShow)
    }

    function backdrop_path(tvShow) {
        if (tvShow.backdrop_path === null) {
            return image;
        } else {
            return SMALL_IMAGE_COVER_BASE_URL + tvShow.backdrop_path;
        }
    }

    return <div onClick={onClick_} className={s.container}>
        <div className={s.caixinha}>
            <img alt={tvShow.title} src={backdrop_path(tvShow)}
                className={s.img}
            />
            <div className={s.title}>
               { tvShow.title.length > MAX_TITLE_CHAR ? tvShow.title.slice(0, MAX_TITLE_CHAR) + "..." : tvShow.title} 
            </div>
        </div>
    </div>;
}

