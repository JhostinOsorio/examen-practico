<template>
  <b-container>
    <router-view/>
  </b-container>
</template>

<script>
import { BContainer } from 'bootstrap-vue'

export default {
  name: 'App',
  components: {
    BContainer,
  },
}
</script>