import s from "./style.module.css"

export function MovieOrTVShow({fetchMovieSearch,type}) {

    return (
        <>
            <button onClick={fetchMovieSearch}>{type}</button>
        </>
    )
}