import axios from 'axios'

import { FAKE_POPULARS, FAKE_RECOMMENDATIONS } from "./fake_data"

import { BASE_URL, API_KEY_PARAM } from "../config"

export class TVShowAPI {
    static async fetchPopulars() {
        // const reponse = await axios.get(`${BASE_URL}movie/popular${API_KEY_PARAM}`);
        // console.log(reponse.data.results)
        // return reponse.data.results;
        
        return FAKE_POPULARS;
    }

    static async fetchRecomendations(tvShowId) {
        // const reponse = await axios.get(`${BASE_URL}movie/${tvShowId}/recommendations${API_KEY_PARAM}`);
        // return reponse.data.results;

        return FAKE_RECOMMENDATIONS;
    }

    static async fetchByTitle(title) {
        const reponse = await axios.get(`${BASE_URL}search/movie${API_KEY_PARAM}&query=${title}`);
        return reponse.data.results;
    }

}


