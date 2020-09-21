<template>
  <div class="container">
    <div class="row">
      <div class="col-12-md">
        <h1 class="title">
          amio-demo
        </h1>
        <ChannelsList :channel-list="channelList" @showModal="showModal" @setChannelData="setChannelData" />
        <b-button class="mt-3" @click="createChannel">
          Create channel
        </b-button>
      </div>
    </div>
    <b-modal v-model="modal" title="Edit channel name" @ok="editChannel">
      <span>New channel name: </span>
      <b-form-input v-model="newName" placeholder="Enter channel name" />
    </b-modal>
    <b-alert v-model="alert" :variant="alertVariant">
      {{ alertText }}
    </b-alert>
  </div>
</template>

<script>
export default {
  data () {
    return {
      newName: '',
      modal: false,
      currentChannelId: null,
      alertText: '',
      alert: false,
      alertVariant: null
    }
  },

  computed: {
    channelList () {
      const channels = this.$store.state.channels
      return channels.sort((a, b) => b.id - a.id)
    }
  },
  created () {
    this.$store.dispatch('getChannelList')
  },
  methods: {
    async editChannel () {
      const payload = {
        id: this.currentChannelId,
        name: this.newName
      }

      try {
        await this.$store.dispatch('editChannel', payload)
        await this.$store.dispatch('getChannelList')

        this.alertText = 'Channel was edited'
        this.showAlert('success')
      } catch (error) {
        this.alertText = 'Error occured'
        this.showAlert('danger')
      } finally {
        this.newName = ''
      }
    },

    showModal () {
      this.modal = true
    },

    setChannelData (event) {
      this.newName = event.name
      this.currentChannelId = event.id
    },

    showAlert (variant) {
      this.alert = true
      this.alertVariant = variant

      setTimeout(() => {
        this.alert = false
        this.alertText = ''
        this.alertVariant = null
      }, 3000)
    },

    async createChannel () {
      try {
        await this.$store.dispatch('createChannel')
        await this.$store.dispatch('getChannelList')

        this.alertText = 'Channel was created'
        this.showAlert('success')
      } catch (e) {
        this.alertText = 'Error occured'
        this.showAlert('danger')
      }
    }
  }
}
</script>

<style lang="scss">
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family:
    'Quicksand',
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.modal-body {
  display: flex;
  align-items: center;

  span {
    white-space: nowrap;
    margin-right: 2rem;
  }
}

.alert {
  position: absolute;
  top: 3rem;
  right: 3rem;
}
</style>
