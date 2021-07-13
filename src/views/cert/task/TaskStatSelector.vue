<template>
<a-select class='selector' placeholder='选择任务状态' v-model='stat' @change='onChange'>
  <a-select-option v-for='item in taskStatMap' :value='item.val' :key='item.val'>{{item.text}}</a-select-option>
</a-select>
</template>

<script>
const taskStatMap = [
  {val: 'NEW', text: '新建'},
  {val: 'DOC_PREPARE', text: '资料准备'},
  {val: 'TEST', text: '型式试验'},
  {val: 'GET_CERT', text: '获证'},
  {val: 'DONE', text: '已完成'},
  {val: 'CANCELLED', text: '已取消'},
];

export default {
  name: 'TaskStatSelector',
  data() {
    return {
      taskStatMap,
      stat: this.value,
    }
  },
  props: ['value'],
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