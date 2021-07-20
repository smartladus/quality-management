<template>
<page-header-wrapper
  :tab-list="tabList"
  :tab-active-key="tabActiveKey"
  :tab-change="handleTabChange"
>
  <template slot='title'><span/></template>
  <cert-task-list
    v-if='tabActiveKey === "1"'
    @edit='goToEdit'
  />
  <cert-task-edit
    v-if='tabActiveKey === "2"'
    :task-no='taskNoToEdit'
    @cancel='onCancel'
  />
</page-header-wrapper>
</template>

<script>
import CertTaskList from '@/views/cert/task/taskList/CertTaskList'
import CertTaskEdit from '@/views/cert/task/taskEdit/CertTaskEdit'

export default {
  name: 'TaskKanban',
  data () {
    const tabList = [
      { key: '1', tab: '任务清单' },
      { key: '2', tab: '任务编辑' },
    ]
    return {
      tabList,
      tabActiveKey: '1',
      taskNoToEdit: undefined,
    }
  },
  methods: {
    handleTabChange(key) {
      this.tabActiveKey = key
      if (key === '1') {
        this.taskNoToEdit = undefined;
      }
    },
    goToEdit(taskNo) {
      this.taskNoToEdit = taskNo;
      this.handleTabChange("2");
    },
    onCancel() {
      this.handleTabChange("1");
    }
  },
  components: {
    CertTaskEdit,
    CertTaskList
  }
}
</script>

<style scoped>

</style>