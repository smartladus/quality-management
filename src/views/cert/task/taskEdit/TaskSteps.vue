<template>
<a-steps :current="1" progressDot>
  <a-step v-for='(step, index) in steps' :key='index'>
    <template v-slot:title>
      <span>{{step.title}}</span>
    </template>
    <template v-slot:description>
      {{step.desc}}
      <div>2016-12-12</div>
    </template>
  </a-step>
</a-steps>
</template>

<script>
export default {
  name: 'TaskSteps',
  data() {
    return {
      steps: [
        {
          title: '新建任务'
        },
        {
          title: '资料准备',
          desc: '已完成',
          finished: true
        },
        {
          title: '型式试验',
          desc: '已完成',
          finished: true
        },
        {
          title: '获证',
          desc: '已完成',
          finished: true
        },
        {
          title: '完成'
        }
      ]
    }
  },
  // props: ['steps']
}
</script>

<style scoped>

</style>