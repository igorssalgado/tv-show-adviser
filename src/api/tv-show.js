import axios from 'axios'

import { FAKE_POPULARS, FAKE_RECOMMENDATIONS, FAKE_SEARCH } from "./fake_data"

import { BASE_URL, API_KEY_PARAM } from "../config"

export class TVShowAPI {
    static async fetchPopulars(type) {

        if (type === undefined)
            type = "tv";

        // console.log(`${BASE_URL}${type}/popular${API_KEY_PARAM}`);
        // const reponse = await axios.get(`${BASE_URL}${type}/popular${API_KEY_PARAM}`);
        // console.log(reponse.data.results)
        // return reponse.data.results;

        return FAKE_POPULARS;
    }

    static async fetchRecomendations(tvShowId, type) {
        if (type === undefined)
            type = "tv";

        // console.log(`${BASE_URL}${type}/${tvShowId}/recommendations${API_KEY_PARAM}`);
        // const reponse = await axios.get(`${BASE_URL}${type}/${tvShowId}/recommendations${API_KEY_PARAM}`);
        // return reponse.data.results;

        return FAKE_RECOMMENDATIONS;
    }

    static async fetchByTitle(title, type) {
        
        type? console.log(`${BASE_URL}search/${type}${API_KEY_PARAM}&query=${title}`) : console.log("type: " + type)

        const reponse = await axios.get(`${BASE_URL}search/${type}${API_KEY_PARAM}&query=${title}`);
        console.log(reponse.data.results)
        return reponse.data.results;
        // return FAKE_SEARCH;
    }

}


