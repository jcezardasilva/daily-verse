<template>
  <div class="text-light">
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
