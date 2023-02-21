<template>
  <div class="text-light">
    <h1 class="text-center w-100 m-5">
      <img src="/clean-heart.png" height="50" class="me-3"/>
      <span class="title-text">Gerador de Cafezinho</span>
    </h1>
    <VerseList :date="dateValue" />
  </div>
  
</template>
<script lang="ts">
import VerseList from './components/VerseList.vue';
export default {
  name: "AppVerses",
  components: {
    VerseList
  },
  data(){
    return {
      dateValue: Date
    }
  }
}
</script>
<style scoped>
</style>
