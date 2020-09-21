<template>
  <div>
    <b-button @click="createChannel">
      Create channel
    </b-button>
  </div>
</template>

<script>
export default {
  methods: {
    createChannel () {
      this.$store.dispatch('createChannel')
    }
  }
}
</script>

<style>

</style>
