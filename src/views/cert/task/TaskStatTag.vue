<template>
  <span>
    <a-tag v-if="taskStatMap[stat] !== undefined" :color="taskStatMap[stat].tagColor">{{ taskStatMap[stat].name }}</a-tag>
    <a-tag v-else color="gray">未知状态</a-tag>
  </span>
</template>

<script>
import { taskStatMap } from '@/views/cert/task/taskStat'

export default {
  name: 'TaskStatTag',
  data() {
    return {
      taskStatMap,
      stat: 'UNKNOWN',
    }
  },
  mounted() {
    this.stat = this.taskStat;
  },
  props: ['taskStat'],
  watch: {
    taskStat(stat, oldStat) {
      this.stat = stat;
    }
  }
}
</script>

<style scoped>
</style>