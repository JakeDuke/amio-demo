<template>
  <div>
    <b-list-group>
      <b-list-group-item v-for="channel in channelList" :key="channel.id" class="list-item">
        <span class="text-left">
          id: {{ channel.id }} name: {{ channel.name }}
        </span>
        <b-button class="btn-sm btn-info" @click="setCurrentChannel(channel.id, channel.name)">
          Edit channel
        </b-button>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
export default {
  props: {
    channelList: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    setCurrentChannel (id, name) {
      this.showModal()
      const data = {
        id,
        name
      }

      this.setChannelData(data)
    },

    showModal () {
      this.$emit('showModal')
    },

    setChannelData (data) {
      this.$emit('setChannelData', data)
    }
  }
}
</script>

<style lang="scss">
.list-item {
  display: flex;
  justify-content: space-between;
}
</style>
