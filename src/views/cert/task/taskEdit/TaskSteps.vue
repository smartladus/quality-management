<template>
<a-steps :current="taskStatMap[stat].index" progressDot>
  <a-step v-for='step in taskStatMap' :key='step.index'>
    <template v-slot:title>
      <span>{{step.name}}</span>
    </template>
    <template v-slot:description>
      {{step.desc}}
      <div>2016-12-12</div>
    </template>
  </a-step>
</a-steps>
</template>

<script>
import { taskStatMap } from '@/views/cert/task/taskStat'
export default {
  name: 'TaskSteps',
  data() {
    return {
      taskStatMap
    }
  },
  computed: {
    steps() {
      let res = [];
      for (let stat in taskStatMap) {
        res.push({
          index: stat.index,
          title: stat.name,
        })
      }
      return res;
    }
  },
  props: ['stat']
}
</script>

<style scoped>

</style>