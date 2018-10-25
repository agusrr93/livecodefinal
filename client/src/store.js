import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    videos: [],
    video: {},
    like: '',
    detail:[]
  },
  mutations: {
    setVideos (state, payload) {
      state.videos = payload
    },
    seVideoById (state, payload) {
      state.video = payload
    },
    setLike (state, payload) {
      state.like = payload
    }, 
    setDetail(state,payload){
      state.detail=payload
    }
  },
  actions: {
    getVideoDetail (context, id) {
        let params = {
         'maxResults': '10',
         'part': 'snippet',
         'q': id,
         'type': 'channelId',
         'key': 'AIzaSyDvY3zkrrakN0WuUGUL-uKdJ-yEOI-TC7I'
        }
       axios.get('https://www.googleapis.com/youtube/v3/search', {params})
         .then(response => {
           console.log(response.data.items)
           this.detail = response.data.items
           context.commit('setDetail',this.detail)
         })
         .catch((err) => {
           console.log(err)
         })
    },
    getAllVid (context, input) {
      if (input) {
        axios.get(`https://www.googleapis.com/youtube/v3/search?key=AIzaSyAlWPAuxxBWFumEkr5tK9Syh0Wv2DQPTKM&part=snippet&maxResults=20&q=${input}`)
          .then(response => {
            console.log('get list', response.data.items)
            context.commit('setVideos', response.data.items)
          })
          .catch(err => {
            console.log('get error', err.response)
          })
      } else {
        axios.get(`https://www.googleapis.com/youtube/v3/search?key=AIzaSyAlWPAuxxBWFumEkr5tK9Syh0Wv2DQPTKM&part=snippet&maxResults=20&q=walker`)
          .then(response => {
            console.log('get list', response.data.items)
            context.commit('setVideos', response.data.items)
          })
          .catch(err => {
            console.log('get error', err.response)
          })
      }
    }
  }
})
