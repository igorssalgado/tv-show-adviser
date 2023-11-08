import s from "./style.module.css"

export function MovieOrTVShow({fetchMovieSearch,type}) {

    return (
        <>
            <div className={s.button}><span onClick={fetchMovieSearch}>Switch to {type}s</span></div>
        </>
    )
}