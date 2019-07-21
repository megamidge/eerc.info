import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Ajax from "@/ajax.js"
import "vue-material-design-icons/styles.css"
Vue.config.productionTip = false

Ajax.request("/data/leagues.json")
    .as("json")
    .then(response => {
        store.commit('setLeagues', response.leagues)
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
// store.commit('setGallery', [{ "image": "\/img\/gallery\/uploaded-5d3492812be4a2.77789828.png", "name": "uploaded-5d3492812be4a2.77789828.png", "description": "Renault GT3 speeding round turn 2 at Mt. Bathurst Panorama", "lowRes": "data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAJCAIAAAC0SDtlAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABpElEQVQYlQXBTU8TQRgA4Pedmd2d7W63S6W1CAkVaowfVROMFzVevOvFK\/9JT\/oHNJgQPZgmhhPxoqgRL1ZRmkhU2i4tdOl+TefD58HNDz\/Kvk\/BDHrdL283RDrs\/\/1Dqyu15dbdB+v\/9j621+4pIArAIBoQTGWJttjooPv51WMSnvfqK6vnLl27\/6gahjArXneetVavoOXYnn86OHDry2x3a7Pil4qTPnXCYqab128hgq1MFie97vtoOOi8fNq8cMN2Sr13z2WlSZfcCYl\/TZNJejqyIPc8ZuHMt4rh\/u7O9pv+WEnNo8Po989Pjk0mJ0d4de22FEUSR7VGUKZ2dX5OG6t9+aKRQiMo5uU5Ho0OCaGNmmdQsTN+zDlxlua5Sx3bKrnqbGXuzs1mYAdPXnS+fd\/P8tyyeDn0JuPQdTlbf9gmxCBVBoAam2DgQjn6urcDHmV0cbEeBAF3HEDU2kipmJBIaAkhSDMyzWGaymkynolZmo0AYGGhoZSmlEipjNEAhiWqdXycxHFsjFFKCyGEEFprzjkSopQmhEiljQGjARH\/A7q3zZhnCvAGAAAAAElFTkSuQmCC" }, { "image": "\/img\/gallery\/uploaded-5d34933048b249.00268268.jpg", "name": "uploaded-5d34933048b249.00268268.jpg", "description": "Red manages his T1 drift in sakkito", "lowRes": "data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAJCAIAAAC0SDtlAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABpElEQVQYlQXBTU8TQRgA4Pedmd2d7W63S6W1CAkVaowfVROMFzVevOvFK\/9JT\/oHNJgQPZgmhhPxoqgRL1ZRmkhU2i4tdOl+TefD58HNDz\/Kvk\/BDHrdL283RDrs\/\/1Dqyu15dbdB+v\/9j621+4pIArAIBoQTGWJttjooPv51WMSnvfqK6vnLl27\/6gahjArXneetVavoOXYnn86OHDry2x3a7Pil4qTPnXCYqab128hgq1MFie97vtoOOi8fNq8cMN2Sr13z2WlSZfcCYl\/TZNJejqyIPc8ZuHMt4rh\/u7O9pv+WEnNo8Po989Pjk0mJ0d4de22FEUSR7VGUKZ2dX5OG6t9+aKRQiMo5uU5Ho0OCaGNmmdQsTN+zDlxlua5Sx3bKrnqbGXuzs1mYAdPXnS+fd\/P8tyyeDn0JuPQdTlbf9gmxCBVBoAam2DgQjn6urcDHmV0cbEeBAF3HEDU2kipmJBIaAkhSDMyzWGaymkynolZmo0AYGGhoZSmlEipjNEAhiWqdXycxHFsjFFKCyGEEFprzjkSopQmhEiljQGjARH\/A7q3zZhnCvAGAAAAAElFTkSuQmCC" }, { "image": "\/img\/gallery\/uploaded-5d3494523f1f03.16900175.jpg", "name": "uploaded-5d3494523f1f03.16900175.jpg", "description": "Same drift, Temper GT3 Right behind", "lowRes": "data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAJCAIAAAC0SDtlAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABpElEQVQYlQXBTU8TQRgA4Pedmd2d7W63S6W1CAkVaowfVROMFzVevOvFK\/9JT\/oHNJgQPZgmhhPxoqgRL1ZRmkhU2i4tdOl+TefD58HNDz\/Kvk\/BDHrdL283RDrs\/\/1Dqyu15dbdB+v\/9j621+4pIArAIBoQTGWJttjooPv51WMSnvfqK6vnLl27\/6gahjArXneetVavoOXYnn86OHDry2x3a7Pil4qTPnXCYqab128hgq1MFie97vtoOOi8fNq8cMN2Sr13z2WlSZfcCYl\/TZNJejqyIPc8ZuHMt4rh\/u7O9pv+WEnNo8Po989Pjk0mJ0d4de22FEUSR7VGUKZ2dX5OG6t9+aKRQiMo5uU5Ho0OCaGNmmdQsTN+zDlxlua5Sx3bKrnqbGXuzs1mYAdPXnS+fd\/P8tyyeDn0JuPQdTlbf9gmxCBVBoAam2DgQjn6urcDHmV0cbEeBAF3HEDU2kipmJBIaAkhSDMyzWGaymkynolZmo0AYGGhoZSmlEipjNEAhiWqdXycxHFsjFFKCyGEEFprzjkSopQmhEiljQGjARH\/A7q3zZhnCvAGAAAAAElFTkSuQmCC" }, { "image": "\/img\/gallery\/uploaded-5d3496509bac19.32617216.jpg", "name": "uploaded-5d3496509bac19.32617216.jpg", "description": "Hatronoth, Beletal and Hoen speeding down the Hangar Straight at Silverstone, 3 wide.", "lowRes": "data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAJCAIAAAC0SDtlAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAA5ElEQVQYla3LMU7EQBBE0aruGa93hRAQE8FFOAEH4OCIgAOwEICQLdsz7i4SYiJe+vX58Ph0fTm6MeXJGnv0vh1PF7XW6fvr7v52nreP98\/W++EwzMtWMrR3NGlZJ8EMOl3ddNDopQ4vz68Ci7HW2tZ1WdayR2xbM7PjOJKcp\/n8dhYgqZodPGsdUuitg3CyADA3M8tMAO48Ru4hd9bKUsbMkCRAoVQWgAAzRTIjSh3MfZDcHGQp3hsyU0oaI7JMa+sRbi4lADPPDAkkSYCEpEwAkdr2KJlath3Y8avjT\/Z3\/ofhBxtFjwVTOQsdAAAAAElFTkSuQmCC" }, { "image": "\/img\/gallery\/uploaded-5d349c4b5c75e1.43353375.png", "name": "uploaded-5d349c4b5c75e1.43353375.png", "description": "Art piece - mashup between the black and white BMW cars driven in season 2 by Beletal and Risu of Neemo", "season": "Season 2", "track": "Autodromo Nazionale Monza", "tags": ["BMW", " GT3", " Beletal", " Monza", " Art", "In this experiment you will need one certified homologised gentried owl."], "lowRes": "data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAJCAIAAAC0SDtlAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABjklEQVQYlQXB227TMBgAYMf57dhJozVpFg7TEIxKK+NwhXhSHoQbuOOWomjaSpnGBqVjdBKHZs2WkNhx7Jjvc6av38dxzKOBd8\/XnWrKhmCCrCWEUI8q023yTbKTEkP+nF99\/DCF8WSfjpgNkKyFY5w02gYHXBe3qq2qf1ujYa8NWDyfHn3KjmvZwOXqxx1+36c+MohTrttusfi2ulw5GI2S5GD47HR2uvy8wBiLVuw\/nYComr+L3z3qISAA7rs3b5cXS6nag8mTF9ybZccnh\/NOKACCEZ4fztxJOmaItrIt8s3596\/ZUbbKr75cnK3zdVEU5fUtMqiVymjdSFHXNbx6\/pJz3vVaNxWxkGwnDsGDQUiBACMkoI\/3xtFWxIFZ3ctGQPLgrh\/5trepMdF1HMZhXdZadQghyuij8Z4fBszjPmdW2fJXASfZLIqiMAyHO6Pdh7tJmpjOAHallMQj6zxvKoEFdm6N7jqtNQRBwBijlNra3Py8kU6rjLJO3xsLArjne5Zi1Ustqqoqy\/I\/aXXZig4CyM4AAAAASUVORK5CYII=" }])
// done = true
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