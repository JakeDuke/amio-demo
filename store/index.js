import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

/*eslint-disable */

axios.defaults.baseURL = 'https://api.amio.io/v1/'
axios.defaults.headers.common['Authorization'] = 'Bearer ' + 'HShpDlaZUMHdpoe2N9wiDhckxy8RfICSSzEsBIoynJRfFXQFcW1gobHXcjxYBVJUCneDoXb5tkuWak0THvfV5T1qJo'

Vue.use(Vuex)

const store = () =>
  new Vuex.Store({
    state: {
      channels: []
    },
    mutations: {
      setChannels (state, channels) {
        state.channels = channels
      }
    },
    actions: {
      async createChannel () {
        const data = {
          type: 'amio_chat'
        }

        return await axios.post('/channels', data)
      },
      async getChannelList (context) {
        const resp = await axios.get('/channels')
        context.commit('setChannels', resp.data)

        return resp.data
      },
      async editChannel (context, payload) {
        return await axios.patch(`/channels/${payload.id}`, { name: payload.name })
      }
    }
  })
export default store
