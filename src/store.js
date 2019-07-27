import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        calendar: [],
        gallery: null,
        leagues: []
    },
    mutations: {
        gallery(state, gallery) {
            state.gallery = gallery
        },
        setLeagues(state, leagues) {
            state.leagues = leagues
        },
        setGallery(state, gallery) {
            state.gallery = gallery
        },
        setCalendar(state, calendar) {
            state.calendar = calendar
        }
    },
    getters: {
        getImageByName: (state) => (name) => {
            return state.gallery.find(image => image.name === name)
        },
        galleryImages: state => {
            return state.gallery
        },
        series: state => {
            return state.leagues
        },
        leagueColour: (state) => (leagueCode) => {
            let found = state.leagues.find(l => l.code == leagueCode)
            if (found)
                return found.colour
            return null
        }
    },
    actions: {

    }
})