import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Ajax from "@/ajax.js"
// import "vue-material-design-icons/styles.css"
Vue.config.productionTip = false

Ajax.request("/data/leagues.json")
    .as("json")
    .then(response => {
        store.commit('setLeagues', response.leagues)
    })
Ajax.request('/data/calendar.json')
    .as('json')
    .then((response) => {
        store.commit('setCalendar', response.calendar)
    })
    .catch((error) => {
        console.log(error)
    })
let done = false
Ajax.request("/api/gallery-data.php")
    .as("json")
    .then(response => {
        store.commit('setGallery', response)
        done = true
    })
    .catch(err => {
        console.log(err)
    })
done = true


let waitForDone = () => {
    setTimeout(() => {
        if (done)
            initVue()
        else
            waitForDone()
    }, 100)
}

let initVue = () => {
    new Vue({
        router,
        store,
        render: h => h(App)
    }).$mount('#app')
}

waitForDone()