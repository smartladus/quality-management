<template>
  <span>
    <a-tag v-if="taskStatMap[stat] !== undefined" :color="taskStatMap[stat].color">{{ taskStatMap[stat].name }}</a-tag>
    <a-tag v-else color="gray">未知状态</a-tag>
  </span>
</template>

<script>
const taskStatMap = {
  NEW: {
    name: '新建',
    color: 'blue'
  },
  DOC_PREPARE: {
    name: '资料准备',
    color: 'blue'
  },
  TEST: {
    name: '型式试验',
    color: 'blue'
  },
  GET_CERT: {
    name: '获证',
    color: 'blue'
  },
  DONE: {
    name: '已完成',
    color: 'green'
  },
  CANCELLED: {
    name: '已取消',
    color: 'gray'
  },
}

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