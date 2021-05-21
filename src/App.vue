<template>
  <div>
    <div class="container-xl mt-5">
      <component 
        :is="currentComponent"
        @changeComponent="currentComponent = $event"
      ></component>
    </div>
  </div>
</template>

<script>
import EntryPunch from './views/EntryPunch'
import ActionPunch from './views/ActionPunch'
import Index from './views/Index'
import Vue from 'vue'

export const eventBus = new Vue({
  data: {
    name:'',
    datePunch: "",
    entryTime:"",
    type: '',
  },
})


export default {
  name: 'App',
  components: {
    'entry-punch': EntryPunch,
    'action-punch': ActionPunch,
    'c-index': Index
  },
  data: () => {
    return {
      currentComponent: 'c-index'
    }
  }
}
</script>

<style>
</style>
