<template>
<div>
  <ul>
    <li v-for='(item, key) in taskStatMap'>
      {{key}}:{{item.name}}
    </li>
  </ul>
</div>
</template>

<script>
import { taskStatMap } from '@/views/cert/task/taskStat'
export default {
  name: 'Test',
  data(){
    return {
      taskStatMap
    }
  },
  components: {

  }
}
</script>

<style scoped>

</style>