import s from "./style.module.css"
import { Search as SearchIcon } from "react-bootstrap-icons"

export function SearchBar({ onSubmit, type, value }) {

    function submit(e) {
        if (e.key === "Enter" && e.target.value.trim() !== "") {
            onSubmit(e.target.value);
        }
    }

    function clear(e){
        e.target.value = "";
    }

    return <>
        <SearchIcon size={27} className={s.icon} />
        <input
            onKeyUp={submit}
            className={s.input}
            type="text"
            onFocus={e => clear(e)}
            placeholder={`Search a ${type} you may like`} />
    </>;
}