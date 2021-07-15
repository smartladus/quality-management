<template>
<a-select class='selector' placeholder='选择任务状态' v-model='stat' @change='onChange' :disabled='disabled'>
  <a-select-option v-for='(item, key) in taskStatMap' :value='key' :key='key'>{{item.name}}</a-select-option>
</a-select>
</template>

<script>
import { taskStatMap } from '@/views/cert/task/taskStat'
export default {
  name: 'TaskStatSelector',
  data() {
    return {
      taskStatMap,
      stat: this.value,
    }
  },
  props: ['value', 'disabled'],
  model: {
    prop: 'value',
    event: 'change'
  },
  watch: {
    value(val, oldVal) {
      this.stat = val;
    }
  },
  methods: {
    onChange(val) {
      this.$emit('change', val);
    }
  }
}
</script>

<style scoped>
.selector{
  width: 150px;
}
</style>