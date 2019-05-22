import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        calendar: [],
        gallery: { pubdir: '', images: [] }
    },
    mutations: {
        gallery(state, gallery) {
            state.gallery = gallery
        }
    },
    getters: {
        getImageByName: (state) => (name) => {
            return state.gallery.images.find(image => image.image === name)
        },
        galleryImages: state => {
            return state.gallery.images
        },
        galleryPath: state => {
            return state.gallery.pubdir
        }
    },
    actions: {

    }
})
